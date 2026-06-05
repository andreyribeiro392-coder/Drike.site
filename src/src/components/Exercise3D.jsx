import React, { useEffect, useRef } from 'react';

export default function Exercise3D({ exerciseName = 'Exercício' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId;
    let rotation = 0;

    const drawMuscles = (x, y, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Cabeça
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(0, -80, 35, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0891b2';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Pescoço
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(-15, -45, 30, 25);

      // Corpo
      ctx.fillStyle = '#a855f7';
      ctx.fillRect(-25, -20, 50, 60);
      ctx.strokeStyle = '#9333ea';
      ctx.lineWidth = 2;
      ctx.strokeRect(-25, -20, 50, 60);

      // Braço esquerdo
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.moveTo(-25, -10);
      ctx.lineTo(-70, -30);
      ctx.lineTo(-65, -15);
      ctx.lineTo(-20, 5);
      ctx.fill();

      // Braço direito
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.moveTo(25, -10);
      ctx.lineTo(70, -30);
      ctx.lineTo(65, -15);
      ctx.lineTo(20, 5);
      ctx.fill();

      // Perna esquerda
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-20, 40, 18, 70);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.strokeRect(-20, 40, 18, 70);

      // Perna direita
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(2, 40, 18, 70);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 40, 18, 70);

      // Músculos destacados
      ctx.fillStyle = '#22c55e';
      ctx.globalAlpha = 0.6;
      ctx.fillRect(-20, -15, 40, 25);
      ctx.globalAlpha = 1;

      ctx.restore();
    };

    const animate = () => {
      rotation += 0.015;

      // Fundo gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#09090b');
      gradient.addColorStop(1, '#18181b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid de fundo
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
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

      // Desenhar figura
      drawMuscles(canvas.width / 2, canvas.height / 2, rotation);

      // Informações
      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(exerciseName, canvas.width / 2, 40);

      ctx.fillStyle = '#a855f7';
      ctx.font = '14px Arial';
      ctx.fillText(`Rotação: ${Math.round((rotation * 180) / Math.PI) % 360}°`, canvas.width / 2, 70);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [exerciseName]);

  return (
    <div className="w-full bg-zinc-900 rounded-2xl border-2 border-cyan-500 overflow-hidden shadow-2xl">
      <canvas
        ref={canvasRef}
        className="w-full h-96"
        style={{ display: 'block', background: '#09090b' }}
      />
      <div className="p-4 bg-gradient-to-r from-zinc-900 to-zinc-800 border-t border-cyan-500">
        <p className="text-cyan-400 text-center font-bold">
          🎯 Visualização 3D Avançada de {exerciseName}
        </p>
      </div>
    </div>
  );
}
