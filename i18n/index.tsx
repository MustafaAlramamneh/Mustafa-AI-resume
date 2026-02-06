import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import localesData from './locales.json';

type Language = 'en' | 'de' | 'ar' | 'tr';
type Translations = Record<string, Record<Language, string>>;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedLang = window.localStorage.getItem('language');
        if (storedLang && ['en', 'de', 'ar', 'tr'].includes(storedLang)) {
            return storedLang as Language;
        }
    }
    return 'en'; // Default language
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [translations] = useState<Translations>(localesData);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string, options?: Record<string, string | number>): string => {
    let text = translations[key]?.[language] || key;
    if (options) {
        Object.keys(options).forEach(optKey => {
            text = text.replace(`{{${optKey}}}`, String(options[optKey]));
        });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};