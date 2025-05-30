import  { useMemo } from 'react';
import './Hero.css';

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;  
}

export const Hero: React.FC = () => {
 
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 50 }, () => ({
        x: Math.random() * 100,      
        y: Math.random() * 100,     
        size: Math.random() * 2 + 1,  
        delay: Math.random() * 3,   
      })),
    []
  );

  return (
    <section className="hero">
      <div className="hero-stars">
        {stars.map((star, i) => (
          <span
            key={i}
            className="hero-star"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
      <h1 className="hero-title">Star to Star</h1>
    </section>
  );
};
