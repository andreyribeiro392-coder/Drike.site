import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, LogOut, Home, Dumbbell, Brain, Droplets, Trophy, User, Settings, Clock, Eye, Head2, TrendingUp, Zap, Heart, Flame, Target, Award, BookOpen, MessageCircle, Send, Play, Pause, RotateCcw, Plus, Minus, Volume2, Bell, Share2, Download, ChevronRight, ChevronLeft, Star, Lock, Unlock } from 'lucide-react';
import { HashRouter, Route, Switch, useLocation } from 'wouter';

// ============ LANDING PAGE COM CAPA DINÂMICA ============
function LandingPage({ onEnter }) {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Fundo gradiente extraordinário
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.25, '#1e1b4b');
      gradient.addColorStop(0.5, '#2d1b69');
      gradient.addColorStop(0.75, '#1e1b4b');
      gradient.addColorStop(1, '#0c0a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ondas de fundo
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
          const y = canvas.height / 2 + Math.sin((x + time * 50) / 100 + i) * 50 + i * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Partículas animadas
      for (let i = 0; i < 150; i++) {
        const x = (Math.sin(time * 0.5 + i) * canvas.width) / 2 + canvas.width / 2;
        const y = (Math.cos(time * 0.3 + i * 0.5) * canvas.height) / 2 + canvas.height / 2;
        const size = Math.sin(time + i) * 2 + 3;
        const opacity = Math.sin(time * 0.7 + i) * 0.3 + 0.2;

        ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Linhas conectadas
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const x1 = Math.sin(time * 0.2 + i) * canvas.width * 0.3 + canvas.width / 2;
        const y1 = Math.cos(time * 0.15 + i) * canvas.height * 0.3 + canvas.height / 2;
        const x2 = Math.sin(time * 0.2 + i + 2) * canvas.width * 0.3 + canvas.width / 2;
        const y2 = Math.cos(time * 0.15 + i + 2) * canvas.height * 0.3 + canvas.height / 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Efeito do mouse com glow
      const gradient2 = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 200);
      gradient2.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
      gradient2.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = gradient2;
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 200, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Conteúdo */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-8 animate-fadeIn max-w-4xl">
          {/* Logo */}
          <div className="space-y-4">
            <div className="text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
              🏋️ AURA FITNESS
            </div>
            <div className="text-2xl font-bold text-cyan-300">PREMIUM EXPERIENCE</div>
          </div>

          {/* Subtítulo */}
          <div className="text-3xl font-bold text-cyan-300 drop-shadow-lg">
            Transforme Seu Corpo, Transforme Sua Vida
          </div>

          {/* Descrição */}
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Treinos inteligentes com IA Coach, detecção de pose em tempo real, visualização 3D, rastreamento ocular avançado, análise de progresso e muito mais. Tudo integrado em uma plataforma extraordinária.
          </p>

          {/* Botão */}
          <button
            onClick={onEnter}
            className="mt-12 px-16 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-black text-2xl rounded-2xl transition transform hover:scale-110 active:scale-95 shadow-2xl"
          >
            🚀 COMEÇAR AGORA
          </button>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            <div className="bg-cyan-900/30 p-6 rounded-xl border border-cyan-500 hover:border-cyan-300 transition">
              <div className="text-4xl mb-2">🎥</div>
              <p className="text-cyan-300 font-bold">3D Avançado</p>
              <p className="text-xs text-cyan-400 mt-1">Visualização em tempo real</p>
            </div>
            <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500 hover:border-purple-300 transition">
              <div className="text-4xl mb-2">🤖</div>
              <p className="text-purple-300 font-bold">IA Coach</p>
              <p className="text-xs text-purple-400 mt-1">Assistente inteligente</p>
            </div>
            <div className="bg-pink-900/30 p-6 rounded-xl border border-pink-500 hover:border-pink-300 transition">
              <div className="text-4xl mb-2">👁️</div>
              <p className="text-pink-300 font-bold">Eye Tracking</p>
              <p className="text-xs text-pink-400 mt-1">Rastreamento ocular</p>
            </div>
            <div className="bg-orange-900/30 p-6 rounded-xl border border-orange-500 hover:border-orange-300 transition">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-orange-300 font-bold">Analytics</p>
              <p className="text-xs text-orange-400 mt-1">Análise completa</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-black text-cyan-400">50K+</p>
              <p className="text-zinc-400">Usuários Ativos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-purple-400">1M+</p>
              <p className="text-zinc-400">Treinos Completos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-pink-400">4.9★</p>
              <p className="text-zinc-400">Avaliação</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ DASHBOARD COMPLETO ============
function Dashboard() {
  const [xp, setXp] = useState(2450);
  const [water, setWater] = useState(1800);
  const [level, setLevel] = useState(12);
  const [calories, setCalories] = useState(1850);
  const [workouts, setWorkouts] = useState(24);
  const [streak, setStreak] = useState(7);
  const [selectedTab, setSelectedTab] = useState('overview');

  const recentWorkouts = [
    { name: 'Flexão de Braço', date: 'Hoje', duration: '45 min', calories: 250 },
    { name: 'Agachamento', date: 'Ontem', duration: '60 min', calories: 350 },
    { name: 'Supino', date: '2 dias atrás', duration: '50 min', calories: 300 },
    { name: 'Corrida', date: '3 dias atrás', duration: '30 min', calories: 400 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-cyan-400">Bem-vindo de volta! 🚀</h1>
        <div className="flex gap-2">
          <button className="bg-cyan-600 hover:bg-cyan-700 p-3 rounded-lg transition">
            <Bell size={20} />
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg transition">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-700">
        {['overview', 'progress', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 font-bold transition ${
              selectedTab === tab
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-zinc-400 hover:text-zinc-300'
            }`}
          >
            {tab === 'overview' && 'Visão Geral'}
            {tab === 'progress' && 'Progresso'}
            {tab === 'history' && 'Histórico'}
          </button>
        ))}
      </div>

      {selectedTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 p-6 rounded-xl border-2 border-cyan-500 hover:border-cyan-300 transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-cyan-300 text-sm font-bold">NÍVEL</p>
                <Zap size={20} className="text-cyan-400" />
              </div>
              <p className="text-4xl font-black text-cyan-400">{level}</p>
              <p className="text-xs text-cyan-400 mt-2">+2 próximo nível</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 p-6 rounded-xl border-2 border-purple-500 hover:border-purple-300 transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-purple-300 text-sm font-bold">XP</p>
                <TrendingUp size={20} className="text-purple-400" />
              </div>
              <p className="text-4xl font-black text-purple-400">{xp}</p>
              <p className="text-xs text-purple-400 mt-2">550 até próximo</p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-6 rounded-xl border-2 border-blue-500 hover:border-blue-300 transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-blue-300 text-sm font-bold">ÁGUA</p>
                <Droplets size={20} className="text-blue-400" />
              </div>
              <p className="text-4xl font-black text-blue-400">{water}ml</p>
              <p className="text-xs text-blue-400 mt-2">200ml restante</p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 p-6 rounded-xl border-2 border-pink-500 hover:border-pink-300 transition">
              <div className="flex items-center justify-between mb-2">
                <p className="text-pink-300 text-sm font-bold">TREINOS</p>
                <Dumbbell size={20} className="text-pink-400" />
              </div>
              <p className="text-4xl font-black text-pink-400">{workouts}</p>
              <p className="text-xs text-pink-400 mt-2">Mês atual</p>
            </div>
          </div>

          {/* Progresso */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-8 rounded-2xl border-2 border-purple-500 space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <h2 className="text-2xl font-bold text-white">Sua Meta Está Próxima</h2>
                <span className="text-cyan-400 font-bold">82%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all" style={{ width: '82%' }} />
              </div>
              <p className="text-zinc-300 mt-4">2450 / 3000 XP para próximo nível</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-black text-orange-400">{streak}</p>
                <p className="text-zinc-400">Dias de Sequência</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-green-400">{calories}</p>
                <p className="text-zinc-400">Calorias Queimadas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-cyan-400">12</p>
                <p className="text-zinc-400">Conquistas</p>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => setWater(water + 250)} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
              <Plus size={20} /> Água
            </button>
            <button onClick={() => setXp(xp + 100)} className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
              <Zap size={20} /> XP
            </button>
            <button onClick={() => setStreak(streak + 1)} className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
              <Flame size={20} /> Sequência
            </button>
          </div>
        </>
      )}

      {selectedTab === 'progress' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Seu Progresso</h2>
          <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
            <p className="text-zinc-300">Gráfico de progresso será exibido aqui com dados de treinos, peso, medidas e mais.</p>
          </div>
        </div>
      )}

      {selectedTab === 'history' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Histórico de Treinos</h2>
          {recentWorkouts.map((w, i) => (
            <div key={i} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 flex justify-between items-center hover:border-cyan-500 transition">
              <div>
                <p className="text-white font-bold">{w.name}</p>
                <p className="text-zinc-400 text-sm">{w.date} • {w.duration}</p>
              </div>
              <p className="text-orange-400 font-bold">{w.calories} cal</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ TREINOS DE ACADEMIA ============
function AcademyWorkouts() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [expandedInfo, setExpandedInfo] = useState(null);

  const exercises = [
    {
      id: 1,
      name: 'Flexão de Braço',
      muscles: 'Peito, Tríceps, Ombros',
      difficulty: 'Iniciante',
      correct: '✅ Corpo reto, desça até 90°, mantenha o core contraído. Mãos na largura dos ombros. Cotovelos a 45°. Suba explosivamente.',
      incorrect: '❌ Quadril caído, cotovelo aberto demais, cabeça para baixo, velocidade descontrolada.',
      cautions: '⚠️ Não force o ombro, mantenha o pescoço neutro, respire corretamente (inspire ao descer, expire ao subir).',
      injuries: '🚨 Síndrome do impacto, tendinite, lesão do manguito rotador. Prevenção: Aquecimento, progressão gradual.',
      progression: 'Semana 1-2: 3x8 | Semana 3-4: 3x12 | Semana 5-6: 4x15 | Semana 7+: 4x20 ou variações',
      benefits: '💪 Fortalece peito, braços e core. Melhora postura. Aumenta resistência muscular.',
      tips: '💡 Faça em superfície firme. Mantenha o ritmo constante. Não descanse entre repetições.'
    },
    {
      id: 2,
      name: 'Agachamento',
      muscles: 'Pernas, Glúteos, Core',
      difficulty: 'Iniciante',
      correct: '✅ Pés na largura dos ombros, desça até 90°, joelhos atrás da ponta dos pés, costas retas, peso nos calcanhares.',
      incorrect: '❌ Joelhos para dentro, costas arredondadas, peso na ponta dos pés, profundidade insuficiente.',
      cautions: '⚠️ Não force os joelhos, mantenha o peso nos calcanhares, respire corretamente.',
      injuries: '🚨 Lesão de menisco, dor patelofemoral, lesão ligamentar. Prevenção: Técnica correta, progressão gradual.',
      progression: 'Semana 1-2: 3x10 | Semana 3-4: 3x15 | Semana 5-6: 4x20 | Semana 7+: 4x25 ou com peso',
      benefits: '💪 Fortalece pernas e glúteos. Melhora equilíbrio. Queima muitas calorias.',
      tips: '💡 Mantenha o peito para frente. Desça lentamente. Suba explosivamente.'
    },
    {
      id: 3,
      name: 'Supino',
      muscles: 'Peito, Tríceps, Ombros',
      difficulty: 'Intermediário',
      correct: '✅ Barra no peito, cotovelos a 45°, empurre explosivamente, mantenha a estabilidade.',
      incorrect: '❌ Barra muito alta, cotovelo muito aberto, movimento descontrolado.',
      cautions: '⚠️ Use spotter, não force o ombro, respire corretamente.',
      injuries: '🚨 Lesão do manguito rotador, tendinite. Prevenção: Aquecimento, técnica correta.',
      progression: 'Semana 1-2: 3x8 | Semana 3-4: 3x10 | Semana 5-6: 4x12 | Semana 7+: 4x15',
      benefits: '💪 Fortalece peito, braços e ombros. Aumenta força explosiva.',
      tips: '💡 Sempre use spotter. Mantenha a barra controlada. Não salte.'
    },
    {
      id: 4,
      name: 'Rosca Direta',
      muscles: 'Bíceps, Antebraço',
      difficulty: 'Iniciante',
      correct: '✅ Pés firmes, cotovelos junto ao corpo, levante até o ombro, mantenha o controle.',
      incorrect: '❌ Movimento de balanço, cotovelos afastados, velocidade descontrolada.',
      cautions: '⚠️ Não use impulso, mantenha o movimento controlado.',
      injuries: '🚨 Tendinite, lesão do bíceps. Prevenção: Técnica correta, progressão gradual.',
      progression: 'Semana 1-2: 3x10 | Semana 3-4: 3x12 | Semana 5-6: 4x15 | Semana 7+: 4x20',
      benefits: '💪 Fortalece bíceps e antebraço. Aumenta força de tração.',
      tips: '💡 Mantenha o movimento lento e controlado. Não use impulso.'
    },
    {
      id: 5,
      name: 'Extensão de Perna',
      muscles: 'Quadríceps',
      difficulty: 'Iniciante',
      correct: '✅ Sente-se corretamente, estenda a perna completamente, mantenha o controle.',
      incorrect: '❌ Movimento rápido, não estenda completamente, movimento descontrolado.',
      cautions: '⚠️ Não force o joelho, mantenha o movimento controlado.',
      injuries: '🚨 Dor patelofemoral, lesão do quadríceps. Prevenção: Técnica correta, progressão gradual.',
      progression: 'Semana 1-2: 3x12 | Semana 3-4: 3x15 | Semana 5-6: 4x18 | Semana 7+: 4x20',
      benefits: '💪 Fortalece quadríceps. Melhora estabilidade do joelho.',
      tips: '💡 Mantenha o movimento lento. Não force o joelho.'
    },
    {
      id: 6,
      name: 'Leg Press',
      muscles: 'Pernas, Glúteos',
      difficulty: 'Intermediário',
      correct: '✅ Sente-se corretamente, pés na largura dos ombros, empurre até 90°, mantenha o controle.',
      incorrect: '❌ Joelhos para dentro, movimento rápido, não estenda completamente.',
      cautions: '⚠️ Não force os joelhos, mantenha o movimento controlado.',
      injuries: '🚨 Lesão de joelho, lesão de costas. Prevenção: Técnica correta, progressão gradual.',
      progression: 'Semana 1-2: 3x10 | Semana 3-4: 3x12 | Semana 5-6: 4x15 | Semana 7+: 4x20',
      benefits: '💪 Fortalece pernas e glúteos. Queima muitas calorias.',
      tips: '💡 Mantenha a postura correta. Não force os joelhos.'
    },
    {
      id: 7,
      name: 'Puxada Frontal',
      muscles: 'Costas, Bíceps',
      difficulty: 'Intermediário',
      correct: '✅ Sente-se corretamente, puxe até o peito, mantenha o controle, volte lentamente.',
      incorrect: '❌ Movimento rápido, não puxe até o peito, movimento descontrolado.',
      cautions: '⚠️ Não force o ombro, mantenha o movimento controlado.',
      injuries: '🚨 Lesão do ombro, tendinite. Prevenção: Técnica correta, progressão gradual.',
      progression: 'Semana 1-2: 3x10 | Semana 3-4: 3x12 | Semana 5-6: 4x15 | Semana 7+: 4x20',
      benefits: '💪 Fortalece costas e bíceps. Melhora postura.',
      tips: '💡 Mantenha o movimento lento. Puxe até o peito.'
    },
    {
      id: 8,
      name: 'Remada Curvada',
      muscles: 'Costas, Bíceps',
      difficulty: 'Intermediário',
      correct: '✅ Pés firmes, costas retas, puxe até o abdômen, mantenha o controle.',
      incorrect: '❌ Costas arredondadas, movimento rápido, não puxe até o abdômen.',
      cautions: '⚠️ Não force as costas, mantenha a postura correta.',
      injuries: '🚨 Lesão de costas, tendinite. Prevenção: Técnica correta, progressão gradual.',
      progression: 'Semana 1-2: 3x10 | Semana 3-4: 3x12 | Semana 5-6: 4x15 | Semana 7+: 4x20',
      benefits: '💪 Fortalece costas e bíceps. Melhora postura.',
      tips: '💡 Mantenha as costas retas. Puxe até o abdômen.'
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black text-cyan-400">💪 Treinos de Academia</h1>

      {!selectedExercise ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-xl border-2 border-purple-500 hover:border-cyan-500 transition text-left group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition">{ex.name}</h3>
                  <p className="text-purple-300">{ex.muscles}</p>
                  <p className="text-xs text-purple-400 mt-2">Dificuldade: {ex.difficulty}</p>
                </div>
                <ChevronRight className="text-purple-400 group-hover:text-cyan-400 transition" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 p-8 rounded-2xl border-2 border-cyan-500 space-y-6">
          <button
            onClick={() => setSelectedExercise(null)}
            className="text-cyan-400 hover:text-cyan-300 font-bold mb-4 flex items-center gap-2"
          >
            <ChevronLeft size={20} /> Voltar
          </button>

          <h2 className="text-3xl font-black text-cyan-400">{selectedExercise.name}</h2>

          {/* Visualização 3D */}
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-700 p-8 rounded-xl border-2 border-cyan-500 text-center">
            <div className="text-8xl mb-4">🎥</div>
            <p className="text-cyan-300 font-bold text-lg">Visualização 3D do Exercício</p>
            <p className="text-zinc-400 text-sm mt-2">Modelo 3D interativo será exibido aqui</p>
          </div>

          {/* Abas de Informações */}
          <div className="space-y-4">
            <div
              className="bg-green-900/30 p-4 rounded-xl border-2 border-green-500 cursor-pointer hover:border-green-300 transition"
              onClick={() => setExpandedInfo(expandedInfo === 'correct' ? null : 'correct')}
            >
              <p className="text-green-300 font-bold text-lg flex items-center gap-2">
                <ChevronRight size={20} /> Forma Correta
              </p>
              {expandedInfo === 'correct' && <p className="text-green-200 mt-2">{selectedExercise.correct}</p>}
            </div>

            <div
              className="bg-red-900/30 p-4 rounded-xl border-2 border-red-500 cursor-pointer hover:border-red-300 transition"
              onClick={() => setExpandedInfo(expandedInfo === 'incorrect' ? null : 'incorrect')}
            >
              <p className="text-red-300 font-bold text-lg flex items-center gap-2">
                <ChevronRight size={20} /> Forma Incorreta
              </p>
              {expandedInfo === 'incorrect' && <p className="text-red-200 mt-2">{selectedExercise.incorrect}</p>}
            </div>

            <div
              className="bg-yellow-900/30 p-4 rounded-xl border-2 border-yellow-500 cursor-pointer hover:border-yellow-300 transition"
              onClick={() => setExpandedInfo(expandedInfo === 'cautions' ? null : 'cautions')}
            >
              <p className="text-yellow-300 font-bold text-lg flex items-center gap-2">
                <ChevronRight size={20} /> Cuidados
              </p>
              {expandedInfo === 'cautions' && <p className="text-yellow-200 mt-2">{selectedExercise.cautions}</p>}
            </div>

            <div
              className="bg-pink-900/30 p-4 rounded-xl border-2 border-pink-500 cursor-pointer hover:border-pink-300 transition"
              onClick={() => setExpandedInfo(expandedInfo === 'injuries' ? null : 'injuries')}
            >
              <p className="text-pink-300 font-bold text-lg flex items-center gap-2">
                <ChevronRight size={20} /> Lesões Possíveis
              </p>
              {expandedInfo === 'injuries' && <p className="text-pink-200 mt-2">{selectedExercise.injuries}</p>}
            </div>

            <div
              className="bg-purple-900/30 p-4 rounded-xl border-2 border-purple-500 cursor-pointer hover:border-purple-300 transition"
              onClick={() => setExpandedInfo(expandedInfo === 'progression' ? null : 'progression')}
            >
              <p className="text-purple-300 font-bold text-lg flex items-center gap-2">
                <ChevronRight size={20} /> Progressão
              </p>
              {expandedInfo === 'progression' && <p className="text-purple-200 mt-2">{selectedExercise.progression}</p>}
            </div>

            <div
              className="bg-cyan-900/30 p-4 rounded-xl border-2 border-cyan-500 cursor-pointer hover:border-cyan-300 transition"
              onClick={() => setExpandedInfo(expandedInfo === 'benefits' ? null : 'benefits')}
            >
              <p className="text-cyan-300 font-bold text-lg flex items-center gap-2">
                <ChevronRight size={20} /> Benefícios
              </p>
              {expandedInfo === 'benefits' && <p className="text-cyan-200 mt-2">{selectedExercise.benefits}</p>}
            </div>

            <div
              className="bg-orange-900/30 p-4 rounded-xl border-2 border-orange-500 cursor-pointer hover:border-orange-300 transition"
              onClick={() => setExpandedInfo(expandedInfo === 'tips' ? null : 'tips')}
            >
              <p className="text-orange-300 font-bold text-lg flex items-center gap-2">
                <ChevronRight size={20} /> Dicas
              </p>
              {expandedInfo === 'tips' && <p className="text-orange-200 mt-2">{selectedExercise.tips}</p>}
            </div>
          </div>

          {/* Botão de Detecção de Pose */}
          <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
            📹 Iniciar Detecção de Pose
          </button>
        </div>
      )}
    </div>
  );
}

// ============ TREINOS EM CASA ============
function HomeWorkouts() {
  const homeExercises = [
    { name: 'Flexão', difficulty: 'Iniciante', reps: '3x10-20', time: '15 min' },
    { name: 'Agachamento', difficulty: 'Iniciante', reps: '3x15-25', time: '15 min' },
    { name: 'Prancha', difficulty: 'Iniciante', reps: '3x30-60s', time: '10 min' },
    { name: 'Burpee', difficulty: 'Intermediário', reps: '3x10-15', time: '15 min' },
    { name: 'Abdominal', difficulty: 'Iniciante', reps: '3x15-25', time: '10 min' },
    { name: 'Polichinelo', difficulty: 'Iniciante', reps: '3x20-30', time: '10 min' },
    { name: 'Afundo', difficulty: 'Iniciante', reps: '3x10-15', time: '15 min' },
    { name: 'Dips', difficulty: 'Intermediário', reps: '3x8-15', time: '15 min' },
    { name: 'Mountain Climber', difficulty: 'Intermediário', reps: '3x20-30', time: '10 min' },
    { name: 'Corrida no Lugar', difficulty: 'Iniciante', reps: '3x1min', time: '5 min' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black text-cyan-400">🏠 Treinos em Casa</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {homeExercises.map((ex, i) => (
          <button
            key={i}
            className="bg-gradient-to-br from-orange-900 to-orange-800 p-6 rounded-xl border-2 border-orange-500 hover:border-cyan-500 transition text-left group"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition">{ex.name}</h3>
                <p className="text-orange-300 text-sm">Dificuldade: {ex.difficulty}</p>
                <p className="text-orange-400 text-sm mt-1">Séries: {ex.reps}</p>
                <p className="text-orange-400 text-sm">Tempo: {ex.time}</p>
              </div>
              <ChevronRight className="text-orange-400 group-hover:text-cyan-400 transition" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ IA COACH ============
function AICoach() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '🤖 Olá! Sou seu IA Coach Premium! Sou especializado em treinos, nutrição, recuperação e muito mais. Como posso ajudá-lo a alcançar seus objetivos extraordinários? 💪', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();

    const responses = {
      flexão: '💪 Flexão é EXCELENTE para peito, tríceps e ombros! Técnica perfeita: Corpo reto, desça até 90°, mantenha o core contraído. Faça 3-4 séries de 8-15 repetições. Progressão: Aumente repetições, depois tente variações (diamante, archer, pistol)!',
      agachamento: '🦵 Agachamento é o REI dos exercícios de perna! Técnica: Pés na largura dos ombros, desça até 90°, joelhos atrás da ponta dos pés. 3-4 séries de 10-20 reps. Variações: Agachamento búlgaro, pistol squat, jump squat, sissy squat!',
      água: '💧 HIDRATAÇÃO É TUDO! Beba 3-4 litros por dia normalmente. Durante treinos: 500ml a cada 20 minutos. Após treino: 150% do peso perdido em água. Dica: Beba água com eletrólitos para melhor absorção e recuperação!',
      nutrição: '🍎 Nutrição é 70% do resultado! Proteína: 1.6-2.2g por kg. Carbos: 3-5g por kg. Gorduras: 0.8-1.2g por kg. Coma: Frango, ovos, peixe, arroz, batata-doce, abacate, nozes. Evite: Ultraprocessados, açúcar refinado, bebidas açucaradas!',
      treino: '📅 Rotina perfeita: 4-5 dias de treino com 1-2 dias de descanso. Segunda: Peito/Tríceps. Terça: Costas/Bíceps. Quarta: Pernas. Quinta: Ombros. Sexta: Full Body. Sempre com 48h de descanso entre grupos musculares!',
      dor: '⚠️ DOR É SINAL DE ALERTA! Dor aguda = PARE IMEDIATAMENTE! Dor muscular (DOMS) é normal após treino. Se persistir por mais de 5 dias, consulte um profissional. Nunca treine com dor! Use gelo, repouso e compressão.',
      recuperação: '😴 Recuperação é quando você CRESCE! Durma 7-9 horas por noite. Técnicas: Alongamento, massagem, sauna, meditação. Coma proteína pós-treino em até 30 minutos. Descanse 48-72h entre grupos musculares!',
      cardio: '🏃 Cardio é essencial! 150 min/semana de intensidade moderada OU 75 min/semana de alta intensidade. Tipos: Corrida, natação, ciclismo, HIIT, pular corda. Não interfere com ganho de massa se feito corretamente!',
      ganho: '📈 Para ganhar massa: Superávit calórico de 300-500 cal. Treino pesado 4-5x/semana. Proteína alta (2g/kg). Durma bem. Paciência: 0.5-1kg/mês é ganho saudável. Suplementos: Whey, creatina, BCAA (opcional)!',
      perda: '⚡ Para emagrecer: Déficit calórico de 300-500 cal. Treino + cardio. Proteína alta (2-2.5g/kg) para preservar músculo. Beba muita água. Durma bem. Paciência: 0.5-1kg/semana é saudável!',
      default: '🎯 Ótima pergunta! Para resultados extraordinários, combine: Treino consistente, nutrição perfeita, hidratação, sono de qualidade e paciência. Você consegue! 💪 Quer detalhes sobre algo específico?',
    };

    for (const [key, value] of Object.entries(responses)) {
      if (lower.includes(key)) {
        return value;
      }
    }

    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: aiResponse, timestamp: new Date() },
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-zinc-950 to-zinc-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-cyan-900 p-6 border-b-2 border-purple-500">
        <div className="flex items-center gap-3">
          <Brain size={32} className="text-cyan-400" />
          <div>
            <h1 className="text-2xl font-black text-white">IA Coach Premium</h1>
            <p className="text-cyan-300 text-sm">Seu assistente de treino 24/7 • Sempre disponível</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div
              className={`max-w-xs lg:max-w-md p-4 rounded-2xl shadow-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none'
                  : 'bg-gradient-to-r from-purple-900 to-purple-800 text-zinc-100 rounded-bl-none border border-purple-500'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <p className="text-xs mt-2 opacity-70">
                {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-purple-900 text-zinc-100 p-4 rounded-2xl rounded-bl-none border border-purple-500">
              <div className="flex gap-2">
                <Zap size={16} className="text-cyan-400 animate-pulse" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t-2 border-purple-500 bg-zinc-900">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Pergunte sobre exercícios, nutrição, treino, recuperação..."
            className="flex-1 bg-zinc-800 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 border-2 border-zinc-700 transition"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 p-3 rounded-xl transition transform hover:scale-105 active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ CRONÔMETRO ============
function WorkoutTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('5');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      setIsRunning(false);
      playSound();
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const playSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 1000;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log('Som não disponível');
    }
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (minutes) => {
    setSeconds(minutes * 60);
    setIsRunning(true);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const addSet = () => {
    setSets(sets + 1);
  };

  const addRep = () => {
    setReps(reps + 1);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 p-8">
      <h1 className="text-5xl font-black mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        ⏱️ Cronômetro Premium
      </h1>

      <div className="max-w-2xl mx-auto">
        {/* Display Principal */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-12 border-3 border-cyan-500 text-center mb-8 shadow-2xl">
          <div className="text-8xl font-black font-mono mb-6 text-cyan-400 drop-shadow-lg">
            {formatTime(seconds)}
          </div>

          {/* Presets */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => startTimer(1)}
              disabled={isRunning}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-zinc-700 disabled:to-zinc-700 p-4 rounded-xl font-bold transition transform hover:scale-105 active:scale-95"
            >
              1 min
            </button>
            <button
              onClick={() => startTimer(3)}
              disabled={isRunning}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-zinc-700 disabled:to-zinc-700 p-4 rounded-xl font-bold transition transform hover:scale-105 active:scale-95"
            >
              3 min
            </button>
            <button
              onClick={() => startTimer(5)}
              disabled={isRunning}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-zinc-700 disabled:to-zinc-700 p-4 rounded-xl font-bold transition transform hover:scale-105 active:scale-95"
            >
              5 min
            </button>
            <button
              onClick={() => startTimer(10)}
              disabled={isRunning}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-zinc-700 disabled:to-zinc-700 p-4 rounded-xl font-bold transition transform hover:scale-105 active:scale-95"
            >
              10 min
            </button>
          </div>

          {/* Input Customizado */}
          <div className="flex gap-2 mb-8">
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              min="0"
              max="60"
              className="flex-1 bg-zinc-800 px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 border-2 border-zinc-700 font-bold text-lg"
              placeholder="Minutos"
            />
            <button
              onClick={() => startTimer(parseInt(inputMinutes) || 1)}
              disabled={isRunning}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:from-zinc-700 disabled:to-zinc-700 px-6 py-3 rounded-xl font-bold transition transform hover:scale-105 active:scale-95"
            >
              Iniciar
            </button>
          </div>

          {/* Controles Principais */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={toggleTimer}
              className={`flex-1 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 ${
                isRunning
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause size={20} /> Pausar
                </>
              ) : (
                <>
                  <Play size={20} /> Retomar
                </>
              )}
            </button>
            <button
              onClick={resetTimer}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <RotateCcw size={20} /> Resetar
            </button>
          </div>

          {/* Status */}
          <div className="bg-zinc-700 p-4 rounded-xl border border-cyan-500">
            <p className="text-cyan-300 text-lg font-bold">
              {seconds === 0
                ? '🎯 Selecione um tempo para começar'
                : isRunning
                ? '⚡ Cronômetro em execução...'
                : '⏸️ Cronômetro pausado'}
            </p>
          </div>
        </div>

        {/* Rastreamento de Sets e Reps */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-6 border-2 border-purple-500 text-center">
            <p className="text-purple-300 text-sm font-bold mb-2">SÉRIES</p>
            <p className="text-5xl font-black text-purple-400 mb-4">{sets}</p>
            <button
              onClick={addSet}
              className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg font-bold transition flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Série
            </button>
          </div>

          <div className="bg-gradient-to-br from-cyan-900 to-cyan-800 rounded-2xl p-6 border-2 border-cyan-500 text-center">
            <p className="text-cyan-300 text-sm font-bold mb-2">REPETIÇÕES</p>
            <p className="text-5xl font-black text-cyan-400 mb-4">{reps}</p>
            <button
              onClick={addRep}
              className="w-full bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg font-bold transition flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Rep
            </button>
          </div>
        </div>

        {/* Dica */}
        <div className="bg-gradient-to-r from-zinc-800 to-zinc-700 p-6 rounded-2xl border-2 border-cyan-500 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Volume2 size={20} className="text-cyan-400" />
            <p className="text-cyan-400 font-bold">Dica de Treino</p>
          </div>
          <p className="text-zinc-300">
            Use este cronômetro para controlar o tempo de descanso entre séries. Descanso ideal: 60-90 segundos para hipertrofia, 30-45 segundos para resistência, 2-3 minutos para força máxima!
          </p>
        </div>
      </div>
    </div>
  );
}

// ============ HIDRATAÇÃO ============
function Hydration() {
  const [water, setWater] = useState(1800);
  const dailyGoal = 3000;

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black text-blue-400">💧 Hidratação</h1>

      <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-8 rounded-2xl border-2 border-blue-500">
        <div className="text-center mb-6">
          <p className="text-blue-300 text-sm font-bold mb-2">INGESTÃO DIÁRIA</p>
          <p className="text-6xl font-black text-blue-400">{water}ml</p>
          <p className="text-blue-300 mt-2">Meta: {dailyGoal}ml</p>
        </div>

        <div className="w-full bg-zinc-700 rounded-full h-6 overflow-hidden mb-6">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all"
            style={{ width: `${(water / dailyGoal) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setWater(Math.min(water + 250, dailyGoal))}
            className="bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
          >
            <Plus size={20} /> 250ml
          </button>
          <button
            onClick={() => setWater(Math.min(water + 500, dailyGoal))}
            className="bg-cyan-600 hover:bg-cyan-700 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
          >
            <Plus size={20} /> 500ml
          </button>
          <button
            onClick={() => setWater(Math.max(water - 250, 0))}
            className="bg-red-600 hover:bg-red-700 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
          >
            <Minus size={20} /> 250ml
          </button>
        </div>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl border border-blue-500">
        <p className="text-blue-300 font-bold mb-2">💡 Dicas de Hidratação:</p>
        <ul className="text-zinc-300 space-y-2 text-sm">
          <li>• Beba 3-4 litros por dia normalmente</li>
          <li>• Durante treinos: 500ml a cada 20 minutos</li>
          <li>• Após treino: 150% do peso perdido em água</li>
          <li>• Beba água com eletrólitos para melhor absorção</li>
          <li>• Urina clara = hidratação adequada</li>
        </ul>
      </div>
    </div>
  );
}

// ============ CONQUISTAS ============
function Achievements() {
  const achievements = [
    { icon: '🏆', name: 'Primeiro Treino', desc: 'Complete seu primeiro treino', unlocked: true },
    { icon: '🔥', name: 'Sequência de 7 Dias', desc: 'Treine 7 dias seguidos', unlocked: true },
    { icon: '💪', name: 'Força Máxima', desc: 'Levante 100kg no supino', unlocked: false },
    { icon: '⚡', name: 'Velocidade', desc: 'Complete 50 flexões em 5 min', unlocked: false },
    { icon: '🎯', name: 'Precisão', desc: 'Acerte 100% das formas', unlocked: false },
    { icon: '🌟', name: 'Lenda', desc: 'Atinja nível 50', unlocked: false },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black text-yellow-400">🏆 Conquistas</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((ach, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl border-2 text-center transition ${
              ach.unlocked
                ? 'bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-500'
                : 'bg-zinc-800/30 border-zinc-700 opacity-50'
            }`}
          >
            <p className="text-4xl mb-2">{ach.icon}</p>
            <p className="font-bold text-white">{ach.name}</p>
            <p className="text-xs text-zinc-400 mt-2">{ach.desc}</p>
            {ach.unlocked && <p className="text-yellow-400 text-xs mt-2">✓ Desbloqueado</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ PERFIL ============
function Profile() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black text-cyan-400">👤 Perfil</h1>

      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border-2 border-cyan-500 text-center">
        <div className="text-8xl mb-4">👨‍💼</div>
        <h2 className="text-3xl font-black text-white mb-2">Usuário Premium</h2>
        <p className="text-cyan-300 mb-6">Membro desde Janeiro de 2024</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-700 p-4 rounded-xl">
            <p className="text-2xl font-black text-cyan-400">24</p>
            <p className="text-zinc-400 text-sm">Treinos</p>
          </div>
          <div className="bg-zinc-700 p-4 rounded-xl">
            <p className="text-2xl font-black text-purple-400">12</p>
            <p className="text-zinc-400 text-sm">Nível</p>
          </div>
          <div className="bg-zinc-700 p-4 rounded-xl">
            <p className="text-2xl font-black text-orange-400">7</p>
            <p className="text-zinc-400 text-sm">Sequência</p>
          </div>
        </div>

        <button className="w-full bg-cyan-600 hover:bg-cyan-700 p-4 rounded-xl font-bold transition">
          Editar Perfil
        </button>
      </div>
    </div>
  );
}

// ============ CONFIGURAÇÕES ============
function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black text-cyan-400">⚙️ Configurações</h1>

      <div className="space-y-4">
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 flex justify-between items-center">
          <p className="font-bold text-white">Modo Escuro</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              darkMode ? 'bg-cyan-600' : 'bg-zinc-700'
            }`}
          >
            {darkMode ? 'Ativado' : 'Desativado'}
          </button>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 flex justify-between items-center">
          <p className="font-bold text-white">Notificações</p>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              notifications ? 'bg-cyan-600' : 'bg-zinc-700'
            }`}
          >
            {notifications ? 'Ativadas' : 'Desativadas'}
          </button>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
          <p className="font-bold text-white mb-2">Versão do App</p>
          <p className="text-zinc-400">1.0.0 - Premium Edition</p>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, setLocation] = useLocation();

  if (!isLoggedIn) {
    return <LandingPage onEnter={() => setIsLoggedIn(true)} />;
  }

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Dumbbell, label: 'Academia', path: '/academy' },
    { icon: Home, label: 'Casa', path: '/home' },
    { icon: Brain, label: 'IA Coach', path: '/coach' },
    { icon: Clock, label: 'Cronômetro', path: '/timer' },
    { icon: Droplets, label: 'Hidratação', path: '/hydration' },
    { icon: Trophy, label: 'Conquistas', path: '/achievements' },
    { icon: User, label: 'Perfil', path: '/profile' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
  ];

  return (
    <HashRouter>
      <div className="flex h-screen bg-zinc-900">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-gradient-to-b from-zinc-900 to-zinc-800 border-r border-cyan-500 overflow-hidden transition-all duration-300 flex flex-col`}
        >
          <div className="p-4 border-b border-cyan-500">
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🏋️ AURA
            </h1>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  setLocation(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                  location === item.path
                    ? 'bg-cyan-600 text-white'
                    : 'hover:bg-zinc-700 text-zinc-300'
                }`}
              >
                <item.icon size={20} />
                <span className="font-bold">{item.label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="m-4 w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-b-2 border-cyan-500 p-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-cyan-400 hover:text-cyan-300"
            >
              {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <h1 className="text-2xl font-black text-cyan-400">AURA FITNESS PREMIUM</h1>
            <div className="text-2xl">⚡</div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/academy" component={AcademyWorkouts} />
              <Route path="/home" component={HomeWorkouts} />
              <Route path="/coach" component={AICoach} />
              <Route path="/timer" component={WorkoutTimer} />
              <Route path="/hydration" component={Hydration} />
              <Route path="/achievements" component={Achievements} />
              <Route path="/profile" component={Profile} />
              <Route path="/settings" component={SettingsPage} />
            </Switch>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
