import  { useMemo } from 'react';
import './Hero.css';

interface Star {
  x: number;
  y: number;
  size: number;
}

export const Hero: React.FC = () => {
 
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 50 }, () => ({
        x: Math.random() * 100,      
        y: Math.random() * 100,     
        size: Math.random() * 2 + 1  
      })),
    []
  );

  return (
    <section className="hero">
      {/* Stjärnor över hela hero */}
      <div className="hero-stars">
        {stars.map((star, i) => (
          <span
            key={i}
            className="hero-star"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
          />
        ))}
      </div>

      {/* Själva rubriken */}
      <h1 className="hero-title">Star to Star</h1>
    </section>
  );
};
