import React, { useEffect, useRef, useState } from "react";
export default function HeadPose() {
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let rotation = 0;

    const animate = () => {
      rotation += 0.02;

      // Limpar canvas
      ctx.fillStyle = "#18181b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.translate(-centerX, -centerY);

      // Cabeça (círculo)
      ctx.fillStyle = "#06b6d4";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Olhos
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(centerX - 25, centerY - 20, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX + 25, centerY - 20, 10, 0, Math.PI * 2);
      ctx.fill();

      // Pupilas
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(centerX - 25, centerY - 20, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX + 25, centerY - 20, 5, 0, Math.PI * 2);
      ctx.fill();

      // Nariz
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 10);
      ctx.lineTo(centerX, centerY + 10);
      ctx.stroke();

      // Boca
      ctx.beginPath();
      ctx.arc(centerX, centerY + 30, 20, 0, Math.PI);
      ctx.stroke();

      ctx.restore();

      // Informações de rotação
      ctx.fillStyle = "#06b6d4";
      ctx.font = "18px bold";
      ctx.textAlign = "center";
      ctx.fillText(
        `Rotação: ${Math.round((rotation * 180) / Math.PI)}°`,
        centerX,
        canvas.height - 20
      );

      requestAnimationFrame(animate);
    };

    animate();
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
          {isActive ? "Parar Head Pose" : "Iniciar Head Pose"}
        </button>

        {isActive && (
          <canvas
            ref={canvasRef}
            className="w-full h-96 bg-zinc-800 rounded-xl"
          />
        )}

        <div className="bg-zinc-800 p-4 rounded-xl">
          <p className="text-zinc-300 text-sm">
            <strong>Head Pose Detection:</strong> Visualização da detecção de posição
            da cabeça. A cabeça está rotacionando para demonstrar o rastreamento de
            movimento.
          </p>
        </div>
      </div>
    </div>
  );
}
