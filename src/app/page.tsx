'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import StickyTitle from '@/components/StickyTitle';
import ScrollIndicator from '@/components/ScrollIndicator';

// Lazy-loaded components (no SSR)
const StormScene = dynamic(() => import('@/components/StormScene'), { ssr: false });
const ScrollText = dynamic(() => import('@/components/ScrollText'), { ssr: false });
const FoggyMessage = dynamic(() => import('@/components/FoggyMessage'), { ssr: false });
const ClearingSection = dynamic(() => import('@/components/ClearingSection'), { ssr: false });
const TabSection = dynamic(() => import('@/components/Services'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const TermsPopup = dynamic(() => import('@/components/TermsPopup'), { ssr: false });
const CookieConsentPopup = dynamic(() => import('@/components/CookieConsentPopup'), { ssr: false });


export default function HomePage() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (loadingComplete) {
      window.scrollTo(0, 0);
    }
  }, [loadingComplete]);

  return (
    <>
      {/* 1. Loader appears first */}
      {!loadingComplete && <Loader onComplete={() => setLoadingComplete(true)} />}

      {/* 2. After loading: sticky title, scroll cue, then lazy-loaded content */}
      {loadingComplete && (
        <>


          <StickyTitle />
          <ScrollIndicator />

          {/* 3. StormScene Background */}
          <StormScene />

          {/* 4. Spacer before scroll text appears */}
          <div style={{ height: '120vh' }} />

          {/* 5. Animated scroll text lines */}
          <ScrollText />

          {/* 6. Foggy Section (next scene) */}
          <FoggyMessage />

          {/* Spacer to ensure scroll works */}
        

          <ClearingSection />


          <TabSection />


          <ContactSection />

          <Footer />

          <TermsPopup />

          <CookieConsentPopup />
        </>
      )}
    </>
  );
}
