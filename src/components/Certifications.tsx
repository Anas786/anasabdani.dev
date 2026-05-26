import styled from 'styled-components';
import Reveal from './Reveal';
import Parallax from './Parallax';
import TiltCard from './TiltCard';
import { Award } from './icons';
import { Container, Section, Eyebrow, SectionTitle, SectionSub } from '../styles/ui';
import { certifications } from '../data/content';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
`;

const Card = styled(TiltCard)`
  position: relative;
  padding: 26px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: ${({ theme }) => theme.blur};
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  & h3 {
    font-size: 1.05rem;
    line-height: 1.3;
    margin-bottom: 8px;
  }

  & p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.92rem;
  }
`;

const CertIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent2};
  margin-bottom: 16px;

  & svg {
    width: 22px;
    height: 22px;
  }
`;

const Issuer = styled.div`
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent2};
  margin-bottom: 12px;
`;

export default function Certifications() {
  return (
    <Section id="certifications">
      <Container>
        <Parallax>
          <Reveal>
            <Eyebrow>Credentials</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <SectionTitle>Certifications</SectionTitle>
          </Reveal>
          <Reveal i={2}>
            <SectionSub>
              Formal validation of my delivery leadership and forward-looking practice.
            </SectionSub>
          </Reveal>
        </Parallax>

        <Grid>
          {certifications.map((c, i) => (
            <Card key={c.title} i={i}>
              <CertIcon>
                <Award />
              </CertIcon>
              <Issuer>{c.issuer}</Issuer>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
