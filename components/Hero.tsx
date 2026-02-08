import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, MousePointer2 } from 'lucide-react';
import { ProfileData } from '../types';
import { useTranslation } from '../i18n';

const Hero: React.FC<{ profile: ProfileData; onAgentClick: () => void; onProjectsClick: () => void }> = ({ profile, onAgentClick, onProjectsClick }) => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400 text-sm font-semibold mb-6">
              {t('hero_availability')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold font-heading mb-8 tracking-tight leading-none"
          >
            Mustafa <span className="text-cyan-500 dark:text-cyan-400">Alramamneh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {profile.title} — {t('hero_location', { location: profile.location })}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onAgentClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              <Bot size={20} />
              {t('hero_button_agent')}
            </button>
            <button
              onClick={onProjectsClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gray-200/50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-800 dark:text-white font-bold flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              {t('hero_button_projects')}
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* Proof of Work Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-gray-200 dark:border-white/5 pt-12"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold font-heading text-cyan-500 dark:text-cyan-400 mb-2">{profile.stats.yearsExperience}+</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest font-semibold">{t('hero_stat_experience')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white mb-2">{profile.stats.projectsCompleted}</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest font-semibold">{t('hero_stat_projects')}</div>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <div className="text-4xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white mb-2">{profile.stats.certificatesCount}</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest font-semibold">{t('hero_stat_certs')}</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-500 animate-bounce">
        <MousePointer2 size={24} />
      </div>
    </section>
  );
};

export default Hero;
