import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '../Theme';

const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always default to light mode
  const [mode, setMode] = useState('light');

  // Save mode (even though it will always be light)
  useEffect(() => {
    localStorage.setItem('themeMode', 'light');
  }, []);

  // Toggle does nothing except ensure light mode remains
  const toggleTheme = () => {
    setMode('light');
    localStorage.setItem('themeMode', 'light');
  };

  // Generate MUI theme
  const theme = useMemo(() => getTheme('light'), []);

  const value = {
    mode: 'light',
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
