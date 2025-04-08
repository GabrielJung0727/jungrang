// utils/themeUtils.ts

export const getSavedTheme = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('theme') as 'light' | 'dark' | 'forest' | 'midnight' | null;
  };
  
  export const saveTheme = (theme: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
  };