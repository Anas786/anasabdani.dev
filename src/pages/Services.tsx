import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';
import Footer from '../components/Footer';
import {
  ArrowRight,
  Calendar,
  Check,
  Mail,
  Phone,
  Sparkles,
  Users,
} from '../components/icons';
import {
  Button,
  Chip,
  Container,
  Eyebrow,
  GradientText,
  Section,
  SectionHead,
  SectionSub,
  SectionTitle,
} from '../styles/ui';
import { profile } from '../data/content';

const PAGE_TITLE =
  'Fractional CTO & Engineering Leadership Consulting — SaaS / Food-tech | Muhammad Anas';

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
  padding-bottom: clamp(18px, 3vw, 32px);
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1.08;
  max-width: 24ch;
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  align-items: stretch;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(TiltCard)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: clamp(24px, 3vw, 30px);
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: ${({ theme }) => theme.blur};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};

  & h3 {
    font-size: clamp(1.18rem, 1.8vw, 1.35rem);
    margin-bottom: 10px;
  }

  & > p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.99rem;
    line-height: 1.65;
    margin-bottom: 18px;
  }

  & p a {
    color: ${({ theme }) => theme.colors.accent2};
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const IconBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.accentSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.accent2};

  & svg {
    width: 20px;
    height: 20px;
  }
`;

const MiniList = styled.ul`
  list-style: none;
  display: grid;
  gap: 9px;

  & li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.92rem;
    line-height: 1.55;
  }

  & svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.accent2};
  }
`;

const MiniListLabel = styled.span`
  display: block;
  margin-top: auto;
  padding-top: 4px;
  margin-bottom: 10px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const Steps = styled.ol`
  list-style: none;
  display: grid;
  gap: 14px;
  margin: 8px 0 6px;
  counter-reset: step;
  max-width: 760px;
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

const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ProofCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  padding: clamp(22px, 3vw, 28px);
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  transition: transform 0.2s ease, border-color 0.25s ease, background 0.25s ease;

  & h3 {
    font-size: 1.15rem;
  }

  & p {
    flex: 1;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.96rem;
    line-height: 1.6;
  }

  & footer {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accent2};
  }

  & footer svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.surface2};

    & footer svg {
      transform: translateX(3px);
    }
  }
`;

const AllCasesLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  font-size: 0.94rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s ease;

  & svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Quote = styled(Reveal)`
  margin: clamp(28px, 4vw, 44px) 0 0;
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

const FAQList = styled.div`
  max-width: 720px;

  & h3 {
    font-size: clamp(1.12rem, 1.9vw, 1.32rem);
    margin: clamp(26px, 4vw, 38px) 0 10px;
  }

  & > div:first-child h3 {
    margin-top: 0;
  }

  & p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1.02rem;
    line-height: 1.7;
    margin-bottom: 14px;
  }

  & strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }

  & p a {
    color: ${({ theme }) => theme.colors.accent2};
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const CTA = styled(Reveal)`
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

export default function Services() {
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
              <Eyebrow>Services · Remote — US/UK/EU overlap</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <Title>
                Fractional CTO &amp;{' '}
                <GradientText>engineering leadership</GradientText> for SaaS and
                food-tech teams
              </Title>
            </Reveal>
            <Reveal i={2}>
              <Lede>
                I help SaaS and food-tech product companies ship faster and run
                more reliably — owning delivery, architecture, AI adoption, and
                reliability as a part-time engineering leader, consultant, or
                advisor. The same work I do today leading multiple Agile teams
                as an Engineering Manager at Flipdish, applied to your company.
              </Lede>
            </Reveal>
            <Reveal i={3}>
              <FactRow>
                <Chip>Fractional CTO</Chip>
                <Chip>Engineering Leadership</Chip>
                <Chip>AI-Assisted Delivery</Chip>
                <Chip>Cloud-Native AWS</Chip>
              </FactRow>
            </Reveal>
          </Container>
        </Head>

        <Section>
          <Container>
            <SectionHead>
              <Reveal>
                <Eyebrow>Engagement models</Eyebrow>
              </Reveal>
              <Reveal i={1}>
                <SectionTitle>
                  Three ways to <GradientText>work together</GradientText>
                </SectionTitle>
              </Reveal>
              <Reveal i={2}>
                <SectionSub>
                  From ongoing part-time leadership to a single expert call —
                  every engagement is scoped around a business outcome, not a
                  block of hours.
                </SectionSub>
              </Reveal>
            </SectionHead>

            <CardGrid>
              <ServiceCard i={0} max={5}>
                <IconBadge>
                  <Users />
                </IconBadge>
                <h3>Fractional engineering leadership / CTO</h3>
                <p>
                  Senior, part-time ownership of your engineering organization —
                  delivery, architecture, and team growth. I run planning and
                  prioritization, set technical direction, and report progress
                  in business terms, the way I do for C-level leadership today.
                </p>
                <MiniListLabel>What you get</MiniListLabel>
                <MiniList>
                  <li>
                    <Check />
                    <span>
                      End-to-end delivery ownership: sprint planning, backlog
                      prioritization, release execution
                    </span>
                  </li>
                  <li>
                    <Check />
                    <span>
                      Architecture decisions for scalability, reliability,
                      security, and performance
                    </span>
                  </li>
                  <li>
                    <Check />
                    <span>
                      Hiring, mentoring, and growing the team that outlasts the
                      engagement
                    </span>
                  </li>
                </MiniList>
              </ServiceCard>

              <ServiceCard i={1} max={5}>
                <IconBadge>
                  <Sparkles />
                </IconBadge>
                <h3>AI-assisted delivery consulting</h3>
                <p>
                  I find the real bottleneck in your delivery or operations,
                  then apply LLM-powered workflows with human-in-the-loop
                  review — measured against your existing baseline. It&rsquo;s
                  the playbook behind the{' '}
                  <Link to="/case-studies/ai-assisted-onboarding">
                    AI-assisted onboarding work at Flipdish
                  </Link>
                  .
                </p>
                <MiniListLabel>What you get</MiniListLabel>
                <MiniList>
                  <li>
                    <Check />
                    <span>
                      Workflow mapping to find the highest-leverage bottleneck —
                      before any model is chosen
                    </span>
                  </li>
                  <li>
                    <Check />
                    <span>
                      LLM workflow design with human review built in as a
                      feature, not a compromise
                    </span>
                  </li>
                  <li>
                    <Check />
                    <span>
                      AI tooling embedded across the development lifecycle —
                      GitHub Copilot, Claude, ChatGPT
                    </span>
                  </li>
                </MiniList>
              </ServiceCard>

              <ServiceCard i={2} max={5}>
                <IconBadge>
                  <Phone />
                </IconBadge>
                <h3>Advisory &amp; expert calls</h3>
                <p>
                  Focused senior input when you need a second opinion rather
                  than a second pair of hands: architecture and system reviews,
                  coaching for engineering leaders, and technical due diligence
                  for founders and investors.
                </p>
                <MiniListLabel>What you get</MiniListLabel>
                <MiniList>
                  <li>
                    <Check />
                    <span>
                      Architecture and system design reviews with concrete,
                      prioritized recommendations
                    </span>
                  </li>
                  <li>
                    <Check />
                    <span>
                      Leadership coaching for engineering managers and tech
                      leads stepping up
                    </span>
                  </li>
                  <li>
                    <Check />
                    <span>
                      Technical due diligence on teams, codebases, and delivery
                      practices
                    </span>
                  </li>
                </MiniList>
              </ServiceCard>
            </CardGrid>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHead>
              <Reveal>
                <Eyebrow>Process</Eyebrow>
              </Reveal>
              <Reveal i={1}>
                <SectionTitle>
                  How I <GradientText>work</GradientText>
                </SectionTitle>
              </Reveal>
              <Reveal i={2}>
                <SectionSub>
                  Every engagement follows the same arc — understand the
                  problem, frame it in business terms, execute with your team,
                  and hand it off in a measurably better state.
                </SectionSub>
              </Reveal>
            </SectionHead>

            <Steps>
              <Step i={0}>
                <div>
                  <b>Scoped discovery</b>
                  <span>
                    A short, structured look at your goals, constraints, team,
                    and systems. The output is a clearly scoped engagement with
                    a definition of done — not an open-ended retainer or a
                    slide deck.
                  </span>
                </div>
              </Step>
              <Step i={1}>
                <div>
                  <b>Business-metric framing</b>
                  <span>
                    We agree on what success means in business terms —
                    onboarding effort, churn, incident volume, delivery
                    throughput — before any technical work starts. The goal is
                    never &ldquo;adopt AI&rdquo; or &ldquo;refactor the
                    platform&rdquo;; it&rsquo;s the metric those things should
                    move.
                  </span>
                </div>
              </Step>
              <Step i={2}>
                <div>
                  <b>Embedded execution</b>
                  <span>
                    I work inside your existing team&rsquo;s rituals and tools —
                    planning, code reviews, incident response — raising the bar
                    from within rather than running a parallel consulting
                    track that disappears when I do.
                  </span>
                </div>
              </Step>
              <Step i={3}>
                <div>
                  <b>Measurable handoff</b>
                  <span>
                    Engagements end with your team able to run what we built:
                    documentation, named owners, and the metrics in place to
                    keep it honest. Success means you don&rsquo;t need me
                    anymore.
                  </span>
                </div>
              </Step>
            </Steps>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHead>
              <Reveal>
                <Eyebrow>Proof</Eyebrow>
              </Reveal>
              <Reveal i={1}>
                <SectionTitle>
                  Results, not <GradientText>promises</GradientText>
                </SectionTitle>
              </Reveal>
              <Reveal i={2}>
                <SectionSub>
                  The same playbook — bottleneck first, business metric first,
                  humans in the loop — applied at real product companies.
                </SectionSub>
              </Reveal>
            </SectionHead>

            <ProofGrid>
              <Reveal i={0}>
                <ProofCard to="/case-studies/ai-assisted-onboarding">
                  <h3>AI-assisted customer onboarding — Flipdish</h3>
                  <p>
                    How my teams rebuilt onboarding for a restaurant SaaS
                    platform around AI-assisted menu creation — cutting manual
                    effort, shortening time-to-live for new restaurants, and
                    lowering early-stage client churn.
                  </p>
                  <footer>
                    Read the case study <ArrowRight />
                  </footer>
                </ProofCard>
              </Reveal>
              <Reveal i={1}>
                <ProofCard to="/case-studies/reliability-observability">
                  <h3>Reliability &amp; observability — Gridware</h3>
                  <p>
                    How introducing observability practices across core
                    cloud-native platforms markedly reduced production
                    incidents — and turned incident response from firefighting
                    into an engineering discipline.
                  </p>
                  <footer>
                    Read the case study <ArrowRight />
                  </footer>
                </ProofCard>
              </Reveal>
            </ProofGrid>

            <Reveal i={2}>
              <AllCasesLink to="/case-studies">
                Browse all case studies <ArrowRight />
              </AllCasesLink>
            </Reveal>

            <Quote>
              <blockquote>
                &ldquo;Anas is the definition of going above and beyond as a
                software leader. His strong product intuition and leadership
                skills set him apart. He is the perfect engineering partner to
                have to build a complicated and reliable product.&rdquo;
              </blockquote>
              <footer>
                A Bin Omar — Co-founder &amp; CPO at Gridware (managed me
                directly)
              </footer>
            </Quote>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHead>
              <Reveal>
                <Eyebrow>FAQ</Eyebrow>
              </Reveal>
              <Reveal i={1}>
                <SectionTitle>
                  Frequently asked <GradientText>questions</GradientText>
                </SectionTitle>
              </Reveal>
            </SectionHead>

            <FAQList>
              <Reveal as="div" i={0}>
                <h3>What does a fractional CTO actually do?</h3>
                <p>
                  A fractional CTO gives you senior technology leadership on a
                  part-time basis: owning architecture decisions, delivery
                  process, hiring, and the translation between business goals
                  and engineering reality. You get the judgment of an
                  experienced engineering leader without the cost or
                  commitment of a full-time executive. In practice that means
                  setting technical direction, unblocking delivery, and
                  building the team and processes so the company can
                  eventually run without me.
                </p>
              </Reveal>

              <Reveal as="div" i={1}>
                <h3>How does a fractional engagement work?</h3>
                <p>
                  It starts with a scoped discovery conversation: what you are
                  trying to achieve, where things are stuck, and whether I am
                  actually the right person to help. From there we agree on
                  the business outcomes the engagement is accountable for and
                  a recurring slice of my week. I work embedded with your
                  existing team — remote, with regular checkpoints — and every
                  engagement is designed around a clean handoff rather than
                  long-term dependence.
                </p>
              </Reveal>

              <Reveal as="div" i={2}>
                <h3>What kinds of companies do you work with?</h3>
                <p>
                  Mostly SaaS and food-tech product companies — I lead
                  engineering at Flipdish, a restaurant ordering and
                  management platform, and previously managed cloud-native and
                  mobile-first platforms at Gridware. I am most useful where
                  delivery has slowed down, reliability is hurting customers,
                  or an AI initiative needs someone who has shipped one in
                  production. The underlying stack I know best is TypeScript,
                  Node.js, React, and serverless microservices on AWS.
                </p>
              </Reveal>

              <Reveal as="div" i={3}>
                <h3>How do you bring AI into delivery?</h3>
                <p>
                  Bottleneck first, model second. I map the workflow, find
                  where the hours actually go, and apply LLM-assisted
                  workflows with human review on the quality gate — then
                  measure the result against the pre-AI baseline. I also help
                  teams adopt AI tooling like GitHub Copilot, Claude, and
                  ChatGPT across the development lifecycle. The{' '}
                  <Link to="/case-studies/ai-assisted-onboarding">
                    Flipdish onboarding case study
                  </Link>{' '}
                  walks through this approach end to end.
                </p>
              </Reveal>

              <Reveal as="div" i={4}>
                <h3>Where are you based and what time zones do you cover?</h3>
                <p>
                  I am based in Karachi, Pakistan and work fully remote. I
                  keep structured overlap with US, UK, and EU time zones —
                  I have spent years working directly with US-based
                  stakeholders and customers — and run engagements async-first
                  so progress does not depend on meetings.
                </p>
              </Reveal>
            </FAQList>
          </Container>
        </Section>

        <Section>
          <Container>
            <CTA>
              <h2>
                Let&rsquo;s scope it in{' '}
                <GradientText>30 minutes</GradientText>
              </h2>
              <p>
                Bring the problem — slow delivery, a reliability mess, an AI
                initiative that is not landing. You will leave the call with an
                honest read on whether I can help and what an engagement could
                look like. No pitch deck, no obligation.
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
        </Section>
      </main>

      <Footer />
    </>
  );
}
