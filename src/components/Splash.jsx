import frontImage from "../assets/front.png"

function Splash({ onContinue }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f6f0]">
      <section className="w-full">
        <img
          src={frontImage}
          alt="ForSixteen"
          onAnimationEnd={onContinue}
          className="splash-front mx-auto max-h-[62vh] w-full object-contain"
        />
      </section>
    </main>
  )
}

export default Splash
