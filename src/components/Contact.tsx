import type { ReactElement, SVGProps } from 'react';
import styled from 'styled-components';
import Reveal from './Reveal';
import { Mail, Phone, Linkedin, Github, Download, ArrowRight } from './icons';
import { Container, Section, Eyebrow, Button, GradientText } from '../styles/ui';
import { profile } from '../data/content';

interface Method {
  icon: (p: SVGProps<SVGSVGElement>) => ReactElement;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const methods: Method[] = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}` },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: profile.linkedinLabel,
    href: profile.linkedin,
    external: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: profile.githubLabel,
    href: profile.github,
    external: true,
  },
];

const Panel = styled(Reveal)`
  position: relative;
  overflow: hidden;
  display: grid;
  /* minmax(0, …) prevents grid items' min-content from forcing tracks wider
     than the padded content area — without it the inner content was getting
     clipped on the right at mobile widths. */
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background:
    radial-gradient(820px 420px at 88% -10%, rgba(34, 211, 238, 0.13), transparent 60%),
    radial-gradient(720px 420px at -5% 110%, rgba(59, 130, 246, 0.15), transparent 60%),
    ${({ theme }) => theme.colors.bgSoft};
  padding: clamp(32px, 5vw, 60px);

  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Intro = styled.div`
  & h2 {
    font-size: clamp(1.9rem, 4vw, 2.8rem);
    margin-bottom: 16px;
  }
  & > p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1.05rem;
    max-width: 44ch;
    margin-bottom: 28px;
  }
`;

const CTAs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`;

const MetaLine = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: ${({ theme }) => theme.colors.textFaint};
  font-size: 0.9rem;

  & i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18);
  }
`;

const Methods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 18px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: ${({ theme }) => theme.blur};
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

const RowIcon = styled.span`
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent2};

  & svg {
    width: 20px;
    height: 20px;
  }
`;

const RowText = styled.span`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;

  & small {
    color: ${({ theme }) => theme.colors.textFaint};
    font-size: 0.74rem;
    font-weight: 500;
  }
  & b {
    font-weight: 600;
    font-size: 0.96rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const RowArrow = styled(ArrowRight)`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  color: ${({ theme }) => theme.colors.textFaint};
  transition: transform 0.2s ease, color 0.2s ease;

  ${Row}:hover & {
    color: ${({ theme }) => theme.colors.accent2};
    transform: translateX(3px);
  }
`;

export default function Contact() {
  return (
    <Section id="contact">
      <Container>
        <Panel>
          <Intro>
            <Eyebrow>Get in touch</Eyebrow>
            <h2>
              Let’s build something <GradientText>reliable</GradientText>.
            </h2>
            <p>
              Hiring for an engineering leadership role, or want to talk delivery,
              architecture, and scaling teams? I’d love to connect.
            </p>
            <CTAs>
              <Button href={`mailto:${profile.email}`}>
                <Mail /> Email me
              </Button>
              <Button $variant="ghost" href={profile.resume} download>
                <Download /> Résumé
              </Button>
            </CTAs>
            <MetaLine>
              <i /> Open to opportunities · {profile.location}
            </MetaLine>
          </Intro>

          <Methods>
            {methods.map((m) => {
              const Icon = m.icon;
              return (
                <Row
                  key={m.label}
                  href={m.href}
                  {...(m.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <RowIcon>
                    <Icon />
                  </RowIcon>
                  <RowText>
                    <small>{m.label}</small>
                    <b>{m.value}</b>
                  </RowText>
                  <RowArrow />
                </Row>
              );
            })}
          </Methods>
        </Panel>
      </Container>
    </Section>
  );
}
