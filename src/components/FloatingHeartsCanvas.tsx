import React, { useEffect, useRef } from 'react';

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
  char: string;
  rotation: number;
  rotationSpeed: number;
}

export const FloatingHeartsCanvas: React.FC<{ isEnabled: boolean }> = ({ isEnabled }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const symbols = ['💙', '🩵', '✨', '👑', '🎂', '⭐', '🤍', '🎉', '🥰'];
    let items: FloatingItem[] = [];
    let animationFrameId: number;

    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < 22; i++) {
      items.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 14 + 14,
        speed: Math.random() * 0.6 + 0.35,
        drift: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.45 + 0.25,
        char: symbols[Math.floor(Math.random() * symbols.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.7,
      });
    }

    const update = () => {
      items.forEach((item) => {
        item.y -= item.speed;
        item.x += item.drift;
        item.rotation += item.rotationSpeed;

        if (item.y < -40) {
          item.y = window.innerHeight + 20;
          item.x = Math.random() * window.innerWidth;
        }
        if (item.x < -40) item.x = window.innerWidth + 20;
        if (item.x > window.innerWidth + 40) item.x = -20;
      });

      if (containerRef.current) {
        const domNodes = containerRef.current.children;
        for (let i = 0; i < items.length && i < domNodes.length; i++) {
          const el = domNodes[i] as HTMLElement;
          const item = items[i];
          el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0) rotate(${item.rotation}deg)`;
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  const defaultItems = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    char: ['💙', '🩵', '✨', '👑', '🎂', '⭐', '🤍', '🎉', '🥰'][i % 9],
  }));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-80"
      aria-hidden="true"
    >
      {defaultItems.map((item) => (
        <span
          key={item.id}
          className="absolute top-0 left-0 text-xl transition-opacity duration-300 will-change-transform"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(96,165,250,0.25))',
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
};
