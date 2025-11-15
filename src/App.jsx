import { useRef, useState } from 'react'
import Hero from './components/Hero'
import PosterEditor from './components/PosterEditor'
import Templates from './components/Templates'

function App() {
  const editorRef = useRef(null)
  const [template, setTemplate] = useState(null)

  const scrollToEditor = () => {
    const el = document.getElementById('editor')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero onGetStarted={scrollToEditor} />

      <Templates onUse={(preset)=>{ setTemplate(preset); scrollToEditor(); }} />

      <PosterEditor ref={editorRef} initialTemplate={template} />

      <footer className="py-10 text-center text-sm text-gray-500">
        Dibuat untuk eksplorasi portofolio desain poster modern.
      </footer>
    </div>
  )
}

export default App
