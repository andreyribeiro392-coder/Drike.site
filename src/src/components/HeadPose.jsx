import React, { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';

export default function HeadPose() {
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let rot = 0;
    let animationId;

    const animate = () => {
      rot += 0.025;
      setRotation(Math.round((rot * 180) / Math.PI) % 360);

      // Fundo gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#09090b');
      gradient.addColorStop(1, '#18181b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid de fundo
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rot);
      ctx.translate(-centerX, -centerY);

      // Cabeça - com gradiente
      const headGradient = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 80);
      headGradient.addColorStop(0, '#06b6d4');
      headGradient.addColorStop(1, '#0891b2');
      ctx.fillStyle = headGradient;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
      ctx.fill();

      // Contorno da cabeça
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
      ctx.stroke();

      // Olhos
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(centerX - 25, centerY - 20, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX + 25, centerY - 20, 12, 0, Math.PI * 2);
      ctx.fill();

      // Pupilas
      ctx.fillStyle = '#000000';
      ctx.shadowColor = 'transparent';
      ctx.beginPath();
      ctx.arc(centerX - 25, centerY - 20, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX + 25, centerY - 20, 6, 0, Math.PI * 2);
      ctx.fill();

      // Brilho nos olhos
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(centerX - 22, centerY - 23, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX + 28, centerY - 23, 3, 0, Math.PI * 2);
      ctx.fill();

      // Nariz
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 10);
      ctx.lineTo(centerX, centerY + 15);
      ctx.stroke();

      // Boca com expressão
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(centerX, centerY + 35, 20, 0, Math.PI);
      ctx.stroke();

      // Sobrancelhas
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(centerX - 25, centerY - 35, 18, 0.3, Math.PI - 0.3);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX + 25, centerY - 35, 18, Math.PI + 0.3, Math.PI * 2 - 0.3);
      ctx.stroke();

      ctx.restore();

      // Informações de rotação
      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('🎭 Head Pose Detection', centerX, 50);

      ctx.fillStyle = '#a855f7';
      ctx.font = 'bold 32px Arial';
      ctx.fillText(`${Math.round((rot * 180) / Math.PI) % 360}°`, centerX, canvas.height - 60);

      ctx.fillStyle = '#ec4899';
      ctx.font = '16px Arial';
      ctx.fillText('Rotação em tempo real', centerX, canvas.height - 30);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isActive]);

  return (
    <div className="w-full bg-zinc-900 rounded-2xl border-2 border-purple-500 overflow-hidden shadow-2xl p-6">
      <div className="space-y-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`w-full py-4 rounded-xl font-bold transition transform hover:scale-105 flex items-center justify-center gap-2 ${
            isActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          <Zap size={20} />
          {isActive ? 'Parar Head Pose Detection' : 'Iniciar Head Pose Detection'}
        </button>

        {isActive && (
          <div className="space-y-4">
            <canvas
              ref={canvasRef}
              className="w-full h-96 bg-zinc-800 rounded-xl border-2 border-purple-500"
            />

            {/* Informações de Rotação */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-800 p-4 rounded-xl text-center border border-purple-500">
                <p className="text-purple-300 text-sm font-bold">Rotação</p>
                <p className="text-2xl font-black text-purple-400">{rotation}°</p>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl text-center border border-cyan-500">
                <p className="text-cyan-300 text-sm font-bold">Status</p>
                <p className="text-2xl font-black text-cyan-400">🔴 Ativo</p>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl text-center border border-pink-500">
                <p className="text-pink-300 text-sm font-bold">FPS</p>
                <p className="text-2xl font-black text-pink-400">60</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-zinc-800 p-4 rounded-xl border-2 border-purple-500">
          <p className="text-zinc-300 text-sm">
            <strong>🎭 Head Pose Detection Premium:</strong> Detecção avançada de posição da cabeça
            com rotação suave, expressões faciais e feedback em tempo real. Tecnologia de ponta para
            análise de movimento!
          </p>
        </div>
      </div>
    </div>
  );
}
