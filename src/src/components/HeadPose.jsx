import React, { useState } from 'react';

export default function HeadPose() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden p-6">
      <div className="space-y-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`w-full py-3 rounded-xl font-bold transition ${
            isActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isActive ? 'Parar Head Pose' : 'Iniciar Head Pose'}
        </button>

        {isActive && (
          <div className="bg-zinc-800 p-8 rounded-xl text-center">
            <div className="text-6xl mb-4">🎭</div>
            <p className="text-zinc-300 font-bold mb-4">Head Pose Detectado</p>
            <div className="space-y-2 text-sm text-zinc-400">
              <p>Rotação: 45°</p>
              <p>Inclinação: 20°</p>
              <p>Movimento: Detectado</p>
            </div>
          </div>
        )}

        {!isActive && (
          <div className="bg-zinc-800 p-4 rounded-xl text-center">
            <p className="text-zinc-400">
              Clique em "Iniciar Head Pose" para começar a detecção
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
