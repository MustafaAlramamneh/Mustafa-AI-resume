import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'de', name: 'German', flag: 'https://flagcdn.com/w40/de.png' },
  { code: 'ar', name: 'Arabic', flag: 'https://flagcdn.com/w40/sa.png' },
  { code: 'tr', name: 'Turkish', flag: 'https://flagcdn.com/w40/tr.png' },
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      >
        <Globe size={16} />
        <img src={selectedLanguage.flag} alt={selectedLanguage.name} className="w-5 h-3.5 object-cover rounded-[2px]" />
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full end-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 z-50">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as any);
                setIsOpen(false);
              }}
              className={`w-full text-start flex items-center gap-3 px-4 py-2 text-sm ${language === lang.code
                  ? 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm" />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
