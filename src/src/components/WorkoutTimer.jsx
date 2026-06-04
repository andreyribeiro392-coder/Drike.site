import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function WorkoutTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  useEffect(() => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    setMinutes(mins);
    setSeconds(secs);
  }, [totalSeconds]);

  const handleStart = () => {
    if (totalSeconds > 0) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleSetTime = (mins) => {
    setIsRunning(false);
    setTotalSeconds(mins * 60);
  };

  return (
    <div className="p-8 h-full flex flex-col items-center justify-center bg-zinc-950">
      <h1 className="text-4xl font-black mb-12">⏱️ Cronômetro</h1>

      {/* Timer Display */}
      <div className="mb-12 text-center">
        <div className="text-8xl font-black mb-4 font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <p className="text-zinc-400">Tempo de treino</p>
      </div>

      {/* Quick Set Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-md">
        <button
          onClick={() => handleSetTime(1)}
          className="bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl font-bold transition border border-zinc-800"
        >
          1 min
        </button>
        <button
          onClick={() => handleSetTime(3)}
          className="bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl font-bold transition border border-zinc-800"
        >
          3 min
        </button>
        <button
          onClick={() => handleSetTime(5)}
          className="bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl font-bold transition border border-zinc-800"
        >
          5 min
        </button>
        <button
          onClick={() => handleSetTime(10)}
          className="bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl font-bold transition border border-zinc-800"
        >
          10 min
        </button>
      </div>

      {/* Manual Input */}
      <div className="mb-12 w-full max-w-md">
        <label className="block text-sm font-bold mb-2">Tempo customizado (minutos)</label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            max="60"
            value={minutes}
            onChange={(e) => setTotalSeconds(parseInt(e.target.value) * 60)}
            className="flex-1 bg-zinc-900 px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-zinc-800"
          />
          <button
            onClick={() => setTotalSeconds(minutes * 60)}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold transition"
          >
            Definir
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 w-full max-w-md">
        <button
          onClick={handleStart}
          disabled={totalSeconds === 0}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 p-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
        >
          {isRunning ? (
            <>
              <Pause size={20} /> Pausar
            </>
          ) : (
            <>
              <Play size={20} /> Iniciar
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 p-4 rounded-xl font-bold transition flex items-center gap-2"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}

export default WorkoutTimer;
