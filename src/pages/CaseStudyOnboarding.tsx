import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';
import Footer from '../components/Footer';
import { ArrowRight, Calendar, Check, Mail } from '../components/icons';
import {
  Button,
  Chip,
  Container,
  Eyebrow,
  GradientText,
  Section,
} from '../styles/ui';
import { profile } from '../data/content';

const PAGE_TITLE =
  'AI-Assisted Customer Onboarding Case Study — Faster Onboarding, Lower Churn | Muhammad Anas';

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
  max-width: 21ch;
  margin-bottom: 20px;
`;

const Lede = styled.p`
  font-size: clamp(1.05rem, 1.6vw, 1.22rem);
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 62ch;
  margin-bottom: 26px;
`;

const FactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StatGrid = styled.div`
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
  padding: 26px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: ${({ theme }) => theme.blur};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};

  & b {
    display: block;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(1.7rem, 3vw, 2.2rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    background: ${({ theme }) => theme.colors.accentGrad};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  & span {
    display: block;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.9rem;
  }
`;

const Prose = styled.div`
  max-width: 720px;

  & h2 {
    font-size: clamp(1.45rem, 2.6vw, 1.9rem);
    margin: clamp(34px, 5vw, 52px) 0 14px;
  }
  & p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1.04rem;
    line-height: 1.7;
    margin-bottom: 16px;
  }
  & strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const Steps = styled.ol`
  list-style: none;
  display: grid;
  gap: 14px;
  margin: 8px 0 6px;
  counter-reset: step;
`;

const Step = styled(Reveal).attrs({ as: 'li' })`
  counter-increment: step;
  display: flex;
  gap: 16px;
  padding: 18px 20px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};

  &::before {
    content: counter(step, decimal-leading-zero);
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.font.display};
    font-weight: 700;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.accent2};
    padding-top: 2px;
  }

  & b {
    display: block;
    margin-bottom: 4px;
    font-weight: 600;
  }
  & span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.97rem;
    line-height: 1.6;
  }
`;

const Wins = styled.ul`
  list-style: none;
  display: grid;
  gap: 11px;
  margin: 8px 0 6px;

  & li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1.02rem;
    line-height: 1.6;
  }
  & svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.accent2};
  }
`;

const Quote = styled(Reveal)`
  margin: clamp(36px, 5vw, 56px) 0 0;
  padding: clamp(24px, 3.5vw, 38px);
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background:
    radial-gradient(540px 260px at 90% 0%, rgba(34, 211, 238, 0.1), transparent 60%),
    ${({ theme }) => theme.colors.bgSoft};

  & blockquote {
    font-size: clamp(1.05rem, 1.7vw, 1.25rem);
    line-height: 1.6;
  }
  & footer {
    margin-top: 14px;
    color: ${({ theme }) => theme.colors.textFaint};
    font-size: 0.9rem;
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

export default function CaseStudyOnboarding() {
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
        <Head as="article">
          <Container>
            <Reveal>
              <Eyebrow>Case study · Flipdish · Food-tech SaaS</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <Title>
                Cutting customer onboarding effort{' '}
                <GradientText>dramatically</GradientText> with AI-assisted
                workflows
              </Title>
            </Reveal>
            <Reveal i={2}>
              <Lede>
                How my teams at Flipdish rebuilt customer onboarding around
                AI-assisted menu creation — reducing manual effort, shortening
                time-to-live for new restaurants, and lowering early-stage
                client churn.
              </Lede>
            </Reveal>
            <Reveal i={3}>
              <FactRow>
                <Chip>Role: Engineering Manager</Chip>
                <Chip>3 Agile teams</Chip>
                <Chip>AI / LLM workflows</Chip>
                <Chip>Restaurant ordering platform</Chip>
              </FactRow>
            </Reveal>

            <div style={{ marginTop: 'clamp(30px, 4vw, 46px)' }}>
              <StatGrid>
                <StatCard i={0} max={5}>
                  <b>Faster</b>
                  <span>customer onboarding, with far less manual effort</span>
                </StatCard>
                <StatCard i={1} max={5}>
                  <b>3</b>
                  <span>Agile teams delivering the initiative</span>
                </StatCard>
                <StatCard i={2} max={5}>
                  <b>Lower</b>
                  <span>early-stage client churn</span>
                </StatCard>
                <StatCard i={3} max={5}>
                  <b>C-level</b>
                  <span>visibility — outcomes reported to leadership</span>
                </StatCard>
              </StatGrid>
            </div>

            <Prose>
              <Reveal as="div">
                <h2>The challenge</h2>
                <p>
                  Flipdish provides online ordering, kiosks, and restaurant
                  management software to thousands of restaurants. Before a new
                  customer can take a single order, their entire menu —
                  categories, items, descriptions, options, modifiers, pricing —
                  has to exist accurately in the platform.
                </p>
                <p>
                  That setup work was largely manual. Menus arrive as PDFs,
                  spreadsheets, photos, and links in every imaginable format,
                  and turning them into structured platform data was slow,
                  repetitive, and error-prone. The cost wasn&rsquo;t just
                  internal effort: <strong>every day a restaurant waits to go
                  live is a day it questions its decision to sign</strong> —
                  and slow onboarding showed up directly in early-stage churn.
                </p>
              </Reveal>

              <Reveal as="div">
                <h2>My role</h2>
                <p>
                  As Engineering Manager I lead three Agile teams at Flipdish,
                  reporting directly to C-level leadership. I owned this
                  initiative end-to-end: framing the problem with stakeholders,
                  shaping the architecture, planning and prioritizing delivery
                  across sprints, and reporting outcomes against business
                  metrics — not shipped features.
                </p>
              </Reveal>

              <Reveal as="div">
                <h2>The approach</h2>
              </Reveal>
              <Steps>
                <Step i={0}>
                  <div>
                    <b>Map the bottleneck before touching AI</b>
                    <span>
                      We traced the onboarding funnel step by step to find where
                      the hours actually went. Menu creation dominated — making
                      it the highest-leverage target rather than the flashiest
                      one.
                    </span>
                  </div>
                </Step>
                <Step i={1}>
                  <div>
                    <b>Build AI-assisted menu creation</b>
                    <span>
                      We introduced LLM-powered workflows that take the menus
                      customers actually send — documents, images, links — and
                      draft structured menu data automatically: categories,
                      items, modifiers, and pricing ready for review instead of
                      manual entry from scratch.
                    </span>
                  </div>
                </Step>
                <Step i={2}>
                  <div>
                    <b>Keep humans on the quality gate</b>
                    <span>
                      AI drafts, people approve. Onboarding staff review and
                      correct the generated menus, so accuracy stays high while
                      the repetitive transcription work disappears — and their
                      corrections show us exactly where to improve the
                      workflows next.
                    </span>
                  </div>
                </Step>
                <Step i={3}>
                  <div>
                    <b>Ship iteratively, measure relentlessly</b>
                    <span>
                      We rolled the workflows into real onboarding pipelines
                      sprint by sprint, measuring onboarding effort and
                      time-to-live against the manual baseline and reporting
                      the deltas to leadership.
                    </span>
                  </div>
                </Step>
              </Steps>

              <Reveal as="div">
                <h2>The results</h2>
              </Reveal>
              <Wins>
                <Reveal as="li" i={0}>
                  <Check />
                  <span>
                    <strong>A major improvement in onboarding efficiency</strong>{' '}
                    — new restaurants go live with markedly less manual effort
                    per account.
                  </span>
                </Reveal>
                <Reveal as="li" i={1}>
                  <Check />
                  <span>
                    <strong>Lower early-stage client churn</strong> — faster
                    time-to-first-order keeps new customers engaged through the
                    riskiest phase of the relationship.
                  </span>
                </Reveal>
                <Reveal as="li" i={2}>
                  <Check />
                  <span>
                    <strong>Onboarding capacity scales without headcount</strong>{' '}
                    — the same team handles more new customers, and the work
                    shifted from data entry to quality review.
                  </span>
                </Reveal>
              </Wins>

              <Reveal as="div">
                <h2>What made it work</h2>
                <p>
                  <strong>Business metric first, technology second.</strong> The
                  goal was never &ldquo;add AI&rdquo; — it was cutting
                  onboarding effort and churn. Framing it that way kept
                  leadership aligned and gave the teams a clear definition of
                  done.
                </p>
                <p>
                  <strong>Human-in-the-loop is a feature, not a compromise.</strong>{' '}
                  Keeping people on the approval step made the system
                  trustworthy enough to put in front of real customer data on
                  day one, and their corrections became the improvement loop.
                </p>
                <p>
                  <strong>AI-assisted delivery compounds.</strong> The same
                  teams use GitHub Copilot, Claude, and ChatGPT across the
                  development lifecycle — so the people building AI workflows
                  were also shipping faster because of them.
                </p>
              </Reveal>

              <Quote>
                <blockquote>
                  &ldquo;His engineering skills are exceptional, he has strong
                  judgment, writes clean and scalable code, and consistently
                  thinks a few steps ahead when it comes to architecture and
                  long-term impact.&rdquo;
                </blockquote>
                <footer>
                  Qasim Salam — Co-Founder, Ember AI · CEO, Remotebase (managed
                  me directly)
                </footer>
              </Quote>
            </Prose>

            <CTA>
              <h2>
                Facing a similar onboarding or delivery{' '}
                <GradientText>bottleneck</GradientText>?
              </h2>
              <p>
                I help product organizations apply AI where it moves business
                metrics — as an engineering leader, fractional CTO, or
                consultant. Let&rsquo;s talk about what that could look like for
                your team.
              </p>
              <CTAActions>
                <Magnetic>
                  <Button as={Link} to="/#work">
                    <Calendar /> Book a call
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button $variant="ghost" href={`mailto:${profile.email}`}>
                    <Mail /> Email me
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
