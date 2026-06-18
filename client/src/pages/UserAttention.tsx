import { MessageSquareText, Star, HeartHandshake } from 'lucide-react';

export default function UserAttention() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container flex flex-col md:flex-row items-center justify-between py-4 px-4 gap-4">
          <h1 className="text-2xl font-bold" style={{ color: '#6b4d9f' }}>
            Clínica Centro de Varices
          </h1>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a href="/#inicio" className="text-gray-700 hover:text-cyan-600 transition">
              Inicio
            </a>

            <a href="/#quienes-somos" className="text-gray-700 hover:text-cyan-600 transition">
              Quiénes Somos
            </a>

            <a href="/#procedimientos" className="text-gray-700 hover:text-cyan-600 transition">
              Procedimientos
            </a>

            <a href="/#contacto" className="text-gray-700 hover:text-cyan-600 transition">
              Contacto
            </a>

            <a href="/financial-statements" className="text-gray-700 hover:text-cyan-600 transition">
              Estados Financieros
            </a>

            <a href="/atencion-al-usuario" className="text-gray-700 hover:text-cyan-600 transition">
              Atención al Usuario
            </a>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/573135735276?text=Hola, quisiera agendar una cita",
                  "_blank"
                )
              }
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
              "linear-gradient(135deg, #45bfc5 0%, #6b4d9f 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span style={{ color: "#45bfc5" }}>
                Atención al Usuario
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
              Escuchamos sus opiniones y trabajamos continuamente en el
              mejoramiento de la calidad de nuestros servicios.
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
              style={{ backgroundColor: "#45bfc520" }}
            >
              <HeartHandshake
                className="w-7 h-7"
                style={{ color: "#45bfc5" }}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Canales de Participación
              </h2>
              <p className="text-gray-500">
                Su opinión es fundamental para nosotros
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            En nuestra clínica ponemos a disposición de los usuarios
            diferentes mecanismos de participación para conocer sus
            necesidades, recibir sus observaciones y fortalecer nuestros
            procesos de mejoramiento continuo.
          </p>

          {/* Tarjetas */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* PQR */}
            <div className="rounded-2xl bg-gray-50 p-6 border">
              <MessageSquareText
                className="w-10 h-10 mb-4"
                style={{ color: "#45bfc5" }}
              />

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Sistema PQRS
              </h3>

              <p className="text-gray-600 mb-6">
                Registre sus peticiones, quejas, reclamos y sugerencias mediante nuestro canal institucional.
              </p>

              <a
                href="/pqr"
                className="inline-flex items-center px-5 py-3 rounded-xl text-white font-semibold transition-transform hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #45bfc5 0%, #6b4d9f 100%)",
                }}
              >
                Radicar una PQRS
              </a>
            </div>


            {/* Encuesta */}
            <div className="rounded-2xl bg-gray-50 p-6 border">
              <Star
                className="w-10 h-10 mb-4"
                style={{ color: "#45bfc5" }}
              />

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Encuesta de Satisfacción
              </h3>

              <p className="text-gray-600 mb-6">
                Su experiencia es muy importante. Evalúe la atención
                recibida y ayúdenos a mejorar nuestros servicios.
              </p>

              <a
                href="/encuesta-satisfaccion"
                className="inline-flex items-center px-5 py-3 rounded-xl text-white font-semibold transition-transform hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #45bfc5 0%, #6b4d9f 100%)",
                }}
              >
                Responder Encuesta
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}