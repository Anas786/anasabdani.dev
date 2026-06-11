import type { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

const slide = keyframes`
  to { transform: translateX(-50%); }
`;

const Outer = styled.div`
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);

  &:focus-visible {
    outline-offset: 6px;
  }
`;

const Track = styled.div<{ $duration: number; $reverse: boolean; $gap: number }>`
  display: flex;
  align-items: center;
  width: max-content;
  gap: ${({ $gap }) => $gap}px;
  padding-right: ${({ $gap }) => $gap}px; /* keeps the seam-gap consistent */
  animation: ${slide} ${({ $duration }) => $duration}s linear infinite;
  animation-direction: ${({ $reverse }) => ($reverse ? 'reverse' : 'normal')};

  /* WCAG 2.2.2 — moving content must be pausable; hover covers mouse users,
     focus covers keyboard users (Outer is focusable). */
  ${Outer}:hover &,
  ${Outer}:focus-within &,
  ${Outer}:focus-visible & {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
`;

const Half = styled.div<{ $gap: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap}px;
  flex-shrink: 0;

  @media (prefers-reduced-motion: reduce) {
    flex-wrap: wrap;
    justify-content: center;

    /* Only one copy is needed when nothing moves. */
    &[data-clone] {
      display: none;
    }
  }
`;

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  gap?: number;
  /** Accessible name; the marquee is focusable so keyboard users can pause it. */
  label?: string;
  className?: string;
}

/**
 * Infinite horizontal marquee: content is rendered twice and the track slides
 * by half its width, so the loop is seamless. Pauses on hover; collapses to a
 * static wrapped row under prefers-reduced-motion.
 */
export default function Marquee({
  children,
  duration = 36,
  reverse = false,
  gap = 14,
  label = 'Scrolling list — focus or hover to pause',
  className,
}: MarqueeProps) {
  return (
    <Outer className={className} tabIndex={0} role="group" aria-label={label}>
      <Track $duration={duration} $reverse={reverse} $gap={gap}>
        <Half $gap={gap}>{children}</Half>
        <Half $gap={gap} data-clone aria-hidden="true">
          {children}
        </Half>
      </Track>
    </Outer>
  );
}
