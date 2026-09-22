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

/* The widest word sizes the slot via a pseudo-element so it never becomes DOM
   text: crawlers and text extractors would otherwise read it inside the H1. */
const Sizer = styled.span`
  visibility: hidden;
  white-space: nowrap;
  pointer-events: none;

  &::after {
    content: attr(data-word);
  }
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

  // Only the current word is real text, so the server-rendered heading (what
  // crawlers and answer engines read) contains the first word exactly once.
  // A heading is not a live region, so the rotation does not re-announce.
  return (
    <Wrap className={className}>
      <Sizer data-word={widest} aria-hidden="true" />
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
  );
}
