import bgForSixteen from "../assets/bg forsixteen.png"
import photoSix from "../assets/6-cutout.png"
import photoSeven from "../assets/7-cutout.png"
import photoEight from "../assets/8-cutout.png"
import photoNine from "../assets/9-cutout.png"

const quickLinks = [
  { title: "Write a Letter", text: "Save words for later.", page: 1 },
  { title: "Open Vault", text: "Visit sealed messages.", page: 2 },
  { title: "View Gallery", text: "Collect photo memories.", page: 3 },
]

function ForSixteen({ onNavigate }) {
  return (
    <main
      className="min-h-screen bg-center bg-no-repeat px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-36 lg:pt-64 xl:pt-72"
      style={{
        backgroundImage: `url("${bgForSixteen}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.95fr)] lg:gap-4">
          <section className="home-intro max-w-3xl border-4 border-[#f9d1d9] bg-[#fffdf8]/92 px-5 py-8 shadow-[7px_7px_0_rgba(131,143,88,0.45)] backdrop-blur-sm sm:px-12 sm:py-10 sm:shadow-[12px_12px_0_rgba(131,143,88,0.45)]">
            <p className="font-mono text-xs font-black uppercase tracking-[0.22em] text-[#838f58]">
              Letters + Memories
            </p>
            <h1 className="mt-4 break-words font-mono text-3xl font-black uppercase tracking-[0.12em] text-slate-900 sm:text-5xl sm:tracking-[0.14em]">
              ForSixteen
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-2xl leading-9 text-slate-700 sm:mt-7 sm:text-3xl sm:leading-11">
              A digital time capsule for the words and moments you want to keep.
            </p>
            <p className="mt-6 font-mono text-xs font-bold uppercase leading-6 tracking-[0.14em] text-slate-500 sm:text-sm sm:tracking-[0.16em]">
              Write a letter now. Save a photo. Open them when the time is right.
            </p>
          </section>

          <section className="home-collage relative mx-auto h-[18rem] w-full max-w-xl overflow-visible sm:h-[25rem] lg:h-[27rem] lg:max-w-none" aria-label="Photo collage">
            <figure className="home-photo home-photo-one absolute left-[2%] top-[6%] z-20 h-[7.2rem] w-[10.6rem] rotate-[-8deg] sm:left-[5%] sm:top-[5%] sm:h-[11rem] sm:w-[17rem] sm:rotate-[-10deg] lg:left-[1%] lg:w-[18rem]">
              <img src={photoSeven} alt="" className="h-full w-full object-contain" />
            </figure>
            <figure className="home-photo home-photo-two absolute right-[1%] top-[3%] z-10 h-[7rem] w-[10.4rem] rotate-[5deg] sm:right-[3%] sm:top-[2%] sm:h-[10rem] sm:w-[16rem] lg:w-[17rem]">
              <img src={photoNine} alt="" className="h-full w-full object-contain" />
            </figure>
            <figure className="home-photo home-photo-three absolute bottom-[20%] left-[14%] z-30 h-[7.4rem] w-[11rem] rotate-[2deg] sm:h-[10.5rem] sm:w-[16rem]">
              <img src={photoEight} alt="" className="h-full w-full object-contain" />
            </figure>
            <figure className="home-photo home-photo-four absolute bottom-[2%] right-[4%] z-20 h-[6.8rem] w-[10rem] rotate-[-1deg] sm:bottom-[8%] sm:right-[8%] sm:h-[10rem] sm:w-[15rem]">
              <img src={photoSix} alt="" className="h-full w-full object-contain" />
            </figure>
          </section>
        </div>

        <div className="home-links mt-10 grid gap-5 md:grid-cols-3">
          {quickLinks.map((link) => (
            <button
              key={link.title}
              type="button"
              onClick={() => onNavigate(link.page)}
              className="border-4 border-[#f9d1d9] bg-[#fffdf8]/90 p-5 text-left shadow-[6px_6px_0_rgba(131,143,88,0.42)] backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white sm:p-6 sm:shadow-[8px_8px_0_rgba(131,143,88,0.42)]"
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
