import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../theme/themes';

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeModeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('nexus_theme') || 'dark';
    setThemeMode(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    localStorage.setItem('nexus_theme', newTheme);
  };

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
