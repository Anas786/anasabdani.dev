import { motion, useReducedMotion, type AnimationProps } from 'motion/react';
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
    </Wrap>
  );
}
