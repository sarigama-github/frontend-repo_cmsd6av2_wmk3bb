import { useEffect, useRef, useState, useMemo } from 'react'

function downloadURI(uri, name) {
  const link = document.createElement('a')
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function PosterEditor({ initialTemplate }) {
  const canvasRef = useRef(null)
  const [title, setTitle] = useState('PORTOFOLIO')
  const [subtitle, setSubtitle] = useState('Photography & Creative Studio')
  const [primary, setPrimary] = useState('#111827')
  const [accent, setAccent] = useState('#00D2FF')
  const [bg, setBg] = useState('#ffffff')
  const [image, setImage] = useState(null)
  const [layout, setLayout] = useState('left') // left | center | split
  const [size, setSize] = useState('A4') // A4 | Square | Poster

  // Apply preset when changed
  useEffect(() => {
    if (!initialTemplate) return
    if (initialTemplate.title) setTitle(initialTemplate.title)
    if (initialTemplate.subtitle) setSubtitle(initialTemplate.subtitle)
    if (initialTemplate.primary) setPrimary(initialTemplate.primary)
    if (initialTemplate.accent) setAccent(initialTemplate.accent)
    if (initialTemplate.bg) setBg(initialTemplate.bg)
    if (initialTemplate.layout) setLayout(initialTemplate.layout)
    // refresh preview after applying
    setTimeout(() => renderCanvas(), 0)
  }, [initialTemplate])

  const dims = useMemo(() => {
    switch (size) {
      case 'Square':
        return { w: 2048, h: 2048 }
      case 'Poster':
        return { w: 2000, h: 3000 }
      default:
        return { w: 2480, h: 3508 } // A4 at ~300DPI
    }
  }, [size])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const img = new Image()
    img.onload = () => setImage(img)
    img.src = URL.createObjectURL(file)
  }

  const renderCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = dims.w
    canvas.height = dims.h
    const ctx = canvas.getContext('2d')

    // background
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // optional split accent for split layout
    if (layout === 'split') {
      ctx.fillStyle = accent + '33'
      ctx.fillRect(canvas.width * 0.55, 0, canvas.width * 0.45, canvas.height)
    }

    // image
    if (image) {
      const pad = canvas.width * 0.06
      let imgW = canvas.width - pad * 2
      let imgH = (image.height / image.width) * imgW
      if (imgH > canvas.height - pad * 2) {
        imgH = canvas.height - pad * 2
        imgW = (image.width / image.height) * imgH
      }
      let x = pad
      if (layout === 'center') x = (canvas.width - imgW) / 2
      if (layout === 'split') x = pad
      const y = pad
      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,0.15)'
      ctx.shadowBlur = 30
      ctx.drawImage(image, x, y, imgW, imgH)
      ctx.restore()
    }

    // text
    ctx.fillStyle = primary
    ctx.font = `bold ${Math.floor(canvas.width * 0.08)}px Inter, Arial, sans-serif`
    ctx.textAlign = layout === 'left' || layout === 'split' ? 'left' : 'center'
    let textX = layout === 'left' || layout === 'split' ? canvas.width * 0.08 : canvas.width / 2
    let textY = canvas.height * 0.82
    ctx.fillText(title.toUpperCase(), textX, textY)

    ctx.fillStyle = primary + 'CC'
    ctx.font = `normal ${Math.floor(canvas.width * 0.03)}px Inter, Arial, sans-serif`
    ctx.fillText(subtitle, textX, textY + canvas.height * 0.05)

    // accent underline
    const underlineY = textY + canvas.height * 0.02
    ctx.strokeStyle = accent
    ctx.lineWidth = canvas.height * 0.006
    ctx.beginPath()
    const lineStart = textX + (ctx.textAlign === 'center' ? -canvas.width * 0.15 : 0)
    const lineEnd = textX + canvas.width * 0.3
    ctx.moveTo(lineStart, underlineY)
    ctx.lineTo(lineEnd, underlineY)
    ctx.stroke()
  }

  // Auto re-render when key params change for live preview
  useEffect(() => {
    renderCanvas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, subtitle, primary, accent, bg, image, layout, size, dims.w, dims.h])

  const exportPNG = () => {
    renderCanvas()
    const uri = canvasRef.current.toDataURL('image/png')
    downloadURI(uri, `poster-${size.toLowerCase()}.png`)
  }

  return (
    <section id="editor" className="relative bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-[380px_1fr] gap-8">
        <aside className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Judul</h3>
            <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Subjudul</h3>
            <input value={subtitle} onChange={e=>setSubtitle(e.target.value)} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Warna Utama</h3>
              <input type="color" value={primary} onChange={e=>setPrimary(e.target.value)} className="mt-2 w-full h-10" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Aksen</h3>
              <input type="color" value={accent} onChange={e=>setAccent(e.target.value)} className="mt-2 w-full h-10" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Latar</h3>
              <input type="color" value={bg} onChange={e=>setBg(e.target.value)} className="mt-2 w-full h-10" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Unggah Foto</h3>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2 w-full" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Tata Letak</h3>
            <div className="mt-2 flex gap-2">
              {['left','center','split'].map(opt => (
                <button key={opt} onClick={()=>setLayout(opt)} className={`px-3 py-1 rounded border ${layout===opt? 'bg-gray-900 text-white border-gray-900':'border-gray-200'}`}>{opt}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Ukuran</h3>
            <div className="mt-2 flex gap-2">
              {['A4','Square','Poster'].map(opt => (
                <button key={opt} onClick={()=>setSize(opt)} className={`px-3 py-1 rounded border ${size===opt? 'bg-gray-900 text-white border-gray-900':'border-gray-200'}`}>{opt}</button>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <button onClick={()=>{renderCanvas();}} className="mr-2 rounded-md bg-gray-900 text-white px-4 py-2">Pratinjau</button>
            <button onClick={exportPNG} className="rounded-md border border-gray-300 px-4 py-2">Unduh PNG</button>
          </div>
        </aside>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-center justify-center">
          <div className="w-full max-w-[820px] aspect-[3/4] bg-white rounded shadow relative">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
            {!image && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                Unggah foto untuk mulai mendesain • atau ubah teks/warna di kiri
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PosterEditor
