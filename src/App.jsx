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
  useNavigate,
  useLocation
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
  ArrowLeft,
  LogOut,
  Filter,
  Search
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
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50`}>
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
// AUTH CONTEXT
// ======================================

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = useCallback(async (email, password, name) => {
    try {
      setError(null);
      const newUser = {
        id: Date.now(),
        email,
        name,
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [setUser]);

  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      const mockUser = {
        id: 1,
        email,
        name: "Usuário",
        createdAt: new Date().toISOString()
      };
      setUser(mockUser);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [setUser]);

  const logout = useCallback(async () => {
    try {
      setError(null);
      setUser(null);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [setUser]);

  const value = useMemo(() => ({
    user,
    loading,
    error,
    signup,
    login,
    logout,
    isAuthenticated: !!user
  }), [user, loading, error, signup, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ======================================
// LOGIN PAGE
// ======================================

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Preencha todos os campos');
      setLoading(false);
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Erro ao fazer login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Aura Fitness
          </h1>
          <p className="text-zinc-400">Bem-vindo de volta</p>
        </div>

        <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-zinc-800 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-800 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-500 p-4 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 py-3 rounded-xl font-bold transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-center mt-6 text-zinc-400">
            Não tem conta?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-cyan-400 hover:text-cyan-300 font-bold"
            >
              Criar conta
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

// ======================================
// SIGN UP PAGE
// ======================================

function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não conferem');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    const result = await signup(email, password, name);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Erro ao criar conta');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Aura Fitness
          </h1>
          <p className="text-zinc-400">Crie sua conta</p>
        </div>

        <form onSubmit={handleSignUp} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Nome Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full bg-zinc-800 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-zinc-800 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-800 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Confirmar Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-800 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-500 p-4 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 py-3 rounded-xl font-bold transition disabled:opacity-50"
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>

          <p className="text-center mt-6 text-zinc-400">
            Já tem conta?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-cyan-400 hover:text-cyan-300 font-bold"
            >
              Entrar
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

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

// BANCO DE DADOS DE EXERCÍCIOS DE ACADEMIA
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
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Costas apoiadas no banco",
        "Pés fixos no chão",
        "Cotovelos a 45 graus",
        "Barra descendo até o peito"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Levantar o quadril do banco",
        "Descer a barra de forma torta",
        "Cotovelos muito abertos",
        "Usar peso excessivo"
      ]
    },
    instructions: {
      setup: "Sente-se no banco com os pés firmemente no chão. Pegue a barra com as mãos um pouco mais largas que a largura dos ombros.",
      execution: "Baixe a barra controladamente até o peito, depois empurre explosivamente de volta à posição inicial.",
      breathing: "Inspire ao baixar, expire ao empurrar."
    },
    precautions: [
      "Não trave completamente os cotovelos no topo",
      "Mantenha as escápulas retraídas",
      "Não use peso excessivo",
      "Mantenha a barra alinhada com o peito"
    ],
    injuries: [
      {
        name: "Tendinite do ombro",
        cause: "Cotovelos muito abertos ou peso excessivo",
        prevention: "Mantenha cotovelos a 45 graus e use peso apropriado"
      }
    ],
    progression: [
      { week: 1, sets: 3, reps: "12-15", weight: "Leve" },
      { week: 2, sets: 3, reps: "10-12", weight: "Moderado" },
      { week: 3, sets: 4, reps: "8-10", weight: "Moderado" },
      { week: 4, sets: 4, reps: "6-8", weight: "Pesado" }
    ],
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
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Coluna neutra",
        "Joelhos alinhados com os pés",
        "Peito para frente",
        "Descer até paralelo ou abaixo"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Arredondar a coluna lombar",
        "Joelhos caindo para dentro",
        "Descer pouco (amplitude insuficiente)",
        "Peso nos dedos dos pés"
      ]
    },
    instructions: {
      setup: "Fique em pé com os pés na largura dos ombros. Coloque a barra nos ombros, atrás do pescoço.",
      execution: "Desça controladamente dobrando os joelhos e quadril, mantendo o peito para frente.",
      breathing: "Inspire ao descer, expire ao subir."
    },
    precautions: [
      "Mantenha a coluna neutra durante todo o movimento",
      "Os joelhos devem acompanhar a direção dos pés",
      "Não deixe os joelhos caírem para dentro",
      "Mantenha o peso nos calcanhares"
    ],
    injuries: [
      {
        name: "Lesão no joelho",
        cause: "Joelhos caindo para dentro ou amplitude insuficiente",
        prevention: "Mantenha os joelhos alinhados e desça com amplitude completa"
      }
    ],
    progression: [
      { week: 1, sets: 4, reps: "12-15", weight: "Apenas barra" },
      { week: 2, sets: 4, reps: "10-12", weight: "Leve" },
      { week: 3, sets: 5, reps: "8-10", weight: "Moderado" },
      { week: 4, sets: 5, reps: "6-8", weight: "Pesado" }
    ],
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
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Peito aberto",
        "Puxar com as costas",
        "Cotovelos descendo",
        "Controlar o retorno"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Usar embalo do corpo",
        "Puxar atrás da cabeça",
        "Curvar a coluna lombar",
        "Usar braços em vez de costas"
      ]
    },
    instructions: {
      setup: "Sente-se na máquina com os pés apoiados. Pegue a barra com as mãos um pouco mais largas que a largura dos ombros.",
      execution: "Puxe a barra para baixo em direção ao peito, usando as costas.",
      breathing: "Inspire ao retornar, expire ao puxar."
    },
    precautions: [
      "Não use embalo do corpo",
      "Mantenha o peito aberto",
      "Não puxe atrás da cabeça",
      "Controle o retorno da barra"
    ],
    injuries: [
      {
        name: "Lesão no ombro",
        cause: "Puxar atrás da cabeça ou amplitude excessiva",
        prevention: "Puxe para o peito e mantenha amplitude controlada"
      }
    ],
    progression: [
      { week: 1, sets: 3, reps: "12-15", weight: "Leve" },
      { week: 2, sets: 3, reps: "10-12", weight: "Moderado" },
      { week: 3, sets: 4, reps: "8-10", weight: "Moderado" },
      { week: 4, sets: 4, reps: "6-8", weight: "Pesado" }
    ],
    tips: ["Peito aberto.", "Puxar com as costas.", "Controlar retorno."],
    mistakes: ["Usar embalo.", "Puxar atrás da cabeça.", "Curvar lombar."],
    musclesWorked: ["Latíssimo", "Trapézio", "Bíceps"]
  }
];

// BANCO DE DADOS DE EXERCÍCIOS EM CASA
const homeWorkoutDatabase = [
  {
    id: 101,
    name: "Flexão de Braço",
    muscle: "Peito",
    difficulty: "Iniciante",
    sets: 3,
    reps: "10-15",
    rest: "60s",
    equipment: "Sem equipamento",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Corpo em linha reta (cabeça aos pés)",
        "Mãos na largura dos ombros",
        "Cotovelos a 45 graus do corpo",
        "Descer até o peito quase tocar o chão"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Quadril caído (corpo em forma de V)",
        "Cotovelos muito abertos",
        "Não descer o suficiente",
        "Cabeça para frente"
      ]
    },
    instructions: {
      setup: "Deite-se de bruços com as mãos na largura dos ombros, pés juntos ou ligeiramente afastados.",
      execution: "Empurre o corpo para cima até estender os braços, depois desça controladamente até o peito quase tocar o chão.",
      breathing: "Inspire ao descer, expire ao subir."
    },
    precautions: [
      "Mantenha o corpo em linha reta",
      "Não deixe o quadril cair",
      "Não trave completamente os cotovelos",
      "Controle o movimento"
    ],
    injuries: [
      {
        name: "Tendinite do ombro",
        cause: "Cotovelos muito abertos ou movimento descontrolado",
        prevention: "Mantenha cotovelos a 45 graus e controle a descida"
      }
    ],
    progression: [
      { week: 1, sets: 3, reps: "10-12", variation: "Flexão normal" },
      { week: 2, sets: 3, reps: "12-15", variation: "Flexão normal" },
      { week: 3, sets: 4, reps: "10-12", variation: "Flexão com pés elevados" },
      { week: 4, sets: 4, reps: "12-15", variation: "Flexão com pés elevados" }
    ],
    tips: ["Mantenha o corpo reto.", "Controle a descida.", "Respire corretamente."],
    mistakes: ["Quadril caído.", "Cotovelos muito abertos.", "Não descer o suficiente."],
    musclesWorked: ["Peitoral", "Tríceps", "Ombro Anterior", "Núcleo"]
  },
  {
    id: 102,
    name: "Agachamento com Peso Corporal",
    muscle: "Pernas",
    difficulty: "Iniciante",
    sets: 3,
    reps: "15-20",
    rest: "90s",
    equipment: "Sem equipamento",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Pés na largura dos ombros",
        "Coluna neutra",
        "Joelhos alinhados com os pés",
        "Descer até as coxas ficarem paralelas ao chão"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Joelhos caindo para dentro",
        "Coluna arredondada",
        "Peso nos dedos dos pés",
        "Descer pouco"
      ]
    },
    instructions: {
      setup: "Fique em pé com os pés na largura dos ombros, braços estendidos para frente.",
      execution: "Desça dobrando os joelhos e quadril, mantendo o peito para frente e o peso nos calcanhares.",
      breathing: "Inspire ao descer, expire ao subir."
    },
    precautions: [
      "Mantenha a coluna reta",
      "Os joelhos não devem ultrapassar muito os pés",
      "Mantenha o peso nos calcanhares",
      "Não deixe os joelhos caírem para dentro"
    ],
    injuries: [
      {
        name: "Lesão no joelho",
        cause: "Joelhos caindo para dentro ou amplitude insuficiente",
        prevention: "Mantenha os joelhos alinhados e desça com amplitude completa"
      }
    ],
    progression: [
      { week: 1, sets: 3, reps: "15-20", variation: "Agachamento normal" },
      { week: 2, sets: 3, reps: "20-25", variation: "Agachamento normal" },
      { week: 3, sets: 4, reps: "15-20", variation: "Agachamento com pausa" },
      { week: 4, sets: 4, reps: "20-25", variation: "Agachamento com pausa" }
    ],
    tips: ["Mantenha o peito para frente.", "Peso nos calcanhares.", "Amplitude completa."],
    mistakes: ["Joelhos para dentro.", "Coluna arredondada.", "Descer pouco."],
    musclesWorked: ["Quadríceps", "Glúteos", "Posterior da coxa"]
  },
  {
    id: 103,
    name: "Prancha (Plank)",
    muscle: "Núcleo",
    difficulty: "Iniciante",
    sets: 3,
    reps: "30-60s",
    rest: "60s",
    equipment: "Sem equipamento",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f",
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Corpo em linha reta",
        "Cotovelos alinhados com os ombros",
        "Núcleo contraído",
        "Não deixar o quadril cair"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Quadril caído",
        "Quadril muito elevado",
        "Cabeça para frente",
        "Cotovelos muito abertos"
      ]
    },
    instructions: {
      setup: "Deite-se de bruços, coloque os cotovelos embaixo dos ombros, pés juntos.",
      execution: "Levante o corpo, mantendo-o em linha reta dos pés à cabeça. Mantenha a posição.",
      breathing: "Respire normalmente, não prenda a respiração."
    },
    precautions: [
      "Mantenha o corpo em linha reta",
      "Não deixe o quadril cair",
      "Não deixe o quadril muito elevado",
      "Respire normalmente"
    ],
    injuries: [
      {
        name: "Dor nas costas",
        cause: "Quadril caído ou muito elevado",
        prevention: "Mantenha o corpo em linha reta"
      }
    ],
    progression: [
      { week: 1, sets: 3, reps: "30s", variation: "Prancha normal" },
      { week: 2, sets: 3, reps: "45s", variation: "Prancha normal" },
      { week: 3, sets: 3, reps: "60s", variation: "Prancha normal" },
      { week: 4, sets: 3, reps: "60s", variation: "Prancha com elevação de perna" }
    ],
    tips: ["Mantenha o corpo reto.", "Contraia o núcleo.", "Respire normalmente."],
    mistakes: ["Quadril caído.", "Quadril elevado.", "Cabeça para frente."],
    musclesWorked: ["Abdominais", "Oblíquos", "Costas", "Ombros"]
  },
  {
    id: 104,
    name: "Burpee",
    muscle: "Full Body",
    difficulty: "Avançado",
    sets: 3,
    reps: "8-12",
    rest: "90s",
    equipment: "Sem equipamento",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Começar em pé",
        "Agachar e colocar as mãos no chão",
        "Pular para trás em posição de flexão",
        "Fazer uma flexão",
        "Pular para frente",
        "Pular para cima"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Não fazer a flexão completa",
        "Movimento descontrolado",
        "Não estender os braços na flexão",
        "Não pular corretamente"
      ]
    },
    instructions: {
      setup: "Fique em pé com os pés na largura dos ombros.",
      execution: "Agache, coloque as mãos no chão, pule para trás em posição de flexão, faça uma flexão, pule para frente e pule para cima.",
      breathing: "Inspire ao agachar, expire ao pular."
    },
    precautions: [
      "Faça o movimento de forma controlada",
      "Não force o joelho",
      "Mantenha o núcleo contraído",
      "Descanse entre as séries"
    ],
    injuries: [
      {
        name: "Lesão no joelho",
        cause: "Movimento descontrolado ou pouso incorreto",
        prevention: "Faça o movimento de forma controlada"
      }
    ],
    progression: [
      { week: 1, sets: 3, reps: "5-8", variation: "Burpee modificado (sem flexão)" },
      { week: 2, sets: 3, reps: "8-10", variation: "Burpee modificado" },
      { week: 3, sets: 3, reps: "8-12", variation: "Burpee completo" },
      { week: 4, sets: 4, reps: "10-15", variation: "Burpee com flexão profunda" }
    ],
    tips: ["Movimento controlado.", "Respire corretamente.", "Descanse entre as séries."],
    mistakes: ["Movimento rápido demais.", "Não fazer flexão.", "Pouso incorreto."],
    musclesWorked: ["Peito", "Tríceps", "Pernas", "Núcleo", "Cardiovascular"]
  },
  {
    id: 105,
    name: "Abdominal Crunch",
    muscle: "Abdominais",
    difficulty: "Iniciante",
    sets: 3,
    reps: "15-20",
    rest: "45s",
    equipment: "Sem equipamento",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Deitado de costas, joelhos dobrados",
        "Mãos atrás da cabeça (sem puxar o pescoço)",
        "Elevar o tronco usando os abdominais",
        "Descer controladamente"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Puxar o pescoço com as mãos",
        "Elevar muito o tronco",
        "Movimento rápido demais",
        "Não usar os abdominais"
      ]
    },
    instructions: {
      setup: "Deite-se de costas com os joelhos dobrados, pés apoiados no chão, mãos atrás da cabeça.",
      execution: "Contraia os abdominais e eleve o tronco, depois desça controladamente.",
      breathing: "Expire ao subir, inspire ao descer."
    },
    precautions: [
      "Não puxe o pescoço",
      "Mantenha o movimento controlado",
      "Não force o pescoço",
      "Use os abdominais"
    ],
    injuries: [
      {
        name: "Dor no pescoço",
        cause: "Puxar o pescoço com as mãos",
        prevention: "Mantenha as mãos leves atrás da cabeça"
      }
    ],
    progression: [
      { week: 1, sets: 3, reps: "15-20", variation: "Crunch normal" },
      { week: 2, sets: 3, reps: "20-25", variation: "Crunch normal" },
      { week: 3, sets: 3, reps: "15-20", variation: "Crunch com rotação" },
      { week: 4, sets: 3, reps: "20-25", variation: "Crunch com rotação" }
    ],
    tips: ["Não puxe o pescoço.", "Movimento controlado.", "Use os abdominais."],
    mistakes: ["Puxar o pescoço.", "Movimento rápido.", "Não usar abdominais."],
    musclesWorked: ["Abdominais retos", "Oblíquos"]
  },
  {
    id: 106,
    name: "Polichinelo (Jumping Jack)",
    muscle: "Full Body",
    difficulty: "Iniciante",
    sets: 3,
    reps: "20-30",
    rest: "60s",
    equipment: "Sem equipamento",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Começar em pé, pés juntos",
        "Pular abrindo as pernas",
        "Braços subindo para os lados",
        "Voltar à posição inicial"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Movimento descontrolado",
        "Não abrir as pernas o suficiente",
        "Braços não acompanhando",
        "Pouso muito forte"
      ]
    },
    instructions: {
      setup: "Fique em pé com os pés juntos e os braços ao lado do corpo.",
      execution: "Pule abrindo as pernas e levantando os braços, depois volte à posição inicial.",
      breathing: "Respire normalmente, mantendo um ritmo constante."
    },
    precautions: [
      "Faça o movimento de forma controlada",
      "Não force os joelhos",
      "Mantenha um ritmo constante",
      "Descanse se necessário"
    ],
    injuries: [
      {
        name: "Lesão no joelho",
        cause: "Pouso muito forte ou movimento descontrolado",
        prevention: "Faça o movimento de forma controlada"
      }
    ],
    progression: [
      { week: 1, sets: 3, reps: "20-30", variation: "Polichinelo normal" },
      { week: 2, sets: 3, reps: "30-40", variation: "Polichinelo normal" },
      { week: 3, sets: 3, reps: "40-50", variation: "Polichinelo rápido" },
      { week: 4, sets: 4, reps: "40-50", variation: "Polichinelo rápido" }
    ],
    tips: ["Movimento controlado.", "Ritmo constante.", "Respire normalmente."],
    mistakes: ["Movimento rápido demais.", "Não abrir as pernas.", "Pouso forte."],
    musclesWorked: ["Pernas", "Ombros", "Cardiovascular"]
  },
  {
    id: 107,
    name: "Afundo (Lunge)",
    muscle: "Pernas",
    difficulty: "Intermediário",
    sets: 3,
    reps: "12-15 cada perna",
    rest: "90s",
    equipment: "Sem equipamento",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Pé da frente com o joelho a 90 graus",
        "Pé de trás com o joelho quase tocando o chão",
        "Tronco reto",
        "Peso distribuído entre os dois pés"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Joelho da frente ultrapassando muito o pé",
        "Tronco inclinado",
        "Passo muito curto",
        "Joelho de trás batendo no chão"
      ]
    },
    instructions: {
      setup: "Fique em pé com os pés na largura dos ombros.",
      execution: "Dê um passo para frente, dobrando os joelhos até que ambas as pernas formem um ângulo de 90 graus. Volte à posição inicial.",
      breathing: "Inspire ao descer, expire ao subir."
    },
    precautions: [
      "Mantenha o tronco reto",
      "O joelho não deve ultrapassar muito o pé",
      "Mantenha o equilíbrio",
      "Não force o joelho"
    ],
    injuries: [
      {
        name: "Lesão no joelho",
        cause: "Joelho ultrapassando muito o pé",
        prevention: "Mantenha o joelho alinhado com o pé"
      }
    ],
    progression: [
      { week: 1, sets: 3, reps: "10-12 cada", variation: "Afundo estacionário" },
      { week: 2, sets: 3, reps: "12-15 cada", variation: "Afundo estacionário" },
      { week: 3, sets: 3, reps: "12-15 cada", variation: "Afundo caminhando" },
      { week: 4, sets: 4, reps: "12-15 cada", variation: "Afundo caminhando" }
    ],
    tips: ["Mantenha o tronco reto.", "Passo largo.", "Equilíbrio constante."],
    mistakes: ["Joelho ultrapassando.", "Tronco inclinado.", "Passo curto."],
    musclesWorked: ["Quadríceps", "Glúteos", "Posterior da coxa"]
  },
  {
    id: 108,
    name: "Flexão de Tríceps (Dips)",
    muscle: "Tríceps",
    difficulty: "Intermediário",
    sets: 3,
    reps: "8-12",
    rest: "90s",
    equipment: "Cadeira ou banco",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    correctForm: {
      color: "#10b981",
      description: "Forma correta",
      points: [
        "Mãos na cadeira atrás de você",
        "Corpo reto",
        "Descer dobrando os cotovelos",
        "Cotovelos a 90 graus"
      ]
    },
    incorrectForm: {
      color: "#ef4444",
      description: "Forma incorreta",
      mistakes: [
        "Cotovelos muito abertos",
        "Corpo inclinado para frente",
        "Não descer o suficiente",
        "Ombros para cima"
      ]
    },
    instructions: {
      setup: "Sente-se em uma cadeira, coloque as mãos na beira da cadeira atrás de você, pés no chão.",
      execution: "Desça o corpo dobrando os cotovelos, depois suba empurrando com os tríceps.",
      breathing: "Inspire ao descer, expire ao subir."
    },
    precautions: [
      "Mantenha os cotovelos próximos ao corpo",
      "Não desça muito",
      "Mantenha o corpo reto",
      "Não force os ombros"
    ],
    injuries: [
      {
        name: "Lesão no ombro",
        cause: "Cotovelos muito abertos ou movimento descontrolado",
        prevention: "Mantenha os cotovelos próximos ao corpo"
      }
    ],
    progression: [
      { week: 1, sets: 3, reps: "8-10", variation: "Dips com pés no chão" },
      { week: 2, sets: 3, reps: "10-12", variation: "Dips com pés no chão" },
      { week: 3, sets: 3, reps: "8-10", variation: "Dips com pés elevados" },
      { week: 4, sets: 3, reps: "10-12", variation: "Dips com pés elevados" }
    ],
    tips: ["Cotovelos próximos ao corpo.", "Movimento controlado.", "Não desça muito."],
    mistakes: ["Cotovelos abertos.", "Corpo inclinado.", "Ombros para cima."],
    musclesWorked: ["Tríceps", "Peito", "Ombros"]
  }
];

// ======================================
// PROVIDER
// ======================================

function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);
  const [appUser, setAppUser] = useLocalStorage('appUser', defaultUser);
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
    setAppUser((prev) => ({
      ...prev,
      waterToday: prev.waterToday + amount
    }));
    setToast({ message: `+${amount}ml de água adicionado!`, type: 'success' });
  }, [setAppUser]);

  const addXP = useCallback((amount) => {
    setAppUser((prev) => {
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
  }, [setAppUser]);

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
    user: appUser, setUser: setAppUser,
    missions, setMissions,
    achievements, setAchievements,
    messages, sendMessage,
    addWater, addXP,
    notifications, setNotifications,
    toast, setToast
  }), [darkMode, setDarkMode, appUser, setAppUser, missions, setMissions, achievements, setAchievements, messages, sendMessage, addWater, addXP, notifications, setNotifications, toast, setToast]);

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
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Activity, title: "Dashboard", path: "/" },
    { icon: Dumbbell, title: "Treinos Academia", path: "/workouts" },
    { icon: Home, title: "Treinos em Casa", path: "/home-workouts" },
    { icon: Brain, title: "IA Coach", path: "/coach" },
    { icon: Droplets, title: "Hidratação", path: "/hydration" },
    { icon: Flame, title: "Nutrição", path: "/nutrition" },
    { icon: Trophy, title: "Conquistas", path: "/achievements" },
    { icon: Timer, title: "Cronômetro", path: "/timer" },
    { icon: User, title: "Perfil", path: "/profile" },
    { icon: Settings, title: "Configurações", path: "/settings" }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40 bg-cyan-500 p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-72 min-h-screen border-r border-zinc-800 p-5 transition-transform duration-300 z-30 bg-zinc-950 flex flex-col overflow-y-auto`}>
        <div className="mb-10">
          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Aura Fitness
          </h1>
        </div>
        <div className="flex flex-col gap-2 flex-1">
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
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-red-900/30 transition-all text-red-400 font-bold"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </aside>

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
// EXERCISE DETAILS ENHANCED
// ======================================

function ExerciseDetailsEnhanced({ exercise, onClose }) {
  const [activeTab, setActiveTab] = useState('form');
  const [formFeedback, setFormFeedback] = useState('correct');

  if (!exercise) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-auto">
      <div className="max-w-7xl mx-auto bg-zinc-950 min-h-screen p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-black">{exercise.name}</h1>
          <button onClick={onClose} className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 rounded-3xl overflow-hidden">
              <img
                src={exercise.image}
                alt={exercise.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-6 text-center text-zinc-400">
                <p className="text-sm">Modelo 3D virá aqui</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-6 flex-wrap">
              {['form', 'precautions', 'injuries', 'progression'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-bold transition ${
                    activeTab === tab
                      ? 'bg-cyan-500 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {tab === 'form' && 'Forma'}
                  {tab === 'precautions' && 'Cuidados'}
                  {tab === 'injuries' && 'Lesões'}
                  {tab === 'progression' && 'Progressão'}
                </button>
              ))}
            </div>

            {activeTab === 'form' && (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setFormFeedback('correct')}
                    className={`flex-1 p-4 rounded-2xl font-bold transition ${
                      formFeedback === 'correct'
                        ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                        : 'bg-zinc-800 border-2 border-zinc-700 text-zinc-400'
                    }`}
                  >
                    ✅ Forma Correta
                  </button>
                  <button
                    onClick={() => setFormFeedback('incorrect')}
                    className={`flex-1 p-4 rounded-2xl font-bold transition ${
                      formFeedback === 'incorrect'
                        ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                        : 'bg-zinc-800 border-2 border-zinc-700 text-zinc-400'
                    }`}
                  >
                    ❌ Forma Incorreta
                  </button>
                </div>

                {formFeedback === 'correct' && (
                  <div className="bg-green-900/20 border-2 border-green-500
