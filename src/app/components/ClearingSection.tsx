'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/clearingsection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ClearingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
  
    const image = contentRef.current.querySelector('img');
    const text = contentRef.current.querySelector('.side-text');
  
    if (!image || !text) {
      console.warn('Could not find image or text for animation');
      return;
    }
  
    gsap.set([image, text], { opacity: 0, y: 100 }); // Start hidden
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',   // When section top reaches center of screen
        toggleActions: 'play none none none',
        once: true,            // Play once only
      },
    });
  
    tl.to(image, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' })
      .to(text, { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.8');
  }, []);

  return (
    <section className="clearing-section" ref={sectionRef}>

<div className="clearing-content" ref={contentRef}>
        <img src="/Reva_profile.jpg" alt="Profile" />
        <div className="side-text">
  <p>
    As a full stack developer and stay-at-home mom, I’m devoted to empowering small businesses — especially those often left behind in the digital shift.
    My mission is to bring high-level tech and clarity to those who deserve it most.
  </p>
</div>

<div className="clearing-intro">
  <p>
    We’re stepping into a new era of creation, connection, and commerce. <br />
    Just like the early days of the internet — the possibilities are bigger than they seem. <br />
    Your competitors won’t be ready. But you will be.
  </p>
</div>


      
      </div>
    </section>
  );
}
