import { useRef, type MouseEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

interface MagneticProps {
  children?: ReactNode;
  className?: string;
  /** How strongly the content follows the cursor (0–1). */
  strength?: number;
}

/**
 * Makes its child gently "attract" toward the cursor while hovered and
 * spring back on leave. Pointer-events stay on the wrapper so the child
 * (usually a Button) keeps its own hover styles.
 */
export default function Magnetic({ children, className, strength = 0.25 }: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 180, damping: 14, mass: 0.3 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
