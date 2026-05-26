import styled from 'styled-components';
import Logo from './Logo';
import { Mail, Linkedin, Github } from './icons';
import { Container } from '../styles/ui';
import { profile } from '../data/content';

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

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textFaint};
  font-size: 0.88rem;
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
`;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <FooterEl>
      <Inner>
        <Brand href="#top" aria-label="Muhammad Anas — home">
          <Logo size={18} animated={false} />
        </Brand>

        <Meta>
          © {year} Muhammad Anas · {profile.domain}
        </Meta>

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
        </Socials>
      </Inner>
    </FooterEl>
  );
}
