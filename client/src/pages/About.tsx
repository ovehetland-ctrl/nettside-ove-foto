/*
 * OVE HETLAND — About Page
 * Design: «Cinematisk Natt»
 * Layout: Asymmetric — large display text left, portrait right
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { useFadeIn } from '@/hooks/useFadeIn';

const PORTRAIT_IMAGE = 'https://res.cloudinary.com/dqdupx0zl/image/upload/v1775333282/2342724_etfprm.webp';

export default function About() {
  const { t } = useLanguage();
  const headerRef = useFadeIn(0.1) as React.RefObject<HTMLDivElement>;
  const textRef = useFadeIn(0.1) as React.RefObject<HTMLDivElement>;
  const statsRef = useFadeIn(0.1) as React.RefObject<HTMLDivElement>;
  const imageRef = useFadeIn(0.1) as React.RefObject<HTMLDivElement>;

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
          {t('about.label')}
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3.5rem, 9vw, 8rem)', color: '#f0ece4', lineHeight: 0.92, letterSpacing: '-0.025em', marginBottom: '0.6rem' }}>
          {t('about.title')}
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem, 2.5vw, 1.6rem)', color: '#c9b99a' }}>
          {t('about.subtitle')}
        </p>
      </div>

      {/* Main content */}
      <div
        style={{ paddingLeft: px, paddingRight: px, paddingTop: 'clamp(4rem, 8vh, 6rem)', paddingBottom: 'clamp(4rem, 8vh, 6rem)' }}
      >
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'clamp(3rem, 6vw, 6rem)' }}
        >
          {/* Left: Text */}
          <div ref={textRef} className="fade-in lg:col-span-7">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.3rem, 2.8vw, 2rem)', color: '#f0ece4', lineHeight: 1.5, marginBottom: '2.5rem' }}>
              {t('about.p1')}
            </p>
            <div style={{ width: '36px', height: '1px', background: 'rgba(201, 185, 154, 0.5)', marginBottom: '2.5rem' }} />
            {['about.p2', 'about.p3', 'about.p4'].map((key) => (
              <p key={key} style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: '#8c8880', lineHeight: 1.95, marginBottom: '1.6rem' }}>
                {t(key)}
              </p>
            ))}

            {/* Stats */}
            <div
              ref={statsRef}
              className="fade-in"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(201, 185, 154, 0.1)' }}
            >
              {[
                { num: 'about.stat1.num', label: 'about.stat1.label' },
                { num: 'about.stat2.num', label: 'about.stat2.label' },
                { num: 'about.stat3.num', label: 'about.stat3.label' },
              ].map((stat, i) => (
                <div key={i}>
                  <span style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#c9b99a', lineHeight: 1, marginBottom: '0.5rem' }}>
                    {t(stat.num)}
                  </span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8c8880' }}>
                    {t(stat.label)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Portrait */}
          <div ref={imageRef} className="fade-in lg:col-span-5">
            <div
              style={{
                width: '100%',
                background: '#0d0d0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={PORTRAIT_IMAGE}
                alt="Ove Hetland — Makrofotograf"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                }}
                loading="lazy"
              />
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.65rem', color: '#3a3a38', letterSpacing: '0.08em', fontStyle: 'italic', marginTop: '0.75rem' }}>
              Foto: Anne Friederike Borchert
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
