import { useState, useRef, useEffect } from 'react';
import './RainBackground.css';

const rand = (min, max) => Math.random() * (max - min) + min;

// Module-level helper: runs once when the component first mounts,
// not as part of the render logic
function createDrops(count) {
  return Array.from({ length: count }, (_, id) => {
    const depth = Math.random(); // 0 = far away, 1 = close
    return {
      id,
      left: rand(0, 100),
      width: 1 + depth * 1.5,
      height: 10 + depth * 22,
      duration: 1.3 - depth * 0.8,
      delay: -rand(0, 2),
      opacity: 0.25 + depth * 0.75,
    };
  });
}

export default function RainOverlay({ count = 120 }) {
  const [drops] = useState(() => createDrops(count));

    const containerRef = useRef(null);

  useEffect(() => {
    const held = { left: false, right: false };
    let rate = 1;
    let lastApplied = 1;
    let last = performance.now();
    let id;

    const isTyping = (e) =>
      e.target instanceof HTMLElement &&
      (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));

    const down = (e) => {
      if (isTyping(e)) { console.log('isTyping bailed', e.target); return; }
      if (e.key === 'ArrowRight') { held.right = true; e.preventDefault(); }
      if (e.key === 'ArrowLeft') { held.left = true; e.preventDefault(); }
    };
    const up = (e) => {
      if (e.key === 'ArrowRight') held.right = false;
      if (e.key === 'ArrowLeft') held.left = false;
    };
    const reset = () => { held.left = held.right = false; };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      let target = 1;
      if (held.right && !held.left) target = 3;
      else if (held.left && !held.right) target = 0.25;

      rate += (target - rate) * Math.min(1, dt * 6);
      if (Math.abs(target - rate) < 0.005) rate = target; // snap when close

      if (rate !== lastApplied) {
        const anims = containerRef.current?.getAnimations({ subtree: true });
        anims?.forEach((a) => { a.playbackRate = rate; });
        lastApplied = rate;
      }
      id = requestAnimationFrame(tick);
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', reset);
    id = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', reset);
    };
  }, []);
  return (
    <div className="rain-overlay" ref={containerRef} aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="drop"
          style={{
            left: `${d.left}%`,
            '--w': `${d.width}px`,
            '--h': `${d.height}px`,
            '--d': `${d.duration}s`,
            '--delay': `${d.delay}s`,
            '--o': d.opacity,
          }}
        />
      ))}
    </div>
  );
}