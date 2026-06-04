import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

export function AICoach() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Olá! Sou seu AI Coach. Posso ajudar com dúvidas sobre exercícios, nutrição, treino e muito mais. Como posso te ajudar?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Chamar API de IA (você precisa de uma chave de API)
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          context: 'fitness',
        }),
      });

      if (!response.ok) throw new Error('Erro ao conectar com IA');

      const data = await response.json();

      // Adicionar resposta da IA
      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: data.message || 'Desculpe, não consegui processar sua pergunta.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro:', error);
      
      // Resposta padrão se a API não estiver disponível
      const fallbackMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: getDefaultResponse(input),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-3xl font-black">🤖 IA Coach</h1>
        <p className="text-zinc-400 text-sm">Seu assistente de fitness pessoal</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-md p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 text-zinc-200 border border-zinc-800 p-4 rounded-2xl">
              <Loader2 className="animate-spin" size={20} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-zinc-800">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faça uma pergunta..."
            className="flex-1 bg-zinc-900 px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-zinc-800"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 px-6 py-3 rounded-xl font-bold transition flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Respostas padrão enquanto a API não está configurada
function getDefaultResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  const responses = {
    flexão: 'Flexão é um ótimo exercício para peito, tríceps e ombros. Mantenha o corpo reto, desça até quase tocar o chão e suba. Faça 3 séries de 10-15 repetições.',
    agachamento: 'Agachamento trabalha pernas e glúteos. Mantenha os pés na largura dos ombros, desça dobrando os joelhos e suba. Faça 3 séries de 15-20 repetições.',
    nutrição: 'Para ganhar massa, coma proteína em cada refeição (frango, ovos, peixe). Para perder peso, crie um déficit calórico comendo menos calorias do que gasta.',
    água: 'Beba pelo menos 2-3 litros de água por dia. Mais se estiver treinando intensamente.',
    descanso: 'Durma 7-9 horas por noite. O descanso é essencial para recuperação muscular.',
    default: 'Ótima pergunta! Para mais detalhes, consulte um profissional de fitness ou nutricionista. Estou aqui para ajudar com dicas gerais!',
  };

  for (const [key, value] of Object.entries(responses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      return value;
    }
  }

  return responses.default;
}

export default AICoach;
