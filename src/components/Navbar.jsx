const navItems = [
  { title: "FORSIXTEEN", shortTitle: "FORSIXTEEN", subtitle: "LETTERS + MEMORIES" },
  { title: "WRITE", shortTitle: "WRITE", subtitle: "NEW LETTER" },
  { title: "VAULT", shortTitle: "VAULT", subtitle: "LOCKED MESSAGES" },
  { title: "GALLERY", shortTitle: "GALLERY", subtitle: "PHOTOS" },
  { title: "ABOUT", shortTitle: "ABOUT", subtitle: "PROJECT" },
]

function Navbar({ activeIndex, onSelect, onLogout }) {
  return (
    <nav className="relative w-full overflow-hidden px-2 py-3 sm:px-4 sm:py-5 xl:py-6">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-5 items-stretch border-4 border-[#ff7faf] bg-[#ff7faf] shadow-[4px_4px_0_rgba(0,0,0,0.72),4px_8px_14px_rgba(0,0,0,0.2)] sm:shadow-[7px_7px_0_rgba(0,0,0,0.78),7px_12px_18px_rgba(0,0,0,0.24)] xl:shadow-[10px_10px_0_rgba(0,0,0,0.82),10px_18px_22px_rgba(0,0,0,0.3)]">
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
      <button
        type="button"
        onClick={onLogout}
        className="absolute right-3 top-3 z-20 border border-[#838f58] bg-[#fffdf8]/95 px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#838f58] shadow-[3px_3px_0_rgba(131,143,88,0.35)] transition hover:-translate-y-0.5 hover:bg-[#f9d1d9] sm:right-5 sm:top-5 sm:text-xs xl:top-6"
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar
