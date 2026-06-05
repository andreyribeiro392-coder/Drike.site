import React, { useState } from "react";
import { Send } from "lucide-react";

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Olá! Sou seu IA Coach. Como posso ajudá-lo com seus treinos hoje? 💪",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getAIResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();

    const responses = {
      flexão: "Flexão é ótimo para peito e tríceps! Faça 3 séries de 10-15 repetições com boa forma. Mantenha o corpo reto e desça até quase tocar o chão.",
      agachamento: "Agachamento trabalha pernas e glúteos. Mantenha os pés na largura dos ombros e desça até 90 graus. Não deixe os joelhos ultrapassarem muito a ponta dos pés.",
      água: "Beba 2-3 litros de água por dia. Mais se estiver treinando! Hidratação é essencial para o desempenho.",
      nutrição: "Coma proteína em cada refeição. Frango, ovos, peixe e legumes são ótimas opções. Mantenha um déficit calórico se quer emagrecer.",
      treino: "Treine 3-4 vezes por semana com descanso entre os dias. Varie os exercícios para trabalhar diferentes grupos musculares.",
      dor: "Se sentir dor durante o exercício, pare imediatamente! Dor é sinal de que algo está errado. Consulte um profissional se persistir.",
      recuperação: "Durma 7-8 horas por noite. A recuperação é quando os músculos crescem! Também descanse entre séries.",
      cardio: "Cardio é importante para saúde cardiovascular. Faça 150 minutos por semana de atividade moderada ou 75 minutos de intensa.",
      default: "Ótima pergunta! Para mais detalhes específicos, consulte um profissional de fitness certificado.",
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

    // Adicionar mensagem do usuário
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simular delay da IA
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-zinc-950">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${
                msg.role === "user"
                  ? "bg-cyan-500 text-white rounded-br-none"
                  : "bg-zinc-800 text-zinc-100 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 text-zinc-100 p-4 rounded-2xl rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-zinc-800">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Faça uma pergunta sobre exercícios, nutrição ou treino..."
            className="flex-1 bg-zinc-900 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-zinc-800"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-700 p-3 rounded-xl transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
