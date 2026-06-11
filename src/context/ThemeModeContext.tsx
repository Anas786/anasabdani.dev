import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, type ThemeMode } from '../styles/theme';

interface ThemeModeContextValue {
  mode: ThemeMode;
  toggle: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  // Two-pass theming: the server (and the first client render, so hydration
  // matches) always renders dark; the stored preference applies in an effect.
  // The flip happens behind the Loader overlay, so light users see no flash.
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light') setMode('light');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    try {
      localStorage.setItem('theme', mode);
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', mode === 'light' ? '#eceef2' : '#09090b');
    }
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((m) => (m === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ mode, toggle }), [mode, toggle]);
  const styledTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={styledTheme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used inside ThemeModeProvider');
  return ctx;
}
