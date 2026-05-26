import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
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
  display: flex;
  flex-direction: column;
`;

const Block = styled.article<{ $active: boolean }>`
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
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const BlockLogo = styled.span`
  flex-shrink: 0;
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

export default function Experience() {
  const initial = Math.max(0, experience.findIndex((e) => e.current));
  const [active, setActive] = useState(initial);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);
  const ratios = useRef<number[]>(experience.map(() => 0));

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
            <SectionTitle>A decade of building & leading</SectionTitle>
          </Reveal>
          <Reveal i={2}>
            <SectionSub>
              From hands-on engineering to managing multiple teams — owning delivery,
              architecture, and reliability across product organizations.
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
                <img src={job.logo} alt={`${job.company} logo`} />
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
              {job.website && (
                <Link href={job.website} target="_blank" rel="noopener noreferrer">
                  Visit {job.company} <ExternalLink />
                </Link>
              )}
            </Active>

            <Dots role="tablist" aria-label="Roles">
              {experience.map((e, i) => (
                <Dot
                  key={e.company}
                  $active={i === active}
                  onClick={() => goTo(i)}
                  aria-label={`${e.role} at ${e.company}`}
                  aria-selected={i === active}
                />
              ))}
            </Dots>
          </Sticky>

          <Scroll>
            {experience.map((j, i) => (
              <Block
                key={j.company}
                $active={i === active}
                data-i={i}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
              >
                <BlockHead>
                  <BlockLogo>
                    <img src={j.logo} alt={`${j.company} logo`} loading="lazy" />
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
