import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import AI from '../components/AI';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Testimonials from '../components/Testimonials';
import Certifications from '../components/Certifications';
import WorkWithMe from '../components/WorkWithMe';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// Module-level so client-side route changes back to the home page don't
// replay the intro loader; it runs once per real page load.
let hasLoaded = false;

export default function Home() {
  const [loading, setLoading] = useState(() => !hasLoaded);

  useEffect(() => {
    if (hasLoaded) return;
    const timer = setTimeout(() => {
      hasLoaded = true;
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
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
    </>
  );
}
