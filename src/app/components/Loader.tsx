'use client';

import { useEffect, useState } from 'react';
import './loader.css';


export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500); // brief pause after 100%
        }
        return next;
      });
    }, 30); // progress speed

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loader-wrapper">
      <p>Loading...</p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
