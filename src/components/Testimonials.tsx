import { useEffect, useState, type FocusEvent } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Reveal from './Reveal';
import Parallax from './Parallax';
import TiltCard from './TiltCard';
import { Linkedin, ArrowRight, ChevronLeft, ChevronRight } from './icons';
import { Container, Section, Eyebrow, SectionTitle, SectionSub } from '../styles/ui';
import { testimonials, profile, type Testimonial } from '../data/content';

const QuoteMarkSvg = styled.svg`
  width: 34px;
  height: 34px;
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.5;
  margin-bottom: 14px;
`;

const Person = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-top: 20px;

  /* When rendered as a profile link, light up on hover so it reads as
     clickable: name shifts to accent, avatar gets a ring. */
  &[href] {
    border-radius: 12px;
  }
  &[href] b {
    transition: color 0.2s ease;
  }
  &[href]:hover b {
    color: ${({ theme }) => theme.colors.accent2};
  }
  &[href] > img:first-child,
  &[href] > span:first-child {
    transition: box-shadow 0.2s ease;
  }
  &[href]:hover > img:first-child,
  &[href]:hover > span:first-child {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent2};
  }
`;

/* Renders a Person row as an external profile link when one exists. */
const personLinkProps = (t: Testimonial) =>
  t.linkedin
    ? ({
        as: 'a',
        href: t.linkedin,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `View ${t.name}’s LinkedIn profile`,
      } as const)
    : {};

const AvatarSpan = styled.span<{ $tone: number }>`
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 600;
  font-size: 0.95rem;
  color: #05070d;
  background: ${({ $tone, theme }) => {
    switch ($tone % 4) {
      case 1:
        return 'linear-gradient(120deg, #8b5cf6, #22d3ee)';
      case 2:
        return 'linear-gradient(120deg, #22d3ee, #34d399)';
      case 3:
        return 'linear-gradient(120deg, #6366f1, #3b82f6)';
      default:
        return theme.colors.accentGrad;
    }
  }};
`;

const AvatarImg = styled.img`
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;

  & b {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1rem;
  }
  & span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
  }
  & small {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.textFaint};
    font-size: 0.76rem;
  }
  & small svg {
    width: 13px;
    height: 13px;
    color: ${({ theme }) => theme.colors.accent2};
  }
`;

const Featured = styled(Reveal)`
  position: relative;
  display: grid;
  grid-template-columns: 1.7fr 0.9fr;
  gap: clamp(28px, 4vw, 52px);
  align-items: center;
  padding: clamp(30px, 4vw, 50px);
  margin-bottom: 22px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background:
    radial-gradient(700px 320px at 90% 0%, rgba(34, 211, 238, 0.12), transparent 60%),
    radial-gradient(600px 320px at 0% 100%, rgba(59, 130, 246, 0.1), transparent 60%),
    ${({ theme }) => theme.colors.bgSoft};
  backdrop-filter: ${({ theme }) => theme.blur};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};

  & blockquote {
    font-size: clamp(1.08rem, 1.7vw, 1.34rem);
    line-height: 1.62;
    color: ${({ theme }) => theme.colors.text};
    white-space: pre-line;
  }

  & ${QuoteMarkSvg} {
    width: 44px;
    height: 44px;
  }

  & ${Person} {
    margin-top: 0;
  }

  & ${AvatarSpan}, & ${AvatarImg} {
    width: 54px;
    height: 54px;
    font-size: 1.05rem;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-left: clamp(0px, 2.5vw, 40px);
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 860px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 22px;
    padding-left: 0;
    padding-top: 26px;
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Badge = styled.span`
  align-self: flex-start;
  padding: 6px 13px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent2};
  background: ${({ theme }) => theme.colors.accentSoft};
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 999px;
`;

const QuoteArea = styled(motion.div)`
  min-width: 0;
`;

const SlideMeta = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (max-width: 860px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 22px;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const NavBtn = styled.button`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.surface2};
  }

  & svg {
    width: 16px;
    height: 16px;
  }
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '44px' : '28px')};
  height: 5px;
  border-radius: 999px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accentGrad : theme.colors.borderStrong};
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease, width 0.3s ease;
`;

const Grid = styled.div`
  columns: 3;
  column-gap: 18px;

  @media (max-width: 940px) {
    columns: 2;
  }
  @media (max-width: 600px) {
    columns: 1;
  }
`;

const Card = styled(TiltCard)`
  break-inside: avoid;
  margin-bottom: 18px;
  padding: 26px 24px;
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

  & blockquote {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.97rem;
    line-height: 1.6;
  }
`;

const CTA = styled(Reveal)`
  display: flex;
  justify-content: center;
  margin-top: 34px;

  & a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 24px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    backdrop-filter: ${({ theme }) => theme.blur};
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  & a:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.surface2};
  }

  & svg {
    width: 18px;
    height: 18px;
    transition: transform 0.2s ease;
  }
  & svg:first-child {
    color: ${({ theme }) => theme.colors.accent2};
  }
  & a:hover svg:last-child {
    transform: translateX(4px);
  }
`;

function QuoteMark() {
  return (
    <QuoteMarkSvg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.5 4C6 4 4 6.6 4 10v10h8v-9H7.5c0-2 1-3.5 3-3.5V4Zm10 0c-3.5 0-5.5 2.6-5.5 6v10h8v-9H17.5c0-2 1-3.5 3-3.5V4Z" />
    </QuoteMarkSvg>
  );
}

function Avatar({
  image,
  initials,
  name,
  i,
}: {
  image: string | null;
  initials: string;
  name: string;
  i: number;
}) {
  const [failed, setFailed] = useState(false);
  if (image && !failed) {
    return (
      <AvatarImg
        src={image}
        alt={name}
        width={46}
        height={46}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <AvatarSpan $tone={i} aria-hidden="true">
      {initials}
    </AvatarSpan>
  );
}

export default function Testimonials() {
  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);
  const slides = featured ? [featured, ...rest.slice(0, 2)] : [];
  const gridItems = featured ? rest.slice(2) : rest;

  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 8000);
    return () => window.clearInterval(id);
    // `index` resets the timer on manual navigation so prev/next clicks
    // can't collide with an imminent auto-advance tick.
  }, [reduce, paused, slides.length, index]);

  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  const active = slides[index];

  return (
    <Section id="testimonials">
      <Container>
        <Parallax>
          <Reveal>
            <Eyebrow>Testimonials</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <SectionTitle>What colleagues say</SectionTitle>
          </Reveal>
          <Reveal i={2}>
            <SectionSub>
              Recommendations from the leaders, peers, and teams I’ve worked alongside —
              straight from LinkedIn.
            </SectionSub>
          </Reveal>
        </Parallax>

        {active && (
          <Featured
            role="group"
            aria-roledescription="carousel"
            aria-label="Featured recommendations"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(e: FocusEvent<HTMLDivElement>) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
            }}
          >
            <QuoteArea
              layout
              transition={{
                layout: reduce
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 200, damping: 28 },
              }}
              /* APG carousel pattern: live region stays 'off' while
                 auto-rotating so SRs aren't re-interrupted every cycle. */
              aria-live={reduce || paused || slides.length < 2 ? 'polite' : 'off'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.21, 0.5, 0.27, 1] }}
                >
                  <QuoteMark />
                  <blockquote>{active.quote}</blockquote>
                </motion.div>
              </AnimatePresence>
            </QuoteArea>
            <Side>
              <AnimatePresence mode="wait" initial={false}>
                <SlideMeta
                  key={active.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.21, 0.5, 0.27, 1] }}
                >
                  <Badge>
                    {active.featured ? 'Featured recommendation' : 'LinkedIn recommendation'}
                  </Badge>
                  <Person {...personLinkProps(active)}>
                    <Avatar
                      initials={active.initials}
                      image={active.image}
                      name={active.name}
                      i={index}
                    />
                    <Meta>
                      <b>{active.name}</b>
                      <span>{active.title}</span>
                      <small>
                        <Linkedin /> {active.relation}
                      </small>
                    </Meta>
                  </Person>
                </SlideMeta>
              </AnimatePresence>
              {slides.length > 1 && (
                <Controls>
                  <NavBtn
                    type="button"
                    aria-label="Previous recommendation"
                    onClick={() => go(-1)}
                  >
                    <ChevronLeft />
                  </NavBtn>
                  <NavBtn type="button" aria-label="Next recommendation" onClick={() => go(1)}>
                    <ChevronRight />
                  </NavBtn>
                  <Dots>
                    {slides.map((s, i) => (
                      <Dot
                        key={s.name}
                        type="button"
                        $active={i === index}
                        aria-label={`Show recommendation ${i + 1}`}
                        aria-current={i === index}
                        onClick={() => setIndex(i)}
                      />
                    ))}
                  </Dots>
                </Controls>
              )}
            </Side>
          </Featured>
        )}

        <Grid>
          {gridItems.map((t: Testimonial, i: number) => (
            <Card key={t.name} i={i} max={5}>
              <QuoteMark />
              <blockquote>{t.quote}</blockquote>
              <Person {...personLinkProps(t)}>
                <Avatar initials={t.initials} image={t.image} name={t.name} i={i + 1} />
                <Meta>
                  <b>{t.name}</b>
                  <span>{t.title}</span>
                  <small>
                    <Linkedin /> {t.relation}
                  </small>
                </Meta>
              </Person>
            </Card>
          ))}
        </Grid>

        <CTA>
          <a href={profile.linkedinRecommendations} target="_blank" rel="noopener noreferrer">
            <Linkedin /> View all recommendations on LinkedIn <ArrowRight />
          </a>
        </CTA>
      </Container>
    </Section>
  );
}
