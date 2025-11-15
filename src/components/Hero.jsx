import Spline from '@splinetool/react-spline'

function Hero({ onGetStarted }) {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white pointer-events-none" />

      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex items-center">
        <div className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
          <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-white/80">Portofolio • Desain Poster</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold leading-tight">
            Editor Poster Modern
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-white/90">
            Buat poster keren untuk portofolio fotografi dan kreativitas Anda. Atur teks, unggah foto, pilih warna, dan ekspor PNG siap bagikan.
          </p>
          <div className="mt-6 flex gap-3">
            <button onClick={onGetStarted} className="rounded-md bg-white text-gray-900 px-5 py-2.5 font-semibold shadow/50 shadow-black/20 hover:shadow-black/30 hover:shadow-md transition">
              Mulai Edit
            </button>
            <a href="#templates" className="rounded-md border border-white/50 text-white px-5 py-2.5 font-semibold hover:bg-white/10 transition">
              Lihat Template
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
