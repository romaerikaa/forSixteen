function FirstVisitNotice({ onDismiss }) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-slate-900/20 px-3 py-24 backdrop-blur-sm sm:px-6 sm:py-28 lg:items-center lg:py-12">
      <button
        type="button"
        onClick={onDismiss}
        className="absolute inset-0 cursor-default"
        aria-label="Close notice"
      />

      <section className="letter-paper relative min-h-[30rem] w-[94vw] max-w-[70rem] bg-[#fbfaf5] px-5 pb-9 pt-14 shadow-[0_18px_45px_rgba(75,85,99,0.18)] sm:min-h-[39rem] sm:w-[82vw] sm:px-12 sm:pb-12 sm:pt-16">
        <button
          type="button"
          onClick={onDismiss}
          className="
            absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full
            border-4 border-[#838f58] bg-[#f9d1d9] font-mono text-2xl font-black
            leading-none text-slate-900 shadow-[4px_4px_0_rgba(131,143,88,0.55)]
            transition hover:-translate-y-0.5 hover:bg-[#ffb9d0] sm:right-5 sm:top-5 sm:h-12 sm:w-12
          "
          aria-label="Close notice"
        >
          ×
        </button>

        <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-white/70 to-transparent" />
        <p className="letter-words relative z-10 font-mono text-xs font-black uppercase tracking-[0.18em] text-[#838f58]">
          Notice
        </p>
        <h2 className="letter-words relative z-10 mt-4 break-words font-mono text-2xl font-black uppercase tracking-[0.12em] text-slate-600 sm:text-3xl sm:tracking-[0.16em]">
          Dear stargirl,
        </h2>
        <p className="letter-words relative z-10 mt-6 whitespace-pre-wrap break-words font-serif text-xl leading-8 text-slate-700 sm:text-2xl sm:leading-10">
          Happy 8th Monthsary baby! I want you to always remember that I love you very much and you're my motivation.
          {"\n\n"}
          I hope you like this little project I made for you and me, and I hope it can be a nice place for you to keep your precious memories.
          {"\n\n"}
          Thank you for being in my life.
        </p>
        <p className="letter-words relative z-10 mt-10 text-right font-serif text-xl italic leading-8 text-slate-700 sm:text-2xl sm:leading-10">
          with all my heart,
          <br />
          Amor
        </p>
      </section>
    </div>
  )
}

export default FirstVisitNotice
