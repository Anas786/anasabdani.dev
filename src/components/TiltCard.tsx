import { useRef, type MouseEvent, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import styled from 'styled-components';

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.5, 0.27, 1], delay: i * 0.07 },
  }),
};

const Glow = styled.span`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
    360px circle at var(--mx, 50%) var(--my, 50%),
    rgba(59, 130, 246, 0.2),
    transparent 55%
  );
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const TiltWrap = styled(motion.div)`
  position: relative;
  isolation: isolate;
  will-change: transform;
  &:hover ${Glow} {
    opacity: 1;
  }
`;

interface TiltCardProps {
  children?: ReactNode;
  className?: string;
  i?: number;
  max?: number;
}

export default function TiltCard({ children, className, i = 0, max = 6 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x - 0.5);
    py.set(y - 0.5);
    ref.current.style.setProperty('--mx', `${x * 100}%`);
    ref.current.style.setProperty('--my', `${y * 100}%`);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  const interactive = !reduce;

  return (
    <TiltWrap
      ref={ref}
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      custom={i}
      onMouseMove={interactive ? handleMove : undefined}
      onMouseLeave={interactive ? handleLeave : undefined}
      style={interactive ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
    >
      <Glow aria-hidden="true" />
      {children}
    </TiltWrap>
  );
}
