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
        {
          id: 1,
          title: "Night of the Living Dead",
          year: 1968,
          genre: "Terror",
          description: "Um clássico absoluto do horror em domínio público.",
          image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 2,
          title: "His Girl Friday",
          year: 1940,
          genre: "Romance / Comédia",
          description: "Diálogos rápidos e carisma em um clássico divertido.",
          image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 3,
          title: "Sherlock Jr.",
          year: 1924,
          genre: "Aventura / Comédia",
          description: "Buster Keaton em uma aventura inventiva e leve.",
          image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 4,
          title: "The General",
          year: 1926,
          genre: "Ação / Aventura",
          description: "Uma locomotiva, perseguições e humor clássico.",
          image: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 5,
          title: "Plan 9 from Outer Space",
          year: 1959,
          genre: "Ficção Científica",
          description: "Uma ficção científica cult e curiosa.",
          image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
    {
      name: "Ação e Aventura",
      movies: [
        {
          id: 6,
          title: "The General",
          year: 1926,
          genre: "Ação / Aventura",
          description: "Perseguições e cenas memoráveis no cinema mudo.",
          image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 7,
          title: "The Last Man on Earth",
          year: 1964,
          genre: "Ação / Ficção",
          description: "Solidão e sobrevivência em um mundo transformado.",
          image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 8,
          title: "Road to Bali",
          year: 1952,
          genre: "Aventura",
          description: "Viagem leve e clássica com tom de aventura.",
          image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 9,
          title: "The Phantom of the Opera",
          year: 1925,
          genre: "Drama / Suspense",
          description: "Visual marcante e clima intenso em um clássico.",
          image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 10,
          title: "D.O.A.",
          year: 1950,
          genre: "Suspense / Crime",
          description: "Corrida contra o tempo em um noir envolvente.",
          image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
    {
      name: "Terror",
      movies: [
        {
          id: 11,
          title: "Night of the Living Dead",
          year: 1968,
          genre: "Terror",
          description: "Um dos maiores clássicos do gênero.",
          image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 12,
          title: "Carnival of Souls",
          year: 1962,
          genre: "Terror / Mistério",
          description: "Atmosfera estranha e inesquecível.",
          image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 13,
          title: "House on Haunted Hill",
          year: 1959,
          genre: "Terror",
          description: "Casa assombrada, suspense e tensão clássica.",
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 14,
          title: "Nosferatu",
          year: 1922,
          genre: "Terror / Expressionismo",
          description: "Um ícone sombrio do cinema mundial.",
          image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 15,
          title: "The Brain That Wouldn't Die",
          year: 1962,
          genre: "Terror / Ficção",
          description: "Um terror cult peculiar e memorável.",
          image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
    {
      name: "Romance e Drama",
      movies: [
        {
          id: 16,
          title: "Charade",
          year: 1963,
          genre: "Romance / Suspense",
          description: "Elegância, charme e mistério.",
          image: "https://images.unsplash.com/photo-1542204625-de293a2f8ff2?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 17,
          title: "His Girl Friday",
          year: 1940,
          genre: "Romance / Comédia",
          description: "Clássico rápido, divertido e carismático.",
          image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 18,
          title: "Penny Serenade",
          year: 1941,
          genre: "Romance / Drama",
          description: "Um drama sensível e atemporal.",
          image: "https://images.unsplash.com/photo-1518131678677-a25a18114956?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 19,
          title: "Scarlet Street",
          year: 1945,
          genre: "Drama / Noir",
          description: "Desejo, engano e consequências em um noir clássico.",
          image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 20,
          title: "The Stranger",
          year: 1946,
          genre: "Drama / Suspense",
          description: "Tensão psicológica conduzida com elegância.",
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
    {
      name: "Ficção Científica",
      movies: [
        {
          id: 21,
          title: "Plan 9 from Outer Space",
          year: 1959,
          genre: "Ficção Científica",
          description: "Um cult sci-fi impossível de ignorar.",
          image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 22,
          title: "The Last Man on Earth",
          year: 1964,
          genre: "Ficção / Terror",
          description: "Atmosfera apocalíptica e envolvente.",
          image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 23,
          title: "Teenagers from Outer Space",
          year: 1959,
          genre: "Ficção Científica",
          description: "Um clássico cult com energia retrô.",
          image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 24,
          title: "The Brain That Wouldn't Die",
          year: 1962,
          genre: "Ficção / Terror",
          description: "Mistura estranha de horror e sci-fi.",
          image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 25,
          title: "Voyage to the Prehistoric Planet",
          year: 1965,
          genre: "Ficção / Aventura",
          description: "Exploração espacial com clima clássico.",
          image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
    {
      name: "Clássicos Liberados",
      movies: [
        {
          id: 26,
          title: "Nosferatu",
          year: 1922,
          genre: "Clássico / Terror",
          description: "Visual histórico e sombrio.",
          image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 27,
          title: "Sherlock Jr.",
          year: 1924,
          genre: "Clássico / Comédia",
          description: "Criatividade pura do cinema mudo.",
          image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 28,
          title: "The Kid",
          year: 1921,
          genre: "Drama / Comédia",
          description: "Emocionante e inesquecível.",
          image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 29,
          title: "Metropolis",
          year: 1927,
          genre: "Ficção / Drama",
          description: "Arquitetura visual impressionante e histórica.",
          image: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 30,
          title: "The Gold Rush",
          year: 1925,
          genre: "Comédia / Aventura",
          description: "Um marco do cinema clássico.",
          image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gradient-to-b from-black/95 to-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-8">
            <div className="text-3xl font-black tracking-tight text-red-600">Drike</div>
            <nav className="hidden gap-6 text-sm text-zinc-200 md:flex">
              <a href="#" className="transition hover:text-white">Início</a>
              <a href="#" className="transition hover:text-white">Filmes</a>
              <a href="#" className="transition hover:text-white">Séries</a>
              <a href="#" className="transition hover:text-white">Minha Lista</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Buscar"
              className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white outline-none placeholder:text-zinc-400 md:block"
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-700 font-bold">
              D
            </div>
          </div>
        </div>
      </header>

      <section className="relative h-[78vh] min-h-[560px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featured.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-20 pt-28 md:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-red-300">
              Destaque Drike
            </div>
            <h1 className="mb-4 text-5xl font-black leading-tight md:text-7xl">
              {featured.title}
            </h1>
            <p className="mb-3 text-lg text-zinc-300">
              {featured.year} • {featured.genre}
            </p>
            <p className="mb-8 max-w-xl text-base leading-7 text-zinc-200 md:text-lg">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-md bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]">
                ▶ Assistir
              </button>
              <button className="rounded-md bg-zinc-700/80 px-6 py-3 font-semibold text-white transition hover:bg-zinc-600">
                Mais informações
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-20 -mt-24 space-y-10 pb-16">
        {categories.map((category) => (
          <section key={category.name} className="px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-4 text-2xl font-bold tracking-tight">{category.name}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {category.movies.map((movie) => (
                  <article
                    key={movie.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-red-500/40"
                  >
                    <div className="relative h-56 overflow-hidden bg-zinc-800">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-300">
                          {movie.genre}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 text-base font-bold">{movie.title}</h3>
                        <span className="shrink-0 rounded bg-white/10 px-2 py-1 text-xs text-zinc-300">
                          {movie.year}
                        </span>
                      </div>
                      <p className="line-clamp-3 text-sm leading-6 text-zinc-400">{movie.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-zinc-500 md:px-8">
        © 2026 Drike — Catálogo visual inspirado em plataformas modernas de streaming, com identidade própria.
      </footer>
    </div>
  );
}
