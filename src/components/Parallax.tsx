import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface ParallaxProps {
  children?: ReactNode;
  amount?: number;
  className?: string;
}

export default function Parallax({ children, amount = 30, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? { position: 'relative' } : { position: 'relative', y }}
    >
      {children}
    </motion.div>
  );
}
