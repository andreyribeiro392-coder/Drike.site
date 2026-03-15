
export default function DrikeStreamingApp() {
  const featured = {
    title: "Night of the Living Dead",
    year: 1968,
    genre: "Terror / Clássico",
    description:
      "Uma noite de sobrevivência em um clássico do cinema de domínio público, apresentado aqui em um catálogo com clima cinematográfico.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
  };

  const categories = [
    {
      name: "Em Alta",
      movies: [
        { id: 1, title: "Night of the Living Dead", year: 1968, genre: "Terror", description: "Um clássico absoluto do horror em domínio público.", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80" },
        { id: 2, title: "His Girl Friday", year: 1940, genre: "Romance / Comédia", description: "Diálogos rápidos e carisma em um clássico divertido.", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80" },
        { id: 3, title: "Sherlock Jr.", year: 1924, genre: "Aventura / Comédia", description: "Buster Keaton em uma aventura inventiva e leve.", image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=900&q=80" },
        { id: 4, title: "The General", year: 1926, genre: "Ação / Aventura", description: "Uma locomotiva, perseguições e humor clássico.", image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=900&q=80" },
        { id: 5, title: "Plan 9 from Outer Space", year: 1959, genre: "Ficção Científica", description: "Uma ficção científica cult e curiosa.", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80" },
      ],
    },
    {
      name: "Ação e Aventura",
      movies: [
        { id: 6, title: "The General", year: 1926, genre: "Ação / Aventura", description: "Perseguições e cenas memoráveis no cinema mudo.", image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=900&q=80" },
        { id: 7, title: "The Last Man on Earth", year: 1964, genre: "Ação / Ficção", description: "Solidão e sobrevivência em um mundo transformado.", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80" },
        { id: 8, title: "Road to Bali", year: 1952, genre: "Aventura", description: "Viagem leve e clássica com tom de aventura.", image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80" },
        { id: 9, title: "The Phantom of the Opera", year: 1925, genre: "Drama / Suspense", description: "Visual marcante e clima intenso em um clássico.", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80" },
        { id: 10, title: "D.O.A.", year: 1950, genre: "Suspense / Crime", description: "Corrida contra o tempo em um noir envolvente.", image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80" },
      ],
    },
    {
      name: "Terror",
      movies: [
        { id: 11, title: "Night of the Living Dead", year: 1968, genre: "Terror", description: "Um dos maiores clássicos do gênero.", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80" },
        { id: 12, title: "Carnival of Souls", year: 1962, genre: "Terror / Mistério", description: "Atmosfera estranha e inesquecível.", image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=900&q=80" },
        { id: 13, title: "House on Haunted Hill", year: 1959, genre: "Terror", description: "Casa assombrada, suspense e tensão clássica.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" },
        { id: 14, title: "Nosferatu", year: 1922, genre: "Terror / Expressionismo", description: "Um ícone sombrio do cinema mundial.", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=900&q=80" },
        { id: 15, title: "The Brain That Wouldn't Die", year: 1962, genre: "Terror / Ficção", description: "Um terror cult peculiar e memorável.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80" },
      ],
    },
    {
      name: "Romance e Drama",
      movies: [
        { id: 16, title: "Charade", year: 1963, genre: "Romance / Suspense", description: "Elegância, charme e mistério.", image: "https://images.unsplash.com/photo-1542204625-de293a2f8ff2?auto=format&fit=crop&w=900&q=80" },
        { id: 17, title: "His Girl Friday", year: 1940, genre: "Romance / Comédia", description: "Clássico rápido, divertido e carismático.", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80" },
        { id: 18, title: "Penny Serenade", year: 1941, genre: "Romance / Drama", description: "Um drama sensível e atemporal.", image: "https://images.unsplash.com/photo-1518131678677-a25a18114956?auto=format&fit=crop&w=900&q=80" },
        { id: 19, title: "Scarlet Street", year: 1945, genre: "Drama / Noir", description: "Desejo, engano e consequências em um noir clássico.", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80" },
        { id: 20, title: "The Stranger", year: 1946, genre: "Drama / Suspense", description: "Tensão psicológica conduzida com elegância.", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80" },
      ],
    },
    {
      name: "Ficção Científica",
      movies: [
        { id: 21, title: "Plan 9 from Outer Space", year: 1959, genre: "Ficção Científica", description: "Um cult sci-fi impossível de ignorar.", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80" },
        { id: 22, title: "The Last Man on Earth", year: 1964, genre: "Ficção / Terror", description: "Atmosfera apocalíptica e envolvente.", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80" },
        { id: 23, title: "Teenagers from Outer Space", year: 1959, genre: "Ficção Científica", description: "Um clássico cult com energia retrô.", image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=900&q=80" },
        { id: 24, title: "The Brain That Wouldn't Die", year: 1962, genre: "Ficção / Terror", description: "Mistura estranha de horror e sci-fi.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80" },
        { id: 25, title: "Voyage to the Prehistoric Planet", year: 1965, genre: "Ficção / Aventura", description: "Exploração espacial com clima clássico.", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80" },
      ],
    },
    {
      name: "Clássicos Liberados",
      movies: [
        { id: 26, title: "Nosferatu", year: 1922, genre: "Clássico / Terror", description: "Visual histórico e sombrio.", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=900&q=80" },
        { id: 27, title: "Sherlock Jr.", year: 1924, genre: "Clássico / Comédia", description: "Criatividade pura do cinema mudo.", image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=900&q=80" },
        { id: 28, title: "The Kid", year: 1921, genre: "Drama / Comédia", description: "Emocionante e inesquecível.", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80" },
        { id: 29, title: "Metropolis", year: 1927, genre: "Ficção / Drama", description: "Arquitetura visual impressionante e histórica.", image: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=900&q=80" },
        { id: 30, title: "The Gold Rush", year: 1925, genre: "Comédia / Aventura", description: "Um marco do cinema clássico.", image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=900&q=80" },
      ],
    },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #0b0b0f; color: white; font-family: Arial, sans-serif; }
        a { color: inherit; text-decoration: none; }
        .app { min-height: 100vh; background: #0b0b0f; }
        .header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          background: linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.65));
          border-bottom: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
        }
        .header-inner {
          max-width: 1280px; margin: 0 auto; padding: 16px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .left, .right { display: flex; align-items: center; gap: 20px; }
        .logo { font-size: 34px; font-weight: 900; color: #e50914; letter-spacing: -1px; }
        .nav { display: flex; gap: 18px; color: #ddd; font-size: 14px; }
        .nav a:hover { color: #fff; }
        .search {
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          color: white; border-radius: 999px; padding: 10px 14px; outline: none;
        }
        .avatar {
          width: 40px; height: 40px; border-radius: 999px; background: #b20710;
          display: flex; align-items: center; justify-content: center; font-weight: 700;
        }
        .hero {
          position: relative; min-height: 78vh; overflow: hidden; display: flex; align-items: flex-end;
        }
        .hero-bg {
          position: absolute; inset: 0; background-size: cover; background-position: center;
        }
        .overlay-a { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,.72), rgba(0,0,0,.18)); }
        .overlay-b { position: absolute; inset: 0; background: linear-gradient(to top, #0b0b0f, transparent 45%); }
        .hero-content {
          position: relative; z-index: 2; max-width: 1280px; width: 100%; margin: 0 auto;
          padding: 130px 24px 80px;
        }
        .badge {
          display: inline-block; margin-bottom: 14px; padding: 7px 12px; border-radius: 999px;
          background: rgba(229,9,20,.12); border: 1px solid rgba(229,9,20,.28);
          color: #ffb3b8; font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
          font-weight: 700;
        }
        .hero h1 { margin: 0 0 14px; font-size: 64px; line-height: 1; max-width: 760px; }
        .meta { color: #d4d4d8; margin-bottom: 14px; font-size: 18px; }
        .desc { color: #e4e4e7; max-width: 650px; font-size: 18px; line-height: 1.7; margin-bottom: 28px; }
        .buttons { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn {
          border: 0; border-radius: 8px; padding: 14px 22px; font-size: 16px; font-weight: 700;
          cursor: pointer; transition: transform .2s ease, opacity .2s ease, background .2s ease;
        }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: white; color: black; }
        .btn-secondary { background: rgba(82,82,91,.85); color: white; }
        .main { position: relative; z-index: 3; margin-top: -70px; padding-bottom: 50px; }
        .section { max-width: 1280px; margin: 0 auto 34px; padding: 0 24px; }
        .section h2 { margin: 0 0 16px; font-size: 30px; }
        .grid {
          display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 16px;
        }
        .card {
          background: rgba(24,24,27,.95); border: 1px solid rgba(255,255,255,.08); border-radius: 18px;
          overflow: hidden; transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,.28);
        }
        .card:hover { transform: translateY(-4px) scale(1.02); border-color: rgba(229,9,20,.45); }
        .poster { position: relative; height: 240px; overflow: hidden; background: #18181b; }
        .poster img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
        .card:hover .poster img { transform: scale(1.08); }
        .poster-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.82), transparent); }
        .genre-tag {
          position: absolute; left: 12px; right: 12px; bottom: 12px;
          color: #fda4af; font-size: 11px; text-transform: uppercase; letter-spacing: .15em; font-weight: 700;
        }
        .card-body { padding: 14px; }
        .title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
        .movie-title { font-size: 17px; font-weight: 700; line-height: 1.3; }
        .year {
          flex-shrink: 0; background: rgba(255,255,255,.08); color: #d4d4d8;
          border-radius: 6px; padding: 6px 8px; font-size: 12px;
        }
        .movie-desc { color: #a1a1aa; font-size: 14px; line-height: 1.6; }
        .footer {
          border-top: 1px solid rgba(255,255,255,.08); color: #71717a; text-align: center;
          padding: 26px 24px 34px; font-size: 14px;
        }
        @media (max-width: 1100px) {
          .grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
        }
        @media (max-width: 860px) {
          .nav, .search { display: none; }
          .hero h1 { font-size: 44px; }
          .desc, .meta { font-size: 16px; }
          .grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
        }
        @media (max-width: 560px) {
          .header-inner, .hero-content, .section { padding-left: 14px; padding-right: 14px; }
          .logo { font-size: 28px; }
          .hero { min-height: 72vh; }
          .hero h1 { font-size: 34px; }
          .grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
          .poster { height: 190px; }
          .section h2 { font-size: 24px; }
        }
      `}</style>

      <div className="app">
        <header className="header">
          <div className="header-inner">
            <div className="left">
              <div className="logo">Drike</div>
              <nav className="nav">
                <a href="#">Início</a>
                <a href="#">Filmes</a>
                <a href="#">Séries</a>
                <a href="#">Minha Lista</a>
              </nav>
            </div>

            <div className="right">
              <input className="search" type="text" placeholder="Buscar" />
              <div className="avatar">D</div>
            </div>
          </div>
        </header>

        <section className="hero">
          <div className="hero-bg" style={{ backgroundImage: `url(${featured.image})` }} />
          <div className="overlay-a" />
          <div className="overlay-b" />
          <div className="hero-content">
            <div className="badge">Destaque Drike</div>
            <h1>{featured.title}</h1>
            <div className="meta">{featured.year} • {featured.genre}</div>
            <div className="desc">{featured.description}</div>
            <div className="buttons">
              <button className="btn btn-primary">▶ Assistir</button>
              <button className="btn btn-secondary">Mais informações</button>
            </div>
          </div>
        </section>

        <main className="main">
          {categories.map((category) => (
            <section className="section" key={category.name}>
              <h2>{category.name}</h2>
              <div className="grid">
                {category.movies.map((movie) => (
                  <article className="card" key={movie.id}>
                    <div className="poster">
                      <img src={movie.image} alt={movie.title} />
                      <div className="poster-overlay" />
                      <div className="genre-tag">{movie.genre}</div>
                    </div>
                    <div className="card-body">
                      <div className="title-row">
                        <div className="movie-title">{movie.title}</div>
                        <div className="year">{movie.year}</div>
                      </div>
                      <div className="movie-desc">{movie.description}</div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </main>

        <footer className="footer">
          © 2026 Drike — catálogo visual inspirado em plataformas modernas de streaming, com identidade própria.
        </footer>
      </div>
    </>
  );
}
