import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxw};
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 480px) {
    padding: 0 18px;
  }
`;

export const Section = styled.section`
  position: relative;
  padding: clamp(32px, 5vw, 64px) 0;
`;

export const SectionHead = styled.div`
  max-width: 640px;
  margin-bottom: clamp(26px, 3.5vw, 40px);
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.font.body};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent2};
  margin-bottom: 18px;

  &::before {
    content: '';
    width: 26px;
    height: 1.5px;
    background: ${({ theme }) => theme.colors.accentGrad};
  }

  & svg {
    width: 14px;
    height: 14px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.9rem, 4.2vw, 3rem);
`;

export const SectionSub = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.05rem;
`;

export const GradientText = styled.span`
  background: ${({ theme }) => theme.colors.accentGrad};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

type ButtonVariant = 'primary' | 'ghost';

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.font.body};
  font-weight: 600;
  font-size: 0.95rem;
  padding: 13px 22px;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease,
    border-color 0.25s ease;
  min-height: 46px;

  & svg {
    width: 18px;
    height: 18px;
  }
`;

export const Button = styled.a<{ $variant?: ButtonVariant }>`
  ${buttonBase}
  ${({ $variant = 'primary', theme }) =>
    $variant === 'primary'
      ? css`
          background: ${theme.colors.accentGrad};
          color: ${theme.colors.onAccent};
          box-shadow: 0 14px 30px -12px rgba(34, 211, 238, 0.5);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 40px -12px rgba(34, 211, 238, 0.65);
          }
        `
      : css`
          background: ${theme.colors.surface};
          border-color: ${theme.colors.borderStrong};
          color: ${theme.colors.text};
          backdrop-filter: ${theme.blur};

          &:hover {
            transform: translateY(-2px);
            border-color: ${theme.colors.accent};
            background: ${theme.colors.surface2};
          }
        `}
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

export const SkipLink = styled.a`
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 1100;
  padding: 11px 18px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.accentGrad};
  color: ${({ theme }) => theme.colors.onAccent};
  font-weight: 600;
  font-size: 0.9rem;
  transform: translateY(-160%);
  transition: transform 0.2s ease;

  &:focus-visible {
    transform: translateY(0);
  }
`;
