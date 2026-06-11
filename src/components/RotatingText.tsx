import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import styled from 'styled-components';

const Wrap = styled.span`
  /* Positioned so popLayout's absolutely-positioned exiting word stays inside
     this box and gets clipped — otherwise it escapes over the heading. */
  position: relative;
  display: inline-grid;
  vertical-align: top;
  overflow: hidden;

  /* Stack all words in the same cell so the line reserves the widest word's
     box and nothing reflows as they rotate. */
  & > * {
    grid-area: 1 / 1;
  }
`;

const WordEl = styled(motion.span)`
  display: inline-block;
  white-space: nowrap;
`;

const Sizer = styled.span`
  visibility: hidden;
  white-space: nowrap;
  pointer-events: none;
`;

const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

interface RotatingTextProps {
  words: string[];
  /** Milliseconds each word stays on screen. */
  interval?: number;
  className?: string;
}

/**
 * Cycles through words with a vertical roll. The widest word sizes the slot
 * so surrounding text never shifts. Under prefers-reduced-motion only the
 * first word is shown, statically.
 */
export default function RotatingText({ words, interval = 2600, className }: RotatingTextProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => {
      // Hidden tabs keep firing timers but suspend rAF, so exit animations
      // can't finish and AnimatePresence would pile up ghost words.
      if (document.hidden) return;
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  if (reduce || words.length === 0) {
    return <span className={className}>{words[0] ?? ''}</span>;
  }

  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  // AT reads a stable name (the first word); the rotation is visual-only so
  // a heading containing this never re-announces every cycle.
  return (
    <>
      <SrOnly>{words[0]}</SrOnly>
      <Wrap className={className} aria-hidden="true">
        <Sizer>{widest}</Sizer>
        <AnimatePresence mode="popLayout" initial={false}>
          <WordEl
            key={words[index]}
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-105%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.21, 0.5, 0.27, 1] }}
          >
            {words[index]}
          </WordEl>
        </AnimatePresence>
      </Wrap>
    </>
  );
}
