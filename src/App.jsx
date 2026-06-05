import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, LogOut, Home, Dumbbell, Brain, Droplets, Trophy, User, Settings, Clock, Eye, Head2 } from 'lucide-react';
import { HashRouter, Route, Switch, useLocation } from 'wouter';

// ============ LANDING PAGE COM CAPA DINÂMICA ============
function LandingPage({ onEnter }) {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

    // Fundo gradiente extraordinário
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#1e1b4b');
    gradient.addColorStop(1, '#0c0a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Partículas animadas
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3;
      const opacity = Math.random() * 0.5 + 0.2;

      ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Linhas conectadas
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const x1 = Math.random() * canvas.width;
      const y1 = Math.random() * canvas.height;
      const x2 = Math.random() * canvas.width;
      const y2 = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Efeito do mouse
    ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, 100, 0, Math.PI * 2);
    ctx.fill();
  }, [mousePos]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Conteúdo */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-8 animate-fadeIn">
          {/* Logo */}
          <div className="text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
            🏋️ AURA FITNESS
          </div>

          {/* Subtítulo */}
          <div className="text-3xl font-bold text-cyan-300 drop-shadow-lg">
            Premium Fitness Experience
          </div>

          {/* Descrição */}
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Treinos inteligentes com IA Coach, detecção de pose em tempo real, visualização 3D e rastreamento ocular avançado.
            Transforme seu corpo, transforme sua vida.
          </p>

          {/* Botão */}
          <button
            onClick={onEnter}
            className="mt-12 px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-black text-xl rounded-2xl transition transform hover:scale-110 active:scale-95 shadow-2xl"
          >
            🚀 COMEÇAR AGORA
          </button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto">
            <div className="bg-cyan-900/30 p-4 rounded-xl border border-cyan-500">
              <div className="text-3xl mb-2">🎥</div>
              <p className="text-cyan-300 font-bold">3D Avançado</p>
            </div>
            <div className="bg-purple-900/30 p-4 rounded-xl border border-purple-500">
              <div className="text-3xl mb-2">🤖</div>
              <p className="text-purple-300 font-bold">IA Coach</p>
            </div>
            <div className="bg-pink-900/30 p-4 rounded-xl border border-pink-500">
              <div className="text-3xl mb-2">👁️</div>
              <p className="text-pink-300 font-bold">Eye Tracking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ DASHBOARD ============
function Dashboard() {
  const [xp, setXp] = useState(2450);
  const [water, setWater] = useState(1800);
  const [level, setLevel] = useState(12);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black text-cyan-400">Bem-vindo de volta! 🚀</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-zinc-800 p-6 rounded-xl border-2 border-cyan-500">
          <p className="text-cyan-300 text-sm font-bold mb-2">NÍVEL</p>
          <p className="text-4xl font-black text-cyan-400">{level}</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl border-2 border-purple-500">
          <p className="text-purple-300 text-sm font-bold mb-2">XP</p>
          <p className="text-4xl font-black text-purple-400">{xp}</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl border-2 border-blue-500">
          <p className="text-blue-300 text-sm font-bold mb-2">ÁGUA</p>
          <p className="text-4xl font-black text-blue-400">{water}ml</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl border-2 border-pink-500">
          <p className="text-pink-300 text-sm font-bold mb-2">TREINOS</p>
          <p className="text-4xl font-black text-pink-400">24</p>
        </div>
      </div>

      {/* Progresso */}
      <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-8 rounded-2xl border-2 border-purple-500">
        <h2 className="text-2xl font-bold text-white mb-4">Sua Meta Está Próxima</h2>
        <div className="w-full bg-zinc-700 rounded-full h-4 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full" style={{ width: '82%' }} />
        </div>
        <p className="text-zinc-300 mt-4">2450 / 3000 XP para próximo nível</p>
      </div>

      {/* Botões de ação */}
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setWater(water + 250)} className="bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-bold transition">
          💧 Beber Água
        </button>
        <button onClick={() => setXp(xp + 100)} className="bg-purple-600 hover:bg-purple-700 p-4 rounded-xl font-bold transition">
          ⭐ Ganhar XP
        </button>
      </div>
    </div>
  );
}

// ============ TREINOS DE ACADEMIA ============
function AcademyWorkouts() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const exercises = [
    {
      id: 1,
      name: 'Flexão de Braço',
      muscles: 'Peito, Tríceps, Ombros',
      correct: '✅ Corpo reto, desça até 90°, mantenha o core contraído',
      incorrect: '❌ Quadril caído, cotovelo aberto demais',
      cautions: '⚠️ Não force o ombro, mantenha o pescoço neutro',
      injuries: '🚨 Síndrome do impacto, tendinite',
      progression: 'Semana 1-2: 3x8 | Semana 3-4: 3x12 | Semana 5+: 4x15'
    },
    {
      id: 2,
      name: 'Agachamento',
      muscles: 'Pernas, Glúteos, Core',
      correct: '✅ Pés na largura dos ombros, desça até 90°, joelhos atrás da ponta dos pés',
      incorrect: '❌ Joelhos para dentro, costas arredondadas',
      cautions: '⚠️ Não force os joelhos, mantenha o peso nos calcanhares',
      injuries: '🚨 Lesão de menisco, dor patelofemoral',
      progression: 'Semana 1-2: 3x10 | Semana 3-4: 3x15 | Semana 5+: 4x20'
    },
    {
      id: 3,
      name: 'Supino',
      muscles: 'Peito, Tríceps, Ombros',
      correct: '✅ Barra no peito, cotovelos a 45°, empurre explosivamente',
      incorrect: '❌ Barra muito alta, cotovelo muito aberto',
      cautions: '⚠️ Use spotter, não force o ombro',
      injuries: '🚨 Lesão do manguito rotador, tendinite',
      progression: 'Semana 1-2: 3x8 | Semana 3-4: 3x10 | Semana 5+: 4x12'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black text-cyan-400">💪 Treinos de Academia</h1>

      {!selectedExercise ? (
        <div className="grid grid-cols-1 gap-4">
          {exercises.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className="bg-gradient-to-r from-purple-900 to-purple-800 p-6 rounded-xl border-2 border-purple-500 hover:border-cyan-500 transition text-left"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{ex.name}</h3>
              <p className="text-purple-300">{ex.muscles}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 p-8 rounded-2xl border-2 border-cyan-500 space-y-6">
          <button
            onClick={() => setSelectedExercise(null)}
            className="text-cyan-400 hover:text-cyan-300 font-bold mb-4"
          >
            ← Voltar
          </button>

          <h2 className="text-3xl font-black text-cyan-400">{selectedExercise.name}</h2>

          {/* Visualização 3D */}
          <div className="bg-zinc-800 p-6 rounded-xl border-2 border-cyan-500 text-center">
            <div className="text-6xl mb-4">🎥</div>
            <p className="text-cyan-300 font-bold">Visualização 3D do Exercício</p>
          </div>

          {/* Abas de Informações */}
          <div className="space-y-4">
            <div className="bg-green-900/30 p-4 rounded-xl border-2 border-green-500">
              <p className="text-green-300 font-bold text-lg">{selectedExercise.correct}</p>
            </div>

            <div className="bg-red-900/30 p-4 rounded-xl border-2 border-red-500">
              <p className="text-red-300 font-bold text-lg">{selectedExercise.incorrect}</p>
            </div>

            <div className="bg-yellow-900/30 p-4 rounded-xl border-2 border-yellow-500">
              <p className="text-yellow-300 font-bold text-lg">{selectedExercise.cautions}</p>
            </div>

            <div className="bg-pink-900/30 p-4 rounded-xl border-2 border-pink-500">
              <p className="text-pink-300 font-bold text-lg">{selectedExercise.injuries}</p>
            </div>

            <div className="bg-purple-900/30 p-4 rounded-xl border-2 border-purple-500">
              <p className="text-purple-300 font-bold text-lg">📈 {selectedExercise.progression}</p>
            </div>
          </div>

          {/* Botão de Detecção de Pose */}
          <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 p-4 rounded-xl font-bold transition">
            📹 Iniciar Detecção de Pose
          </button>
        </div>
      )}
    </div>
  );
}

// ============ TREINOS EM CASA ============
function HomeWorkouts() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black text-cyan-400">🏠 Treinos em Casa</h1>

      <div className="grid grid-cols-1 gap-4">
        {['Flexão', 'Agachamento', 'Prancha', 'Burpee', 'Abdominal', 'Polichinelo', 'Afundo', 'Dips'].map((ex, i) => (
          <button
            key={i}
            className="bg-gradient-to-r from-orange-900 to-orange-800 p-6 rounded-xl border-2 border-orange-500 hover:border-cyan-500 transition text-left"
          >
            <h3 className="text-2xl font-bold text-white">{ex}</h3>
            <p className="text-orange-300">Sem equipamento • Peso corporal</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ IA COACH ============
function AICoach() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '🤖 Olá! Sou seu IA Coach Premium! Como posso ajudá-lo?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: '✅ Ótima pergunta! Vou ajudá-lo com isso!' }]);
    }, 500);
    setInput('');
  };

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-4xl font-black text-cyan-400 mb-4">🤖 IA Coach Premium</h1>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs p-4 rounded-xl ${
                msg.role === 'user'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-purple-900 text-purple-100 border border-purple-500'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pergunte sobre treino..."
          className="flex-1 bg-zinc-800 px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={handleSend}
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl font-bold transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

// ============ CRONÔMETRO ============
function WorkoutTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black text-cyan-400">⏱️ Cronômetro</h1>

      <div className="bg-zinc-800 p-12 rounded-2xl border-2 border-cyan-500 text-center">
        <div className="text-8xl font-black text-cyan-400 font-mono mb-8">{formatTime(seconds)}</div>

        <div className="grid grid-cols-4 gap-2 mb-8">
          {[1, 3, 5, 10].map((min) => (
            <button
              key={min}
              onClick={() => setSeconds(min * 60)}
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-bold transition"
            >
              {min}m
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1 bg-green-600 hover:bg-green-700 p-4 rounded-xl font-bold transition"
          >
            {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
          </button>
          <button
            onClick={() => { setSeconds(0); setIsRunning(false); }}
            className="flex-1 bg-red-600 hover:bg-red-700 p-4 rounded-xl font-bold transition"
          >
            🔄 Resetar
          </button>
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
              <Route path="/hydration" component={() => <div className="text-white"><h1 className="text-4xl font-black text-cyan-400 mb-4">💧 Hidratação</h1><p>Rastreie sua ingestão de água diária</p></div>} />
              <Route path="/achievements" component={() => <div className="text-white"><h1 className="text-4xl font-black text-cyan-400 mb-4">🏆 Conquistas</h1><p>Desbloqueie conquistas incríveis</p></div>} />
              <Route path="/profile" component={() => <div className="text-white"><h1 className="text-4xl font-black text-cyan-400 mb-4">👤 Perfil</h1><p>Seus dados e progresso</p></div>} />
              <Route path="/settings" component={() => <div className="text-white"><h1 className="text-4xl font-black text-cyan-400 mb-4">⚙️ Configurações</h1><p>Personalize sua experiência</p></div>} />
            </Switch>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
