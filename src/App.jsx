const movies = [
  {
    id: 1,
    title: 'O Gabinete do Dr. Caligari',
    genre: 'Suspense',
    year: 1920,
    rating: '8.2',
    badge: 'Domínio público',
    synopsis: 'Clássico expressionista para compor a ala de filmes gratuitos do catálogo.',
    watch: '#',
    trailer: '#',
  },
  {
    id: 2,
    title: 'Nosferatu',
    genre: 'Terror',
    year: 1922,
    rating: '8.0',
    badge: 'Domínio público',
    synopsis: 'Um dos títulos clássicos mais conhecidos para uma seleção legal de filmes antigos.',
    watch: '#',
    trailer: '#',
  },
  {
    id: 3,
    title: 'A General',
    genre: 'Aventura',
    year: 1926,
    rating: '8.1',
    badge: 'Domínio público',
    synopsis: 'Comédia de aventura ideal para enriquecer a sessão de filmes grátis do site.',
    watch: '#',
    trailer: '#',
  },
  {
    id: 4,
    title: 'Metrópolis',
    genre: 'Ficção científica',
    year: 1927,
    rating: '8.3',
    badge: 'Verificar versão liberada',
    synopsis: 'Visual futurista forte para destacar o catálogo usando apenas versões com uso permitido.',
    watch: '#',
    trailer: '#',
  },
]

const anime = [
  {
    id: 1,
    title: 'Projeto Aurora',
    genre: 'Aventura',
    year: 2025,
    rating: '9.0',
    badge: 'Original / autorizado',
    synopsis: 'Espaço reservado para anime próprio, licenciado ou com permissão de uso.',
    watch: '#',
    trailer: '#',
  },
  {
    id: 2,
    title: 'Lâmina Celeste',
    genre: 'Fantasia',
    year: 2024,
    rating: '9.4',
    badge: 'Original / autorizado',
    synopsis: 'Seção pensada para animes com licença, produção própria ou distribuição permitida.',
    watch: '#',
    trailer: '#',
  },
  {
    id: 3,
    title: 'Arquivo Neon',
    genre: 'Sci-fi',
    year: 2026,
    rating: '8.8',
    badge: 'Original / autorizado',
    synopsis: 'Anime conceitual para você substituir por títulos realmente liberados para o site.',
    watch: '#',
    trailer: '#',
  },
]

const plans = [
  {
    name: 'Semanal',
    price: 'R$ 15',
    period: '/semana',
    perks: ['Acesso ao catálogo Drike', 'Área de filmes', 'Área de animes'],
  },
  {
    name: 'Mensal',
    price: 'R$ 30',
    period: '/mês',
    perks: ['Tudo do semanal', 'Destaques exclusivos', 'Perfil premium visual'],
  },
  {
    name: 'Anual',
    price: 'R$ 120',
    period: '/ano',
    perks: ['Tudo do mensal', 'Melhor custo-benefício', 'Plano em destaque'],
  },
]

function Card({ item, animeMode = false }) {
  return (
    <article className="card">
      <div className={`poster ${animeMode ? 'poster-anime' : 'poster-movie'}`}>
        <span className="badge">{item.badge}</span>
        <span className="rating">★ {item.rating}</span>
      </div>
      <div className="card-body">
        <h3>{item.title}</h3>
        <p className="meta">{item.genre} • {item.year}</p>
        <p className="synopsis">{item.synopsis}</p>
        <div className="actions">
          <a href={item.trailer} className="btn btn-secondary">Trailer</a>
          <a href={item.watch} className="btn btn-primary">Assistir</a>
        </div>
      </div>
    </article>
  )
}

function PlanCard({ plan, highlight }) {
  return (
    <div className={`plan-card ${highlight ? 'plan-highlight' : ''}`}>
      <div className="plan-name">{plan.name}</div>
      <div className="plan-price-wrap">
        <div className="plan-price">{plan.price}</div>
        <div className="plan-period">{plan.period}</div>
      </div>
      <div className="plan-perks">
        {plan.perks.map((perk) => (
          <div key={perk} className="perk">{perk}</div>
        ))}
      </div>
      <button className={`btn ${highlight ? 'btn-primary' : 'btn-secondary'} full`}>Assinar agora</button>
    </div>
  )
}

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <div className="hero-overlay" />
        <nav className="nav container">
          <div className="brand">DRIKE</div>
          <div className="nav-links">
            <a href="#filmes">Filmes</a>
            <a href="#animes">Animes</a>
            <a href="#planos">Planos</a>
          </div>
        </nav>

        <div className="hero-content container">
          <div className="pill">Drike • estilo streaming premium</div>
          <h1>Drike Originals</h1>
          <p className="hero-subtitle">
            Catálogo estilo streaming com foco em obras gratuitas, domínio público e títulos autorizados.
          </p>
          <p className="hero-description">
            Use este modelo para organizar filmes, séries e animes gratuitos ou com licença adequada.
            O visual foi ajustado para uma experiência mais parecida com plataformas de streaming.
          </p>
          <div className="hero-actions">
            <a href="#filmes" className="btn btn-primary">Explorar filmes</a>
            <a href="#planos" className="btn btn-secondary">Ver planos</a>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <section className="info-grid">
          <div className="info-box">
            <h2>1. Filmes grátis</h2>
            <p>Área dedicada a obras em domínio público, gratuitas ou claramente autorizadas para exibição.</p>
          </div>
          <div className="info-box">
            <h2>2. Animes autorizados</h2>
            <p>Use esta seção apenas para anime próprio, licenciado ou com permissão real de distribuição.</p>
          </div>
          <div className="info-box">
            <h2>3. Assinaturas</h2>
            <p>O site agora tem planos semanal, mensal e anual para apresentar sua estrutura premium.</p>
          </div>
        </section>

        <section id="filmes" className="section-block">
          <div className="section-header">
            <div>
              <span className="section-kicker">Filmes</span>
              <h2>Catálogo de filmes grátis</h2>
            </div>
            <p>Seleção pensada para obras gratuitas, de domínio público ou autorizadas.</p>
          </div>
          <div className="grid four">
            {movies.map((item) => <Card key={item.id} item={item} />)}
          </div>
        </section>

        <section id="animes" className="section-block">
          <div className="section-header">
            <div>
              <span className="section-kicker">Anime</span>
              <h2>Área de animes</h2>
            </div>
            <p>Estrutura preparada para títulos originais, licenciados ou liberados.</p>
          </div>
          <div className="grid three">
            {anime.map((item) => <Card key={item.id} item={item} animeMode />)}
          </div>
        </section>

        <section id="planos" className="section-block">
          <div className="pricing-header">
            <span className="section-kicker">Assinaturas</span>
            <h2>Escolha seu plano</h2>
            <p>Estrutura visual de pagamentos pronta para o Drike.</p>
          </div>
          <div className="grid three">
            {plans.map((plan, index) => <PlanCard key={plan.name} plan={plan} highlight={index === 2} />)}
          </div>
        </section>

        <section className="bottom-grid">
          <div className="bottom-box">
            <h2>Como usar esta versão do Drike</h2>
            <p>Os filmes já estão organizados em uma parte própria e a área de anime foi separada para você administrar melhor o catálogo.</p>
            <p>Os planos semanal, mensal e anual já aparecem na interface, então o site ficou com uma cara mais próxima de uma plataforma premium.</p>
            <p>Depois, basta substituir os links de assistir e trailer por páginas autorizadas, conteúdo próprio ou obras realmente liberadas.</p>
          </div>
          <div className="bottom-box bottom-highlight">
            <h2>Importante</h2>
            <p>O visual pode ser de streaming, mas para colocar filmes, séries e animes completos no ar você ainda precisa que eles sejam de domínio público, próprios ou licenciados.</p>
            <div className="notice">Esta versão foi ajustada para um uso mais seguro: catálogo legal, seção de planos e espaço para títulos gratuitos ou autorizados.</div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-wrap">
          <div>
            <div className="footer-brand">Drike</div>
            <div className="footer-text">Catálogo online de filmes e animes com foco em divulgação legal.</div>
          </div>
          <div className="footer-text">Feito para publicação gratuita e aberta ao público.</div>
        </div>
      </footer>
    </div>
  )
}
