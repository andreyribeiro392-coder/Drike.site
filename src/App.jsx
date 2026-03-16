import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";

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

const CUSTOM_MOVIES_KEY = "drik_custom_movies_v2";
const FAVORITES_KEY = "drik_favorites_v2";

const publicDomainMovies = [
  {
    id: 1,
    title: "Night of the Living Dead",
    type: "Filme",
    genre: "Terror",
    year: 1968,
    note: "8.6",
    duration: "96 min",
    badge: "Clássico",
    image: posterPool[0],
    banner: heroPool[0],
    video: trailerPool[7],
    progress: 41,
    description: "Clássico cult de horror com clima sombrio, tensão crescente e estética retrô.",
    fullDescription:
      "Um dos filmes de terror mais influentes de todos os tempos, com atmosfera intensa, sobrevivência em grupo e um visual clássico que combina muito com a área de filmes antigos do catálogo.",
    classification: "16+",
    quality: "1080p",
    audio: "Inglês",
    seasons: null,
    episodes: null,
    isCustom: false,
  },
  {
    id: 2,
    title: "Nosferatu",
    type: "Filme",
    genre: "Terror",
    year: 1922,
    note: "8.4",
    duration: "94 min",
    badge: "Clássico",
    image: posterPool[1],
    banner: heroPool[1],
    video: trailerPool[0],
    progress: 23,
    description: "Terror expressionista com fotografia marcante, sombra, suspense e visual histórico.",
    fullDescription:
      "Uma obra fundamental do cinema silencioso. Ideal para a seção de filmes antigos, trazendo elegância visual, clima gótico e presença forte no catálogo.",
    classification: "12+",
    quality: "1080p",
    audio: "Inglês",
    seasons: null,
    episodes: null,
    isCustom: false,
  },
  {
    id: 3,
    title: "Metropolis",
    type: "Filme",
    genre: "Ficção Científica",
    year: 1927,
    note: "8.7",
    duration: "148 min",
    badge: "Top 10",
    image: posterPool[2],
    banner: heroPool[2],
    video: trailerPool[1],
    progress: 58,
    description: "Ficção científica clássica com arquitetura futurista, drama social e identidade visual forte.",
    fullDescription:
      "Filme monumental do cinema mudo, perfeito para destacar um catálogo premium com obras antigas de aparência grandiosa e impacto visual.",
    classification: "12+",
    quality: "1080p",
    audio: "Inglês",
    seasons: null,
    episodes: null,
    isCustom: false,
  },
  {
    id: 4,
    title: "The General",
    type: "Filme",
    genre: "Aventura",
    year: 1926,
    note: "8.3",
    duration: "75 min",
    badge: "Popular",
    image: posterPool[3],
    banner: heroPool[3],
    video: trailerPool[2],
    progress: 36,
    description: "Aventura clássica com humor físico, perseguição e ritmo leve do cinema antigo.",
    fullDescription:
      "Uma produção lendária da era muda, ótima para dar variedade ao catálogo com ação, humor visual e carisma clássico.",
    classification: "10+",
    quality: "1080p",
    audio: "Inglês",
    seasons: null,
    episodes: null,
    isCustom: false,
  },
  {
    id: 5,
    title: "Sherlock Jr.",
    type: "Filme",
    genre: "Comédia",
    year: 1924,
    note: "8.2",
    duration: "45 min",
    badge: "Em Alta",
    image: posterPool[4],
    banner: heroPool[4],
    video: trailerPool[3],
    progress: 29,
    description: "Comédia clássica ágil e inventiva com cenas criativas e charme do cinema mudo.",
    fullDescription:
      "Um filme curto, elegante e muito importante historicamente, ideal para representar filmes antigos sem depender de obras modernas.",
    classification: "10+",
    quality: "1080p",
    audio: "Inglês",
    seasons: null,
    episodes: null,
    isCustom: false,
  },
  {
    id: 6,
    title: "The Cabinet of Dr. Caligari",
    type: "Filme",
    genre: "Suspense",
    year: 1920,
    note: "8.1",
    duration: "67 min",
    badge: "Clássico",
    image: posterPool[5],
    banner: heroPool[5],
    video: trailerPool[4],
    progress: 18,
    description: "Suspense expressionista com cenários marcantes e atmosfera perturbadora.",
    fullDescription:
      "Uma referência do expressionismo alemão, excelente para enriquecer a vitrine de filmes antigos com algo visualmente único.",
    classification: "12+",
    quality: "1080p",
    audio: "Inglês",
    seasons: null,
    episodes: null,
    isCustom: false,
  },
  {
    id: 7,
    title: "His Girl Friday",
    type: "Filme",
    genre: "Comédia",
    year: 1940,
    note: "8.0",
    duration: "92 min",
    badge: "Novo",
    image: posterPool[6],
    banner: heroPool[0],
    video: trailerPool[5],
    progress: 52,
    description: "Comédia clássica rápida, elegante e cheia de diálogos marcantes.",
    fullDescription:
      "Ótima opção para equilibrar terror e ficção com uma obra antiga mais leve, sofisticada e com grande energia narrativa.",
    classification: "10+",
    quality: "1080p",
    audio: "Inglês",
    seasons: null,
    episodes: null,
    isCustom: false,
  },
  {
    id: 8,
    title: "The Last Man on Earth",
    type: "Filme",
    genre: "Ficção Científica",
    year: 1964,
    note: "7.9",
    duration: "86 min",
    badge: "Popular",
    image: posterPool[7],
    banner: heroPool[1],
    video: trailerPool[6],
    progress: 63,
    description: "Sci-fi clássico pós-apocalíptico com clima solitário e atmosfera escura.",
    fullDescription:
      "Uma escolha muito boa para dar tom sombrio e futurista ao catálogo, combinando ficção científica antiga e suspense.",
    classification: "14+",
    quality: "1080p",
    audio: "Inglês",
    seasons: null,
    episodes: null,
    isCustom: false,
  },
];function generateItems(type, count, startId) {
  return Array.from({ length: count }, (_, index) => {
    const bank = wordBank[type];
    const first = bank[index % bank.length];
    const second = bank[(index + 3) % bank.length];
    const genre = genreMap[type][index % genreMap[type].length];
    const year = 2014 + (index % 12);
    const note = (7.4 + ((index * 5) % 20) / 10).toFixed(1);

    return {
      id: startId + index,
      title: `${first} ${second}`,
      type,
      genre,
      year,
      note,
      duration: `${1 + (index % 5)} temporada${index % 5 === 0 ? "" : "s"} • ${8 + (index % 12)} episódios`,
      badge:
        index % 8 === 0
          ? "Top 10"
          : index % 6 === 0
          ? "Novo"
          : index % 4 === 0
          ? "Popular"
          : "",
      image: posterPool[index % posterPool.length],
      banner: heroPool[index % heroPool.length],
      video: trailerPool[index % trailerPool.length],
      progress: (index * 11) % 100,
      description: `${type} com visual moderno, card premium e clima forte para o catálogo Drik.`,
      fullDescription: `${first} ${second} é um ${type.toLowerCase()} criado para preencher o catálogo com visual elegante, navegação forte e identidade original.`,
      classification: ["10+", "12+", "14+", "16+"][index % 4],
      quality: ["4K", "1080p", "Ultra HD"][index % 3],
      audio: ["Português", "Inglês", "Japonês"][index % 3],
      seasons: 1 + (index % 5),
      episodes: 8 + (index % 12),
      isCustom: false,
    };
  });
}

const films = publicDomainMovies;
const series = generateItems("Série", 40, 1001);
const animes = generateItems("Anime", 40, 2001);
const cartoons = generateItems("Desenho", 30, 3001);

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

function getSafeFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (!saved) return [films[0]?.id, series[1]?.id, animes[2]?.id].filter(Boolean);
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed)
      ? parsed
      : [films[0]?.id, series[1]?.id, animes[2]?.id].filter(Boolean);
  } catch {
    return [films[0]?.id, series[1]?.id, animes[2]?.id].filter(Boolean);
  }
}

function RowSection({ title, items, favorites, onToggleFavorite, onOpenDetails, sectionRef }) {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: direction * 820, behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <section ref={sectionRef} className="section-block">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          <p>Seleções com layout inspirado em streaming premium e navegação horizontal.</p>
        </div>

        <div className="row-arrows">
          <button type="button" onClick={() => scrollRow(-1)}>‹</button>
          <button type="button" onClick={() => scrollRow(1)}>›</button>
        </div>
      </div>

      <div ref={rowRef} className="row-scroll">
        {items.map((item, index) => {
          const isFav = favorites.includes(item.id);

          return (
            <article key={item.id} className="media-card globo-card">
              <div className="media-poster">
                <img src={item.image} alt={item.title} />
                <div className="media-overlay" />

                <div className="media-top">
                  {item.badge ? (
                    <span className="badge" style={{ background: gradients[index % gradients.length] }}>
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
                  <button type="button" className="primary-btn" onClick={() => onOpenDetails(item)}>
                    ▶ Assistir
                  </button>

                  <button type="button" className="secondary-btn" onClick={() => onOpenDetails(item)}>
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

function PlayerModal({ item, onClose, favorites, onToggleFavorite, relatedItems }) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState(item.quality || "1080p");
  const [subtitle, setSubtitle] = useState("Português");
  const [audio, setAudio] = useState(item.audio || "Português");  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

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
    if (video.paused) video.play().catch(() => {});
    else video.pause();
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

          <button type="button" className="icon-btn" onClick={onClose}>✕</button>
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
                  <button type="button" className="round-white" onClick={togglePlay}>▶</button>
                  <button type="button" className="round-dark" onClick={() => skipBy(-10)}>«10</button>
                  <button type="button" className="round-dark" onClick={() => skipBy(10)}>10»</button>
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
                    <button type="button" className="square-btn" onClick={openFullscreen}>⛶</button>
                  </div>
                </div>
              </div>

              {(item.type === "Série" || item.type === "Anime") && (
                <div className="next-episode">
                  <strong>Próximo episódio disponível</strong>
                  <p>
                    Temporada {item.seasons}, episódio {Math.min(2, item.episodes || 2)} pronto para reprodução.
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
                  <div><small>Categoria</small><span>{item.type}</span></div>
                  <div><small>Duração</small><span>{item.duration}</span></div>
                  <div><small>Classificação</small><span>{item.classification}</span></div>
                  <div><small>Áudio</small><span>{audio}</span></div>
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
                    <div className="related-meta">{related.genre} • {related.year}</div>
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
}

export default function DrikStreamingExperience() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(getSafeFavorites);
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
  const listaRef = useRef(null);  const [newMovie, setNewMovie] = useState({
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
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

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
    const base = [films[0], series[4], animes[7], cartoons[5], films[2]].filter(Boolean);
    return customCatalog.length ? [customCatalog[0], ...base.slice(0, 4)] : base;
  }, [customCatalog]);

  const filteredCatalog = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allCatalog;

    return allCatalog.filter((item) =>
      [item.title, item.genre, item.type, item.description]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [search, allCatalog]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const saveCustomCatalog = (items) => {
    setCustomCatalog(items);
    localStorage.setItem(CUSTOM_MOVIES_KEY, JSON.stringify(items));
  };

  const handleAddMovie = () => {
    if (!newMovie.title.trim()) return alert("Digite o título do conteúdo.");
    if (!newMovie.description.trim()) return alert("Digite uma descrição curta.");
    if (!newMovie.fullDescription.trim()) return alert("Digite uma descrição completa.");

    const itemId = Date.now();

    const payload = {
      id: itemId,
      title: newMovie.title.trim(),
      type: newMovie.type,
      genre: newMovie.genre.trim(),
      year: Number(newMovie.year) || 2026,
      note: String(newMovie.note || "8.5"),
      duration:
        newMovie.type === "Filme" || newMovie.type === "Desenho"
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
      seasons: newMovie.type === "Filme" || newMovie.type === "Desenho" ? null : Number(newMovie.seasons || 1),
      episodes: newMovie.type === "Filme" || newMovie.type === "Desenho" ? null : Number(newMovie.episodes || 8),
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

  const favoritesItems = allCatalog.filter((item) => favorites.includes(item.id));
  const continueWatching = allCatalog.filter((item) => item.progress >= 20 && item.progress <= 85).slice(0, 6);
  const recommended = allCatalog.filter((item) => Number(item.note) >= 8.2).slice(0, 16);
  const popular = allCatalog.filter((item) => item.badge === "Popular" || item.badge === "Top 10" || item.badge === "Clássico").slice(0, 16);
  const launches = allCatalog.filter((item) => item.year >= 2020 || item.type === "Filme").slice(0, 16);
  const trending = allCatalog.filter((item) => ["Em Alta", "Top 10", "Novo", "Clássico"].includes(item.badge)).slice(0, 16);

  const actionFilms = allCatalog.filter((item) => item.type === "Filme" && item.genre === "Aventura").slice(0, 16);
  const horrorFilms = allCatalog.filter((item) => item.type === "Filme" && item.genre === "Terror").slice(0, 16);
  const comedyFilms = allCatalog.filter((item) => item.type === "Filme" && item.genre === "Comédia").slice(0, 16);
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
    : [];

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
      } else {
        alert("Erro ao entrar com Google. Verifique o Firebase, domínio autorizado e popup.");
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
  };  return (
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
              {loggedUser?.photoURL ? <img src={loggedUser.photoURL} alt="Usuário" /> : <span>{loggedUser?.displayName?.[0] || "👤"}</span>}
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
            <h1>Interface mais próxima de streaming premium com foco em filmes clássicos, séries e animes.</h1>
            <p>
              Agora os botões do menu realmente levam para a seção certa, os filmes foram trocados por clássicos antigos
              e a home ficou com uma pegada mais limpa e forte.
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
                <button key={hero.id} type="button" className={heroIndex === index ? "active" : ""} onClick={() => setHeroIndex(index)} />
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
            { label: "Filmes antigos", value: allCatalog.filter((item) => item.type === "Filme").length },
            { label: "Séries + Animes", value: allCatalog.filter((item) => item.type === "Série" || item.type === "Anime").length },
            { label: "Desenhos", value: allCatalog.filter((item) => item.type === "Desenho").length },
          ].map((stat, index) => (
            <div key={stat.label} className="stat">
              <div className="label" style={{ background: gradients[index % gradients.length] }}>{stat.label}</div>
              <div className="value">{stat.value}</div>
            </div>
          ))}
        </section>

        <section className="search-panel">
          <div className="search-panel-head">
            <div>
              <h2>Busca do catálogo</h2>
              <p>Pesquise filmes antigos, séries, animes e desenhos em tempo real.</p>
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
                    <div className="result-tag" style={{ background: gradients[index % gradients.length] }}>{item.type}</div>
                    <div className="title">{item.title}</div>
                    <div className="meta">{item.genre} • {item.year} • Nota {item.note}</div>
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
              <p>Você pode cadastrar filmes, séries, animes e desenhos sem quebrar o site.</p>
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
                    <div className="custom-item-meta">{item.type} • {item.genre} • {item.year}</div>
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
                      <span style={{ background: gradients[index % gradients.length] }}>{item.progress}%</span>
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

        <RowSection sectionRef={filmesRef} title="Filmes Antigos" items={films} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Aventura Clássica" items={actionFilms} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Terror Clássico" items={horrorFilms} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection title="Comédia Clássica" items={comedyFilms} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection sectionRef={seriesRef} title="Séries" items={seriesRow} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection sectionRef={animesRef} title="Animes" items={animeRow} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection sectionRef={desenhosRef} title="Desenhos" items={cartoonRow} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
        <RowSection sectionRef={listaRef} title="Minha Lista" items={favoritesItems.length ? favoritesItems : allCatalog.slice(0, 8)} favorites={favorites} onToggleFavorite={toggleFavorite} onOpenDetails={setSelectedItem} />
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="brand">Dri<span>k</span></div>
            <p>Plataforma demonstrativa com filmes antigos, séries, animes, player moderno e navegação melhorada.</p>
          </div>

          <div>
            <h4>Seções</h4>
            {menu.map((item) => <div key={item}>{item}</div>)}
          </div>

          <div>
            <h4>Resumo</h4>
            <div>Menu agora rola para a seção correta</div>
            <div>Filmes trocados por clássicos antigos</div>
            <div>Busca, favoritos, player e painel continuam funcionando</div>
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
