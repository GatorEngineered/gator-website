'use client';

import Head from 'next/head';
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
      <Head>
        {/* Open Graph Tags */}
        <meta property="og:title" content="Gator Engineered Tech | Bold, AI-Powered Websites" />
        <meta
          property="og:description"
          content="We build advanced websites using AI, blockchain, crypto & more. No templates. Just future-ready tech."
        />
        <meta property="og:image" content="https://gatorengineered.tech/og-image.jpg" />
        <meta property="og:url" content="https://gatorengineered.tech" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Gator Engineered Technologies",
              "image": "https://gatorengineered.tech/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "FL",
                "addressCountry": "US"
              },
              "url": "https://gatorengineered.tech",
              "description":
                "Web design & development company offering advanced, custom websites using blockchain, AI, and crypto for businesses worldwide.",
            }),
          }}
        />
      </Head>

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
