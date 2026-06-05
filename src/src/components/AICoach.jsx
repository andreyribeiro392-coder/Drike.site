import React, { useState, useRef, useEffect } from 'react';
import { Send, Zap, Brain } from 'lucide-react';

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '🤖 Olá! Sou seu IA Coach Premium! Sou especializado em treinos, nutrição e recuperação. Como posso ajudá-lo a alcançar seus objetivos? 💪',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();

    const responses = {
      flexão: '💪 Flexão é EXCELENTE para peito, tríceps e ombros! Técnica perfeita: Corpo reto, desça até 90°, mantenha o core contraído. Faça 3-4 séries de 8-15 repetições. Progressão: Aumente repetições, depois tente variações (diamante, archer)!',
      agachamento: '🦵 Agachamento é o REI dos exercícios de perna! Técnica: Pés na largura dos ombros, desça até 90°, joelhos atrás da ponta dos pés. 3-4 séries de 10-20 reps. Variações: Agachamento búlgaro, pistol squat, jump squat!',
      água: '💧 HIDRATAÇÃO É TUDO! Beba 3-4 litros por dia normalmente. Durante treinos: 500ml a cada 20 minutos. Após treino: 150% do peso perdido em água. Dica: Beba água com eletrólitos para melhor absorção!',
      nutrição: '🍎 Nutrição é 70% do resultado! Proteína: 1.6-2.2g por kg. Carbos: 3-5g por kg. Gorduras: 0.8-1.2g por kg. Coma: Frango, ovos, peixe, arroz, batata-doce, abacate, nozes. Evite: Ultraprocessados, açúcar refinado!',
      treino: '📅 Rotina perfeita: 4-5 dias de treino com 1-2 dias de descanso. Segunda: Peito/Tríceps. Terça: Costas/Bíceps. Quarta: Pernas. Quinta: Ombros. Sexta: Full Body. Sempre com 48h de descanso entre grupos musculares!',
      dor: '⚠️ DOR É SINAL DE ALERTA! Dor aguda = PARE IMEDIATAMENTE! Dor muscular (DOMS) é normal após treino. Se persistir por mais de 5 dias, consulte um profissional. Nunca treine com dor!',
      recuperação: '😴 Recuperação é quando você CRESCE! Durma 7-9 horas por noite. Técnicas: Alongamento, massagem, sauna, meditação. Coma proteína pós-treino em até 30 minutos. Descanse 48-72h entre grupos musculares!',
      cardio: '🏃 Cardio é essencial! 150 min/semana de intensidade moderada OU 75 min/semana de alta intensidade. Tipos: Corrida, natação, ciclismo, HIIT. Não interfere com ganho de massa se feito corretamente!',
      ganho: '📈 Para ganhar massa: Superávit calórico de 300-500 cal. Treino pesado 4-5x/semana. Proteína alta (2g/kg). Durma bem. Paciência: 0.5-1kg/mês é ganho saudável. Suplementos: Whey, creatina, BCAA (opcional)!',
      perda: '⚡ Para emagrecer: Déficit calórico de 300-500 cal. Treino + cardio. Proteína alta (2-2.5g/kg) para preservar músculo. Beba muita água. Durma bem. Paciência: 0.5-1kg/semana é saudável!',
      default: '🎯 Ótima pergunta! Para resultados extraordinários, combine: Treino consistente, nutrição perfeita, hidratação, sono de qualidade e paciência. Você consegue! 💪',
    };

    for (const [key, value] of Object.entries(responses)) {
      if (lower.includes(key)) {
        return value;
      }
    }

    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: aiResponse, timestamp: new Date() },
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-zinc-950 to-zinc-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-cyan-900 p-6 border-b-2 border-purple-500">
        <div className="flex items-center gap-3">
          <Brain size={32} className="text-cyan-400" />
          <div>
            <h1 className="text-2xl font-black text-white">IA Coach Premium</h1>
            <p className="text-cyan-300 text-sm">Seu assistente de treino 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div
              className={`max-w-xs lg:max-w-md p-4 rounded-2xl shadow-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none'
                  : 'bg-gradient-to-r from-purple-900 to-purple-800 text-zinc-100 rounded-bl-none border border-purple-500'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <p className="text-xs mt-2 opacity-70">
                {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-purple-900 text-zinc-100 p-4 rounded-2xl rounded-bl-none border border-purple-500">
              <div className="flex gap-2">
                <Zap size={16} className="text-cyan-400 animate-pulse" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t-2 border-purple-500 bg-zinc-900">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Pergunte sobre exercícios, nutrição, treino..."
            className="flex-1 bg-zinc-800 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 border-2 border-zinc-700 transition"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 p-3 rounded-xl transition transform hover:scale-105 active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
