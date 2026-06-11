import styled from 'styled-components';
import { motion, type Variants } from 'motion/react';
import Reveal from './Reveal';
import Parallax from './Parallax';
import TiltCard from './TiltCard';
import Marquee from './Marquee';
import type { ReactElement, SVGProps } from 'react';
import { Users, Code, Layout, Server, Cloud, Database, Layers, Activity, Sparkles } from './icons';
import { Container, Section, Eyebrow, SectionTitle, SectionSub, Chip } from '../styles/ui';
import { skillGroups, ai } from '../data/content';

const ICONS: Record<string, (p: SVGProps<SVGSVGElement>) => ReactElement> = {
  leadership: Users,
  architecture: Layers,
  languages: Code,
  frontend: Layout,
  backend: Server,
  cloud: Cloud,
  database: Database,
  observability: Activity,
  ai: Sparkles,
};

const MarqueeBand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
`;

const MarqueeChip = styled(Chip)`
  white-space: nowrap;
`;

// All unique skill names across groups, for the ticker row.
const allSkills = Array.from(new Set(skillGroups.flatMap((g) => g.items)));

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
`;

const Card = styled(TiltCard)`
  padding: 26px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: ${({ theme }) => theme.blur};
  transition: border-color 0.25s ease, background 0.25s ease;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

const Heading = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconBadge = styled.span`
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.accent2};
  background: ${({ theme }) => theme.colors.accentSoft};
  border: 1px solid rgba(59, 130, 246, 0.22);

  & svg {
    width: 19px;
    height: 19px;
  }
`;

const Tags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const PopChip = styled(motion.create(Chip))`
  cursor: default;
`;

const tagsStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } },
};

const chipPop: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 24 },
  },
};

export default function Skills() {
  return (
    <Section id="skills">
      <Container>
        <Parallax>
          <Reveal>
            <Eyebrow>Toolkit</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <SectionTitle>Skills & technologies</SectionTitle>
          </Reveal>
          <Reveal i={2}>
            <SectionSub>
              The leadership practices and the full-stack, cloud-native toolset I use to ship
              reliable software at scale.
            </SectionSub>
          </Reveal>
        </Parallax>

        <Reveal>
          <MarqueeBand>
            <Marquee duration={50}>
              {allSkills.map((item) => (
                <MarqueeChip key={item}>{item}</MarqueeChip>
              ))}
            </Marquee>
            <Marquee reverse duration={38}>
              {ai.tools.map((tool) => (
                <MarqueeChip key={tool}>{tool}</MarqueeChip>
              ))}
            </Marquee>
          </MarqueeBand>
        </Reveal>

        <Grid>
          {skillGroups.map((group, i) => {
            const Icon = ICONS[group.icon] || Layers;
            return (
              <Card key={group.title} i={i}>
                <Heading>
                  <IconBadge>
                    <Icon />
                  </IconBadge>
                  {group.title}
                </Heading>
                <Tags
                  variants={tagsStagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {group.items.map((item) => (
                    <PopChip
                      key={item}
                      variants={chipPop}
                      whileHover={{ y: -3, scale: 1.06 }}
                    >
                      {item}
                    </PopChip>
                  ))}
                </Tags>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
