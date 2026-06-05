import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function PoseDetector({ exerciseName }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [formCorrect, setFormCorrect] = useState(false);

  useEffect(() => {
    if (!cameraActive) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Simular detecção de pose
        const detectPose = () => {
          const canvas = canvasRef.current;
          if (!canvas || !videoRef.current) return;

          const ctx = canvas.getContext("2d");
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          // Desenhar vídeo
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          // Simular pontos de pose
          const points = [
            { x: canvas.width / 2, y: canvas.height / 3, label: "Cabeça" },
            { x: canvas.width / 2, y: canvas.height / 2, label: "Ombro" },
            { x: canvas.width / 3, y: (canvas.height * 2) / 3, label: "Cotovelo" },
            { x: canvas.width / 2.5, y: canvas.height - 50, label: "Pulso" },
          ];

          // Desenhar pontos
          points.forEach((point) => {
            ctx.fillStyle = formCorrect ? "#22c55e" : "#ef4444";
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = "12px bold";
            ctx.fillText(point.label, point.x + 10, point.y);
          });

          // Desenhar linhas conectando pontos
          ctx.strokeStyle = formCorrect ? "#22c55e" : "#ef4444";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(points[1].x, points[1].y);
          ctx.lineTo(points[2].x, points[2].y);
          ctx.lineTo(points[3].x, points[3].y);
          ctx.stroke();

          // Simular feedback
          const random = Math.random();
          if (random > 0.5) {
            setFormCorrect(true);
            setFeedback("✅ Forma correta! Continue assim!");
          } else {
            setFormCorrect(false);
            setFeedback("❌ Ajuste sua posição. Mantenha os cotovelos próximos ao corpo.");
          }

          requestAnimationFrame(detectPose);
        };

        detectPose();
      } catch (error) {
        console.error("Erro ao acessar câmera:", error);
        alert("Permita o acesso à câmera para usar a detecção de pose");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  return (
    <div className="w-full bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden p-6">
      <div className="space-y-4">
        <button
          onClick={() => setCameraActive(!cameraActive)}
          className={`w-full py-3 rounded-xl font-bold transition ${
            cameraActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {cameraActive ? "Parar Câmera" : "Iniciar Câmera"}
        </button>

        {cameraActive && (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-xl hidden"
            />
            <canvas
              ref={canvasRef}
              className="w-full rounded-xl bg-black"
            />

            {feedback && (
              <div
                className={`p-4 rounded-xl flex gap-3 ${
                  formCorrect
                    ? "bg-green-900/30 border border-green-500"
                    : "bg-red-900/30 border border-red-500"
                }`}
              >
                {formCorrect ? (
                  <CheckCircle size={24} className="text-green-500 flex-shrink-0" />
                ) : (
                  <AlertCircle size={24} className="text-red-500 flex-shrink-0" />
                )}
                <p className={formCorrect ? "text-green-300" : "text-red-300"}>
                  {feedback}
                </p>
              </div>
            )}

            <div className="bg-zinc-800 p-4 rounded-xl">
              <p className="text-zinc-300 text-sm">
                <strong>Dica:</strong> Mantenha-se em frente à câmera com boa iluminação.
                A detecção funcionará melhor se você estiver completamente visível.
              </p>
            </div>
          </div>
        )}

        {!cameraActive && (
          <div className="bg-zinc-800 p-4 rounded-xl text-center">
            <p className="text-zinc-400">
              Clique em "Iniciar Câmera" para começar a detecção de pose para {exerciseName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
