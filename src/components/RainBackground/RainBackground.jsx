import { useState } from 'react';
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

  return (
    <div className="rain-overlay" aria-hidden="true">
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