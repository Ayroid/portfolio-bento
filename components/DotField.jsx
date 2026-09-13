'use client';

import { useEffect, useId, useRef, memo } from 'react';

import './DotField.css';

const TWO_PI = Math.PI * 2;
// Below this much movement per frame (px) a dot counts as at rest.
const REST = 0.01;

/** @type {import('react').NamedExoticComponent<Record<string, any>>} */
const DotField = memo(({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo = 'rgba(180, 151, 207, 0.25)',
  glowColor = '#120F17',
  activeColor = '#ef4444',
  activeRadius = 30,
  ...rest
}) => {
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const glowRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const propsRef = useRef({});
  propsRef.current = { dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, sparkle, waveAmplitude, gradientFrom, gradientTo, activeColor, activeRadius };
  const rebuildRef = useRef(null);
  // useId is stable across server and client render (Math.random broke hydration);
  // strip its punctuation so it's safe inside url(#...).
  const glowId = `dot-field-glow-${useId().replace(/[^\w-]/g, '')}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer;

    // The loop only runs while something is changing: wake() starts it, and
    // tick() stops rescheduling itself once every dot, the glow and the
    // engagement have settled. Idle, the field costs nothing.
    let running = false;
    function wake() {
      if (running) return;
      running = true;
      rafRef.current = requestAnimationFrame(tick);
    }

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    function doResize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = {
        w,
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };

      buildDots(w, h);
      wake();
    }

    function buildDots(w, h) {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots = new Array(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    }

    // Measure live: the offset cached on window resize goes stale when the
    // field moves (e.g. the footer band shifting as page content changes).
    // Only react while the cursor is over the field; outside it the cursor is
    // parked far away. prev is reset on enter/leave so the jump isn't read as speed.
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const m = mouseRef.current;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        if (m.x === -9999) {
          m.prevX = x;
          m.prevY = y;
        }
        m.x = x;
        m.y = y;
      } else if (m.x !== -9999) {
        m.x = m.y = m.prevX = m.prevY = -9999;
      } else {
        return; // still outside: nothing changed, stay asleep
      }
      wake();
    }

    // Eased once per frame; only the non-bulge mode reads it.
    function updateMouseSpeed() {
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }

    let frameCount = 0;
    // Displaced dots this frame, flat [x, y, alpha, ...], redrawn on top in activeColor.
    const active = [];

    function tick() {
      frameCount++;
      updateMouseSpeed();
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      const len = dots.length;
      const t = frameCount * 0.02;

      // Engaged for as long as the cursor is over the field (it's parked at
      // -9999 outside), not only while it moves. Both eases snap to their
      // target once close, so they can settle and let the loop sleep.
      const targetEngagement = m.x === -9999 ? 0 : 1;
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (Math.abs(targetEngagement - engagement.current) < 0.001) engagement.current = targetEngagement;
      const eng = engagement.current;

      glowOpacity.current += (eng - glowOpacity.current) * 0.08;
      if (Math.abs(eng - glowOpacity.current) < 0.001) glowOpacity.current = eng;

      if (glowEl) {
        glowEl.setAttribute('cx', m.x);
        glowEl.setAttribute('cy', m.y);
        glowEl.style.opacity = glowOpacity.current;
      }

      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, p.gradientFrom);
      grad.addColorStop(1, p.gradientTo);
      ctx.fillStyle = grad;

      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const rad = p.dotRadius / 2;
      const isBulge = p.bulgeOnly;
      const arSq = p.activeRadius * p.activeRadius;
      let moving = false;

      ctx.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const ox = d.sx;
        const oy = d.sy;
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);
          if (isBulge) {
            const t = 1 - dist / cr;
            const push = t * t * p.bulgeStrength * eng;
            const angle = Math.atan2(dy, dx);
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
          } else {
            const angle = Math.atan2(dy, dx);
            const move = (500 / dist) * (m.speed * p.cursorForce);
            d.vx += Math.cos(angle) * -move;
            d.vy += Math.sin(angle) * -move;
          }
        } else if (isBulge) {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        if (!isBulge) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
          if (Math.abs(d.vx) + Math.abs(d.vy) > REST) moving = true;
        }

        if (Math.abs(d.sx - ox) + Math.abs(d.sy - oy) > REST) moving = true;

        let drawX = d.sx;
        let drawY = d.sy;
        if (p.waveAmplitude > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
        }

        // Only dots within activeRadius of the cursor turn red, strongest at the
        // centre; scaling by engagement fades them out when the cursor leaves.
        if (eng > 0.01 && distSq < arSq) {
          active.push(drawX, drawY, (1 - Math.sqrt(distSq) / p.activeRadius) * eng);
        }

        if (p.sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
          if ((hash % 100) < 3) {
            ctx.moveTo(drawX + rad * 1.8, drawY);
            ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
          } else {
            ctx.moveTo(drawX + rad, drawY);
            ctx.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        } else {
          ctx.moveTo(drawX + rad, drawY);
          ctx.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      ctx.fill();

      if (active.length) {
        ctx.fillStyle = p.activeColor;
        for (let j = 0; j < active.length; j += 3) {
          ctx.globalAlpha = active[j + 2];
          ctx.beginPath();
          ctx.arc(active[j], active[j + 1], rad, 0, TWO_PI);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        active.length = 0;
      }

      // Wave and sparkle animate on their own, so those modes never sleep.
      const settled =
        !moving &&
        m.speed === 0 &&
        engagement.current === targetEngagement &&
        glowOpacity.current === eng &&
        !p.sparkle &&
        !(p.waveAmplitude > 0);

      if (settled) {
        running = false;
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    doResize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) {
        buildDots(w, h);
        wake();
      }
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div className="dot-field-container" {...rest}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowId})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;
