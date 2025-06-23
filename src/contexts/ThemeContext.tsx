
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    primary: isDarkMode ? 'bg-blue-600' : 'bg-blue-700',
    accent: isDarkMode ? 'bg-blue-500' : 'bg-blue-600',
    background: isDarkMode ? 'bg-black' : 'bg-gray-50',
    surface: isDarkMode ? 'bg-gray-900' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-800' : 'border-gray-200',
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
