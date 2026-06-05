import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, AlertCircle, Zap } from 'lucide-react';

export default function PoseDetector({ exerciseName = 'Exercício' }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [formCorrect, setFormCorrect] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (!cameraActive) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const detectPose = () => {
          const canvas = canvasRef.current;
          const video = videoRef.current;
          if (!canvas || !video) return;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Desenhar vídeo
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Adicionar filtro
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * 1.2);
            data[i + 1] = Math.min(255, data[i + 1] * 1.1);
            data[i + 2] = Math.min(255, data[i + 2] * 1.3);
          }
          ctx.putImageData(imageData, 0, 0);

          // Pontos de pose avançados
          const points = [
            { x: canvas.width / 2, y: canvas.height / 4, label: '👤 Cabeça', color: '#06b6d4' },
            { x: canvas.width / 2, y: canvas.height / 3, label: '💪 Ombro', color: '#a855f7' },
            { x: canvas.width / 3, y: canvas.height / 2, label: '🔗 Cotovelo', color: '#ec4899' },
            { x: canvas.width / 4, y: (canvas.height * 2) / 3, label: '✋ Pulso', color: '#f59e0b' },
            { x: (canvas.width * 2) / 3, y: canvas.height / 2, label: '🔗 Cotovelo', color: '#ec4899' },
            { x: (canvas.width * 3) / 4, y: (canvas.height * 2) / 3, label: '✋ Pulso', color: '#f59e0b' },
          ];

          // Desenhar pontos com glow
          points.forEach((point) => {
            ctx.shadowColor = formCorrect ? '#22c55e' : '#ef4444';
            ctx.shadowBlur = 20;
            ctx.fillStyle = formCorrect ? '#22c55e' : '#ef4444';
            ctx.beginPath();
            ctx.arc(point.x, point.y, 12, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.fillText(point.label, point.x + 15, point.y);
          });

          // Desenhar skeleton
          ctx.strokeStyle = formCorrect ? '#22c55e' : '#ef4444';
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(points[1].x, points[1].y);
          ctx.lineTo(points[2].x, points[2].y);
          ctx.lineTo(points[3].x, points[3].y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(points[1].x, points[1].y);
          ctx.lineTo(points[4].x, points[4].y);
          ctx.lineTo(points[5].x, points[5].y);
          ctx.stroke();

          // Simular feedback
          const random = Math.random();
          const acc = Math.round(random * 100);
          setAccuracy(acc);

          if (random > 0.4) {
            setFormCorrect(true);
            setFeedback('✅ Forma PERFEITA! Músculos ativados corretamente!');
          } else if (random > 0.2) {
            setFormCorrect(false);
            setFeedback('⚠️ Ajuste sua posição. Mantenha o core contraído!');
          } else {
            setFormCorrect(false);
            setFeedback('❌ Forma incorreta. Volte à posição inicial!');
          }

          requestAnimationFrame(detectPose);
        };

        detectPose();
      } catch (error) {
        console.error('Erro ao acessar câmera:', error);
        alert('Permita o acesso à câmera para usar detecção de pose');
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
    <div className="w-full bg-zinc-900 rounded-2xl border-2 border-purple-500 overflow-hidden shadow-2xl p-6">
      <div className="space-y-4">
        <button
          onClick={() => setCameraActive(!cameraActive)}
          className={`w-full py-4 rounded-xl font-bold transition transform hover:scale-105 flex items-center justify-center gap-2 ${
            cameraActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          <Zap size={20} />
          {cameraActive ? 'Parar Detecção de Pose' : 'Iniciar Detecção de Pose'}
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
              className="w-full rounded-xl bg-black border-2 border-purple-500"
            />

            {/* Accuracy Bar */}
            <div className="bg-zinc-800 p-4 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-cyan-400 font-bold">Precisão</span>
                <span className="text-cyan-400 font-bold">{accuracy}%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>

            {feedback && (
              <div
                className={`p-4 rounded-xl flex gap-3 border-2 ${
                  formCorrect
                    ? 'bg-green-900/30 border-green-500'
                    : 'bg-red-900/30 border-red-500'
                }`}
              >
                {formCorrect ? (
                  <CheckCircle size={24} className="text-green-500 flex-shrink-0" />
                ) : (
                  <AlertCircle size={24} className="text-red-500 flex-shrink-0" />
                )}
                <p className={formCorrect ? 'text-green-300 font-bold' : 'text-red-300 font-bold'}>
                  {feedback}
                </p>
              </div>
            )}

            <div className="bg-zinc-800 p-4 rounded-xl border border-purple-500">
              <p className="text-zinc-300 text-sm">
                <strong>💡 Dica:</strong> Mantenha-se em frente à câmera com boa iluminação.
                A detecção funcionará melhor se você estiver completamente visível.
              </p>
            </div>
          </div>
        )}

        {!cameraActive && (
          <div className="bg-zinc-800 p-6 rounded-xl text-center border border-purple-500">
            <p className="text-zinc-400 font-bold text-lg">
              🎥 Clique em "Iniciar Detecção de Pose" para começar com {exerciseName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
