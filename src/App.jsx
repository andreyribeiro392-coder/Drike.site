import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// BANCO DE DADOS LOCAL (Mockup Premium)
// ==========================================
const DB_TREINOS = [
  { id: 1, nome: "Supino Reto Barra", musculo: "Peito", series: "4x12", carga: "80kg", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500&auto=format&fit=crop" },
  { id: 2, nome: "Agachamento Livre", musculo: "Pernas", series: "4x10", carga: "100kg", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=500&auto=format&fit=crop" },
  { id: 3, nome: "Levantamento Terra", musculo: "Costas", series: "3x8", carga: "120kg", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop" },
  { id: 4, nome: "Rosca Direta", musculo: "Bíceps", series: "4x15", carga: "30kg", img: "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=500&auto=format&fit=crop" }
];

export default function App() {
  // ==========================================
  // ESTADOS GLOBAIS DO SISTEMA
  // ==========================================
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Estado: Usuário & Gamificação
  const [user] = useState({
    nome: "Atleta Elite", nivel: 34, xpAtual: 14500, xpProx: 20000, streak: 21,
    macros: { prot: 160, carb: 220, gord: 65, consumidoProt: 80, consumidoCarb: 110, consumidoGord: 30 }
  });

  // Estado: Cronômetro HIIT Premium
  const [timerAtivo, setTimerAtivo] = useState(false);
  const [tempoTotal, setTempoTotal] = useState(60);
  const [tempoRestante, setTempoRestante] = useState(60);
  const [mostrarTimer, setMostrarTimer] = useState(false);

  // Estado: IA Coach Chat
  const [mensagens, setMensagens] = useState([
    { autor: 'ia', texto: 'Saudações. Sou sua IA de Alta Performance. O setup de câmera para análise de postura está pronto. Qual o foco sombrio e intenso do treino de hoje?' }
  ]);
  const [inputIA, setInputIA] = useState('');
  const chatEndRef = useRef(null);

  // ==========================================
  // MOTORES LÓGICOS (Processamento de Dados)
  // ==========================================
  
  // Motor do Cronômetro
  useEffect(() => {
    let intervalo = null;
    if (timerAtivo && tempoRestante > 0) {
      intervalo = setInterval(() => setTempoRestante(t => t - 1), 1000);
    } else if (tempoRestante === 0) {
      setTimerAtivo(false);
      // Aqui integrariamos a API de Vibração/Som do celular
    }
    return () => clearInterval(intervalo);
  }, [timerAtivo, tempoRestante]);

  const dispararTimer = (segundos) => {
    setTempoTotal(segundos);
    setTempoRestante(segundos);
    setTimerAtivo(true);
    setMostrarTimer(true);
  };

  // Motor da Inteligência Artificial (Simulação)
  const enviarMensagemIA = (e) => {
    e.preventDefault();
    if (!inputIA.trim()) return;
    
    const novaMensagem = { autor: 'user', texto: inputIA };
    setMensagens([...mensagens, novaMensagem]);
    setInputIA('');

    // Simula o tempo de resposta do servidor da IA
    setTimeout(() => {
      setMensagens(prev => [...prev, { 
        autor: 'ia', 
        texto: 'Processando biometria... Analisando carga estrutural. Recomendo aumentar o descanso para 90s focado em hipertrofia miofibrilar. Mantenha a cadência 3-0-1-0.' 
      }]);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, activeTab]);

  // Cálculos Visuais
  const progressoTimer = ((tempoTotal - tempoRestante) / tempoTotal) * 100;
  const xpPercent = (user.xpAtual / user.xpProx) * 100;
  
  // ==========================================
  // RENDERIZAÇÃO DOS MÓDULOS (Componentes Internos)
  // ==========================================
  return (
    <div className="app-container">
      {/* --- MENU LATERAL (SIDEBAR) --- */}
      <aside className="sidebar">
        <div className="logo-area">Aura<span>Fit</span></div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</button>
          <button className={`nav-item ${activeTab === 'treinos' ? 'active' : ''}`} onClick={() => setActiveTab('treinos')}>💪 Zona de Treino</button>
          <button className={`nav-item ${activeTab === 'nutricao' ? 'active' : ''}`} onClick={() => setActiveTab('nutricao')}>🍎 Macros & Dieta</button>
          <button className={`nav-item ${activeTab === 'ia' ? 'active' : ''}`} onClick={() => setActiveTab('ia')}>🧠 IA Coach Pro</button>
        </nav>

        {/* Resumo Rápido no Menu */}
        <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.4)', padding: '15px', borderRadius: '15px', border: '1px solid var(--border-glass)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Nível {user.nivel} - XP Global</div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
            <div style={{ height: '100%', width: `${xpPercent}%`, background: 'var(--neon-cyan)', borderRadius: '10px' }}></div>
          </div>
        </div>
      </aside>

      {/* --- ÁREA PRINCIPAL DINÂMICA --- */}
      <main className="main-content">

        {/* MÓDULO 1: DASHBOARD PREMIUM */}
        {activeTab === 'dashboard' && (
          <div style={{ animation: 'fadeInUp 0.4s ease' }}>
            <header className="top-header">
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Painel Central</h1>
                <p style={{ color: 'var(--text-muted)' }}>Sincronização biométrica ativa. {user.streak} dias de sequência de treinos.</p>
              </div>
            </header>
            <div className="dashboard-grid">
              <div className="bento-card span-8 workout-hero">
                <div className="card-title">Próxima Missão</div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '15px' }}>Destruição de Pernas v2.0</h2>
                <button className="btn-primary" onClick={() => setActiveTab('treinos')}>INICIAR TREINO</button>
              </div>
              <div className="bento-card span-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(var(--fitness-green) 75%, rgba(255,255,255,0.1) 0)' }}>
                  <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '10px', background: 'var(--bg-glass)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    75%
                  </div>
                </div>
                <p style={{ marginTop: '15px', color: 'var(--text-muted)' }}>Meta de Recuperação</p>
              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 2: ZONA DE TREINO & CRONÔMETRO */}
        {activeTab === 'treinos' && (
          <div style={{ animation: 'fadeInUp 0.4s ease' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '30px' }}>Biblioteca de Alta Intensidade</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {DB_TREINOS.map(treino => (
                <div key={treino.id} className="bento-card" style={{ padding: '0', overflow: 'hidden' }}>
                  <img src={treino.img} alt={treino.nome} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <span style={{ color: 'var(--fitness-green)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{treino.musculo}</span>
                    <h3 style={{ fontSize: '1.2rem', margin: '5px 0 15px 0' }}>{treino.nome}</h3>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                      <span style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem' }}>🔄 {treino.series}</span>
                      <span style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem' }}>⚖️ {treino.carga}</span>
                    </div>
                    <button 
                      onClick={() => dispararTimer(90)}
                      style={{ width: '100%', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--neon-cyan)', border: '1px solid var(--neon-cyan)', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      ⏱️ Iniciar Descanso (90s)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MÓDULO 3: NUTRIÇÃO & MACROS */}
        {activeTab === 'nutricao' && (
          <div style={{ animation: 'fadeInUp 0.4s ease' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '30px' }}>Scanner Nutricional</h1>
            <div className="dashboard-grid">
              <div className="bento-card span-12">
                <h3 style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Balanço de Macronutrientes</h3>
                
                {/* Barra Proteína */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ color: '#ff3366' }}>Proteínas</strong>
                    <span>{user.macros.consumidoProt}g / {user.macros.prot}g</span>
                  </div>
                  <div style={{ height: '12px', background: 'rgba(255,51,102,0.1)', borderRadius: '10px' }}>
                    <div style={{ height: '100%', width: `${(user.macros.consumidoProt/user.macros.prot)*100}%`, background: '#ff3366', borderRadius: '10px' }}></div>
                  </div>
                </div>

                {/* Barra Carbos */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ color: '#00f0ff' }}>Carboidratos</strong>
                    <span>{user.macros.consumidoCarb}g / {user.macros.carb}g</span>
                  </div>
                  <div style={{ height: '12px', background: 'rgba(0,240,255,0.1)', borderRadius: '10px' }}>
                    <div style={{ height: '100%', width: `${(user.macros.consumidoCarb/user.macros.carb)*100}%`, background: '#00f0ff', borderRadius: '10px' }}></div>
                  </div>
                </div>

                {/* Barra Gorduras */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ color: '#eab308' }}>Gorduras</strong>
                    <span>{user.macros.consumidoGord}g / {user.macros.gord}g</span>
                  </div>
                  <div style={{ height: '12px', background: 'rgba(234,179,8,0.1)', borderRadius: '10px' }}>
                    <div style={{ height: '100%', width: `${(user.macros.consumidoGord/user.macros.gord)*100}%`, background: '#eab308', borderRadius: '10px' }}></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 4: INTELIGÊNCIA ARTIFICIAL COACH */}
        {activeTab === 'ia' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', animation: 'fadeInUp 0.4s ease' }}>
            <header style={{ marginBottom: '20px' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>IA Neural Coach</h1>
              <p style={{ color: 'var(--neon-cyan)' }}>Modelo Treinado com dados de atletas de elite. Analisando padrões corporais.</p>
            </header>
            
            <div style={{ flex: 1, background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {mensagens.map((msg, index) => (
                <div key={index} style={{ alignSelf: msg.autor === 'user' ? 'flex-end' : 'flex-start', background: msg.autor === 'user' ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.05)', color: msg.autor === 'user' ? '#000' : '#fff', padding: '15px 20px', borderRadius: '15px', maxWidth: '70%', fontWeight: '500', border: msg.autor === 'ia' ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  {msg.texto}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={enviarMensagemIA} style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                value={inputIA}
                onChange={(e) => setInputIA(e.target.value)}
                placeholder="Ex: Crie um circuito brutal de 15 minutos para queimar gordura..."
                style={{ flex: 1, background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', padding: '20px', borderRadius: '15px', color: '#fff', outline: 'none', fontSize: '1rem' }}
              />
              <button type="submit" className="btn-primary" style={{ margin: 0, borderRadius: '15px' }}>ENVIAR DADOS</button>
            </form>
          </div>
        )}

      </main>

      {/* --- WIDGET GLOBAL: CRONÔMETRO FLUTUANTE --- */}
      {mostrarTimer && (
        <div style={{ position: 'fixed', bottom: '40px', right: '40px', background: 'rgba(5,5,7,0.95)', backdropFilter: 'blur(20px)', border: '1px solid var(--neon-purple)', borderRadius: '25px', padding: '25px', width: '300px', zIndex: 1000, boxShadow: '0 20px 50px rgba(138,43,226,0.2)', animation: 'fadeInUp 0.3s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ color: 'var(--neon-purple)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Recuperação Tática</span>
          </div>
          
          <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto', background: `conic-gradient(var(--neon-purple) ${progressoTimer}%, rgba(255,255,255,0.05) 0)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '135px', height: '135px', background: '#050507', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: '900', fontVariantNumeric: 'tabular-nums' }}>
              {Math.floor(tempoRestante / 60).toString().padStart(2, '0')}:{(tempoRestante % 60).toString().padStart(2, '0')}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
            <button onClick={() => setTimerAtivo(!timerAtivo)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', padding: '12px', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
              {timerAtivo ? 'Pausar' : 'Retomar'}
            </button>
            <button onClick={() => setMostrarTimer(false)} style={{ flex: 1, background: 'rgba(255,51,102,0.1)', color: '#ff3366', border: '1px solid #ff3366', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
              Encerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
