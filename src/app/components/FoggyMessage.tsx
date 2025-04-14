'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FoggyCanvas from './FoggyCanvas';
import './foggyMessage.css';

gsap.registerPlugin(ScrollTrigger); // ✅ Required!

export default function FoggyMessage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section className="foggy-section" ref={sectionRef}>
      <FoggyCanvas />
      
      <div className="foggy-message-content">
      <div className="foggy-main-text">
  <p>Modern customers expect more than good design.</p>
  <p>They’re drawn to substance — stories that speak to their values.</p>
  <p>A trusted brand isn’t built overnight. It’s nurtured through clarity, consistency, and care.</p>
  <p>Genuine connection is what transforms visitors into loyal believers.</p>
</div>
<p className="foggy-subline">Like fog, it draws people closer.</p>


      </div>
    </section>
  );
}
