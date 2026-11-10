import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
} from "lucide-react";

interface VideoPlayerProps {
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  featured?: boolean;
}

interface VideoPlayerProps {
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  featured?: boolean;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function VideoPlayer({
  src,
  thumbnail,
  title,
  description,
  featured = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);

  const revealControls = () => {
    setShowControls(true);

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    if (playing) {
      timerRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2800);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

const togglePlay = () => {
  const video = videoRef.current;
  if (!video) return;

  if (video.paused) {
    // Si terminó, comenzar nuevamente desde el principio
    if (video.ended) {
      video.currentTime = 0;
    }

    video.play().catch((error) => {
      console.error("Error al reproducir el video:", error);
    });

    setShowControls(true);
    revealControls();
  } else {
    video.pause();
    setShowControls(true);
  }
};

const closeVideo = () => {
  if (videoRef.current) {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }

  setIsVideoOpen(false);
  setPlaying(false);
  setCurrentTime(0);
  setShowControls(true);

  if (timerRef.current !== null) {
    window.clearTimeout(timerRef.current);
  }
};

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const changeVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = value;
    video.muted = value === 0;

    setVolume(value);
    setMuted(value === 0);
  };

const seekVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
  const video = videoRef.current;
  if (!video) return;

  const time = Number(e.target.value);
  video.currentTime = time;
  setCurrentTime(time);
};

  const toggleFullscreen = () => {
    if (!playerRef.current) return;

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch((error) => {
        console.error("No se pudo activar pantalla completa:", error);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <article className="w-full min-w-0">
      {/* REPRODUCTOR */}
      <div
        ref={playerRef}
        onMouseMove={revealControls}
        onMouseLeave={() => {
          if (playing) setShowControls(false);
        }}
        className={`relative w-full overflow-hidden rounded-2xl bg-black shadow-xl ${
          featured
            ? "h-[450px] md:h-[550px]"
            : "h-[280px] md:h-[350px]"
        }`}
      >
        {isVideoOpen ? (
          <>
            {/* VIDEO */}
<video
  ref={videoRef}
  src={src}
  autoPlay
  playsInline
  preload="metadata"
  onPlay={() => setPlaying(true)}
  onPause={() => setPlaying(false)}
  onTimeUpdate={(e) => {
    setCurrentTime(e.currentTarget.currentTime);
  }}
  onLoadedMetadata={(e) => {
    setDuration(e.currentTarget.duration);
  }}
  onEnded={() => {
    setPlaying(false);
    setShowControls(true);
  }}
  onClick={() => {
    if (showControls) {
      setShowControls(false);
    } else {
      revealControls();
    }
  }}
  className="h-full w-full bg-black object-contain"
/>

            {/* CAPA DE CONTROLES */}
            <div
              className={`absolute inset-0 z-20 flex flex-col justify-between bg-gradient-to-b from-black/60 via-transparent to-black/90 transition-opacity duration-300 ${
                showControls
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              {/* BARRA SUPERIOR */}
              <div className="flex items-center justify-between p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {title}
                  </p>
                  <p className="text-xs text-white/60">
                    Clínica Centro de Várices
                  </p>
                </div>

                <button
                  onClick={closeVideo}
                  aria-label="Cerrar video"
                  className="ml-3 rounded-full bg-black/40 p-2 text-white transition hover:bg-[#6b4d9f]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* BOTÓN CENTRAL */}
{/*               <div className="flex flex-1 items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  aria-label={playing ? "Pausar" : "Reproducir"}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-[#6b4d9f]/90 text-white shadow-xl backdrop-blur-sm transition hover:scale-110 hover:bg-[#45bfc5]"
                >
                  {isVideoOpen ? (
                    <Pause size={30} fill="white" />
                  ) : (
                    <Play size={30} fill="white" className="ml-1" />
                  )}
                </button>
              </div>
 */}
{/* CONTROLES INFERIORES */}
<div
  className={`absolute bottom-0 left-0 z-40 w-full p-4 transition-opacity duration-300 ${
    showControls ? "opacity-100" : "pointer-events-none opacity-0"
  }`}
  onClick={(e) => e.stopPropagation()}
>
  {/* LÍNEA DE TIEMPO */}
  <input
    type="range"
    min={0}
    max={duration || 100}
    step="0.1"
    value={currentTime}
    onChange={seekVideo}
    className="mb-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/30 accent-[#45bfc5]"
    style={{
      background: `linear-gradient(to right, #45bfc5 ${
        duration ? (currentTime / duration) * 100 : 0
      }%, rgba(255,255,255,0.3) ${
        duration ? (currentTime / duration) * 100 : 0
      }%)`,
    }}
  />

  <div className="flex items-center justify-between text-sm text-white">
    <span>
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>
                </div>

                {/* BOTONES INFERIORES */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {/* PLAY / PAUSA */}
<button
  onClick={togglePlay}
  aria-label={playing ? "Pausar" : "Reproducir"}
  className="text-white transition hover:text-[#45bfc5]"
>
  {playing ? (
    <Pause size={23} />
  ) : (
    <Play size={23} />
  )}
</button>

                    {/* VOLUMEN */}
                    <button
                      onClick={toggleMute}
                      aria-label={muted ? "Activar sonido" : "Silenciar"}
                      className="text-white transition hover:text-[#45bfc5]"
                    >
                      {muted || volume === 0 ? (
                        <VolumeX size={21} />
                      ) : (
                        <Volume2 size={21} />
                      )}
                    </button>

                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={muted ? 0 : volume}
                      onChange={(e) =>
                        changeVolume(Number(e.target.value))
                      }
                      aria-label="Volumen"
                      className="hidden w-20 cursor-pointer accent-[#45bfc5] sm:block"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    {/* VELOCIDAD */}
                    <div className="relative flex items-center gap-1">
                      {/* <Settings size={17} className="text-white/80" /> */}

                      <select
                        value={speed}
                        onChange={(e) =>
                          setSpeed(Number(e.target.value))
                        }
                        aria-label="Velocidad de reproducción"
                        className="max-w-[65px] cursor-pointer rounded-md border-0 bg-white/10 px-1.5 py-1 text-xs font-semibold text-white outline-none"
                      >
                        <option value={0.5} className="bg-[#171522]">
                          0.5x
                        </option>
                        <option value={1} className="bg-[#171522]">
                          1x
                        </option>
                        <option value={1.5} className="bg-[#171522]">
                          1.5x
                        </option>
                        <option value={2} className="bg-[#171522]">
                          2x
                        </option>
                      </select>
                    </div>

                    {/* PANTALLA COMPLETA */}
                    <button
                      onClick={toggleFullscreen}
                      aria-label="Pantalla completa"
                      className="text-white transition hover:text-[#45bfc5]"
                    >
                      <Maximize size={21} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* MINIATURA CON FONDO DIFUMINADO */
          <button
onClick={() => {
  setIsVideoOpen(true);
  setShowControls(true);
}}
            aria-label={`Reproducir ${title}`}
            className="group relative block h-full w-full"
          >
            {/* FONDO DIFUMINADO */}
            <img
              src={thumbnail}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl opacity-70"
            />

            <div className="absolute inset-0 bg-black/20" />

            {/* IMAGEN COMPLETA */}
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              className="relative z-[1] h-full w-full object-contain"
            />

            {/* BOTÓN PLAY */}
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <span
                className={`flex items-center justify-center rounded-full bg-[#6b4d9f]/95 text-white shadow-xl transition duration-300 group-hover:scale-110 group-hover:bg-[#45bfc5] ${
                  featured ? "h-20 w-20" : "h-16 w-16"
                }`}
              >
                <Play
                  size={featured ? 34 : 28}
                  fill="white"
                  className="ml-1"
                />
              </span>
            </div>

            {/* TITULO SOBRE LA MINIATURA */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-left">
              <p className="text-sm font-medium text-white/80">
                Ver video
              </p>
              <p className="text-lg font-bold text-white">
                {title}
              </p>
            </div>
          </button>
        )}
      </div>

      {/* INFORMACIÓN */}
      <div className="mt-4">
        <h3
          className={`font-bold text-[#6b4d9f] ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {title}
        </h3>

        <p className="mt-2 leading-relaxed text-gray-600">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function VideoGallery() {
  return (
<section className="bg-white px-4 py-10 md:px-8 md:py-10 lg:px-12 lg:py-18">
  <div className="mx-auto w-full max-w-7xl">

    {/* ENCABEZADO */}
    <div className="mx-auto mb-16 w-full max-w-3xl text-center">
      <span className="font-semibold uppercase tracking-widest text-[#45bfc5]">
        Clínica Centro de Várices
      </span>
          <h2 className="mt-3 text-3xl font-bold text-[#6b4d9f] md:text-5xl">
            Conoce nuestra clínica
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Conoce nuestros procedimientos, tecnología y el equipo
            comprometido con tu salud y bienestar.
          </p>
        </div>

        {/* VIDEO PRINCIPAL 00 */}
        <div className="mx-auto mb-14 w-full max-w-3xl">
          <VideoPlayer
            src="/videos/00.mp4"
            thumbnail="/videos/thumbnails/00.jpg"
            title="Conoce nuestra clínica"
            description="Descubre nuestro centro, nuestras instalaciones y el compromiso que tenemos con la salud y el bienestar de nuestros pacientes."
            featured
          />
        </div>

        {/* VIDEOS SECUNDARIOS */}
        <div className="mb-10">
          <h3 className="mb-10 text-center text-2xl font-bold text-[#6b4d9f] md:text-3xl">
            Nuestros procedimientos y tecnología
          </h3>

          <div className="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-x-10 gap-y-12 md:grid-cols-2">

            <div className="w-full max-w-[480px]">
              <VideoPlayer
                src="/videos/01.mp4"
                thumbnail="/videos/thumbnails/01.jpg"
                title="Procedimientos y testimonios"
                description="Conoce algunos de nuestros procedimientos para el tratamiento de várices y escucha la experiencia de nuestros pacientes."
              />
            </div>

            <div className="w-full max-w-[480px]">
              <VideoPlayer
                src="/videos/02.mp4"
                thumbnail="/videos/thumbnails/02.jpg"
                title="Experiencia y tecnología especializada"
                description="Somos pioneros en la Costa Atlántica en procedimientos mínimamente invasivos de cirugía vascular y flebología con láser y técnicas endovasculares."
              />
            </div>

            <div className="w-full max-w-[480px] md:col-span-2 md:mx-auto">
              <VideoPlayer
                src="/videos/03.mp4"
                thumbnail="/videos/thumbnails/03.jpg"
                title="Tecnología Rezūm"
                description="Conoce cómo utilizamos la tecnología Rezūm para el tratamiento de la hiperplasia prostática."
              />
            </div>

          </div>
        </div>

        {/* CONTACTO */}
        <div className="mt-18 rounded-2xl bg-[#6b4d9f] px-6 py-10 text-center text-white md:px-12">
          <h3 className="text-2xl font-bold md:text-3xl">
            Estamos aquí para cuidar de ti
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Agenda tu valoración y recibe atención de nuestro equipo
            especializado.
          </p>

          <a
            href="https://wa.me/573135735276"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#45bfc5] px-8 py-3 font-bold text-white transition hover:bg-[#36aeb4]"
          >
            Agenda tu cita
          </a>
        </div>

      </div>
    </section>
  );
}
