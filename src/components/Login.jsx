import { useState } from "react"

import ribbonImage from "../assets/ribbon.png"
import starImage from "../assets/star.png"

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
    <main className="login-page relative flex min-h-screen overflow-hidden bg-[#ffe8ea] px-4 py-8 sm:px-8 sm:py-10 lg:items-center lg:px-16">
      <div className="login-bg-glow absolute inset-0 bg-[radial-gradient(circle_at_42%_42%,rgba(255,255,255,0.42),transparent_30%),linear-gradient(115deg,#fff8f4_0%,#ffdfe6_24%,#ffb1cf_54%,#ffd9e4_78%,#fff7f1_100%)]" />
      <div className="login-grid-shimmer absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.26)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[size:38px_38px] opacity-45" />

      <div className="pointer-events-none absolute left-3 top-4 h-40 w-40 sm:left-10 sm:top-10 sm:h-64 sm:w-72 lg:left-16 lg:top-14 lg:h-80 lg:w-[28rem]">
        <img
          src={starImage}
          alt=""
          className="login-star login-star-large absolute left-4 top-0 w-20 drop-shadow-[0_10px_8px_rgba(196,55,111,0.28)] sm:left-6 sm:w-32 lg:w-44"
        />
        <img
          src={starImage}
          alt=""
          className="login-star login-star-medium absolute left-28 top-10 hidden w-16 drop-shadow-[0_9px_7px_rgba(196,55,111,0.22)] sm:block lg:left-64 lg:top-16 lg:w-24"
        />
        <img
          src={starImage}
          alt=""
          className="login-star login-star-small absolute left-0 top-24 w-12 drop-shadow-[0_8px_6px_rgba(196,55,111,0.24)] sm:top-36 sm:w-16 lg:top-44 lg:w-20"
        />
      </div>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl content-center items-center gap-8 pt-20 sm:min-h-[calc(100vh-5rem)] sm:gap-10 sm:pt-24 lg:grid-cols-[1fr_24rem] lg:gap-16 lg:pt-0">
        <div className="login-title-wrap text-center lg:text-left">
          <h1 className="login-script mx-auto max-w-full whitespace-nowrap text-[clamp(2.45rem,12vw,4.8rem)] leading-tight text-white sm:text-[clamp(3.8rem,9vw,5.6rem)] lg:mx-0 lg:text-[clamp(4.2rem,7vw,6rem)]">
            Our Own Space
          </h1>
        </div>

        <div className="login-card-wrap relative mx-auto w-full max-w-[22rem] sm:max-w-sm">
          <img
            src={ribbonImage}
            alt=""
            className="login-ribbon pointer-events-none absolute -right-4 -top-11 z-20 w-28 drop-shadow-[0_8px_8px_rgba(190,70,112,0.24)] sm:-right-20 sm:-top-18 sm:w-40 xl:-right-15 xl:-top-17 xl:w-44"
          />

          <section className="relative border-4 border-[#f9d1d9] bg-[#fffaf6]/96 p-5 shadow-[7px_7px_0_rgba(255,127,175,0.36)] backdrop-blur-sm sm:p-8">
            <p className="login-form-pop login-delay-1 font-mono text-xs font-black uppercase tracking-[0.22em] text-[#838f58]">
              Welcome!
            </p>
            <h2 className="login-form-pop login-delay-2 mt-4 break-words font-mono text-2xl font-black uppercase tracking-[0.12em] text-slate-900 sm:text-4xl sm:tracking-[0.14em]">
              ForSixteen
            </h2>
            <p className="login-form-pop login-delay-3 mt-4 font-serif text-xl leading-8 text-slate-700 sm:mt-5 sm:text-2xl sm:leading-9">
              Open our little time capsule.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-8 sm:space-y-5" autoComplete="off">
              <label className="login-form-pop login-delay-4 block font-mono text-xs font-black uppercase tracking-[0.16em] text-[#838f58]">
                Name
                <input
                  name="name"
                  type="text"
                  autoComplete="off"
                  className="mt-2 w-full border-4 border-[#f9d1d9] bg-white px-4 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-[#ff7faf]"
                  placeholder="username"
                />
              </label>

              <label className="login-form-pop login-delay-5 block font-mono text-xs font-black uppercase tracking-[0.16em] text-[#838f58]">
                Passcode
                <input
                  name="passcode"
                  type="password"
                  autoComplete="new-password"
                  className="mt-2 w-full border-4 border-[#f9d1d9] bg-white px-4 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-[#ff7faf]"
                  placeholder="password"
                />
              </label>

              {error && (
                <p className="login-form-pop border-4 border-[#f9d1d9] bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-rose-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="login-form-pop login-delay-6 w-full border-4 border-[#838f58] bg-[#f9d1d9] px-6 py-3 font-mono text-sm font-black uppercase tracking-[0.16em] text-slate-900 shadow-[5px_5px_0_rgba(131,143,88,0.65)] transition hover:-translate-y-0.5 hover:bg-[#ffb9d0] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isLoading ? "Entering..." : "Enter"}
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  )
}

export default Login
