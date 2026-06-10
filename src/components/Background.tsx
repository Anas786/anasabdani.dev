import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type AnimationProps,
} from 'motion/react';
import styled from 'styled-components';

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(34, 211, 238, 0.08), transparent 60%),
    radial-gradient(1000px 700px at 0% 10%, rgba(59, 130, 246, 0.1), transparent 55%),
    ${({ theme }) => theme.colors.bg};
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.gridLine} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.gridLine} 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 50% 30%, #000 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(circle at 50% 30%, #000 0%, transparent 75%);
`;

const Orb = styled(motion.div)<{ $variant: 'one' | 'two' | 'three' }>`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: ${({ theme }) => (theme.mode === 'light' ? 0.3 : 0.5)};
  will-change: transform;

  ${({ $variant }) =>
    $variant === 'one' &&
    `
    width: 460px; height: 460px; top: -120px; right: -80px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.55), transparent 70%);
  `}
  ${({ $variant }) =>
    $variant === 'two' &&
    `
    width: 420px; height: 420px; bottom: 5%; left: -120px;
    background: radial-gradient(circle, rgba(34, 211, 238, 0.4), transparent 70%);
  `}
  ${({ $variant }) =>
    $variant === 'three' &&
    `
    width: 360px; height: 360px; top: 45%; left: 55%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%);
  `}
`;

const SPOT = 520;

const CursorGlow = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: ${SPOT}px;
  height: ${SPOT}px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.12),
    rgba(34, 211, 238, 0.05) 45%,
    transparent 68%
  );

  @media (pointer: coarse) {
    display: none;
  }
`;

/* A soft spotlight that lazily trails the cursor across the page. */
function CursorSpot() {
  const mx = useMotionValue(-SPOT);
  const my = useMotionValue(-SPOT);
  const spring = { stiffness: 55, damping: 16, mass: 0.5 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX - SPOT / 2);
      my.set(e.clientY - SPOT / 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  return <CursorGlow style={{ x, y }} />;
}

export default function Background() {
  const reduce = useReducedMotion();
  const float = (x: number, y: number, dur: number): AnimationProps =>
    reduce
      ? {}
      : {
          animate: { x: [0, x, 0], y: [0, y, 0] },
          transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' },
        };

  return (
    <Wrap aria-hidden="true">
      <Grid />
      <Orb $variant="one" {...float(-40, 50, 16)} />
      <Orb $variant="two" {...float(50, -40, 20)} />
      <Orb $variant="three" {...float(-30, -30, 24)} />
      {!reduce && <CursorSpot />}
    </Wrap>
  );
}
