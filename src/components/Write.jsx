import { useState } from "react"

function Write({ onSave, error }) {
  const [title, setTitle] = useState("")
  const [letter, setLetter] = useState("")
  const [openDate, setOpenDate] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave() {
    const trimmedTitle = title.trim()
    const trimmedLetter = letter.trim()

    if (!trimmedLetter) {
      return
    }

    setIsSaving(true)
    const didSave = await onSave({
      title: trimmedTitle || "Untitled Letter",
      text: trimmedLetter,
      openDate,
    })
    setIsSaving(false)

    if (didSave) {
      setTitle("")
      setLetter("")
      setOpenDate("")
    }
  }

  return (
    <section
      className="
        write-enter min-h-[calc(100vh-9rem)] px-6 py-14
        bg-[#f8f8f8]
        bg-[linear-gradient(#e4e8ec_1px,transparent_1px),
        linear-gradient(90deg,#e4e8ec_1px,transparent_1px)]
        bg-[size:24px_24px]
      "
    >
      <div className="mx-auto max-w-6xl border-4 border-[#f9d1d9] bg-[#fffdf8] shadow-[10px_10px_0_rgba(131,143,88,0.65)]">
        <div
          className="
            relative min-h-[34rem] px-14 py-10
            bg-[linear-gradient(to_bottom,transparent_31px,#d8dee6_32px)]
            bg-[length:100%_32px]
          "
        >
          <div className="absolute bottom-0 left-9 top-0 w-px bg-[#f9b8c4]" />

          <div className="relative mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="font-mono text-3xl font-black uppercase tracking-[0.16em] text-[#838f58]">
              Write a Letter
            </h1>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[#838f58]">
                Open Date
                <input
                  type="date"
                  value={openDate}
                  onChange={(event) => setOpenDate(event.target.value)}
                  className="
                    mt-2 block border-4 border-[#f9d1d9] bg-[#fffdf8]
                    px-4 py-2 font-mono text-sm text-zinc-900 outline-none
                    focus:border-[#838f58]
                  "
                />
                <span className="mt-2 block text-[10px] tracking-[0.12em] text-zinc-400">
                  Leave blank for anytime
                </span>
              </label>

              <button
                type="button"
                onClick={handleSave}
                disabled={!letter.trim() || isSaving}
                className="
                  border-4 border-[#838f58] bg-[#f9d1d9] px-6 py-3
                  font-mono text-sm font-black uppercase tracking-[0.16em]
                  text-zinc-900 shadow-[5px_5px_0_rgba(131,143,88,0.7)]
                  transition hover:-translate-y-0.5 hover:bg-[#f7c4cf]
                  disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0
                "
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {error && (
            <p className="relative mb-5 border-4 border-[#f9d1d9] bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-rose-500">
              {error}
            </p>
          )}

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="
              relative mb-2 w-full bg-transparent font-mono text-2xl
              font-black uppercase tracking-[0.14em] text-[#838f58]
              outline-none placeholder:text-[#838f58]/45
            "
            placeholder="Letter title"
          />

          <textarea
            value={letter}
            onChange={(event) => setLetter(event.target.value)}
            className="
              relative min-h-[24rem] w-full resize-none bg-transparent
              font-mono text-lg leading-8 text-zinc-800 outline-none
              placeholder:text-zinc-400
            "
            placeholder="Start writing here..."
          />
        </div>
      </div>
    </section>
  )
}

export default Write
