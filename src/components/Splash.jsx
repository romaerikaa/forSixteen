import frontImage from "../assets/front.png"

function Splash({ onContinue }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f6f0] px-4">
      <section className="w-full">
        <img
          src={frontImage}
          alt="ForSixteen"
          onAnimationEnd={onContinue}
          className="splash-front mx-auto w-48 sm:w-64 lg:w-80 max-h-[58vh] w-full object-contain sm:max-h-[62vh]"
        />
      </section>
    </main>
  )
}

export default Splash
