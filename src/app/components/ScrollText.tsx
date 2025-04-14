'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/scrollText.css';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollText() {
  const containerRef = useRef<HTMLDivElement>(null);

  const startAnimations = () => {
    if (!containerRef.current) return;

    gsap.set(containerRef.current, { autoAlpha: 1 });

    const lines = gsap.utils.toArray(containerRef.current.querySelectorAll('p'));

    lines.forEach((line: any, index) => {
      const speed = (index + 1) * 10;
    
      // Parallax scroll-in
      gsap.fromTo(
        line,
        { opacity: 0, y: speed },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: true,
          },
        }
      );
    
      gsap.to(line, {
        y: '+=5',
        x: '+=8', // ← horizontal drift
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 4,
        delay: index * 0.2,
      });
      
      
    });
    
  };

  useEffect(() => {
    gsap.set(containerRef.current, { autoAlpha: 0 });

    const classIsPresent = document.body.classList.contains('scroll-indicator-hidden');

    if (classIsPresent) {
      startAnimations();
    } else {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class' &&
            document.body.classList.contains('scroll-indicator-hidden')
          ) {
            startAnimations();
            observer.disconnect();
            break;
          }
        }
      });

      observer.observe(document.body, { attributes: true });

      setTimeout(() => {
        if (document.body.classList.contains('scroll-indicator-hidden')) {
          startAnimations();
          observer.disconnect();
        }
      }, 4000);
    }
  }, []);

  return (
    <div ref={containerRef} className="scroll-text">
      <p>Overwhelmed by buzzwords like AI, blockchain, and Web3?</p>
      <p>Your business still needs conversions, loyalty, and real results — without the tech headache.</p>
      <p>Reach the next generation while keeping your current audience engaged and confident.</p>
      <p>Gator Engineered cuts through the fog, helping brands rise above complexity with clarity and elegance.</p>
      <p>The storm is passing — and you’re not getting left in the clouds.</p>
    </div>
  );
}
