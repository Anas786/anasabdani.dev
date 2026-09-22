import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import styled from 'styled-components';
import Reveal from './Reveal';
import Parallax from './Parallax';
import { ExternalLink } from './icons';
import { Container, Section, Eyebrow, SectionTitle, SectionSub } from '../styles/ui';
import { experience } from '../data/content';

const Split = styled.div`
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const Sticky = styled.aside`
  position: sticky;
  top: calc(${({ theme }) => theme.layout.navH} + 48px);
  align-self: start;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Active = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ActiveLogo = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  min-width: 64px;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  margin-bottom: 22px;

  & img {
    display: block;
    height: 36px;
    width: auto;
    max-width: 150px;
    object-fit: contain;
  }
`;

const Period = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent2};
  margin-bottom: 10px;
`;

const RoleTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  font-weight: 600;
  line-height: 1.15;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`;

const CompanyText = styled.div`
  margin-top: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Badge = styled.span`
  padding: 2px 9px;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onAccent};
  background: ${({ theme }) => theme.colors.accentGrad};
  border-radius: 999px;
`;

const Note = styled.span`
  color: ${({ theme }) => theme.colors.textFaint};
  font-weight: 400;
  font-size: 0.85rem;
`;

/* Stands in for a logo when an entry has no image. The logo boxes are always
   white, so the mark is fixed dark regardless of theme. */
const Monogram = styled.span<{ $size: 'lg' | 'sm' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  color: #0f172a;
  font-size: ${({ $size }) => ($size === 'lg' ? '1.35rem' : '0.95rem')};
`;

/* Title progression inside one company (promotions), newest first. */
const Roles = styled.ul<{ $compact?: boolean }>`
  list-style: none;
  margin-top: ${({ $compact }) => ($compact ? '8px' : '18px')};
  display: grid;
  gap: ${({ $compact }) => ($compact ? '4px' : '7px')};

  & li {
    position: relative;
    padding-left: 16px;
    font-size: ${({ $compact }) => ($compact ? '0.82rem' : '0.9rem')};
    font-weight: 500;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  & li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.borderStrong};
  }
  & li:first-child::before {
    background: ${({ theme }) => theme.colors.accentGrad};
  }
  & li span {
    color: ${({ theme }) => theme.colors.textFaint};
    font-weight: 400;
  }
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 26px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent2};

  & svg {
    width: 15px;
    height: 15px;
    transition: transform 0.2s ease;
  }
  &:hover svg {
    transform: translate(2px, -2px);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '44px' : '28px')};
  height: 5px;
  border-radius: 999px;
  background: ${({ $active, theme }) => ($active ? theme.colors.accentGrad : theme.colors.borderStrong)};
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease, width 0.3s ease;
`;

const Scroll = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 34px;
`;

const Track = styled.span`
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${({ theme }) => theme.colors.border};
`;

const TrackFill = styled(motion.div)`
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${({ theme }) => theme.colors.accentGrad};
  box-shadow: 0 0 12px rgba(34, 211, 238, 0.45);
  transform-origin: top;
`;

const TimelineDot = styled.span<{ $active: boolean }>`
  /* -30px = -(34px pad) + 8px track left - 4px to center 10px dot on the 2px rail */
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $active, theme }) => ($active ? theme.colors.accentGrad : theme.colors.borderStrong)};
  box-shadow: ${({ $active, theme }) => ($active ? `0 0 0 4px ${theme.colors.accentSoft}` : '0 0 0 0 transparent')};
  transition: background 0.4s ease, box-shadow 0.4s ease;

  @media (max-width: 900px) {
    top: 17px;
    transform: none;
  }
`;

const Block = styled.article<{ $active: boolean }>`
  position: relative;
  min-height: 46vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 0;
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition: opacity 0.45s ease;

  @media (max-width: 900px) {
    min-height: 0;
    opacity: 1;
    padding: 0 0 28px;
    margin-bottom: 28px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }
  }
`;

const BlockHead = styled.div`
  display: none;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 18px;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const BlockLogo = styled.span`
  flex-shrink: 0;
  margin-top: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  min-width: 44px;
  padding: 8px 11px;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 11px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12);

  & img {
    display: block;
    height: 24px;
    width: auto;
    max-width: 120px;
    object-fit: contain;
  }
`;

const BlockRole = styled.div`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BlockCompany = styled.div`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.accent2};
  font-weight: 600;
  font-size: 0.95rem;
`;

const BlockPeriod = styled.div`
  margin-top: 2px;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const Points = styled.ul`
  list-style: none;
  display: grid;
  gap: 12px;

  & li {
    position: relative;
    padding-left: 22px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1.02rem;
    line-height: 1.55;
  }
  & li::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 10px;
    width: 6px;
    height: 6px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transform: rotate(45deg);
  }
`;

/** "Meezan Bank Limited" -> "MB", "Devsy" -> "D". */
const monogram = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

const itemKey = (e: { company: string; period: string }) => `${e.company}-${e.period}`;

export default function Experience() {
  const initial = Math.max(0, experience.findIndex((e) => e.current));
  const [active, setActive] = useState(initial);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);
  const ratios = useRef<number[]>(experience.map(() => 0));
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start 0.75', 'end 0.55'],
  });
  const fillScale = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.i);
          ratios.current[i] = e.isIntersecting ? e.intersectionRatio : 0;
        });
        let best = -1;
        let max = 0;
        ratios.current.forEach((r, i) => {
          if (r > max) {
            max = r;
            best = i;
          }
        });
        if (best >= 0) setActive(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-32% 0px -32% 0px' }
    );
    blockRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const job = experience[active];
  const goTo = (i: number) => blockRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <Section id="experience">
      <Container>
        <Parallax>
          <Reveal>
            <Eyebrow>Experience</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <SectionTitle>Ten years of building software and leading engineering teams</SectionTitle>
          </Reveal>
          <Reveal i={2}>
            <SectionSub>
              I started as a hands-on software engineer and now manage multiple Agile teams
              as an Engineering Manager. Along the way I’ve owned delivery, cloud-native
              architecture, and reliability at SaaS and product companies, mostly remote.
            </SectionSub>
          </Reveal>
        </Parallax>

        <Split>
          <Sticky>
            <Active
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.21, 0.5, 0.27, 1] }}
            >
              <ActiveLogo>
                {job.logo ? (
                  <img src={job.logo} alt={`${job.company} logo`} />
                ) : (
                  <Monogram $size="lg" role="img" aria-label={`${job.company} logo`}>
                    {monogram(job.company)}
                  </Monogram>
                )}
              </ActiveLogo>
              <Period>{job.period}</Period>
              <RoleTitle>
                {job.role}
                {job.current && <Badge>Current</Badge>}
              </RoleTitle>
              <CompanyText>
                {job.company}
                {job.note && <Note> · {job.note}</Note>}
              </CompanyText>
              {job.roles && (
                <Roles aria-label={`Roles held at ${job.company}`}>
                  {job.roles.map((r) => (
                    <li key={r.title + r.period}>
                      {r.title} <span>· {r.period}</span>
                    </li>
                  ))}
                </Roles>
              )}
              {job.website && (
                <Link href={job.website} target="_blank" rel="noopener noreferrer">
                  Visit {job.company} <ExternalLink />
                </Link>
              )}
            </Active>

            <Dots role="tablist" aria-label="Roles">
              {experience.map((e, i) => (
                <Dot
                  key={itemKey(e)}
                  $active={i === active}
                  onClick={() => goTo(i)}
                  aria-label={`${e.role} at ${e.company}`}
                  aria-selected={i === active}
                />
              ))}
            </Dots>
          </Sticky>

          <Scroll ref={scrollRef}>
            <Track aria-hidden="true" />
            <TrackFill aria-hidden="true" style={{ scaleY: reduce ? 1 : fillScale }} />
            {experience.map((j, i) => (
              <Block
                key={itemKey(j)}
                $active={i === active}
                data-i={i}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
              >
                <TimelineDot $active={i === active} aria-hidden="true" />
                <BlockHead>
                  <BlockLogo>
                    {j.logo ? (
                      <img src={j.logo} alt={`${j.company} logo`} loading="lazy" />
                    ) : (
                      <Monogram $size="sm" role="img" aria-label={`${j.company} logo`}>
                        {monogram(j.company)}
                      </Monogram>
                    )}
                  </BlockLogo>
                  <div>
                    <BlockRole>
                      {j.role}
                      {j.current && <Badge>Current</Badge>}
                    </BlockRole>
                    <BlockCompany>
                      {j.company}
                      {j.note && <Note> · {j.note}</Note>}
                    </BlockCompany>
                    <BlockPeriod>{j.period}</BlockPeriod>
                    {j.roles && (
                      <Roles $compact aria-label={`Roles held at ${j.company}`}>
                        {j.roles.map((r) => (
                          <li key={r.title + r.period}>
                            {r.title} <span>· {r.period}</span>
                          </li>
                        ))}
                      </Roles>
                    )}
                  </div>
                </BlockHead>
                <Points>
                  {j.points.map((pt, k) => (
                    <li key={k}>{pt}</li>
                  ))}
                </Points>
              </Block>
            ))}
          </Scroll>
        </Split>
      </Container>
    </Section>
  );
}
