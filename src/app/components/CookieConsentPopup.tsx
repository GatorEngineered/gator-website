'use client';
import { useState, useEffect } from 'react';
import '../styles/cookie.css'; // or wherever your styles are

export default function CookieConsentPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const accepted = document.cookie.includes('cookiesAccepted=true');
    if (!accepted) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    document.cookie = 'cookiesAccepted=true; max-age=31536000; path=/';
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="cookie-popup">
      <p>
        This website uses cookies to remember your preferences, track minimal usage data, and improve your browsing experience. We do not sell or share your information.
      </p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
}
