import { useEffect, useState } from "react"

import About from "./components/About"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import ForSixteen from "./components/forsixteen"
import Gallery from "./components/Gallery"
import Splash from "./components/Splash"
import Vault from "./components/Vault"
import Write from "./components/Write"
import { isSupabaseConfigured, supabase } from "./lib/supabase"

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function mapLetter(row) {
  return {
    id: row.id,
    title: row.title,
    text: row.text,
    openDate: row.open_date || "",
    openAt: row.open_at || "",
    stickers: Array.isArray(row.stickers) ? row.stickers : [],
    date: formatDate(row.created_at),
  }
}

function createLocalLetter({ title, text, openDate, openAt, stickers }) {
  return {
    id: crypto.randomUUID(),
    title,
    text,
    openDate: openDate || "",
    openAt: openAt || "",
    stickers: Array.isArray(stickers) ? stickers : [],
    date: formatDate(new Date().toISOString()),
  }
}

function App() {
  const [hasSeenSplash, setHasSeenSplash] = useState(false)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("forsixteen-user")
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [activePage, setActivePage] = useState(0)
  const [letters, setLetters] = useState([])
  const [letterError, setLetterError] = useState("")

  useEffect(() => {
    if (!user) {
      return
    }

    async function loadLetters() {
      if (!isSupabaseConfigured) {
        setLetterError("Supabase is not configured on this deployment.")
        return
      }

      const { data, error } = await supabase
        .from("letters")
        .select("*")
        .eq("account_name", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        setLetterError(`Letters could not load: ${error.message}`)
        return
      }

      setLetterError("")
      setLetters(data.map(mapLetter))
    }

    loadLetters()
  }, [user])

  async function handleSaveLetter({ title, text, openDate, openAt, stickers }) {
    setLetterError("")

    if (!isSupabaseConfigured) {
      setLetterError(
        "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.",
      )
      return false
    }

    const letterData = {
      account_name: user.id,
      title,
      text,
      open_date: openDate || null,
    }
    const hasStickers = Array.isArray(stickers) && stickers.length > 0

    if (openAt) {
      letterData.open_at = openAt
    }

    if (hasStickers) {
      letterData.stickers = stickers
    }

    const { error } = await supabase.from("letters").insert(letterData)

    if (error) {
      const needsOpenAtColumn =
        openAt && error.message.toLowerCase().includes("open_at")
      const needsStickersColumn =
        hasStickers && error.message.toLowerCase().includes("stickers")
      setLetterError(
        needsOpenAtColumn
          ? "Letter save failed: run the updated Supabase SQL first so timed locks can save."
          : needsStickersColumn
          ? "Letter save failed: run the updated Supabase SQL first so stickers can save."
          : `Letter save failed: ${error.message}`,
      )
      return false
    }

    setLetters((currentLetters) => [
      createLocalLetter({ title, text, openDate, openAt, stickers }),
      ...currentLetters,
    ])
    setActivePage(2)
    return true
  }

  const pages = [
    <ForSixteen onNavigate={setActivePage} />,
    <Write onSave={handleSaveLetter} error={letterError} />,
    <Vault letters={letters} />,
    <Gallery user={user} />,
    <About />,
  ]

  function handleLogin(nextUser) {
    setUser(nextUser)
    localStorage.setItem("forsixteen-user", JSON.stringify(nextUser))
  }

  function handleLogout() {
    setUser(null)
    localStorage.removeItem("forsixteen-user")
    setLetters([])
    setActivePage(0)
  }

  if (!user && !hasSeenSplash) {
    return <Splash onContinue={() => setHasSeenSplash(true)} />
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-zinc-200">
      <div className="fixed inset-x-0 top-0 z-[9998]">
        <Navbar activeIndex={activePage} onSelect={setActivePage} onLogout={handleLogout} />
      </div>
      {pages[activePage]}
      <Footer />
    </div>
  )
}

export default App
