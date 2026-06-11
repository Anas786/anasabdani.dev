import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import styled from 'styled-components';

const Paragraph = styled.p`
  /* Typography comes from the parent — this only handles the word reveal. */
`;

const WordSpan = styled(motion.span)`
  display: inline;
`;

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <WordSpan style={{ opacity }}>{children} </WordSpan>;
}

interface ScrollTextProps {
  text: string;
  className?: string;
}

/**
 * Scroll-linked progressive text reveal: each word fades from faint to full
 * as the paragraph moves through the viewport, so reading pace follows
 * scrolling. Falls back to plain text under prefers-reduced-motion.
 */
export default function ScrollText({ text, className }: ScrollTextProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.45'],
  });

  if (reduce) {
    return <Paragraph className={className}>{text}</Paragraph>;
  }

  const words = text.split(' ');
  return (
    <Paragraph ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1) / words.length)]}
        >
          {word}
        </Word>
      ))}
    </Paragraph>
  );
}
