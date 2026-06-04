import React, { useState } from 'react';

const LISTA_EXERCICIOS = [
  {
    id: 1,
    categoria: "Pernas",
    nome: "Gêmeos Sentado (Panturrilha na Máquina)",
    alvo: "Panturrilhas (Sóleo)",
    series: "4 séries x 12-15 repetições",
    passos: [
      "Sente-se no aparelho e ajuste o suporte acolchoado firmemente sobre as coxas.",
      "Coloque a ponta dos pés na plataforma, deixando os calcanhares para fora.",
      "Alongue descendo os calcanhares ao máximo e empurre para cima subindo na ponta dos pés."
    ],
    erro: "Usar o impulso do corpo ou fazer o movimento curto demais.",
    prompt: "A minimalist 3D white clay character performing a seated calf raise exercise on a gym machine, full body view, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/400x250?text=Boneco+3D+Panturrilha"
  },
  {
    id: 2,
    categoria: "Pernas",
    nome: "Leg Press 45º",
    alvo: "Quadríceps e Glúteos",
    series: "4 séries x 10-12 repetições",
    passos: [
      "Apoie completamente as costas e o quadril no encosto do banco.",
      "Posicione os pés na plataforma alinhados com a largura dos ombros.",
      "Destrave a máquina e flexione os joelhos até 90 graus de forma controlada.",
      "Empurre a plataforma de volta sem estender e travar totalmente os joelhos."
    ],
    erro: "Tirar o quadril do banco ou deixar os joelhos entrarem (valgo).",
    prompt: "A minimalist 3D white clay character performing a 45 degree leg press exercise, full body view, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/400x250?text=Boneco+3D+Leg+Press"
  },
  {
    id: 3,
    categoria: "Pernas",
    nome: "Cadeira Extensora",
    alvo: "Quadríceps (Frente da Coxa)",
    series: "4 séries x 12 repetições",
    passos: [
      "Ajuste o encosto para apoiar bem as costas e alinhe o joelho com o eixo da máquina.",
      "Posicione o rolo de espuma logo acima do tornozelo.",
      "Estenda as pernas completamente para cima, contraindo o músculo.",
      "Retorne à posição inicial segurando a descida."
    ],
    erro: "Fazer o movimento rápido demais sem controlar o peso na descida.",
    prompt: "A minimalist 3D white clay character using a leg extension gym machine, full body view, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/400x250?text=Boneco+3D+Extensora"
  },
  {
    id: 4,
    categoria: "Peito",
    nome: "Supino Vertical na Máquina",
    alvo: "Peitoral Maior",
    series: "4 séries x 10 repetições",
    passos: [
      "Regule o banco para que as manoplas fiquem na altura do meio do peito.",
      "Mantenha as escápulas fechadas e apoiadas firmemente no banco.",
      "Empurre as manoplas para a frente soltando o ar.",
      "Retorne devagar controlando a carga até sentir o peito alongar."
    ],
    erro: "Projetar os ombros para a frente no final do movimento de empurrar.",
    prompt: "A minimalist 3D white clay character using a chest press gym machine, full body view, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/400x250?text=Boneco+3D+Supino+Maquina"
  },
  {
    id: 5,
    categoria: "Peito",
    nome: "Pec Deck (Voador / Pack Deck)",
    alvo: "Isolamento do Peitoral",
    series: "3 séries x 12 repetições",
    passos: [
      "Ajuste o banco e segure os apoios mantendo os cotovelos levemente flexionados.",
      "Pressione os braços um em direção ao outro até que se encontrem na frente.",
      "Abra os braços controlando o peso, sem passar da linha dos ombros."
    ],
    erro: "Bater os pesos da máquina no meio ou usar os ombros para puxar.",
    prompt: "A minimalist 3D white clay character using a chest fly pec deck machine, full body view, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/400x250?text=Boneco+3D+Pec+Deck"
  },
  {
    id: 6,
    categoria: "Costas",
    nome: "Puxada Alta na Polia",
    alvo: "Dorsais (Asas das Costas)",
    series: "4 séries x 10 repetições",
    passos: [
      "Segure a barra com as mãos um pouco mais largas que a linha dos ombros.",
      "Sente-se e estabilize as coxas embaixo das travas.",
      "Puxe a barra para baixo em direção ao peito, inclinando o tronco levemente para trás."
    ],
    erro: "Puxar a barra por trás do pescoço ou usar o peso do corpo para dar tranco.",
    prompt: "A minimalist 3D white clay character doing a lat pulldown exercise on a cable machine, full body view, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/400x250?text=Boneco+3D+Puxada+Alta"
  },
  {
    id: 7,
    categoria: "Costas",
    nome: "Remada Baixa Sentado na Polia",
    alvo: "Meio das Costas e Romboides",
    series: "4 séries x 12 repetições",
    passos: [
      "Sente-se de frente para a polia com os pés apoiados e joelhos levemente flexionados.",
      "Segure o puxador estendendo os braços e mantendo a coluna ereta.",
      "Puxe o triângulo em direção ao abdômen, espremendo as costas nas escápulas."
    ],
    erro: "Ficar curvando a coluna para frente e para trás durante o exercício.",
    prompt: "A minimalist 3D white clay character performing a seated cable row exercise, full body view, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/400x250?text=Boneco+3D+Remada+Baixa"
  },
  {
    id: 8,
    categoria: "Ombros",
    nome: "Desenvolvimento na Máquina",
    alvo: "Deltoides (Ombros)",
    series: "4 séries x 10 repetições",
    passos: [
      "Ajuste o assento para que as manoplas comecem próximas à altura do queixo.",
      "Segure firme e empurre o peso verticalmente para cima até estender os braços.",
      "Desça de forma lenta até que as mãos fiquem próximas à linha da orelha."
    ],
    erro: "Arcar excessivamente a lombar descolando as costas do banco.",
    prompt: "A minimalist 3D white clay character using a shoulder press gym machine, full body view, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/400x250?text=Boneco+3D+Desenvolvimento"
  },
  {
    id: 9,
    categoria: "Braços",
    nome: "Tríceps Pulley (Corda ou Barra)",
    alvo: "Tríceps (Atrás do Braço)",
    series: "4 séries x 12 repetições",
    passos: [
      "Posicione-se de frente para o cabo da polia alta.",
      "Mantenha os cotovelos colados fixamente nas laterais do seu tronco.",
      "Empurre as mãos para baixo estendendo os braços por completo."
    ],
    erro: "Ficar abrindo os cotovelos ou mexendo os braços para frente e para trás.",
    prompt: "A minimalist 3D white clay character doing a triceps pushdown on a cable machine, full body view, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/400x250?text=Boneco+3D+Triceps"
  },
  {
    id: 10,
    categoria: "Braços",
    nome: "Rosca Bíceps na Polia Baixa",
    alvo: "Bíceps (Frente do Braço)",
    series: "4 séries x 12 repetições",
    passos: [
      "Fique em pé de frente para a polia baixa segurando a barra reta ou curva.",
      "Mantenha a postura reta e os cotovelos fixos ao lado do corpo.",
      "Flexione os braços trazendo a barra em direção aos ombros, contraindo o bíceps."
    ],
    erro: "Jogar os cotovelos para frente para ajudar a subir a barra com o ombro.",
    prompt: "A minimalist 3D white clay character performing a bicep cable curl, full body view, white studio background, 3d render.",
    imagem: "https://via.placeholder.com/400x250?text=Boneco+3D+Biceps"
  }
];

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const categorias = ["Todos", "Pernas", "Peito", "Costas", "Ombros", "Braços"];

  const exerciciosFiltrados = categoriaAtiva === "Todos"
    ? LISTA_EXERCICIOS
    : LISTA_EXERCICIOS.filter(ex => ex.categoria === categoriaAtiva);

  return (
    <div className="app-container">
      <header className="site-header">
        <h1>Guia de Execução 3D</h1>
        <p>Aprenda a executar os exercícios de máquina corretamente com ilustrações passo a passo.</p>
      </header>

      <nav className="filter-menu">
        {categorias.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${categoriaAtiva === cat ? 'active' : ''}`}
            onClick={() => setCategoriaAtiva(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <main className="exercises-grid">
        {exerciciosFiltrados.map(ex => (
          <div key={ex.id} className="exercise-card">
            <div>
              <div className="card-header">
                <h2>{ex.nome}</h2>
                <span className="category-tag">{ex.categoria}</span>
              </div>

              <div className="info-row">
                <p><strong>🎯 Alvo:</strong> {ex.alvo}</p>
                <p><strong>🔄 Configuração:</strong> {ex.series}</p>
              </div>

              <ol className="instructions-list">
                {ex.passos.map((passo, idx) => (
                  <li key={idx}>{passo}</li>
                ))}
              </ol>

              <div className="error-box">
                <p><strong>⚠️ Erro Comum:</strong> {ex.erro}</p>
              </div>
            </div>

            <div className="image-section">
              <img src={ex.imagem} alt={ex.nome} className="exercise-img" />
              <div className="prompt-box">
                <span>PROMPT PARA IA:</span>
                <code>{ex.prompt}</code>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 Guia de Academia Pro - Pronto para a Kiwify.</p>
      </footer>
    </div>
  );
}
