import styled from 'styled-components';
import Reveal from './Reveal';
import Parallax from './Parallax';
import TiltCard from './TiltCard';
import type { ReactElement, SVGProps } from 'react';
import { Users, Code, Layout, Server, Cloud, Database, Layers, Activity, Sparkles } from './icons';
import { Container, Section, Eyebrow, SectionTitle, SectionSub, Chip } from '../styles/ui';
import { skillGroups } from '../data/content';

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

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

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
                <Tags>
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
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
