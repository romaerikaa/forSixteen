import { useState } from "react"

import bgForSixteen from "../assets/login.jpg"

const premadeAccounts = [
  {
    name: "stargirl",
    passcode: "romakate_16foreverlovewins",
  },
  {
    name: "Roam",
    passcode: "kateroma_16foreverlovewins",
  },
]

function Login({ onLogin }) {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name").trim()
    const passcode = formData.get("passcode").trim()

    const account = premadeAccounts.find(
      (account) =>
        account.name.toLowerCase() === name.toLowerCase() &&
        account.passcode === passcode,
    )

    if (!account) {
      setIsLoading(false)
      setError("Wrong name or passcode.")
      return
    }

    setIsLoading(false)
    onLogin({ id: account.name.toLowerCase(), name: account.name })
  }

  return (
    <main
      className="login-page flex min-h-screen items-center justify-center bg-center bg-no-repeat px-6 py-12"
      style={{
        backgroundImage: `url("${bgForSixteen}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <section className="w-full max-w-md border-4 border-[#f9d1d9] bg-[#fffdf8]/94 p-8 shadow-[12px_12px_0_rgba(131,143,88,0.5)] backdrop-blur-sm">
        <p className="font-mono text-xs font-black uppercase tracking-[0.22em] text-[#838f58]">
          Welcome Back
        </p>
        <h1 className="mt-4 font-mono text-4xl font-black uppercase tracking-[0.14em] text-slate-900">
          ForSixteen
        </h1>
        <p className="mt-5 font-serif text-2xl leading-9 text-slate-700">
          Open your little time capsule.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" autoComplete="off">
          <label className="block font-mono text-xs font-black uppercase tracking-[0.16em] text-[#838f58]">
            Name
            <input
              name="name"
              type="text"
              autoComplete="off"
              className="mt-2 w-full border-4 border-[#f9d1d9] bg-white px-4 py-3 font-mono text-sm text-slate-900 outline-none focus:border-[#838f58]"
              placeholder="username"
            />
          </label>

          <label className="block font-mono text-xs font-black uppercase tracking-[0.16em] text-[#838f58]">
            Passcode
            <input
              name="passcode"
              type="password"
              autoComplete="new-password"
              className="mt-2 w-full border-4 border-[#f9d1d9] bg-white px-4 py-3 font-mono text-sm text-slate-900 outline-none focus:border-[#838f58]"
              placeholder="password"
            />
          </label>

          {error && (
            <p className="border-4 border-[#f9d1d9] bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-rose-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full border-4 border-[#838f58] bg-[#f9d1d9] px-6 py-3 font-mono text-sm font-black uppercase tracking-[0.16em] text-slate-900 shadow-[5px_5px_0_rgba(131,143,88,0.65)] transition hover:-translate-y-0.5"
          >
            {isLoading ? "Entering..." : "Enter"}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
