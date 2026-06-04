import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Activity, Flame, Trophy, Target, Dumbbell, Brain, Calendar, Droplets, User, Bell, Gear, Moon, Sun, Award, Crown, Zap, Heart, TrendingUp, Clock, Shield, Star, BarChart3, Sparkles, Timer, Menu, X, CheckCircle, AlertCircle, Info, Home, ArrowLeft, LogOut, Filter, Search } from "lucide-react";

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
              type="password"
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-800 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Confirmar Senha</label>
            <input
              type="password"
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
// APP CONTEXT
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

// BANCO DE DADOS DE EXERCÍCIOS
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
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Costas apoiadas", "Pés fixos", "Cotovelos 45°", "Barra no peito"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Levantar quadril", "Barra torta", "Cotovelos abertos", "Peso excessivo"] },
    instructions: { setup: "Sente-se no banco", execution: "Baixe e empurre", breathing: "Inspire ao baixar" },
    precautions: ["Não trave cotovelos", "Mantenha escápulas", "Peso apropriado", "Barra alinhada"],
    injuries: [{ name: "Tendinite", cause: "Cotovelos abertos", prevention: "Mantenha 45°" }],
    progression: [
      { week: 1, sets: 3, reps: "12-15", weight: "Leve" },
      { week: 2, sets: 3, reps: "10-12", weight: "Moderado" }
    ],
    tips: ["Mantenha pés fixos", "Controle descida", "Não trave"],
    mistakes: ["Levantar quadril", "Barra torta", "Peso excessivo"],
    musclesWorked: ["Peitoral", "Tríceps", "Ombro"]
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
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Coluna neutra", "Joelhos alinhados", "Peito frente", "Descer paralelo"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Arredondar coluna", "Joelhos dentro", "Descer pouco", "Peso nos dedos"] },
    instructions: { setup: "Pés largura ombros", execution: "Desça controlado", breathing: "Inspire ao descer" },
    precautions: ["Coluna neutra", "Joelhos alinhados", "Não cair para dentro", "Peso calcanhares"],
    injuries: [{ name: "Lesão joelho", cause: "Joelhos caindo", prevention: "Mantenha alinhados" }],
    progression: [
      { week: 1, sets: 4, reps: "12-15", weight: "Apenas barra" },
      { week: 2, sets: 4, reps: "10-12", weight: "Leve" }
    ],
    tips: ["Coluna neutra", "Joelhos alinhados", "Desça controlado"],
    mistakes: ["Arredondar", "Joelhos dentro", "Descer pouco"],
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
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Peito aberto", "Puxar costas", "Cotovelos descem", "Controlar retorno"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Usar embalo", "Puxar atrás cabeça", "Curvar coluna", "Usar braços"] },
    instructions: { setup: "Sente-se máquina", execution: "Puxe para peito", breathing: "Inspire ao retornar" },
    precautions: ["Sem embalo", "Peito aberto", "Não atrás cabeça", "Controle retorno"],
    injuries: [{ name: "Lesão ombro", cause: "Puxar atrás", prevention: "Puxe para peito" }],
    progression: [
      { week: 1, sets: 3, reps: "12-15", weight: "Leve" },
      { week: 2, sets: 3, reps: "10-12", weight: "Moderado" }
    ],
    tips: ["Peito aberto", "Puxar costas", "Controlar"],
    mistakes: ["Usar embalo", "Puxar atrás", "Curvar"],
    musclesWorked: ["Latíssimo", "Trapézio", "Bíceps"]
  }
];

// BANCO DE DADOS - TREINO EM CASA
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
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Corpo reto", "Mãos largura ombros", "Cotovelos 45°", "Descer até peito"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Quadril caído", "Cotovelos abertos", "Não descer", "Cabeça frente"] },
    instructions: { setup: "Deite-se de bruços", execution: "Empurre para cima", breathing: "Inspire ao descer" },
    precautions: ["Corpo reto", "Não cair quadril", "Não trave", "Controle movimento"],
    injuries: [{ name: "Tendinite ombro", cause: "Cotovelos abertos", prevention: "Mantenha 45°" }],
    progression: [
      { week: 1, sets: 3, reps: "10-12", variation: "Normal" },
      { week: 2, sets: 3, reps: "12-15", variation: "Normal" }
    ],
    tips: ["Corpo reto", "Controle descida", "Respire"],
    mistakes: ["Quadril caído", "Cotovelos abertos", "Não descer"],
    musclesWorked: ["Peitoral", "Tríceps", "Ombro", "Núcleo"]
  },
  {
    id: 102,
    name: "Agachamento Peso Corporal",
    muscle: "Pernas",
    difficulty: "Iniciante",
    sets: 3,
    reps: "15-20",
    rest: "90s",
    equipment: "Sem equipamento",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Pés largura ombros", "Coluna neutra", "Joelhos alinhados", "Descer paralelo"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Joelhos dentro", "Coluna arredonda", "Peso dedos", "Descer pouco"] },
    instructions: { setup: "Pés largura ombros", execution: "Desça dobrando joelhos", breathing: "Inspire ao descer" },
    precautions: ["Coluna reta", "Joelhos alinhados", "Peso calcanhares", "Não deixar cair"],
    injuries: [{ name: "Lesão joelho", cause: "Joelhos caindo", prevention: "Mantenha alinhados" }],
    progression: [
      { week: 1, sets: 3, reps: "15-20", variation: "Normal" },
      { week: 2, sets: 3, reps: "20-25", variation: "Normal" }
    ],
    tips: ["Peito frente", "Peso calcanhares", "Amplitude completa"],
    mistakes: ["Joelhos dentro", "Coluna arredonda", "Descer pouco"],
    musclesWorked: ["Quadríceps", "Glúteos", "Posterior"]
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
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Corpo reto", "Cotovelos ombros", "Núcleo contraído", "Quadril não cai"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Quadril caído", "Quadril elevado", "Cabeça frente", "Cotovelos abertos"] },
    instructions: { setup: "Cotovelos ombros", execution: "Levante corpo", breathing: "Respire normalmente" },
    precautions: ["Corpo reto", "Não deixar cair", "Não elevar muito", "Respire"],
    injuries: [{ name: "Dor costas", cause: "Quadril caído", prevention: "Mantenha reto" }],
    progression: [
      { week: 1, sets: 3, reps: "30s", variation: "Normal" },
      { week: 2, sets: 3, reps: "45s", variation: "Normal" }
    ],
    tips: ["Corpo reto", "Contraia núcleo", "Respire"],
    mistakes: ["Quadril caído", "Quadril elevado", "Cabeça frente"],
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
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Começar em pé", "Agachar", "Pular para trás", "Fazer flexão", "Pular para cima"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Não fazer flexão", "Movimento rápido", "Não estender braços", "Não pular"] },
    instructions: { setup: "Pés largura ombros", execution: "Agache, pule, flexão, pule, pule", breathing: "Inspire ao agachar" },
    precautions: ["Movimento controlado", "Não force joelho", "Núcleo contraído", "Descanse"],
    injuries: [{ name: "Lesão joelho", cause: "Movimento rápido", prevention: "Controle movimento" }],
    progression: [
      { week: 1, sets: 3, reps: "5-8", variation: "Modificado" },
      { week: 2, sets: 3, reps: "8-10", variation: "Modificado" }
    ],
    tips: ["Movimento controlado", "Respire", "Descanse"],
    mistakes: ["Rápido demais", "Não fazer flexão", "Pouso forte"],
    musclesWorked: ["Peito", "Tríceps", "Pernas", "Núcleo", "Cardio"]
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
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Costas chão", "Joelhos dobrados", "Mãos atrás cabeça", "Elevar tronco"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Puxar pescoço", "Elevar muito", "Rápido demais", "Não usar abdominais"] },
    instructions: { setup: "Costas chão", execution: "Contraia e eleve", breathing: "Expire ao subir" },
    precautions: ["Não puxe pescoço", "Controle movimento", "Não force pescoço", "Use abdominais"],
    injuries: [{ name: "Dor pescoço", cause: "Puxar pescoço", prevention: "Mãos leves" }],
    progression: [
      { week: 1, sets: 3, reps: "15-20", variation: "Normal" },
      { week: 2, sets: 3, reps: "20-25", variation: "Normal" }
    ],
    tips: ["Não puxe pescoço", "Controle", "Use abdominais"],
    mistakes: ["Puxar pescoço", "Rápido", "Não usar abdominais"],
    musclesWorked: ["Abdominais", "Oblíquos"]
  },
  {
    id: 106,
    name: "Polichinelo",
    muscle: "Full Body",
    difficulty: "Iniciante",
    sets: 3,
    reps: "20-30",
    rest: "60s",
    equipment: "Sem equipamento",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Pés juntos", "Pular abrindo", "Braços subindo", "Voltar posição"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Movimento descontrolado", "Não abrir pernas", "Braços não acompanham", "Pouso forte"] },
    instructions: { setup: "Pés juntos", execution: "Pule abrindo", breathing: "Respire normalmente" },
    precautions: ["Controle movimento", "Não force joelho", "Ritmo constante", "Descanse"],
    injuries: [{ name: "Lesão joelho", cause: "Pouso forte", prevention: "Controle movimento" }],
    progression: [
      { week: 1, sets: 3, reps: "20-30", variation: "Normal" },
      { week: 2, sets: 3, reps: "30-40", variation: "Normal" }
    ],
    tips: ["Controle", "Ritmo constante", "Respire"],
    mistakes: ["Rápido demais", "Não abrir pernas", "Pouso forte"],
    musclesWorked: ["Pernas", "Ombros", "Cardio"]
  },
  {
    id: 107,
    name: "Afundo (Lunge)",
    muscle: "Pernas",
    difficulty: "Intermediário",
    sets: 3,
    reps: "12-15 cada",
    rest: "90s",
    equipment: "Sem equipamento",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Joelho 90°", "Joelho trás quase chão", "Tronco reto", "Peso distribuído"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Joelho ultrapassando", "Tronco inclinado", "Passo curto", "Joelho batendo"] },
    instructions: { setup: "Pés largura ombros", execution: "Passo frente", breathing: "Inspire ao descer" },
    precautions: ["Tronco reto", "Joelho alinhado", "Mantenha equilíbrio", "Não force"],
    injuries: [{ name: "Lesão joelho", cause: "Joelho ultrapassando", prevention: "Mantenha alinhado" }],
    progression: [
      { week: 1, sets: 3, reps: "10-12", variation: "Estacionário" },
      { week: 2, sets: 3, reps: "12-15", variation: "Estacionário" }
    ],
    tips: ["Tronco reto", "Passo largo", "Equilíbrio"],
    mistakes: ["Joelho ultrapassando", "Tronco inclinado", "Passo curto"],
    musclesWorked: ["Quadríceps", "Glúteos", "Posterior"]
  },
  {
    id: 108,
    name: "Flexão Tríceps (Dips)",
    muscle: "Tríceps",
    difficulty: "Intermediário",
    sets: 3,
    reps: "8-12",
    rest: "90s",
    equipment: "Cadeira ou banco",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    correctForm: { color: "#10b981", description: "Forma correta", points: ["Mãos cadeira atrás", "Corpo reto", "Descer cotovelos", "Cotovelos 90°"] },
    incorrectForm: { color: "#ef4444", description: "Forma incorreta", mistakes: ["Cotovelos abertos", "Corpo inclinado", "Não descer", "Ombros para cima"] },
    instructions: { setup: "Mãos cadeira atrás", execution: "Desça e suba", breathing: "Inspire ao descer" },
    precautions: ["Cotovelos próximos", "Não desça muito", "Corpo reto", "Não force ombros"],
    injuries: [{ name: "Lesão ombro", cause: "Cotovelos abertos", prevention: "Mantenha próximos" }],
    progression: [
      { week: 1, sets: 3, reps: "8-10", variation: "Pés chão" },
      { week: 2, sets: 3, reps: "10-12", variation: "Pés chão" }
    ],
    tips: ["Cotovelos próximos", "Controle", "Não desça muito"],
    mistakes: ["Cotovelos abertos", "Corpo inclinado", "Ombros para cima"],
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
      setToast({ message: `+${amount} XP! Nível ${level}!`, type: 'success' });
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
          content: "Analisando seus dados. Recomendo manter foco na meta semanal."
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
// PAGES
// ======================================

function Dashboard() {
  const { user, missions, achievements, addWater, addXP } = useApp();
  const progressPercent = (user.xp / user.nextLevelXp) * 100;
  const waterPercent = (user.waterToday / user.waterGoal) * 100;

  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 text-sm">Nível</p>
              <h3 className="text-4xl font-black">{user.level}</h3>
            </div>
            <Crown className="text-yellow-500" size={32} />
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 text-sm">XP</p>
              <h3 className="text-2xl font-black">{user.xp}/{user.nextLevelXp}</h3>
            </div>
            <Zap className="text-cyan-500" size={32} />
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 mt-4">
            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 text-sm">Água</p>
              <h3 className="text-2xl font-black">{user.waterToday}ml</h3>
            </div>
            <Droplets className="text-blue-500" size={32} />
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 mt-4">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(waterPercent, 100)}%` }}></div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 text-sm">Streak</p>
              <h3 className="text-4xl font-black">{user.streak}</h3>
            </div>
            <Flame className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <h2 className="text-2xl font-bold mb-6">Missões do Dia</h2>
          <div className="space-y-4">
            {missions.map((mission) => (
              <div key={mission.id} className={`p-4 rounded-xl border-2 ${mission.completed ? 'bg-green-900/20 border-green-500' : 'bg-zinc-800 border-zinc-700'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{mission.title}</p>
                    <p className="text-sm text-zinc-400">+{mission.xp} XP</p>
                  </div>
                  {mission.completed ? <CheckCircle className="text-green-500" /> : <AlertCircle className="text-yellow-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <h2 className="text-2xl font-bold mb-6">Ações Rápidas</h2>
          <div className="space-y-4">
            <button onClick={() => addWater(250)} className="w-full bg-blue-500 hover:bg-blue-600 p-4 rounded-xl font-bold transition">
              💧 Adicionar 250ml de Água
            </button>
            <button onClick={() => addXP(50)} className="w-full bg-cyan-500 hover:bg-cyan-600 p-4 rounded-xl font-bold transition">
              ⚡ Adicionar 50 XP
            </button>
            <button className="w-full bg-purple-500 hover:bg-purple-600 p-4 rounded-xl font-bold transition">
              🎯 Iniciar Treino
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Workouts() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const filtered = filterDifficulty === 'all' ? workoutDatabase : workoutDatabase.filter(e => e.difficulty === filterDifficulty);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Treinos de Academia</h1>

      <div className="mb-8 flex gap-4 flex-wrap">
        {['all', 'Iniciante', 'Intermediário', 'Avançado'].map((diff) => (
          <button
            key={diff}
            onClick={() => setFilterDifficulty(diff)}
            className={`px-6 py-2 rounded-xl font-bold transition ${
              filterDifficulty === diff
                ? 'bg-cyan-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {diff === 'all' ? 'Todos' : diff}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-cyan-500 transition cursor-pointer"
          >
            <img src={exercise.image} alt={exercise.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
              <p className="text-zinc-400 mb-4">{exercise.muscle}</p>
              <div className="flex justify-between text-sm">
                <span className="bg-zinc-800 px-3 py-1 rounded-full">{exercise.difficulty}</span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full">{exercise.sets}x{exercise.reps}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedExercise && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-auto">
          <div className="max-w-4xl mx-auto bg-zinc-950 min-h-screen p-8">
            <button
              onClick={() => setSelectedExercise(null)}
              className="mb-6 bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              ✕ Fechar
            </button>
            <h1 className="text-4xl font-black mb-6">{selectedExercise.name}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img src={selectedExercise.image} alt={selectedExercise.name} className="w-full rounded-2xl mb-6" />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Informações</h3>
                  <p><strong>Músculo:</strong> {selectedExercise.muscle}</p>
                  <p><strong>Dificuldade:</strong> {selectedExercise.difficulty}</p>
                  <p><strong>Series:</strong> {selectedExercise.sets}</p>
                  <p><strong>Repetições:</strong> {selectedExercise.reps}</p>
                  <p><strong>Descanso:</strong> {selectedExercise.rest}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Forma Correta</h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
                    {selectedExercise.correctForm.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Cuidados</h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
                    {selectedExercise.precautions.map((precaution, i) => (
                      <li key={i}>{precaution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HomeWorkouts() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const filtered = filterDifficulty === 'all' ? homeWorkoutDatabase : homeWorkoutDatabase.filter(e => e.difficulty === filterDifficulty);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Treinos em Casa</h1>

      <div className="mb-8 flex gap-4 flex-wrap">
        {['all', 'Iniciante', 'Intermediário', 'Avançado'].map((diff) => (
          <button
            key={diff}
            onClick={() => setFilterDifficulty(diff)}
            className={`px-6 py-2 rounded-xl font-bold transition ${
              filterDifficulty === diff
                ? 'bg-cyan-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {diff === 'all' ? 'Todos' : diff}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-cyan-500 transition cursor-pointer"
          >
            <img src={exercise.image} alt={exercise.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
              <p className="text-zinc-400 mb-4">{exercise.muscle}</p>
              <div className="flex justify-between text-sm">
                <span className="bg-zinc-800 px-3 py-1 rounded-full">{exercise.difficulty}</span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full">{exercise.equipment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedExercise && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-auto">
          <div className="max-w-4xl mx-auto bg-zinc-950 min-h-screen p-8">
            <button
              onClick={() => setSelectedExercise(null)}
              className="mb-6 bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              ✕ Fechar
            </button>
            <h1 className="text-4xl font-black mb-6">{selectedExercise.name}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img src={selectedExercise.image} alt={selectedExercise.name} className="w-full rounded-2xl mb-6" />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Informações</h3>
                  <p><strong>Músculo:</strong> {selectedExercise.muscle}</p>
                  <p><strong>Dificuldade:</strong> {selectedExercise.difficulty}</p>
                  <p><strong>Series:</strong> {selectedExercise.sets}</p>
                  <p><strong>Repetições:</strong> {selectedExercise.reps}</p>
                  <p><strong>Equipamento:</strong> {selectedExercise.equipment}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Forma Correta</h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
                    {selectedExercise.correctForm.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Cuidados</h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
                    {selectedExercise.precautions.map((precaution, i) => (
                      <li key={i}>{precaution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Coach() {
  const { messages, sendMessage } = useApp();
  const [input, setInput] = useState('');

  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-4xl font-black mb-8">IA Coach</h1>
      <div className="flex-1 overflow-y-auto mb-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-4 rounded-2xl ${msg.role === 'user' ? 'bg-cyan-500 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
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
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage(input);
              setInput('');
            }
          }}
          placeholder="Pergunte algo..."
          className="flex-1 bg-zinc-800 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={() => {
            sendMessage(input);
            setInput('');
          }}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

function Hydration() {
  const { user, addWater } = useApp();
  const waterPercent = (user.waterToday / user.waterGoal) * 100;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Hidratação</h1>
      <div className="max-w-md mx-auto">
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 text-center">
          <Droplets className="mx-auto mb-6 text-blue-500" size={64} />
          <h2 className="text-5xl font-black mb-2">{user.waterToday}ml</h2>
          <p className="text-zinc-400 mb-6">de {user.waterGoal}ml</p>
          <div className="w-full bg-zinc-800 rounded-full h-4 mb-6">
            <div className="bg-blue-500 h-4 rounded-full transition-all" style={{ width: `${Math.min(waterPercent, 100)}%` }}></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => addWater(250)} className="bg-blue-500 hover:bg-blue-600 p-4 rounded-xl font-bold transition">
              +250ml
            </button>
            <button onClick={() => addWater(500)} className="bg-blue-500 hover:bg-blue-600 p-4 rounded-xl font-bold transition">
              +500ml
            </button>
            <button onClick={() => addWater(750)} className="bg-blue-500 hover:bg-blue-600 p-4 rounded-xl font-bold transition">
              +750ml
            </button>
            <button onClick={() => addWater(1000)} className="bg-blue-500 hover:bg-blue-600 p-4 rounded-xl font-bold transition">
              +1L
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Achievements() {
  const { achievements } = useApp();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Conquistas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`rounded-2xl p-6 border-2 ${
              achievement.unlocked
                ? 'bg-yellow-900/20 border-yellow-500'
                : 'bg-zinc-900 border-zinc-800'
            }`}
          >
            <div className="text-5xl mb-4">{achievement.icon}</div>
            <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
            <p className="text-zinc-400 text-sm mb-4">{achievement.description}</p>
            {!achievement.unlocked && achievement.progress && (
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full"
                  style={{ width: `${(achievement.progress / 100) * 100}%` }}
                ></div>
              </div>
            )}
            {achievement.unlocked && (
              <p className="text-yellow-400 text-sm">Desbloqueado em {achievement.unlockedDate}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  const { user } = useApp();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Perfil</h1>
      <div className="max-w-2xl space-y-6">
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 text-center">
          <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-2">{user.username}</h2>
          <p className="text-zinc-400 mb-6">{user.email}</p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-zinc-400">Idade</p>
              <p className="text-2xl font-bold">{user.age} anos</p>
            </div>
            <div>
              <p className="text-zinc-400">Altura</p>
              <p className="text-2xl font-bold">{user.height}cm</p>
            </div>
            <div>
              <p className="text-zinc-400">Peso</p>
              <p className="text-2xl font-bold">{user.weight}kg</p>
            </div>
            <div>
              <p className="text-zinc-400">Objetivo</p>
              <p className="text-2xl font-bold">{user.objective}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const { darkMode, setDarkMode } = useApp();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Configurações</h1>
      <div className="max-w-2xl space-y-6">
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Tema Escuro</h3>
            <p className="text-zinc-400">Alterne entre tema claro e escuro</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-6 py-2 rounded-xl font-bold transition ${
              darkMode ? 'bg-cyan-500' : 'bg-zinc-700'
            }`}
          >
            {darkMode ? 'Ativo' : 'Inativo'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ======================================
// MAIN LAYOUT
// ======================================
function MainLayout({ children }) {
  const { darkMode } = useApp();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "bg-zinc-950 text-white" : "bg-white text-black"}`}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

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
    { icon: Trophy, title: "Conquistas", path: "/achievements" },
    { icon: User, title: "Perfil", path: "/profile" },
    { icon: Gear, title: "Configurações", path: "/settings" }
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
// APP ROUTER
// ======================================
function AppRouter() {
  const { isAuthenticated } = useAuth();
  const { toast, setToast } = useApp();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/workouts"
        element={
          <MainLayout>
            <Workouts />
          </MainLayout>
        }
      />
      <Route
        path="/home-workouts"
        element={
          <MainLayout>
            <HomeWorkouts />
          </MainLayout>
        }
      />
      <Route
        path="/coach"
        element={
          <MainLayout>
            <Coach />
          </MainLayout>
        }
      />
      <Route
        path="/hydration"
        element={
          <MainLayout>
            <Hydration />
          </MainLayout>
        }
      />
      <Route
        path="/achievements"
        element={
          <MainLayout>
            <Achievements />
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <MainLayout>
            <SettingsPage />
          </MainLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// ======================================
// MAIN APP
// ======================================
export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen bg-zinc-950 text-white">
            <AppRouter />
            <ToastContainer />
          </div>
        </AppProvider>
      </AuthProvider>
    </HashRouter>
  );
}

function ToastContainer() {
  const { toast, setToast } = useApp();

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
