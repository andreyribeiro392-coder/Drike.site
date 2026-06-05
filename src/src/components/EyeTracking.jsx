import React, { useEffect, useRef, useState } from "react";

export default function EyeTracking() {
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Rastrear movimento do mouse como simulação
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // Limpar canvas
      ctx.fillStyle = "#18181b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Desenhar olhos
      const eyeRadius = 40;
      const pupilRadius = 15;
      const leftEyeX = canvas.width / 3;
      const rightEyeX = (canvas.width * 2) / 3;
      const eyeY = canvas.height / 2;

      // Olho esquerdo
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(leftEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Calcular posição da pupila esquerda
      const angle1 = Math.atan2(mouseY - eyeY, mouseX - leftEyeX);
      const pupilX1 = leftEyeX + Math.cos(angle1) * (eyeRadius - pupilRadius);
      const pupilY1 = eyeY + Math.sin(angle1) * (eyeRadius - pupilRadius);

      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(pupilX1, pupilY1, pupilRadius, 0, Math.PI * 2);
      ctx.fill();

      // Olho direito
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(rightEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Calcular posição da pupila direita
      const angle2 = Math.atan2(mouseY - eyeY, mouseX - rightEyeX);
      const pupilX2 = rightEyeX + Math.cos(angle2) * (eyeRadius - pupilRadius);
      const pupilY2 = eyeY + Math.sin(angle2) * (eyeRadius - pupilRadius);

      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(pupilX2, pupilY2, pupilRadius, 0, Math.PI * 2);
      ctx.fill();

      // Desenhar boca
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, eyeY + 80, 30, 0, Math.PI);
      ctx.stroke();

      // Texto
      ctx.fillStyle = "#06b6d4";
      ctx.font = "18px bold";
      ctx.textAlign = "center";
      ctx.fillText("Mova o mouse para rastrear os olhos", canvas.width / 2, canvas.height - 20);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isActive]);

  return (
    <div className="w-full bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden p-6">
      <div className="space-y-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`w-full py-3 rounded-xl font-bold transition ${
            isActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isActive ? "Parar Eye Tracking" : "Iniciar Eye Tracking"}
        </button>

        {isActive && (
          <canvas
            ref={canvasRef}
            className="w-full h-96 bg-zinc-800 rounded-xl"
          />
        )}

        <div className="bg-zinc-800 p-4 rounded-xl">
          <p className="text-zinc-300 text-sm">
            <strong>Eye Tracking:</strong> Este é um simulador de rastreamento ocular.
            Mova o mouse para ver os olhos seguirem seu cursor.
          </p>
        </div>
      </div>
    </div>
  );
}
