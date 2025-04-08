'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type LanguageTheme = 'english' | 'korean' | 'swiss';
export type BackgroundTheme = 'christmas' | 'NewYear' | 'basic' | 'dark' | 'white';

interface ThemeContextType {
  language: LanguageTheme;
  background: BackgroundTheme;
  toggleLanguage: () => void;
  toggleBackground: () => void;
  setLanguage: (lang: LanguageTheme) => void;
  setBackground: (bg: BackgroundTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageTheme>('english');
  const [background, setBackgroundState] = useState<BackgroundTheme>('dark');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('theme-language') as LanguageTheme | null;
    const savedBackground = localStorage.getItem('theme-background') as BackgroundTheme | null;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
    if (savedBackground) {
      setBackgroundState(savedBackground);
    }
    updateDocumentClass(savedLanguage || language, savedBackground || background);
  }, []);

  const updateDocumentClass = (lang: LanguageTheme, bg: BackgroundTheme) => {
    const docEl = document.documentElement;
    // 언어 클래스: lang-english, lang-korean, lang-swiss
    docEl.classList.remove('lang-english', 'lang-korean', 'lang-swiss');
    docEl.classList.add(`lang-${lang}`);

    // 배경 클래스: bg-christmas, bg-NewYear, bg-basic, bg-dark, bg-white
    docEl.classList.remove('bg-christmas', 'bg-NewYear', 'bg-basic', 'bg-dark', 'bg-white');
    docEl.classList.add(`bg-${bg}`);
  };

  const setLanguage = (newLanguage: LanguageTheme) => {
    setLanguageState(newLanguage);
    localStorage.setItem('theme-language', newLanguage);
    updateDocumentClass(newLanguage, background);
  };

  const setBackground = (newBackground: BackgroundTheme) => {
    setBackgroundState(newBackground);
    localStorage.setItem('theme-background', newBackground);
    updateDocumentClass(language, newBackground);
  };

  const toggleLanguage = () => {
    // Cycle: english -> korean -> swiss -> english
    const nextLanguage: LanguageTheme =
      language === 'english' ? 'korean' : language === 'korean' ? 'swiss' : 'english';
    setLanguage(nextLanguage);
  };

  const toggleBackground = () => {
    // Cycle: christmas -> NewYear -> basic -> dark -> white -> christmas
    const nextBackground: BackgroundTheme =
      background === 'christmas'
        ? 'NewYear'
        : background === 'NewYear'
        ? 'basic'
        : background === 'basic'
        ? 'dark'
        : background === 'dark'
        ? 'white'
        : 'christmas';
    setBackground(nextBackground);
  };

  return (
    <ThemeContext.Provider
      value={{ language, background, toggleLanguage, toggleBackground, setLanguage, setBackground }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};