import { useEffect, useState } from "react"

import { supabase } from "../lib/supabase"

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function mapMemory(row) {
  return {
    id: row.id,
    image: row.image_url,
    title: row.title,
    caption: row.caption,
    date: formatDate(row.created_at),
  }
}

function Gallery({ user }) {
  const [memories, setMemories] = useState([])
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) {
      setMemories([])
      return
    }

    async function loadMemories() {
      const { data, error } = await supabase
        .from("gallery_memories")
        .select("*")
        .eq("account_name", user.id)
        .order("created_at", { ascending: false })

      if (!error) {
        setMemories(data.map(mapMemory))
      }
    }

    loadMemories()
  }, [user])

  function handleImageChange(event) {
    const file = event.target.files?.[0]
    setImageFile(file || null)
  }

  async function handleSave(event) {
    event.preventDefault()

    if (!imageFile) {
      return
    }

    setIsSaving(true)
    setError("")

    const fileExtension = imageFile.name.split(".").pop()
    const filePath = `${user.id}/${crypto.randomUUID()}.${fileExtension}`

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, imageFile)

    if (uploadError) {
      setError("Photo upload failed.")
      setIsSaving(false)
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(filePath)

    const { data, error: insertError } = await supabase
      .from("gallery_memories")
      .insert({
        account_name: user.id,
        title: title.trim() || "Untitled Memory",
        caption: caption.trim(),
        image_url: publicUrlData.publicUrl,
      })
      .select()
      .single()

    setIsSaving(false)

    if (insertError) {
      setError("Memory save failed.")
      return
    }

    setMemories([mapMemory(data), ...memories])
    setTitle("")
    setCaption("")
    setImageFile(null)
    event.target.reset()
  }

  return (
    <section className="gallery-enter min-h-[calc(100vh-9rem)] bg-[#f5f6f0] px-6 py-12 vault-grid">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="font-mono text-3xl font-black uppercase tracking-[0.18em] text-[#838f58]">
              Gallery
            </h1>
            <p className="mt-3 font-mono text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
              Polaroid Memory Board
            </p>
          </div>

          <form
            onSubmit={handleSave}
            className="w-full max-w-xl border-4 border-[#f9d1d9] bg-[#fffdf8] p-5 shadow-[8px_8px_0_rgba(131,143,88,0.45)]"
          >
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <label className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[#838f58]">
                Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 block w-full font-mono text-sm text-slate-600 file:mr-4 file:border-0 file:bg-[#f9d1d9] file:px-4 file:py-2 file:font-mono file:font-black file:uppercase file:tracking-[0.12em] file:text-slate-900"
                />
              </label>

              <button
                type="submit"
                disabled={!imageFile || isSaving}
                className="self-end border-4 border-[#838f58] bg-[#f9d1d9] px-6 py-3 font-mono text-sm font-black uppercase tracking-[0.16em] text-slate-900 shadow-[5px_5px_0_rgba(131,143,88,0.55)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
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

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {memories.length === 0 ? (
            <div className="col-span-full border-4 border-[#f9d1d9] bg-[#fffdf8] p-8 font-mono text-slate-500 shadow-[8px_8px_0_rgba(131,143,88,0.45)]">
              No memories yet.
            </div>
          ) : (
            memories.map((memory, index) => (
              <article
                key={memory.id}
                className={`polaroid-card relative bg-[#fffdf8] p-4 pb-7 shadow-[10px_12px_0_rgba(148,163,184,0.35)] ${
                  index % 3 === 0
                    ? "-rotate-2"
                    : index % 3 === 1
                      ? "rotate-1"
                      : "rotate-2"
                }`}
              >
                <div className="absolute left-1/2 top-0 h-8 w-24 -translate-x-1/2 -translate-y-1/2 rotate-2 bg-[#f9d1d9]/70 shadow-sm" />
                <img
                  src={memory.image}
                  alt=""
                  className="aspect-square w-full object-cover"
                />
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
