import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dados Mockados do Usuário (Gamificação)
  const user = {
    nome: "Atleta Elite",
    nivel: 24,
    xpAtual: 8500,
    xpProxNivel: 10000,
    peso: 76.5,
    metaPeso: 80.0,
    calorias: 1850,
    metaCalorias: 2800,
    agua: 2.1,
    metaAgua: 3.5,
    streak: 14
  };

  const xpPercent = (user.xpAtual / user.xpProxNivel) * 100;
  const aguaPercent = (user.agua / user.metaAgua) * 100;

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-area">Aura<span>Fit</span></div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </button>
          <button className={`nav-item ${activeTab === 'treinos' ? 'active' : ''}`} onClick={() => setActiveTab('treinos')}>
            💪 Treinos & Cronômetro
          </button>
          <button className={`nav-item ${activeTab === 'nutricao' ? 'active' : ''}`} onClick={() => setActiveTab('nutricao')}>
            🍎 Nutrição
          </button>
          <button className={`nav-item ${activeTab === 'ia' ? 'active' : ''}`} onClick={() => setActiveTab('ia')}>
            🧠 IA Coach
          </button>
          <button className={`nav-item ${activeTab === 'comunidade' ? 'active' : ''}`} onClick={() => setActiveTab('comunidade')}>
            🔥 Comunidade
          </button>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            {/* CABEÇALHO COM GAMIFICAÇÃO */}
            <header className="top-header">
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '5px' }}>Visão Geral</h1>
                <p style={{ color: 'var(--text-muted)' }}>Bem-vindo de volta. Faltam 1.500 XP para o próximo rank.</p>
              </div>

              <div className="user-level-badge">
                <div className="level-circle">{user.nivel}</div>
                <div className="xp-bar-container">
                  <div className="xp-info">
                    <span>Lvl {user.nivel}</span>
                    <span>{user.xpAtual} / {user.xpProxNivel} XP</span>
                  </div>
                  <div className="xp-track">
                    <div className="xp-fill" style={{ width: `${xpPercent}%` }}></div>
                  </div>
                </div>
              </div>
            </header>

            {/* DASHBOARD GRID */}
            <div className="dashboard-grid">
              
              {/* Card Hero: Treino do Dia */}
              <div className="bento-card span-8 workout-hero">
                <div className="card-title">Treino de Hoje</div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '15px' }}>Hipertrofia: Dorsais e Bíceps</h2>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem' }}>⏱️ 65 Minutos</span>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem' }}>🔥 450 kcal</span>
                  <span style={{ background: 'rgba(0,255,163,0.2)', color: 'var(--fitness-green)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>Nível Avançado</span>
                </div>
                <button className="btn-primary" onClick={() => setActiveTab('treinos')}>INICIAR SESSÃO</button>
              </div>

              {/* Card: Streak / Conquista */}
              <div className="bento-card span-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🔥</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{user.streak} Dias Seguidos</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Você está no top 5% dos usuários desta semana!</p>
              </div>

              {/* Card: Peso e IMC (Calculadora Placeholder) */}
              <div className="bento-card span-4">
                <div className="card-title"><span>Massa Corporal</span> <span>⚖️</span></div>
                <div className="big-data">{user.peso} <span className="data-unit">kg</span></div>
                <div className="trend-up" style={{ color: 'var(--neon-cyan)' }}>▲ Meta: {user.metaPeso} kg</div>
                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  O cálculo de IMC interno está ativo. Seu índice atual está na faixa de "Atleta".
                </div>
              </div>

              {/* Card: Calorias */}
              <div className="bento-card span-4">
                <div className="card-title"><span>Nutrição Diária</span> <span>🍎</span></div>
                <div className="big-data">{user.calorias} <span className="data-unit">/ {user.metaCalorias}</span></div>
                <div className="trend-up"> Restam 950 kcal</div>
                
                <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
                  <div style={{ flex: 4, height: '8px', background: '#ff3366', borderRadius: '10px' }} title="Proteínas"></div>
                  <div style={{ flex: 4, height: '8px', background: '#00f0ff', borderRadius: '10px' }} title="Carbos"></div>
                  <div style={{ flex: 2, height: '8px', background: '#eab308', borderRadius: '10px' }} title="Gorduras"></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  <span>P: 120g</span>
                  <span>C: 180g</span>
                  <span>G: 45g</span>
                </div>
              </div>

              {/* Card: Hidratação */}
              <div className="bento-card span-4">
                <div className="card-title"><span>Hidratação</span> <span>💧</span></div>
                <div className="big-data">{user.agua} <span className="data-unit">/ {user.metaAgua} L</span></div>
                <div className="xp-track" style={{ marginTop: '25px', height: '12px', background: 'rgba(0, 240, 255, 0.1)' }}>
                  <div className="xp-fill" style={{ width: `${aguaPercent}%`, background: 'var(--neon-cyan)' }}></div>
                </div>
              </div>

            </div>
          </>
        )}

        {/* Placeholders para outras telas */}
        {activeTab !== 'dashboard' && (
           <div style={{ textAlign: 'center', marginTop: '100px', animation: 'fadeInUp 0.4s ease' }}>
             <h2 style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--text-main)' }}>Em Desenvolvimento 🚧</h2>
             <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>O módulo de {activeTab.toUpperCase()} está sendo preparado com arquitetura premium.</p>
             <button className="btn-primary" onClick={() => setActiveTab('dashboard')}>Voltar ao Dashboard</button>
           </div>
        )}
      </main>
    </div>
  );
}
