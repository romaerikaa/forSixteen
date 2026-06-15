import { useEffect, useState } from "react"

import About from "./components/About"
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
    date: formatDate(row.created_at),
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

  async function handleSaveLetter({ title, text, openDate }) {
    setLetterError("")

    if (!isSupabaseConfigured) {
      setLetterError(
        "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.",
      )
      return false
    }

    const { data, error } = await supabase
      .from("letters")
      .insert({
        account_name: user.id,
        title,
        text,
        open_date: openDate || null,
      })
      .select()
      .single()

    if (error) {
      setLetterError(`Letter save failed: ${error.message}`)
      return false
    }

    setLetters((currentLetters) => [mapLetter(data), ...currentLetters])
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
    <div className="min-h-screen bg-zinc-200">
      <div className="flex items-center justify-between bg-[#f5f6f0] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        <span>ForSixteen</span>
        <button
          type="button"
          onClick={handleLogout}
          className="border border-[#838f58] bg-[#fffdf8] px-3 py-2 text-[#838f58] transition hover:bg-[#f9d1d9]"
        >
          Logout
        </button>
      </div>
      <Navbar activeIndex={activePage} onSelect={setActivePage} />
      {pages[activePage]}
    </div>
  )
}

export default App
