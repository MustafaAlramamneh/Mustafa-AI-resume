import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AgentIntro from './AgentIntro';
import AgentChat from './AgentChat';
import { useTranslation } from '../i18n';

const AgentView: React.FC = () => {
  const [chatStarted, setChatStarted] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState('');
  const { t } = useTranslation();

  const handleStartChat = (prompt: string) => {
    setInitialPrompt(prompt);
    setChatStarted(true);
  };

  const handleResetChat = () => {
    setInitialPrompt('');
    setChatStarted(false);
  };

  return (
    <div className="pt-32">
       <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 inline-block">
            {t('agent_beta_tag')}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6 tracking-tight">{t('agent_view_title_1')} <span className="text-cyan-400">{t('agent_view_title_2')}</span></h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('agent_view_description')}
          </p>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {!chatStarted ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AgentIntro onStartChat={handleStartChat} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <AgentChat initialPrompt={initialPrompt} onReset={handleResetChat} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentView;
