import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

function EnvelopeLetter({ letter, onOpen, currentTime }) {
  const today = new Date(currentTime).toISOString().slice(0, 10)
  const canOpen =
    letter.openAt
      ? new Date(letter.openAt).getTime() <= currentTime
      : !letter.openDate || letter.openDate <= today
  const formattedOpenDate = letter.openAt
    ? new Date(letter.openAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : letter.openDate
    ? new Date(`${letter.openDate}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Anytime"

  function handleToggle() {
    if (!canOpen) {
      return
    }

    onOpen(letter)
  }

  return (
    <article className="mx-auto w-full max-w-64">
      <button
        type="button"
        onClick={handleToggle}
        className={`
          envelope-scene group relative mx-auto block h-36 w-full overflow-visible text-left transition
          ${canOpen ? "hover:-translate-y-1" : ""}
          ${canOpen ? "" : "cursor-not-allowed opacity-70"}
        `}
      >
        <div
          className={`
            envelope-shell absolute z-20 aspect-[16/10] bg-[#e8c4cc]
            shadow-[12px_14px_0_rgba(148,163,184,0.45),0_24px_55px_rgba(71,85,105,0.22)]
            bottom-3 left-1/2 w-full -translate-x-1/2
          `}
        >
          <div className="envelope-flap absolute inset-x-0 top-0 z-50 h-1/2" />
          <div className="absolute inset-y-0 left-0 w-1/2 bg-[#e4bbc4] [clip-path:polygon(0_0,100%_50%,0_100%)]" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[#e4bbc4] [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
          <div className="absolute inset-x-0 bottom-0 z-30 h-1/2 bg-[#edc9d1] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
          {!canOpen && (
            <div className="absolute inset-x-4 bottom-4 z-40 border border-[#8b9aaf] bg-[#fbfaf5]/95 px-3 py-2">
              <p className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#66758d]">
                {letter.title || "Untitled Letter"}
              </p>
              <p className="mt-1 font-mono text-xs font-bold uppercase tracking-[0.1em] text-slate-800">
                Locked Until {formattedOpenDate}
              </p>
            </div>
          )}
          {canOpen && (
            <div className="absolute inset-x-4 bottom-4 z-40 border border-[#8b9aaf] bg-[#fbfaf5]/95 px-3 py-2">
              <p className="truncate font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-800">
                {letter.title || "Untitled Letter"}
              </p>
            </div>
          )}
        </div>
      </button>
    </article>
  )
}

function OpenEnvelope({ letter, onClose }) {
  const formattedOpenDate = letter.openAt
    ? new Date(letter.openAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : letter.openDate
    ? new Date(`${letter.openDate}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Anytime"

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-slate-900/20 px-3 py-5 backdrop-blur-sm sm:px-6 sm:py-10 lg:items-center lg:py-12">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close letter"
      />

      <div className="envelope-scene relative min-h-[34rem] w-full max-w-7xl sm:h-[42rem]">
        <button
          type="button"
          onClick={onClose}
          className="
            absolute right-2 top-0 z-50 flex h-11 w-11 items-center justify-center sm:right-4 sm:h-12 sm:w-12
            border border-slate-300 bg-[#fbfaf5] font-mono text-2xl
            font-black text-slate-600 shadow-[5px_5px_0_rgba(148,163,184,0.45)]
            transition hover:-translate-y-0.5 hover:text-slate-900
          "
          aria-label="Close letter"
        >
          ×
        </button>

        <div className="envelope-shell envelope-shell-open absolute bottom-4 left-1/2 z-20 aspect-[16/10] w-[min(86%,28rem)] -translate-x-1/2 bg-[#e8c4cc] shadow-[8px_10px_0_rgba(148,163,184,0.45),0_18px_40px_rgba(71,85,105,0.22)] sm:bottom-8 sm:w-[min(72%,42rem)] sm:shadow-[12px_14px_0_rgba(148,163,184,0.45),0_24px_55px_rgba(71,85,105,0.22)]">
          <div className="envelope-flap envelope-flap-open absolute inset-x-0 top-0 z-50 h-1/2" />
          <div className="absolute inset-y-0 left-0 w-1/2 bg-[#e4bbc4] [clip-path:polygon(0_0,100%_50%,0_100%)]" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[#e4bbc4] [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
          <div className="absolute inset-x-0 bottom-0 z-30 h-1/2 bg-[#edc9d1] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
          <div className="absolute inset-x-4 bottom-4 z-40 border border-[#8b9aaf] bg-[#fbfaf5]/95 px-3 py-3 sm:inset-x-8 sm:bottom-6 sm:px-5 sm:py-4">
            <p className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#66758d] sm:text-xs sm:tracking-[0.26em]">
              {letter.title || "Untitled Letter"}
            </p>
            <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-slate-800 sm:text-sm sm:tracking-[0.14em]">
              {formattedOpenDate}
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 top-4 z-40 flex justify-center px-0 sm:px-6">
          <div className="letter-paper relative min-h-[30rem] w-[94vw] max-w-[70rem] bg-[#fbfaf5] px-5 pb-9 pt-14 shadow-[0_18px_45px_rgba(75,85,99,0.18)] sm:min-h-[39rem] sm:w-[82vw] sm:px-12 sm:pb-12 sm:pt-16">
            <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-white/70 to-transparent" />
            <h2 className="letter-words relative z-10 mb-6 break-words font-mono text-2xl font-black uppercase tracking-[0.12em] text-slate-600 sm:mb-8 sm:text-3xl sm:tracking-[0.16em]">
              {letter.title || "Untitled Letter"}
            </h2>
            <p className="letter-words relative z-10 whitespace-pre-wrap break-words font-serif text-xl leading-8 text-slate-700 sm:text-2xl sm:leading-10">
              {letter.text}
            </p>
            <div className="letter-words pointer-events-none absolute inset-0 z-20">
              {(letter.stickers || []).map((sticker) => (
                <span
                  key={sticker.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 select-none text-4xl drop-shadow-[0_5px_4px_rgba(15,23,42,0.22)] sm:text-5xl"
                  style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
                  aria-hidden="true"
                >
                  {sticker.emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function Vault({ letters, error, isRefreshing, onRefresh, user }) {
  const [openLetter, setOpenLetter] = useState(null)
  const [currentTime, setCurrentTime] = useState(() => Date.now())

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(Date.now())
    }, 60 * 1000)

    return () => window.clearInterval(timerId)
  }, [])

  return (
    <section className="vault-enter min-h-screen bg-[#f5f6f0] px-4 pb-10 pt-28 vault-grid sm:px-6 sm:pb-14 sm:pt-36 xl:pt-44">
      <div className="mx-auto w-full">
        <h1 className="text-center font-mono text-2xl font-black uppercase tracking-[0.16em] text-slate-500 sm:text-3xl sm:tracking-[0.18em]">
          Vault
        </h1>

        <div className="mx-auto mt-6 flex max-w-7xl flex-col items-center gap-3 px-0 sm:px-4">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="border-4 border-[#838f58] bg-[#f9d1d9] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-slate-900 shadow-[4px_4px_0_rgba(131,143,88,0.55)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isRefreshing ? "Refreshing..." : "Refresh Letters"}
          </button>

          {error && (
            <p className="w-full border-4 border-[#f9d1d9] bg-[#fffdf8] px-4 py-3 text-center font-mono text-xs font-bold uppercase tracking-[0.14em] text-rose-500">
              {error}
            </p>
          )}
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-0 sm:grid-cols-2 sm:px-4 lg:grid-cols-4">
          {letters.length === 0 ? (
            <div className="col-span-full mx-auto border border-slate-300 bg-[#fbfaf5] p-8 font-mono text-slate-500 shadow-[10px_12px_0_rgba(148,163,184,0.45)]">
              No saved letters yet for {user?.name || "this account"}.
            </div>
          ) : (
            letters.map((letter) => (
              <EnvelopeLetter
                key={letter.id}
                letter={letter}
                onOpen={setOpenLetter}
                currentTime={currentTime}
              />
            ))
          )}
        </div>
      </div>

      {openLetter && (
        <OpenEnvelope letter={openLetter} onClose={() => setOpenLetter(null)} />
      )}
    </section>
  )
}

export default Vault
