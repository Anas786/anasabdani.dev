import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeModeProvider } from './context/ThemeModeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { SkipLink } from './styles/ui';
import Background from './components/Background';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import CaseStudyOnboarding from './pages/CaseStudyOnboarding';
import CaseStudyReliability from './pages/CaseStudyReliability';

/* Client-side navigations keep the previous scroll position by default;
   jump to the top (or to the target anchor) like a full page load would. */
function ScrollReset() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <ThemeModeProvider>
      <GlobalStyles />
      <SkipLink href="#main">Skip to content</SkipLink>
      <Cursor />
      <ScrollProgress />
      <Background />
      <ScrollReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/ai-assisted-onboarding" element={<CaseStudyOnboarding />} />
        <Route
          path="/case-studies/reliability-observability"
          element={<CaseStudyReliability />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </ThemeModeProvider>
  );
}
