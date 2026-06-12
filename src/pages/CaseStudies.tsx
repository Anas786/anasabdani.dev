import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';
import Footer from '../components/Footer';
import { ArrowRight, Calendar, Layers, Sparkles } from '../components/icons';
import {
  Button,
  Chip,
  Container,
  Eyebrow,
  GradientText,
  Section,
} from '../styles/ui';

const PAGE_TITLE =
  'Engineering Leadership Case Studies — Delivery, AI, Reliability | Muhammad Anas';

const TopBar = styled.header`
  height: ${({ theme }) => theme.layout.navH};
  display: flex;
  align-items: center;
`;

const TopBarInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s ease;

  & svg {
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Head = styled(Section)`
  padding-top: clamp(28px, 4vw, 48px);
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1.08;
  max-width: 18ch;
  margin-bottom: 20px;
`;

const Lede = styled.p`
  font-size: clamp(1.05rem, 1.6vw, 1.22rem);
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 62ch;
`;

const CardGrid = styled.div`
  margin-top: clamp(30px, 4.5vw, 50px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(16px, 2.4vw, 24px);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const CardShell = styled(TiltCard)`
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: ${({ theme }) => theme.blur};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
`;

const CardMeta = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent2};
`;

const CardTitle = styled.h2`
  margin-top: 12px;
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  line-height: 1.18;
  transition: color 0.2s ease;
`;

const CardOutcome = styled.p`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.02rem;
  line-height: 1.65;
`;

const CardTags = styled.div`
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CardCue = styled.span`
  margin-top: auto;
  padding-top: 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s ease;

  & svg {
    width: 18px;
    height: 18px;
    transition: transform 0.25s ease;
  }
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: clamp(26px, 3.6vw, 40px);
  border-radius: inherit;

  &:hover ${CardTitle} {
    color: ${({ theme }) => theme.colors.accent2};
  }

  &:hover ${CardCue} {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover ${CardCue} svg {
    transform: translateX(4px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
`;

const NoteStrip = styled(Reveal)`
  margin-top: clamp(20px, 3vw, 28px);
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px dashed ${({ theme }) => theme.colors.borderStrong};
  color: ${({ theme }) => theme.colors.textFaint};
  font-size: 0.92rem;
  line-height: 1.55;

  & svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.accent2};
  }
`;

const CTA = styled(Reveal)`
  margin-top: clamp(40px, 6vw, 64px);
  padding: clamp(28px, 4vw, 48px);
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background:
    radial-gradient(700px 360px at 88% -10%, rgba(34, 211, 238, 0.13), transparent 60%),
    radial-gradient(620px 360px at -5% 110%, rgba(59, 130, 246, 0.15), transparent 60%),
    ${({ theme }) => theme.colors.bgSoft};

  & h2 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    margin-bottom: 12px;
  }
  & p {
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 56ch;
    margin-bottom: 24px;
  }
`;

const CTAActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export default function CaseStudies() {
  // Static builds carry the right <title> via the prerender script; this
  // covers client-side navigation from the home page.
  useEffect(() => {
    const prev = document.title;
    document.title = PAGE_TITLE;
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <>
      <TopBar>
        <TopBarInner>
          <Link to="/" aria-label="Muhammad Anas — home">
            <Logo size={20} animated={false} />
          </Link>
          <BackLink to="/">
            <ArrowRight /> Back to home
          </BackLink>
        </TopBarInner>
      </TopBar>

      <main id="main">
        <Head>
          <Container>
            <Reveal>
              <Eyebrow>Case studies</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <Title>
                Proof over <GradientText>promises</GradientText>
              </Title>
            </Reveal>
            <Reveal i={2}>
              <Lede>
                Real initiatives, real outcomes. These write-ups show how I
                lead engineering teams through delivery, AI adoption, and
                reliability work — what the problem was, how we approached it,
                and what changed for the business.
              </Lede>
            </Reveal>

            <CardGrid>
              <CardShell i={0} max={4}>
                <CardLink to="/case-studies/ai-assisted-onboarding">
                  <CardMeta>Flipdish · Food-tech SaaS</CardMeta>
                  <CardTitle>AI-assisted customer onboarding</CardTitle>
                  <CardOutcome>
                    Rebuilt onboarding around AI-assisted menu creation —
                    dramatically less manual effort per new restaurant and
                    lower early-stage client churn.
                  </CardOutcome>
                  <CardTags>
                    <Chip>AI / LLM workflows</Chip>
                    <Chip>Delivery leadership</Chip>
                  </CardTags>
                  <CardCue>
                    Read the case study <ArrowRight />
                  </CardCue>
                </CardLink>
              </CardShell>

              <CardShell i={1} max={4}>
                <CardLink to="/case-studies/reliability-observability">
                  <CardMeta>Gridware · Grid-monitoring platforms</CardMeta>
                  <CardTitle>Reliability &amp; observability overhaul</CardTitle>
                  <CardOutcome>
                    Introduced observability and incident-management practices
                    across core platforms — significantly fewer production
                    incidents and far more stable critical systems.
                  </CardOutcome>
                  <CardTags>
                    <Chip>Observability</Chip>
                    <Chip>Incident management</Chip>
                  </CardTags>
                  <CardCue>
                    Read the case study <ArrowRight />
                  </CardCue>
                </CardLink>
              </CardShell>
            </CardGrid>

            <NoteStrip i={2}>
              <Sparkles />
              <span>
                More case studies are being written — the work exists, the
                write-ups are catching up.
              </span>
            </NoteStrip>

            <CTA>
              <h2>
                Want <GradientText>outcomes</GradientText> like these?
              </h2>
              <p>
                I take on engineering leadership, fractional CTO, and
                consulting engagements focused on delivery, AI adoption, and
                reliability. Let&rsquo;s talk about where your team is stuck —
                and what it would take to get unstuck.
              </p>
              <CTAActions>
                <Magnetic>
                  <Button as={Link} to="/#work">
                    <Calendar /> Book a call
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button $variant="ghost" as={Link} to="/services">
                    <Layers /> Explore services
                  </Button>
                </Magnetic>
              </CTAActions>
            </CTA>
          </Container>
        </Head>
      </main>

      <Footer />
    </>
  );
}
