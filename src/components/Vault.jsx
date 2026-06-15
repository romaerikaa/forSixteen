import { useState } from "react"
import { createPortal } from "react-dom"

function EnvelopeLetter({ letter, onOpen }) {
  const today = new Date().toISOString().slice(0, 10)
  const canOpen = !letter.openDate || letter.openDate <= today
  const formattedOpenDate = letter.openDate
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
  const formattedOpenDate = letter.openDate
    ? new Date(`${letter.openDate}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Anytime"

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-900/20 px-6 py-12 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close letter"
      />

      <div className="envelope-scene relative h-[42rem] w-full max-w-7xl">
        <button
          type="button"
          onClick={onClose}
          className="
            absolute right-4 top-0 z-50 flex h-12 w-12 items-center justify-center
            border border-slate-300 bg-[#fbfaf5] font-mono text-2xl
            font-black text-slate-600 shadow-[5px_5px_0_rgba(148,163,184,0.45)]
            transition hover:-translate-y-0.5 hover:text-slate-900
          "
          aria-label="Close letter"
        >
          ×
        </button>

        <div className="envelope-shell envelope-shell-open absolute bottom-8 left-1/2 z-20 aspect-[16/10] w-[min(72%,42rem)] -translate-x-1/2 bg-[#e8c4cc] shadow-[12px_14px_0_rgba(148,163,184,0.45),0_24px_55px_rgba(71,85,105,0.22)]">
          <div className="envelope-flap envelope-flap-open absolute inset-x-0 top-0 z-50 h-1/2" />
          <div className="absolute inset-y-0 left-0 w-1/2 bg-[#e4bbc4] [clip-path:polygon(0_0,100%_50%,0_100%)]" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[#e4bbc4] [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
          <div className="absolute inset-x-0 bottom-0 z-30 h-1/2 bg-[#edc9d1] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
          <div className="absolute inset-x-8 bottom-6 z-40 border border-[#8b9aaf] bg-[#fbfaf5]/95 px-5 py-4">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.26em] text-[#66758d]">
              {letter.title || "Untitled Letter"}
            </p>
            <p className="mt-2 font-mono text-sm font-bold uppercase tracking-[0.14em] text-slate-800">
              {formattedOpenDate}
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 top-4 z-40 flex justify-center px-6">
          <div className="letter-paper min-h-[39rem] w-[82vw] max-w-[70rem] bg-[#fbfaf5] px-12 pb-12 pt-16 shadow-[0_18px_45px_rgba(75,85,99,0.18)]">
            <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-white/70 to-transparent" />
            <h2 className="letter-words mb-8 font-mono text-3xl font-black uppercase tracking-[0.16em] text-slate-600">
              {letter.title || "Untitled Letter"}
            </h2>
            <p className="letter-words whitespace-pre-wrap font-serif text-2xl leading-10 text-slate-700">
              {letter.text}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function Vault({ letters }) {
  const [openLetter, setOpenLetter] = useState(null)

  return (
    <section className="vault-enter min-h-[calc(100vh-9rem)] bg-[#eef2f5] px-6 py-14 vault-grid">
      <div className="mx-auto w-full">
        <h1 className="text-center font-mono text-3xl font-black uppercase tracking-[0.18em] text-slate-500">
          Vault
        </h1>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-x-10 gap-y-12 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {letters.length === 0 ? (
            <div className="col-span-full mx-auto border border-slate-300 bg-[#fbfaf5] p-8 font-mono text-slate-500 shadow-[10px_12px_0_rgba(148,163,184,0.45)]">
              No saved letters yet.
            </div>
          ) : (
            letters.map((letter) => (
              <EnvelopeLetter key={letter.id} letter={letter} onOpen={setOpenLetter} />
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
