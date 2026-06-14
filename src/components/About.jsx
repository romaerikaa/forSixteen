const features = [
  {
    title: "Write",
    text: "Leave a letter for us .",
  },
  {
    title: "Vault",
    text: "Keep sealed messages waiting until their time arrives.",
  },
  {
    title: "Gallery",
    text: "Collect photos as small polaroid memories.",
  },
]

function About() {
  return (
    <section className="about-enter min-h-[calc(100vh-9rem)] bg-[#eef2f5] px-6 py-16 vault-grid">
      <div className="mx-auto max-w-5xl">
        <div className="relative border-4 border-[#f9d1d9] bg-[#fffdf8] px-8 py-10 shadow-[12px_12px_0_rgba(131,143,88,0.45)] sm:px-14 sm:py-14">
          <div className="absolute left-1/2 top-0 h-9 w-32 -translate-x-1/2 -translate-y-1/2 rotate-1 bg-[#f9d1d9]/70 shadow-sm" />

          <p className="font-mono text-xs font-black uppercase tracking-[0.22em] text-[#838f58]">
            About
          </p>
          <h1 className="mt-4 font-mono text-4xl font-black uppercase tracking-[0.14em] text-slate-800">
            ForSixteen
          </h1>

          <div className="mt-8 max-w-3xl space-y-5 font-serif text-2xl leading-10 text-slate-700">
            <p>
              FORSIXTEEN is a small digital time capsule for Roma & Kate where we can upload letters, photos,
              and memories.
            </p>
            <p>
              I created this for our 8th monthsary but we can continue adding to it for as long as we want. It’s a place to save things for the future us to look back on.
            </p>
            <p className="text-[#838f58]">
              Some memories are meant to wait.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="border-4 border-[#f9d1d9] bg-white/75 p-5 shadow-[6px_6px_0_rgba(148,163,184,0.35)]"
              >
                <h2 className="font-mono text-sm font-black uppercase tracking-[0.18em] text-[#838f58]">
                  {feature.title}
                </h2>
                <p className="mt-4 font-mono text-sm leading-6 text-slate-600">
                  {feature.text}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-12 border-t border-slate-200 pt-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            I created this out of love.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
