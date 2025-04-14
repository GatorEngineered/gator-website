import { useState, useEffect } from 'react';
import '../styles/footer.css';

export default function TermsPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const accepted = document.cookie.includes('acceptedTerms=true');
    if (!accepted) {
      setShowPopup(true);
    }
  }, []);

  const handleAgree = () => {
    if (!agreed) return;
    setFadeOut(true); // trigger fade animation
    document.cookie = 'acceptedTerms=true; max-age=31536000; path=/'; // 1 year cookie
    setTimeout(() => setShowPopup(false), 500); // wait for fade to finish
  };

  if (!showPopup) return null;

  return (
    <div className={`tos-popup slide-up-bar ${fadeOut ? 'fade-out' : ''}`}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        I agree to the{' '}
        <a href="/terms" target="_blank">Terms of Service</a> and{' '}
        <a href="/privacy" target="_blank">Privacy Policy</a>.
      </label>
      <button
        className="tos-popup-close"
        onClick={handleAgree}
        disabled={!agreed}
      >
        Accept
      </button>
    </div>
  );
}
