import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Nota: Você precisa adicionar MediaPipe via CDN
// Adicione isso no seu index.html:
// <script async src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"></script>
// <script async src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"></script>
// <script async src="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js"></script>

export function PoseDetector({ exerciseName = 'Flexão', onFeedback }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState('neutral');
  const [feedbackMessage, setFeedbackMessage] = useState('Iniciando câmera...');

  useEffect(() => {
    const initPoseDetection = async () => {
      try {
        // Verificar se MediaPipe está disponível
        if (!window.Pose) {
          setFeedbackMessage('MediaPipe não carregado. Verifique a conexão.');
          setIsLoading(false);
          return;
        }

        const pose = new window.Pose({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          smoothSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        // Callback para processar resultados
        pose.onResults((results) => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');

          // Limpar canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Desenhar vídeo
          if (results.image) {
            ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
          }

          // Desenhar pose landmarks
          if (results.poseLandmarks && results.poseLandmarks.length > 0) {
            drawPose(ctx, results.poseLandmarks);
            
            // Analisar forma do exercício
            const analysis = analyzePose(results.poseLandmarks, exerciseName);
            setFeedback(analysis.status);
            setFeedbackMessage(analysis.message);
            
            if (onFeedback) {
              onFeedback(analysis);
            }
          }
        });

        // Acessar câmera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 } },
        });

        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsLoading(false);

          // Processar frames
          const processFrame = async () => {
            await pose.send({ image: videoRef.current });
            requestAnimationFrame(processFrame);
          };
          processFrame();
        };
      } catch (error) {
        console.error('Erro ao iniciar detecção de pose:', error);
        setFeedbackMessage('Erro ao acessar câmera. Verifique as permissões.');
        setIsLoading(false);
      }
    };

    initPoseDetection();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [exerciseName, onFeedback]);

  return (
    <div className="w-full space-y-4">
      <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-900">
        <video
          ref={videoRef}
          className="hidden"
          width="640"
          height="480"
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="w-full h-auto"
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <p className="text-white">Carregando câmera...</p>
          </div>
        )}
      </div>

      {/* Feedback Visual */}
      <div
        className={`rounded-2xl p-4 border-2 flex items-center gap-3 ${
          feedback === 'correct'
            ? 'bg-green-900/20 border-green-500 text-green-400'
            : feedback === 'incorrect'
            ? 'bg-red-900/20 border-red-500 text-red-400'
            : 'bg-yellow-900/20 border-yellow-500 text-yellow-400'
        }`}
      >
        {feedback === 'correct' ? (
          <CheckCircle size={24} />
        ) : feedback === 'incorrect' ? (
          <AlertCircle size={24} />
        ) : (
          <AlertCircle size={24} />
        )}
        <span className="font-bold">{feedbackMessage}</span>
      </div>
    </div>
  );
}

// Desenhar pose no canvas
function drawPose(ctx, landmarks) {
  const connections = [
    [11, 13], [13, 15], // Braço esquerdo
    [12, 14], [14, 16], // Braço direito
    [11, 12], // Ombros
    [11, 23], [12, 24], // Torso
    [23, 25], [25, 27], // Perna esquerda
    [24, 26], [26, 28], // Perna direita
  ];

  // Desenhar conexões
  ctx.strokeStyle = '#00d4ff';
  ctx.lineWidth = 2;
  connections.forEach(([start, end]) => {
    const startLandmark = landmarks[start];
    const endLandmark = landmarks[end];
    if (startLandmark && endLandmark) {
      ctx.beginPath();
      ctx.moveTo(startLandmark.x * ctx.canvas.width, startLandmark.y * ctx.canvas.height);
      ctx.lineTo(endLandmark.x * ctx.canvas.width, endLandmark.y * ctx.canvas.height);
      ctx.stroke();
    }
  });

  // Desenhar pontos
  ctx.fillStyle = '#00d4ff';
  landmarks.forEach((landmark) => {
    ctx.beginPath();
    ctx.arc(
      landmark.x * ctx.canvas.width,
      landmark.y * ctx.canvas.height,
      4,
      0,
      2 * Math.PI
    );
    ctx.fill();
  });
}

// Analisar forma do exercício
function analyzePose(landmarks, exerciseName) {
  // Exemplo simples: verificar se os braços estão levantados (para flexão)
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  const leftElbow = landmarks[13];
  const rightElbow = landmarks[14];
  const leftWrist = landmarks[15];
  const rightWrist = landmarks[16];

  if (!leftShoulder || !rightShoulder || !leftElbow || !rightElbow) {
    return {
      status: 'neutral',
      message: 'Posição não detectada. Tente se posicionar melhor.',
    };
  }

  // Verificar se está em posição de flexão
  const elbowBelowShoulder =
    leftElbow.y > leftShoulder.y && rightElbow.y > rightShoulder.y;
  const wristAboveElbow =
    leftWrist.y < leftElbow.y && rightWrist.y < rightElbow.y;

  if (exerciseName === 'Flexão') {
    if (elbowBelowShoulder && wristAboveElbow) {
      return {
        status: 'correct',
        message: '✓ Forma correta! Continue assim.',
      };
    } else if (!elbowBelowShoulder) {
      return {
        status: 'incorrect',
        message: '✗ Abaixe mais os cotovelos.',
      };
    } else {
      return {
        status: 'incorrect',
        message: '✗ Levante mais os pulsos.',
      };
    }
  }

  return {
    status: 'neutral',
    message: 'Exercício não reconhecido.',
  };
}

export default PoseDetector;
