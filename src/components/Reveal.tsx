import { motion, type Variants } from 'motion/react';
import type { ComponentProps, ReactNode } from 'react';

const variants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.5, 0.27, 1], delay: i * 0.08 },
  }),
};

// Normalize each tag to the same motion.div type so the polymorphic render
// stays type-safe (event handler element types differ between div/ul/p, but
// motion accepts the same animation props on all of them).
type MotionDiv = typeof motion.div;

const TAGS: Record<string, MotionDiv> = {
  div: motion.div,
  p: motion.p as unknown as MotionDiv,
  span: motion.span as unknown as MotionDiv,
  section: motion.section as unknown as MotionDiv,
  article: motion.article as unknown as MotionDiv,
  aside: motion.aside as unknown as MotionDiv,
  ul: motion.ul as unknown as MotionDiv,
  li: motion.li as unknown as MotionDiv,
  h1: motion.h1 as unknown as MotionDiv,
  h2: motion.h2 as unknown as MotionDiv,
  h3: motion.h3 as unknown as MotionDiv,
};

export type RevealAs = keyof typeof TAGS;

interface RevealOwnProps {
  children?: ReactNode;
  i?: number;
  as?: RevealAs;
  className?: string;
}

type RevealProps = RevealOwnProps & Omit<ComponentProps<MotionDiv>, keyof RevealOwnProps>;

export default function Reveal({
  children,
  i = 0,
  as = 'div',
  className,
  ...rest
}: RevealProps) {
  const Comp = TAGS[as] ?? motion.div;
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      custom={i}
      {...rest}
    >
      {children}
    </Comp>
  );
}
