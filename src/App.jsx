import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";

import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";

import {
  Activity,
  Flame,
  Trophy,
  Target,
  Dumbbell,
  Brain,
  Calendar,
  Droplets,
  User,
  Bell,
  Settings,
  Moon,
  Sun,
  Award,
  Crown,
  Zap,
  Heart,
  TrendingUp,
  Clock,
  Shield,
  Star,
  BarChart3,
  Sparkles,
  Timer,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Home,
  ArrowLeft
} from "lucide-react";

// ======================================
// CUSTOM HOOK - useLocalStorage
// ======================================

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// ======================================
// TOAST COMPONENT
// ======================================

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info
  }[type];

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-bounce z-50`}>
      <Icon size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2">
        <X size={18} />
      </button>
    </div>
  );
};

// ======================================
// NOT FOUND PAGE
// ======================================

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-4xl font-bold mb-4">Página não encontrada</h2>
        <p className="text-zinc-400 text-lg mb-8">
          Desculpe, a página que você está procurando não existe.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/')}
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition"
          >
            <Home size={20} />
            Dashboard
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-zinc-800 hover:bg-zinc-700 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

// ======================================
// CONTEXTOS GLOBAIS
// ======================================

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

// ======================================
// DADOS INICIAIS
// ======================================

const defaultUser = {
  id: 1,
  username: "Atleta",
  email: "atleta@aurafitness.com",
  avatar: "https://i.pravatar.cc/300",
  level: 12,
  xp: 2450,
  nextLevelXp: 3000,
  streak: 18,
  age: 18,
  height: 175,
  weight: 78,
  targetWeight: 72,
  bodyFat: 16,
  muscleMass: 42,
  objective: "Ganho de Massa",
  waterGoal: 3500,
  waterToday: 1800,
  caloriesGoal: 2500,
  caloriesToday: 1920,
  stepsToday: 10234,
  workoutMinutesToday: 73
};

const defaultMissions = [
  { id: 1, title: "Treinar Hoje", xp: 50, completed: true },
  { id: 2, title: "Beber 3 Litros", xp: 35, completed: false },
  { id: 3, title: "Completar Cardio", xp: 80, completed: false },
  { id: 4, title: "Treinar Pernas", xp: 120, completed: false },
  { id: 5, title: "Registrar Refeições", xp: 20, completed: true }
];

const defaultAchievements = [
  { id: 1, title: "Primeiro Treino", description: "Complete seu primeiro treino", unlocked: true, unlockedDate: "2024-01-15", icon: "🏋️" },
  { id: 2, title: "7 Dias Seguidos", description: "Treine 7 dias consecutivos", unlocked: true, unlockedDate: "2024-02-20", icon: "🔥" },
  { id: 3, title: "30 Dias Seguidos", description: "Treine 30 dias consecutivos", unlocked: false, progress: 18, icon: "💪" },
  { id: 4, title: "100 Treinos", description: "Complete 100 treinos", unlocked: false, progress: 45, icon: "🎯" },
  { id: 5, title: "Mestre Fitness", description: "Atinja o nível 50", unlocked: false, progress: 12, icon: "👑" },
  { id: 6, title: "Hidratação Pro", description: "Beba 3 litros de água por 7 dias", unlocked: false, progress: 2, icon: "💧" }
];

const coachMessages = [
  { id: 1, role: "assistant", content: "Bom dia. Seu rendimento da semana está 12% acima da média." },
  { id: 2, role: "assistant", content: "Recomendo aumentar a carga dos exercícios de peito em 5%." },
  { id: 3, role: "assistant", content: "Você ainda precisa beber 1.6 litros de água hoje." }
];

const workoutDatabase = [
  {
    id: 1,
    name: "Supino Reto",
    muscle: "Peito",
    difficulty: "Intermediário",
    sets: 4,
    reps: "8-12",
    rest: "90s",
    favorite: true,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    tips: ["Mantenha os pés fixos no chão.", "Controle a descida.", "Não trave completamente os cotovelos."],
    mistakes: ["Levantar o quadril.", "Descer a barra torta.", "Usar peso excessivo."],
    musclesWorked: ["Peitoral", "Tríceps", "Ombro Anterior"]
  },
  {
    id: 2,
    name: "Agachamento Livre",
    muscle: "Pernas",
    difficulty: "Avançado",
    sets: 5,
    reps: "6-10",
    rest: "120s",
    favorite: false,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    tips: ["Coluna neutra.", "Joelhos alinhados.", "Desça controladamente."],
    mistakes: ["Arredondar lombar.", "Joelhos para dentro.", "Descer pouco."],
    musclesWorked: ["Quadríceps", "Glúteos", "Posterior"]
  },
  {
    id: 3,
    name: "Puxada Frontal",
    muscle: "Costas",
    difficulty: "Iniciante",
    sets: 4,
    reps: "10-12",
    rest: "60s",
    favorite: false,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
    tips: ["Peito aberto.", "Puxar com as costas.", "Controlar retorno."],
    mistakes: ["Usar embalo.", "Puxar atrás da cabeça.", "Curvar lombar."],
    musclesWorked: ["Latíssimo", "Trapézio", "Bíceps"]
  }
];

// ======================================
// PROVIDER
// ======================================

function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);
  const [user, setUser] = useLocalStorage('user', defaultUser);
  const [missions, setMissions] = useLocalStorage('missions', defaultMissions);
  const [achievements, setAchievements] = useLocalStorage('achievements', defaultAchievements);
  const [messages, setMessages] = useLocalStorage('messages', coachMessages);
  const [notifications, setNotifications] = useLocalStorage('notifications', [
    { id: 1, text: "Meta diária atingida." },
    { id: 2, text: "Novo desafio disponível." },
    { id: 3, text: "Hora de beber água." }
  ]);
  const [toast, setToast] = useState(null);

  const addWater = useCallback((amount) => {
    setUser((prev) => ({
      ...prev,
      waterToday: prev.waterToday + amount
    }));
    setToast({ message: `+${amount}ml de água adicionado!`, type: 'success' });
  }, [setUser]);

  const addXP = useCallback((amount) => {
    setUser((prev) => {
      let newXP = prev.xp + amount;
      let level = prev.level;
      let nextXP = prev.nextLevelXp;
      while (newXP >= nextXP) {
        newXP -= nextXP;
        level++;
        nextXP += 500;
      }
      setToast({ message: `+${amount} XP! Você está no nível ${level}!`, type: 'success' });
      return {
        ...prev,
        xp: newXP,
        level,
        nextLevelXp: nextXP
      };
    });
  }, [setUser]);

  const sendMessage = useCallback((message) => {
    if (!message.trim()) {
      setToast({ message: 'Digite uma mensagem!', type: 'warning' });
      return;
    }
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: message }
    ]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Analisando seus dados. Recomendo manter o foco na meta semanal."
        }
      ]);
    }, 1000);
  }, [setMessages]);

  const value = useMemo(() => ({
    darkMode, setDarkMode,
    user, setUser,
    missions, setMissions,
    achievements, setAchievements,
    messages, sendMessage,
    addWater, addXP,
    notifications, setNotifications,
    toast, setToast
  }), [darkMode, setDarkMode, user, setUser, missions, setMissions, achievements, setAchievements, messages, sendMessage, addWater, addXP, notifications, setNotifications, toast, setToast]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// ======================================
// LAYOUT PRINCIPAL
// ======================================

function MainLayout({ children }) {
  const { darkMode } = useApp();
  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "bg-zinc-950 text-white" : "bg-white text-black"}`}>
      {children}
    </div>
  );
}

// ======================================
// SIDEBAR PREMIUM COM RESPONSIVIDADE
// ======================================

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Activity, title: "Dashboard", path: "/" },
    { icon: Dumbbell, title: "Treinos", path: "/workouts" },
    { icon: Brain, title: "IA Coach", path: "/coach" },
    { icon: Droplets, title: "Hidratação", path: "/hydration" },
    { icon: Flame, title: "Nutrição", path: "/nutrition" },
    { icon: Trophy, title: "Conquistas", path: "/achievements" },
    { icon: Timer, title: "Cronômetro", path: "/timer" },
    { icon: User, title: "Perfil", path: "/profile" },
    { icon: Settings, title: "Configurações", path: "/settings" }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40 bg-cyan-500 p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-72 min-h-screen border-r border-zinc-800 p-5 transition-transform duration-300 z-30 bg-zinc-950`}>
        <div className="mb-10">
          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Aura Fitness
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-zinc-900 transition-all text-left"
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// ======================================
// NAVBAR PREMIUM
// ======================================

function Navbar() {
  const { darkMode, setDarkMode, notifications } = useApp();
  return (
    <header className="h-24 border-b border-zinc-800 flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold">Bem-vindo de volta 🚀</h2>
        <p className="text-zinc-400">Continue sua evolução.</p>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun /> : <Moon />}
        </button>
        <div className="relative">
          <Bell />
          <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-xs px-2">
            {notifications.length}
          </span>
        </div>
      </div>
    </header>
  );
}

// ======================================
// COMPONENTES AUXILIARES
// ======================================

function StatCard({ icon, title, value }) {
  const Icon = icon;
  return (
    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 hover:border-cyan-500 transition-all">
      <div className="flex justify-between">
        <div>
          <p className="text-zinc-400">{title}</p>
          <h3 className="text-4xl font-black mt-3">{value}</h3>
        </div>
        <Icon size={32} />
      </div>
    </div>
  );
}

// ======================================
// DASHBOARD PREMIUM
// ======================================

function Dashboard() {
  const { user, missions, achievements } = useApp();
  const xpPercent = (user.xp / user.nextLevelXp) * 100;

  return (
    <div>
      <div className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 p-10 rounded-3xl mb-8">
        <h1 className="text-5xl font-black">Sua Meta Está Próxima</h1>
        <p className="mt-4 text-xl">Continue treinando para alcançar seus objetivos.</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-6 mb-8">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Nível {user.level}</h3>
          <span>{user.xp} / {user.nextLevelXp}</span>
        </div>
        <div className="h-4 bg-zinc-800 rounded-full mt-4">
          <div style={{ width: `${xpPercent}%` }} className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard icon={Flame} title="Calorias" value={user.caloriesToday} />
        <StatCard icon={Droplets} title="Água" value={`${user.waterToday}ml`} />
        <StatCard icon={Target} title="Meta Peso" value={`${user.targetWeight}kg`} />
        <StatCard icon={Clock} title="Treino" value={`${user.workoutMinutesToday}min`} />
      </div>

      <div className="bg-zinc-900 rounded-3xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-5">Missões do Dia</h2>
        {missions.map((mission) => (
          <div key={mission.id} className="flex justify-between p-4 border-b border-zinc-800">
            <span>{mission.title}</span>
            <span>+{mission.xp} XP</span>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 rounded-3xl p-6">
        <h2 className="text-2xl font-bold mb-5">Conquistas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className={`p-5 rounded-2xl ${achievement.unlocked ? 'bg-cyan-900/30 border border-cyan-500' : 'bg-zinc-800'}`}>
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="font-bold">{achievement.title}</h4>
              {!achievement.unlocked && achievement.progress && (
                <div className="mt-2 text-sm text-zinc-400">
                  Progresso: {achievement.progress}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ======================================
// WORKOUTS PAGE
// ======================================

function ExerciseCard({ exercise, onSelect }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div onClick={() => onSelect(exercise)} className="bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 border border-zinc-800">
      {!imageError ? (
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-48 object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-48 bg-zinc-800 flex items-center justify-center">
          <Dumbbell size={48} className="text-zinc-600" />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-xl font-bold">{exercise.name}</h3>
        <p className="text-zinc-400">{exercise.muscle}</p>
        <div className="flex justify-between mt-4">
          <span>{exercise.sets} séries</span>
          <span>{exercise.reps}</span>
        </div>
      </div>
    </div>
  );
}

function ExerciseDetails({ exercise, onClose }) {
  const [imageError, setImageError] = useState(false);

  if (!exercise) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-auto">
      <div className="max-w-5xl mx-auto bg-zinc-950 min-h-screen p-8">
        <button onClick={onClose} className="mb-6 bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition">Fechar</button>
        {!imageError ? (
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-96 object-cover rounded-3xl"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-96 bg-zinc-800 flex items-center justify-center rounded-3xl">
            <Dumbbell size={64} className="text-zinc-600" />
          </div>
        )}
        <h1 className="text-5xl font-black mt-6">{exercise.name}</h1>
        <p className="text-cyan-400 text-xl mt-2">{exercise.muscle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-zinc-900 p-5 rounded-2xl"><h3>Séries</h3><p className="text-3xl font-bold">{exercise.sets}</p></div>
          <div className="bg-zinc-900 p-5 rounded-2xl"><h3>Repetições</h3><p className="text-3xl font-bold">{exercise.reps}</p></div>
          <div className="bg-zinc-900 p-5 rounded-2xl"><h3>Descanso</h3><p className="text-3xl font-bold">{exercise.rest}</p></div>
        </div>
        <div className="bg-zinc-900 rounded-3xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Músculos Trabalhados</h2>
          {exercise.musclesWorked.map((muscle, index) => (
            <div key={index} className="bg-zinc-800 p-3 rounded-xl mb-2">{muscle}</div>
          ))}
        </div>
        <div className="bg-zinc-900 rounded-3xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Dicas Profissionais</h2>
          {exercise.tips.map((tip, index) => (
            <div key={index} className="bg-green-900/30 p-4 rounded-xl mb-3">✅ {tip}</div>
          ))}
        </div>
        <div className="bg-zinc-900 rounded-3xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Erros Comuns</h2>
          {exercise.mistakes.map((error, index) => (
            <div key={index} className="bg-red-900/30 p-4 rounded-xl mb-3">❌ {error}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Workouts() {
  const [search, setSearch] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const filteredExercises = workoutDatabase.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-5xl font-black mb-8">Biblioteca de Treinos</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquisar exercício..."
        className="w-full bg-zinc-900 p-5 rounded-2xl mb-8 text-white placeholder-zinc-500"
      />
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} onSelect={setSelectedExercise} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-400 text-lg">Nenhum exercício encontrado para "{search}"</p>
        </div>
      )}
      <ExerciseDetails exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
    </div>
  );
}

// ======================================
// CRONÔMETRO PREMIUM
// ======================================

function TimerPage() {
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("descanso");

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const resetTimer = () => {
    if (mode === "descanso") setSeconds(60);
    if (mode === "hiit") setSeconds(30);
    if (mode === "tabata") setSeconds(20);
  };

  return (
    <div>
      <h1 className="text-5xl font-black mb-10">Cronômetro Premium</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <button onClick={() => { setMode("descanso"); setSeconds(60); }} className="bg-zinc-900 p-5 rounded-2xl hover:bg-zinc-800 transition">Descanso (60s)</button>
        <button onClick={() => { setMode("hiit"); setSeconds(30); }} className="bg-zinc-900 p-5 rounded-2xl hover:bg-zinc-800 transition">HIIT (30s)</button>
        <button onClick={() => { setMode("tabata"); setSeconds(20); }} className="bg-zinc-900 p-5 rounded-2xl hover:bg-zinc-800 transition">Tabata (20s)</button>
      </div>
      <div className="bg-zinc-900 rounded-full w-80 h-80 mx-auto flex items-center justify-center text-7xl font-black mb-10">
        {seconds}
      </div>
      <div className="flex justify-center gap-5 flex-wrap">
        <button onClick={() => setRunning(true)} className="bg-green-500 px-8 py-4 rounded-2xl hover:bg-green-600 transition font-bold">Iniciar</button>
        <button onClick={() => setRunning(false)} className="bg-yellow-500 px-8 py-4 rounded-2xl hover:bg-yellow-600 transition font-bold">Pausar</button>
        <button onClick={resetTimer} className="bg-red-500 px-8 py-4 rounded-2xl hover:bg-red-600 transition font-bold">Resetar</button>
      </div>
    </div>
  );
}

// ======================================
// NUTRIÇÃO
// ======================================

function Nutrition() {
  const meals = [
    { name: "Café da Manhã", calories: 420, protein: 25 },
    { name: "Almoço", calories: 700, protein: 45 },
    { name: "Jantar", calories: 650, protein: 38 }
  ];

  return (
    <div>
      <h1 className="text-5xl font-black mb-8">Nutrição</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-zinc-900 p-6 rounded-3xl"><h3>Calorias</h3><p className="text-4xl font-black">1770</p></div>
        <div className="bg-zinc-900 p-6 rounded-3xl"><h3>Proteínas</h3><p className="text-4xl font-black">108g</p></div>
        <div className="bg-zinc-900 p-6 rounded-3xl"><h3>Carboidratos</h3><p className="text-4xl font-black">230g</p></div>
        <div className="bg-zinc-900 p-6 rounded-3xl"><h3>Gorduras</h3><p className="text-4xl font-black">54g</p></div>
      </div>
      <div className="bg-zinc-900 rounded-3xl p-6">
        <h2 className="text-2xl font-bold mb-5">Refeições</h2>
        {meals.map((meal, index) => (
          <div key={index} className="bg-zinc-800 p-4 rounded-xl mb-3">
            <h3>{meal.name}</h3>
            <p>{meal.calories} kcal | {meal.protein}g proteína</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================
// HIDRATAÇÃO
// ======================================

function Hydration() {
  const { user, addWater } = useApp();
  const percent = (user.waterToday / user.waterGoal) * 100;

  return (
    <div>
      <h1 className="text-5xl font-black mb-8">Hidratação</h1>
      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-2xl font-bold">Meta de Água</h2>
        <p className="text-5xl font-black mt-4">{user.waterToday}ml</p>
        <div className="bg-zinc-800 h-5 rounded-full mt-5">
          <div style={{ width: `${Math.min(percent, 100)}%` }} className="bg-cyan-500 h-full rounded-full transition-all" />
        </div>
        <p className="text-zinc-400 mt-2">{Math.round(percent)}% da meta</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[250, 500, 750, 1000].map(amount => (
            <button key={amount} onClick={() => addWater(amount)} className="bg-cyan-500 p-4 rounded-xl hover:bg-cyan-600 transition font-bold">+{amount}ml</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ======================================
// IA COACH PREMIUM
// ======================================

function CoachAI() {
  const { messages, sendMessage } = useApp();
  const [input, setInput] = useState("");

  return (
    <div>
      <h1 className="text-5xl font-black mb-8">IA Coach</h1>
      <div className="bg-zinc-900 rounded-3xl p-6 h-[600px] overflow-auto mb-5">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-4 p-4 rounded-2xl ${msg.role === "assistant" ? "bg-cyan-900/40" : "bg-zinc-800"}`}>
            <strong>{msg.role === "assistant" ? "Coach IA" : "Você"}</strong>
            <p className="mt-2">{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pergunte algo..." className="flex-1 bg-zinc-900 p-4 rounded-xl text-white placeholder-zinc-500" onKeyPress={(e) => e.key === 'Enter' && (sendMessage(input), setInput(""))} />
        <button onClick={() => { sendMessage(input); setInput(""); }} className="bg-cyan-500 px-8 rounded-xl hover:bg-cyan-600 transition font-bold">Enviar</button>
      </div>
    </div>
  );
}

// ======================================
// PERFIL PREMIUM
// ======================================

function Profile() {
  const { user } = useApp();
  return (
    <div>
      <h1 className="text-5xl font-black mb-8">Perfil</h1>
      <div className="bg-zinc-900 rounded-3xl overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-cyan-500 to-purple-600" />
        <div className="p-8">
          <img src={user.avatar} alt="avatar" className="w-40 h-40 rounded-full border-4 border-white -translate-y-20" />
          <h2 className="text-4xl font-black -mt-12">{user.username}</h2>
          <p className="text-zinc-400">Objetivo: {user.objective}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
            <div className="bg-zinc-800 p-5 rounded-xl">Peso<h3 className="text-3xl">{user.weight}kg</h3></div>
            <div className="bg-zinc-800 p-5 rounded-xl">Altura<h3 className="text-3xl">{user.height}cm</h3></div>
            <div className="bg-zinc-800 p-5 rounded-xl">Gordura<h3 className="text-3xl">{user.bodyFat}%</h3></div>
            <div className="bg-zinc-800 p-5 rounded-xl">Músculo<h3 className="text-3xl">{user.muscleMass}kg</h3></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ======================================
// CONQUISTAS COMPLETA
// ======================================

function Achievements() {
  const { achievements } = useApp();

  return (
    <div>
      <h1 className="text-5xl font-black mb-8">Conquistas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-6 rounded-3xl border-2 transition-all ${
              achievement.unlocked
                ? 'bg-cyan-900/30 border-cyan-500'
                : 'bg-zinc-800 border-zinc-700'
            }`}
          >
            <div className="text-5xl mb-4">{achievement.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
            <p className="text-zinc-400 mb-4">{achievement.description}</p>
            {achievement.unlocked ? (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={20} />
                <span>Desbloqueado em {achievement.unlockedDate}</span>
              </div>
            ) : (
              <div>
                <div className="bg-zinc-700 h-2 rounded-full mb-2">
                  <div
                    style={{ width: `${achievement.progress}%` }}
                    className="bg-cyan-500 h-full rounded-full transition-all"
                  />
                </div>
                <p className="text-sm text-zinc-400">{achievement.progress}% completo</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================
// RANKING
// ======================================

function Community() {
  const ranking = [
    { name: "Carlos", xp: 4500 },
    { name: "João", xp: 3800 },
    { name: "Maria", xp: 3600 },
    { name: "Ana", xp: 3400 }
  ];

  return (
    <div>
      <h1 className="text-5xl font-black mb-8">Ranking Global</h1>
      <div className="bg-zinc-900 rounded-3xl p-6">
        {ranking.map((user, index) => (
          <div key={index} className="flex justify-between bg-zinc-800 p-5 rounded-xl mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-cyan-500">#{index + 1}</span>
              <span>{user.name}</span>
            </div>
            <span className="font-bold">{user.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================
// CONFIGURAÇÕES
// ======================================

function SettingsPage() {
  const { darkMode, setDarkMode } = useApp();
  return (
    <div>
      <h1 className="text-5xl font-black mb-8">Configurações</h1>
      <div className="bg-zinc-900 p-6 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg">Modo Escuro</span>
          <button onClick={() => setDarkMode(!darkMode)} className="bg-cyan-500 px-8 py-4 rounded-xl hover:bg-cyan-600 transition font-bold">
            {darkMode ? 'Ativar Claro' : 'Ativar Escuro'}
          </button>
        </div>
        <div className="border-t border-zinc-700 pt-6">
          <p className="text-zinc-400">Versão: 1.0.0</p>
          <p className="text-zinc-400">Desenvolvido com ❤️</p>
        </div>
      </div>
    </div>
  );
}

// ======================================
// APP FINAL
// ======================================

function App() {
  const { toast, setToast } = useApp();

  return (
    <HashRouter>
      <AppProvider>
        <MainLayout>
          <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 w-full">
              <Navbar />
              <div className="p-4 md:p-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/workouts" element={<Workouts />} />
                  <Route path="/nutrition" element={<Nutrition />} />
                  <Route path="/hydration" element={<Hydration />} />
                  <Route path="/coach" element={<CoachAI />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/achievements" element={<Achievements />} />
                  <Route path="/timer" element={<TimerPage />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        </MainLayout>
      </AppProvider>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={toast.duration || 3000}
        />
      )}
    </HashRouter>
  );
}

export default App;
