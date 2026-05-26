import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import styled from 'styled-components';
import TiltCard from './TiltCard';
import { Container } from '../styles/ui';
import { stats } from '../data/content';

const Section = styled.section`
  position: relative;
  padding: 0 0 clamp(20px, 4vw, 40px);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  @media (max-width: 940px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(TiltCard)`
  padding: 28px 26px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: ${({ theme }) => theme.blur};
  transition: border-color 0.25s ease, background 0.25s ease;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

const Num = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  background: ${({ theme }) => theme.colors.accentGrad};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Label = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <Num ref={ref}>
      {n}
      {suffix}
    </Num>
  );
}

export default function Stats() {
  return (
    <Section aria-label="Impact metrics">
      <Container>
        <Grid>
          {stats.map((s, i) => (
            <StatCard key={s.label} i={i} max={5}>
              <CountUp value={s.value} suffix={s.suffix} />
              <Label>{s.label}</Label>
            </StatCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
