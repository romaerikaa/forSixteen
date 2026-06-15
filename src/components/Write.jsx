import { useRef, useState } from "react"

import ribbonImage from "../assets/ribbon.png"

const stickerChoices = [
  "💖",
  "💕",
  "💗",
  "💘",
  "💌",
  "😉",
  "😘",
  "🤗",
  "🤓",
  "🫰",
  "⭐",
  "🌟",
  "✨",
  "🌙",
  "☁️",
  "🌈",
  "🎀",
  "🎗️",
  "🌷",
  "🌸",
  "🌺",
  "🌻",
  "🦋",
  "🍓",
  "🍒",
  "🍰",
  "🍬",
  "🧸",
  "📷",
  "🎧",
  "🎵",
  "🎨",
  "✉️",
  "📝",
  "🔒",
  "🗝️",
  "💐",
  "🕯️",
  "🪄",
  "👑",
  "💎",
  "🫶",
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getTodayInputDate() {
  const today = new Date()
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
  return today.toISOString().slice(0, 10)
}

function Write({ onSave, error }) {
  const [title, setTitle] = useState("")
  const [letter, setLetter] = useState("")
  const [openDateTime, setOpenDateTime] = useState("")
  const [stickers, setStickers] = useState([])
  const [isStickerTrayOpen, setIsStickerTrayOpen] = useState(false)
  const [draggingStickerId, setDraggingStickerId] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const paperRef = useRef(null)
  const openDate = openDateTime.slice(0, 10)
  const openTime = openDateTime.slice(11, 16)

  function updateOpenDateTime(nextDate, nextTime) {
    if (!nextDate) {
      setOpenDateTime("")
      return
    }

    setOpenDateTime(`${nextDate}T${nextTime || "00:00"}`)
  }

  function clearOpenDateTime() {
    setOpenDateTime("")
  }

  function getStickerPosition(event) {
    const paper = paperRef.current

    if (!paper) {
      return { x: 50, y: 50 }
    }

    const bounds = paper.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100

    return {
      x: clamp(x, 4, 96),
      y: clamp(y, 4, 96),
    }
  }

  function addSticker(emoji) {
    setStickers((currentStickers) => [
      ...currentStickers,
      {
        id: crypto.randomUUID(),
        emoji,
        x: clamp(48 + currentStickers.length * 5, 10, 90),
        y: clamp(34 + currentStickers.length * 5, 12, 88),
      },
    ])
  }

  function moveSticker(stickerId, event) {
    const nextPosition = getStickerPosition(event)

    setStickers((currentStickers) =>
      currentStickers.map((sticker) =>
        sticker.id === stickerId ? { ...sticker, ...nextPosition } : sticker,
      ),
    )
  }

  function handleStickerPointerDown(stickerId, event) {
    event.preventDefault()
    event.currentTarget.setPointerCapture?.(event.pointerId)
    setDraggingStickerId(stickerId)
    moveSticker(stickerId, event)
  }

  function handleStickerPointerMove(event) {
    if (!draggingStickerId) {
      return
    }

    moveSticker(draggingStickerId, event)
  }

  function stopDragging() {
    setDraggingStickerId("")
  }

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
      openDate: "",
      openAt: openDateTime ? new Date(openDateTime).toISOString() : "",
      stickers,
    })
    setIsSaving(false)

    if (didSave) {
      setTitle("")
      setLetter("")
      setOpenDateTime("")
      setStickers([])
      setIsStickerTrayOpen(false)
    }
  }

  return (
    <section
      className="
        write-enter min-h-screen px-4 pb-8 pt-28 sm:px-6 sm:pb-14 sm:pt-36 lg:pt-64 xl:pt-72
        bg-[#f8f8f8]
        bg-[linear-gradient(#e4e8ec_1px,transparent_1px),
        linear-gradient(90deg,#e4e8ec_1px,transparent_1px)]
        bg-[size:24px_24px]
      "
    >
      <div className="mx-auto max-w-6xl border-4 border-[#f9d1d9] bg-[#fffdf8] shadow-[6px_6px_0_rgba(131,143,88,0.65)] sm:shadow-[10px_10px_0_rgba(131,143,88,0.65)]">
        <div
          ref={paperRef}
          onPointerMove={handleStickerPointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          className="
            relative min-h-[30rem] px-5 py-7 sm:min-h-[34rem] sm:px-14 sm:py-10
            bg-[linear-gradient(to_bottom,transparent_31px,#d8dee6_32px)]
            bg-[length:100%_32px]
          "
        >
          <div className="absolute bottom-0 left-4 top-0 w-px bg-[#f9b8c4] sm:left-9" />

          <div className="relative mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="break-words font-mono text-2xl font-black uppercase tracking-[0.12em] text-[#838f58] sm:text-3xl sm:tracking-[0.16em]">
              Write a Letter
            </h1>

            <div className="grid w-full gap-3 sm:grid-cols-[minmax(15rem,1fr)_auto] sm:items-start lg:w-auto">
              <label className="flex flex-col font-mono text-xs font-black uppercase tracking-[0.16em] text-[#838f58]">
                Open Time
                <div className="relative mt-2 hidden sm:block">
                  {!openDateTime && (
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs font-black uppercase tracking-[0.12em] text-zinc-400 md:text-sm">
                      Pick date and time
                    </span>
                  )}
                  <input
                    type="datetime-local"
                    value={openDateTime}
                    onChange={(event) => setOpenDateTime(event.target.value)}
                    className={`
                      block h-[3.5rem] min-w-0 w-full appearance-none border-4 border-[#f9d1d9] bg-[#fffdf8]
                      px-4 py-2 font-mono text-sm outline-none
                      focus:border-[#838f58]
                      ${openDateTime ? "text-zinc-900" : "text-transparent"}
                    `}
                  />
                </div>
                <div className="mt-2 grid min-w-0 grid-cols-1 gap-2 sm:hidden">
                  <div className="relative">
                    {!openDate && (
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm font-black uppercase tracking-[0.12em] text-zinc-400">
                        Pick date
                      </span>
                    )}
                    <input
                      type="date"
                      value={openDate}
                      onChange={(event) => updateOpenDateTime(event.target.value, openTime)}
                      className={`
                        h-14 min-w-0 w-full appearance-none border-4 border-[#f9d1d9] bg-[#fffdf8]
                        px-3 py-2 font-mono text-base outline-none
                        focus:border-[#838f58]
                        ${openDate ? "text-zinc-900" : "text-transparent"}
                      `}
                    />
                  </div>
                  <div className="relative">
                    {!openTime && (
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm font-black uppercase tracking-[0.12em] text-zinc-400">
                        Pick time
                      </span>
                    )}
                    <input
                      type="time"
                      value={openTime}
                      onChange={(event) =>
                        updateOpenDateTime(openDate || getTodayInputDate(), event.target.value)
                      }
                      className={`
                        h-14 min-w-0 w-full appearance-none border-4 border-[#f9d1d9] bg-[#fffdf8]
                        px-3 py-2 font-mono text-base outline-none
                        focus:border-[#838f58]
                        ${openTime ? "text-zinc-900" : "text-transparent"}
                      `}
                    />
                  </div>
                </div>
                <span className="mt-2 flex flex-wrap items-center gap-3 text-[10px] tracking-[0.12em] text-zinc-400">
                  Leave blank for anytime
                  {openDateTime && (
                    <button
                      type="button"
                      onClick={clearOpenDateTime}
                      className="font-mono font-black uppercase tracking-[0.14em] text-[#ff4f96] transition hover:text-[#838f58]"
                    >
                      Clear time
                    </button>
                  )}
                </span>
              </label>

              <div className="flex flex-col">
                <span className="hidden h-[1.25rem] sm:block" aria-hidden="true" />
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!letter.trim() || isSaving}
                  className="
                    h-[3.5rem] w-full border-4 border-[#838f58] bg-[#f9d1d9] px-6 py-3 sm:w-auto
                    font-mono text-sm font-black uppercase tracking-[0.16em]
                    text-zinc-900 shadow-[5px_5px_0_rgba(131,143,88,0.7)]
                    transition hover:-translate-y-0.5 hover:bg-[#f7c4cf]
                    disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0
                  "
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>

                <div className="relative z-50 mt-4 inline-flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsStickerTrayOpen((isOpen) => !isOpen)}
                    className="
                      h-11 w-full border-4 border-[#ff6ea8] bg-[#f9d1d9] px-5 font-mono text-xs font-black
                      uppercase tracking-[0.16em] text-zinc-900 shadow-[3px_3px_0_rgba(131,143,88,0.45)]
                      transition hover:-translate-y-0.5 hover:bg-[#f7c4cf] sm:w-auto
                    "
                    aria-expanded={isStickerTrayOpen}
                  >
                    Stickers
                  </button>

                  {isStickerTrayOpen && (
                    <div className="absolute right-0 top-14 w-[min(82vw,24rem)] border-4 border-[#f9d1d9] bg-[#fffaf6] p-4 shadow-[7px_7px_0_rgba(131,143,88,0.55)]">
                      <img
                        src={ribbonImage}
                        alt=""
                        className="pointer-events-none absolute -right-10 -top-9 w-20 rotate-15 drop-shadow-[0_6px_5px_rgba(190,70,112,0.2)]"
                      />

                      <div className="mb-3 flex items-center justify-between gap-3 border-b-4 border-[#f9d1d9] pb-3 pr-20">
                        <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#838f58]">
                          Pick Sticker
                        </p>
                        {stickers.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setStickers([])}
                            className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#ff4f96] transition hover:text-[#838f58]"
                          >
                            Clear
                          </button>
                        )}
                      </div>

                      <div className="grid max-h-72 grid-cols-6 gap-2 overflow-y-auto pr-1 sm:grid-cols-8">
                        {stickerChoices.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => addSticker(emoji)}
                            className="
                              flex aspect-square items-center justify-center border-2 border-[#f9d1d9] bg-white
                              text-2xl shadow-[2px_2px_0_rgba(131,143,88,0.32)]
                              transition hover:-translate-y-0.5 hover:border-[#ff6ea8] hover:bg-[#fff1f6]
                            "
                            aria-label={`Add ${emoji} sticker`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
              relative mb-2 w-full bg-transparent font-mono text-xl
              font-black uppercase tracking-[0.1em] text-[#838f58]
              outline-none placeholder:text-[#838f58]/45
              sm:text-2xl sm:tracking-[0.14em]
            "
            placeholder="Letter title"
          />

          <textarea
            value={letter}
            onChange={(event) => setLetter(event.target.value)}
            className="
              relative min-h-[20rem] w-full resize-none bg-transparent
              font-mono text-base leading-8 text-zinc-800 outline-none
              placeholder:text-zinc-400
              sm:min-h-[24rem] sm:text-lg
            "
            placeholder="Start writing here..."
          />

          <div className="pointer-events-none absolute inset-0 z-30">
            {stickers.map((sticker) => (
              <button
                key={sticker.id}
                type="button"
                onPointerDown={(event) => handleStickerPointerDown(sticker.id, event)}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
                onDoubleClick={() =>
                  setStickers((currentStickers) =>
                    currentStickers.filter((currentSticker) => currentSticker.id !== sticker.id),
                  )
                }
                className="
                  pointer-events-auto absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2
                  touch-none select-none items-center justify-center text-4xl drop-shadow-[0_5px_4px_rgba(15,23,42,0.22)]
                  transition hover:scale-110 sm:h-14 sm:w-14 sm:text-5xl
                "
                style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
                aria-label={`Move ${sticker.emoji} sticker`}
              >
                {sticker.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Write
