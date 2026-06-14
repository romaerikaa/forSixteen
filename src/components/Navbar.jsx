const navItems = [
  { title: "FORSIXTEEN", subtitle: "LETTERS + MEMORIES" },
  { title: "WRITE", subtitle: "NEW LETTER" },
  { title: "VAULT", subtitle: "LOCKED MESSAGES" },
  { title: "GALLERY", subtitle: "PHOTOS" },
  { title: "ABOUT", subtitle: "PROJECT" },
]

function Navbar({ activeIndex, onSelect }) {
  return (
    <nav className="relative w-full overflow-x-auto border-b border-zinc-400 bg-[#d8d8d8] px-4 py-8 shadow-[inset_0_-2px_0_rgba(255,255,255,0.45)]">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px bg-zinc-400/60 sm:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(90deg,transparent_0_4%,rgba(0,0,0,0.09)_4.2%,transparent_4.5%_11%,rgba(0,0,0,0.08)_11.2%,transparent_11.5%)] bg-[length:96px_100%] opacity-50" />

      <div className="relative z-10 mx-auto flex w-max min-w-fit items-stretch border-4 border-[#f9d1d9] bg-[#f9d1d9] shadow-[10px_10px_0_rgba(0,0,0,0.82),10px_18px_22px_rgba(0,0,0,0.3)]">
        {navItems.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className={`
              nav-card group relative h-28 w-44 shrink-0 overflow-hidden border-r-4
              border-[#f9d1d9] bg-zinc-100 px-7 text-left transition duration-200
              hover:bg-zinc-200 hover:-translate-y-0.5
              last:border-r-0
              sm:w-52
              md:w-64
              ${
                activeIndex === index
                  ? "bg-zinc-300 ring-4 ring-[#838f58] ring-offset-0"
                  : ""
              }
            `}
          >
            <span
              className={`absolute right-3 top-3 h-2 w-2 rounded-full transition ${
                activeIndex === index
                  ? "bg-[#838f58] shadow-[0_0_10px_rgba(131,143,88,0.95)]"
                  : "bg-white/50 shadow-[0_0_6px_rgba(255,255,255,0.55)]"
              }`}
            />
            <h2 className="relative font-mono text-xl font-black uppercase tracking-[0.12em] text-zinc-950 sm:text-2xl">
              {item.title}
            </h2>
            <p className="relative mt-3 font-mono text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">
              {item.subtitle}
            </p>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
