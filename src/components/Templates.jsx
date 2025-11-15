function Templates({ onUse }) {
  const presets = [
    {
      name: 'Minimal Photo',
      title: 'URBAN LIGHTS',
      subtitle: 'Street Photography Series',
      primary: '#111827',
      accent: '#06B6D4',
      bg: '#ffffff',
      layout: 'left',
    },
    {
      name: 'Center Bold',
      title: 'CREATIVE STUDIO',
      subtitle: 'Art Direction & Visual',
      primary: '#0f172a',
      accent: '#8B5CF6',
      bg: '#ffffff',
      layout: 'center',
    },
    {
      name: 'Split Accent',
      title: 'PORTFOLIO',
      subtitle: 'Photography • Design',
      primary: '#0b1220',
      accent: '#22C55E',
      bg: '#f8fafc',
      layout: 'split',
    },
  ]

  return (
    <section id="templates" className="py-14 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Template Cepat</h2>
            <p className="text-gray-600">Mulai dari gaya siap pakai, bisa diubah kapan saja.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {presets.map((p) => (
            <button key={p.name} onClick={() => onUse(p)} className="group bg-white rounded-xl border border-gray-200 p-4 text-left hover:shadow-md transition">
              <div className="aspect-[3/4] bg-gray-50 rounded-lg grid place-items-center text-gray-400 text-sm mb-3">
                Poster {p.name}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{p.name}</p>
                  <p className="text-gray-500 text-sm">{p.title}</p>
                </div>
                <div className="flex -space-x-1">
                  {[p.primary, p.accent, p.bg].map((c,i)=> (
                    <span key={i} className="w-4 h-4 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Templates
