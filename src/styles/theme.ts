export type ThemeMode = 'dark' | 'light';

const base = {
  radius: { sm: '12px', md: '18px', lg: '26px' },
  blur: 'blur(18px)',
  font: {
    display: "'Space Grotesk', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  layout: { maxw: '1180px', navH: '76px' },
};

export const darkTheme = {
  ...base,
  mode: 'dark' as ThemeMode,
  colors: {
    bg: '#08080b',
    bgSoft: '#0d0d12',
    surface: 'rgba(255, 255, 255, 0.035)',
    surface2: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.09)',
    borderStrong: 'rgba(255, 255, 255, 0.16)',
    navBg: 'rgba(8, 8, 11, 0.72)',
    overlayBg: 'rgba(8, 8, 11, 0.95)',
    cardSolid: 'rgba(13, 13, 18, 0.85)',
    gridLine: 'rgba(255, 255, 255, 0.04)',
    text: '#f4f4f5',
    textMuted: '#a8a8b3',
    textFaint: '#82828e',
    accent: '#3b82f6',
    accent2: '#22d3ee',
    accentSoft: 'rgba(59, 130, 246, 0.14)',
    accentGrad: 'linear-gradient(120deg, #3b82f6 0%, #22d3ee 100%)',
    onAccent: '#05070d',
    shadow: '0 24px 60px -28px rgba(0, 0, 0, 0.75)',
    shadowGlow:
      '0 0 0 1px rgba(255, 255, 255, 0.09), 0 30px 80px -40px rgba(59, 130, 246, 0.45)',
    cardShadow: 'none',
  },
};

export const lightTheme: typeof darkTheme = {
  ...base,
  mode: 'light',
  colors: {
    bg: '#eceef2',
    bgSoft: '#ffffff',
    surface: '#ffffff',
    surface2: '#f3f5f9',
    border: 'rgba(15, 23, 42, 0.1)',
    borderStrong: 'rgba(15, 23, 42, 0.2)',
    navBg: 'rgba(255, 255, 255, 0.78)',
    overlayBg: 'rgba(255, 255, 255, 0.96)',
    cardSolid: 'rgba(255, 255, 255, 0.92)',
    gridLine: 'rgba(15, 23, 42, 0.05)',
    text: '#0b1220',
    textMuted: '#475569',
    textFaint: '#64748b',
    accent: '#2563eb',
    accent2: '#0e7490',
    accentSoft: 'rgba(37, 99, 235, 0.1)',
    accentGrad: 'linear-gradient(120deg, #2563eb 0%, #0891b2 100%)',
    onAccent: '#ffffff',
    shadow: '0 18px 44px -26px rgba(15, 23, 42, 0.28)',
    shadowGlow:
      '0 0 0 1px rgba(15, 23, 42, 0.1), 0 24px 60px -38px rgba(37, 99, 235, 0.35)',
    cardShadow:
      '0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 28px -18px rgba(15, 23, 42, 0.14)',
  },
};

export type Theme = typeof darkTheme;
