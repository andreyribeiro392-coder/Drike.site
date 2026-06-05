import React, { useEffect, useRef } from "react";

export default function Exercise3D({ exerciseName }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Configurar canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Limpar canvas
    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar figura humana simples
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Cabeça
    ctx.fillStyle = "#06b6d4";
    ctx.beginPath();
    ctx.arc(centerX, centerY - 80, 30, 0, Math.PI * 2);
    ctx.fill();

    // Corpo
    ctx.strokeStyle = "#a855f7";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 50);
    ctx.lineTo(centerX, centerY + 40);
    ctx.stroke();

    // Braços
    ctx.beginPath();
    ctx.moveTo(centerX - 40, centerY - 20);
    ctx.lineTo(centerX + 40, centerY - 20);
    ctx.stroke();

    // Pernas
    ctx.beginPath();
    ctx.moveTo(centerX - 20, centerY + 40);
    ctx.lineTo(centerX - 20, centerY + 100);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY + 40);
    ctx.lineTo(centerX + 20, centerY + 100);
    ctx.stroke();

    // Texto
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px bold";
    ctx.textAlign = "center";
    ctx.fillText(exerciseName || "Exercício", centerX, canvas.height - 30);

    // Animação de rotação
    let rotation = 0;
    const animate = () => {
      rotation += 0.02;

      ctx.fillStyle = "#18181b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.translate(-centerX, -centerY);

      // Cabeça
      ctx.fillStyle = "#06b6d4";
      ctx.beginPath();
      ctx.arc(centerX, centerY - 80, 30, 0, Math.PI * 2);
      ctx.fill();

      // Corpo
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 50);
      ctx.lineTo(centerX, centerY + 40);
      ctx.stroke();

      // Braços
      ctx.beginPath();
      ctx.moveTo(centerX - 40, centerY - 20);
      ctx.lineTo(centerX + 40, centerY - 20);
      ctx.stroke();

      // Pernas
      ctx.beginPath();
      ctx.moveTo(centerX - 20, centerY + 40);
      ctx.lineTo(centerX - 20, centerY + 100);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + 20, centerY + 40);
      ctx.lineTo(centerX + 20, centerY + 100);
      ctx.stroke();

      ctx.restore();

      // Texto
      ctx.fillStyle = "#ffffff";
      ctx.font = "24px bold";
      ctx.textAlign = "center";
      ctx.fillText(exerciseName || "Exercício", centerX, canvas.height - 30);

      requestAnimationFrame(animate);
    };

    animate();
  }, [exerciseName]);

  return (
    <div className="w-full bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-96"
        style={{ display: "block" }}
      />
      <div className="p-4 bg-zinc-800">
        <p className="text-zinc-300 text-center">
          Visualização 3D animada de {exerciseName || "exercício"}
        </p>
      </div>
    </div>
  );
}
