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
                {movie.category} • {movie.year} • {movie.duration} •{" "}
                {movie.rating}
              </p>
              <p className="details-description">{movie.description}</p>

              <div className="hero-buttons">
                {movie.videoUrl ? (
                  <button
                    className="primary-btn"
                    onClick={() => {
                      onClose();
                      onPlay(movie);
                    }}
                  >
                    ▶ Assistir
                  </button>
                ) : (
                  <button className="primary-btn" onClick={onClose}>
                    Fechar
                  </button>
                )}

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
        </div>function DetailsModal({
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
                {movie.category} • {movie.year} • {movie.duration} •{" "}
                {movie.rating}
              </p>
              <p className="details-description">{movie.description}</p>

              <div className="hero-buttons">
                {movie.videoUrl ? (
                  <button
                    className="primary-btn"
                    onClick={() => {
                      onClose();
                      onPlay(movie);
                    }}
                  >
                    ▶ Assistir
                  </button>
                ) : (
                  <button className="primary-btn" onClick={onClose}>
                    Fechar
                  </button>
                )}

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
        </div>  const categories = useMemo(() => getCategories(movies), [movies]);

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
      if (playerMovie?.id === id) setPlayerMovie(null);
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
        onPlay={openPlayer}
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
