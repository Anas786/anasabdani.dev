import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react';
import styled, { keyframes } from 'styled-components';
import { ArrowRight, Download, MapPin, Sparkles, Layers, ChevronDown } from './icons';
import { Button, Container, GradientText } from '../styles/ui';
import { profile, experience } from '../data/content';

const current = experience.find((e) => e.current) || experience[0];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.5, 0.27, 1] } },
};

const textShimmer = keyframes`
  to { background-position: 220% center; }
`;

const portraitSpin = keyframes`
  to { transform: rotate(360deg); }
`;

const shineSweep = keyframes`
  0%, 10% { transform: translateX(-110%); }
  55%, 100% { transform: translateX(120%); }
`;

const sparkRise = keyframes`
  0%   { transform: translateY(0); opacity: 0; }
  18%  { opacity: 1; }
  85%  { opacity: 0.85; }
  100% { transform: translateY(-120px); opacity: 0; }
`;

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  padding-top: calc(${({ theme }) => theme.layout.navH} + 24px);
  padding-bottom: 60px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  width: 100%;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Left = styled(motion.div)`
  @media (max-width: 940px) {
    & > p {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const Badge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 26px;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};

  & i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18);
  }

  @media (max-width: 940px) {
    align-self: center;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.6rem, 6.4vw, 4.7rem);
  line-height: 1.02;
  margin-bottom: 22px;

  & ${GradientText} {
    background-size: 220% auto;
    animation: ${textShimmer} 7s linear infinite;
  }
`;

const Role = styled.span`
  display: block;
  font-size: clamp(1.4rem, 3vw, 2.1rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 14px;
  letter-spacing: -0.01em;
`;

const Lead = styled(motion.p)`
  font-size: clamp(1.05rem, 1.6vw, 1.2rem);
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 540px;
  margin-bottom: 34px;
`;

const Actions = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 34px;

  @media (max-width: 940px) {
    justify-content: center;
  }
`;

const Meta = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  color: ${({ theme }) => theme.colors.textFaint};
  font-size: 0.9rem;

  & span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  & svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.accent2};
  }

  @media (max-width: 940px) {
    justify-content: center;
  }
`;

const Portrait = styled(motion.div)`
  position: relative;
  justify-self: center;
  width: min(380px, 100%);

  @media (max-width: 940px) {
    grid-row: 1;
    margin-bottom: 14px;
  }

  @media (max-width: 600px) {
    width: min(300px, 100%);
  }
`;

const PortraitGlow = styled.div`
  position: absolute;
  inset: -14%;
  z-index: -1;
  background: ${({ theme }) => theme.colors.accentGrad};
  filter: blur(60px);
  opacity: 0.28;
  border-radius: 50%;

  @media (max-width: 600px) {
    inset: -6%;
  }
`;

const PortraitAurora = styled.div`
  position: absolute;
  inset: -10px;
  border-radius: 36px;
  z-index: 0;
  pointer-events: none;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(59, 130, 246, 0.85) 60deg,
    rgba(34, 211, 238, 0.85) 130deg,
    transparent 200deg,
    transparent 280deg,
    rgba(139, 92, 246, 0.7) 340deg,
    transparent 360deg
  );
  filter: blur(18px);
  opacity: 0.6;
  animation: ${portraitSpin} 12s linear infinite;
`;

const Frame = styled.div`
  position: relative;
  z-index: 1;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  aspect-ratio: 4 / 5;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 18%;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(180deg, transparent 55%, rgba(8, 8, 11, 0.55) 100%);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(
      115deg,
      transparent 38%,
      rgba(34, 211, 238, 0.22) 50%,
      transparent 62%
    );
    transform: translateX(-110%);
    animation: ${shineSweep} 7s ease-in-out infinite;
  }
`;

const Spark = styled.span<{ $variant: 's1' | 's2' | 's3' | 's4' }>`
  position: absolute;
  z-index: 3;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  background: #22d3ee;
  box-shadow: 0 0 14px 4px rgba(34, 211, 238, 0.65);
  opacity: 0;
  animation: ${sparkRise} 6s ease-in-out infinite;
  will-change: transform, opacity;

  ${({ $variant }) =>
    $variant === 's1' && `left: 9%; bottom: 4%; animation-delay: 0s;`}
  ${({ $variant }) =>
    $variant === 's2' &&
    `
    left: 88%; bottom: 2%; animation-delay: 1.5s;
    background: #3b82f6; box-shadow: 0 0 14px 4px rgba(59, 130, 246, 0.6);
  `}
  ${({ $variant }) =>
    $variant === 's3' &&
    `left: 16%; bottom: 0%; width: 4px; height: 4px; animation-delay: 3s;`}
  ${({ $variant }) =>
    $variant === 's4' &&
    `
    left: 84%; bottom: 6%; animation-delay: 4.2s;
    background: #8b5cf6; box-shadow: 0 0 14px 4px rgba(139, 92, 246, 0.55);
  `}
`;

const PortraitCard = styled(motion.div)`
  position: absolute;
  z-index: 2;
  left: -22px;
  bottom: 26px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.cardSolid};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  backdrop-filter: ${({ theme }) => theme.blur};
  box-shadow: ${({ theme }) => theme.colors.shadow};

  & b {
    display: block;
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.05rem;
  }
  & small {
    color: ${({ theme }) => theme.colors.textFaint};
    font-size: 0.78rem;
  }

  @media (max-width: 600px) {
    position: static;
    transform: none;
    left: auto;
    bottom: auto;
    margin: -34px auto 0;
    width: max-content;
    max-width: 100%;
  }
`;

const PCIcon = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 11px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ScrollCue = styled(motion.a)`
  position: absolute;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textFaint};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (max-width: 940px) {
    display: none;
  }
`;

const ScrollIcon = styled(motion.span)`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background: ${({ theme }) => theme.colors.surface};

  & svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.accent2};
  }
`;

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, -70]);
  const contentY = useTransform(scrollY, [0, 700], [0, 40]);

  return (
    <Section id="top">
      <Container>
        <Grid>
          <Left
            variants={container}
            initial="hidden"
            animate="show"
            style={reduce ? undefined : { y: contentY }}
          >
            <Badge variants={item}>
              <i /> Open to engineering leadership conversations
            </Badge>

            <Title variants={item}>
              <GradientText>{profile.shortName}</GradientText>
              <Role>{profile.role} · 10+ years</Role>
            </Title>

            <Lead variants={item}>{profile.tagline}</Lead>

            <Actions variants={item}>
              <Button href="#contact">
                Get in touch <ArrowRight />
              </Button>
              <Button $variant="ghost" href={profile.resume} download>
                <Download /> Download résumé
              </Button>
            </Actions>

            <Meta variants={item}>
              <span>
                <MapPin /> {profile.location}
              </span>
              <span>
                <Layers /> Cloud-native · Serverless · Microservices
              </span>
              <span>
                <Sparkles /> AI-assisted delivery
              </span>
            </Meta>
          </Left>

          <Portrait
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.21, 0.5, 0.27, 1], delay: 0.2 }}
            style={reduce ? undefined : { y: portraitY }}
          >
            <PortraitGlow />
            <PortraitAurora aria-hidden="true" />
            <Frame>
              <picture>
                <source srcSet="/anas.webp" type="image/webp" />
                <img
                  src="/anas.jpg"
                  alt="Muhammad Anas, Engineering Manager"
                  width={760}
                  height={1014}
                />
              </picture>
              <Spark $variant="s1" aria-hidden="true" />
              <Spark $variant="s2" aria-hidden="true" />
              <Spark $variant="s3" aria-hidden="true" />
              <Spark $variant="s4" aria-hidden="true" />
            </Frame>
            <PortraitCard
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <PCIcon>
                <img src={current.logo} alt={`${current.company} logo`} />
              </PCIcon>
              <div>
                <b>Engineering Manager</b>
                <small>Leading 3 Agile teams @ Flipdish</small>
              </div>
            </PortraitCard>
          </Portrait>
        </Grid>

        <ScrollCue
          href="#about"
          aria-label="Scroll to about section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span>Scroll</span>
          <ScrollIcon
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown />
          </ScrollIcon>
        </ScrollCue>
      </Container>
    </Section>
  );
}
