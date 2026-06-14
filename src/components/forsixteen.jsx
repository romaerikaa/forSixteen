import bgForSixteen from "../assets/bg forsixteen.png"

const quickLinks = [
  { title: "Write a Letter", text: "Save words for later.", page: 1 },
  { title: "Open Vault", text: "Visit sealed messages.", page: 2 },
  { title: "View Gallery", text: "Collect photo memories.", page: 3 },
]

function ForSixteen({ onNavigate }) {
  return (
    <main
      className="min-h-[calc(100vh-9rem)] bg-center bg-no-repeat px-6 py-14"
      style={{
        backgroundImage: `url("${bgForSixteen}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <section className="home-intro max-w-3xl border-4 border-[#f9d1d9] bg-[#fffdf8]/92 px-8 py-10 shadow-[12px_12px_0_rgba(131,143,88,0.45)] backdrop-blur-sm sm:px-12">
          <p className="font-mono text-xs font-black uppercase tracking-[0.22em] text-[#838f58]">
            Letters + Memories
          </p>
          <h1 className="mt-4 font-mono text-5xl font-black uppercase tracking-[0.14em] text-slate-900">
            ForSixteen
          </h1>
          <p className="mt-7 max-w-2xl font-serif text-3xl leading-11 text-slate-700">
            A digital time capsule for the words and moments you want to keep.
          </p>
          <p className="mt-6 font-mono text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            Write a letter now. Save a photo. Open them when the time is right.
          </p>
        </section>

        <div className="home-links mt-10 grid gap-5 md:grid-cols-3">
          {quickLinks.map((link) => (
            <button
              key={link.title}
              type="button"
              onClick={() => onNavigate(link.page)}
              className="border-4 border-[#f9d1d9] bg-[#fffdf8]/90 p-6 text-left shadow-[8px_8px_0_rgba(131,143,88,0.42)] backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white"
            >
              <h2 className="font-mono text-lg font-black uppercase tracking-[0.14em] text-[#838f58]">
                {link.title}
              </h2>
              <p className="mt-4 font-mono text-sm leading-6 text-slate-600">
                {link.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ForSixteen
