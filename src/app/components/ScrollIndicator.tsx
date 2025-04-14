'use client';

import { useEffect, useState, useRef } from 'react';
import '../styles/scrollIndicator.css';

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  const lastScrollPos = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // If scrolling down, hide
      if (currentScrollPos > lastScrollPos.current && currentScrollPos > 100) {
        setVisible(false);
        document.body.classList.add('scroll-indicator-hidden');
      }

      // If scrolling up near top, show
      else if (currentScrollPos < lastScrollPos.current || currentScrollPos <= 100) {
        setVisible(true);
        document.body.classList.remove('scroll-indicator-hidden');
      }

      // Save current scroll position for next scroll event
      lastScrollPos.current = currentScrollPos;
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`scroll-indicator ${visible ? 'show' : 'hide'}`}>
      <div className="circle">
        <span className="arrow">↓</span>
      </div>
      <p className="scrolltext">Scroll Down</p>
    </div>
  );
}
