import styled from 'styled-components';
import Reveal from './Reveal';
import { Check } from './icons';
import { Container, Section, Eyebrow, SectionTitle } from '../styles/ui';
import { about } from '../data/content';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: clamp(36px, 6vw, 72px);
  align-items: start;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled.div`
  & p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1.05rem;
    margin-bottom: 18px;
  }
  & p:first-of-type {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.18rem;
    line-height: 1.6;
  }
`;

const Highlights = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HL = styled(Reveal)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 500;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};

  &:hover {
    transform: translateX(5px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

const Tick = styled.span`
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent2};

  & svg {
    width: 15px;
    height: 15px;
  }
`;

export default function About() {
  return (
    <Section id="about">
      <Container>
        <Grid>
          <Copy>
            <Reveal>
              <Eyebrow>About</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <SectionTitle>{about.heading}</SectionTitle>
            </Reveal>
            <div style={{ marginTop: 28 }}>
              {about.paragraphs.map((p, i) => (
                <Reveal as="p" key={i} i={i + 2}>
                  {p}
                </Reveal>
              ))}
            </div>
          </Copy>

          <Highlights>
            {about.highlights.map((h, i) => (
              <HL key={h} i={i}>
                <Tick>
                  <Check />
                </Tick>
                {h}
              </HL>
            ))}
          </Highlights>
        </Grid>
      </Container>
    </Section>
  );
}
