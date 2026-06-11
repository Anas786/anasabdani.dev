import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import styled, { useTheme } from 'styled-components';

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  @media (pointer: coarse) {
    display: none;
  }
`;

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const LINK_DIST = 120;
const CURSOR_DIST = 170;

/**
 * A faint constellation drifting behind the page. Nearby points link up, and
 * points within reach of the cursor connect to it and get a gentle nudge away,
 * so the field ripples wherever the visitor moves. Skipped entirely under
 * prefers-reduced-motion and hidden on touch devices.
 */
export default function Particles() {
  const reduce = useReducedMotion();
  const theme = useTheme();
  const ref = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  const mode = theme.mode;

  // JS mirror of the CSS pointer guard — without it the rAF loop would keep
  // simulating into a display:none canvas on phones.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener('change', update);
    return () => fine.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduce || !enabled) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dark = mode === 'dark';
    const dotColor = dark ? 'rgba(148, 197, 253, 0.55)' : 'rgba(37, 99, 235, 0.4)';
    const lineRGB = dark ? '96, 165, 250' : '37, 99, 235';
    const lineAlpha = dark ? 0.14 : 0.1;

    let raf = 0;
    let w = 0;
    let h = 0;
    let points: Point[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(80, Math.round((w * h) / 24000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of points) {
        // Gentle push away from the cursor.
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < CURSOR_DIST && dm > 0.001) {
          const force = ((CURSOR_DIST - dm) / CURSOR_DIST) * 0.06;
          p.vx += (dxm / dm) * force;
          p.vy += (dym / dm) * force;
        }
        // Drift, with light damping so cursor kicks fade out.
        p.vx *= 0.985;
        p.vy *= 0.985;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed < 0.12) {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${lineRGB}, ${(1 - d / LINK_DIST) * lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < CURSOR_DIST) {
          ctx.strokeStyle = `rgba(${lineRGB}, ${(1 - dm / CURSOR_DIST) * lineAlpha * 2.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduce, enabled, mode]);

  if (reduce || !enabled) return null;
  return <Canvas ref={ref} aria-hidden="true" />;
}
