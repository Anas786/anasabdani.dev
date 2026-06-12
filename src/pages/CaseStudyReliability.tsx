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
  'Reliability & Observability Case Study — Dramatically Fewer Incidents | Muhammad Anas';

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

const MoreLinks = styled.div`
  margin-top: 22px;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.textFaint};

  & a {
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease;
  }
  & a:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default function CaseStudyReliability() {
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
              <Eyebrow>Case study · Gridware · Grid-monitoring platforms</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <Title>
                From firefighting to <GradientText>foresight</GradientText>: an
                observability overhaul that dramatically cut production
                incidents
              </Title>
            </Reveal>
            <Reveal i={2}>
              <Lede>
                How I introduced observability practices across
                Gridware&rsquo;s core platforms as Engineering Manager — so
                problems were found by dashboards instead of customers,
                incidents became dramatically rarer, and on-call went from
                chaotic to calm.
              </Lede>
            </Reveal>
            <Reveal i={3}>
              <FactRow>
                <Chip>Role: Engineering Manager</Chip>
                <Chip>Cloud-native &amp; mobile-first</Chip>
                <Chip>Serverless on AWS</Chip>
                <Chip>Incident management</Chip>
              </FactRow>
            </Reveal>

            <div style={{ marginTop: 'clamp(30px, 4vw, 46px)' }}>
              <StatGrid>
                <StatCard i={0} max={5}>
                  <b>Fewer</b>
                  <span>production incidents across core platforms</span>
                </StatCard>
                <StatCard i={1} max={5}>
                  <b>Faster</b>
                  <span>detection and resolution of issues</span>
                </StatCard>
                <StatCard i={2} max={5}>
                  <b>Calmer</b>
                  <span>on-call — structured incident command, not panic</span>
                </StatCard>
                <StatCard i={3} max={5}>
                  <b>C-level</b>
                  <span>stakeholder alignment on reliability</span>
                </StatCard>
              </StatGrid>
            </div>

            <Prose>
              <Reveal as="div">
                <h2>The challenge</h2>
                <p>
                  Gridware builds grid-monitoring technology, and the
                  cloud-native and mobile-first platforms my teams ran sat in
                  the critical path for external customers. As those platforms
                  scaled, production issues were too often discovered the worst
                  possible way: <strong>a customer noticed before our
                  dashboards did</strong>.
                </p>
                <p>
                  Each incident pulled engineers off the roadmap and into
                  firefighting. Without shared visibility into what the systems
                  were actually doing, diagnosis was slow, fixes were
                  stressful, and reliability felt like luck rather than a
                  property the team controlled.
                </p>
              </Reveal>

              <Reveal as="div">
                <h2>My role</h2>
                <p>
                  As Engineering Manager (via Remotebase) I owned both delivery
                  and production stability across critical systems — designing
                  serverless solutions on AWS using microservices and SOA with
                  NestJS, streamlining delivery with GraphQL, AWS Amplify, and
                  CI/CD pipelines, and working directly with C-level
                  stakeholders and external customers on roadmap alignment.
                  Incident management was mine end to end: if production broke,
                  the buck stopped with me.
                </p>
              </Reveal>

              <Reveal as="div">
                <h2>The approach</h2>
              </Reveal>
              <Steps>
                <Step i={0}>
                  <div>
                    <b>Instrument first</b>
                    <span>
                      Before changing any process, we made the systems
                      observable: metrics, logs, and traces flowing from the
                      core platforms into dashboards the whole team could read
                      — the standard toolkit of the Datadog / Grafana /
                      Prometheus / Sentry / CloudWatch class. You can&rsquo;t
                      fix what you can&rsquo;t see.
                    </span>
                  </div>
                </Step>
                <Step i={1}>
                  <div>
                    <b>Define what &ldquo;healthy&rdquo; means</b>
                    <span>
                      We set SLO-style thresholds for the things users actually
                      feel, and wired alerting to user impact rather than raw
                      noise — so a page meant something real was wrong, and
                      quiet meant the platforms were genuinely fine.
                    </span>
                  </div>
                </Step>
                <Step i={2}>
                  <div>
                    <b>Make incidents a process, not a panic</b>
                    <span>
                      We introduced structured incident command: clear severity
                      levels, a single owner per incident, predictable
                      communication, and blameless post-incident reviews that
                      turned every failure into a concrete improvement instead
                      of a scar.
                    </span>
                  </div>
                </Step>
                <Step i={3}>
                  <div>
                    <b>Harden the pipeline</b>
                    <span>
                      Reliability also depends on how fast you can ship a fix.
                      CI/CD discipline across the GraphQL and AWS Amplify
                      stack meant remediations and preventative work rolled out
                      quickly and safely, with the serverless architecture
                      keeping blast radius small.
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
                    <strong>Dramatically fewer production incidents</strong>{' '}
                    across the core platforms — the firefighting that had been
                    eating roadmap time largely disappeared.
                  </span>
                </Reveal>
                <Reveal as="li" i={1}>
                  <Check />
                  <span>
                    <strong>Issues caught before customers noticed</strong> —
                    dashboards and impact-based alerts surfaced problems while
                    they were still cheap to fix.
                  </span>
                </Reveal>
                <Reveal as="li" i={2}>
                  <Check />
                  <span>
                    <strong>A real learning loop</strong> — blameless
                    post-incident reviews fed directly into the backlog, so
                    each incident made the system stronger instead of just
                    older.
                  </span>
                </Reveal>
                <Reveal as="li" i={3}>
                  <Check />
                  <span>
                    <strong>Stability across critical systems</strong> — calm,
                    structured on-call and a reliability story C-level
                    stakeholders and customers could trust.
                  </span>
                </Reveal>
              </Wins>

              <Reveal as="div">
                <h2>What made it work</h2>
                <p>
                  <strong>Observability is a product decision, not an ops
                  chore.</strong> We treated instrumentation, dashboards, and
                  alerting as part of the platform itself — planned, owned, and
                  prioritized like any feature — instead of something bolted on
                  after the next outage.
                </p>
                <p>
                  <strong>SLOs turn reliability debates into data.</strong>{' '}
                  Once &ldquo;healthy&rdquo; was defined in terms of user
                  impact, conversations with C-level stakeholders stopped being
                  about anecdotes and started being about thresholds — which
                  made it far easier to balance roadmap work against
                  reliability work.
                </p>
                <p>
                  <strong>The goal is boring on-call.</strong> Structure,
                  severity levels, and blameless reviews exist so that pages
                  are rare, response is calm, and engineers keep their energy
                  for building. Boring on-call is what a reliable platform
                  feels like from the inside.
                </p>
              </Reveal>

              <Quote>
                <blockquote>
                  &ldquo;Anas&rsquo; leadership and commitment to getting the
                  job done was a force that always moved the needle for
                  us.&rdquo;
                </blockquote>
                <footer>
                  Hall Chen — Building the grid of the future (managed me
                  directly)
                </footer>
              </Quote>
            </Prose>

            <CTA>
              <h2>
                Is <GradientText>reliability</GradientText> slowing your
                roadmap?
              </h2>
              <p>
                I help product organizations make production stability a
                managed outcome — observability, SLOs, and incident practices
                that let teams ship fast without fear — as an engineering
                leader, fractional CTO, or consultant.
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
              <MoreLinks>
                Next:{' '}
                <Link to="/case-studies/ai-assisted-onboarding">
                  AI-assisted customer onboarding at Flipdish
                </Link>{' '}
                · or see <Link to="/services">how I can help your team</Link>.
              </MoreLinks>
            </CTA>
          </Container>
        </Head>
      </main>

      <Footer />
    </>
  );
}
