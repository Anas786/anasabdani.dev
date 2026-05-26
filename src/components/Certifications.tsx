import styled from 'styled-components';
import Reveal from './Reveal';
import Parallax from './Parallax';
import TiltCard from './TiltCard';
import { Award, ExternalLink } from './icons';
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

const BadgeLink = styled.a`
  display: inline-block;
  margin-bottom: 16px;
  transition: transform 0.25s ease, filter 0.25s ease;

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 6px 18px rgba(34, 211, 238, 0.35));
  }
`;

const BadgeImg = styled.img`
  display: block;
  width: 92px;
  height: 92px;
  object-fit: contain;
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

const VerifyLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent2};

  & svg {
    width: 13px;
    height: 13px;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translate(2px, -2px);
  }
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
              Each badge links to its public Credly verification.
            </SectionSub>
          </Reveal>
        </Parallax>

        <Grid>
          {certifications.map((c, i) => (
            <Card key={c.title} i={i}>
              {c.image && c.url ? (
                <BadgeLink
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${c.title} on Credly`}
                >
                  <BadgeImg src={c.image} alt={`${c.title} badge`} loading="lazy" />
                </BadgeLink>
              ) : (
                <CertIcon>
                  <Award />
                </CertIcon>
              )}
              <Issuer>{c.issuer}</Issuer>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              {c.url && (
                <VerifyLink href={c.url} target="_blank" rel="noopener noreferrer">
                  Verify on Credly <ExternalLink />
                </VerifyLink>
              )}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
