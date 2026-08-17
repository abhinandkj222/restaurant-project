import { useState } from 'react';
import {
  Bot,
  MessageCircle,
  Send,
  X,
  Sparkles,
  User,
  Loader2,
} from 'lucide-react';

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! 👋 I'm your Foodie Assistant. I can help you find food, understand our menu, and answer questions about your order.",
    },
  ]);

  const suggestions = [
    'What do you recommend?',
    'Show me popular food',
    'What vegetarian options do you have?',
  ];

  const sendMessage = async (text = message) => {
    const trimmedMessage = text.trim();

    if (!trimmedMessage || loading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: 'Sorry, I could not connect right now. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-orange-600"
          aria-label="Open AI assistant"
        >
          <MessageCircle size={27} />

          <span className="absolute right-0 top-0 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
          </span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[min(650px,calc(100vh-40px))] w-[min(400px,calc(100vw-40px))] flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 px-5 py-5 text-white">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/10" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                  <Bot size={24} />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold">Foodie Assistant</h3>
                    <Sparkles size={15} />
                  </div>

                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-orange-100">
                    <span className="h-2 w-2 rounded-full bg-green-300" />
                    AI assistant
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 transition hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-[#fffaf6] p-4">
            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-[85%] gap-2 ${
                    item.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                      item.type === 'user'
                        ? 'bg-gray-900 text-white'
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    {item.type === 'user' ? (
                      <User size={15} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>

                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                      item.type === 'user'
                        ? 'rounded-tr-md bg-gray-900 text-white'
                        : 'rounded-tl-md border border-orange-100 bg-white text-gray-700 shadow-sm'
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Bot size={16} />
                </div>

                <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm">
                  <Loader2 size={18} className="animate-spin text-orange-500" />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="border-t border-orange-100 bg-white px-4 py-3">
              <p className="mb-2 text-xs font-semibold text-gray-400">
                TRY ASKING
              </p>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    className="whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700 transition hover:bg-orange-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-100 bg-white p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-1.5 focus-within:border-orange-300"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about our food..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-400"
                disabled={loading}
              />

              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={17} />
              </button>
            </form>

            <p className="mt-2 text-center text-[10px] text-gray-400">
              AI assistant • Ask about our restaurant
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
