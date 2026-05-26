import { motion, useScroll, useSpring } from 'motion/react';
import styled from 'styled-components';

const Bar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 200;
  transform-origin: 0%;
  background: ${({ theme }) => theme.colors.accentGrad};
  box-shadow: 0 0 12px rgba(34, 211, 238, 0.5);
`;

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });
  return <Bar style={{ scaleX }} aria-hidden="true" />;
}
