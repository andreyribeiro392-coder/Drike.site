import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function WorkoutTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("1");

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      setIsRunning(false);
      // Tocar som de conclusão
      playSound();
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const playSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

  return (
    <div className="w-full p-8">
      <h1 className="text-4xl font-black mb-8">Cronômetro de Treino</h1>

      <div className="max-w-md mx-auto">
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 text-center">
          {/* Display do Tempo */}
          <div className="text-7xl font-black font-mono mb-8 text-cyan-400">
            {formatTime(seconds)}
          </div>

          {/* Botões Presets */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => startTimer(1)}
              disabled={isRunning}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-zinc-700 p-4 rounded-xl font-bold transition"
            >
              1 min
            </button>
            <button
              onClick={() => startTimer(3)}
              disabled={isRunning}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-zinc-700 p-4 rounded-xl font-bold transition"
            >
              3 min
            </button>
            <button
              onClick={() => startTimer(5)}
              disabled={isRunning}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-zinc-700 p-4 rounded-xl font-bold transition"
            >
              5 min
            </button>
            <button
              onClick={() => startTimer(10)}
              disabled={isRunning}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-zinc-700 p-4 rounded-xl font-bold transition"
            >
              10 min
            </button>
          </div>

          {/* Input Customizado */}
          <div className="flex gap-2 mb-6">
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              min="0"
              max="60"
              className="flex-1 bg-zinc-800 px-4 py-2 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-zinc-700"
              placeholder="Minutos"
            />
            <button
              onClick={() => startTimer(parseInt(inputMinutes) || 1)}
              disabled={isRunning}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-700 px-6 py-2 rounded-xl font-bold transition"
            >
              Iniciar
            </button>
          </div>

          {/* Controles */}
          <div className="flex gap-4">
            <button
              onClick={toggleTimer}
              className={`flex-1 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                isRunning
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
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
              className="flex-1 bg-red-500 hover:bg-red-600 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} /> Resetar
            </button>
          </div>

          {/* Info */}
          <div className="mt-6 bg-zinc-800 p-4 rounded-xl">
            <p className="text-zinc-300 text-sm">
              {seconds === 0
                ? "Selecione um tempo para começar"
                : isRunning
                ? "Cronômetro em execução..."
                : "Cronômetro pausado"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
