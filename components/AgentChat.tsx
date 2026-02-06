import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types';
import { sendMessageStreamToAgent } from '../services/geminiService';
import { useTranslation } from '../i18n';

interface AgentChatProps {
  initialPrompt: string;
  onReset: () => void;
}

const AgentChat: React.FC<AgentChatProps> = ({ initialPrompt, onReset }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: t('agent_initial_greeting') }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialPromptSent = useRef(false);
  
  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const assistantMessage: ChatMessage = { role: 'assistant', content: '', sources: [] };
    setMessages(prev => [...prev, assistantMessage]);

    let accumulatedText = '';
    
    try {
      await sendMessageStreamToAgent(
        [...messages, userMessage],
        (chunk) => {
          accumulatedText += chunk;
          setMessages(prev => {
            const newMessages = [...prev];
            const last = newMessages[newMessages.length - 1];
            if (last && last.role === 'assistant') { last.content = accumulatedText; }
            return newMessages;
          });
        },
        (sources) => {
          setMessages(prev => {
            const newMessages = [...prev];
            const last = newMessages[newMessages.length - 1];
            if (last && last.role === 'assistant') { last.sources = sources; }
            return newMessages;
          });
        }
      );
    } catch (err) {
      setMessages(prev => {
        const newMessages = [...prev];
        const last = newMessages[newMessages.length - 1];
        if (last && last.role === 'assistant') { last.content = t('agent_error'); }
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (initialPrompt && !initialPromptSent.current) {
      handleSend(initialPrompt);
      initialPromptSent.current = true;
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="flex flex-col h-[700px] max-w-4xl mx-auto glass rounded-3xl overflow-hidden shadow-2xl dark:border-white/5 bg-gray-100/40 dark:bg-gray-950/40">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-white/5 flex items-center justify-between bg-cyan-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-white neon-glow">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100">{t('agent_title')}</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-500 dark:text-gray-500 uppercase tracking-widest font-bold">{t('agent_status')}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-gray-500/10 hover:bg-gray-500/20 text-gray-600 dark:text-gray-300 transition-colors"
        >
          <RotateCcw size={12} />
          {t('agent_new_chat')}
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg text-white ${msg.role === 'user' ? 'bg-gray-700' : 'bg-cyan-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="space-y-2">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-cyan-600/90 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-white/5 shadow-inner'}`}>
                  {msg.content || (loading && i === messages.length - 1 ? <div className="flex gap-1 py-1"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" /><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" /></div> : '')}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <SourceAccordion sources={msg.sources} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-6 bg-white/60 dark:bg-black/40 border-t border-gray-200 dark:border-white/5">
        <div className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('agent_follow_up_placeholder')}
            disabled={loading}
            className="w-full bg-white dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-2xl px-6 py-4 pe-16 ps-6 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-600 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute end-2 top-2 bottom-2 w-12 rounded-xl bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-400 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};

const SourceAccordion: React.FC<{ sources: string[] }> = ({ sources }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="border border-gray-200 dark:border-white/5 rounded-xl bg-white/50 dark:bg-black/40 overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Sparkles size={12} className="text-cyan-400" />
          {t('agent_sources_title')} ({sources.length})
        </span>
        {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-3 pb-3 space-y-1"
          >
            {sources.map(s => (
              <div key={s} className="text-[10px] text-gray-600 dark:text-gray-400 flex items-center gap-2 bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                <div className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_4px_rgba(34,211,238,0.8)]" />
                {s}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentChat;
