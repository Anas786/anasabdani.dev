import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { ReactElement, SVGProps } from 'react';
import Reveal from './Reveal';
import Parallax from './Parallax';
import TiltCard from './TiltCard';
import { Sparkles, Code, Award, Layers, Utensils, Truck, ArrowRight } from './icons';
import { Container, Section, Eyebrow, SectionTitle, SectionSub } from '../styles/ui';
import { ai } from '../data/content';

const ICONS: Record<string, (p: SVGProps<SVGSVGElement>) => ReactElement> = {
  sparkles: Sparkles,
  code: Code,
  award: Award,
  layers: Layers,
  food: Utensils,
  delivery: Truck,
};

const Wrap = styled(Section)`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(900px 460px at 50% 0%, rgba(34, 211, 238, 0.07), transparent 65%);
  }

  & > div {
    position: relative;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
`;

const Card = styled(TiltCard)`
  padding: 28px 26px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: ${({ theme }) => theme.blur};
  transition: transform 0.25s ease, border-color 0.25s ease;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  & h3 {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  & p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
    line-height: 1.55;
  }
`;

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 14px;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent2};

  & svg {
    width: 15px;
    height: 15px;
    transition: transform 0.2s ease;
  }
  &:hover svg {
    transform: translateX(3px);
  }
`;

const IconBadge = styled.span`
  display: inline-grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 13px;
  margin-bottom: 18px;
  color: ${({ theme }) => theme.colors.onAccent};
  background: ${({ theme }) => theme.colors.accentGrad};
  box-shadow: 0 10px 24px -10px rgba(34, 211, 238, 0.55);

  & svg {
    width: 22px;
    height: 22px;
  }
`;

export default function AI() {
  return (
    <Wrap id="ai">
      <Container>
        <Parallax>
          <Reveal>
            <Eyebrow>
              <Sparkles /> AI
            </Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <SectionTitle>{ai.heading}</SectionTitle>
          </Reveal>
          <Reveal i={2}>
            <SectionSub>{ai.intro}</SectionSub>
          </Reveal>
        </Parallax>

        <Grid>
          {ai.highlights.map((h, i) => {
            const Icon = ICONS[h.icon] || Sparkles;
            return (
              <Card key={h.title} i={i}>
                <IconBadge>
                  <Icon />
                </IconBadge>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
                {h.title === 'AI-assisted delivery' && (
                  <CardLink to="/case-studies/ai-assisted-onboarding">
                    Read the full case study <ArrowRight />
                  </CardLink>
                )}
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Wrap>
  );
}
