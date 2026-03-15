import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Play, Info, Heart, Star, ChevronLeft, ChevronRight, X, Volume2, Maximize, SkipBack, SkipForward, User, LogIn, MonitorPlay, Sparkles } from "lucide-react";

const gradients = [
  "from-red-600 via-rose-500 to-orange-400",
  "from-cyan-500 via-blue-500 to-indigo-600",
  "from-violet-500 via-fuchsia-500 to-pink-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-amber-500 via-orange-500 to-red-500",
  "from-sky-500 via-cyan-400 to-teal-400",
];

const posterPool = [
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542204625-de293a2f8ff2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
];

const heroPool = [
  "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=80",
];

const trailerPool = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
];

const genreMap = {
  Filme: ["Ação", "Terror", "Comédia", "Suspense", "Drama", "Ficção Científica"],
  Série: ["Thriller", "Crime", "Drama", "Sci‑Fi", "Mistério", "Aventura"],
  Anime: ["Shounen", "Fantasia", "Cyberpunk", "Ação", "Romance", "Sobrenatural"],
  Desenho: ["Aventura", "Comédia", "Família", "Fantasia", "Sci‑Fi", "Musical"],
};

const wordBank = {
  Filme: ["Protocol", "Shadow", "Pulse", "Nova", "Rift", "Velocity", "Frontier", "Vortex", "Crimson", "Neon"],
  Série: ["Archive", "Signal", "District", "Circuit", "Binary", "Empire", "Vault", "Code", "Mirage", "Zero"],
  Anime: ["Requiem", "Chronicle", "Phoenix", "Astra", "Blade", "Zenith", "Eclipse", "Shin", "Mecha", "Dream"],
  Desenho: ["Pixel", "Comet", "Bubble", "Orbit", "Luna", "Rocket", "Prism", "Cloud", "Dash", "Spark"],
};

const typeLabel = {
  Filme: "Filme",
  Série: "Série",
  Anime: "Anime",
  Desenho: "Desenho",
};

function generateItems(type, count, startId) {
  return Array.from({ length: count }, (_, index) => {
    const first = wordBank[type][index % wordBank[type].length];
    const second = wordBank[type][(index + 3) % wordBank[type].length];
    const genre = genreMap[type][index % genreMap[type].length];
    const year = 2012 + (index % 14);
    const note = (7.1 + ((index * 7) % 25) / 10).toFixed(1);
    const poster = posterPool[index % posterPool.length];
    const hero = heroPool[index % heroPool.length];
    const video = trailerPool[index % trailerPool.length];
    const duration = type === "Filme" || type === "Desenho" ? `${95 + (index % 35)} min` : `${1 + (index % 6)} temporada${index % 6 === 0 ? "" : "s"} • ${8 + (index % 12)} episódios`;
    const badge = index % 9 === 0 ? "Top 10" : index % 7 === 0 ? "Novo" : index % 5 === 0 ? "Popular" : index % 4 === 0 ? "Em Alta" : "";

    return {
      id: startId + index,
      title: `${first} ${second}`,
      type,
      category: typeLabel[type],
      genre,
      year,
      note,
      duration,
      badge,
      image: poster,
      banner: hero,
      video,
      progress: (index * 13) % 100,
      description: `${typeLabel[type]} com estética futurista, ritmo cinematográfico e atmosfera premium. ${first} ${second} mistura ${genre.toLowerCase()}, emoção e tecnologia em uma experiência visual intensa feita para o universo Drik.`,
      fullDescription: `${first} ${second} é um ${type.toLowerCase()} do catálogo Drik construído para parecer uma produção de streaming real. A trama combina ${genre.toLowerCase()}, visual sofisticado, trilha energética e cenas com clima tecnológico de 2026. Com narrativa envolvente, acabamento premium e identidade própria, o título entrega uma experiência imersiva do início ao fim.`,
      classification: ["10+", "12+", "14+", "16+"][index % 4],
      quality: ["4K", "1080p", "Ultra HD"][index % 3],
      audio: ["Português", "Inglês", "Japonês"][index % 3],
      seasons: type === "Filme" || type === "Desenho" ? null : 1 + (index % 5),
      episodes: type === "Filme" || type === "Desenho" ? null : 8 + (index % 12),
    };
  });
}

const films = generateItems("Filme", 50, 1);
const series = generateItems("Série", 50, 1001);
const animes = generateItems("Anime", 50, 2001);
const cartoons = generateItems("Desenho", 50, 3001);
const allCatalog = [...films, ...series, ...animes, ...cartoons];

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

function RowSection({ title, items, favorites, onToggleFavorite, onOpenDetails }) {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: direction * 880, behavior: "smooth" });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
          <p className="text-sm text-zinc-400">Descubra seleções com vibe cinematográfica, tecnológica e premium.</p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button onClick={() => scrollRow(-1)} className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 transition hover:bg-white/10">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scrollRow(1)} className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 transition hover:bg-white/10">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={rowRef} className="scrollbar-none flex gap-4 overflow-x-auto pb-2">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="group relative min-w-[250px] max-w-[250px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-cyan-400/40"
          >
            <div className="relative h-[360px] overflow-hidden">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-[#05070c]/40 to-transparent" />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
                {item.badge ? (
                  <span className={`rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white ${gradients[index % gradients.length]}`}>
                    {item.badge}
                  </span>
                ) : <span />}
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className={`rounded-full border border-white/15 p-2 backdrop-blur ${favorites.includes(item.id) ? "bg-rose-500 text-white" : "bg-black/35 text-zinc-100"}`}
                >
                  <Heart size={16} fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-zinc-300">
                  <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1">{item.category}</span>
                  <span>{item.genre}</span>
                </div>
                <h3 className="line-clamp-2 text-xl font-black text-white">{item.title}</h3>
                <div className="mt-2 flex items-center gap-3 text-sm text-zinc-300">
                  <span>{item.year}</span>
                  <span>•</span>
                  <span>{item.duration}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4">
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Star size={15} className="text-amber-400" fill="currentColor" />
                <span>{item.note}</span>
                <span className="text-zinc-500">•</span>
                <span>{item.quality}</span>
              </div>
              <p className="line-clamp-3 text-sm leading-6 text-zinc-400">{item.description}</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => onOpenDetails(item)} className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-black transition hover:scale-[1.02]">
                  <Play size={16} fill="currentColor" /> Assistir
                </button>
                <button onClick={() => onOpenDetails(item)} className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition hover:bg-white/10">
                  <Info size={16} /> Detalhes
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlayerModal({ item, onClose, favorites, onToggleFavorite, relatedItems }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState(item.quality || "1080p");
  const [subtitle, setSubtitle] = useState("Português");
  const [audio, setAudio] = useState(item.audio || "Português");

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => setDuration(video.duration || 0);
    const onTime = () => setCurrentTime(video.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.volume = volume;
    video.playbackRate = speed;
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    video.play().catch(() => {});

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [volume, speed]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  const seek = (value) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Number(value);
    setCurrentTime(Number(value));
  };

  const skipBy = (delta) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(Math.max(0, video.currentTime + delta), duration || video.duration || 0);
  };

  const openFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 p-3 backdrop-blur-md md:p-8">
      <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#080b12] shadow-2xl shadow-cyan-500/10">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 md:px-6">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
              <MonitorPlay size={14} /> Drik Player
            </div>
            <h3 className="text-xl font-black text-white md:text-2xl">{item.title}</h3>
          </div>
          <button onClick={onClose} className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10">
            <X size={18} />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 overflow-auto lg:grid-cols-[1.5fr_0.8fr]">
          <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r lg:border-white/10 md:p-6">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black">
              <video ref={videoRef} src={item.video} poster={item.banner} className="aspect-video w-full bg-black" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 space-y-4 p-4 md:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-zinc-200">
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-300">{item.quality}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">{item.category}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">{item.classification}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={togglePlay} className="rounded-full bg-white p-3 text-black shadow-lg shadow-white/20 transition hover:scale-105">
                    <Play size={18} fill="currentColor" />
                  </button>
                  <button onClick={() => skipBy(-10)} className="rounded-full border border-white/10 bg-white/10 p-3 text-white transition hover:bg-white/15">
                    <SkipBack size={18} />
                  </button>
                  <button onClick={() => skipBy(10)} className="rounded-full border border-white/10 bg-white/10 p-3 text-white transition hover:bg-white/15">
                    <SkipForward size={18} />
                  </button>
                  <button onClick={() => onToggleFavorite(item.id)} className={`rounded-full border border-white/10 p-3 transition ${favorites.includes(item.id) ? "bg-rose-500 text-white" : "bg-white/10 text-white hover:bg-white/15"}`}>
                    <Heart size={18} fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-5 rounded-[28px] border border-white/10 bg-white/5 p-4 md:p-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-zinc-300">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input type="range" min="0" max={duration || 0} step="0.1" value={currentTime} onChange={(e) => seek(e.target.value)} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-400" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.18em] text-zinc-400">Volume</label>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                    <Volume2 size={16} className="text-zinc-300" />
                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => { const next = Number(e.target.value); setVolume(next); if (videoRef.current) videoRef.current.volume = next; }} className="w-full accent-cyan-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.18em] text-zinc-400">Qualidade</label>
                  <select value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none">
                    <option className="bg-slate-900">4K</option>
                    <option className="bg-slate-900">1080p</option>
                    <option className="bg-slate-900">720p</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.18em] text-zinc-400">Velocidade</label>
                  <select value={speed} onChange={(e) => { const next = Number(e.target.value); setSpeed(next); if (videoRef.current) videoRef.current.playbackRate = next; }} className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none">
                    <option className="bg-slate-900" value={0.75}>0.75x</option>
                    <option className="bg-slate-900" value={1}>1x</option>
                    <option className="bg-slate-900" value={1.25}>1.25x</option>
                    <option className="bg-slate-900" value={1.5}>1.5x</option>
                    <option className="bg-slate-900" value={2}>2x</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.18em] text-zinc-400">Legenda</label>
                  <select value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none">
                    <option className="bg-slate-900">Português</option>
                    <option className="bg-slate-900">English</option>
                    <option className="bg-slate-900">Desativada</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.18em] text-zinc-400">Áudio</label>
                  <div className="flex gap-2">
                    <select value={audio} onChange={(e) => setAudio(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none">
                      <option className="bg-slate-900">Português</option>
                      <option className="bg-slate-900">Inglês</option>
                      <option className="bg-slate-900">Japonês</option>
                    </select>
                    <button onClick={openFullscreen} className="rounded-2xl border border-white/10 bg-white/5 px-4 text-white transition hover:bg-white/10">
                      <Maximize size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {(item.type === "Série" || item.type === "Anime") && (
                <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm text-zinc-200">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-cyan-300">
                    <Sparkles size={16} /> Próximo episódio disponível
                  </div>
                  <p>
                    Temporada {item.seasons}, episódio {Math.min(2, item.episodes || 2)} pronto para reprodução. Continue exatamente de onde parou com a experiência premium Drik.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-5 p-4 md:p-6">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
              <div className="relative h-56">
                <img src={item.banner} alt={item.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-[#080b12]/50 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <div className="mb-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-zinc-200">
                    <span className="rounded-full bg-white/10 px-3 py-1">{item.genre}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">{item.year}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">{item.note}</span>
                  </div>
                  <h4 className="text-3xl font-black text-white">{item.title}</h4>
                </div>
              </div>
              <div className="space-y-4 p-5 text-sm leading-7 text-zinc-300">
                <p>{item.fullDescription}</p>
                <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.16em] text-zinc-400">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><span className="block text-zinc-500">Categoria</span>{item.category}</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><span className="block text-zinc-500">Duração</span>{item.duration}</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><span className="block text-zinc-500">Classificação</span>{item.classification}</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><span className="block text-zinc-500">Áudio</span>{audio}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-[28px] border border-white/10 bg-white/5 p-5">
              <h5 className="text-lg font-bold text-white">Conteúdos parecidos</h5>
              <div className="space-y-3">
                {relatedItems.map((related) => (
                  <div key={related.id} className="flex gap-3 rounded-2xl border border-white/8 bg-black/20 p-3">
                    <img src={related.image} alt={related.title} className="h-20 w-16 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-white">{related.title}</div>
                      <div className="text-xs text-zinc-400">{related.genre} • {related.year}</div>
                      <div className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-400">{related.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function DrikStreamingExperience() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([films[1].id, series[3].id, animes[4].id]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Início");
  const [scrolled, setScrolled] = useState(false);

  const heroItems = useMemo(() => [films[0], series[6], animes[12], cartoons[8], films[14]], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroItems.length]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredCatalog = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allCatalog;
    return allCatalog.filter((item) => {
      return [item.title, item.genre, item.category, item.description, item.type]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [search]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const favoritesItems = allCatalog.filter((item) => favorites.includes(item.id));
  const continueWatching = allCatalog.filter((item) => item.progress >= 20 && item.progress <= 85).slice(0, 12);
  const recommended = allCatalog.filter((item) => item.note >= 8.5).slice(0, 16);
  const popular = allCatalog.filter((item) => item.badge === "Popular" || item.badge === "Top 10").slice(0, 16);
  const launches = allCatalog.filter((item) => item.year >= 2024).slice(0, 16);
  const trending = allCatalog.filter((item) => item.badge === "Em Alta" || item.badge === "Top 10").slice(0, 16);
  const actionFilms = films.filter((item) => item.genre === "Ação").slice(0, 16);
  const horrorFilms = films.filter((item) => item.genre === "Terror").slice(0, 16);
  const comedyFilms = films.filter((item) => item.genre === "Comédia").slice(0, 16);
  const seriesRow = series.slice(0, 16);
  const animeRow = animes.slice(0, 16);
  const cartoonRow = cartoons.slice(0, 16);
  const liveSearchResults = search ? filteredCatalog.slice(0, 10) : [];

  const menu = ["Início", "Filmes", "Séries", "Animes", "Desenhos", "Minha Lista"];
  const activeHero = heroItems[heroIndex];
  const relatedItems = selectedItem
    ? allCatalog.filter((item) => item.id !== selectedItem.id && (item.genre === selectedItem.genre || item.type === selectedItem.type)).slice(0, 4)
    : [];

  return (
    <div className="min-h-screen bg-[#04070d] text-white selection:bg-cyan-400/30 selection:text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(239,68,68,0.12),transparent_26%),linear-gradient(180deg,#03060b_0%,#060913_45%,#02040a_100%)]" />

      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-black/65 shadow-2xl shadow-black/30 backdrop-blur-xl" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <div className="flex items-center gap-8">
            <div className="text-3xl font-black tracking-tight text-white md:text-4xl">
              Dri<span className="bg-gradient-to-r from-red-500 via-cyan-400 to-violet-400 bg-clip-text text-transparent">k</span>
            </div>
            <nav className="hidden items-center gap-5 md:flex">
              {menu.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`text-sm font-medium transition ${activeTab === item ? "text-white" : "text-zinc-400 hover:text-zinc-200"}`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={17} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nome, gênero ou categoria"
                className="w-[300px] rounded-full border border-white/10 bg-white/6 py-3 pl-11 pr-4 text-sm text-white outline-none backdrop-blur-xl placeholder:text-zinc-500 transition focus:border-cyan-400/50 focus:bg-white/10"
              />
              {liveSearchResults.length > 0 && (
                <div className="absolute top-[115%] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f17]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                  {liveSearchResults.map((item) => (
                    <button key={item.id} onClick={() => setSelectedItem(item)} className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-white/6">
                      <img src={item.image} alt={item.title} className="h-14 w-11 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-white">{item.title}</div>
                        <div className="text-xs text-zinc-400">{item.category} • {item.genre}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 md:flex">
              <LogIn size={16} /> Login
            </button>
            <button className="rounded-full border border-white/10 bg-white/8 p-3 text-white backdrop-blur-xl transition hover:bg-white/12">
              <User size={18} />
            </button>
          </div>
        </div>
      </header>

      <section className="relative min-h-[90vh] overflow-hidden pt-24 md:pt-28">
        <div className="absolute inset-0">
          <img src={activeHero.banner} alt={activeHero.title} className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,8,0.96)_0%,rgba(2,4,8,0.78)_38%,rgba(2,4,8,0.24)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(4,7,13,0.18)_50%,#04070d_100%)]" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col justify-center gap-12 px-4 py-12 md:px-8 md:py-20 lg:flex-row lg:items-end">
          <div className="max-w-3xl pt-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-xl">
              <Sparkles size={14} /> Experiência premium Drik
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
              Streaming futurista com cinema, séries, animes e desenhos em um só lugar.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
              Visual sofisticado, navegação rápida, banner rotativo, player elegante, catálogo extenso e uma identidade original feita para impressionar com clima tecnológico de 2026.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{activeHero.category}</span>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{activeHero.genre}</span>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{activeHero.year}</span>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">Nota {activeHero.note}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => setSelectedItem(activeHero)} className="flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-black shadow-xl shadow-white/15 transition hover:scale-[1.02]">
                <Play size={18} fill="currentColor" /> Assistir Agora
              </button>
              <button onClick={() => setSelectedItem(activeHero)} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-6 py-4 font-bold text-white backdrop-blur-xl transition hover:bg-white/12">
                <Info size={18} /> Mais Informações
              </button>
            </div>
            <div className="mt-8 flex gap-2">
              {heroItems.map((hero, index) => (
                <button
                  key={hero.id}
                  onClick={() => setHeroIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${heroIndex === index ? "w-10 bg-cyan-400" : "w-2.5 bg-white/35 hover:bg-white/55"}`}
                />
              ))}
            </div>
          </div>

          <div className="w-full max-w-md self-end rounded-[32px] border border-white/10 bg-white/6 p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">Em destaque agora</div>
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
              <img src={activeHero.image} alt={activeHero.title} className="h-56 w-full object-cover" />
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white">{activeHero.title}</h3>
                  <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-bold text-amber-300">{activeHero.note}</span>
                </div>
                <p className="text-sm leading-7 text-zinc-300">{activeHero.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm text-zinc-300">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">{activeHero.duration}</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">{activeHero.quality}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-10 px-4 pb-20 md:px-8">
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Catálogo total", value: allCatalog.length },
            { label: "Filmes", value: films.length },
            { label: "Séries + Animes", value: series.length + animes.length },
            { label: "Desenhos", value: cartoons.length },
          ].map((stat, index) => (
            <div key={stat.label} className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className={`mb-3 inline-flex rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white ${gradients[index % gradients.length]}`}>{stat.label}</div>
              <div className="text-3xl font-black text-white md:text-4xl">{stat.value}</div>
            </div>
          ))}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl md:p-6">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white md:text-3xl">Busca premium do catálogo</h2>
              <p className="text-sm text-zinc-400">Pesquise por nome, gênero, categoria, anime, desenho, filme ou série em tempo real.</p>
            </div>
            <div className="relative w-full md:w-[420px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ex: terror, anime, ação, série..."
                className="w-full rounded-2xl border border-white/10 bg-black/25 py-4 pl-12 pr-4 text-white outline-none backdrop-blur-xl placeholder:text-zinc-500 transition focus:border-cyan-400/50"
              />
            </div>
          </div>

          {search ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCatalog.slice(0, 12).map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group flex items-center gap-4 rounded-[24px] border border-white/10 bg-black/20 p-4 text-left transition hover:border-cyan-400/30 hover:bg-white/6"
                >
                  <img src={item.image} alt={item.title} className="h-24 w-20 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className={`mb-2 inline-flex rounded-full bg-gradient-to-r px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white ${gradients[index % gradients.length]}`}>
                      {item.category}
                    </div>
                    <div className="truncate text-lg font-bold text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-zinc-400">{item.genre} • {item.year} • Nota {item.note}</div>
                    <div className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">{item.description}</div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-white/10 bg-black/15 px-5 py-8 text-center text-zinc-400">
              Digite algo na busca para localizar filmes, séries, animes e desenhos com visual rápido e refinado.
            </div>
          )}
        </section>

        <RowSection title="Em Alta" items={trending} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Lançamentos" items={launches} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Populares" items={popular} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Recomendados para Você" items={recommended} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Continue Assistindo</h2>
            <p className="text-sm text-zinc-400">Retome exatamente de onde parou com progresso salvo visualmente.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {continueWatching.slice(0, 6).map((item, index) => (
              <button key={item.id} onClick={() => setSelectedItem(item)} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 text-left shadow-xl shadow-black/20 transition hover:border-cyan-400/30 hover:bg-white/8">
                <div className="relative h-48">
                  <img src={item.banner} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-[#04070d]/40 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-200">
                    {item.category}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-xl font-black text-white">{item.title}</div>
                      <div className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white ${gradients[index % gradients.length]}`}>{item.progress}%</div>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <RowSection title="Filmes de Ação" items={actionFilms} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Filmes de Terror" items={horrorFilms} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Filmes de Comédia" items={comedyFilms} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Séries" items={seriesRow} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Animes" items={animeRow} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Desenhos" items={cartoonRow} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Minha Lista" items={favoritesItems.length ? favoritesItems : allCatalog.slice(0, 8)} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
      </main>

      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
          <div>
            <div className="text-3xl font-black tracking-tight text-white">Dri<span className="bg-gradient-to-r from-red-500 via-cyan-400 to-violet-400 bg-clip-text text-transparent">k</span></div>
            <p className="mt-3 max-w-md text-sm leading-7 text-zinc-400">
              Plataforma demonstrativa de streaming com visual original, experiência premium, player sofisticado e catálogo completo de mock data pronto para impressionar.
            </p>
          </div>
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">Seções</div>
            <div className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
              {menu.map((item) => <div key={item}>{item}</div>)}
            </div>
          </div>
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">Resumo</div>
            <div className="space-y-2 text-sm text-zinc-400">
              <div>200 itens organizados em catálogo premium</div>
              <div>Player moderno com qualidade, velocidade, legenda e áudio</div>
              <div>Busca funcional, favoritos, carrosséis e continue assistindo</div>
            </div>
          </div>
        </div>
      </footer>

      {selectedItem && (
        <PlayerModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          relatedItems={relatedItems}
        />
      )}
    </div>
  );
}
