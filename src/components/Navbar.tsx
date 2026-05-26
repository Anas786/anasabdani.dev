import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styled from 'styled-components';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Download, Menu, X } from './icons';
import { Button, Container } from '../styles/ui';
import { navLinks, profile } from '../data/content';

const Header = styled(motion.header)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: ${({ theme }) => theme.layout.navH};
  display: flex;
  align-items: center;
  transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
  border-bottom: 1px solid transparent;

  ${({ $scrolled, theme }) =>
    $scrolled &&
    `
    background: ${theme.colors.navBg};
    backdrop-filter: ${theme.blur};
    -webkit-backdrop-filter: ${theme.blur};
    border-bottom: 1px solid ${theme.colors.border};
  `}
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 6px;
  list-style: none;

  & a {
    padding: 9px 14px;
    font-size: 0.92rem;
    color: ${({ theme }) => theme.colors.textMuted};
    border-radius: 999px;
    transition: color 0.2s ease, background 0.2s ease;
  }
  & a:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const CTA = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 760px) {
    & > a.btn-primary {
      display: none;
    }
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  width: 44px;
  height: 44px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 760px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: ${({ theme }) => theme.layout.navH};
  left: 0;
  right: 0;
  z-index: 99;
  background: ${({ theme }) => theme.colors.overlayBg};
  backdrop-filter: ${({ theme }) => theme.blur};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px 24px 26px;
  /* No overflow: hidden — motion's height: 'auto' animation was flaking and
     clipping links beneath the natural padding, so we animate opacity + y
     instead and let the menu size naturally. */

  & ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  & a:not(.btn-primary) {
    display: block;
    padding: 14px 12px;
    font-size: 1.05rem;
    color: ${({ theme }) => theme.colors.textMuted};
    border-radius: 12px;
  }
  & a:not(.btn-primary):hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
  & .btn-primary {
    width: 100%;
    margin-top: 12px;
  }

  @media (min-width: 761px) {
    display: none !important;
  }
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <Header
        $scrolled={scrolled}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Inner>
          <Brand href="#top" aria-label="Muhammad Anas — home">
            <Logo size={20} />
          </Brand>

          <nav>
            <Links>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`}>{l.label}</a>
                </li>
              ))}
            </Links>
          </nav>

          <CTA>
            <ThemeToggle />
            <Button className="btn-primary" href={profile.resume} download>
              <Download /> Résumé
            </Button>
            <HamburgerBtn
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X /> : <Menu />}
            </HamburgerBtn>
          </CTA>
        </Inner>
      </Header>

      <AnimatePresence>
        {open && (
          <MobileMenu
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ul>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              className="btn-primary"
              href={profile.resume}
              download
              onClick={() => setOpen(false)}
            >
              <Download /> Download Résumé
            </Button>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
