import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import styled from 'styled-components';
import Logo from './Logo';

const Wrap = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background:
    radial-gradient(700px 500px at 50% 35%, rgba(59, 130, 246, 0.12), transparent 70%),
    ${({ theme }) => theme.colors.bg};
`;

const Inner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Bar = styled.div`
  width: 180px;
  height: 3px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface2};
  overflow: hidden;
`;

const BarFill = styled(motion.span)`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accentGrad};
  transform-origin: left;
`;

const Pct = styled.div`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.textFaint};
  font-variant-numeric: tabular-nums;
`;

export default function Loader() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const dur = 1100;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Wrap
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
    >
      <Inner exit={{ y: -16, opacity: 0, transition: { duration: 0.4 } }}>
        <Logo size={44} intense />
        <Bar>
          <BarFill
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          />
        </Bar>
        <Pct>{pct}%</Pct>
      </Inner>
    </Wrap>
  );
}
