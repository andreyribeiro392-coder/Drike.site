import React, { useMemo, useState } from 'react';

export default function DrikeStreamingSite() {

  const catalog = [
    {
      id: 1,
      title: "Horizonte Rubro",
      type: "Filme",
      genre: "Ação",
      year: 2026,
      rating: 8.7,
      description: "Uma corrida contra o tempo em uma megacidade dominada por tecnologia e conspirações.",
      cover: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=800&q=80",
      banner: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "Noite Eclipse",
      type: "Série",
      genre: "Terror",
      year: 2025,
      rating: 8.2,
      description: "Mistérios sombrios surgem quando uma cidade inteira começa a desaparecer do mapa.",
      cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      banner: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80",
      featured: true,
    },
    {
      id: 3,
      title: "Arcadia Zero",
      type: "Anime",
      genre: "Ficção Científica",
      year: 2026,
      rating: 9.1,
      description: "Jovens pilotos enfrentam ameaças interestelares em uma estação perdida no espaço.",
      cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      banner: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80",
      featured: true,
    },
    {
      id: 4,
      title: "Velocidade de Aço",
      type: "Filme",
      genre: "Corrida",
      year: 2024,
      rating: 7.9,
      description: "Pilotos rivais disputam um campeonato clandestino onde tudo pode acontecer.",
      cover: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
      banner: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1400&q=80",
      featured: false,
    },
    {
      id: 5,
      title: "Cidade Neon",
      type: "Série",
      genre: "Drama",
      year: 2026,
      rating: 8.5,
      description: "Entre poder, fama e perigo, vidas colidem sob luzes que nunca se apagam.",
      cover: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
      banner: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80",
      featured: false,
    },
    {
      id: 6,
      title: "Tempestade Celeste",
      type: "Anime",
      genre: "Aventura",
      year: 2025,
      rating: 8.9,
      description: "Heróis improváveis cruzam reinos suspensos para salvar a última chama do céu.",
      cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
      banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
      featured: false,
    },
    {
      id: 7,
      title: "Código Fantasma",
      type: "Filme",
      genre: "Suspense",
      year: 2023,
      rating: 7.8,
      description: "Um invasor digital encontra uma verdade que deveria permanecer enterrada.",
      cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
      featured: false,
    },
    {
      id: 8,
      title: "Lendas de Ônix",
      type: "Série",
      genre: "Fantasia",
      year: 2024,
      rating: 8.4,
      description: "Clãs antigos despertam poderes proibidos em um mundo à beira da ruína.",
      cover: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80",
      banner: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80",
      featured: false,
    },
    {
      id: 9,
      title: "Sombras do Amanhã",
      type: "Anime",
      genre: "Drama",
      year: 2026,
      rating: 9.0,
      description: "Um grupo de estudantes descobre fragmentos do futuro em sonhos compartilhados.",
      cover: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
      banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
      featured: false,
    },
  ];

  const sections = [
    { title: "Em destaque", filter: (item) => item.featured },
    { title: "Filmes populares", filter: (item) => item.type === "Filme" },
    { title: "Séries em alta", filter: (item) => item.type === "Série" },
    { title: "Animes populares", filter: (item) => item.type === "Anime" },
    { title: "Ação", filter: (item) => item.genre === "Ação" },
    { title: "Terror", filter: (item) => item.genre === "Terror" },
    { title: "Drama", filter: (item) => item.genre === "Drama" },
    { title: "Ficção científica", filter: (item) => item.genre === "Ficção Científica" },
  ];

  const featured = catalog.find((item) => item.featured) || catalog[0];
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(featured);
  const [myList, setMyList] = useState([catalog[2], catalog[4]]);
  const [user, setUser] = useState(null);

  const results = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return catalog.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.genre.toLowerCase().includes(q) ||
        String(item.year).includes(q)
    );
  }, [search]);

  const toggleMyList = (item) => {
    setMyList((prev) =>
      prev.some((entry) => entry.id === item.id)
        ? prev.filter((entry) => entry.id !== item.id)
        : [...prev, item]
    );
  };

  const fakeGoogleLogin = () => {
    setUser({
      name: "Seu nome",
      email: "seuemail@gmail.com",
      avatar: "https://ui-avatars.com/api/?name=Drike&background=7f1d1d&color=fff",
    });
  };

  const NavLink = ({ children }) => (
    <button className="text-sm text-zinc-300 transition hover:text-white">{children}</button>
  );

  const ContentCard = ({ item }) => {
    const saved = myList.some((entry) => entry.id === item.id);
    return (
      <div className="group relative min-w-[190px] max-w-[190px] overflow-hidden rounded-2xl bg-zinc-900 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <img src={item.cover} alt={item.title} className="h-64 w-full object-cover" />
        <div className="p-3">
          <div className="line-clamp-1 font-semibold text-white">{item.title}</div>
          <div className="mt-1 text-xs text-zinc-400">{item.type} • {item.genre}</div>
          <div className="mt-1 text-xs text-zinc-500">{item.year} • ⭐ {item.rating}</div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/70 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
          <div className="mb-2 text-sm font-semibold text-white">{item.title}</div>
          <div className="mb-3 line-clamp-3 text-xs text-zinc-300">{item.description}</div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelected(item)}
              className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200"
            >
              Assistir
            </button>
            <button
              onClick={() => toggleMyList(item)}
              className="rounded-full border border-zinc-500 px-3 py-2 text-xs font-semibold text-white transition hover:border-white"
            >
              {saved ? "Remover" : "+ Lista"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Section = ({ title, items }) => (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <button className="text-sm text-zinc-400 hover:text-white">Ver tudo</button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <ContentCard key={`${title}-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-8">
            <div className="text-3xl font-black tracking-[0.25em] text-red-700">DRIKE</div>
            <div className="hidden items-center gap-5 md:flex">
              <NavLink>Início</NavLink>
              <NavLink>Filmes</NavLink>
              <NavLink>Séries</NavLink>
              <NavLink>Animes</NavLink>
              <NavLink>Categorias</NavLink>
              <NavLink>Minha Lista</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar filme, série, anime, categoria ou ano"
                className="w-80 rounded-full border border-white/10 bg-zinc-950/90 px-4 py-2 text-sm text-white outline-none ring-0 placeholder:text-zinc-500 focus:border-red-800"
              />
              {search && (
                <div className="absolute right-0 top-12 max-h-80 w-full overflow-auto rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-2xl shadow-black/50">
                  {results.length ? (
                    results.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelected(item);
                          setSearch("");
                        }}
                        className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/5"
                      >
                        <img src={item.cover} alt={item.title} className="h-14 w-10 rounded object-cover" />
                        <div>
                          <div className="font-medium text-white">{item.title}</div>
                          <div className="text-xs text-zinc-400">{item.type} • {item.year}</div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-zinc-400">Nenhum resultado encontrado.</div>
                  )}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-zinc-900/80 px-2 py-1">
                <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                <div className="hidden md:block">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-zinc-400">Conta Google</div>
                </div>
                <button
                  onClick={() => setUser(null)}
                  className="rounded-full bg-white/5 px-3 py-2 text-xs text-zinc-200 transition hover:bg-white/10"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={fakeGoogleLogin}
                className="rounded-full bg-red-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Entrar com Google
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="pt-24">
        <section className="relative min-h-[78vh] overflow-hidden">
          <img src={featured.banner} alt={featured.title} className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="relative mx-auto flex max-w-7xl items-end px-4 pb-16 pt-20 md:px-6">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex rounded-full border border-red-800/40 bg-red-900/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-red-300">
                Destaque Drike
              </div>
              <h1 className="text-4xl font-black leading-tight md:text-6xl">{featured.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
                <span>{featured.type}</span>
                <span>•</span>
                <span>{featured.genre}</span>
                <span>•</span>
                <span>{featured.year}</span>
                <span>•</span>
                <span>⭐ {featured.rating}</span>
              </div>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-200 md:text-lg">{featured.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelected(featured)}
                  className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
                >
                  Assistir
                </button>
                <button className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15">
                  Mais informações
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          {sections.map((section) => {
            const items = catalog.filter(section.filter);
            if (!items.length) return null;
            return <Section key={section.title} title={section.title} items={items} />;
          })}

          <section className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/30">
              <div className="relative h-72 w-full md:h-96">
                <img src={selected.banner} alt={selected.title} className="h-full w-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-red-300">Player modelo</div>
                  <h3 className="mt-2 text-3xl font-black">{selected.title}</h3>
                  <div className="mt-2 text-sm text-zinc-300">{selected.type} • {selected.genre} • {selected.year} • ⭐ {selected.rating}</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-3xl backdrop-blur-md transition hover:scale-105 hover:bg-white/15">
                    ▶
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-zinc-300">{selected.description}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-full bg-red-800 px-5 py-3 font-semibold text-white transition hover:bg-red-700">Assistir</button>
                  <button
                    onClick={() => toggleMyList(selected)}
                    className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    {myList.some((entry) => entry.id === selected.id) ? "Remover da lista" : "Adicionar à lista"}
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/30">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold">Minha Lista</h3>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">{myList.length} itens</span>
              </div>
              <div className="space-y-3">
                {myList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-2 text-left transition hover:bg-white/5"
                  >
                    <img src={item.cover} alt={item.title} className="h-16 w-12 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <div className="truncate font-medium text-white">{item.title}</div>
                      <div className="text-xs text-zinc-400">{item.type} • {item.genre} • {item.year}</div>
                    </div>
                  </button>
                ))}
                {!myList.length && <div className="text-sm text-zinc-500">Sua lista está vazia.</div>}
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-red-900/40 bg-red-950/10 p-4">
                <div className="text-sm font-semibold text-red-300">Planos futuros</div>
                <div className="mt-2 space-y-1 text-sm text-zinc-400">
                  <div>Semanal: R$ 10,00</div>
                  <div>Mensal: R$ 30,00</div>
                  <div>Anual: R$ 75,99</div>
                </div>
                <p className="mt-3 text-xs leading-6 text-zinc-500">
                  Área visual pronta para futura monetização. Atualmente o site permanece aberto, sem cobrança e sem bloqueio de acesso.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-zinc-400 md:grid-cols-4 md:px-6">
          <div>
            <div className="mb-3 text-lg font-bold text-white">Drike</div>
            <p className="leading-7">Plataforma de entretenimento com visual premium, busca inteligente e catálogo pronto para expansão.</p>
          </div>
          <div>
            <div className="mb-3 font-semibold text-white">Conteúdo</div>
            <div className="space-y-2">
              <div>Filmes</div>
              <div>Séries</div>
              <div>Animes</div>
              <div>Categorias</div>
            </div>
          </div>
          <div>
            <div className="mb-3 font-semibold text-white">Explorar</div>
            <div className="space-y-2">
              <div>Lançamentos</div>
              <div>Mais vistos</div>
              <div>Minha Lista</div>
              <div>Gêneros</div>
            </div>
          </div>
          <div>
            <div className="mb-3 font-semibold text-white">Suporte</div>
            <div className="space-y-2">
              <div>Ajuda</div>
              <div>Termos de uso</div>
              <div>Privacidade</div>
              <div>Contato</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 px-4 py-5 text-center text-sm text-zinc-500 md:px-6">
          Drike © Plataforma de entretenimento
        </div>
      </footer>
    </div>
  );
}
