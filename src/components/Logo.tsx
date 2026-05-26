import { motion, type Variants } from 'motion/react';
import styled, { css, keyframes } from 'styled-components';

interface LogoProps {
  /** Base font-size in pixels. */
  size?: number;
  animated?: boolean;
  /** Loader-style: shimmer + pulsing dot rings. */
  intense?: boolean;
  className?: string;
}

const wrapVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: '0.45em' },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.5, 0.27, 1] },
  },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.7, type: 'spring', stiffness: 320, damping: 14 },
  },
};

const shimmer = keyframes`
  to { background-position: 220% center; }
`;

const ringPulse = keyframes`
  0% { transform: scale(1); opacity: 0.65; }
  100% { transform: scale(3); opacity: 0; }
`;

const Wrap = styled(motion.span)<{ $size: number }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: ${({ $size }) => `${$size}px`};
  letter-spacing: -0.025em;
  line-height: 1;
  white-space: nowrap;
`;

const Word = styled.span`
  display: inline-flex;
  overflow: hidden;
`;

const FirstWord = styled(Word)<{ $shimmer?: boolean }>`
  background: ${({ theme }) => theme.colors.accentGrad};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  ${({ $shimmer, theme }) =>
    $shimmer &&
    css`
      background: linear-gradient(
        120deg,
        ${theme.colors.accent} 0%,
        ${theme.colors.accent2} 50%,
        ${theme.colors.accent} 100%
      );
      background-size: 220% auto;
      -webkit-background-clip: text;
      background-clip: text;
      animation: ${shimmer} 4.2s linear infinite;
    `}
`;

const LastWord = styled(Word)`
  color: ${({ theme }) => theme.colors.textFaint};
  font-weight: 500;
`;

const Char = styled(motion.span)`
  display: inline-block;
`;

const Dot = styled(motion.span)<{ $pulse?: boolean }>`
  position: relative;
  display: inline-block;
  width: 0.22em;
  height: 0.22em;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent2};
  box-shadow: 0 0 0.6em ${({ theme }) => theme.colors.accent2};

  ${({ $pulse, theme }) =>
    $pulse &&
    css`
      &::after,
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 1px solid ${theme.colors.accent2};
        animation: ${ringPulse} 2s ease-out infinite;
      }
      &::before {
        animation-delay: 1s;
      }
    `}
`;

function chars(text: string) {
  return Array.from(text).map((c, i) => (
    <Char key={`${text}-${i}`} variants={letterVariants}>
      {c === ' ' ? ' ' : c}
    </Char>
  ));
}

export default function Logo({
  size = 20,
  animated = true,
  intense = false,
  className,
}: LogoProps) {
  return (
    <Wrap
      $size={size}
      className={className}
      role="img"
      aria-label="Muhammad Anas"
      variants={wrapVariants}
      initial={animated ? 'hidden' : 'show'}
      animate="show"
    >
      <FirstWord $shimmer={intense} aria-hidden="true">
        {chars('Muhammad')}
      </FirstWord>
      <LastWord aria-hidden="true">{chars('Anas')}</LastWord>
      <Dot $pulse={intense} variants={dotVariants} aria-hidden="true" />
    </Wrap>
  );
}
