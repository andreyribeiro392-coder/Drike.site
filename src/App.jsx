import React, { useState, useEffect } from 'react';

const EXERCICIOS_DATA = [
  {
    id: 1,
    categoria: "Pernas",
    nome: "Gêmeos Sentado (Panturrilha)",
    alvo: "Panturrilhas (Sóleo)",
    config: "4 séries x 12-15 repetições",
    passos: [
      "Ajuste o suporte acolchoado firmemente sobre as coxas.",
      "Coloque apenas a ponta dos pés na plataforma.",
      "Alongue descendo ao máximo e suba contraindo a panturrilha no topo."
    ],
    erro: "Usar o impulso do corpo ou fazer o movimento curto demais.",
    prompt: "A minimalist 3D white clay character performing a seated calf raise exercise on a gym machine, full body, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/500x300?text=Boneco+3D+Panturrilha"
  },
  {
    id: 2,
    categoria: "Pernas",
    nome: "Leg Press 45º",
    alvo: "Quadríceps e Glúteos",
    config: "4 séries x 10-12 repetições",
    passos: [
      "Apoie completamente as costas e o quadril no encosto.",
      "Pés na plataforma alinhados com a largura dos ombros.",
      "Desça o peso controladamente até formar um ângulo de 90º nos joelhos."
    ],
    erro: "Tirar o quadril do banco ou deixar os joelhos entrarem.",
    prompt: "A minimalist 3D white clay character performing a 45 degree leg press exercise, full body, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/500x300?text=Boneco+3D+Leg+Press"
  },
  {
    id: 3,
    categoria: "Peito",
    nome: "Supino Vertical na Máquina",
    alvo: "Peitoral Maior",
    config: "4 séries x 10 repetições",
    passos: [
      "Regule o banco para as manoplas ficarem na altura do meio do peito.",
      "Mantenha as escápulas fechadas e apoiadas no banco.",
      "Empurre as manoplas para a frente estendendo os braços."
    ],
    erro: "Projetar os ombros para a frente no final do movimento.",
    prompt: "A minimalist 3D white clay character using a chest press gym machine, full body, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/500x300?text=Boneco+3D+Supino"
  },
  {
    id: 4,
    categoria: "Costas",
    nome: "Puxada Alta na Polia",
    alvo: "Dorsais (Costas)",
    config: "4 séries x 10 repetições",
    passos: [
      "Segure a barra com pegada aberta, maior que a largura dos ombros.",
      "Puxe a barra em direção ao peito inclinando levemente o tronco para trás.",
      "Controle a subida estendendo os braços completamente."
    ],
    erro: "Dar trancos com o tronco ou puxar a barra na nuca.",
    prompt: "A minimalist 3D white clay character doing a lat pulldown exercise, full body, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/500x300?text=Boneco+3D+Puxada"
  },
  {
    id: 5,
    categoria: "Braços",
    nome: "Tríceps Pulley (Polia Alta)",
    alvo: "Tríceps",
    config: "4 séries x 12 repetições",
    passos: [
      "Mantenha os cotovelos colados fixamente nas laterais do tronco.",
      "Empurre a barra para baixo estendendo os braços por completo.",
      "Retorne subindo as mãos de forma lenta até a linha do peito."
    ],
    erro: "Ficar abrindo ou movendo os cotovelos para frente e para trás.",
    prompt: "A minimalist 3D white clay character doing a triceps pushdown on a cable machine, full body, 3d render.",
    imagem: "https://via.placeholder.com/500x300?text=Boneco+3D+Triceps"
  }
];

export default function App() {
  const [categoria, setCategoria] = useState("Todos");
  const [concluidos, setConcluidos] = useState([]);
  const [tempo, setTempo] = useState(0);
  const [timerAtivo, setTimerAtivo] = useState(false);
  
  // Calculadora de Carga
  const [peso, setPeso] = useState("");
  const [reps, setReps] = useState("");
  const [resultadoRM, setResultadoRM] = useState(null);

  const categorias = ["Todos", "Pernas", "Peito", "Costas", "Braços"];

  // Cronômetro de Descanso
  useEffect(() => {
    let intervalo = null;
    if (timerAtivo && tempo > 0) {
      intervalo = setInterval(() => {
        setTempo((t) => t - 1);
      }, 1000);
    } else if (tempo === 0) {
      setTimerAtivo(false);
    }
    return () => clearInterval(intervalo);
  }, [timerAtivo, tempo]);

  const dispararCronometro = () => {
    setTempo(60); // 60 segundos de descanso padrão
    setTimerAtivo(true);
  };

  // Alternar Conclusão
  const alternarConcluido = (id) => {
    if (concluidos.includes(id)) {
      setConcluidos(concluidos.filter(item => item !== id));
    } else {
      setConcluidos([...concluidos, id]);
    }
  };

  // Lógica da Calculadora (Fórmula de Epley)
  const calcular1RM = () => {
    if (peso && reps) {
      const rm = parseFloat(peso) * (1 + parseInt(reps) / 30);
      setResultadoRM(Math.round(rm));
    }
  };

  const filtrados = categoria === "Todos" 
    ? EXERCICIOS_DATA 
    : EXERCICIOS_DATA.filter(e => e.categoria === categoria);

  const progressoPorcentagem = Math.round((concluidos.length / EXERCICIOS_DATA.length) * 100);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Shape3D Interactive</h1>
        <p>Seu guia de execução perfeito para a academia</p>
      </header>

      {/* Barra de Progresso Geral */}
      <div className="progress-container">
        <div className="progress-info">
          <span>Progresso do Treino Diário</span>
          <strong>{progressoPorcentagem}% Concluído</strong>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progressoPorcentagem}%` }}></div>
        </div>
      </div>

      {/* Ferramenta Extra: Calculadora de Força */}
      <div className="tools-box">
        <h3>Calculadora de Força Máxima (Bônus 1RM)</h3>
        <div className="calc-inputs">
          <input 
            type="number" 
            placeholder="Peso usado (kg)" 
            value={peso} 
            onChange={(e) => setPeso(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Repetições feitas" 
            value={reps} 
            onChange={(e) => setReps(e.target.value)} 
          />
        </div>
        <button className="btn-action btn-done" onClick={calcular1RM}>Calcular Máximo</button>
        {resultadoRM && (
          <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#34d399', textAlign: 'center' }}>
            Sua força máxima estimada para 1 repetição é: <strong>{resultadoRM} kg</strong>
          </p>
        )}
      </div>

      {/* Menu Filtros Deslizável */}
      <nav className="nav-filters">
        {categorias.map(cat => (
          <button 
            key={cat} 
            className={`filter-chip ${categoria === cat ? 'active' : ''}`}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Lista de Exercícios */}
      <main>
        {filtrados.map(ex => {
          const isDone = concluidos.includes(ex.id);
          return (
            <div key={ex.id} className={`exercise-card ${isDone ? 'completed' : ''}`}>
              <div className="card-top">
                <h2>{ex.nome}</h2>
                <span className="tag">{ex.categoria}</span>
              </div>

              <div className="meta-grid">
                <div><strong>🎯 Alvo:</strong> {ex.alvo}</div>
                <div><strong>🔄 Estrutura:</strong> {ex.config}</div>
              </div>

              <ol className="steps-list">
                {ex.passos.map((passo, idx) => (
                  <li key={idx}>{passo}</li>
                ))}
              </ol>

              <div className="warning-alert">
                <strong>Evite:</strong> {ex.erro}
              </div>

              <div className="visual-area">
                <img src={ex.imagem} alt={ex.nome} className="workout-img" />
                <div className="prompt-copy">
                  <code style={{ fontSize: '0.75rem' }}>{ex.prompt}</code>
                </div>
              </div>

              <div className="card-actions">
                <button className="btn-action btn-timer" onClick={dispararCronometro}>⏱️ Descansar 1m</button>
                <button 
                  className={`btn-action btn-done ${isDone ? 'completed' : ''}`} 
                  onClick={() => alternarConcluido(ex.id)}
                >
                  {isDone ? '✓ Concluído' : 'Marcar Concluído'}
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {/* Balão Flutuante do Cronômetro de Descanso */}
      {timerAtivo && (
        <div className="floating-timer">
          <span style={{ fontSize: '1.2rem' }}>⏳ Tempo de Descanso:</span>
          <strong style={{ fontSize: '1.4rem', color: '#60a5fa' }}>{tempo}s</strong>
        </div>
      )}
    </div>
  );
}
