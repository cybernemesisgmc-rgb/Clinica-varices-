import { FileText, Download, Building2 } from 'lucide-react';

export default function FinancialStatements() {
  return (
    <div className="min-h-screen bg-white">
         {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4 px-4">
          <h1 className="text-2xl font-bold" style={{ color: '#6b4d9f' }}>Clínica Centro de Varices</h1>
          <div className="flex gap-6 items-center">
            
{/*             <button className="text-gray-700 hover:text-cyan-600 transition">Inicio</button>
            <button className="text-gray-700 hover:text-cyan-600 transition">Quiénes Somos</button>
            <button className="text-gray-700 hover:text-cyan-600 transition">Procedimientos</button>
            <button className="text-gray-700 hover:text-cyan-600 transition">Contacto</button> */}
              <a href="/#inicio" className="text-gray-700 hover:text-cyan-600 transition">Inicio</a>
              <a href="/#quienes-somos" className="text-gray-700 hover:text-cyan-600 transition">Quiénes Somos</a>
              <a href="/#procedimientos" className="text-gray-700 hover:text-cyan-600 transition">Procedimientos</a>
              <a href="/#contacto" className="text-gray-700 hover:text-cyan-600 transition">Contacto</a>
              <a href="/financial-statements" className="text-gray-700 hover:text-cyan-600 transition h-full flex items-center">Estados Financieros</a>
            <button
              onClick={() => window.open(`https://wa.me/573135735276?text=Hola, quisiera agendar una cita`, "_blank")}
              style={{ backgroundColor: "#45bfc5" }}
              className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition font-semibold"
            >
              Agendar Cita
            </button>
          </div>
        </div>
      </nav>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              'linear-gradient(135deg, #45bfc5 0%, #6b4d9f 100%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span style={{ color: '#45bfc5' }}>Estados Financieros</span>
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
Transparencia institucional y acceso a nuestra información financiera.
            </p>
          </div>
        </div>
      </section>

      {/* Presentación */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#45bfc520' }}
            >
              <Building2
                className="w-7 h-7"
                style={{ color: '#45bfc5' }}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Información Financiera
              </h2>
              <p className="text-gray-500">
                Vigencia fiscal 2025
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
En cumplimiento de nuestros principios de transparencia, responsabilidad institucional y acceso a la información, ponemos a disposición del público los estados financieros correspondientes a la vigencia 2025.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-2xl bg-gray-50 p-5 border">
              <div className="text-sm text-gray-500 mb-1">
                Empresa
              </div>
              <div className="font-semibold text-gray-900">
                Galenos Suministros Médicos S.A.S.
              </div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 border">
              <div className="text-sm text-gray-500 mb-1">
                NIT
              </div>
              <div className="font-semibold text-gray-900">
                900.772.862-9
              </div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 border">
              <div className="text-sm text-gray-500 mb-1">
                Periodo
              </div>
              <div className="font-semibold text-gray-900">
                2025
              </div>
            </div>
          </div>

          <a
            href="/financial/EEFF-2025.pdf"
            download
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-white font-semibold transition-transform hover:scale-105"
            style={{
              background:
                'linear-gradient(135deg, #45bfc5 0%, #6b4d9f 100%)',
            }}
          >
            <Download className="w-5 h-5" />
            Descargar Estados Financieros
          </a>
        </div>
      </section>

      {/* PDF */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText
                className="w-6 h-6"
                style={{ color: '#6b4d9f' }}
              />
              <h3 className="text-xl font-bold text-gray-900">
                Estados Financieros 2025
              </h3>
            </div>
          </div>

          <iframe
            src="/financial/EEFF-2025.pdf"
            title="Estados Financieros 2025"
            className="w-full h-[900px]"
          />
        </div>
      </section>
    </div>
  );
}