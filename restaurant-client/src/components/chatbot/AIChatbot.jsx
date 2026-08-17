import { useState } from 'react';
import {
  Bot,
  MessageCircle,
  Send,
  X,
  Sparkles,
  User,
  Loader2,
  ChevronRight,
} from 'lucide-react';

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi there! 👋 I'm your Foodie Assistant. I can help you discover delicious dishes, explore our menu, and answer questions about your order.",
    },
  ]);

  const suggestions = [
    {
      title: 'Chef recommendations',
      text: 'What do you recommend?',
      icon: '✨',
    },
    {
      title: 'Popular choices',
      text: 'Show me popular food',
      icon: '🔥',
    },
    {
      title: 'Vegetarian',
      text: 'What vegetarian options do you have?',
      icon: '🥗',
    },
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
      {/* =====================================================
          FLOATING AI BUTTON
      ====================================================== */}
      {!open && (
        <div className="fixed bottom-5 right-5 z-[100] sm:bottom-6 sm:right-6">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-xl" />

          <button
            onClick={() => setOpen(true)}
            aria-label="Open AI assistant"
            className="
              group
              relative
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-gradient-to-br
              from-orange-500
              via-orange-500
              to-amber-500
              text-white
              shadow-[0_12px_35px_rgba(234,88,12,0.35)]
              transition-all
              duration-300
              hover:scale-110
              hover:shadow-[0_18px_45px_rgba(234,88,12,0.45)]
              active:scale-95
              sm:h-16
              sm:w-16
            "
          >
            <MessageCircle
              size={25}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:rotate-6"
            />

            {/* Online indicator */}
            <span className="absolute right-0.5 top-0.5 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
            </span>
          </button>
        </div>
      )}

      {/* =====================================================
          CHAT WINDOW
      ====================================================== */}
      {open && (
        <div
          className="
            fixed
            inset-x-3
            bottom-3
            z-[100]
            flex
            h-[min(720px,calc(100dvh-24px))]
            flex-col
            overflow-hidden
            rounded-[28px]
            border
            border-white/70
            bg-white
            shadow-[0_25px_80px_rgba(15,23,42,0.20)]
            sm:inset-auto
            sm:bottom-6
            sm:right-6
            sm:h-[min(700px,calc(100dvh-48px))]
            sm:w-[420px]
            sm:rounded-[30px]
          "
        >
          {/* =================================================
              HEADER
          ================================================== */}
          <div
            className="
              relative
              shrink-0
              overflow-hidden
              bg-gradient-to-br
              from-[#ea580c]
              via-[#f97316]
              to-[#f59e0b]
              px-5
              pb-5
              pt-5
              text-white
              sm:px-6
              sm:pb-6
            "
          >
            {/* Decorative shapes */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-white/[0.08]" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-white/[0.08]" />
            <div className="pointer-events-none absolute right-20 top-8 h-2 w-2 rounded-full bg-white/30" />
            <div className="pointer-events-none absolute right-28 top-14 h-1.5 w-1.5 rounded-full bg-white/30" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                {/* AI avatar */}
                <div
                  className="
                    relative
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-[17px]
                    border
                    border-white/20
                    bg-white/15
                    shadow-inner
                    backdrop-blur-md
                    sm:h-13
                    sm:w-13
                  "
                >
                  <Bot size={24} strokeWidth={1.8} />

                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-orange-500 bg-emerald-400" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[15px] font-bold tracking-tight sm:text-base">
                      Foodie Assistant
                    </h3>

                    <Sparkles
                      size={14}
                      className="text-yellow-100"
                      fill="currentColor"
                    />
                  </div>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-orange-50/90">
                      Online & ready to help
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close AI assistant"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/10
                  text-white
                  transition-all
                  hover:bg-white/20
                  active:scale-90
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* Small status line */}
            <div className="relative mt-5 flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <Sparkles size={12} />
                <span className="text-[10px] font-medium tracking-wide text-white/90">
                  YOUR PERSONAL FOOD GUIDE
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              MESSAGES
          ================================================== */}
          <div
            className="
              min-h-0
              flex-1
              space-y-5
              overflow-y-auto
              bg-[#fffaf7]
              px-4
              py-5
              scrollbar-thin
              sm:px-5
            "
          >
            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-[90%] gap-2.5 sm:max-w-[85%] ${
                    item.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-[11px]
                      ${
                        item.type === 'user'
                          ? 'bg-gray-900 text-white shadow-sm'
                          : 'border border-orange-100 bg-orange-50 text-orange-600'
                      }
                    `}
                  >
                    {item.type === 'user' ? (
                      <User size={14} strokeWidth={2} />
                    ) : (
                      <Bot size={15} strokeWidth={2} />
                    )}
                  </div>

                  {/* Message */}
                  <div
                    className={`
                      px-4
                      py-3
                      text-[13px]
                      leading-6
                      shadow-sm
                      sm:text-sm
                      ${
                        item.type === 'user'
                          ? `
                            rounded-[20px]
                            rounded-tr-md
                            bg-gray-900
                            text-white
                            shadow-[0_5px_18px_rgba(15,23,42,0.12)]
                          `
                          : `
                            rounded-[20px]
                            rounded-tl-md
                            border
                            border-orange-100/80
                            bg-white
                            text-gray-700
                          `
                      }
                    `}
                  >
                    {item.text}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-[11px] border border-orange-100 bg-orange-50 text-orange-600">
                  <Bot size={15} />
                </div>

                <div className="flex items-center gap-1 rounded-[20px] rounded-tl-md border border-orange-100 bg-white px-4 py-3 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400" />
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              SUGGESTIONS
          ================================================== */}
          {messages.length === 1 && (
            <div className="shrink-0 border-t border-orange-100/70 bg-white px-4 py-3 sm:px-5">
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400">
                  QUICK DISCOVER
                </p>

                <Sparkles
                  size={13}
                  className="text-orange-400"
                  fill="currentColor"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.text}
                    onClick={() => sendMessage(suggestion.text)}
                    className="
                      group
                      flex
                      min-w-max
                      items-center
                      gap-2
                      rounded-2xl
                      border
                      border-orange-100
                      bg-[#fffaf7]
                      px-3
                      py-2.5
                      text-left
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-orange-200
                      hover:bg-orange-50
                      active:scale-[0.98]
                    "
                  >
                    <span className="text-base">{suggestion.icon}</span>

                    <div>
                      <p className="text-[11px] font-semibold text-gray-800">
                        {suggestion.title}
                      </p>
                      <p className="text-[9px] text-gray-400">Ask assistant</p>
                    </div>

                    <ChevronRight
                      size={13}
                      className="text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-orange-400"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* =================================================
              INPUT
          ================================================== */}
          <div className="shrink-0 border-t border-gray-100 bg-white p-3 sm:p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="
                flex
                items-center
                gap-2
                rounded-[19px]
                border
                border-gray-200
                bg-gray-50
                p-1.5
                transition-all
                duration-200
                focus-within:border-orange-300
                focus-within:bg-white
                focus-within:shadow-[0_0_0_4px_rgba(249,115,22,0.07)]
              "
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about our menu..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-3
                  py-2.5
                  text-[13px]
                  text-gray-800
                  outline-none
                  placeholder:text-gray-400
                  sm:text-sm
                "
                disabled={loading}
              />

              <button
                type="submit"
                disabled={!message.trim() || loading}
                aria-label="Send message"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-[13px]
                  bg-gradient-to-br
                  from-orange-500
                  to-amber-500
                  text-white
                  shadow-[0_5px_15px_rgba(249,115,22,0.25)]
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:shadow-[0_7px_20px_rgba(249,115,22,0.35)]
                  active:scale-95
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  disabled:shadow-none
                "
              >
                {loading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Send size={16} strokeWidth={2.2} />
                )}
              </button>
            </form>

            <div className="mt-2 flex items-center justify-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              <p className="text-[9px] font-medium text-gray-400">
                AI-powered restaurant assistant
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
