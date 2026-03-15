rconst movies = [
    {
      id: 1,
      title: "Elephants Dream",
      genre: "Animação / Sci‑fi",
      year: 2006,
      rating: "7.0",
      badge: "CC BY",
      synopsis: "Curta aberto do Blender Studio, ótimo para catálogo legal com link direto autorizado.",
      watch: "https://archive.org/details/elephants_dream",
      trailer: "https://orange.blender.org/",
    },
    {
      id: 2,
      title: "Big Buck Bunny",
      genre: "Animação / Comédia",
      year: 2008,
      rating: "7.4",
      badge: "CC BY",
      synopsis: "Curta aberto muito conhecido, indicado para a área grátis do Drike.",
      watch: "https://archive.org/details/BigBuckBunny_328",
      trailer: "https://peach.blender.org/",
    },
    {
      id: 3,
      title: "Sita Sings the Blues",
      genre: "Animação / Musical",
      year: 2008,
      rating: "7.6",
      badge: "CC0 / domínio público dedicado",
      synopsis: "Longa liberado em CC0, podendo entrar no catálogo legal do site.",
      watch: "https://archive.org/details/Sita_Sings_the_Blues",
      trailer: "https://en.wikipedia.org/wiki/Sita_Sings_the_Blues",
    },
    {
      id: 4,
      title: "Sintel",
      genre: "Animação / Fantasia",
      year: 2010,
      rating: "7.5",
      badge: "CC BY",
      synopsis: "Curta aberto do Blender Studio com ótima apresentação visual para streaming.",
      watch: "https://archive.org/details/Sintel",
      trailer: "https://durian.blender.org/",
    },
    {
      id: 5,
      title: "Tears of Steel",
      genre: "Sci‑fi",
      year: 2012,
      rating: "6.6",
      badge: "CC BY",
      synopsis: "Filme curto aberto do Blender Studio, útil para ampliar a biblioteca legal.",
      watch: "https://archive.org/details/TearsOfSteel",
      trailer: "https://mango.blender.org/",
    },
    {
      id: 6,
      title: "Spring",
      genre: "Animação / Fantasia",
      year: 2019,
      rating: "7.1",
      badge: "CC BY 4.0",
      synopsis: "Curta aberto recente do Blender Studio, bom para mostrar títulos modernos legais.",
      watch: "https://studio.blender.org/films/spring/",
      trailer: "https://studio.blender.org/films/spring/",
    },
    {
      id: 7,
      title: "Seder-Masochism",
      genre: "Animação / Musical",
      year: 2018,
      rating: "7.0",
      badge: "CC0 / domínio público dedicado",
      synopsis: "Longa liberado em CC0 pela autora, adequado para catálogo livre.",
      watch: "https://archive.org/details/sedermasochism",
      trailer: "https://en.wikipedia.org/wiki/Seder-Masochism",
    },
  ];

  const anime = [
    {
      id: 1,
      title: "Área para animes próprios",
      genre: "Original",
      year: 2026,
      rating: "—",
      badge: "Produção própria",
      synopsis: "Use esta seção para animes criados por você ou licenciados oficialmente para distribuição.",
      watch: "#",
      trailer: "#",
    },
    {
      id: 2,
      title: "Área para anime licenciado",
      genre: "Licenciado",
      year: 2026,
      rating: "—",
      badge: "Com autorização",
      synopsis: "Adicione aqui apenas títulos com contrato, licença ou permissão clara de uso.",
      watch: "#",
      trailer: "#",
    },
    {
      id: 3,
      title: "Área para curtas autorais",
      genre: "Curta",
      year: 2026,
      rating: "—",
      badge: "Seguro para uso",
      synopsis: "Boa opção para publicar projetos seus, collabs ou obras abertas com permissão confirmada.",
      watch: "#",
      trailer: "#",
    },
  ];

  const plans = [
    {
      name: "Semanal",
      price: "R$ 15",
      period: "/semana",
      perks: ["Acesso ao catálogo Drike", "Área de filmes", "Área de animes"],
    },
    {
      name: "Mensal",
      price: "R$ 30",
      period: "/mês",
      perks: ["Tudo do semanal", "Destaques exclusivos", "Perfil premium visual"],
    },
    {
      name: "Anual",
      price: "R$ 120",
      period: "/ano",
      perks: ["Tudo do mensal", "Melhor custo-benefício", "Plano em destaque"],
    },
  ];

  const accent = "from-red-500 via-pink-500 to-orange-400";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.28),transparent_35%)]" />
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute -top-10 left-1/4 h-56 w-56 rounded-full bg-gradient-to-r ${accent} blur-3xl`} />
          <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-red-700 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-100 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Drike • estilo streaming premium
          </div>

          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
                {featured.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-zinc-200">{featured.subtitle}</p>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 md:text-lg">{featured.description}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#filmes"
                  className={`rounded-2xl bg-gradient-to-r ${accent} px-5 py-3 font-medium text-white shadow-lg transition hover:scale-[1.02]`}
                >
                  Explorar filmes
                </a>
                <a
                  href="#planos"
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-zinc-100 transition hover:bg-white/10"
                >
                  Ver planos
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/80 p-6 shadow-2xl">
              <div className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-400">Em destaque</div>
              <div className="rounded-[1.5rem] bg-gradient-to-br from-red-700 via-zinc-900 to-black p-6">
                <div className="text-sm text-red-200">Catálogo legal</div>
                <div className="mt-2 text-3xl font-bold">Filmes + Animes</div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  Estrutura pronta para separar filmes, animes e planos de assinatura com um visual forte inspirado em plataformas de streaming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <section id="como-funciona" className="mb-12 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "1. Filmes grátis",
              text: "Área dedicada a obras em domínio público, gratuitas ou claramente autorizadas para exibição.",
            },
            {
              title: "2. Animes autorizados",
              text: "Use esta seção apenas para anime próprio, licenciado ou com permissão real de distribuição.",
            },
            {
              title: "3. Assinaturas",
              text: "O site agora tem planos semanal, mensal e anual para você apresentar sua estrutura premium.",
            },
          ].map((step) => (
            <div key={step.title} className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
              <h2 className="text-xl font-semibold">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{step.text}</p>
            </div>
          ))}
        </section>

        <section id="filmes" className="rounded-[2rem] border border-white/10 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Filmes</p>
              <h2 className="mt-2 text-3xl font-bold">Catálogo de filmes grátis</h2>
            </div>
            <div className="text-sm text-zinc-400">Seleção pensada para obras abertas, gratuitas, de domínio público ou autorizadas.</div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {movies.map((item, index) => (
              <article key={item.id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-xl transition hover:-translate-y-1 hover:border-white/20">
                <div
                  className={`relative flex h-72 items-end bg-gradient-to-br ${
                    index % 3 === 0
                      ? "from-red-700/90 to-black"
                      : index % 3 === 1
                      ? "from-zinc-700 to-black"
                      : "from-amber-700/80 to-black"
                  } p-5`}
                >
                  <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur">{item.badge}</div>
                  <div className="absolute bottom-5 right-5 rounded-full bg-black/35 px-3 py-1 text-xs backdrop-blur">⭐ {item.rating}</div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{item.genre} • {item.year}</p>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">{item.synopsis}</p>

                  <div className="mt-5 flex gap-3">
                    <a href={item.trailer} className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-medium transition hover:bg-white/10">
                      Trailer
                    </a>
                    <a href={item.watch} className={`flex-1 rounded-2xl bg-gradient-to-r ${accent} px-4 py-3 text-center text-sm font-medium transition hover:opacity-90`}>
                      Assistir
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
              <h2 className="mt-2 text-3xl font-bold">Área de animes</h2>
            </div>
            <div className="text-sm text-zinc-400">Estrutura preparada para animes originais ou licenciados. Não preencha com anime protegido sem autorização.</div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {anime.map((item, index) => (
              <article key={item.id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-xl transition hover:-translate-y-1 hover:border-white/20">
                <div className={`relative flex h-72 items-end bg-gradient-to-br ${index % 2 === 0 ? "from-fuchsia-700/80 to-black" : "from-cyan-700/70 to-black"} p-5`}>
                  <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur">{item.badge}</div>
                  <div className="absolute bottom-5 right-5 rounded-full bg-black/35 px-3 py-1 text-xs backdrop-blur">⭐ {item.rating}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{item.genre} • {item.year}</p>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">{item.synopsis}</p>
                  <div className="mt-5 flex gap-3">
                    <a href={item.trailer} className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-medium transition hover:bg-white/10">
                      Trailer
                    </a>
                    <a href={item.watch} className={`flex-1 rounded-2xl bg-gradient-to-r ${accent} px-4 py-3 text-center text-sm font-medium transition hover:opacity-90`}>
                      Assistir
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="planos" className="mt-10 rounded-[2rem] border border-white/10 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur md:p-8">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Assinaturas</p>
            <h2 className="mt-2 text-3xl font-bold">Escolha seu plano</h2>
            <p className="mt-3 text-sm text-zinc-400">Estrutura visual de pagamentos pronta para o Drike.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div key={plan.name} className={`rounded-[1.75rem] border ${index === 2 ? "border-red-500/40" : "border-white/10"} bg-zinc-950 p-6 shadow-xl`}>
                <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">{plan.name}</div>
                <div className="mt-4 flex items-end gap-2">
                  <div className="text-4xl font-extrabold">{plan.price}</div>
                  <div className="pb-1 text-zinc-400">{plan.period}</div>
                </div>
                <div className="mt-6 space-y-3 text-sm text-zinc-300">
                  {plan.perks.map((perk) => (
                    <div key={perk} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{perk}</div>
                  ))}
                </div>
                <button className={`mt-6 w-full rounded-2xl ${index === 2 ? `bg-gradient-to-r ${accent}` : "bg-white/10"} px-4 py-3 font-medium transition hover:opacity-90`}>
                  Assinar agora
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-zinc-900 p-6 md:p-8">
            <h2 className="text-2xl font-bold">Como usar esta versão do Drike</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-300">
              <p>
                Os filmes já estão organizados em uma parte própria e a área de anime foi separada para você administrar melhor o catálogo.
              </p>
              <p>
                Os planos semanal, mensal e anual já aparecem na interface, então o site ficou com uma cara mais próxima de uma plataforma premium.
              </p>
              <p>
                Depois, basta substituir os links de assistir e trailer por páginas autorizadas, conteúdo próprio ou obras realmente liberadas.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-500/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-emerald-300">Importante</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-200">
              O visual pode ser de streaming, mas para colocar filmes, séries e animes completos no ar você ainda precisa que eles sejam de domínio público, próprios ou licenciados.
            </p>
            <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-black/20 p-4 text-sm text-zinc-100">
              Esta versão foi ajustada para um uso mais seguro: catálogo legal, seção de planos e espaço para títulos gratuitos ou autorizados.
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-zinc-950 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-semibold">Drike</div>
            <div className="text-sm text-zinc-400">Catálogo online de filmes, séries e animes com foco em divulgação legal.</div>
          </div>
          <div className="text-sm text-zinc-500">Feito para publicação gratuita e aberta ao público.</div>
        </div>
      </footer>
    </div>
  );
}
