import styled from 'styled-components';
import { Sun, Moon } from './icons';
import { useThemeMode } from '../context/ThemeModeContext';

const Button = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  backdrop-filter: ${({ theme }) => theme.blur};
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.surface2};
  }

  & svg {
    width: 20px;
    height: 20px;
  }
`;

export default function ThemeToggle() {
  const { mode, toggle } = useThemeMode();
  const next = mode === 'dark' ? 'light' : 'dark';

  return (
    <Button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {mode === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
