import React, { useState } from 'react';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <div className="saas-layout">
      {/* SIDEBAR - Navegação Premium */}
      <aside className="sidebar">
        <div className="brand-logo">AURA FITNESS</div>
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeModule === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveModule('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-item ${activeModule === 'treinos' ? 'active' : ''}`}
            onClick={() => setActiveModule('treinos')}
          >
            💪 Meus Treinos
          </button>
          <button 
            className={`nav-item ${activeModule === 'nutricao' ? 'active' : ''}`}
            onClick={() => setActiveModule('nutricao')}
          >
            🍎 Nutrição & Macros
          </button>
          <button 
            className={`nav-item ${activeModule === 'ia' ? 'active' : ''}`}
            onClick={() => setActiveModule('ia')}
          >
            🧠 IA Coach
          </button>
          <button 
            className={`nav-item ${activeModule === 'comunidade' ? 'active' : ''}`}
            onClick={() => setActiveModule('comunidade')}
          >
            🔥 Comunidade
          </button>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL DINÂMICA */}
      <main className="main-content">
        
        {/* Renderiza o Dashboard se for o módulo ativo */}
        {activeModule === 'dashboard' && (
          <>
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
                {/* Aqui você pode usar uma imagem super realista gerada por IA como Avatar */}
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
                  alt="Avatar" 
                  className="avatar" 
                />
              </div>
            </header>

            <section className="stats-grid">
              <div className="stat-card">
                <h3>🔥 Calorias Hoje</h3>
                <div className="stat-value">1,240 <span style={{fontSize: '1.2rem', color: '#8a8d98'}}>/ 2500</span></div>
                <span className="stat-highlight">Restam 1260 kcal</span>
              </div>
              <div className="stat-card">
                <h3>💧 Hidratação</h3>
                <div className="stat-value">1.5 <span style={{fontSize: '1.2rem', color: '#8a8d98'}}>L</span></div>
                <div style={{ marginTop: '10px', height: '6px', background: '#1a1a24', borderRadius: '10px' }}>
                  <div style={{ width: '50%', height: '100%', background: '#00f0ff', borderRadius: '10px' }}></div>
                </div>
              </div>
              <div className="stat-card">
                <h3>📈 Meta de Peso</h3>
                <div className="stat-value">76.5 <span style={{fontSize: '1.2rem', color: '#8a8d98'}}>kg</span></div>
                <span className="stat-highlight" style={{color: '#7000ff'}}>-2.1kg este mês</span>
              </div>
            </section>

            <section className="hero-card">
              <div className="hero-info">
                <h3>Treino do Dia: Força e Hipertrofia</h3>
                <div className="hero-tags">
                  <span className="chip">Costas & Bíceps</span>
                  <span className="chip">⏱️ 55 Minutos</span>
                  <span className="chip">🔥 Alta Intensidade</span>
                </div>
                <p style={{ color: '#8a8d98', marginBottom: '20px', maxWidth: '500px' }}>
                  Baseado no seu histórico, a IA separou um circuito tático para o dia de hoje. Prepare-se para quebrar recordes.
                </p>
                <button className="btn-start" onClick={() => setActiveModule('treinos')}>
                  INICIAR SESSÃO
                </button>
              </div>
            </section>
          </>
        )}

        {/* Telas Futuras (Placeholders para os próximos passos) */}
        {activeModule !== 'dashboard' && (
          <div style={{ textAlign: 'center', marginTop: '100px', animation: 'fadeInSlide 0.4s' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Módulo em Construção 🚧</h2>
            <p style={{ color: '#8a8d98', fontSize: '1.2rem' }}>
              Estamos preparando o sistema de {activeModule.toUpperCase()} com design de milhões.
            </p>
            <button 
              className="btn-start" 
              style={{ marginTop: '30px', background: '#1a1a24', color: '#fff' }}
              onClick={() => setActiveModule('dashboard')}
            >
              Voltar ao Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
