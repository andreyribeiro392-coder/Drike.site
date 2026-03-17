import React, { useEffect, useMemo, useRef, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "./firebase";

const STORAGE_KEYS = {
  MOVIES: "drik_movies_v2",
  FAVORITES: "drik_favorites_v2",
  HISTORY: "drik_history_v2",
  CONTINUE: "drik_continue_v2",
  PROFILE: "drik_profile_v2",
};
const ADMIN_EMAIL = "andreyribeiro392@gmail.com";
const defaultMovies = [
  {
    id: 1,
    title: "Ação Suprema",
    type: "Filme",
    category: "Ação",
    year: 2024,
    duration: "2h 08min",
    rating: "16+",
    cast: "Lucas Vieira, Ana Costa, Rafael Alves",
    description:
      "Um ex-agente retorna à ativa para impedir uma organização criminosa de derrubar a cidade em uma única noite.",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoUrl: "",
    featured: true,
    popularity: 98,
    releaseTag: "Novo",
  },
  {
    id: 2,
    title: "Noite Sombria",
    type: "Filme",
    category: "Terror",
    year: 2023,
    duration: "1h 52min",
    rating: "18+",
    cast: "Marina Luz, Felipe Rocha, Clara Mota",
    description:
      "Uma família se muda para uma casa isolada e logo percebe que há algo observando cada passo deles.",
    cover:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoUrl: "",
    featured: false,
    popularity: 91,
    releaseTag: "Em alta",
  },
  {
    id: 3,
    title: "Velocidade Fatal",
    type: "Filme",
    category: "Carros",
    year: 2025,
    duration: "2h 01min",
    rating: "14+",
    cast: "Diego Ferraz, Bruno Melo, Camila Torres",
    description:
      "Pilotos de rua entram em uma disputa mortal onde velocidade e lealdade valem mais do que qualquer prêmio.",
    cover:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoUrl: "",
    featured: true,
    popularity: 95,
    releaseTag: "Popular",
  },
  {
    id: 4,
    title: "Romance no Inverno",
    type: "Filme",
    category: "Romance",
    year: 2022,
    duration: "1h 44min",
    rating: "12+",
    cast: "Laura Menezes, Pedro Lima, Sofia Nunes",
    description:
      "Duas vidas completamente diferentes se cruzam durante uma temporada gelada que muda tudo para sempre.",
    cover:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoUrl: "",
    featured: false,
    popularity: 82,
    releaseTag: "Clássico",
  },
  {
    id: 5,
    title: "Crônicas de Neon",
    type: "Série",
    category: "Ficção",
    year: 2026,
    duration: "10 episódios",
    rating: "16+",
    cast: "Renan Silva, Giulia Prado, Vitor Ramos",
    description:
      "Em um futuro dividido entre tecnologia e caos, um grupo de jovens descobre um segredo capaz de mudar a cidade.",
    cover:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1600&q=80",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoUrl: "",
    featured: true,
    popularity: 99,
    releaseTag: "Novo",
  },
  {
    id: 6,
    title: "Lâmina Celestial",
    type: "Anime",
    category: "Anime",
    year: 2025,
    duration: "24 episódios",
    rating: "14+",
    cast: "Elenco original",
    description:
      "Um jovem guerreiro desperta um poder antigo e precisa enfrentar monstros, reis e o próprio destino.",
    cover:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1600&q=80",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoUrl: "",
    featured: true,
    popularity: 97,
    releaseTag: "Em alta",
  },
  {
    id: 7,
    title: "Riso Total",
    type: "Filme",
    category: "Comédia",
    year: 2021,
    duration: "1h 39min",
    rating: "10+",
    cast: "João Matos, Livia Reis, Enzo Duarte",
    description:
      "Uma sequência de desastres hilários transforma a semana de três amigos em um caos impossível de esquecer.",
    cover:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoUrl: "",
    featured: false,
    popularity: 75,
    releaseTag: "Leve",
  },
  {
    id: 8,
    title: "Distrito Zero",
    type: "Série",
    category: "Suspense",
    year: 2024,
    duration: "8 episódios",
    rating: "16+",
    cast: "Nina Teles, Marcos Leal, Igor Pinto",
    description:
      "Depois de um apagão nacional, um grupo tenta sobreviver enquanto segredos perigosos surgem dentro do próprio abrigo.",
    cover:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoUrl: "",
    featured: false,
    popularity: 93,
    releaseTag: "Popular",
  },
];

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function slugify(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getRelatedMovies(movie, movies) {
  if (!movie) return [];
  return movies
    .filter((item) => item.id !== movie.id && item.category === movie.category)
    .slice(0, 6);
}

function getCategories(movies) {
  const base = ["Todos"];
  const dynamic = [...new Set(movies.map((m) => m.category).filter(Boolean))];
  return [...base, ...dynamic];
}function StarRating({ value = 4.5 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="stars">
      {stars.map((star) => (
        <span key={star} className={value >= star ? "star filled" : "star"}>
          ★
        </span>
      ))}
      <small>{value.toFixed(1)}</small>
    </div>
  );
}

function MovieCard({
  movie,
  onOpenDetails,
  onPlay,
  onToggleFavorite,
  isFavorite,
  onQuickTrailer,
}) {
  return (
    <article className="movie-card">
      <div
        className="movie-cover"
        style={{ backgroundImage: `url(${movie.cover})` }}
        onClick={() => onOpenDetails(movie)}
      >
        <div className="movie-overlay">
          <span className="movie-badge">{movie.releaseTag || movie.type}</span>

          <div className="movie-hover-actions">
            <button onClick={(e) => { e.stopPropagation(); onPlay(movie); }}>
              ▶ Assistir
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie.id);
              }}
            >
              {isFavorite ? "♥ Favorito" : "+ Minha Lista"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickTrailer(movie);
              }}
            >
              Trailer
            </button>
          </div>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>
          {movie.category} • {movie.year} • {movie.rating}
        </p>
      </div>
    </article>
  );
}

function Shelf({
  title,
  items,
  favorites,
  onOpenDetails,
  onPlay,
  onToggleFavorite,
  onQuickTrailer,
}) {
  if (!items.length) return null;

  return (
    <section className="shelf">
      <div className="section-head">
        <h2>{title}</h2>
        <span>{items.length} títulos</span>
      </div>

      <div className="movie-grid">
        {items.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onOpenDetails={onOpenDetails}
            onPlay={onPlay}
            onToggleFavorite={onToggleFavorite}
            onQuickTrailer={onQuickTrailer}
            isFavorite={favorites.includes(movie.id)}
          />
        ))}
      </div>
    </section>
  );
}

function PlayerModal({ movie, open, onClose, onSaveProgress }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open || !movie || !movie.videoUrl) return;
    const saved = readStorage(STORAGE_KEYS.CONTINUE, {});
    const current = saved[movie.id];
    if (videoRef.current && current?.progress) {
      videoRef.current.currentTime = current.progress;
    }
  }, [open, movie]);

  if (!open || !movie) return null;

  const hasDirectVideo = movie.videoUrl && !movie.videoUrl.includes("youtube");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="player-modal" onClick={(e) => e.stopPropagation()}>
        <div className="player-top">
          <div>
            <h2>{movie.title}</h2>
            <p>
              {movie.category} • {movie.year} • {movie.duration} • {movie.rating}
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="player-area">
          {hasDirectVideo ? (
            <video
              ref={videoRef}
              className="video-player"
              src={movie.videoUrl}
              controls
              autoPlay
              onTimeUpdate={(e) => {
                onSaveProgress(movie.id, e.currentTarget.currentTime);
              }}
            />
          ) : movie.trailer ? (
            <iframe
              className="video-frame"
              src={movie.trailer}
              title={movie.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <div className="empty-player">
              <h3>Nenhum vídeo configurado</h3>
              <p>Adicione um trailer ou link de vídeo no painel administrativo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailsModal({
  movie,
  open,
  onClose,
  onPlay,
  onToggleFavorite,
  isFavorite,
  related,
}) {
  if (!open || !movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="details-modal" onClick={(e) => e.stopPropagation()}>
        <div
          className="details-banner"
          style={{ backgroundImage: `url(${movie.banner || movie.cover})` }}
        >
          <div className="details-shade">
            <button className="close-btn details-close" onClick={onClose}>
              ✕
            </button>

            <div className="details-content">
              <span className="hero-tag">{movie.type}</span>
              <h1>{movie.title}</h1>
              <p className="details-meta">
                {movie.category} • {movie.year} • {movie.duration} • {movie.rating}
              </p>
              <p className="details-description">{movie.description}</p>

              <div className="hero-buttons">
                <button className="primary-btn" onClick={() => onPlay(movie)}>
                  ▶ Assistir agora
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => onToggleFavorite(movie.id)}
                >
                  {isFavorite ? "♥ Remover da lista" : "+ Minha Lista"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="details-body">
          <div className="details-columns">
            <div>
              <h3>Sinopse</h3>
              <p>{movie.description}</p>
            </div>

            <div>
              <h3>Informações</h3>
              <ul className="details-list">
                <li><strong>Tipo:</strong> {movie.type}</li>
                <li><strong>Gênero:</strong> {movie.category}</li>
                <li><strong>Ano:</strong> {movie.year}</li>
                <li><strong>Duração:</strong> {movie.duration}</li>
                <li><strong>Classificação:</strong> {movie.rating}</li>
                <li><strong>Elenco:</strong> {movie.cast}</li>
              </ul>
            </div>

            <div>
              <h3>Avaliação</h3>
              <StarRating value={4.6} />
              <p className="mini-note">Baseado em curtidas e engajamento da plataforma.</p>
            </div>
          </div>

          {!!related.length && (
            <div className="related-block">
              <h3>Filmes relacionados</h3>
              <div className="related-grid">
                {related.map((item) => (
                  <div key={item.id} className="related-card">
                    <div
                      className="related-thumb"
                      style={{ backgroundImage: `url(${item.cover})` }}
                    />
                    <div className="related-info">
                      <strong>{item.title}</strong>
                      <span>
                        {item.category} • {item.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}function AdminPanel({
  open,
  onClose,
  movies,
  onAddMovie,
  onUpdateMovie,
  onDeleteMovie,
}) {
  const emptyForm = {
    title: "",
    type: "Filme",
    category: "Ação",
    year: new Date().getFullYear(),
    duration: "",
    rating: "14+",
    cast: "",
    description: "",
    cover: "",
    banner: "",
    trailer: "",
    videoUrl: "",
    featured: false,
    popularity: 80,
    releaseTag: "Novo",
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm(emptyForm);
      setEditingId(null);
    }
  }, [open]);

  if (!open) return null;

  async function handleFileChange(e, field) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setForm((prev) => ({ ...prev, [field]: base64 }));
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      id: editingId || Date.now(),
      year: Number(form.year),
      popularity: Number(form.popularity),
    };

    if (editingId) {
      onUpdateMovie(payload);
    } else {
      onAddMovie(payload);
    }

    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(movie) {
    setEditingId(movie.id);
    setForm({
      title: movie.title || "",
      type: movie.type || "Filme",
      category: movie.category || "Ação",
      year: movie.year || new Date().getFullYear(),
      duration: movie.duration || "",
      rating: movie.rating || "14+",
      cast: movie.cast || "",
      description: movie.description || "",
      cover: movie.cover || "",
      banner: movie.banner || "",
      trailer: movie.trailer || "",
      videoUrl: movie.videoUrl || "",
      featured: !!movie.featured,
      popularity: movie.popularity || 80,
      releaseTag: movie.releaseTag || "Novo",
    });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-top">
          <div>
            <h2>Painel administrativo</h2>
            <p>Adicione, edite ou remova filmes, séries e animes.</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="admin-layout">
          <form className="admin-form" onSubmit={handleSubmit}>
            <h3>{editingId ? "Editar título" : "Adicionar novo título"}</h3>

            <div className="form-grid">
              <label>
                Título
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Nome do filme"
                  required
                />
              </label>

              <label>
                Tipo
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option>Filme</option>
                  <option>Série</option>
                  <option>Anime</option>
                </select>
              </label>

              <label>
                Categoria
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option>Ação</option>
                  <option>Terror</option>
                  <option>Comédia</option>
                  <option>Anime</option>
                  <option>Romance</option>
                  <option>Suspense</option>
                  <option>Carros</option>
                  <option>Ficção</option>
                  <option>Drama</option>
                </select>
              </label>

              <label>
                Ano
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  required
                />
              </label>

              <label>
                Duração
                <input
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  placeholder="2h 10min ou 12 episódios"
                />
              </label>

              <label>
                Classificação
                <input
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  placeholder="14+"
                />
              </label>

              <label>
                Popularidade
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.popularity}
                  onChange={(e) =>
                    setForm({ ...form, popularity: e.target.value })
                  }
                />
              </label>

              <label>
                Tag
                <input
                  value={form.releaseTag}
                  onChange={(e) =>
                    setForm({ ...form, releaseTag: e.target.value })
                  }
                  placeholder="Novo, Em alta, Popular"
                />
              </label>

              <label className="full">
                Elenco
                <input
                  value={form.cast}
                  onChange={(e) => setForm({ ...form, cast: e.target.value })}
                  placeholder="Nomes do elenco"
                />
              </label>

              <label className="full">
                Sinopse
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Descreva a história"
                />
              </label>

              <label className="full">
                URL da capa
                <input
                  value={form.cover}
                  onChange={(e) => setForm({ ...form, cover: e.target.value })}
                  placeholder="https://..."
                />
              </label>

              <label className="full">
                Upload da capa do PC
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "cover")}
                />
              </label>

              <label className="full">
                URL do banner
                <input
                  value={form.banner}
                  onChange={(e) => setForm({ ...form, banner: e.target.value })}
                  placeholder="https://..."
                />
              </label>

              <label className="full">
                Upload do banner do PC
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "banner")}
                />
              </label>

              <label className="full">
                Trailer (YouTube embed)
                <input
                  value={form.trailer}
                  onChange={(e) => setForm({ ...form, trailer: e.target.value })}
                  placeholder="https://www.youtube.com/embed/..."
                />
              </label>

              <label className="full">
                Link direto do vídeo
                <input
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  placeholder="https://...mp4"
                />
              </label>

              <label className="checkbox-row full">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                />
                Colocar em destaque na home
              </label>
            </div>

            <div className="form-actions">
              <button className="primary-btn" type="submit">
                {editingId ? "Salvar alterações" : "Adicionar título"}
              </button>

              <button
                className="secondary-btn"
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setEditingId(null);
                }}
              >
                Limpar
              </button>
            </div>

            {uploading && <p className="mini-note">Processando imagem...</p>}

            {(form.cover || form.banner) && (
              <div className="preview-box">
                <h4>Prévia</h4>
                <div className="preview-grid">
                  {form.cover && (
                    <div
                      className="preview-img"
                      style={{ backgroundImage: `url(${form.cover})` }}
                    />
                  )}
                  {form.banner && (
                    <div
                      className="preview-img banner"
                      style={{ backgroundImage: `url(${form.banner})` }}
                    />
                  )}
                </div>
              </div>
            )}
          </form>

          <div className="admin-list">
            <h3>Catálogo atual</h3>
            <div className="admin-items">
              {movies.map((movie) => (
                <div key={movie.id} className="admin-item">
                  <div
                    className="admin-thumb"
                    style={{ backgroundImage: `url(${movie.cover})` }}
                  />
                  <div className="admin-item-info">
                    <strong>{movie.title}</strong>
                    <span>
                      {movie.type} • {movie.category} • {movie.year}
                    </span>
                  </div>

                  <div className="admin-item-actions">
                    <button onClick={() => handleEdit(movie)}>Editar</button>
                    <button
                      className="danger-btn"
                      onClick={() => onDeleteMovie(movie.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}export default function App() {
  const [movies, setMovies] = useState(() =>
    readStorage(STORAGE_KEYS.MOVIES, defaultMovies)
  );
  const [favorites, setFavorites] = useState(() =>
    readStorage(STORAGE_KEYS.FAVORITES, [])
  );
  const [history, setHistory] = useState(() =>
    readStorage(STORAGE_KEYS.HISTORY, [])
  );
  const [continueWatching, setContinueWatching] = useState(() =>
    readStorage(STORAGE_KEYS.CONTINUE, {})
  );

  const [user, setUser] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("popularidade");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playerMovie, setPlayerMovie] = useState(null);
  const [quickTrailerMovie, setQuickTrailerMovie] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.MOVIES, movies);
  }, [movies]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.HISTORY, history);
  }, [history]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.CONTINUE, continueWatching);
  }, [continueWatching]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = useMemo(() => getCategories(movies), [movies]);

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (category !== "Todos") {
      result = result.filter((movie) => movie.category === category);
    }

    if (search.trim()) {
      const q = slugify(search);
      result = result.filter((movie) => {
        return (
          slugify(movie.title).includes(q) ||
          slugify(movie.category).includes(q) ||
          slugify(movie.description).includes(q) ||
          slugify(movie.cast).includes(q) ||
          slugify(movie.type).includes(q)
        );
      });
    }

    if (sortBy === "popularidade") {
      result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sortBy === "ano") {
      result.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === "titulo") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "lancamento") {
      result.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [movies, category, search, sortBy]);

  const featuredMovies = useMemo(
    () => movies.filter((movie) => movie.featured).slice(0, 6),
    [movies]
  );

  const heroMovie = featuredMovies[0] || movies[0];

  const favoritesMovies = useMemo(
    () => movies.filter((movie) => favorites.includes(movie.id)),
    [movies, favorites]
  );

  const continueMovies = useMemo(() => {
    return movies
      .filter((movie) => continueWatching[movie.id]?.progress > 0)
      .sort(
        (a, b) =>
          (continueWatching[b.id]?.updatedAt || 0) -
          (continueWatching[a.id]?.updatedAt || 0)
      );
  }, [movies, continueWatching]);

  const trendingMovies = useMemo(
    () => [...movies].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 8),
    [movies]
  );

  const newReleases = useMemo(
    () => [...movies].sort((a, b) => (b.year || 0) - (a.year || 0)).slice(0, 8),
    [movies]
  );

  const animeMovies = useMemo(
    () => movies.filter((movie) => movie.category === "Anime" || movie.type === "Anime"),
    [movies]
  );

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function openDetails(movie) {
    setSelectedMovie(movie);
  }

  function openPlayer(movie) {
    setPlayerMovie(movie);
    setHistory((prev) => {
      const next = [movie.id, ...prev.filter((id) => id !== movie.id)];
      return next.slice(0, 20);
    });
  }

  function saveProgress(movieId, progress) {
    setContinueWatching((prev) => ({
      ...prev,
      [movieId]: {
        progress,
        updatedAt: Date.now(),
      },
    }));
  }

  function handleAddMovie(movie) {
    setMovies((prev) => [movie, ...prev]);
  }

  function handleUpdateMovie(updatedMovie) {
    setMovies((prev) =>
      prev.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
    );
  }

  function handleDeleteMovie(id) {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));

    setContinueWatching((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

    if (selectedMovie?.id === id) setSelectedMovie(null);
    if (playerMovie?.id === id) setPlayerMovie(null);
  }

  async function handleGoogleLogin() {
    try {
      setGoogleLoading(true);
      await signInWithPopup(auth, provider);
    } catch (error) {
      const code = error?.code || "";
      if (code.includes("popup-closed-by-user")) {
        alert("Você fechou a janela de login antes de concluir.");
      } else if (code.includes("unauthorized-domain")) {
        alert("Seu domínio ainda não foi autorizado no Firebase.");
      } else if (code.includes("operation-not-allowed")) {
        alert("O login com Google ainda não está ativado no Firebase Authentication.");
      } else {
        alert("Erro ao entrar com Google. Verifique Firebase, domínio e autenticação.");
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch {
      alert("Não foi possível sair da conta agora.");
    }
  }

  const related = getRelatedMovies(selectedMovie, movies);

  const historyMovies = useMemo(
    () => history.map((id) => movies.find((movie) => movie.id === id)).filter(Boolean),
    [history, movies]
  );

  return (
    <div className="app-shell">
      <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
        <div className="brand-row">
          <div className="brand-logo">DRIK</div>

          <nav className="main-nav">
            <a href="#inicio">Início</a>
            <a href="#em-alta">Em alta</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#animes">Animes</a>
            <a href="#minha-lista">Minha lista</a>
          </nav>
        </div>

        <div className="topbar-actions">
          <div className="search-area">
            <input
              type="text"
              placeholder="Buscar filmes, séries, animes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

{user?.email === ADMIN_EMAIL && (
  <button className="admin-btn" onClick={() => setShowAdmin(true)}>
    Painel
  </button>
)}

          {user ? (
            <div className="user-box">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="perfil"
              />
              <span>{user.displayName?.split(" ")[0] || "Usuário"}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Sair
              </button>
            </div>
          ) : (
            <button className="google-btn" onClick={handleGoogleLogin}>
              {googleLoading ? "Entrando..." : "Entrar com Google"}
            </button>
          )}
        </div>
      </header>

      {heroMovie && (
        <section
          id="inicio"
          className="hero-section"
          style={{ backgroundImage: `url(${heroMovie.banner || heroMovie.cover})` }}
        >
          <div className="hero-gradient">
            <div className="hero-inner">
              <span className="hero-tag">{heroMovie.releaseTag || "Destaque"}</span>
              <h1>{heroMovie.title}</h1>
              <p className="hero-meta">
                {heroMovie.type} • {heroMovie.category} • {heroMovie.year} •{" "}
                {heroMovie.duration} • {heroMovie.rating}
              </p>
              <p className="hero-description">{heroMovie.description}</p>

              <div className="hero-buttons">
                <button className="primary-btn" onClick={() => openPlayer(heroMovie)}>
                  ▶ Assistir
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => openDetails(heroMovie)}
                >
                  Mais informações
                </button>
              </div>

              <div className="hero-stats">
                <div className="stat-box">
                  <strong>{movies.length}</strong>
                  <span>Títulos</span>
                </div>
                <div className="stat-box">
                  <strong>{favorites.length}</strong>
                  <span>Favoritos</span>
                </div>
                <div className="stat-box">
                  <strong>{featuredMovies.length}</strong>
                  <span>Destaques</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <main className="main-content">
        <section className="filters-bar" id="catalogo">
          <div className="filter-group">
            <label>Categoria</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Ordenar por</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popularidade">Popularidade</option>
              <option value="ano">Ano</option>
              <option value="titulo">Título</option>
              <option value="lancamento">Lançamento</option>
            </select>
          </div>
        </section>        <Shelf
          title="Em alta"
          items={trendingMovies}
          favorites={favorites}
          onOpenDetails={openDetails}
          onPlay={openPlayer}
          onToggleFavorite={toggleFavorite}
          onQuickTrailer={setQuickTrailerMovie}
        />

        <Shelf
          title="Lançamentos"
          items={newReleases}
          favorites={favorites}
          onOpenDetails={openDetails}
          onPlay={openPlayer}
          onToggleFavorite={toggleFavorite}
          onQuickTrailer={setQuickTrailerMovie}
        />

        <section id="animes">
          <Shelf
            title="Animes"
            items={animeMovies}
            favorites={favorites}
            onOpenDetails={openDetails}
            onPlay={openPlayer}
            onToggleFavorite={toggleFavorite}
            onQuickTrailer={setQuickTrailerMovie}
          />
        </section>

        {continueMovies.length > 0 && (
          <Shelf
            title="Continuar assistindo"
            items={continueMovies}
            favorites={favorites}
            onOpenDetails={openDetails}
            onPlay={openPlayer}
            onToggleFavorite={toggleFavorite}
            onQuickTrailer={setQuickTrailerMovie}
          />
        )}

        {favoritesMovies.length > 0 && (
          <section id="minha-lista">
            <Shelf
              title="Minha Lista"
              items={favoritesMovies}
              favorites={favorites}
              onOpenDetails={openDetails}
              onPlay={openPlayer}
              onToggleFavorite={toggleFavorite}
              onQuickTrailer={setQuickTrailerMovie}
            />
          </section>
        )}

        {historyMovies.length > 0 && (
          <Shelf
            title="Histórico"
            items={historyMovies}
            favorites={favorites}
            onOpenDetails={openDetails}
            onPlay={openPlayer}
            onToggleFavorite={toggleFavorite}
            onQuickTrailer={setQuickTrailerMovie}
          />
        )}

        <Shelf
          title="Todos os títulos filtrados"
          items={filteredMovies}
          favorites={favorites}
          onOpenDetails={openDetails}
          onPlay={openPlayer}
          onToggleFavorite={toggleFavorite}
          onQuickTrailer={setQuickTrailerMovie}
        />

        <section className="bottom-panels">
          <div className="info-panel">
            <h3>Recursos já incluídos</h3>
            <ul>
              <li>Busca em tempo real</li>
              <li>Filtros por categoria</li>
              <li>Ordenação por popularidade, ano e título</li>
              <li>Login com Google</li>
              <li>Minha Lista / Favoritos</li>
              <li>Histórico</li>
              <li>Continuar assistindo</li>
              <li>Painel para adicionar, editar e remover filmes</li>
              <li>Upload de capa e banner pelo computador</li>
              <li>Player com trailer ou vídeo direto</li>
            </ul>
          </div>

          <div className="info-panel">
            <h3>O que pode ser ligado depois</h3>
            <ul>
              <li>Firebase Firestore para salvar tudo online</li>
              <li>Firebase Storage para upload real de imagens</li>
              <li>Comentários</li>
              <li>Avaliações por estrelas reais</li>
              <li>Assinaturas</li>
              <li>Notificações</li>
              <li>Analytics</li>
              <li>Página individual por rota</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>DRIK</strong>
          <p>Sua plataforma de filmes, séries e animes.</p>
        </div>
        <div className="footer-links">
          <span>Em alta</span>
          <span>Minha lista</span>
          <span>Lançamentos</span>
          <span>Suporte</span>
        </div>
      </footer>

      <PlayerModal
        movie={playerMovie}
        open={!!playerMovie}
        onClose={() => setPlayerMovie(null)}
        onSaveProgress={saveProgress}
      />

      <DetailsModal
        movie={selectedMovie}
        open={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onPlay={(movie) => {
          setSelectedMovie(null);
          openPlayer(movie);
        }}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedMovie ? favorites.includes(selectedMovie.id) : false}
        related={related}
      />

      <PlayerModal
        movie={quickTrailerMovie}
        open={!!quickTrailerMovie}
        onClose={() => setQuickTrailerMovie(null)}
        onSaveProgress={saveProgress}
      />

{user?.email === ADMIN_EMAIL && (
  <AdminPanel
    open={showAdmin}
    onClose={() => setShowAdmin(false)}
    movies={movies}
    onAddMovie={handleAddMovie}
    onUpdateMovie={handleUpdateMovie}
    onDeleteMovie={handleDeleteMovie}
  />
)}
    </div>
  );
}
