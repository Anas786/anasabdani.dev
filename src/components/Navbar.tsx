import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import styled from 'styled-components';
import Logo from './Logo';
import Magnetic from './Magnetic';
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
    position: relative;
    display: inline-block;
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
  & a[aria-current='true'] {
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const ActivePill = styled(motion.span)`
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CTA = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 760px) {
    & a.btn-primary {
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
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const lastY = useRef(0);
  const reduceMotion = useReducedMotion();

  // Auto-hide: tuck the bar away on deliberate downward scrolls past the
  // hero, bring it back on any upward intent or near the top.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - lastY.current;
      if (open || y <= 180 || delta < -6) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  // Scroll-spy: a thin band around the viewport's middle decides which
  // section is "current" ('top' included so the pill clears on the hero).
  useEffect(() => {
    const ids = ['top', ...navLinks.map((l) => l.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (open) setHidden(false);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navHidden = hidden && !open && !reduceMotion;

  return (
    <>
      <Header
        $scrolled={scrolled}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: navHidden ? '-105%' : 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        /* Keyboard focus must never land in an off-screen header. */
        onFocusCapture={() => setHidden(false)}
      >
        <Inner>
          <Brand href="#top" aria-label="Muhammad Anas — home">
            <Logo size={20} />
          </Brand>

          <nav>
            <Links>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} aria-current={l.id === activeId || undefined}>
                    {l.id === activeId && (
                      <ActivePill
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              ))}
            </Links>
          </nav>

          <CTA>
            <ThemeToggle />
            <Magnetic strength={0.2}>
              <Button className="btn-primary" href={profile.resume} download>
                <Download /> Résumé
              </Button>
            </Magnetic>
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
