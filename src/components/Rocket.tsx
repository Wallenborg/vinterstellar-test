
import { useState, useEffect } from 'react';
import { RiSpaceShipFill } from 'react-icons/ri';
import './Rocket.css';

interface RocketProps {
  progress: number;            
  direction: 'down' | 'up';    
}

export const Rocket: React.FC<RocketProps> = ({ progress, direction }) => {
  const [offset, setOffset] = useState(20);

  useEffect(() => {
    const newOffset = 20 + progress * (window.innerHeight - 40);
    setOffset(newOffset);
  }, [progress]);

  return (
    <RiSpaceShipFill
      className={`rocket ${direction}`}
      style={{ bottom: `${offset}px` }}
    />
  );
};
