import React, { createContext, useContext, useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Activity, Dumbbell, Brain, Droplets, Trophy, User, Sliders, Home, LogOut, Menu, X, CheckCircle, AlertCircle, Play, Pause, Eye, Head } from "lucide-react";

// ======================================
// IMPORTS DE COMPONENTES
// ======================================
import Exercise3D from "./components/Exercise3D";
import PoseDetector from "./components/PoseDetector";
import AICoach from "./components/AICoach";
import WorkoutTimer from "./components/WorkoutTimer";
import EyeTracking from "./components/EyeTracking";
import HeadPose from "./components/HeadPose";
import { expandedExerciseDatabase } from "./ExpandedExerciseDB";

// ======================================
// CONTEXTS
// ======================================
const AppContext = createContext();
const AuthContext = createContext();

function useApp() {
  return useContext(AppContext);
}

function useAuth() {
  return useContext(AuthContext);
}

// ======================================
// AUTH PROVIDER
// ======================================
function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const signup = (email, password) => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos");
      return false;
    }
    const newUser = { email, id: Date.now() };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const login = (email, password) => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos");
      return false;
    }
    const newUser = { email, id: Date.now() };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ======================================
// APP PROVIDER
// ======================================
function AppProvider({ children }) {
  const [user, setUser] = useState({
    username: "Atleta",
    email: "atleta@aura.com",
    level: 12,
    xp: 2450,
    waterToday: 1800,
    waterGoal: 2000,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    age: 25,
    height: 180,
    weight: 75,
    objective: "Ganhar Massa",
  });

  const [darkMode, setDarkMode] = useState(true);
  const [toast, setToast] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [achievements, setAchievements] = useState([
    { id: 1, title: "Primeiro Treino", description: "Complete seu primeiro treino", icon: "🏋️", unlocked: true, unlockedDate: "2024-01-15" },
    { id: 2, title: "Hidratado", description: "Beba 2L de água", icon: "💧", unlocked: false, progress: 75 },
    { id: 3, title: "Campeão", description: "Atinja nível 20", icon: "🏆", unlocked: false, progress: 60 },
    { id: 4, title: "Mestre 3D", description: "Complete 10 exercícios com visualização 3D", icon: "🎯", unlocked: false, progress: 30 },
    { id: 5, title: "Detector de Forma", description: "Use detecção de pose 5 vezes", icon: "📹", unlocked: false, progress: 40 },
  ]);

  const addWater = (amount) => {
    setUser((prev) => ({
      ...prev,
      waterToday: Math.min(prev.waterToday + amount, prev.waterGoal * 1.5),
    }));
    setToast({ message: `+${amount}ml de água! 💧`, type: "success" });
  };

  const addXP = (amount) => {
    setUser((prev) => ({
      ...prev,
      xp: prev.xp + amount,
      level: Math.floor((prev.xp + amount) / 200) + 1,
    }));
    setToast({ message: `+${amount} XP! 🎉`, type: "success" });
  };

  const addWorkout = (exercise) => {
    setWorkoutHistory([...workoutHistory, { ...exercise, date: new Date() }]);
    addXP(50);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        darkMode,
        setDarkMode,
        toast,
        setToast,
        addWater,
        addXP,
        timerSeconds,
        setTimerSeconds,
        timerRunning,
        setTimerRunning,
        workoutHistory,
        addWorkout,
        achievements,
        setAchievements,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ======================================
// LOGIN PAGE
// ======================================
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Aura Fitness
          </h1>
          <p className="text-zinc-400">Bem-vindo de volta</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-zinc-900 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-zinc-800"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-zinc-800"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 py-3 rounded-xl font-bold transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-zinc-400 mt-4">
          Não tem conta?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-cyan-400 hover:text-cyan-300 font-bold"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
}

// ======================================
// SIGNUP PAGE
// ======================================
function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (signup(email, password)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Aura Fitness
          </h1>
          <p className="text-zinc-400">Crie sua conta</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-zinc-900 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-zinc-800"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-zinc-800"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 py-3 rounded-xl font-bold transition"
          >
            Criar Conta
          </button>
        </form>

        <p className="text-center text-zinc-400 mt-4">
          Já tem conta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-cyan-400 hover:text-cyan-300 font-bold"
          >
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
}

// ======================================
// DASHBOARD PAGE
// ======================================
function Dashboard() {
  const { user, addXP, workoutHistory } = useApp();
  const xpPercent = (user.xp % 200) / 2;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Bem-vindo de volta 🚀</h1>
      <p className="text-zinc-400 mb-8">Continue sua evolução.</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <p className="text-zinc-400 text-sm mb-2">Nível</p>
          <p className="text-4xl font-black">{user.level}</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <p className="text-zinc-400 text-sm mb-2">XP</p>
          <p className="text-4xl font-black">{user.xp}</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <p className="text-zinc-400 text-sm mb-2">Água</p>
          <p className="text-4xl font-black">{user.waterToday}ml</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <p className="text-zinc-400 text-sm mb-2">Treinos</p>
          <p className="text-4xl font-black">{workoutHistory.length}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl p-8 text-white mb-8">
        <h2 className="text-3xl font-black mb-4">Sua Meta Está Próxima</h2>
        <p className="mb-6">Continue treinando para alcançar seus objetivos.</p>
        <div className="w-full bg-white/20 rounded-full h-4">
          <div className="bg-white h-4 rounded-full transition-all" style={{ width: `${xpPercent}%` }}></div>
        </div>
      </div>

      <button
        onClick={() => addXP(50)}
        className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-bold transition"
      >
        Ganhar 50 XP (Teste)
      </button>
    </div>
  );
}

// ======================================
// WORKOUTS PAGE
// ======================================
function Workouts() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showPoseDetector, setShowPoseDetector] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const { addWorkout } = useApp();
  const exercises = expandedExerciseDatabase.academia;

  if (selectedExercise) {
    return (
      <div className="p-8">
        <button
          onClick={() => {
            setSelectedExercise(null);
            setShowPoseDetector(false);
            setShow3D(false);
          }}
          className="mb-6 text-cyan-400 hover:text-cyan-300 font-bold"
        >
          ← Voltar
        </button>

        <h1 className="text-4xl font-black mb-8">{selectedExercise.name}</h1>

        {/* Abas */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => { setShow3D(false); setShowPoseDetector(false); }}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-xl font-bold transition"
          >
            Informações
          </button>
          <button
            onClick={() => { setShow3D(true); setShowPoseDetector(false); }}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-xl font-bold transition"
          >
            Visualização 3D
          </button>
          <button
            onClick={() => { setShowPoseDetector(true); setShow3D(false); }}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-xl font-bold transition"
          >
            Detecção de Forma
          </button>
          <button
            onClick={() => {
              addWorkout(selectedExercise);
              alert("Treino registrado! +50 XP");
            }}
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-xl font-bold transition"
          >
            Registrar Treino
          </button>
        </div>

        {/* Conteúdo */}
        {show3D ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Visualização 3D</h2>
            <Exercise3D exerciseName={selectedExercise.name} />
          </div>
        ) : showPoseDetector ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Detecção de Forma</h2>
            <PoseDetector exerciseName={selectedExercise.name} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Forma Correta</h3>
              <ul className="space-y-2 text-zinc-400">
                {selectedExercise.correctForm.points.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Cuidados</h3>
              <ul className="space-y-2 text-zinc-400">
                {selectedExercise.precautions.map((precaution, i) => (
                  <li key={i} className="flex gap-2">
                    <AlertCircle size={20} className="text-yellow-500 flex-shrink-0" />
                    {precaution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!show3D && !showPoseDetector && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Lesões Possíveis</h3>
            <ul className="space-y-2 text-zinc-400">
              {selectedExercise.injuries.map((injury, i) => (
                <li key={i} className="flex gap-2">
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                  {injury}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Treinos de Academia</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
            className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-cyan-500 transition cursor-pointer"
          >
            <img src={exercise.image} alt={exercise.name} className="w-full h-40 object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
            <p className="text-zinc-400 text-sm mb-4">{exercise.muscle}</p>
            <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-xl font-bold transition">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================
// HOME WORKOUTS PAGE
// ======================================
function HomeWorkouts() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showPoseDetector, setShowPoseDetector] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const { addWorkout } = useApp();
  const exercises = expandedExerciseDatabase.casa;

  if (selectedExercise) {
    return (
      <div className="p-8">
        <button
          onClick={() => {
            setSelectedExercise(null);
            setShowPoseDetector(false);
            setShow3D(false);
          }}
          className="mb-6 text-cyan-400 hover:text-cyan-300 font-bold"
        >
          ← Voltar
        </button>

        <h1 className="text-4xl font-black mb-8">{selectedExercise.name}</h1>

        {/* Abas */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => { setShow3D(false); setShowPoseDetector(false); }}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-xl font-bold transition"
          >
            Informações
          </button>
          <button
            onClick={() => { setShow3D(true); setShowPoseDetector(false); }}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-xl font-bold transition"
          >
            Visualização 3D
          </button>
          <button
            onClick={() => { setShowPoseDetector(true); setShow3D(false); }}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-xl font-bold transition"
          >
            Detecção de Forma
          </button>
          <button
            onClick={() => {
              addWorkout(selectedExercise);
              alert("Treino registrado! +50 XP");
            }}
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-xl font-bold transition"
          >
            Registrar Treino
          </button>
        </div>

        {/* Conteúdo */}
        {show3D ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Visualização 3D</h2>
            <Exercise3D exerciseName={selectedExercise.name} />
          </div>
        ) : showPoseDetector ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Detecção de Forma</h2>
            <PoseDetector exerciseName={selectedExercise.name} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Forma Correta</h3>
              <ul className="space-y-2 text-zinc-400">
                {selectedExercise.correctForm.points.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Cuidados</h3>
              <ul className="space-y-2 text-zinc-400">
                {selectedExercise.precautions.map((precaution, i) => (
                  <li key={i} className="flex gap-2">
                    <AlertCircle size={20} className="text-yellow-500 flex-shrink-0" />
                    {precaution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!show3D && !showPoseDetector && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Lesões Possíveis</h3>
            <ul className="space-y-2 text-zinc-400">
              {selectedExercise.injuries.map((injury, i) => (
                <li key={i} className="flex gap-2">
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                  {injury}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Treinos em Casa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
            className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-cyan-500 transition cursor-pointer"
          >
            <img src={exercise.image} alt={exercise.name} className="w-full h-40 object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
            <p className="text-zinc-400 text-sm mb-4">{exercise.muscle}</p>
            <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-xl font-bold transition">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================
// AI COACH PAGE
// ======================================
function Coach() {
  return <AICoach />;
}

// ======================================
// HYDRATION PAGE
// ======================================
function Hydration() {
  const { user, addWater } = useApp();
  const waterPercent = (user.waterToday / user.waterGoal) * 100;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Hidratação</h1>
      <div className="max-w-md mx-auto">
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 text-center">
          <div className="text-6xl mb-6">💧</div>
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

// ======================================
// ACHIEVEMENTS PAGE
// ======================================
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
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================
// PROFILE PAGE
// ======================================
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

// ======================================
// SETTINGS PAGE
// ======================================
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
// TIMER PAGE
// ======================================
function Timer() {
  return <WorkoutTimer />;
}

// ======================================
// EYE TRACKING PAGE
// ======================================
function EyeTrackingPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Eye Tracking</h1>
      <EyeTracking />
    </div>
  );
}

// ======================================
// HEAD POSE PAGE
// ======================================
function HeadPosePage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-black mb-8">Head Pose Detection</h1>
      <HeadPose />
    </div>
  );
}

// ======================================
// NOT FOUND PAGE
// ======================================
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black mb-4">404</h1>
        <p className="text-zinc-400 mb-8">Página não encontrada</p>
      </div>
    </div>
  );
}

// ======================================
// MAIN LAYOUT
// ======================================
function MainLayout({ children }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Activity, title: "Dashboard", path: "/" },
    { icon: Dumbbell, title: "Treinos Academia", path: "/workouts" },
    { icon: Home, title: "Treinos em Casa", path: "/home-workouts" },
    { icon: Brain, title: "IA Coach", path: "/coach" },
    { icon: Droplets, title: "Hidratação", path: "/hydration" },
    { icon: Trophy, title: "Conquistas", path: "/achievements" },
    { icon: User, title: "Perfil", path: "/profile" },
    { icon: Sliders, title: "Configurações", path: "/settings" },
    { icon: Activity, title: "Cronômetro", path: "/timer" },
    { icon: Eye, title: "Eye Tracking", path: "/eye-tracking" },
    { icon: Head, title: "Head Pose", path: "/head-pose" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-72 min-h-screen border-r border-zinc-800 p-5 transition-transform duration-300 z-30 bg-zinc-950 flex flex-col overflow-y-auto`}>
        <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-10">
          Aura Fitness
        </h1>

        <div className="flex flex-col gap-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-zinc-900 transition-all text-left"
              >
                <Icon size={20} />
                <span className="text-sm">{item.title}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-red-900/30 transition-all text-red-400 font-bold"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-8">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden bg-cyan-500 p-2 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div>
            <h2 className="text-2xl font-bold">Bem-vindo de volta 🚀</h2>
            <p className="text-zinc-400">Continue sua evolução.</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// ======================================
// ROUTER
// ======================================
function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/workouts"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Workouts />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/home-workouts"
        element={
          isAuthenticated ? (
            <MainLayout>
              <HomeWorkouts />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/coach"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Coach />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/hydration"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Hydration />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/achievements"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Achievements />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Profile />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/timer"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Timer />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/eye-tracking"
        element={
          isAuthenticated ? (
            <MainLayout>
              <EyeTrackingPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/head-pose"
        element={
          isAuthenticated ? (
            <MainLayout>
              <HeadPosePage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
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
          <AppRouter />
        </AppProvider>
      </AuthProvider>
    </HashRouter>
  );
}
