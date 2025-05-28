
import { useMemo } from 'react';
import './Stars.css';

interface StarsProps {
  opacity: number;
}

interface Star {
  x: number;      
  y: number;      
  size: number;   
  delay: number;  
}

const NUM_STARS = 50;

export const Stars: React.FC<StarsProps> = ({ opacity }) => {
 
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: NUM_STARS }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,   
        delay: Math.random() * 3,      
      })),
    []
  );

  return (
    <div className="stars-container" style={{ opacity }}>
      {stars.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: `${s.y}vh`,
            left: `${s.x}vw`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
