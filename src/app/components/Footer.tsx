import { useState } from 'react';
import '../styles/footer.css';

const Footer = () => {
  const [popupContent, setPopupContent] = useState<'terms' | 'privacy' | null>(null);

  const closePopup = () => setPopupContent(null);

  const termsText = `
    Last updated: April 12, 2025

    Welcome to Gator Engineered Technologies!

    By using this website, you agree to the following terms:

    1. Use at Your Own Risk  
       This website is provided "as is" without warranties of any kind. We are not responsible for any damages that may occur from using this site.

    2. Content Ownership  
       All text, graphics, and media on this site belong to Gator Engineered Technologies unless otherwise stated.

    3. No Misuse  
       You agree not to misuse this site or try to hack, copy, or harm it in any way.

    4. Changes to Terms  
       We may update these terms at any time. It’s your responsibility to review them periodically.

    If you do not agree to these terms, please do not use our website.
  `;

  const privacyText = `
    Last updated: April 12, 2025

    At Gator Engineered Technologies, your privacy is important to us.

    1. What We Collect  
       We may collect basic information like your name, email, or message when you submit a form.

    2. How We Use It  
       We only use this information to respond to your messages or provide services. We do not sell or share your data.

    3. Cookies & LocalStorage  
       This site may use cookies or localStorage to remember your preferences or track simple things like consent. We do not use third-party tracking.

    4. Your Rights  
       You can contact us at any time to request that we delete your data.

    5. Changes to This Policy  
       We may update this policy as needed. Please check back for any changes.

    If you have questions about your privacy, email us at [your@email.com].
  `;

  return (
    <footer className="footer">
      <p>
        Made with creative <span className="gator">🐊</span>{' '}
        <span className="chomps">chomps</span> in mind by{' '}
        <strong>Gator Engineered Technologies</strong>.
      </p>

      <div className="footer-links">
        <button onClick={() => setPopupContent('terms')}>Terms of Service</button>
        <span>|</span>
        <button onClick={() => setPopupContent('privacy')}>Privacy Policy</button>
      </div>

      {popupContent && (
        <div className="footer-popup">
          <button className="footer-popup-close" onClick={closePopup}>
            ✖
          </button>
          <h3>{popupContent === 'terms' ? 'Terms of Service' : 'Privacy Policy'}</h3>
          <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
            {popupContent === 'terms' ? termsText : privacyText}
          </pre>
        </div>
      )}
    </footer>
  );
};

export default Footer;
