import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useMemo, useRef, useState } from "react";

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
];

const gradients = [
  "linear-gradient(135deg,#ef4444,#22d3ee)",
  "linear-gradient(135deg,#8b5cf6,#06b6d4)",
  "linear-gradient(135deg,#f97316,#ef4444)",
  "linear-gradient(135deg,#22c55e,#06b6d4)",
  "linear-gradient(135deg,#ec4899,#8b5cf6)",
];

const genreMap = {
  Filme: ["Ação", "Terror", "Comédia", "Suspense", "Drama", "Ficção Científica"],
  Série: ["Thriller", "Crime", "Drama", "Sci-Fi", "Mistério", "Aventura"],
  Anime: ["Shounen", "Fantasia", "Cyberpunk", "Ação", "Romance", "Sobrenatural"],
  Desenho: ["Aventura", "Comédia", "Família", "Fantasia", "Sci-Fi", "Musical"],
};

const wordBank = {
  Filme: ["Protocol", "Shadow", "Pulse", "Nova", "Rift", "Velocity", "Frontier", "Vortex", "Crimson", "Neon"],
  Série: ["Archive", "Signal", "District", "Circuit", "Binary", "Empire", "Vault", "Code", "Mirage", "Zero"],
  Anime: ["Requiem", "Chronicle", "Phoenix", "Astra", "Blade", "Zenith", "Eclipse", "Shin", "Mecha", "Dream"],
  Desenho: ["Pixel", "Comet", "Bubble", "Orbit", "Luna", "Rocket", "Prism", "Cloud", "Dash", "Spark"],
};

const CUSTOM_MOVIES_KEY = "drik_custom_movies_v1";

function generateItems(type, count, startId) {
  return Array.from({ length: count }, (_, index) => {
    const first = wordBank[type][index % wordBank[type].length];
    const second = wordBank[type][(index + 3) % wordBank[type].length];
    const genre = genreMap[type][index % genreMap[type].length];
    const year = 2012 + (index % 14);
    const note = (7.1 + ((index * 7) % 25) / 10).toFixed(1);
    const duration =
      type === "Filme" || type === "Desenho"
        ? `${95 + (index % 35)} min`
        : `${1 + (index % 5)} temporada${index % 5 === 0 ? "" : "s"} • ${8 + (index % 12)} episódios`;

    const badge =
      index % 9 === 0
        ? "Top 10"
        : index % 7 === 0
        ? "Novo"
        : index % 5 === 0
        ? "Popular"
        : index % 4 === 0
        ? "Em Alta"
        : "";

    return {
      id: startId + index,
      title: `${first} ${second}`,
      type,
      genre,
      year,
      note,
      duration,
      badge,
      image: posterPool[index % posterPool.length],
      banner: heroPool[index % heroPool.length],
      video: trailerPool[index % trailerPool.length],
      progress: (index * 13) % 100,
      description: `${type} com estética futurista, atmosfera premium e ritmo cinematográfico. ${first} ${second} mistura ${genre.toLowerCase()}, energia visual e estilo tecnológico do universo Drik.`,
      fullDescription: `${first} ${second} é um ${type.toLowerCase()} criado para dar ao catálogo Drik uma aparência de plataforma real. A obra mistura ${genre.toLowerCase()}, acabamento visual sofisticado, trilha intensa e clima moderno de 2026, entregando uma experiência elegante, envolvente e marcante.`,
      classification: ["10+", "12+", "14+", "16+"][index % 4],
      quality: ["4K", "1080p", "Ultra HD"][index % 3],
      audio: ["Português", "Inglês", "Japonês"][index % 3],
      seasons: type === "Filme" || type === "Desenho" ? null : 1 + (index % 5),
      episodes: type === "Filme" || type === "Desenho" ? null : 8 + (index % 12),
      isCustom: false,
    };
  });
}

const films = generateItems("Filme", 50, 1);
const series = generateItems("Série", 50, 1001);
const animes = generateItems("Anime", 50, 2001);
const cartoons = generateItems("Desenho", 50, 3001);

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${mins}:${secs}`;
}

function getSafeCustomCatalog() {
  try {
    const saved = localStorage.getItem(CUSTOM_MOVIES_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function RowSection({ title, items, favorites, onToggleFavorite, onOpenDetails }) {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: direction * 900, behavior: "smooth" });
  };

  return (
    <section className="section-block">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          <p>Descubra seleções com vibe cinematográfica, tecnológica e premium.</p>
        </div>
        <div className="row-arrows">
          <button onClick={() => scrollRow(-1)}>‹</button>
          <button onClick={() => scrollRow(1)}>›</button>
        </div>
      </div>

      <div ref={rowRef} className="row-scroll">
        {items.map((item, index) => {
          const isFav = favorites.includes(item.id);

          return (
            <article key={item.id} className="media-card">
              <div className="media-poster">
                <img src={item.image} alt={item.title} />
                <div className="media-overlay" />

                <div className="media-top">
                  {item.badge ? (
                    <span
                      className="badge"
                      style={{ background: gradients[index % gradients.length] }}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    <span />
                  )}

                  <button
                    className={isFav ? "icon-btn active" : "icon-btn"}
                    onClick={() => onToggleFavorite(item.id)}
                  >
                    ♥
                  </button>
                </div>

                <div className="media-bottom">
                  <div className="mini-tags">
                    <span>{item.type}</span>
                    <span>{item.genre}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <div className="meta-line">
                    {item.year} • {item.duration}
                  </div>
                </div>
              </div>

              <div className="media-body">
                <div className="rating-line">★ {item.note} • {item.quality}</div>
                <p>{item.description}</p>

                <div className="media-actions">
                  <button className="primary-btn" onClick={() => onOpenDetails(item)}>
                    ▶ Assistir
                  </button>
                  <button className="secondary-btn" onClick={() => onOpenDetails(item)}>
                    i Detalhes
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}function PlayerModal({ item, onClose, favorites, onToggleFavorite, relatedItems }) {
  const videoRef = useRef(null);
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

    video.volume = volume;
    video.playbackRate = speed;
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
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
    const max = duration || video.duration || 0;
    video.currentTime = Math.min(Math.max(0, video.currentTime + delta), max);
  };

  const openFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
  };

  const isFav = favorites.includes(item.id);

  return (
    <div className="modal-wrap">
      <div className="modal-box">
        <div className="modal-topbar">
          <div>
            <div className="eyebrow">Drik Player</div>
            <h3>{item.title}</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-grid">
          <div className="player-col">
            <div className="video-shell">
              <video
                ref={videoRef}
                src={item.video}
                poster={item.banner}
                className="video-element"
                controls={false}
              />
              <div className="video-fade" />

              <div className="video-overlay-controls">
                <div className="overlay-tags">
                  <span>{item.quality}</span>
                  <span>{item.type}</span>
                  <span>{item.classification}</span>
                </div>

                <div className="overlay-buttons">
                  <button className="round-white" onClick={togglePlay}>
                    ▶
                  </button>
                  <button className="round-dark" onClick={() => skipBy(-10)}>
                    «10
                  </button>
                  <button className="round-dark" onClick={() => skipBy(10)}>
                    10»
                  </button>
                  <button
                    className={isFav ? "round-dark active" : "round-dark"}
                    onClick={() => onToggleFavorite(item.id)}
                  >
                    ♥
                  </button>
                </div>
              </div>
            </div>

            <div className="control-panel">
              <div className="progress-box">
                <div>{formatTime(currentTime)}</div>
                <div>{formatTime(duration)}</div>
              </div>

              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={(e) => seek(e.target.value)}
                className="range"
              />

              <div className="control-grid">
                <div className="control-item">
                  <label>Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setVolume(v);
                      if (videoRef.current) videoRef.current.volume = v;
                    }}
                    className="range"
                  />
                </div>

                <div className="control-item">
                  <label>Qualidade</label>
                  <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                    <option>4K</option>
                    <option>1080p</option>
                    <option>720p</option>
                  </select>
                </div>

                <div className="control-item">
                  <label>Velocidade</label>
                  <select
                    value={speed}
                    onChange={(e) => {
                      const s = Number(e.target.value);
                      setSpeed(s);
                      if (videoRef.current) videoRef.current.playbackRate = s;
                    }}
                  >
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>

                <div className="control-item">
                  <label>Legenda</label>
                  <select value={subtitle} onChange={(e) => setSubtitle(e.target.value)}>
                    <option>Português</option>
                    <option>English</option>
                    <option>Desativada</option>
                  </select>
                </div>

                <div className="control-item">
                  <label>Áudio</label>
                  <div className="row-inline">
                    <select value={audio} onChange={(e) => setAudio(e.target.value)}>
                      <option>Português</option>
                      <option>Inglês</option>
                      <option>Japonês</option>
                    </select>
                    <button className="square-btn" onClick={openFullscreen}>
                      ⛶
                    </button>
                  </div>
                </div>
              </div>

              {(item.type === "Série" || item.type === "Anime") && (
                <div className="next-episode">
                  <strong>Próximo episódio disponível</strong>
                  <p>
                    Temporada {item.seasons}, episódio {Math.min(2, item.episodes || 2)} pronto
                    para reprodução.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="detail-col">
            <div className="detail-card">
              <div className="detail-banner">
                <img src={item.banner} alt={item.title} />
                <div className="detail-fade" />
                <div className="detail-banner-content">
                  <div className="mini-tags">
                    <span>{item.genre}</span>
                    <span>{item.year}</span>
                    <span>{item.note}</span>
                  </div>
                  <h4>{item.title}</h4>
                </div>
              </div>

              <div className="detail-body">
                <p>{item.fullDescription}</p>

                <div className="detail-grid">
                  <div>
                    <small>Categoria</small>
                    <span>{item.type}</span>
                  </div>
                  <div>
                    <small>Duração</small>
                    <span>{item.duration}</span>
                  </div>
                  <div>
                    <small>Classificação</small>
                    <span>{item.classification}</span>
                  </div>
                  <div>
                    <small>Áudio</small>
                    <span>{audio}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="related-card">
              <h5>Conteúdos parecidos</h5>

              {relatedItems.map((related) => (
                <div key={related.id} className="related-item">
                  <img src={related.image} alt={related.title} />
                  <div>
                    <div className="related-title">{related.title}</div>
                    <div className="related-meta">
                      {related.genre} • {related.year}
                    </div>
                    <div className="related-desc">{related.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}export default function DrikStreamingExperience() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([films[1].id, series[3].id, animes[4].id]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Início");
  const [scrolled, setScrolled] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [customCatalog, setCustomCatalog] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    type: "Filme",
    genre: "Ação",
    year: "2026",
    note: "8.5",
    duration: "110 min",
    badge: "Novo",
    image: posterPool[0],
    banner: heroPool[0],
    video: trailerPool[0],
    description: "",
    fullDescription: "",
    classification: "14+",
    quality: "1080p",
    audio: "Português",
    seasons: "",
    episodes: "",
  });

  useEffect(() => {
    setCustomCatalog(getSafeCustomCatalog());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 5);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allCatalog = useMemo(() => {
    return [...customCatalog, ...films, ...series, ...animes, ...cartoons];
  }, [customCatalog]);

  const heroItems = useMemo(() => {
    const base = [films[0], series[6], animes[12], cartoons[8], films[14]];
    return customCatalog.length ? [customCatalog[0], ...base.slice(0, 4)] : base;
  }, [customCatalog]);

  const filteredCatalog = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allCatalog;

    return allCatalog.filter((item) =>
      [item.title, item.genre, item.type, item.description].join(" ").toLowerCase().includes(term)
    );
  }, [search, allCatalog]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const saveCustomCatalog = (items) => {
    setCustomCatalog(items);
    localStorage.setItem(CUSTOM_MOVIES_KEY, JSON.stringify(items));
  };

  const handleAddMovie = () => {
    if (!newMovie.title.trim()) {
      alert("Digite o título do conteúdo.");
      return;
    }

    if (!newMovie.description.trim()) {
      alert("Digite uma descrição curta.");
      return;
    }

    if (!newMovie.fullDescription.trim()) {
      alert("Digite uma descrição completa.");
      return;
    }

    const itemId = Date.now();

    const payload = {
      id: itemId,
      title: newMovie.title.trim(),
      type: newMovie.type,
      genre: newMovie.genre.trim(),
      year: Number(newMovie.year) || 2026,
      note: String(newMovie.note || "8.5"),
      duration: newMovie.type === "Filme" || newMovie.type === "Desenho"
        ? newMovie.duration || "100 min"
        : `${newMovie.seasons || 1} temporada${Number(newMovie.seasons || 1) > 1 ? "s" : ""} • ${newMovie.episodes || 8} episódios`,
      badge: newMovie.badge,
      image: newMovie.image || posterPool[0],
      banner: newMovie.banner || heroPool[0],
      video: newMovie.video || trailerPool[0],
      progress: 0,
      description: newMovie.description.trim(),
      fullDescription: newMovie.fullDescription.trim(),
      classification: newMovie.classification,
      quality: newMovie.quality,
      audio: newMovie.audio,
      seasons:
        newMovie.type === "Filme" || newMovie.type === "Desenho"
          ? null
          : Number(newMovie.seasons || 1),
      episodes:
        newMovie.type === "Filme" || newMovie.type === "Desenho"
          ? null
          : Number(newMovie.episodes || 8),
      isCustom: true,
    };

    const updated = [payload, ...customCatalog];
    saveCustomCatalog(updated);

    setNewMovie({
      title: "",
      type: "Filme",
      genre: "Ação",
      year: "2026",
      note: "8.5",
      duration: "110 min",
      badge: "Novo",
      image: posterPool[0],
      banner: heroPool[0],
      video: trailerPool[0],
      description: "",
      fullDescription: "",
      classification: "14+",
      quality: "1080p",
      audio: "Português",
      seasons: "",
      episodes: "",
    });

    alert("Conteúdo adicionado com sucesso.");
  };

  const handleRemoveMovie = (id) => {
    const updated = customCatalog.filter((item) => item.id !== id);
    saveCustomCatalog(updated);
  };

  const favoritesItems = allCatalog.filter((item) => favorites.includes(item.id));
  const continueWatching = allCatalog.filter((item) => item.progress >= 20 && item.progress <= 85).slice(0, 6);
  const recommended = allCatalog.filter((item) => Number(item.note) >= 8.5).slice(0, 16);
  const popular = allCatalog.filter((item) => item.badge === "Popular" || item.badge === "Top 10").slice(0, 16);
  const launches = allCatalog.filter((item) => item.year >= 2024).slice(0, 16);
  const trending = allCatalog.filter((item) => item.badge === "Em Alta" || item.badge === "Top 10" || item.badge === "Novo").slice(0, 16);
  const actionFilms = allCatalog.filter((item) => item.type === "Filme" && item.genre === "Ação").slice(0, 16);
  const horrorFilms = allCatalog.filter((item) => item.type === "Filme" && item.genre === "Terror").slice(0, 16);
  const comedyFilms = allCatalog.filter((item) => item.type === "Filme" && item.genre === "Comédia").slice(0, 16);
  const seriesRow = allCatalog.filter((item) => item.type === "Série").slice(0, 16);
  const animeRow = allCatalog.filter((item) => item.type === "Anime").slice(0, 16);
  const cartoonRow = allCatalog.filter((item) => item.type === "Desenho").slice(0, 16);
  const liveSearchResults = search ? filteredCatalog.slice(0, 12) : [];
  const menu = ["Início", "Filmes", "Séries", "Animes", "Desenhos", "Minha Lista"];
  const activeHero = heroItems[heroIndex];

  const relatedItems = selectedItem
    ? allCatalog
        .filter(
          (item) =>
            item.id !== selectedItem.id &&
            (item.genre === selectedItem.genre || item.type === selectedItem.type)
        )
        .slice(0, 4)
    : [];

  const loginGoogle = async () => {
    if (googleLoading) return;

    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert("Bem-vindo " + (user.displayName || "usuário"));
    } catch (error) {
      console.error("Erro no login com Google:", error);

      const code = error?.code || "";

      if (code.includes("popup-blocked")) {
        alert("O navegador bloqueou o popup do Google. Libere o popup e tente de novo.");
      } else if (code.includes("popup-closed-by-user")) {
        alert("Você fechou a janela de login antes de concluir.");
      } else if (code.includes("unauthorized-domain")) {
        alert("Seu domínio ainda não foi autorizado no Firebase.");
      } else if (code.includes("operation-not-allowed")) {
        alert("O login com Google ainda não está ativado no Firebase Authentication.");
      } else {
        alert("Erro ao entrar com Google. Verifique o Firebase, domínio autorizado e popup.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <style>{`
        *{box-sizing:border-box}
        body{margin:0;font-family:Arial,Helvetica,sans-serif;background:#030307;color:#fff}
        button,input,select,textarea{font:inherit}
        img{display:block}
        .app-bg{
          min-height:100vh;
          background:
            radial-gradient(circle at top left, rgba(239,68,68,.22), transparent 23%),
            radial-gradient(circle at top right, rgba(127,29,29,.22), transparent 24%),
            radial-gradient(circle at 15% 60%, rgba(220,38,38,.12), transparent 22%),
            radial-gradient(circle at 85% 70%, rgba(185,28,28,.10), transparent 22%),
            linear-gradient(180deg,#06070c 0%,#07080d 36%,#05050a 62%,#020204 100%);
        }
        .container{
          width:100%;
          max-width:none;
          margin:0;
          padding:0 34px;
        }
        .header{position:fixed;left:0;right:0;top:0;z-index:50;transition:.3s}
        .header.scrolled{background:rgba(0,0,0,.7);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.08);box-shadow:0 20px 60px rgba(0,0,0,.35)}
        .header.top{background:linear-gradient(to bottom,rgba(0,0,0,.85),transparent)}
        .header-inner{width:100%;margin:0;padding:16px 26px;display:flex;align-items:center;justify-content:space-between;gap:16px}
        .brand{font-size:36px;font-weight:900;letter-spacing:-1px}
        .brand span{background:linear-gradient(90deg,#ef4444,#fb7185,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}
        .nav{display:flex;gap:10px}
        .nav button{background:transparent;border:1px solid transparent;color:#9ca3af;cursor:pointer;font-size:14px;font-weight:700;padding:10px 14px;border-radius:999px;transition:.25s}
        .nav button:hover{color:#fff;background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.08)}
        .nav button.active{color:#fff;background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.12);box-shadow:0 10px 24px rgba(0,0,0,.18)}
        .header-right{display:flex;align-items:center;gap:12px}
        .search-mini,.search-wide{position:relative}
        .search-mini input{width:320px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.08);padding:13px 16px 13px 42px;color:#fff;outline:none;box-shadow:0 10px 25px rgba(0,0,0,.18);transition:.25s}
        .search-mini input:focus{border-color:rgba(239,68,68,.45);background:rgba(255,255,255,.12);box-shadow:0 0 0 4px rgba(239,68,68,.10)}
        .search-wide input{width:100%;border-radius:18px;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.25);padding:16px 16px 16px 44px;color:#fff;outline:none}
        .search-wide{width:460px;max-width:100%}
        .search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#a1a1aa}
        .header-btn{border:1px solid rgba(255,255,255,.12);background:linear-gradient(90deg,#ef4444,#b91c1c);color:#fff;padding:12px 18px;border-radius:999px;cursor:pointer;font-weight:700;box-shadow:0 10px 25px rgba(239,68,68,.28);transition:.25s}
        .header-btn:hover{transform:translateY(-2px);box-shadow:0 16px 30px rgba(239,68,68,.38)}
        .header-btn:disabled{opacity:.7;cursor:not-allowed;transform:none}
        .avatar{width:44px;height:44px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;cursor:pointer}
        .hero{position:relative;min-height:90vh;overflow:hidden;padding-top:96px}
        .hero-bg{position:absolute;inset:0}
        .hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.42}
        .hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(2,4,8,.96) 0%,rgba(2,4,8,.78) 38%,rgba(2,4,8,.24) 100%)}
        .hero-bottom{position:absolute;inset:0;background:linear-gradient(180deg,transparent 0%,rgba(4,7,13,.2) 48%,#040408 100%)}
        .hero-inner{width:100%;margin:0;padding:48px 34px 80px;display:flex;gap:48px;align-items:flex-end;justify-content:space-between}
        .hero-copy{max-width:760px;padding-top:24px}
        .eyebrow{display:inline-block;margin-bottom:16px;padding:10px 14px;border-radius:999px;border:1px solid rgba(239,68,68,.18);background:rgba(239,68,68,.08);color:#fca5a5;font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase}
        .hero-copy h1{font-size:72px;line-height:.95;margin:0;font-weight:900;letter-spacing:-2px}
        .hero-copy p{margin:24px 0 0;max-width:650px;color:#d4d4d8;font-size:18px;line-height:1.8}
        .tag-row,.mini-tags,.overlay-tags{display:flex;flex-wrap:wrap;gap:10px}
        .tag-row{margin-top:24px}
        .tag-row span,.mini-tags span,.overlay-tags span{padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);font-size:12px;color:#d4d4d8}
        .hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:28px}
        .hero-dots{display:flex;gap:8px;margin-top:28px}
        .hero-dots button{height:10px;border-radius:999px;border:0;cursor:pointer;background:rgba(255,255,255,.35)}
        .hero-dots button.active{width:42px;background:#ef4444}
        .hero-dots button:not(.active){width:10px}
        .primary-btn,.secondary-btn,.big-white,.big-glass{cursor:pointer;border:0;border-radius:16px;padding:12px 16px;font-weight:700;transition:.2s}
        .primary-btn,.big-white{background:#fff;color:#000}
        .secondary-btn,.big-glass{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.1)}
        .hero-card{width:100%;max-width:390px;border-radius:32px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);padding:16px;backdrop-filter:blur(18px);box-shadow:0 25px 70px rgba(239,68,68,.08)}
        .hero-card-inner{overflow:hidden;border-radius:24px;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.2)}
        .hero-card-inner img{width:100%;height:224px;object-fit:cover}
        .hero-card-content{padding:20px}
        .hero-card-content h3{font-size:30px;margin:0 0 10px;font-weight:900}
        .hero-card-content p{margin:0;color:#d4d4d8;line-height:1.7;font-size:14px}
        .hero-card-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
        .hero-card-grid div{padding:12px;border-radius:18px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#d4d4d8;font-size:14px}        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:10px}
        .stat{border-radius:28px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);padding:20px;backdrop-filter:blur(16px)}
        .stat .label{display:inline-block;padding:6px 10px;border-radius:999px;color:#fff;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;margin-bottom:12px}
        .stat .value{font-size:42px;font-weight:900}
        .search-panel,.admin-panel{margin-top:40px;border-radius:32px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);padding:24px;backdrop-filter:blur(18px);box-shadow:0 20px 50px rgba(0,0,0,.18)}
        .search-panel-head,.admin-head{display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap}
        .search-panel-head h2,.admin-head h2{margin:0;font-size:34px}
        .search-panel-head p,.admin-head p{margin:6px 0 0;color:#a1a1aa;font-size:14px}
        .search-results{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:20px}
        .search-result{display:flex;gap:16px;text-align:left;border-radius:24px;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.2);padding:16px;cursor:pointer}
        .search-result:hover{border-color:rgba(239,68,68,.3);background:rgba(255,255,255,.06)}
        .search-result img{width:80px;height:96px;border-radius:18px;object-fit:cover}
        .search-result .result-tag{display:inline-block;padding:4px 10px;border-radius:999px;color:#fff;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;margin-bottom:8px}
        .search-result .title{font-size:18px;font-weight:800}
        .search-result .meta{font-size:14px;color:#a1a1aa;margin-top:6px}
        .search-result .desc{font-size:14px;color:#a1a1aa;line-height:1.6;margin-top:8px}
        .section-block{margin-top:38px}
        .section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:16px}
        .section-head h2{margin:0;font-size:34px}
        .section-head p{margin:6px 0 0;color:#a1a1aa;font-size:14px}
        .row-arrows{display:flex;gap:8px}
        .row-arrows button{display:block;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#fff;width:38px;height:38px;border-radius:999px;cursor:pointer}
        .row-scroll{display:flex;gap:14px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none}
        .row-scroll::-webkit-scrollbar{display:none}
        .media-card{
          min-width:210px;
          max-width:210px;
          overflow:hidden;
          border-radius:24px;
          border:1px solid rgba(255,255,255,.1);
          background:rgba(255,255,255,.05);
          box-shadow:0 16px 40px rgba(0,0,0,.3);
          transition:.25s;
        }
        .media-card:hover{transform:translateY(-8px) scale(1.03);border-color:rgba(239,68,68,.45);box-shadow:0 25px 60px rgba(0,0,0,.6)}
        .media-poster{position:relative;height:300px;overflow:hidden}
        .media-poster img{width:100%;height:100%;object-fit:cover;transition:.45s}
        .media-card:hover .media-poster img{transform:scale(1.08)}
        .media-overlay{position:absolute;inset:0;background:linear-gradient(to top,#05070c,rgba(5,7,12,.4),transparent)}
        .media-top{position:absolute;left:0;right:0;top:0;display:flex;align-items:flex-start;justify-content:space-between;padding:12px}
        .badge{padding:8px 12px;border-radius:999px;color:#fff;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
        .icon-btn{border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.35);color:#fff;border-radius:999px;width:38px;height:38px;cursor:pointer}
        .icon-btn.active,.round-dark.active{background:#f43f5e}
        .media-bottom{position:absolute;left:0;right:0;bottom:0;padding:14px}
        .media-bottom h3{margin:0;font-size:20px;font-weight:900;line-height:1.1}
        .meta-line{margin-top:8px;font-size:13px;color:#d4d4d8}
        .media-body{padding:14px}
        .rating-line{font-size:13px;color:#d4d4d8;margin-bottom:10px}
        .media-body p{font-size:13px;line-height:1.6;color:#a1a1aa;margin:0 0 14px;min-height:84px}
        .media-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .continue-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .continue-card{overflow:hidden;border-radius:28px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);text-align:left;cursor:pointer}
        .continue-card:hover{border-color:rgba(239,68,68,.3);background:rgba(255,255,255,.08)}
        .continue-media{position:relative;height:190px}
        .continue-media img{width:100%;height:100%;object-fit:cover}
        .continue-shade{position:absolute;inset:0;background:linear-gradient(to top,#04070d,rgba(4,7,13,.4),transparent)}
        .continue-top-tag{position:absolute;left:16px;top:16px;padding:6px 10px;border-radius:999px;background:rgba(0,0,0,.45);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#d4d4d8}
        .continue-bottom{position:absolute;left:16px;right:16px;bottom:16px}
        .continue-title{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
        .continue-title strong{font-size:22px}
        .continue-title span{padding:6px 10px;border-radius:999px;color:#fff;font-size:12px;font-weight:700}
        .progress-track{height:8px;border-radius:999px;background:rgba(255,255,255,.1)}
        .progress-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#ef4444,#dc2626,#7c3aed)}
        .admin-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:18px}
        .admin-grid .wide{grid-column:span 2}
        .admin-field label{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.16em;color:#a1a1aa;margin-bottom:8px}
        .admin-field input,.admin-field select,.admin-field textarea{
          width:100%;
          border-radius:18px;
          border:1px solid rgba(255,255,255,.1);
          background:rgba(0,0,0,.25);
          color:#fff;
          padding:14px;
          outline:none;
        }
        .admin-field textarea{min-height:120px;resize:vertical}
        .admin-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:18px}
        .custom-list{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:20px}
        .custom-item{display:flex;gap:12px;padding:12px;border-radius:20px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.18)}
        .custom-item img{width:64px;height:84px;object-fit:cover;border-radius:14px}
        .danger-btn{border:1px solid rgba(239,68,68,.24);background:rgba(239,68,68,.12);color:#fff;border-radius:14px;padding:10px 12px;cursor:pointer}
        .footer{margin-top:54px;border-top:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.35)}
        .footer-grid{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:32px;padding:40px 34px}
        .footer-grid p,.footer-grid div{color:#a1a1aa;line-height:1.8;font-size:14px}
        .footer-grid h4{font-size:14px;text-transform:uppercase;letter-spacing:.2em;color:#a1a1aa;margin:0 0 12px}
        .modal-wrap{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.85);padding:12px;backdrop-filter:blur(10px)}
        .modal-box{max-width:1280px;height:100%;margin:0 auto;overflow:hidden;border-radius:32px;border:1px solid rgba(255,255,255,.1);background:#080b12;box-shadow:0 30px 80px rgba(239,68,68,.08);display:flex;flex-direction:column}
        .modal-topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.1)}
        .modal-topbar h3{margin:4px 0 0;font-size:28px}
        .modal-grid{display:grid;grid-template-columns:1.5fr .8fr;flex:1;overflow:auto}
        .player-col{padding:20px;border-right:1px solid rgba(255,255,255,.1)}
        .detail-col{padding:20px}
        .video-shell{position:relative;overflow:hidden;border-radius:28px;border:1px solid rgba(255,255,255,.1);background:#000}
        .video-element{width:100%;aspect-ratio:16/9;background:#000}
        .video-fade{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7),transparent)}
        .video-overlay-controls{position:absolute;left:0;right:0;bottom:0;padding:18px}
        .overlay-buttons{display:flex;gap:10px;margin-top:14px}
        .round-white,.round-dark{border:0;cursor:pointer;border-radius:999px}
        .round-white{width:48px;height:48px;background:#fff;color:#000;font-weight:700}
        .round-dark{padding:13px 16px;background:rgba(255,255,255,.1);color:#fff}
        .control-panel{margin-top:18px;padding:18px;border-radius:28px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05)}
        .progress-box{display:flex;align-items:center;justify-content:space-between;color:#d4d4d8;font-size:14px}
        .range{width:100%;accent-color:#ef4444;margin-top:10px}
        .control-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:18px}
        .control-item label{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.16em;color:#a1a1aa;margin-bottom:8px}
        .control-item select,.control-item input{width:100%}
        .control-item select{padding:12px 14px;border-radius:18px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#fff;outline:none}
        .row-inline{display:flex;gap:8px}
        .square-btn{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#fff;border-radius:18px;padding:0 14px;cursor:pointer}
        .next-episode{margin-top:16px;padding:16px;border-radius:24px;border:1px solid rgba(239,68,68,.18);background:rgba(239,68,68,.06);color:#d4d4d8}
        .next-episode strong{display:block;color:#fca5a5;margin-bottom:6px}
        .detail-card,.related-card{border-radius:28px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);overflow:hidden}
        .detail-banner{position:relative;height:240px}
        .detail-banner img{width:100%;height:100%;object-fit:cover}
        .detail-fade{position:absolute;inset:0;background:linear-gradient(to top,#080b12,rgba(8,11,18,.45),transparent)}
        .detail-banner-content{position:absolute;left:20px;right:20px;bottom:20px}
        .detail-banner-content h4{margin:10px 0 0;font-size:38px}
        .detail-body{padding:20px;color:#d4d4d8;line-height:1.8}
        .detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px}
        .detail-grid div{padding:14px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05)}
        .detail-grid small{display:block;color:#71717a;text-transform:uppercase;letter-spacing:.16em;font-size:11px;margin-bottom:6px}
        .detail-grid span{color:#fff;font-weight:600}
        .related-card{margin-top:18px;padding:18px}
        .related-card h5{margin:0 0 14px;font-size:22px}
        .related-item{display:flex;gap:12px;padding:12px;border-radius:20px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.18);margin-top:10px}
        .related-item img{width:64px;height:82px;object-fit:cover;border-radius:14px}
        .related-title{font-weight:700}
        .related-meta{font-size:12px;color:#a1a1aa;margin-top:3px}
        .related-desc{font-size:12px;color:#a1a1aa;line-height:1.6;margin-top:8px}
        @media (max-width:1200px){.search-results{grid-template-columns:repeat(3,1fr)}.continue-grid{grid-template-columns:repeat(3,1fr)}.custom-list{grid-template-columns:repeat(2,1fr)}}
        @media (max-width:1100px){.stats{grid-template-columns:repeat(2,1fr)}.search-results{grid-template-columns:repeat(2,1fr)}.continue-grid{grid-template-columns:1fr 1fr}.modal-grid{grid-template-columns:1fr}.player-col{border-right:0;border-bottom:1px solid rgba(255,255,255,.1)}.control-grid{grid-template-columns:repeat(2,1fr)}.admin-grid{grid-template-columns:repeat(2,1fr)}}
        @media (max-width:900px){.hero-inner{flex-direction:column;align-items:flex-start}.hero-copy h1{font-size:54px}.hero-card{max-width:none}.nav,.search-mini,.header-btn{display:none}.search-results,.custom-list{grid-template-columns:1fr}.continue-grid{grid-template-columns:1fr}.footer-grid{grid-template-columns:1fr}.section-head h2,.search-panel-head h2,.admin-head h2{font-size:28px}.admin-grid{grid-template-columns:1fr}.admin-grid .wide{grid-column:span 1}}
        @media (max-width:640px){.container,.header-inner,.hero-inner,.footer-grid{padding-left:14px;padding-right:14px}.hero{min-height:84vh}.hero-copy h1{font-size:40px;letter-spacing:-1px}.hero-copy p{font-size:16px}.stats{grid-template-columns:1fr}.continue-title strong{font-size:18px}.control-grid{grid-template-columns:1fr}.detail-grid{grid-template-columns:1fr}.modal-topbar h3{font-size:22px}}
      `}</style>

      <div className="app-bg">
        <header className={scrolled ? "header scrolled" : "header top"}>
          <div className="header-inner">
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <div className="brand">
                Dri<span>k</span>
              </div>

              <nav className="nav">
                {menu.map((item) => (
                  <button
                    key={item}
                    className={activeTab === item ? "active" : ""}
                    onClick={() => setActiveTab(item)}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="header-right">
              <div className="search-mini">
                <span className="search-icon">⌕</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nome, gênero ou categoria"
                />
              </div>

              <button className="header-btn" onClick={loginGoogle} disabled={googleLoading}>
                {googleLoading ? "Entrando..." : "Entrar com Google"}
              </button>
              <button className="avatar">👤</button>
            </div>
          </div>
        </header>

        <section className="hero">
          <div className="hero-bg">
            <img src={activeHero.banner} alt={activeHero.title} />
            <div className="hero-shade" />
            <div className="hero-bottom" />
          </div>

          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">Experiência premium Drik</div>
              <h1>Streaming futurista com cinema, séries, animes e desenhos em um só lugar.</h1>
              <p>
                Visual sofisticado, navegação rápida, banner rotativo, player elegante, catálogo
                extenso e uma identidade original feita para impressionar com clima tecnológico.
              </p>

              <div className="tag-row">
                <span>{activeHero.type}</span>
                <span>{activeHero.genre}</span>
                <span>{activeHero.year}</span>
                <span>Nota {activeHero.note}</span>
              </div>

              <div className="hero-actions">
                <button className="big-white" onClick={() => setSelectedItem(activeHero)}>
                  ▶ Assistir Agora
                </button>
                <button className="big-glass" onClick={() => setSelectedItem(activeHero)}>
                  i Mais Informações
                </button>
              </div>

              <div className="hero-dots">
                {heroItems.map((hero, index) => (
                  <button
                    key={hero.id}
                    className={heroIndex === index ? "active" : ""}
                    onClick={() => setHeroIndex(index)}
                  />
                ))}
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-card-inner">
                <img src={activeHero.image} alt={activeHero.title} />
                <div className="hero-card-content">
                  <h3>{activeHero.title}</h3>
                  <p>{activeHero.description}</p>
                  <div className="hero-card-grid">
                    <div>{activeHero.duration}</div>
                    <div>{activeHero.quality}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>        <main className="container" style={{ paddingBottom: 80 }}>
          <section className="stats">
            {[
              { label: "Catálogo total", value: allCatalog.length },
              { label: "Filmes", value: allCatalog.filter((item) => item.type === "Filme").length },
              { label: "Séries + Animes", value: allCatalog.filter((item) => item.type === "Série" || item.type === "Anime").length },
              { label: "Desenhos", value: allCatalog.filter((item) => item.type === "Desenho").length },
            ].map((stat, index) => (
              <div key={stat.label} className="stat">
                <div className="label" style={{ background: gradients[index % gradients.length] }}>
                  {stat.label}
                </div>
                <div className="value">{stat.value}</div>
              </div>
            ))}
          </section>

          <section className="search-panel">
            <div className="search-panel-head">
              <div>
                <h2>Busca premium do catálogo</h2>
                <p>Pesquise por nome, gênero, categoria, anime, desenho, filme ou série em tempo real.</p>
              </div>

              <div className="search-wide">
                <span className="search-icon">⌕</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ex: terror, anime, ação, série..."
                />
              </div>
            </div>

            {search ? (
              <div className="search-results">
                {liveSearchResults.map((item, index) => (
                  <button
                    key={item.id}
                    className="search-result"
                    onClick={() => setSelectedItem(item)}
                  >
                    <img src={item.image} alt={item.title} />
                    <div>
                      <div
                        className="result-tag"
                        style={{ background: gradients[index % gradients.length] }}
                      >
                        {item.type}
                      </div>
                      <div className="title">{item.title}</div>
                      <div className="meta">
                        {item.genre} • {item.year} • Nota {item.note}
                      </div>
                      <div className="desc">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div
                style={{
                  marginTop: 20,
                  borderRadius: 24,
                  border: "1px dashed rgba(255,255,255,.1)",
                  background: "rgba(0,0,0,.15)",
                  padding: 28,
                  textAlign: "center",
                  color: "#a1a1aa",
                }}
              >
                Digite algo na busca para localizar filmes, séries, animes e desenhos com visual rápido e refinado.
              </div>
            )}
          </section>

          <section className="admin-panel">
            <div className="admin-head">
              <div>
                <h2>Painel para adicionar filmes</h2>
                <p>Área pronta para você cadastrar conteúdos sem quebrar o site. Os dados ficam salvos no navegador.</p>
              </div>
            </div>

            <div className="admin-grid">
              <div className="admin-field">
                <label>Título</label>
                <input
                  value={newMovie.title}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Nome do filme ou série"
                />
              </div>

              <div className="admin-field">
                <label>Tipo</label>
                <select
                  value={newMovie.type}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, type: e.target.value }))}
                >
                  <option>Filme</option>
                  <option>Série</option>
                  <option>Anime</option>
                  <option>Desenho</option>
                </select>
              </div>

              <div className="admin-field">
                <label>Gênero</label>
                <input
                  value={newMovie.genre}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, genre: e.target.value }))}
                  placeholder="Ação"
                />
              </div>

              <div className="admin-field">
                <label>Ano</label>
                <input
                  value={newMovie.year}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, year: e.target.value }))}
                  placeholder="2026"
                />
              </div>

              <div className="admin-field">
                <label>Nota</label>
                <input
                  value={newMovie.note}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, note: e.target.value }))}
                  placeholder="8.5"
                />
              </div>

              <div className="admin-field">
                <label>Duração</label>
                <input
                  value={newMovie.duration}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="110 min"
                />
              </div>

              <div className="admin-field">
                <label>Selo</label>
                <select
                  value={newMovie.badge}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, badge: e.target.value }))}
                >
                  <option>Novo</option>
                  <option>Popular</option>
                  <option>Em Alta</option>
                  <option>Top 10</option>
                  <option value="">Sem selo</option>
                </select>
              </div>

              <div className="admin-field">
                <label>Classificação</label>
                <select
                  value={newMovie.classification}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, classification: e.target.value }))}
                >
                  <option>10+</option>
                  <option>12+</option>
                  <option>14+</option>
                  <option>16+</option>
                </select>
              </div>

              <div className="admin-field wide">
                <label>Imagem do card</label>
                <input
                  value={newMovie.image}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="URL da capa"
                />
              </div>

              <div className="admin-field wide">
                <label>Imagem do banner</label>
                <input
                  value={newMovie.banner}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, banner: e.target.value }))}
                  placeholder="URL do banner"
                />
              </div>

              <div className="admin-field wide">
                <label>Vídeo</label>
                <input
                  value={newMovie.video}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, video: e.target.value }))}
                  placeholder="URL do trailer ou filme"
                />
              </div>

              <div className="admin-field">
                <label>Qualidade</label>
                <select
                  value={newMovie.quality}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, quality: e.target.value }))}
                >
                  <option>4K</option>
                  <option>1080p</option>
                  <option>Ultra HD</option>
                  <option>720p</option>
                </select>
              </div>

              <div className="admin-field">
                <label>Áudio</label>
                <select
                  value={newMovie.audio}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, audio: e.target.value }))}
                >
                  <option>Português</option>
                  <option>Inglês</option>
                  <option>Japonês</option>
                </select>
              </div>

              <div className="admin-field">
                <label>Temporadas</label>
                <input
                  value={newMovie.seasons}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, seasons: e.target.value }))}
                  placeholder="1"
                />
              </div>

              <div className="admin-field">
                <label>Episódios</label>
                <input
                  value={newMovie.episodes}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, episodes: e.target.value }))}
                  placeholder="8"
                />
              </div>

              <div className="admin-field wide">
                <label>Descrição curta</label>
                <textarea
                  value={newMovie.description}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição curta para o card"
                />
              </div>

              <div className="admin-field wide">
                <label>Descrição completa</label>
                <textarea
                  value={newMovie.fullDescription}
                  onChange={(e) => setNewMovie((prev) => ({ ...prev, fullDescription: e.target.value }))}
                  placeholder="Descrição completa da obra"
                />
              </div>
            </div>

            <div className="admin-actions">
              <button className="big-white" onClick={handleAddMovie}>
                + Adicionar conteúdo
              </button>
            </div>

            {customCatalog.length > 0 && (
              <div className="custom-list">
                {customCatalog.map((item) => (
                  <div key={item.id} className="custom-item">
                    <img src={item.image} alt={item.title} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800 }}>{item.title}</div>
                      <div style={{ color: "#a1a1aa", fontSize: 13, marginTop: 4 }}>
                        {item.type} • {item.genre} • {item.year}
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <button className="danger-btn" onClick={() => handleRemoveMovie(item.id)}>
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <RowSection title="Em Alta" items={trending} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
          <RowSection title="Lançamentos" items={launches} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
          <RowSection title="Populares" items={popular} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
          <RowSection title="Recomendados para Você" items={recommended} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />

          <section className="section-block">
            <div className="section-head">
              <div>
                <h2>Continue Assistindo</h2>
                <p>Retome exatamente de onde parou com progresso salvo visualmente.</p>
              </div>
            </div>

            <div className="continue-grid">
              {continueWatching.map((item, index) => (
                <button key={item.id} className="continue-card" onClick={() => setSelectedItem(item)}>
                  <div className="continue-media">
                    <img src={item.banner} alt={item.title} />
                    <div className="continue-shade" />
                    <div className="continue-top-tag">{item.type}</div>
                    <div className="continue-bottom">
                      <div className="continue-title">
                        <strong>{item.title}</strong>
                        <span style={{ background: gradients[index % gradients.length] }}>
                          {item.progress}%
                        </span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${item.progress}%` }} />
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
          <RowSection
            title="Minha Lista"
            items={favoritesItems.length ? favoritesItems : allCatalog.slice(0, 8)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenDetails={setSelectedItem}
          />
        </main>

        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="brand">
                Dri<span>k</span>
              </div>
              <p>
                Plataforma demonstrativa de streaming com visual original, experiência premium,
                player sofisticado e catálogo completo pronto para impressionar.
              </p>
            </div>

            <div>
              <h4>Seções</h4>
              {menu.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>

            <div>
              <h4>Resumo</h4>
              <div>Catálogo premium com área própria para adicionar novos conteúdos</div>
              <div>Player moderno com qualidade, velocidade, legenda e áudio</div>
              <div>Busca funcional, favoritos, carrosséis e continue assistindo</div>
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
    </>
  );
}