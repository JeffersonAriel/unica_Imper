import { useState, useRef } from 'react';

export function useMagneticButton(strength: number = 20) {
  const ref = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const boundingRect = ref.current?.getBoundingClientRect();
    
    if (boundingRect) {
      const { width, height, left, top } = boundingRect;
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      
      setPosition({
        x: (middleX / width) * strength,
        y: (middleY / height) * strength,
      });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return { ref, position, handleMouse, reset };
}
