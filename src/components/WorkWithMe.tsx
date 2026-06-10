import { InlineWidget } from 'react-calendly';
import styled from 'styled-components';
import Reveal from './Reveal';
import Parallax from './Parallax';
import { Calendar } from './icons';
import { Container, Section, Eyebrow, SectionTitle, SectionSub } from '../styles/ui';
import { profile } from '../data/content';
import { useThemeMode } from '../context/ThemeModeContext';

const Frame = styled(Reveal)`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background:
    radial-gradient(720px 360px at 85% -10%, rgba(34, 211, 238, 0.1), transparent 60%),
    radial-gradient(640px 360px at 0% 110%, rgba(59, 130, 246, 0.12), transparent 60%),
    ${({ theme }) => theme.colors.bgSoft};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  padding: clamp(14px, 2vw, 24px);
`;

// react-calendly's iframe ignores its container's border-radius, so we round
// it ourselves by clipping a wrapper around the InlineWidget.
const WidgetWrap = styled.div`
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgSoft};
`;

export default function WorkWithMe() {
  const { mode } = useThemeMode();

  // Calendly's inline widget reads these colors from query params it builds
  // off pageSettings. They must be raw hex strings (no `#`).
  const pageSettings =
    mode === 'light'
      ? {
          backgroundColor: 'ffffff',
          primaryColor: '2563eb',
          textColor: '0b1220',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
        }
      : {
          backgroundColor: '0d0d12',
          primaryColor: '22d3ee',
          textColor: 'f4f4f5',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
        };

  return (
    <Section id="work">
      <Container>
        <Parallax>
          <Reveal>
            <Eyebrow>
              <Calendar /> Work with me
            </Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <SectionTitle>Book a slot — let’s talk</SectionTitle>
          </Reveal>
          <Reveal i={2}>
            <SectionSub>
              Hiring for an engineering leadership role, scoping a delivery
              challenge, or just curious about how I lead teams? Pick a time
              that works for you and we’ll jump on a call.
            </SectionSub>
          </Reveal>
        </Parallax>

        <Frame i={3}>
          <WidgetWrap>
            <InlineWidget
              // `key` forces a remount when the theme flips so the widget
              // re-reads pageSettings with the new colors.
              key={mode}
              url={profile.calendly}
              pageSettings={pageSettings}
              styles={{ height: '700px', minWidth: '320px' }}
            />
          </WidgetWrap>
        </Frame>
      </Container>
    </Section>
  );
}
