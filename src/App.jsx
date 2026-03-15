import { useMemo, useState } from "react";
import { useMemo, useState } from "react";

export default function LegalStreamingCatalog() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const featured = {
    title: "Drike Originals",
    subtitle: "Streaming com visual premium e catálogo legal.",
    description:
      "Versão mais sofisticada do Drike, com busca, capas, descrições e player para obras abertas, gratuitas ou licenciadas.",
  };

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
      trailer: "https://www.youtube.com/embed/1QkYOqI3jSM",
      embed: "https://archive.org/embed/Sita_Sings_the_Blues",
      category: "Filme",
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
      trailer: "https://www.youtube.com/embed/aqz-KE-bpKQ",
      embed: "https://archive.org/embed/BigBuckBunny_328",
      category: "Filme",
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
      trailer: "https://www.youtube.com/embed/bsX0qFGs-KU",
      embed: "https://archive.org/embed/elephants_dream",
      category: "Filme",
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
      trailer: "https://www.youtube.com/embed/eRsGyueVLvQ",
      embed: "https://archive.org/embed/Sintel",
      category: "Filme",
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
      trailer: "https://www.youtube.com/embed/R6MlUcmOul8",
      embed: "https://archive.org/embed/TearsOfSteel",
      category: "Filme",
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
      trailer: "https://www.youtube.com/embed/WhWc3b3KhnY",
      embed: "https://www.youtube.com/embed/WhWc3b3KhnY",
      category: "Filme",
    },
  ];

  const anime = [
    {
      id: 1,
      title: "Área de Anime Original",
      genre: "Original",
      year: 2026,
      rating: "—",
      badge: "Seu conteúdo",
      description:
        "Use esta parte para projetos próprios, trailers de anime autoral ou títulos realmente licenciados.",
      poster:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
      trailer: "#",
      embed: "#",
      category: "Anime",
    },
    {
      id: 2,
      title: "Área de Anime Licenciado",
      genre: "Licenciado",
      year: 2026,
      rating: "—",
      badge: "Com permissão",
      description:
        "Reserve esta seção para obras com contrato, parceria ou autorização clara de exibição.",
      poster:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      trailer: "#",
      embed: "#",
      category: "Anime",
    },
  ];

  const plans = [
    {
      name: "Semanal",
      price: "R$ 15",
      period: "/semana",
      perks: ["Acesso ao catálogo", "Filmes com player", "Layout premium"],
    },
    {
      name: "Mensal",
      price: "R$ 30",
      period: "/mês",
      perks: ["Tudo do semanal", "Destaques exclusivos", "Experiência completa"],
    },
    {
      name: "Anual",
      price: "R$ 120",
      period: "/ano",
      perks: ["Tudo do mensal", "Melhor custo-benefício", "Plano destaque"],
    },
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
  }, [movies, query]);

  const accent = "from-red-600 via-rose-500 to-orange-400";

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.35),transparent_35%)]" />
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-gradient-to-r ${accent} blur-3xl`} />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-red-700 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-extrabold tracking-[0.25em] text-red-500">DRIKE</div>
              <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 md:block">
                vibe streaming 2026
              </div>
            </div>

            <nav className="flex flex-wrap gap-3 text-sm text-zinc-300">
              <a href="#filmes" className="rounded-full px-3 py-2 transition hover:bg-white/10">
                Filmes
              </a>
              <a href="#anime" className="rounded-full px-3 py-2 transition hover:bg-white/10">
                Animes
              </a>
              <a href="#planos" className="rounded-full px-3 py-2 transition hover:bg-white/10">
                Planos
              </a>
            </nav>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-100 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                {featured.subtitle}
              </div>
              <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight md:text-7xl">{featured.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">{featured.description}</p>

              <div className="mt-8 max-w-xl">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                  <Search className="h-5 w-5 text-zinc-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Pesquisar filmes, gênero ou descrição"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#filmes"
                  className={`rounded-2xl bg-gradient-to-r ${accent} px-5 py-3 font-medium text-white shadow-lg transition hover:scale-[1.02]`}
                >
                  Explorar catálogo
                </a>
                <a
                  href="#planos"
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-zinc-100 transition hover:bg-white/10"
                >
                  Ver planos
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/80 p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.25em] text-zinc-400">Em destaque</div>
                  <div className="mt-2 text-2xl font-bold">Sita Sings the Blues</div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                  reprodução aberta
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
                <img
                  src={movies[0].poster}
                  alt={movies[0].title}
                  className="h-[340px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="max-w-md text-sm leading-6 text-zinc-200">{movies[0].description}</p>
                  <button
                    onClick={() => setSelectedMovie(movies[0])}
                    className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:scale-[1.02]"
                  >
                    <Play className="h-5 w-5 fill-black" />
                    Dar play
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <section className="mb-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <Film className="h-5 w-5 text-red-400" />,
              title: "Capas e visual premium",
              text: "Cada filme agora tem poster grande, descrição e botão de play para uma experiência mais moderna.",
            },
            {
              icon: <Search className="h-5 w-5 text-red-400" />,
              title: "Pesquisa integrada",
              text: "A barra de busca ajuda a encontrar filme por nome, gênero ou descrição em segundos.",
            },
            {
              icon: <Crown className="h-5 w-5 text-red-400" />,
              title: "Player e planos",
              text: "Estrutura pronta para exibir vídeo, reproduzir obras abertas e mostrar seus planos premium.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
              <div className="mb-4 inline-flex rounded-2xl border border-red-400/20 bg-red-500/10 p-3">{item.icon}</div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{item.text}</p>
            </div>
          ))}
        </section>

        <section id="filmes" className="rounded-[2rem] border border-white/10 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Filmes</p>
              <h2 className="mt-2 text-3xl font-bold">Catálogo com capa, descrição e play</h2>
            </div>
            <div className="text-sm text-zinc-400">Use apenas obras abertas, grátis ou licenciadas para manter o Drike legal.</div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredMovies.map((movie) => (
              <article
                key={movie.id}
                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-xl transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="relative h-[380px] overflow-hidden">
                  <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium backdrop-blur">
                    {movie.badge}
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs backdrop-blur">
                    ⭐ {movie.rating}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{movie.title}</h3>
                      <p className="mt-1 text-sm text-zinc-400">{movie.genre} • {movie.year}</p>
                    </div>
                  </div>

                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-zinc-300">{movie.description}</p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedMovie(movie)}
                      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${accent} px-4 py-3 text-sm font-medium text-white transition hover:opacity-90`}
                    >
                      <Play className="h-4 w-4 fill-white" />
                      Dar play
                    </button>
                    <a
                      href={movie.trailer}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
                    >
                      Ver trailer
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="anime" className="mt-10 rounded-[2rem] border border-white/10 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Anime</p>
              <h2 className="mt-2 text-3xl font-bold">Área premium para anime</h2>
            </div>
            <div className="text-sm text-zinc-400">Parte reservada para conteúdo original ou oficialmente licenciado.</div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {anime.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-xl">
                <div className="relative h-[300px] overflow-hidden">
                  <img src={item.poster} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium backdrop-blur">
                    {item.badge}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{item.genre} • {item.year}</p>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="planos" className="mt-10 rounded-[2rem] border border-white/10 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur md:p-8">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Assinaturas</p>
            <h2 className="mt-2 text-3xl font-bold">Escolha seu plano</h2>
            <p className="mt-3 text-sm text-zinc-400">Estrutura visual premium para o Drike.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`rounded-[1.75rem] border ${index === 2 ? "border-red-500/40" : "border-white/10"} bg-zinc-950 p-6 shadow-xl`}
              >
                <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">{plan.name}</div>
                <div className="mt-4 flex items-end gap-2">
                  <div className="text-4xl font-extrabold">{plan.price}</div>
                  <div className="pb-1 text-zinc-400">{plan.period}</div>
                </div>
                <div className="mt-6 space-y-3 text-sm text-zinc-300">
                  {plan.perks.map((perk) => (
                    <div key={perk} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      {perk}
                    </div>
                  ))}
                </div>
                <button
                  className={`mt-6 w-full rounded-2xl ${index === 2 ? `bg-gradient-to-r ${accent}` : "bg-white/10"} px-4 py-3 font-medium transition hover:opacity-90`}
                >
                  Assinar agora
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-semibold">Drike</div>
            <div className="text-sm text-zinc-400">Streaming visual premium para obras abertas, gratuitas ou licenciadas.</div>
          </div>
          <div className="text-sm text-zinc-500">Atualizado para uma vibe moderna, sofisticada e mais completa.</div>
        </div>
      </footer>

      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <div className="text-xl font-bold">{selectedMovie.title}</div>
                <div className="text-sm text-zinc-400">{selectedMovie.genre} • {selectedMovie.year}</div>
              </div>
              <button
                onClick={() => setSelectedMovie(null)}
                className="rounded-2xl border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={selectedMovie.embed}
                title={selectedMovie.title}
                className="h-full w-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-[0.9fr_1.1fr]">
              <img src={selectedMovie.poster} alt={selectedMovie.title} className="h-full max-h-[340px] w-full rounded-[1.5rem] object-cover" />
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                  <Star className="h-3.5 w-3.5 text-yellow-400" />
                  {selectedMovie.rating} • {selectedMovie.badge}
                </div>
                <h3 className="text-3xl font-bold">{selectedMovie.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{selectedMovie.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={selectedMovie.trailer}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white/10"
                  >
                    Abrir trailer
                  </a>
                  <button
                    onClick={() => setSelectedMovie(null)}
                    className={`rounded-2xl bg-gradient-to-r ${accent} px-5 py-3 text-sm font-medium text-white`}
                  >
                    Fechar player
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
