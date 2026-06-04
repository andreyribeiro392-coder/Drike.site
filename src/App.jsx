import React, { useState, useEffect } from 'react';

// Banco de Dados de Exercícios (Você pode adicionar mais depois)
const EXERCICIOS_DB = [
  { id: 1, nome: 'Supino Reto com Barra', categoria: 'Peito', alvo: 'Peitoral Maior', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop' },
  { id: 2, nome: 'Agachamento Livre', categoria: 'Pernas', alvo: 'Quadríceps e Glúteos', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=500&auto=format&fit=crop' },
  { id: 3, nome: 'Puxada Alta na Polia', categoria: 'Costas', alvo: 'Dorsais', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=500&auto=format&fit=crop' },
  { id: 4, nome: 'Rosca Direta', categoria: 'Bíceps', alvo: 'Bíceps Braquial', img: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=500&auto=format&fit=crop' },
  { id: 5, nome: 'Elevação Lateral', categoria: 'Ombros', alvo: 'Deltóide Lateral', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop' },
  { id: 6, nome: 'Tríceps Corda', categoria: 'Tríceps', alvo: 'Tríceps', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=500&auto=format&fit=crop' },
];

const CATEGORIAS = ['Todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Bíceps', 'Tríceps'];

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // Estados do Módulo de Treinos
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  
  // Estados do Cronômetro
  const [tempo, setTempo] = useState(0);
  const [timerAtivo, setTimerAtivo] = useState(false);
  const [mostrarTimer, setMostrarTimer] = useState(false);

  // Lógica do Cronômetro
  useEffect(() => {
    let intervalo = null;
    if (timerAtivo && tempo > 0) {
      intervalo = setInterval(() => setTempo((t) => t - 1), 1000);
    } else if (tempo === 0 && timerAtivo) {
      setTimerAtivo(false);
      // Aqui tocaria um som de 'BEEP' no futuro
    }
    return () => clearInterval(intervalo);
  }, [timerAtivo, tempo]);

  const iniciarDescanso = (segundos) => {
    setTempo(segundos);
    setTimerAtivo(true);
    setMostrarTimer(true);
  };

  const fecharTimer = () => {
    setTimerAtivo(false);
    setMostrarTimer(false);
  };

  // Lógica de Filtro dos Exercícios
  const treinosFiltrados = EXERCICIOS_DB.filter(ex => {
    const bateCategoria = categoriaAtiva === 'Todos' || ex.categoria === categoriaAtiva;
    const bateBusca = ex.nome.toLowerCase().includes(busca.toLowerCase());
    return bateCategoria && bateBusca;
  });

  // Formatar tempo (ex: 60s vira 01:00)
  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60).toString().padStart(2, '0');
    const seg = (segundos % 60).toString().padStart(2, '0');
    return `${min}:${seg}`;
  };

  return (
    <div className="saas-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand-logo">AURA FITNESS</div>
        <nav className="nav-menu">
          <button className={`nav-item ${activeModule === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveModule('dashboard')}>📊 Dashboard</button>
          <button className={`nav-item ${activeModule === 'treinos' ? 'active' : ''}`} onClick={() => setActiveModule('treinos')}>💪 Meus Treinos</button>
          <button className={`nav-item ${activeModule === 'nutricao' ? 'active' : ''}`} onClick={() => setActiveModule('nutricao')}>🍎 Nutrição</button>
          <button className={`nav-item ${activeModule === 'ia' ? 'active' : ''}`} onClick={() => setActiveModule('ia')}>🧠 IA Coach</button>
          <button className={`nav-item ${activeModule === 'comunidade' ? 'active' : ''}`} onClick={() => setActiveModule('comunidade')}>🔥 Comunidade</button>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="main-content">
        
        {/* ===================== MÓDULO: DASHBOARD ===================== */}
        {activeModule === 'dashboard' && (
          <div style={{ animation: 'fadeInSlide 0.4s' }}>
             <header className="topbar">
              <div className="greeting">
                <h2>Bem-vindo de volta, Atleta.</h2>
                <p>Nível 12 • Focado na Missão</p>
              </div>
              <div className="profile-widget">
                <div className="user-info" style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontWeight: 'bold' }}>Sua Conta</span>
                  <span style={{ fontSize: '0.8rem', color: '#8a8d98' }}>Pro Member</span>
                </div>
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" alt="Avatar" className="avatar" />
              </div>
            </header>
            {/* Cards do Dashboard */}
            <section className="stats-grid">
              <div className="stat-card">
                <h3>🔥 Calorias Hoje</h3>
                <div className="stat-value">1,240</div>
              </div>
              <div className="stat-card">
                <h3>💧 Hidratação</h3>
                <div className="stat-value">1.5 L</div>
              </div>
              <div className="stat-card">
                <h3>📈 Meta de Peso</h3>
                <div className="stat-value">76.5 kg</div>
              </div>
            </section>
          </div>
        )}

        {/* ===================== MÓDULO: MEUS TREINOS ===================== */}
        {activeModule === 'treinos' && (
          <div className="module-treinos">
            <div className="module-header">
              <h2>Biblioteca de Treinos Premium</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Filtre por músculo e inicie seu descanso cronometrado.</p>
            </div>

            <input 
              type="text" 
              className="search-bar" 
              placeholder="🔍 Buscar exercício (ex: Supino, Agachamento...)"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            <div className="category-filters">
              {CATEGORIAS.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-btn ${categoriaAtiva === cat ? 'active' : ''}`}
                  onClick={() => setCategoriaAtiva(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="exercises-grid" style={{ marginTop: '30px' }}>
              {treinosFiltrados.map(ex => (
                <div className="ex-card" key={ex.id}>
                  {/* Dica: Futuramente você pode usar suas artes de inteligência artificial 3D no lugar destas imagens */}
                  <img src={ex.img} alt={ex.nome} className="ex-image" />
                  <div className="ex-content">
                    <span className="ex-target">🎯 {ex.alvo}</span>
                    <h3 className="ex-title">{ex.nome}</h3>
                    <div className="ex-btn-group">
                      <button className="btn-timer" onClick={() => iniciarDescanso(60)}>⏱️ Descanso (60s)</button>
                      <button className="btn-timer" style={{ background: 'var(--bg-input)', color: '#fff', borderColor: 'var(--border-glow)' }}>Detalhes</button>
                    </div>
                  </div>
                </div>
              ))}
              
              {treinosFiltrados.length === 0 && (
                <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>Nenhum exercício encontrado para essa busca.</p>
              )}
            </div>
          </div>
        )}

        {/* ===================== OUTROS MÓDULOS (Em breve) ===================== */}
        {['nutricao', 'ia', 'comunidade'].includes(activeModule) && (
          <div style={{ textAlign: 'center', marginTop: '100px', animation: 'fadeInSlide 0.4s' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Módulo {activeModule.toUpperCase()} 🚧</h2>
            <p style={{ color: '#8a8d98', fontSize: '1.2rem' }}>A arquitetura deste módulo está sendo preparada.</p>
          </div>
        )}

      </main>

      {/* CRONÔMETRO FLUTUANTE GLOBAL */}
      {mostrarTimer && (
        <div className="premium-timer-overlay">
          <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Recuperação Ativa</h4>
          <div className="timer-display">
            {formatarTempo(tempo)}
          </div>
          <div className="timer-controls">
            {timerAtivo ? (
              <button className="timer-btn" onClick={() => setTimerAtivo(false)}>Pausar</button>
            ) : (
              <button className="timer-btn" style={{ background: 'var(--fitness-green)', color: '#000', borderColor: 'var(--fitness-green)' }} onClick={() => setTimerAtivo(true)}>Retomar</button>
            )}
            <button className="timer-btn stop" onClick={fecharTimer}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
