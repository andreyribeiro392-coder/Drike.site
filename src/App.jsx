import { useMemo, useState } from "react";
import "./index.css";

export default function LegalStreamingCatalog() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = [
    {
      id: 1,
      title: "Sita Sings the Blues",
      genre: "Animação / Musical",
      year: 2008,
      rating: "7.6",
      badge: "CC0",
      description:
        "Longa independente com licença aberta, ótimo para um catálogo legal com reprodução permitida.",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Sita_Sings_the_Blues_poster.jpg/800px-Sita_Sings_the_Blues_poster.jpg",
      trailer: "https://www.youtube.com/watch?v=1QkYOqI3jSM",
      embed: "https://archive.org/embed/Sita_Sings_the_Blues",
    },
    {
      id: 2,
      title: "Big Buck Bunny",
      genre: "Animação / Comédia",
      year: 2008,
      rating: "7.4",
      badge: "CC BY",
      description:
        "Curta aberto muito conhecido, ideal para mostrar qualidade visual e reprodução direta no site.",
      poster:
        "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
      trailer: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      embed: "https://archive.org/embed/BigBuckBunny_328",
    },
    {
      id: 3,
      title: "Elephants Dream",
      genre: "Animação / Sci-fi",
      year: 2006,
      rating: "7.0",
      badge: "CC BY",
      description:
        "Primeiro open movie do Blender Studio, excelente para a área de filmes grátis do Drike.",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg",
      trailer: "https://www.youtube.com/watch?v=bsX0qFGs-KU",
      embed: "https://archive.org/embed/elephants_dream",
    },
    {
      id: 4,
      title: "Sintel",
      genre: "Animação / Fantasia",
      year: 2010,
      rating: "7.5",
      badge: "CC BY",
      description:
        "Curta aberto com visual cinematográfico, ótimo para um catálogo moderno com capa e player.",
      poster:
        "https://durian.blender.org/wp-content/uploads/2010/05/poster_01.jpg",
      trailer: "https://www.youtube.com/watch?v=eRsGyueVLvQ",
      embed: "https://archive.org/embed/Sintel",
    },
    {
      id: 5,
      title: "Tears of Steel",
      genre: "Sci-fi",
      year: 2012,
      rating: "6.6",
      badge: "CC BY",
      description:
        "Filme curto de ficção científica com reprodução aberta e visual forte para o site.",
      poster:
        "https://mango.blender.org/wp-content/uploads/2013/05/poster.jpg",
      trailer: "https://www.youtube.com/watch?v=R6MlUcmOul8",
      embed: "https://archive.org/embed/TearsOfSteel",
    },
    {
      id: 6,
      title: "Spring",
      genre: "Animação / Fantasia",
      year: 2019,
      rating: "7.1",
      badge: "CC BY 4.0",
      description:
        "Curta recente do Blender Studio, perfeito para deixar o Drike com uma cara mais atualizada.",
      poster:
        "https://studio.blender.org/static/media/film_spring_poster.6d168364.jpg",
      trailer: "https://www.youtube.com/watch?v=WhWc3b3KhnY",
      embed: "https://www.youtube.com/embed/WhWc3b3KhnY",
    },
  ];

  const plans = [
    { name: "Semanal", price: "R$ 15", period: "/semana" },
    { name: "Mensal", price: "R$ 30", period: "/mês" },
    { name: "Anual", price: "R$ 120", period: "/ano" },
  ];

  const filteredMovies = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return movies;
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(term) ||
        movie.genre.toLowerCase().includes(term) ||
        movie.description.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <div className="site">
      <header className="hero">
        <div className="topbar container">
          <div className="brand">DRIKE</div>
          <nav className="menu">
            <a href="#filmes">Filmes</a>
            <a href="#planos">Planos</a>
          </nav>
        </div>

        <div className="container hero-grid">
          <div>
            <div className="tag">✨ Streaming com visual premium e catálogo legal</div>
            <h1>Drike Originals</h1>
            <p className="hero-text">
              Versão simples e bonita do Drike com busca, capas, descrições e player para obras abertas, gratuitas ou licenciadas.
            </p>

            <div className="search-box">
              <span>🔎</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar filmes, gênero ou descrição"
              />
            </div>

            <div className="hero-buttons">
              <a className="btn btn-primary" href="#filmes">Explorar catálogo</a>
              <a className="btn btn-secondary" href="#planos">Ver planos</a>
            </div>
          </div>

          <div className="featured-card">
            <div className="featured-label">Em destaque</div>
            <img src={movies[0].poster} alt={movies[0].title} className="featured-image" />
            <div className="featured-body">
              <h2>{movies[0].title}</h2>
              <p>{movies[0].description}</p>
              <button className="btn btn-primary" onClick={() => setSelectedMovie(movies[0])}>▶ Dar play</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <section className="info-grid">
          <div className="info-card">
            <div className="info-icon">🎬</div>
            <h3>Capas e visual premium</h3>
            <p>Cada filme agora tem poster grande, descrição e botão de play para uma experiência mais moderna.</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🔎</div>
            <h3>Pesquisa integrada</h3>
            <p>A barra de busca ajuda a encontrar filme por nome, gênero ou descrição em segundos.</p>
          </div>
          <div className="info-card">
            <div className="info-icon">👑</div>
            <h3>Player e planos</h3>
            <p>Estrutura pronta para exibir vídeo, reproduzir obras abertas e mostrar seus planos premium.</p>
          </div>
        </section>

        <section id="filmes" className="section">
          <div className="section-head">
            <div>
              <div className="section-tag">Filmes</div>
              <h2>Catálogo com capa, descrição e play</h2>
            </div>
            <p>Use apenas obras abertas, grátis ou licenciadas para manter o Drike legal.</p>
          </div>

          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <img src={movie.poster} alt={movie.title} className="movie-poster" />
                <div className="movie-body">
                  <div className="movie-top">
                    <span className="badge">{movie.badge}</span>
                    <span className="rating">⭐ {movie.rating}</span>
                  </div>
                  <h3>{movie.title}</h3>
                  <div className="movie-meta">{movie.genre} • {movie.year}</div>
                  <p>{movie.description}</p>
                  <div className="movie-actions">
                    <button className="btn btn-primary" onClick={() => setSelectedMovie(movie)}>▶ Dar play</button>
                    <a className="btn btn-secondary" href={movie.trailer} target="_blank" rel="noreferrer">Ver trailer</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="planos" className="section">
          <div className="section-head">
            <div>
              <div className="section-tag">Assinaturas</div>
              <h2>Escolha seu plano</h2>
            </div>
            <p>Estrutura visual premium para o Drike.</p>
          </div>

          <div className="plans-grid">
            {plans.map((plan) => (
              <div className="plan-card" key={plan.name}>
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">{plan.price} <span>{plan.period}</span></div>
                <button className="btn btn-primary full">Assinar agora</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>Drike</strong>
            <p>Streaming visual premium para obras abertas, gratuitas ou licenciadas.</p>
          </div>
          <div>Versão simples e bonita, pronta para funcionar no seu projeto.</div>
        </div>
      </footer>

      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>{selectedMovie.title}</h3>
                <p>{selectedMovie.genre} • {selectedMovie.year}</p>
              </div>
              <button className="btn btn-secondary" onClick={() => setSelectedMovie(null)}>Fechar ✕</button>
            </div>
            <div className="player-wrap">
              <iframe
                src={selectedMovie.embed}
                title={selectedMovie.title}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <div className="modal-body">
              <img src={selectedMovie.poster} alt={selectedMovie.title} className="modal-poster" />
              <div>
                <div className="badge-row">⭐ {selectedMovie.rating} • {selectedMovie.badge}</div>
                <p>{selectedMovie.description}</p>
                <a className="btn btn-primary" href={selectedMovie.trailer} target="_blank" rel="noreferrer">Abrir trailer</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
},
{
id: 7,
title: "Night of the Living Dead",
genre: "Terror / Ação",
year: 1968,
rating: "7.8",
badge: "Domínio Público",
description: "Clássico filme de zumbis que caiu em domínio público e pode ser exibido gratuitamente.",
poster: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Night_of_the_Living_Dead_Film_Poster.jpg",
trailer: "https://www.youtube.com/watch?v=H91BxkBXttE",
embed: "https://archive.org/embed/night_of_the_living_dead"
},
{
id: 8,
title: "The Last Man on Earth",
genre: "Ação / Ficção científica",
year: 1964,
rating: "7.0",
badge: "Domínio Público",
description: "Filme pós-apocalíptico baseado no livro I Am Legend.",
poster: "https://upload.wikimedia.org/wikipedia/commons/6/6b/The_Last_Man_on_Earth_1964.jpg",
trailer: "https://www.youtube.com/watch?v=YjY0hZC3fVc",
embed: "https://archive.org/embed/TheLastManOnEarth"
},
{
id: 9,
title: "The Phantom of the Opera",
genre: "Drama / Suspense",
year: 1925,
rating: "7.5",
badge: "Domínio Público",
description: "Clássico do cinema mudo baseado na história do Fantasma da Ópera.",
poster: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Phantomopera.jpg",
trailer: "https://www.youtube.com/watch?v=FQ6Lr4s7I8M",
embed: "https://archive.org/embed/ThePhantomoftheOpera1925"
},
{
id: 10,
title: "Plan 9 from Outer Space",
genre: "Ação / Ficção científica",
year: 1959,
rating: "6.0",
badge: "Domínio Público",
description: "Clássico cult de ficção científica que se tornou domínio público.",
poster: "https://upload.wikimedia.org/wikipedia/commons/7/70/Plan_9_from_Outer_Space_poster.jpg",
trailer: "https://www.youtube.com/watch?v=_zZL9FjK1H0",
embed: "https://archive.org/embed/Plan9FromOuterSpace"
},
{
id: 11,
title: "The Fast and the Furious",
genre: "Ação / Crime",
year: 1954,
rating: "6.1",
badge: "Domínio Público",
description: "Filme de corrida e crime que entrou em domínio público.",
poster: "https://upload.wikimedia.org/wikipedia/commons/0/0f/TheFastandtheFurious1954.jpg",
trailer: "https://www.youtube.com/watch?v=7sE3vXyQeE4",
embed: "https://archive.org/embed/TheFastAndTheFurious1954"
},