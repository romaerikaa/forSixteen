const navItems = [
  { title: "FORSIXTEEN", shortTitle: "FORSIXTEEN", subtitle: "LETTERS + MEMORIES" },
  { title: "WRITE", shortTitle: "WRITE", subtitle: "NEW LETTER" },
  { title: "VAULT", shortTitle: "VAULT", subtitle: "LOCKED MESSAGES" },
  { title: "GALLERY", shortTitle: "GALLERY", subtitle: "PHOTOS" },
  { title: "ABOUT", shortTitle: "ABOUT", subtitle: "PROJECT" },
]

function Navbar({ activeIndex, onSelect }) {
  return (
    <nav className="relative w-full overflow-hidden border-b border-zinc-400 bg-[#d8d8d8] px-2 py-3 shadow-[inset_0_-2px_0_rgba(255,255,255,0.45)] sm:px-4 sm:py-5 xl:py-8">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px bg-zinc-400/60 sm:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(90deg,transparent_0_4%,rgba(0,0,0,0.09)_4.2%,transparent_4.5%_11%,rgba(0,0,0,0.08)_11.2%,transparent_11.5%)] bg-[length:96px_100%] opacity-50" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-5 items-stretch border-4 border-[#ff7faf] bg-[#ff7faf] shadow-[5px_5px_0_rgba(0,0,0,0.82),5px_10px_16px_rgba(0,0,0,0.22)] sm:shadow-[8px_8px_0_rgba(0,0,0,0.82),8px_14px_20px_rgba(0,0,0,0.26)] xl:shadow-[10px_10px_0_rgba(0,0,0,0.82),10px_18px_22px_rgba(0,0,0,0.3)]">
        {navItems.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={activeIndex === index ? "page" : undefined}
            className={`
              nav-card group relative h-16 min-w-0 overflow-hidden border-r-4
              border-[#ff7faf] bg-[#fff7fb] px-1.5 text-center transition duration-200
              hover:bg-[#ffe1ec] hover:-translate-y-0.5
              last:border-r-0
              sm:h-20 sm:px-3
              xl:h-28 xl:px-7 xl:text-left
              ${
                activeIndex === index
                  ? "bg-[#ffd0e1] ring-4 ring-inset ring-[#ff2f84] ring-offset-0"
                  : ""
              }
            `}
          >
            <span
              className={`absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full transition sm:right-2.5 sm:top-2.5 xl:right-3 xl:top-3 xl:h-2 xl:w-2 ${
                activeIndex === index
                  ? "bg-[#838f58] shadow-[0_0_10px_rgba(131,143,88,0.95)]"
                  : "bg-white/50 shadow-[0_0_6px_rgba(255,255,255,0.55)]"
              }`}
            />
            <h2 className="relative flex h-full items-center justify-center whitespace-nowrap font-mono text-[0.55rem] font-black uppercase leading-4 tracking-[0.04em] text-zinc-950 sm:text-xs sm:tracking-[0.08em] md:text-sm xl:block xl:h-auto xl:text-2xl xl:leading-normal xl:tracking-[0.12em]">
              <span className="xl:hidden">{item.shortTitle}</span>
              <span className="hidden xl:inline">{item.title}</span>
            </h2>
            <p className="relative mt-3 hidden font-mono text-sm font-bold uppercase leading-5 tracking-[0.16em] text-zinc-500 xl:block">
              {item.subtitle}
            </p>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
