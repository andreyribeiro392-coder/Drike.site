import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import { auth, provider } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const posterPool = [
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542204625-de293a2f8ff2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
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
  "linear-gradient(135deg,#0f172a,#1d4ed8)",
  "linear-gradient(135deg,#111827,#2563eb)",
  "linear-gradient(135deg,#1e293b,#0ea5e9)",
  "linear-gradient(135deg,#0b1220,#1d4ed8)",
  "linear-gradient(135deg,#172554,#0284c7)",
];

const genreMap = {
  Série: ["Drama", "Crime", "Thriller", "Mistério", "Sci-Fi", "Aventura"],
  Anime: ["Shounen", "Fantasia", "Ação", "Romance", "Cyberpunk", "Sobrenatural"],
  Desenho: ["Aventura", "Família", "Comédia", "Fantasia", "Musical", "Sci-Fi"],
};

const wordBank = {
  Série: ["Archive", "Signal", "District", "Circuit", "Binary", "Empire", "Vault", "Code"],
  Anime: ["Requiem", "Chronicle", "Phoenix", "Astra", "Blade", "Zenith", "Eclipse", "Dream"],
  Desenho: ["Pixel", "Comet", "Bubble", "Orbit", "Luna", "Rocket", "Prism", "Cloud"],
};

const CUSTOM_MOVIES_KEY = "drik_custom_movies_v3";
const FAVORITES_KEY = "drik_favorites_v3";

function safeJsonParse(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${mins}:${secs}`;
}

function getSafeCustomCatalog() {
  const saved = localStorage.getItem(CUSTOM_MOVIES_KEY);
  if (!saved) return [];
  return Array.isArray(safeJsonParse(saved, [])) ? safeJsonParse(saved, []) : [];
}

function getSafeFavorites(defaultIds = []) {
  const saved = localStorage.getItem(FAVORITES_KEY);
  if (!saved) return defaultIds;
  const parsed = safeJsonParse(saved, defaultIds);
  return Array.isArray(parsed) ? parsed : defaultIds;
}import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import { auth, provider } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const posterPool = [
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542204625-de293a2f8ff2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
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
  "linear-gradient(135deg,#0f172a,#1d4ed8)",
  "linear-gradient(135deg,#111827,#2563eb)",
  "linear-gradient(135deg,#1e293b,#0ea5e9)",
  "linear-gradient(135deg,#0b1220,#1d4ed8)",
  "linear-gradient(135deg,#172554,#0284c7)",
];

const genreMap = {
  Série: ["Drama", "Crime", "Thriller", "Mistério", "Sci-Fi", "Aventura"],
  Anime: ["Shounen", "Fantasia", "Ação", "Romance", "Cyberpunk", "Sobrenatural"],
  Desenho: ["Aventura", "Família", "Comédia", "Fantasia", "Musical", "Sci-Fi"],
};

const wordBank = {
  Série: ["Archive", "Signal", "District", "Circuit", "Binary", "Empire", "Vault", "Code"],
  Anime: ["Requiem", "Chronicle", "Phoenix", "Astra", "Blade", "Zenith", "Eclipse", "Dream"],
  Desenho: ["Pixel", "Comet", "Bubble", "Orbit", "Luna", "Rocket", "Prism", "Cloud"],
};

const CUSTOM_MOVIES_KEY = "drik_custom_movies_v3";
const FAVORITES_KEY = "drik_favorites_v3";

function safeJsonParse(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${mins}:${secs}`;
}

function getSafeCustomCatalog() {
  const saved = localStorage.getItem(CUSTOM_MOVIES_KEY);
  if (!saved) return [];
  return Array.isArray(safeJsonParse(saved, [])) ? safeJsonParse(saved, []) : [];
}

function getSafeFavorites(defaultIds = []) {
  const saved = localStorage.getItem(FAVORITES_KEY);
  if (!saved) return defaultIds;
  const parsed = safeJsonParse(saved, defaultIds);
  return Array.isArray(parsed) ? parsed : defaultIds;
}function RowSection({
  title,
  items,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  sectionRef,
}) {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({
      left: direction * 820,
      behavior: "smooth",
    });
  };

  if (!items.length) return null;

  return (
    <section ref={sectionRef} className="section-block">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          <p>Seleções com visual premium, navegação lateral e acesso rápido.</p>
        </div>

        <div className="row-arrows">
          <button type="button" onClick={() => scrollRow(-1)}>
            ‹
          </button>
          <button type="button" onClick={() => scrollRow(1)}>
            ›
          </button>
        </div>
      </div>

      <div ref={rowRef} className="row-scroll">
        {items.map((item, index) => {
          const isFav = favorites.includes(item.id);

          return (
            <article key={item.id} className="media-card globo-card">
              <div className="media-poster">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.src = posterPool[index % posterPool.length];
                  }}
                />
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
                    type="button"
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
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => onOpenDetails(item)}
                  >
                    ▶ Assistir
                  </button>

                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => onOpenDetails(item)}
                  >
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
}

function PlayerModal({
  item,
  onClose,
  favorites,
  onToggleFavorite,
  relatedItems,
  onOpenRelated,
}) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState(item.quality || "1080p");
  const [subtitle, setSubtitle] = useState("Português");
  const [audio, setAudio] = useState(item.audio || "Português");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);  useEffect(() => {
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

    video.play().catch(() => setIsPlaying(false));

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [item, volume, speed]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const seek = (value) => {
    const video = videoRef.current;
    if (!video) return;
    const nextValue = Number(value);
    video.currentTime = nextValue;
    setCurrentTime(nextValue);
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
    <div className="modal-wrap" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-topbar">
          <div>
            <div className="eyebrow">Drik Player</div>
            <h3>{item.title}</h3>
          </div>

          <button type="button" className="icon-btn" onClick={onClose}>
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
                  <span>{quality}</span>
                  <span>{item.type}</span>
                  <span>{item.classification}</span>
                </div>

                <div className="overlay-buttons">
                  <button type="button" className="round-white" onClick={togglePlay}>
                    {isPlaying ? "❚❚" : "▶"}
                  </button>
                  <button type="button" className="round-dark" onClick={() => skipBy(-10)}>
                    «10
                  </button>
                  <button type="button" className="round-dark" onClick={() => skipBy(10)}>
                    10»
                  </button>
                  <button
                    type="button"
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
                    <option>Ultra HD</option>
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
                </div>                <div className="control-item">
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
                    <button type="button" className="square-btn" onClick={openFullscreen}>
                      ⛶
                    </button>
                  </div>
                </div>
              </div>

              {(item.type === "Série" || item.type === "Anime") && (
                <div className="next-episode">
                  <strong>Próximo episódio disponível</strong>
                  <p>
                    Temporada {item.seasons || 1}, episódio{" "}
                    {Math.min(2, item.episodes || 2)} pronto para reprodução.
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
                <button
                  key={related.id}
                  type="button"
                  className="related-item"
                  onClick={() => onOpenRelated(related)}
                >
                  <img src={related.image} alt={related.title} />
                  <div>
                    <div className="related-title">{related.title}</div>
                    <div className="related-meta">
                      {related.genre} • {related.year}
                    </div>
                    <div className="related-desc">{related.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function DrikStreamingExperience() {
  const defaultFavorites = [films[0]?.id, series[1]?.id, animes[2]?.id].filter(Boolean);

  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(getSafeFavorites(defaultFavorites));
  const [selectedItem, setSelectedItem] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Início");
  const [scrolled, setScrolled] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [customCatalog, setCustomCatalog] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  const filmesRef = useRef(null);
  const seriesRef = useRef(null);
  const animesRef = useRef(null);
  const desenhosRef = useRef(null);
  const listaRef = useRef(null);

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
    seasons: "1",
    episodes: "8",
  });  useEffect(() => {
    setCustomCatalog(getSafeCustomCatalog());
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  const allCatalog = useMemo(() => {
    return [...customCatalog, ...films, ...series, ...animes, ...cartoons];
  }, [customCatalog]);

  const heroItems = useMemo(() => {
    const base = [films[0], series[4], animes[7], cartoons[5], films[2]].filter(Boolean);
    return customCatalog.length ? [customCatalog[0], ...base.slice(0, 4)] : base;
  }, [customCatalog]);

  useEffect(() => {
    if (!heroItems.length) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroItems]);

  useEffect(() => {
    if (heroIndex >= heroItems.length && heroItems.length > 0) {
      setHeroIndex(0);
    }
  }, [heroItems, heroIndex]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredCatalog = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allCatalog;

    return allCatalog.filter((item) =>
      [item.title, item.genre, item.type, item.description, item.fullDescription]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [search, allCatalog]);

  const saveCustomCatalog = (items) => {
    setCustomCatalog(items);
    localStorage.setItem(CUSTOM_MOVIES_KEY, JSON.stringify(items));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddMovie = () => {
    if (!newMovie.title.trim()) return alert("Digite o título do conteúdo.");
    if (!newMovie.description.trim()) return alert("Digite uma descrição curta.");
    if (!newMovie.fullDescription.trim()) return alert("Digite uma descrição completa.");

    const itemId = Date.now();

    const isSeriesType = newMovie.type === "Série" || newMovie.type === "Anime";

    const payload = {
      id: itemId,
      title: newMovie.title.trim(),
      type: newMovie.type,
      genre: newMovie.genre.trim(),
      year: Number(newMovie.year) || 2026,
      note: String(newMovie.note || "8.5"),
      duration: isSeriesType
        ? `${newMovie.seasons || 1} temporada${Number(newMovie.seasons || 1) > 1 ? "s" : ""} • ${newMovie.episodes || 8} episódios`
        : newMovie.duration || "100 min",
      badge: newMovie.badge || "Novo",
      image: newMovie.image || posterPool[0],
      banner: newMovie.banner || heroPool[0],
      video: newMovie.video || trailerPool[0],
      progress: 0,
      description: newMovie.description.trim(),
      fullDescription: newMovie.fullDescription.trim(),
      classification: newMovie.classification,
      quality: newMovie.quality,
      audio: newMovie.audio,
      seasons: isSeriesType ? Number(newMovie.seasons || 1) : null,
      episodes: isSeriesType ? Number(newMovie.episodes || 8) : null,
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
      seasons: "1",
      episodes: "8",
    });

    alert("Conteúdo adicionado com sucesso.");
  };  const handleRemoveMovie = (id) => {
    const updated = customCatalog.filter((item) => item.id !== id);
    saveCustomCatalog(updated);
  };

  const scrollToSection = (tab) => {
    setActiveTab(tab);

    const refs = {
      Filmes: filmesRef,
      Séries: seriesRef,
      Animes: animesRef,
      Desenhos: desenhosRef,
      "Minha Lista": listaRef,
    };

    if (tab === "Início") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetRef = refs[tab];
    if (targetRef?.current) {
      setTimeout(() => {
        targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  const loginGoogle = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setLoggedUser(user);
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
      } else if (code.includes("network-request-failed")) {
        alert("Falha de rede. Verifique sua internet e tente novamente.");
      } else {
        alert("Erro ao entrar com Google. Verifique Firebase, domínio autorizado e popup.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const logoutGoogle = async () => {
    try {
      await signOut(auth);
      setLoggedUser(null);
    } catch {
      alert("Não foi possível sair da conta agora.");
    }
  };

  const favoritesItems = allCatalog.filter((item) => favorites.includes(item.id));
  const continueWatching = allCatalog
    .filter((item) => item.progress >= 20 && item.progress <= 85)
    .slice(0, 6);

  const recommended = allCatalog.filter((item) => Number(item.note) >= 8.2).slice(0, 16);
  const popular = allCatalog
    .filter((item) => ["Popular", "Top 10", "Clássico"].includes(item.badge))
    .slice(0, 16);

  const launches = allCatalog
    .filter((item) => item.year >= 2020 || item.isCustom)
    .slice(0, 16);

  const trending = allCatalog
    .filter((item) => ["Em Alta", "Top 10", "Novo", "Clássico"].includes(item.badge))
    .slice(0, 16);

  const actionFilms = allCatalog
    .filter((item) => item.type === "Filme" && ["Aventura", "Ação"].includes(item.genre))
    .slice(0, 16);

  const horrorFilms = allCatalog
    .filter((item) => item.type === "Filme" && item.genre === "Terror")
    .slice(0, 16);

  const comedyFilms = allCatalog
    .filter((item) => item.type === "Filme" && item.genre === "Comédia")
    .slice(0, 16);

  const seriesRow = allCatalog.filter((item) => item.type === "Série").slice(0, 16);
  const animeRow = allCatalog.filter((item) => item.type === "Anime").slice(0, 16);
  const cartoonRow = allCatalog.filter((item) => item.type === "Desenho").slice(0, 16);

  const liveSearchResults = search ? filteredCatalog.slice(0, 12) : [];
  const menu = ["Início", "Filmes", "Séries", "Animes", "Desenhos", "Minha Lista"];
  const activeHero = heroItems[heroIndex] || films[0];

  const relatedItems = selectedItem
    ? allCatalog
        .filter(
          (item) =>
            item.id !== selectedItem.id &&
            (item.genre === selectedItem.genre || item.type === selectedItem.type)
        )
        .slice(0, 4)
    : [];  return (
    <div className="app-bg globoplay-theme">
      <header className={scrolled ? "header scrolled globoplay-header" : "header top globoplay-header"}>
        <div className="header-inner">
          <div className="header-left">
            <div className="brand">
              Dri<span>k</span>
            </div>

            <nav className="nav">
              {menu.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={activeTab === item ? "active" : ""}
                  onClick={() => scrollToSection(item)}
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

            {!loggedUser ? (
              <button type="button" className="header-btn" onClick={loginGoogle} disabled={googleLoading}>
                {googleLoading ? "Entrando..." : "Entrar com Google"}
              </button>
            ) : (
              <button type="button" className="header-btn secondary" onClick={logoutGoogle}>
                Sair
              </button>
            )}

            <button type="button" className="avatar">
              {loggedUser?.photoURL ? (
                <img src={loggedUser.photoURL} alt="Usuário" />
              ) : (
                <span>{loggedUser?.displayName?.[0] || "👤"}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <section className="hero globoplay-hero">
        <div className="hero-bg">
          <img src={activeHero.banner} alt={activeHero.title} />
          <div className="hero-shade" />
          <div className="hero-bottom" />
        </div>

        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">Catálogo Drik</div>
            <h1>Streaming com visual sofisticado, busca rápida, player moderno e catálogo dinâmico.</h1>
            <p>
              Estrutura reforçada, login persistente, hero rotativo corrigido, favoritos salvos, painel admin melhorado
              e experiência mais próxima de uma plataforma real de filmes e séries.
            </p>

            <div className="tag-row">
              <span>{activeHero.type}</span>
              <span>{activeHero.genre}</span>
              <span>{activeHero.year}</span>
              <span>Nota {activeHero.note}</span>
            </div>

            <div className="hero-actions">
              <button type="button" className="big-white" onClick={() => setSelectedItem(activeHero)}>
                ▶ Assistir Agora
              </button>
              <button type="button" className="big-glass" onClick={() => setSelectedItem(activeHero)}>
                i Mais Informações
              </button>
            </div>

            <div className="hero-dots">
              {heroItems.map((hero, index) => (
                <button
                  key={hero.id}
                  type="button"
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
      </section>

      <main className="container">
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
              <h2>Busca do catálogo</h2>
              <p>Pesquise filmes, séries, animes e desenhos em tempo real.</p>
            </div>

            <div className="search-wide">
              <span className="search-icon">⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ex: terror, anime, clássico, série..."
              />
            </div>
          </div>

          {search ? (
            <div className="search-results">
              {liveSearchResults.map((item, index) => (
                <button key={item.id} type="button" className="search-result" onClick={() => setSelectedItem(item)}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <div className="result-tag" style={{ background: gradients[index % gradients.length] }}>
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
            <div className="search-empty">Digite algo na busca para encontrar conteúdos do catálogo.</div>
          )}
        </section>

        <section className="admin-panel">
          <div className="admin-head">
            <div>
              <h2>Painel para adicionar conteúdos</h2>
              <p>Cadastre filmes, séries, animes e desenhos sem quebrar o site.</p>
            </div>
          </div>

          <div className="admin-grid">
            <div className="admin-field">
              <label>Título</label>
              <input value={newMovie.title} onChange={(e) => setNewMovie((prev) => ({ ...prev, title: e.target.value }))} />
            </div>

            <div className="admin-field">
              <label>Tipo</label>
              <select value={newMovie.type} onChange={(e) => setNewMovie((prev) => ({ ...prev, type: e.target.value }))}>
                <option>Filme</option>
                <option>Série</option>
                <option>Anime</option>
                <option>Desenho</option>
              </select>
            </div>

            <div className="admin-field">
              <label>Gênero</label>
              <input value={newMovie.genre} onChange={(e) => setNewMovie((prev) => ({ ...prev, genre: e.target.value }))} />
            </div>

            <div className="admin-field">
              <label>Ano</label>
              <input value={newMovie.year} onChange={(e) => setNewMovie((prev) => ({ ...prev, year: e.target.value }))} />
            </div>

            <div className="admin-field">
              <label>Nota</label>
              <input value={newMovie.note} onChange={(e) => setNewMovie((prev) => ({ ...prev, note: e.target.value }))} />
            </div>

            <div className="admin-field">
              <label>Duração</label>
              <input value={newMovie.duration} onChange={(e) => setNewMovie((prev) => ({ ...prev, duration: e.target.value }))} />
            </div>

            <div className="admin-field">
              <label>Selo</label>
              <select value={newMovie.badge} onChange={(e) => setNewMovie((prev) => ({ ...prev, badge: e.target.value }))}>
                <option>Novo</option>
                <option>Top 10</option>
                <option>Popular</option>
                <option>Clássico</option>
                <option>Em Alta</option>
              </select>
            </div>

            <div className="admin-field">
              <label>Classificação</label>
              <select value={newMovie.classification} onChange={(e) => setNewMovie((prev) => ({ ...prev, classification: e.target.value }))}>
                <option>10+</option>
                <option>12+</option>
                <option>14+</option>
                <option>16+</option>
                <option>18+</option>
              </select>
            </div>

            <div className="admin-field">
              <label>Qualidade</label>
              <select value={newMovie.quality} onChange={(e) => setNewMovie((prev) => ({ ...prev, quality: e.target.value }))}>
                <option>4K</option>
                <option>1080p</option>
                <option>720p</option>
                <option>Ultra HD</option>
              </select>
            </div>

            <div className="admin-field">
              <label>Áudio</label>
              <select value={newMovie.audio} onChange={(e) => setNewMovie((prev) => ({ ...prev, audio: e.target.value }))}>
                <option>Português</option>
                <option>Inglês</option>
                <option>Japonês</option>
              </select>
            </div>

            {(newMovie.type === "Série" || newMovie.type === "Anime") && (
              <>
                <div className="admin-field">
                  <label>Temporadas</label>
                  <input value={newMovie.seasons} onChange={(e) => setNewMovie((prev) => ({ ...prev, seasons: e.target.value }))} />
                </div>

                <div className="admin-field">
                  <label>Episódios</label>
                  <input value={newMovie.episodes} onChange={(e) => setNewMovie((prev) => ({ ...prev, episodes: e.target.value }))} />
                </div>
              </>
            )}

            <div className="admin-field wide">
              <label>Imagem do card</label>
              <input value={newMovie.image} onChange={(e) => setNewMovie((prev) => ({ ...prev, image: e.target.value }))} />
            </div>

            <div className="admin-field wide">
              <label>Imagem do banner</label>
              <input value={newMovie.banner} onChange={(e) => setNewMovie((prev) => ({ ...prev, banner: e.target.value }))} />
            </div>

            <div className="admin-field wide">
              <label>Vídeo</label>
              <input value={newMovie.video} onChange={(e) => setNewMovie((prev) => ({ ...prev, video: e.target.value }))} />
            </div>

            <div className="admin-field wide">
              <label>Descrição curta</label>
              <textarea value={newMovie.description} onChange={(e) => setNewMovie((prev) => ({ ...prev, description: e.target.value }))} />
            </div>

            <div className="admin-field wide">
              <label>Descrição completa</label>
              <textarea value={newMovie.fullDescription} onChange={(e) => setNewMovie((prev) => ({ ...prev, fullDescription: e.target.value }))} />
            </div>
          </div>

          <div className="admin-actions">
            <button type="button" className="big-white" onClick={handleAddMovie}>
              + Adicionar conteúdo
            </button>
          </div>

          {customCatalog.length > 0 && (
            <div className="custom-list">
              {customCatalog.map((item) => (
                <div key={item.id} className="custom-item">
                  <img src={item.image} alt={item.title} />
                  <div className="custom-item-body">
                    <div className="custom-item-title">{item.title}</div>
                    <div className="custom-item-meta">
                      {item.type} • {item.genre} • {item.year}
                    </div>
                    <div className="custom-item-actions">
                      <button type="button" className="danger-btn" onClick={() => handleRemoveMovie(item.id)}>
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
        <RowSection title="Lançamentos e Destaques" items={launches} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Populares" items={popular} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Recomendados para Você" items={recommended} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />

        <section className="section-block">
          <div className="section-head">
            <div>
              <h2>Continue Assistindo</h2>
              <p>Retome de onde parou com progresso visual.</p>
            </div>
          </div>

          <div className="continue-grid">
            {continueWatching.map((item, index) => (
              <button key={item.id} type="button" className="continue-card" onClick={() => setSelectedItem(item)}>
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

        <RowSection sectionRef={filmesRef} title="Filmes" items={films} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Aventura" items={actionFilms} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Terror" items={horrorFilms} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Comédia" items={comedyFilms} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection sectionRef={seriesRef} title="Séries" items={seriesRow} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection sectionRef={animesRef} title="Animes" items={animeRow} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection sectionRef={desenhosRef} title="Desenhos" items={cartoonRow} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection
          sectionRef={listaRef}
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
            <p>Plataforma demonstrativa com player moderno, favoritos, busca, login Google e painel dinâmico.</p>
          </div>

          <div>
            <h4>Seções</h4>
            {menu.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>

          <div>
            <h4>Melhorias</h4>
            <div>Login do Google com persistência</div>
            <div>Hero rotativo corrigido</div>
            <div>Painel de cadastro mais completo</div>
            <div>Relacionados clicáveis no player</div>
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
          onOpenRelated={setSelectedItem}
        />
      )}
    </div>
  );
}