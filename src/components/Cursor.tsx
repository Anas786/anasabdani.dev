import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import styled from 'styled-components';

const Dot = styled(motion.div)`
  position: fixed;
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent2};
  z-index: 1300;
  pointer-events: none;
`;

const Ring = styled(motion.div)`
  position: fixed;
  top: -17px;
  left: -17px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.accent2};
  opacity: 0.55;
  z-index: 1300;
  pointer-events: none;
`;

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor]';

/**
 * Augmentative custom cursor — a dot that tracks the pointer exactly and a
 * spring-lagged ring that swells over interactive elements. The native cursor
 * stays visible; this only adds presence. Renders nothing on touch devices
 * and under prefers-reduced-motion.
 */
export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<'default' | 'hover' | 'down'>('default');

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 320, damping: 28, mass: 0.55 });
  const ry = useSpring(my, { stiffness: 320, damping: 28, mass: 0.55 });

  useEffect(() => {
    // Fine pointers only — on touch the cursor is noise.
    const fine = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener('change', update);
    return () => fine.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled || reduce) return;

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setMode((prev) =>
        prev === 'down' ? prev : target?.closest(INTERACTIVE) ? 'hover' : 'default'
      );
    };
    const onDown = () => setMode('down');
    const onUp = (e: PointerEvent) => {
      const target = e.target as Element | null;
      setMode(target?.closest(INTERACTIVE) ? 'hover' : 'default');
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.addEventListener('pointerenter', onEnter);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.removeEventListener('pointerenter', onEnter);
    };
  }, [enabled, reduce, mx, my]);

  if (!enabled || reduce) return null;

  const ringScale = mode === 'hover' ? 1.8 : mode === 'down' ? 0.75 : 1;

  return (
    <>
      <Dot
        style={{ x: mx, y: my }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: mode === 'hover' ? 0.5 : mode === 'down' ? 1.6 : 1,
        }}
        transition={{ duration: 0.18 }}
        aria-hidden="true"
      />
      <Ring
        style={{ x: rx, y: ry }}
        animate={{ opacity: visible ? (mode === 'hover' ? 0.9 : 0.55) : 0, scale: ringScale }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        aria-hidden="true"
      />
    </>
  );
}
