import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n';

interface AgentIntroProps {
  onStartChat: (prompt: string) => void;
}

const AgentIntro: React.FC<AgentIntroProps> = ({ onStartChat }) => {
  const [input, setInput] = useState('');
  const { t } = useTranslation();

  const quickChips = [
    t('agent_chip_1'),
    t('agent_chip_2'),
    t('agent_chip_3'),
    t('agent_chip_4'),
  ];

  const handleSend = () => {
    if (input.trim()) {
      onStartChat(input);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleFormSubmit} className="relative glass p-4 rounded-3xl shadow-2xl shadow-cyan-500/5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('agent_intro_placeholder')}
          className="w-full bg-transparent text-lg md:text-2xl px-8 py-6 pe-20 ps-8 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="absolute end-4 top-4 bottom-4 w-16 rounded-2xl bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-400 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
          aria-label="Send message"
        >
          <Send size={24} />
        </button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-600 font-bold uppercase tracking-widest mb-4">{t('agent_intro_suggestion')}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {quickChips.map(chip => (
            <button
              key={chip}
              onClick={() => onStartChat(chip)}
              className="group flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full bg-gray-500/10 dark:bg-white/5 border border-gray-500/10 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 transition-all"
            >
              {chip}
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentIntro;
