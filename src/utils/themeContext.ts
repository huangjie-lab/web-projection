import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';
export type ThemeType = {
  theme: Theme;
  setTheme?: (theme: Theme) => void;
};

const defaultThemeContext: ThemeType = {
  theme: 'light'
};
export const ThemeContext = createContext<ThemeType>(defaultThemeContext);

// export const ThemeConsumer = useContext(ThemeContext); // hook errors

export const useThemeConsumer = () => useContext(ThemeContext);
