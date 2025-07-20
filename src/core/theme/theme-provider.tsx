import { colors } from '@Core/colors';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = {
  mode: 'light' | 'dark';
  tokens: { [color: string]: string };
  background: string;
  text: string;
  primary: string;
  secondary: string;
};

export const lightTokens = { ...colors };
export const darkTokens = { ...colors };

export const lightTheme: Theme = {
  mode: 'light',
  tokens: lightTokens,
  background: colors.gray010,
  text: colors.gray100,
  primary: colors.white,
  secondary: colors.gray030,
  // ...add more semantic roles as needed
};

export const darkTheme: Theme = {
  mode: 'dark',
  tokens: darkTokens,
  background: colors.gray100,
  text: colors.gray010,
  primary: colors.black,
  secondary: colors.gray080,
  // ...add more semantic roles as needed
};

const ThemeContext = createContext({
  theme: lightTheme,
  setMode: (mode: 'light' | 'dark') => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) =>
      setMode(e.matches ? 'dark' : 'light');
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
