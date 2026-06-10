import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeModeProvider } from './context/ThemeModeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { SkipLink } from './styles/ui';
import Background from './components/Background';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import AI from './components/AI';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Certifications from './components/Certifications';
import WorkWithMe from './components/WorkWithMe';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <ThemeModeProvider>
      <GlobalStyles />
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <SkipLink href="#main">Skip to content</SkipLink>
      <ScrollProgress />
      <Background />
      <Navbar />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <AI />
        <Experience />
        <Skills />
        <Testimonials />
        <Certifications />
        <WorkWithMe />
        <Contact />
      </main>
      <Footer />
      <SpeedInsights />
    </ThemeModeProvider>
  );
}
