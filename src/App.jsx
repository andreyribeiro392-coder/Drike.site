import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

import { auth, provider, db } from "./firebase";

const STORAGE_KEYS = {
  FAVORITES: "drik_favorites_v2",
  HISTORY: "drik_history_v2",
  CONTINUE: "drik_continue_v2",
};

const ADMIN_EMAIL = "andreyribeiro392@gmail.com";

const defaultMovies = [];

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
}

function normalizeMovie(movie) {
  return {
    id: movie.id,
    title: movie.title || "",
    type: movie.type || "Filme",
    category: movie.category || "Ação",
    year: Number(movie.year) || new Date().getFullYear(),
    duration: movie.duration || "",
    rating: movie.rating || "14+",
    cast: movie.cast || "",
    description: movie.description || "",
    cover: movie.cover || "",
    banner: movie.banner || movie.cover || "",
    featured: !!movie.featured,
    popularity: Number(movie.popularity) || 0,
    releaseTag: movie.releaseTag || "Novo",
  };
}

async function seedDefaultMoviesIfNeeded() {
  const snap = await getDocs(collection(db, "movies"));
  if (!snap.empty) return;

  for (const movie of defaultMovies) {
    const normalized = normalizeMovie(movie);
    await setDoc(doc(db, "movies", String(normalized.id)), normalized);
  }
}

function StarRating({ value = 4.5 }) {
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

function MovieCard({ movie, onOpenDetails, onToggleFavorite, isFavorite }) {
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(movie);
              }}
            >
              Ver detalhes
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie.id);
              }}
            >
              {isFavorite ? "♥ Favorito" : "+ Minha Lista"}
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
  onToggleFavorite,
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
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(movie.id)}
          />
        ))}
      </div>
    </section>
  );
}function DetailsModal({
  movie,
  open,
  onClose,
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
                {movie.category} • {movie.year} • {movie.duration} •{" "}
                {movie.rating}
              </p>
              <p className="details-description">{movie.description}</p>

              <div className="hero-buttons">
                <button className="primary-btn" onClick={onClose}>
                  Fechar
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
                <li>
                  <strong>Tipo:</strong> {movie.type}
                </li>
                <li>
                  <strong>Gênero:</strong> {movie.category}
                </li>
                <li>
                  <strong>Ano:</strong> {movie.year}
                </li>
                <li>
                  <strong>Duração:</strong> {movie.duration}
                </li>
                <li>
                  <strong>Classificação:</strong> {movie.rating}
                </li>
                <li>
                  <strong>Elenco:</strong> {movie.cast}
                </li>
              </ul>
            </div>

            <div>
              <h3>Avaliação</h3>
              <StarRating value={4.6} />
              <p className="mini-note">
                Baseado em curtidas e engajamento da plataforma.
              </p>
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
}

function AdminPanel({
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
        </div>        <div className="admin-layout">
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
                Upload da capa do PC
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "cover")}
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
}

export default function App() {
  const [movies, setMovies] = useState(defaultMovies);
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
  const [showAdmin, setShowAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    let unsubscribe = () => {};

    async function startMoviesSync() {
      try {
        await seedDefaultMoviesIfNeeded();

        unsubscribe = onSnapshot(collection(db, "movies"), (snapshot) => {
          const remoteMovies = snapshot.docs.map((docItem) =>
            normalizeMovie(docItem.data())
          );

          remoteMovies.sort((a, b) => {
            const popDiff = (b.popularity || 0) - (a.popularity || 0);
            if (popDiff !== 0) return popDiff;
            return (b.year || 0) - (a.year || 0);
          });

          setMovies(remoteMovies);
        });
      } catch (error) {
        console.error("Erro ao carregar filmes do Firestore:", error);
      }
    }

    startMoviesSync();

    return () => unsubscribe();
  }, []);  const categories = useMemo(() => getCategories(movies), [movies]);

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
    () =>
      [...movies]
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 8),
    [movies]
  );

  const newReleases = useMemo(
    () => [...movies].sort((a, b) => (b.year || 0) - (a.year || 0)).slice(0, 8),
    [movies]
  );

  const animeMovies = useMemo(
    () =>
      movies.filter(
        (movie) => movie.category === "Anime" || movie.type === "Anime"
      ),
    [movies]
  );

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function openDetails(movie) {
    setSelectedMovie(movie);
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

  async function handleAddMovie(movie) {
    try {
      const newMovie = normalizeMovie({
        ...movie,
        id: movie.id || Date.now(),
      });

      await setDoc(doc(db, "movies", String(newMovie.id)), newMovie);
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
      alert("Não foi possível adicionar o filme.");
    }
  }

  async function handleUpdateMovie(updatedMovie) {
    try {
      const movieToSave = normalizeMovie(updatedMovie);
      await setDoc(doc(db, "movies", String(movieToSave.id)), movieToSave);
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      alert("Não foi possível atualizar o filme.");
    }
  }

  async function handleDeleteMovie(id) {
    try {
      await deleteDoc(doc(db, "movies", String(id)));

      setFavorites((prev) => prev.filter((favId) => favId !== id));

      setContinueWatching((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });

      if (selectedMovie?.id === id) setSelectedMovie(null);
    } catch (error) {
      console.error("Erro ao remover filme:", error);
      alert("Não foi possível remover o filme.");
    }
  }

  async function handleGoogleLogin() {
    try {
      setGoogleLoading(true);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("ERRO GOOGLE LOGIN:", error);
      alert(error?.code || error?.message || "Erro ao entrar com Google.");
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
    () =>
      history
        .map((id) => movies.find((movie) => movie.id === id))
        .filter(Boolean),
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
        </section>

        <Shelf
          title="Em alta"
          items={trendingMovies}
          favorites={favorites}
          onOpenDetails={openDetails}
          onToggleFavorite={toggleFavorite}
        />

        <Shelf
          title="Lançamentos"
          items={newReleases}
          favorites={favorites}
          onOpenDetails={openDetails}
          onToggleFavorite={toggleFavorite}
        />

        <section id="animes">
          <Shelf
            title="Animes"
            items={animeMovies}
            favorites={favorites}
            onOpenDetails={openDetails}
            onToggleFavorite={toggleFavorite}
          />
        </section>

        {continueMovies.length > 0 && (
          <Shelf
            title="Continuar assistindo"
            items={continueMovies}
            favorites={favorites}
            onOpenDetails={openDetails}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {favoritesMovies.length > 0 && (
          <section id="minha-lista">
            <Shelf
              title="Minha Lista"
              items={favoritesMovies}
              favorites={favorites}
              onOpenDetails={openDetails}
              onToggleFavorite={toggleFavorite}
            />
          </section>
        )}

        {historyMovies.length > 0 && (
          <Shelf
            title="Histórico"
            items={historyMovies}
            favorites={favorites}
            onOpenDetails={openDetails}
            onToggleFavorite={toggleFavorite}
          />
        )}

        <Shelf
          title="Todos os títulos filtrados"
          items={filteredMovies}
          favorites={favorites}
          onOpenDetails={openDetails}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      <DetailsModal
        movie={selectedMovie}
        open={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedMovie ? favorites.includes(selectedMovie.id) : false}
        related={related}
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
