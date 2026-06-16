import { useEffect, useState } from "react"

import { isSupabaseConfigured, supabase } from "../lib/supabase"

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getFileExtension(url) {
  return url.split("?")[0].split(".").pop()?.toLowerCase() || ""
}

function getMediaTypeFromUrl(url) {
  const extension = getFileExtension(url)

  if (["mp3", "m4a", "aac", "wav", "ogg", "flac"].includes(extension)) {
    return "audio"
  }

  if (["mp4", "mov", "webm", "m4v"].includes(extension)) {
    return "video"
  }

  return "image"
}

function getAudioMimeType(url) {
  const extension = getFileExtension(url)
  const mimeTypes = {
    aac: "audio/aac",
    flac: "audio/flac",
    m4a: "audio/mp4",
    mp3: "audio/mpeg",
    ogg: "audio/ogg",
    wav: "audio/wav",
  }

  return mimeTypes[extension] || "audio/mpeg"
}

function mapMemory(row) {
  const savedMediaType = row.media_type

  return {
    id: row.id,
    mediaUrl: row.image_url,
    mediaType:
      savedMediaType && savedMediaType !== "image"
        ? savedMediaType
        : getMediaTypeFromUrl(row.image_url),
    title: row.title,
    caption: row.caption,
    date: formatDate(row.created_at),
  }
}

function createLocalMemory({ mediaUrl, mediaType, title, caption }) {
  return {
    id: crypto.randomUUID(),
    mediaUrl,
    mediaType,
    title,
    caption,
    date: formatDate(new Date().toISOString()),
  }
}

function getAccountNames(user) {
  return Array.from(
    new Set([user.id, user.name, user.id?.toLowerCase(), user.name?.toLowerCase()].filter(Boolean)),
  )
}

function getSharedGalleryAccountNames(user) {
  return Array.from(new Set([...getAccountNames(user), "stargirl", "Roam", "roam"]))
}

function Gallery({ user }) {
  const [memories, setMemories] = useState([])
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [mediaFile, setMediaFile] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) {
      return
    }

    async function loadMemories() {
      if (!isSupabaseConfigured) {
        setError("Supabase is not configured on this deployment.")
        return
      }

      const { data, error } = await supabase
        .from("gallery_memories")
        .select("*")
        .in("account_name", getSharedGalleryAccountNames(user))
        .order("created_at", { ascending: false })

      if (error) {
        setError(`Gallery could not load: ${error.message}`)
        return
      }

      setError("")
      setMemories(data.map(mapMemory))
    }

    loadMemories()
  }, [user])

  function handleMediaChange(event) {
    const file = event.target.files?.[0]
    setMediaFile(file || null)
  }

  async function handleSave(event) {
    event.preventDefault()

    if (!mediaFile) {
      return
    }

    setIsSaving(true)
    setError("")

    if (!isSupabaseConfigured) {
      setError(
        "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.",
      )
      setIsSaving(false)
      return
    }

    const mediaType = mediaFile.type.startsWith("video/")
      ? "video"
      : mediaFile.type.startsWith("audio/")
        ? "audio"
        : "image"
    const fileExtension = mediaFile.name.split(".").pop()
    const filePath = `${user.id}/${crypto.randomUUID()}.${fileExtension}`

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, mediaFile, {
        contentType: mediaFile.type,
      })

    if (uploadError) {
      setError(`Memory upload failed: ${uploadError.message}`)
      setIsSaving(false)
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(filePath)

    const memoryTitle = title.trim() || "Untitled Memory"
    const memoryCaption = caption.trim()

    const { error: insertError } = await supabase
      .from("gallery_memories")
      .insert({
        account_name: user.id,
        title: memoryTitle,
        caption: memoryCaption,
        image_url: publicUrlData.publicUrl,
        media_type: mediaType,
      })

    setIsSaving(false)

    if (insertError) {
      setError(`Memory save failed: ${insertError.message}`)
      return
    }

    setMemories((currentMemories) => [
      createLocalMemory({
        mediaUrl: publicUrlData.publicUrl,
        mediaType,
        title: memoryTitle,
        caption: memoryCaption,
      }),
      ...currentMemories,
    ])
    setTitle("")
    setCaption("")
    setMediaFile(null)
    event.target.reset()
  }

  return (
    <section className="gallery-enter min-h-screen bg-[#f5f6f0] px-4 pb-8 pt-28 vault-grid sm:px-6 sm:pb-12 sm:pt-36 lg:pt-64 xl:pt-72">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="font-mono text-2xl font-black uppercase tracking-[0.14em] text-[#838f58] sm:text-3xl sm:tracking-[0.18em]">
              Gallery
            </h1>
            <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-500 sm:text-sm">
              Polaroid Memory Board
            </p>
          </div>

          <form
            onSubmit={handleSave}
            className="w-full max-w-xl border-4 border-[#f9d1d9] bg-[#fffdf8] p-4 shadow-[6px_6px_0_rgba(131,143,88,0.45)] sm:p-5 sm:shadow-[8px_8px_0_rgba(131,143,88,0.45)]"
          >
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <label className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[#838f58]">
                Photo / Video / Audio
                <input
                  type="file"
                  accept="image/*,video/*,audio/*"
                  onChange={handleMediaChange}
                  className="mt-2 block w-full max-w-full overflow-hidden font-mono text-xs text-slate-600 outline-none transition file:mr-3 file:cursor-pointer file:border-0 file:bg-[#ff7faf] file:px-3 file:py-2 file:font-mono file:font-black file:uppercase file:tracking-[0.1em] file:text-slate-950 file:shadow-[4px_4px_0_rgba(131,143,88,0.55)] file:transition hover:file:-translate-y-0.5 hover:file:bg-[#ff5f9b] focus-visible:ring-4 focus-visible:ring-[#ff9fc3] active:file:translate-x-0.5 active:file:translate-y-0.5 active:file:shadow-[2px_2px_0_rgba(131,143,88,0.7)] sm:text-sm sm:file:mr-4 sm:file:px-4 sm:file:tracking-[0.12em]"
                />
              </label>

              <button
                type="submit"
                disabled={!mediaFile || isSaving}
                className="w-full self-end border-4 border-[#838f58] bg-[#f9d1d9] px-6 py-3 font-mono text-sm font-black uppercase tracking-[0.16em] text-slate-900 shadow-[5px_5px_0_rgba(131,143,88,0.55)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 sm:w-auto"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-5 w-full border-4 border-[#f9d1d9] bg-white px-4 py-3 font-mono text-sm font-bold uppercase tracking-[0.12em] text-slate-800 outline-none focus:border-[#838f58]"
              placeholder="Memory title"
            />

            <textarea
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              className="mt-4 min-h-24 w-full resize-none border-4 border-[#f9d1d9] bg-white px-4 py-3 font-mono text-sm leading-6 text-slate-800 outline-none focus:border-[#838f58]"
              placeholder="Caption..."
            />

            {error && (
              <p className="mt-4 border-4 border-[#f9d1d9] bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-rose-500">
                {error}
              </p>
            )}
          </form>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {memories.length === 0 ? (
            <div className="col-span-full border-4 border-[#f9d1d9] bg-[#fffdf8] p-8 font-mono text-slate-500 shadow-[8px_8px_0_rgba(131,143,88,0.45)]">
              No memories yet.
            </div>
          ) : (
            memories.map((memory, index) => (
              <article
                key={memory.id}
                className={`polaroid-card relative bg-[#fffdf8] p-4 pb-7 shadow-[7px_9px_0_rgba(148,163,184,0.35)] sm:shadow-[10px_12px_0_rgba(148,163,184,0.35)] ${
                  index % 3 === 0
                    ? "-rotate-2"
                    : index % 3 === 1
                      ? "rotate-1"
                      : "rotate-2"
                }`}
              >
                <div className="absolute left-1/2 top-0 h-8 w-24 -translate-x-1/2 -translate-y-1/2 rotate-2 bg-[#f9d1d9]/70 shadow-sm" />
                {memory.mediaType === "video" ? (
                  <video
                    src={memory.mediaUrl}
                    controls
                    className="aspect-square w-full bg-slate-950 object-cover"
                  />
                ) : memory.mediaType === "audio" ? (
                  <div className="flex aspect-square w-full flex-col items-center justify-center gap-5 bg-[#fff1f6] p-5">
                    <div className="flex h-24 w-24 items-center justify-center border-4 border-[#f9d1d9] bg-white text-5xl shadow-[5px_5px_0_rgba(131,143,88,0.35)]">
                      🎵
                    </div>
                    <audio controls preload="metadata" className="w-full">
                      <source src={memory.mediaUrl} type={getAudioMimeType(memory.mediaUrl)} />
                      <a href={memory.mediaUrl}>Open audio</a>
                    </audio>
                    <a
                      href={memory.mediaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#838f58]"
                    >
                      Open audio
                    </a>
                  </div>
                ) : (
                  <img
                    src={memory.mediaUrl}
                    alt=""
                    className="aspect-square w-full object-cover"
                  />
                )}
                <h2 className="mt-5 truncate font-mono text-sm font-black uppercase tracking-[0.14em] text-[#838f58]">
                  {memory.title}
                </h2>
                {memory.caption && (
                  <p className="mt-2 line-clamp-3 font-serif text-lg leading-6 text-slate-700">
                    {memory.caption}
                  </p>
                )}
                <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {memory.date}
                </p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Gallery
