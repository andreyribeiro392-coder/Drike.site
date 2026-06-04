import React, { useState } from 'react';

// Banco de dados de exercícios integrado para não precisar de outro arquivo
const bancoExercicios = [
  {
    id: 1,
    categoria: "Pernas",
    nome: "Gêmeos Sentado na Máquina (Panturrilha)",
    foco: "Panturrilha (Músculo Sóleo)",
    series: "4 séries de 12 a 15 repetições",
    execucao: [
      "Sente-se na máquina e ajuste a almofada sobre as suas coxas, logo acima dos joelhos.",
      "Apoie apenas a ponta dos pés na plataforma, deixando os calcanhares livres para fora.",
      "Desça os calcanhares ao máximo para alongar bem a panturrilha.",
      "Empurre a plataforma para cima, subindo na ponta dos pés o máximo que conseguir, e segure por 1 segundo.",
      "Desça de forma lenta e controlada."
    ],
    erroComum: "Fazer o movimento correndo e usando o impulso do corpo.",
    promptImagem: "A minimalist 3D white clay character performing a seated calf raise exercise on a gym machine. Full body view, clean white studio background, professional 3D render style.",
    imagemUrl: "https://via.placeholder.com/500x350?text=Boneco+3D+Panturrilha"
  },
  {
    id: 2,
    categoria: "Pernas",
    nome: "Leg Press 45º",
    foco: "Quadríceps e Glúteos",
    series: "4 séries de 10 a 12 repetições",
    execucao: [
      "Sente-se no aparelho apoiando bem as costas e o quadril no encosto.",
      "Apoie os pés na plataforma na largura dos ombros.",
      "Destrave o peso com cuidado e flexione os joelhos trazendo a plataforma em direção ao peito até um ângulo de 90º.",
      "Empurre a plataforma de volta estendendo as pernas, sem travar totalmente os joelhos no final."
    ],
    erroComum: "Tirar o quadril do banco ao descer o peso ou colar os joelhos para dentro.",
    promptImagem: "A minimalist 3D white clay character performing a leg press 45 degrees exercise on a gym machine. Full body view, clean white studio background, professional 3D render style.",
    imagemUrl: "https://via.placeholder.com/500x350?text=Boneco+3D+Leg+Press"
  },
  {
    id: 3,
    categoria: "Peito",
    nome: "Supino Reto na Máquina",
    foco: "Peitoral Maior e Tríceps",
    series: "4 séries de 8 a 10 repetições",
    execucao: [
      "Ajuste a altura do banco para que as manoplas fiquem alinhadas com o meio do seu peito.",
      "Sente-se apoiando bem a cabeça, as costas e o quadril no encosto.",
      "Empurre as manoplas para frente estendendo os braços, mantendo os ombros para trás.",
      "Retorne devagar até sentir o peito alongar, sem deixar os pesos encostarem no fundo."
    ],
    erroComum: "Projetar os ombros para frente na hora de empurrar o peso.",
    promptImagem: "A minimalist 3D white clay character performing a seated chest press exercise on a gym machine. Full body view, clean white studio background, professional 3D render style.",
    imagemUrl: "https://via.placeholder.com/500x350?text=Boneco+3D+Supino+Maquina"
  },
  {
    id: 4,
    categoria: "Costas",
    nome: "Puxada Alta na Polia (Pulldown)",
    foco: "Dorsais (Costas) e Bíceps",
    series: "4 séries de 10 a 12 repetições",
    execucao: [
      "Ajuste o rolo de espuma da máquina para prender suas coxas firmemente.",
      "Segure a barra com as mãos em uma largura maior que a dos seus ombros.",
      "Sente-se e puxe a barra em direção ao topo do seu peito, inclinando levemente o tronco para trás e fechando as escápulas.",
      "Suba a barra controlando o peso até estender os braços quase por completo."
    ],
    erroComum: "Puxar a barra usando o impulso do corpo ou levar a barra atrás do pescoço.",
    promptImagem: "A minimalist 3D white clay character performing a lat pulldown exercise on a gym machine. Full body view, clean white studio background, professional 3D render style.",
    imagemUrl: "https://via.placeholder.com/500x350?text=Boneco+3D+Puxada+Alta"
  },
  {
    id: 5,
    categoria: "Braços",
    nome: "Tríceps Pulley (Na Polia Alta)",
    foco: "Tríceps",
    series: "4 séries de 12 repetições",
    execucao: [
      "Fique de frente para a polia alta, segurando a barra ou corda com as palmas voltadas para baixo.",
      "Cole os cotovelos nas laterais do seu corpo e mantenha-os imóveis.",
      "Empurre a barra para baixo até estender completamente os braços, contraindo o tríceps.",
      "Retorne subindo as mãos até a linha do peito, mantendo o controle do peso."
    ],
    erroComum: "Ficar mexendo os cotovelos para frente e para trás durante o movimento.",
    promptImagem: "A minimalist 3D white clay character performing a triceps rope pushdown exercise on a cable gym machine. Full body view, clean white studio background, professional 3D render style.",
    imagemUrl: "https://via.placeholder.com/500x350?text=Boneco+3D+Triceps+Pulley"
  }
];

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const categorias = ["Todos", "Pernas", "Peito", "Costas", "Braços"];

  const exerciciosFiltrados = categoriaAtiva === "Todos" 
    ? bancoExercicios 
    : bancoExercicios.filter(ex => ex.categoria === categoriaAtiva);

  return (
    <div style={{
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      {/* Cabeçalho */}
      <header style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '1px solid #21262d', paddingBottom: '20px' }}>
        <h1 style={{ color: '#58a6ff', fontSize: '2.5rem', margin: '0 0 10px 0' }}>Painel de Treino Interativo</h1>
        <p style={{ color: '#8b949e', margin: 0 }}>O guia visual definitivo com personagens 3D para seus treinos.</p>
      </header>

      {/* Filtros por Categoria */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categorias.map(cat => (
          <button 
            key={cat}
            onClick={() => setCategoriaAtWindow(cat)}
            style={{
              backgroundColor: categoriaAtiva === cat ? '#238636' : '#21262d',
              color: '#ffffff',
              border: '1px solid #30363d',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.2s'
            }}
            onClick={() => setCategoriaAtiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de Exercícios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
        {exerciciosFiltrados.map((ex) => (
          <div key={ex.id} style={{
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '8px',
            padding: '25px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            {/* Título e Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #30363d', paddingBottom: '15px', marginBottom: '15px' }}>
              <span style={{ backgroundColor: '#21262d', color: '#58a6ff', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', border: '1px solid #30363d' }}>
                {ex.categoria}
              </span>
              <h2 style={{ margin: 0, color: '#ffffff', fontSize: '1.5rem' }}>{ex.nome}</h2>
            </div>

            {/* Informações Básicas */}
            <div style={{ marginBottom: '20px', fontSize: '1rem', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <p style={{ margin: 0 }}><strong>🎯 Alvo:</strong> <span style={{ color: '#8b949e' }}>{ex.foco}</span></p>
              <p style={{ margin: 0 }}><strong>🔄 Séries:</strong> <span style={{ color: '#8b949e' }}>{ex.series}</span></p>
            </div>

            {/* Instruções */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#58a6ff', fontSize: '1.2rem', marginBottom: '10px' }}>Como Executar:</h3>
              <ol style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.6' }}>
                {ex.execucao.map((passo, i) => (
                  <li key={i} style={{ marginBottom: '8px', color: '#e6edf3' }}>{passo}</li>
                ))}
              </ol>
            </div>

            {/* Caixa de Alerta / Erro Comum */}
            <div style={{
              backgroundColor: 'rgba(218, 54, 55, 0.1)',
              borderLeft: '4px solid #da3637',
              padding: '12px 15px',
              borderRadius: '4px',
              marginBottom: '25px'
            }}>
              <p style={{ margin: 0, color: '#f0f6fc' }}><strong>⚠️ Erro Comum:</strong> {ex.erroComum}</p>
            </div>

            {/* Área da Imagem do Boneco 3D */}
            <div style={{ textAlign: 'center', borderTop: '1px solid #30363d', paddingTop: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#8b949e', fontSize: '0.9rem' }}>Ilustração de Execução</h4>
              <img 
                src={ex.imagemUrl} 
                alt={ex.nome} 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '6px', border: '1px solid #30363d' }}
              />
              
              {/* Copiar Prompt Facilitado */}
              <div style={{ marginTop: '15px', backgroundColor: '#0d1117', padding: '10px', borderRadius: '6px', border: '1px solid #30363d', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', color: '#8b949e', display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  PROMPT PARA GERAR O BONECO DESTE EXERCÍCIO:
                </span>
                <code style={{ fontSize: '0.85rem', color: '#79c0ff', wordBreak: 'break-all' }}>{ex.promptImagem}</code>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
