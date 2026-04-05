/*
 * OVE HETLAND — Contact Page
 * Design: «Cinematisk Natt»
 * Layout: Centered — description, contact links, and mailto CTA button
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { useFadeIn } from '@/hooks/useFadeIn';

export default function Contact() {
  const { t } = useLanguage();

  const headerRef = useFadeIn(0.1) as React.RefObject<HTMLDivElement>;
  const contentRef = useFadeIn(0.1) as React.RefObject<HTMLDivElement>;

  const px = 'clamp(1.5rem, 6vw, 6rem)';

  return (
    <div style={{ background: '#080807', minHeight: '100vh', paddingTop: '100px' }}>

      {/* Header */}
      <div
        ref={headerRef}
        className="fade-in"
        style={{ paddingLeft: px, paddingRight: px, paddingBottom: '3.5rem', borderBottom: '1px solid rgba(201, 185, 154, 0.1)' }}
      >
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9b99a', marginBottom: '1.2rem' }}>
          {t('contact.label')}
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3.5rem, 9vw, 7rem)', color: '#f0ece4', lineHeight: 0.92, letterSpacing: '-0.025em', marginBottom: '0.6rem' }}>
          {t('contact.title')}
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: '#c9b99a' }}>
          {t('contact.subtitle')}
        </p>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="fade-in"
        style={{
          paddingLeft: px,
          paddingRight: px,
          paddingTop: 'clamp(4rem, 8vh, 6rem)',
          paddingBottom: 'clamp(4rem, 8vh, 6rem)',
          maxWidth: '600px',
        }}
      >
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: '#8c8880', lineHeight: 1.95, marginBottom: '3.5rem' }}>
          {t('contact.body')}
        </p>

        {/* Contact links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
          <a
            href="mailto:ove.hetland@gmail.com"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1.15rem', color: '#c9b99a', textDecoration: 'none', borderBottom: '1px solid rgba(201, 185, 154, 0.25)', paddingBottom: '2px', transition: 'border-color 0.3s ease, color 0.3s ease', letterSpacing: '0.02em', display: 'inline-block' }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(201, 185, 154, 0.7)';
              (e.target as HTMLElement).style.color = '#f0ece4';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(201, 185, 154, 0.25)';
              (e.target as HTMLElement).style.color = '#c9b99a';
            }}
          >
            ove.hetland@gmail.com
          </a>
          <a
            href="tel:+4740622912"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1.15rem', color: '#c9b99a', textDecoration: 'none', borderBottom: '1px solid rgba(201, 185, 154, 0.25)', paddingBottom: '2px', transition: 'border-color 0.3s ease, color 0.3s ease', letterSpacing: '0.02em', display: 'inline-block' }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(201, 185, 154, 0.7)';
              (e.target as HTMLElement).style.color = '#f0ece4';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(201, 185, 154, 0.25)';
              (e.target as HTMLElement).style.color = '#c9b99a';
            }}
          >
            +47 406 22 912
          </a>
        </div>

        {/* Mailto CTA button */}
        <a
          href="mailto:ove.hetland@gmail.com?subject=Henvendelse fra nettside"
          className="btn-gold"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          {t('contact.send')}
        </a>
      </div>
    </div>
  );
}
