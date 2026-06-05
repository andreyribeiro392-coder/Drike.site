import React, { useEffect, useRef, useState } from 'react';
import { Eye } from 'lucide-react';

export default function EyeTracking() {
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      setMousePos({ x: mouseX, y: mouseY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Fundo gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#09090b');
      gradient.addColorStop(1, '#18181b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      const eyeRadius = 50;
      const pupilRadius = 18;
      const leftEyeX = canvas.width / 3;
      const rightEyeX = (canvas.width * 2) / 3;
      const eyeY = canvas.height / 2;

      // Olho esquerdo - com glow
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 30;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(leftEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Calcular ângulo e posição da pupila esquerda
      const angle1 = Math.atan2(mouseY - eyeY, mouseX - leftEyeX);
      const pupilX1 = leftEyeX + Math.cos(angle1) * (eyeRadius - pupilRadius - 5);
      const pupilY1 = eyeY + Math.sin(angle1) * (eyeRadius - pupilRadius - 5);

      // Pupila esquerda com gradiente
      const pupilGradient1 = ctx.createRadialGradient(pupilX1 - 5, pupilY1 - 5, 0, pupilX1, pupilY1, pupilRadius);
      pupilGradient1.addColorStop(0, '#06b6d4');
      pupilGradient1.addColorStop(1, '#000000');
      ctx.fillStyle = pupilGradient1;
      ctx.beginPath();
      ctx.arc(pupilX1, pupilY1, pupilRadius, 0, Math.PI * 2);
      ctx.fill();

      // Brilho na pupila esquerda
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(pupilX1 - 5, pupilY1 - 5, 5, 0, Math.PI * 2);
      ctx.fill();

      // Olho direito - com glow
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 30;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(rightEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Calcular ângulo e posição da pupila direita
      const angle2 = Math.atan2(mouseY - eyeY, mouseX - rightEyeX);
      const pupilX2 = rightEyeX + Math.cos(angle2) * (eyeRadius - pupilRadius - 5);
      const pupilY2 = eyeY + Math.sin(angle2) * (eyeRadius - pupilRadius - 5);

      // Pupila direita com gradiente
      const pupilGradient2 = ctx.createRadialGradient(pupilX2 - 5, pupilY2 - 5, 0, pupilX2, pupilY2, pupilRadius);
      pupilGradient2.addColorStop(0, '#a855f7');
      pupilGradient2.addColorStop(1, '#000000');
      ctx.fillStyle = pupilGradient2;
      ctx.beginPath();
      ctx.arc(pupilX2, pupilY2, pupilRadius, 0, Math.PI * 2);
      ctx.fill();

      // Brilho na pupila direita
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(pupilX2 - 5, pupilY2 - 5, 5, 0, Math.PI * 2);
      ctx.fill();

      // Sobrancelhas
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';

      // Sobrancelha esquerda
      ctx.beginPath();
      ctx.arc(leftEyeX - 30, eyeY - 65, 25, 0.2, Math.PI - 0.2);
      ctx.stroke();

      // Sobrancelha direita
      ctx.strokeStyle = '#a855f7';
      ctx.beginPath();
      ctx.arc(rightEyeX + 30, eyeY - 65, 25, Math.PI + 0.2, Math.PI * 2 - 0.2);
      ctx.stroke();

      // Informações
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('👁️ Eye Tracking Premium', canvas.width / 2, 50);

      ctx.fillStyle = '#a855f7';
      ctx.font = '14px Arial';
      ctx.fillText(
        `Posição: (${Math.round(mouseX)}, ${Math.round(mouseY)})`,
        canvas.width / 2,
        canvas.height - 30
      );

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  return (
    <div className="w-full bg-zinc-900 rounded-2xl border-2 border-cyan-500 overflow-hidden shadow-2xl p-6">
      <div className="space-y-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`w-full py-4 rounded-xl font-bold transition transform hover:scale-105 flex items-center justify-center gap-2 ${
            isActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          <Eye size={20} />
          {isActive ? 'Parar Eye Tracking' : 'Iniciar Eye Tracking'}
        </button>

        {isActive && (
          <canvas
            ref={canvasRef}
            className="w-full h-96 bg-zinc-800 rounded-xl border-2 border-cyan-500"
          />
        )}

        <div className="bg-zinc-800 p-4 rounded-xl border border-cyan-500">
          <p className="text-zinc-300 text-sm">
            <strong>👁️ Eye Tracking Premium:</strong> Mova o mouse para ver os olhos seguirem seu cursor.
            Tecnologia avançada com pupilas dinâmicas, brilho realista e rastreamento suave!
          </p>
        </div>
      </div>
    </div>
  );
}
