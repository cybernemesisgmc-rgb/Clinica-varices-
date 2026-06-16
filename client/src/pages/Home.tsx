import React, { useState } from 'react';
import { Heart, Zap, Droplets, Scissors, Syringe, Eye, Gauge, Lightbulb, Wind, Activity, Bone } from 'lucide-react';

export default function Home() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const specialists = [
    { id: '1', name: 'Dr. Ángel Parra Liñán', specialty: 'Cirujano Cardiovascular y Especialista en Cirugía General', image: '/specialists/angel-parra.jpg' },
    { id: '2', name: 'Dr. Sebastián Mendoza', specialty: 'Urólogo', image: '/specialists/specialist-1.jpg' },
    { id: '3', name: 'Dr. Francisco Berrocal', specialty: 'Cirujano General', image: '/specialists/specialist-2.jpg' },
    { id: '4', name: 'Dr. Rubén Banda', specialty: 'Urólogo', image: '/specialists/specialist-3.jpg' },
    { id: '5', name: 'Dr. Lenin Ballesteros', specialty: 'Ortopedia Mínimamente Invasiva', image: '/specialists/specialist-4.jpg' },
    {id: '6', name: 'Dr. Luis Carlos Velasco', specialty: 'Urólogo', image: '/specialists/luis-velasco.jpg' },
  ];
  
  const procedures = [
    {
      id: 'evlt',
      title: 'Técnica EVLT',
      subtitle: 'Ablación Endovenosa con Láser',
      shortDesc: 'Fotoblación térmica de venas insuficientes',
      fullDesc: 'Técnica minimamente invasiva que utiliza energía láser para cerrar venas varicosas desde el interior, con resultados rápidos y recuperación acelerada.',
      icon: Zap,
      color1: '#45bfc5',
      color2: '#45bfc5'
    },
    {
      id: 'radiofrecuencia',
      title: 'Radiofrecuencia Venosa',
      subtitle: 'Cierre Radiofrequency',
      shortDesc: 'Energía radiofrecuencia para cerrar venas',
      fullDesc: 'Procedimiento que utiliza ondas de radiofrecuencia para sellar venas varicosas de manera segura y efectiva.',
      icon: Gauge,
      color1: '#6b4d9f',
      color2: '#6b4d9f'
    },
    {
      id: 'espuma',
      title: 'Escleroterapia con Espuma',
      subtitle: 'Inyección de Microespuma',
      shortDesc: 'Microespuma esclerosante para venas',
      fullDesc: 'Inyección de microespuma que cierra las venas varicosas desde adentro, ideal para venas de mediano tamaño.',
      icon: Droplets,
      color1: '#45bfc5',
      color2: '#45bfc5'
    },
    {
      id: 'flebectomia',
      title: 'Flebectomía Ambulatoria',
      subtitle: 'Extirpación Percutánea de Venas',
      shortDesc: 'Extirpación de venas varicosas superficiales',
      fullDesc: 'Procedimiento ambulatorio que extirpa las venas varicosas a través de pequeñas incisiones, sin necesidad de hospitalización.',
      icon: Scissors,
      color1: '#6b4d9f',
      color2: '#6b4d9f'
    },
    {
      id: 'inyecciones',
      title: 'Inyecciones Esclerosantes',
      subtitle: 'Escleroterapia Líquida',
      shortDesc: 'Inyección de agente esclerosante',
      fullDesc: 'Inyección directa de solución esclerosante que causa la cicatrización y cierre de las venas varicosas.',
      icon: Syringe,
      color1: '#45bfc5',
      color2: '#45bfc5'
    },
    {
      id: 'ecografia',
      title: 'Diagnóstico Ecográfico',
      subtitle: 'Ecografía Doppler Vascular',
      shortDesc: 'Evaluación completa del sistema venoso',
      fullDesc: 'Estudio de imagen avanzado que permite visualizar el flujo sanguíneo y detectar problemas venosos con precisión.',
      icon: Eye,
      color1: '#6b4d9f',
      color2: '#6b4d9f'
    },
    {
      id: 'compresion',
      title: 'Terapia de Compresión',
      subtitle: 'Medias y Vendajes Compresivos',
      shortDesc: 'Tratamiento conservador con compresión',
      fullDesc: 'Uso de medias y vendajes especializados que mejoran la circulación y reducen síntomas de varices.',
      icon: Wind,
      color1: '#45bfc5',
      color2: '#45bfc5'
    },
    {
      id: 'laser-transdermico',
      title: 'Láser Transdérmico',
      subtitle: 'Tratamiento Láser Percutáneo',
      shortDesc: 'Ablación térmica transdérmica de lesiones vasculares',
      fullDesc: 'Tecnología láser que trata lesiones vasculares a través de la piel sin incisiones, ideal para arañas vasculares.',
      icon: Lightbulb,
      color1: '#6b4d9f',
      color2: '#6b4d9f'
    },
    {
      id: 'laser-hemangiomas',
      title: 'Tratamiento de Láser',
      subtitle: 'Hemangiomas y Arañas Vasculares',
      shortDesc: 'Eliminación de hemangiomas y telangiectasias con láser',
      fullDesc: 'Procedimiento especializado que elimina hemangiomas y arañas vasculares mediante tecnología láser de precisión.',
      icon: Heart,
      color1: '#45bfc5',
      color2: '#45bfc5'
    },
  {
    id: 'cirugias-urologicas',
    title: 'Cirugías Urológicas',
    subtitle: 'Procedimientos Especializados',
    shortDesc: 'Tratamientos quirúrgicos para patologías urológicas.',
    fullDesc: 'Procedimientos quirúrgicos especializados para el diagnóstico y tratamiento de enfermedades del sistema urinario y reproductor masculino.',
    icon: Scissors,
    color1: '#45bfc5',
    color2: '#45bfc5'
  },
  {
    id: 'circuncision',
    title: 'Circuncisión',
    subtitle: 'Cirugía Ambulatoria',
    shortDesc: 'Procedimiento quirúrgico del prepucio.',
    fullDesc: 'Intervención segura y mínimamente invasiva para tratar condiciones médicas o mejorar la higiene y el bienestar del paciente.',
    icon: Scissors,
    color1: '#6b4d9f',
    color2: '#6b4d9f'
  },
  {
    id: 'verrugas-genitales',
    title: 'Resección de Verrugas Genitales',
    subtitle: 'Tratamiento Quirúrgico',
    shortDesc: 'Eliminación de lesiones genitales.',
    fullDesc: 'Procedimiento para la remoción segura y eficaz de verrugas genitales mediante técnicas mínimamente invasivas.',
    icon: Syringe,
    color1: '#45bfc5',
    color2: '#45bfc5'
  },
  {
    id: 'hidrocele',
    title: 'Tratamiento de Hidrocele',
    subtitle: 'Cirugía Urológica',
    shortDesc: 'Corrección de acumulación de líquido escrotal.',
    fullDesc: 'Procedimiento quirúrgico destinado a corregir el hidrocele y aliviar molestias o aumento de volumen escrotal.',
    icon: Droplets,
    color1: '#6b4d9f',
    color2: '#6b4d9f'
  },
  {
    id: 'varicocele',
    title: 'Tratamiento de Varicocele',
    subtitle: 'Corrección Venosa',
    shortDesc: 'Manejo quirúrgico del varicocele.',
    fullDesc: 'Tratamiento especializado para corregir la dilatación de las venas del cordón espermático y mejorar la salud testicular.',
    icon: Heart,
    color1: '#45bfc5',
    color2: '#45bfc5'
  },
  {
    id: 'cistoscopia',
    title: 'Cistoscopia',
    subtitle: 'Diagnóstico Endoscópico',
    shortDesc: 'Visualización interna de la vejiga y uretra.',
    fullDesc: 'Estudio especializado que permite examinar la uretra y la vejiga mediante un instrumento endoscópico de alta precisión.',
    icon: Eye,
    color1: '#6b4d9f',
    color2: '#6b4d9f'
  },
  {
    id: 'evaporizacion-prostata',
    title: 'Evaporización Prostática',
    subtitle: 'Tratamiento con Láser',
    shortDesc: 'Manejo mínimamente invasivo del crecimiento prostático.',
    fullDesc: 'Procedimiento láser que elimina tejido prostático obstructivo con menor sangrado y recuperación más rápida.',
    icon: Zap,
    color1: '#45bfc5',
    color2: '#45bfc5'
  },
  {
    id: 'reseccion-prostata',
    title: 'Resección Prostática',
    subtitle: 'Técnica Mínimamente Invasiva',
    shortDesc: 'Tratamiento quirúrgico de la hiperplasia prostática.',
    fullDesc: 'Procedimiento diseñado para aliviar la obstrucción urinaria causada por el crecimiento benigno de la próstata.',
    icon: Gauge,
    color1: '#6b4d9f',
    color2: '#6b4d9f'
  },
  {
    id: 'calculos-laser',
    title: 'Cálculos Urinarios con Láser',
    subtitle: 'Tratamiento Mínimamente Invasivo',
    shortDesc: 'Fragmentación de cálculos mediante tecnología láser.',
    fullDesc: 'Tratamiento avanzado para cálculos urinarios utilizando láser de alta precisión, permitiendo una recuperación más rápida y menos molestias.',
    icon: Lightbulb,
    color1: '#45bfc5',
    color2: '#45bfc5'
  },
  {
    id: 'uroflujometria',
    title: 'Uroflujometría',
    subtitle: 'Evaluación del Flujo Urinario',
    shortDesc: 'Medición objetiva de la micción.',
    fullDesc: 'Estudio diagnóstico que analiza la velocidad y el patrón del flujo urinario para detectar alteraciones funcionales.',
    icon: Wind,
    color1: '#6b4d9f',
    color2: '#6b4d9f'
  },
  {
    id: 'urodinamia',
    title: 'Urodinamia',
    subtitle: 'Estudio Funcional',
    shortDesc: 'Evaluación avanzada de la función vesical.',
    fullDesc: 'Prueba diagnóstica especializada que estudia el funcionamiento de la vejiga, esfínteres y tracto urinario inferior.',
    icon: Gauge,
    color1: '#45bfc5',
    color2: '#45bfc5'
  },
  {
    id: 'cistitis',
    title: 'Manejo de la Cistitis',
    subtitle: 'Diagnóstico y Tratamiento',
    shortDesc: 'Atención integral de infecciones urinarias.',
    fullDesc: 'Evaluación, diagnóstico y tratamiento personalizado de procesos inflamatorios e infecciosos de la vejiga.',
    icon: Droplets,
    color1: '#6b4d9f',
    color2: '#6b4d9f'
  },
  {
    id: 'incontinencia',
    title: 'Incontinencia Urinaria',
    subtitle: 'Manejo Especializado',
    shortDesc: 'Diagnóstico y tratamiento de la pérdida involuntaria de orina.',
    fullDesc: 'Abordaje integral para mejorar la continencia urinaria mediante tratamientos médicos y procedimientos especializados.',
    icon: Heart,
    color1: '#45bfc5',
    color2: '#45bfc5'
  },
  {
  id: 'artroscopia',
  title: 'Cirugías Artroscópicas',
  subtitle: 'Rodilla y Hombro',
  shortDesc: 'Procedimientos mínimamente invasivos para el tratamiento de lesiones articulares.',
  fullDesc: 'Cirugías artroscópicas de rodilla y hombro realizadas mediante pequeñas incisiones y tecnología de alta definición. Permiten diagnosticar y tratar lesiones de ligamentos, meniscos, cartílago, tendones y otras estructuras articulares, favoreciendo una recuperación más rápida, menor dolor postoperatorio y un retorno temprano a las actividades cotidianas y deportivas.',
  icon: Bone,
  color1: '#45bfc5',
  color2: '#45bfc5'
  },
];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container flex flex-col md:flex-row items-center justify-between py-4 px-4 gap-4">
          <h1 className="text-2xl font-bold" style={{ color: '#6b4d9f' }}>Clínica Centro de Varices</h1>
          <div className="flex flex-wrap gap-4 items-center justify-centerr">
            
{/*             <button className="text-gray-700 hover:text-cyan-600 transition">Inicio</button>
            <button className="text-gray-700 hover:text-cyan-600 transition">Quiénes Somos</button>
            <button className="text-gray-700 hover:text-cyan-600 transition">Procedimientos</button>
            <button className="text-gray-700 hover:text-cyan-600 transition">Contacto</button> */}
              <a href="#inicio" className="text-gray-700 hover:text-cyan-600 transition">Inicio</a>
              <a href="#quienes-somos" className="text-gray-700 hover:text-cyan-600 transition">Quiénes Somos</a>
              <a href="#procedimientos" className="text-gray-700 hover:text-cyan-600 transition">Procedimientos</a>
              <a href="#contacto" className="text-gray-700 hover:text-cyan-600 transition">Contacto</a>
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

      {/* Hero Section */}
      <section
       id="inicio"
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663251002881/5Yyj7UCxjhnQqLqPuQHNvw/1000398092_33d85e4c.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#f5f5f5",
          backgroundAttachment: "fixed",
          backgroundSize: "cover"
        }}
      >
        {/* Dark Oveay */}
        <div className="asolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.5px" }}>Bienvenidos</h1>
          <p className="text-2xl md:text-4xl mb-8" style={{ fontFamily: "'Playfair Display', serif", color: "#45bfc5", fontWeight: 600, letterSpacing: "0.5px" }}>Clínica Centro de Varices y Cirugías Ambulatorias</p>
          <p className="text-xl mb-8 max-w-2xl">Somos el único centro especializado en cirugías mínimamente invasivas sin hospitalización</p>
          <p className="text-lg mb-8 max-w-3xl">Tu salud, con atención rápida y segura</p>
          <button
            onClick={() => window.open(`https://wa.me/573135735276?text=Hola, quisiera agendar una cita`, "_blank")}
            style={{ backgroundColor: "#45bfc5" }}
            className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-lg"
          >
            Agendar Cita
          </button>
          <p className="mt-6 text-lg font-medium text-white">Atendemos pacientes particulares</p>
        </div>
      </section>

      {/* Description Section */}
      <section  id="quienes-somos" className="py-16 px-4 scroll-mt-32" style={{ backgroundColor: "#f9f7fc" }}>
        <div className="container text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Somos especialistas en el tratamiento de varices con tecnología de vanguardia y un equipo médico altamente capacitado. Ofrecemos soluciones personalizadas para mejorar tu calidad de vida.
          </p>
        </div>
      </section>

      {/* Specialists Section - Grid Layout */}
      <section className="pt-9 pb-10 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-10" style={{ color: "#6b4d9f" }}>Nuestros Especialistas</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-6">
            {specialists.map((specialist, index) => (
              <div
                key={specialist.id}
                className="group transition-all duration-300 ease-out"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Card */}
                <div
                  className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: '#ffffff',
                  }}
                >
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg mb-1" style={{ color: '#6b4d9f' }}>
                      {specialist.name}
                    </h3>
                    <p className="text-sm" style={{ color: '#45bfc5' }}>
                      {specialist.specialty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(69, 191, 197, 0.3); }
          50% { box-shadow: 0 0 40px rgba(69, 191, 197, 0.6); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-fadeIn {
          animation: fadeInUp 0.4s ease-out;
        }
      `}</style>

      {/* Procedures Section */}
      <section id="procedimientos" className="pt-5 pb-5 px-4" style={{ background: "linear-gradient(135deg, #f9f7fc 0%, #ffffff 50%, #f0f9fa 100%)" }}>
        <div className="container">
 <div className="text-center mb-12">
    <h2
      className="text-5xl font-bold mb-4"
      style={{
        background: "linear-gradient(135deg, #45bfc5 0%, #6b4d9f 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}
    >
      Nuestros Procedimientos
    </h2>

    <div
      className="w-24 h-1 mx-auto"
      style={{
        background: "linear-gradient(90deg, #45bfc5, #6b4d9f)"
      }}
    />
  </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {procedures.map((procedure, idx) => {
              const Icon = procedure.icon;
              return (
                    <React.Fragment key={procedure.id}>
      
      {procedure.id === "evlt" && (
        <div className="col-span-full text-center mt-0 mb-8">
          <h3
            className="text-3xl font-bold"
            style={{ color: "#6b4d9f" }}
          >
            Cirugía Vascular y Tratamiento de Várices
          </h3>
        </div>
      )}

      {procedure.id === "cirugias-urologicas" && (
        <div className="col-span-full text-center py-6">
          <h3
            className="text-3xl font-bold"
            style={{ color: "#6b4d9f" }}
          >
            Urología Mínimamente Invasiva
          </h3>
        </div>
      )}

      {procedure.id === "artroscopia" && (
        <div className="col-span-full text-center py-6">
          <h3
            className="text-3xl font-bold"
            style={{ color: "#6b4d9f" }}
          >
            Ortopedia Mínimamente Invasiva
          </h3>
        </div>
      )}


                <div
                  key={procedure.id}
                  onClick={() => setExpandedService(expandedService === procedure.id ? null : procedure.id)}
                  className="rounded-2xl p-4 cursor-pointer transition-all duration-500 group overflow-hidden relative"
                  style={{
                    backgroundColor: "#ffffff",
                    border: `2px solid ${procedure.color2}`,
                    minHeight: expandedService === procedure.id ? "auto" : "190px",
                    boxShadow: expandedService === procedure.id ? "0 20px 40px rgba(69, 191, 197, 0.2)" : "0 4px 15px rgba(0,0,0,0.08)",
                    transform: expandedService === procedure.id ? "scale(1.02)" : "scale(1)",
                    animation: `slideInUp 0.6s ease-out ${idx * 0.1}s both`,
                    backdropFilter: "blur(10px)"
                  }}
                >
                  {/* Animated background gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${procedure.color1}, ${procedure.color2})`,
                    }}
                  />
                  
                  {/* Animated corner accent */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full"
                    style={{
                      backgroundColor: procedure.color1,
                      transform: "translate(30%, -30%)",
                      filter: "blur(60px)"
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start mb-4">
                      <div
                        className="p-3 rounded-lg mr-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6"
                        style={{ 
                          backgroundColor: `${procedure.color2}20`,
                          border: `2px solid ${procedure.color2}30`
                        }}
                      >
                        <Icon size={24} style={{ color: procedure.color2 }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg transition-colors duration-300" style={{ color: procedure.color1 }}>
                          {procedure.title}
                        </h3>
                        <p className="text-xs font-semibold mt-1" style={{ color: procedure.color2 }}>
                          {procedure.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-2 leading-relaxed line-clamp-2">{procedure.shortDesc}</p>
                    
                    {/* Expand indicator */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: expandedService === procedure.id ? procedure.color2 : `${procedure.color2}40`,
                              transform: expandedService === procedure.id ? "scale(1.2)" : "scale(1)"
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold transition-all duration-300" style={{ color: procedure.color2, opacity: expandedService === procedure.id ? 1 : 0.6 }}>
                        {expandedService === procedure.id ? "Menos" : "Más"}
                      </span>
                    </div>
                    
                    {expandedService === procedure.id && (
                      <div className="mt-4 pt-4 border-t animate-fadeIn" style={{ borderColor: `${procedure.color2}30` }}>
                        <p className="text-gray-600 text-sm leading-relaxed">{procedure.fullDesc}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/573135735276?text=Hola, me interesa el procedimiento: ${procedure.title}`, "_blank");
                          }}
                          className="mt-4 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:scale-105"
                          style={{ backgroundColor: procedure.color2 }}
                        >
                          Consultar Ahora
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                </React.Fragment>

              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="pt-20 pb-20 px-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #ffffff 0%, #f5f0ff 50%, #f0f9fa 100%)" }}>
        {/* Elegant purple gradient overlay */}
        <div className="absolute inset-0 opacity-5" style={{ background: "radial-gradient(circle at 20% 50%, #6b4d9f 0%, transparent 50%), radial-gradient(circle at 80% 80%, #45bfc5 0%, transparent 50%)" }}></div>
        
        <div className="container relative z-10">
          <div className="text-center mb-15 slide-in-left">
            <h2 className="text-5xl font-bold mb-6" style={{
              background: "linear-gradient(135deg, #45bfc5 0%, #6b4d9f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "float 3s ease-in-out infinite"
            }}>
              Por Qué Elegirnos
            </h2>
            <div className="h-1 w-24 mx-auto mb-6" style={{ background: "linear-gradient(90deg, #45bfc5, #6b4d9f)", animation: "glow 2s ease-in-out infinite" }}></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Elegir un lugar para tu cuidado no es solo una decisión médica, es un acto de confianza.
            </p>
          </div>
          
          {/* Main content with alternating layout */}
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Section 1: Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 slide-in-left">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, #45bfc5, #6b4d9f)", opacity: 0.2 }}></div>
                  <div className="relative bg-white rounded-2xl p-8 border border-cyan-200 hover:border-cyan-500 transition-all duration-500 group-hover:shadow-2xl" style={{ backdropFilter: "blur(10px)" }}>
                    <p className="text-gray-800 leading-relaxed mb-6">
                      En nuestro centro de várices y cirugías ambulatorias, cada paciente es recibido con la certeza de estar en manos expertas. Nuestro médico líder, el <span className="font-bold" style={{ color: "#45bfc5" }}>Dr. Ángel Parra Liñán</span>, cuenta con <span className="font-bold" style={{ color: "#45bfc5" }}>más de 10 años de experiencia</span> en cirugía endovascular con láser, siendo los primeros en la costa atlántica.
                    </p>
                    <p className="text-gray-600 text-sm italic border-l-4" style={{ borderColor: "#45bfc5", paddingLeft: "1rem" }}>
                      Pioneros en la costa Atlántica en tratamiento de varices con Láser endovascular desde 2014
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 slide-in-right">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 glow-animation" style={{ background: "linear-gradient(135deg, #45bfc5, #6b4d9f)", opacity: 0.3, animation: "float 3s ease-in-out infinite" }}>
                    <div className="text-6xl font-bold" style={{ color: "#45bfc5" }}>10+</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">Años de Experiencia</h3>
                  <p className="text-gray-600">Liderazgo en cirugía cardiovascular</p>
                </div>
              </div>
            </div>
            
            {/* Section 2: Success Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="slide-in-left">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 glow-animation" style={{ background: "linear-gradient(135deg, #45bfc5, #6b4d9f)", opacity: 0.3, animation: "float 3.5s ease-in-out infinite" }}>
                    <div className="text-6xl font-bold" style={{ color: "#45bfc5" }}>1000+</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">Cirugías Exitosas</h3>
                  <p className="text-gray-600">Con precisión y seguridad</p>
                </div>
              </div>
              <div className="order-2 md:order-1 slide-in-right">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, #45bfc5, #6b4d9f)", opacity: 0.2 }}></div>
                  <div className="relative bg-white rounded-2xl p-8 border border-cyan-200 hover:border-cyan-500 transition-all duration-500 group-hover:shadow-2xl" style={{ backdropFilter: "blur(10px)" }}>
                    <p className="text-gray-800 leading-relaxed">
                      Con más de <span className="font-bold" style={{ color: "#45bfc5" }}>1.000 cirugías realizadas</span>, ofrecemos precisión, seguridad y una recuperación más amable, siendo esta institución un centro de excelencia en el tratamiento de enfermedades varicosas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: "💡", title: "Tecnología", desc: "Nuestras instalaciones están diseñadas pensando en tu bienestar, respaldadas por tecnología de punta que nos permite brindar diagnósticos y tratamientos de alta calidad." },
                { icon: "❤️", title: "Humanismo", desc: "Creemos profundamente en el humanismo y la empatía, porque sanar no es solo un procedimiento, es también un gesto, una palabra, una mirada que transmite calma." },
                { icon: "📚", title: "Educación", desc: "Promovemos la educación al paciente, ayudándote a entender tu condición, prevenir complicaciones y tomar decisiones informadas sobre tu salud." }
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border-2 border-cyan-200 hover:border-cyan-500 transition-all duration-500 group hover:shadow-2xl"
                  style={{
                    animation: `slideInUp 0.6s ease-out ${0.3 + idx * 0.1}s both`
                  }}
                >
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{value.icon}</div>
                  <h4 className="text-xl font-bold mb-3" style={{ color: "#6b4d9f" }}>{value.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>

            {/* Final Message */}
            <div className="text-center mt-16 slide-in-left">
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, #45bfc5, #6b4d9f)", opacity: 0.2 }}></div>
                <div className="relative bg-white rounded-2xl p-12 border-2 border-cyan-200 hover:border-cyan-500 transition-all duration-500 group-hover:shadow-2xl" style={{ backdropFilter: "blur(10px)" }}>
                  <p className="text-2xl font-bold text-gray-900 leading-relaxed">
                    Aquí no solo tratamos <span style={{ color: "#45bfc5" }}>várices</span>…<br />
                    <span style={{ color: "#6b4d9f" }}>cuidamos personas.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: "#6b4d9f" }}>Quiénes Somos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#45bfc5" }}>Misión</h3>
              <p className="text-gray-700 leading-relaxed">
                Proporcionar soluciones innovadoras y de calidad para el tratamiento de enfermedades vasculares, utilizando tecnología de vanguardia y un equipo médico altamente especializado, garantizando la satisfacción y bienestar de nuestros pacientes.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#45bfc5" }}>Visión</h3>
              <p className="text-gray-700 leading-relaxed">
                Ser el centro de referencia en el tratamiento mínimamente invasivo de varices y otras patologías vasculares, reconocido por nuestra excelencia médica, innovación tecnológica y compromiso con la salud integral de nuestros pacientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Aliados Section */}
      <section className="pt-0 pb-20 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: "#6b4d9f" }}>Nuestros Aliados</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Juntos, construimos un puente de atención más humana, cercana y oportuna, donde cada servicio refleja nuestro propósito: cuidar de ti como lo mereces.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* EPS Sanitas */}
            <div className="flex items-center justify-center" style={{ minHeight: '120px' }}>
              <img
                src="/logos/sanitas.png"
                alt="EPS Sanitas"
                className="h-32 object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            {/* FOMAG */}
            <div className="flex items-center justify-center" style={{ minHeight: '120px' }}>
              <img
                src="/logos/fomag.png"
                alt="FOMAG"
                className="h-28 object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            {/* Colsanitas */}
            <div className="flex items-center justify-center" style={{ minHeight: '120px' }}>
              <img
                src="/logos/colsanitas.png"
                alt="Colsanitas"
                className="h-32 object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="pt-8 pb-20 px-4" style={{ backgroundColor: "#f9f7fc" }}>
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: "#6b4d9f" }}>Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "#45bfc5" }}>Teléfono</h3>
              <p className="text-gray-700 mb-2">Fijo: 0647830707</p>
              <p className="text-gray-700 mb-6">WhatsApp: +573135735276</p>
              
              <h3 className="text-xl font-bold mb-4" style={{ color: "#45bfc5" }}>Horario de Atención</h3>
              <p className="text-gray-700 mb-1">Lunes - Viernes: 8:00 AM - 5:00 PM</p>
              <p className="text-gray-700 mb-1">Sábados: 8:00 AM - 12:00 PM</p>
              <p className="text-gray-700 mb-6">Domingos y Festivos: Cerrado</p>
              
              <h3 className="text-xl font-bold mb-4" style={{ color: "#45bfc5" }}>Ubicación</h3>
              <p className="text-gray-700">Montería, Córdoba</p>
              <p className="text-gray-700">Colombia</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: "#45bfc5" }}>Envíanos tu Consulta</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="tel"
                  placeholder="Tu teléfono"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
                <textarea
                  placeholder="Tu consulta o mensaje"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 h-24"
                ></textarea>
                <button
                  type="submit"
                  style={{ backgroundColor: "#45bfc5" }}
                  className="w-full px-4 py-2 text-white rounded-lg hover:opacity-90 transition font-semibold"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}