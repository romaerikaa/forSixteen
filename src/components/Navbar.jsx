import { useState } from "react"

const navItems = [
  { title: "FORSIXTEEN", shortTitle: "FORSIXTEEN", subtitle: "LETTERS + MEMORIES" },
  { title: "WRITE", shortTitle: "WRITE", subtitle: "NEW LETTER" },
  { title: "VAULT", shortTitle: "VAULT", subtitle: "LOCKED MESSAGES" },
  { title: "GALLERY", shortTitle: "GALLERY", subtitle: "MEDIA" },
  { title: "ABOUT", shortTitle: "ABOUT", subtitle: "PROJECT" },
]

function Navbar({ activeIndex, onSelect, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleSelect(index) {
    onSelect(index)
    setIsMenuOpen(false)
  }

  function handleLogout() {
    onLogout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="relative w-full overflow-visible px-3 py-3 md:px-4 md:py-5 xl:py-6">
      <div className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between border-4 border-[#ff7faf] bg-[#fff7fb] px-4 py-3 shadow-[4px_4px_0_rgba(0,0,0,0.72),4px_8px_14px_rgba(0,0,0,0.2)] lg:hidden">
        <button
          type="button"
          onClick={() => handleSelect(activeIndex)}
          className="min-w-0 text-left font-mono text-sm font-black uppercase tracking-[0.12em] text-zinc-950"
        >
          {navItems[activeIndex].title}
        </button>

        <button
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border-4 border-[#ff7faf] bg-[#f9d1d9] shadow-[3px_3px_0_rgba(131,143,88,0.45)]"
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="h-1 w-6 bg-zinc-950" />
          <span className="h-1 w-6 bg-zinc-950" />
          <span className="h-1 w-6 bg-zinc-950" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-3 right-3 top-[4.9rem] z-20 border-4 border-[#ff7faf] bg-[#ff7faf] shadow-[4px_4px_0_rgba(0,0,0,0.72)] lg:hidden">
          {navItems.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => handleSelect(index)}
              className={`flex w-full items-center justify-between border-b-4 border-[#ff7faf] bg-[#fff7fb] px-4 py-4 text-left transition last:border-b-0 hover:bg-[#ffe1ec] ${
                activeIndex === index ? "bg-[#ffd0e1]" : ""
              }`}
            >
              <span className="font-mono text-sm font-black uppercase tracking-[0.12em] text-zinc-950">
                {item.title}
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                {item.subtitle}
              </span>
            </button>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-[#fffdf8] px-4 py-4 text-left font-mono text-sm font-black uppercase tracking-[0.14em] text-[#838f58] transition hover:bg-[#f9d1d9]"
          >
            Logout
          </button>
        </div>
      )}

      <div className="mx-auto mb-2 hidden w-full max-w-7xl justify-end lg:flex">
        <button
          type="button"
          onClick={handleLogout}
          className="border border-[#838f58] bg-[#fffdf8]/95 px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#838f58] shadow-[3px_3px_0_rgba(131,143,88,0.35)] transition hover:-translate-y-0.5 hover:bg-[#f9d1d9] sm:text-xs"
        >
          Logout
        </button>
      </div>

      <div className="relative z-10 mx-auto hidden w-full max-w-7xl grid-cols-5 items-stretch border-4 border-[#ff7faf] bg-[#ff7faf] shadow-[4px_4px_0_rgba(0,0,0,0.72),4px_8px_14px_rgba(0,0,0,0.2)] lg:grid sm:shadow-[7px_7px_0_rgba(0,0,0,0.78),7px_12px_18px_rgba(0,0,0,0.24)] xl:shadow-[10px_10px_0_rgba(0,0,0,0.82),10px_18px_22px_rgba(0,0,0,0.3)]">
        {navItems.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSelect(index)}
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
