import { colors } from '@Core/colors';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = {
  mode: 'light' | 'dark';
  tokens: { [color: string]: string };

  // Backgrounds
  background: string;
  backgroundAlt: string;
  backgroundElevated: string;

  // Text
  text: string;
  textSecondary: string;
  textOnPrimary: string;

  // Borders
  border: string;
  borderStrong: string;

  // Accents
  primary: string;
  secondary: string;
  accent: string;

  // Status
  success: string;
  warning: string;
  error: string;

  // Other
  disabled: string;
  divider: string;
};

export const lightTokens = { ...colors };
export const darkTokens = { ...colors };

export const lightTheme: Theme = {
  mode: 'light',
  tokens: lightTokens,
  background: colors.gray010,
  backgroundAlt: colors.white,
  backgroundElevated: colors.gray030,
  text: colors.gray100,
  textSecondary: colors.gray070,
  textOnPrimary: colors.white,
  border: colors.gray040,
  borderStrong: colors.gray070,
  primary: colors.blue030,
  secondary: colors.gray030,
  accent: colors.purple060,
  success: colors.green060,
  warning: colors.amber060,
  error: colors.red060,
  disabled: colors.gray050,
  divider: colors.gray030,
};

export const darkTheme: Theme = {
  mode: 'dark',
  tokens: darkTokens,
  background: colors.gray100,
  backgroundAlt: colors.gray090,
  backgroundElevated: colors.gray080,
  text: colors.gray010,
  textSecondary: colors.gray050,
  textOnPrimary: colors.gray100,
  border: colors.gray080,
  borderStrong: colors.gray050,
  primary: colors.blue060,
  secondary: colors.gray080,
  accent: colors.purple030,
  success: colors.green030,
  warning: colors.amber030,
  error: colors.red030,
  disabled: colors.gray070,
  divider: colors.gray090,
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
