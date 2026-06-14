import { useEffect, useState } from "react"

import About from "./components/About"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import ForSixteen from "./components/forsixteen"
import Gallery from "./components/Gallery"
import Splash from "./components/Splash"
import Vault from "./components/Vault"
import Write from "./components/Write"
import { supabase } from "./lib/supabase"

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
  const [user, setUser] = useState(null)
  const [activePage, setActivePage] = useState(0)
  const [letters, setLetters] = useState([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!user) {
      setLetters([])
      return
    }

    async function loadLetters() {
      const { data, error } = await supabase
        .from("letters")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error) {
        setLetters(data.map(mapLetter))
      }
    }

    loadLetters()
  }, [user])

  async function handleSaveLetter({ title, text, openDate }) {
    const { data, error } = await supabase
      .from("letters")
      .insert({
        user_id: user.id,
        title,
        text,
        open_date: openDate || null,
      })
      .select()
      .single()

    if (error) {
      return
    }

    setLetters([mapLetter(data), ...letters])
    setActivePage(2)
  }

  const pages = [
    <ForSixteen onNavigate={setActivePage} />,
    <Write onSave={handleSaveLetter} />,
    <Vault letters={letters} />,
    <Gallery user={user} />,
    <About />,
  ]

  function handleLogin(nextUser) {
    setUser(nextUser)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
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
