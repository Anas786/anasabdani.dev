import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Logo from './Logo';
import Magnetic from './Magnetic';
import { Mail, Linkedin, Github, ArrowUp } from './icons';
import { Container } from '../styles/ui';
import { profile } from '../data/content';

const karachiTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Karachi',
  hour: '2-digit',
  minute: '2-digit',
});

const FooterEl = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 40px 0;
  margin-top: clamp(40px, 7vw, 90px);
`;

const Inner = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
`;

const MetaWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 14px;
`;

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textFaint};
  font-size: 0.88rem;
`;

/* Transform/opacity only — an animated box-shadow would repaint every frame
   for the lifetime of the page. */
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(2.6); opacity: 0; }
`;

const LocalTime = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textFaint};
  font-size: 0.88rem;
  font-variant-numeric: tabular-nums;
`;

const FootNav = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textFaint};

  & a {
    color: ${({ theme }) => theme.colors.textMuted};
    transition: color 0.2s ease;
  }
  & a:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const LiveDot = styled.span`
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid #22c55e;
    animation: ${pulse} 2.4s ease-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0;
    }
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 10px;

  & a {
    width: 42px;
    height: 42px;
    border-radius: 11px;
    display: grid;
    place-items: center;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textMuted};
    transition: transform 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  & a:hover {
    transform: translateY(-3px);
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.accent};
  }
  & svg {
    width: 19px;
    height: 19px;
  }
  & a[href='#top'] svg {
    transition: transform 0.2s ease;
  }
  & a[href='#top']:hover svg {
    transform: translateY(-2px);
  }
`;

export default function Footer() {
  const year = new Date().getFullYear();
  // Seeded client-side only — prerendered HTML would otherwise bake in the
  // build-time clock and mismatch on hydration.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(karachiTime.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <FooterEl>
      <Inner>
        <Brand href="#top" aria-label="Muhammad Anas — home">
          <Logo size={18} animated={false} />
        </Brand>

        <MetaWrap>
          {/* suppressHydrationWarning: the year is baked in at build time and
              only diverges if a December build is browsed in January. */}
          <Meta suppressHydrationWarning>
            © {year} Muhammad Anas · {profile.domain}
          </Meta>
          <LocalTime>
            <LiveDot aria-hidden="true" />
            Karachi{time ? ` · ${time}` : ''}
          </LocalTime>
          <FootNav aria-label="Site pages">
            <RouterLink to="/case-studies">Case studies</RouterLink>
            <span aria-hidden="true">·</span>
            <RouterLink to="/services">Services</RouterLink>
          </FootNav>
        </MetaWrap>

        <Socials>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail />
          </a>
          <Magnetic strength={0.3}>
            <a href="#top" aria-label="Back to top">
              <ArrowUp />
            </a>
          </Magnetic>
        </Socials>
      </Inner>
    </FooterEl>
  );
}
