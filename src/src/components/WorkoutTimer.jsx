import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

export default function WorkoutTimer() {
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
              className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg font-bold transition"
            >
              +1 Série
            </button>
          </div>

          <div className="bg-gradient-to-br from-cyan-900 to-cyan-800 rounded-2xl p-6 border-2 border-cyan-500 text-center">
            <p className="text-cyan-300 text-sm font-bold mb-2">REPETIÇÕES</p>
            <p className="text-5xl font-black text-cyan-400 mb-4">{reps}</p>
            <button
              onClick={addRep}
              className="w-full bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg font-bold transition"
            >
              +1 Rep
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
            Use este cronômetro para controlar o tempo de descanso entre séries. Descanso ideal: 60-90 segundos para hipertrofia, 30-45 segundos para resistência!
          </p>
        </div>
      </div>
    </div>
  );
}
