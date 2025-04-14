'use client';

import { useEffect, useState } from 'react';
import './stickyTitle.css'; // We’ll create this next

export default function StickyTitle() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 500); // wait 0.5s after loader

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`sticky-title ${visible ? 'show' : ''}`}>
      Gator Engineered Technologies
    </div>
  );
}
