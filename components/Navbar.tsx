import React, { useState, useEffect } from 'react';
import { Menu, X, Bot } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../i18n';

const Navbar: React.FC<{ activeTab: string; setActiveTab: (t: string) => void }> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'home', label: t('nav_home') },
    { id: 'projects', label: t('nav_projects') },
    { id: 'resume', label: t('nav_resume') },
    { id: 'about', label: t('nav_about') },
    { id: 'contact', label: t('nav_contact') }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 glass' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-bold font-heading cursor-pointer flex items-center gap-2 group" 
          onClick={() => setActiveTab('home')}
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white neon-glow group-hover:scale-110 transition-transform p-1">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18V6L12 14L20 6V18H18V9L12 15L6 9V18H4Z"/>
            </svg>
          </div>
          <span className="hidden sm:inline dark:text-white text-gray-900">Mustafa.A</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`text-sm font-medium transition-colors hover:text-cyan-400 ${activeTab === link.id ? 'text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('agent')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm hover:bg-cyan-500 hover:text-white transition-all"
            >
              <Bot size={16} />
              {t('nav_recruiter_ai')}
            </button>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-600 dark:text-gray-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => { setActiveTab(link.id); setIsOpen(false); }}
              className={`text-left text-lg font-medium ${activeTab === link.id ? 'text-cyan-400' : 'text-gray-600 dark:text-gray-400'}`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => { setActiveTab('agent'); setIsOpen(false); }}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-500 text-white font-bold"
          >
            <Bot size={20} />
            {t('nav_ask_agent')}
          </button>
          <div className="pt-2 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
             <ThemeToggle />
             <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;