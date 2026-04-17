'use client'
import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, Image, CheckCircle2, Loader2, X } from 'lucide-react'

export default function PatientUpload({ patientId }: { patientId: string }) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState<string[]>([])
  const [note, setNote] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    setFiles(prev => [...prev, ...dropped])
  }

  async function uploadFiles() {
    if (!files.length) return
    setUploading(true)
    const urls: string[] = []

    for (const file of files) {
      const path = `${patientId}/${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from('session-files').upload(path, file)
      if (!error) {
        const { data } = supabase.storage.from('session-files').getPublicUrl(path)
        urls.push(data.publicUrl)
      }
    }

    // Save note with image URLs
    if (urls.length > 0) {
      await supabase.from('session_notes').insert({
        patient_id: patientId,
        note_text: note || 'Patient uploaded files',
        image_url: urls[0], // primary image
      })
    }

    setUploaded(urls)
    setFiles([])
    setNote('')
    setUploading(false)
  }

  return (
    <div className="space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-[#4a7c59]/30 rounded-[2rem] p-12 text-center cursor-pointer hover:border-[#4a7c59] hover:bg-[#e8f4ec]/30 transition-all"
      >
        <Upload size={32} className="text-[#4a7c59]/50 mx-auto mb-4" />
        <p className="text-[#1a1a1a] font-medium mb-1">Drop images here or click to browse</p>
        <p className="text-[#9ca3af] text-sm">Handwritten notes, prescriptions, reports — any image</p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
          onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])} />
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {files.map((f, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden bg-[#faf7f2] border border-[#f0ebe3] aspect-square flex items-center justify-center">
                <Image size={24} className="text-[#4a7c59]/40" />
                <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-[#6b7280] px-2 truncate">{f.name}</p>
                <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
            placeholder="Add a note about these files (optional)..."
            className="w-full bg-white border border-[#f0ebe3] rounded-2xl py-3 px-5 text-sm outline-none focus:border-[#4a7c59] resize-none transition-colors" />

          <button onClick={uploadFiles} disabled={uploading}
            className="w-full py-4 rounded-full bg-[#4a7c59] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#3d6649] disabled:opacity-50 transition-all">
            {uploading ? <><Loader2 size={18} className="animate-spin" /> Uploading...</> : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}

      {uploaded.length > 0 && (
        <div className="flex items-center gap-3 p-4 bg-[#e8f4ec] rounded-2xl">
          <CheckCircle2 size={20} className="text-[#4a7c59]" />
          <p className="text-[#4a7c59] text-sm font-medium">{uploaded.length} file{uploaded.length > 1 ? 's' : ''} uploaded successfully. Your doctor can now see them.</p>
        </div>
      )}
    </div>
  )
}
