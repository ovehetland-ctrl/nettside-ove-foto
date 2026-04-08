/*
 * OVE HETLAND — Gallery Page
 * Design: «Cinematisk Natt»
 * Layout: Fullscreen immersive slideshow
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const GALLERY_IMAGES = [
  {
    src: 'https://res.cloudinary.com/dqdupx0zl/image/upload/v1775231930/2024-12-18-11.42.29_ZS_PMax_UDR-2-Edit_tshbhd.jpg',
    titleKey: 'gallery.img1.title',
    subtitleKey: 'gallery.img1.subtitle',
    scaleKey: 'gallery.img1.scale',
  },
  {
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663499575388/k9G3EiRAAtsP9HKo2g57xn/vassarve_e2e8e3dc.webp',
    titleKey: 'gallery.img2.title',
    subtitleKey: 'gallery.img2.subtitle',
    scaleKey: 'gallery.img2.scale',
  },
  {
    src: 'https://res.cloudinary.com/dqdupx0zl/image/upload/v1775218878/fagerklokke_1_xdhhnk.jpg',
    titleKey: 'gallery.img3.title',
    subtitleKey: 'gallery.img3.subtitle',
    scaleKey: 'gallery.img3.scale',
  },
  {
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663499575388/mVQJLeLPN6ijFsQp9eE8pZ/prestekrage77_a5d1b07e.webp',
    titleKey: 'gallery.img4.title',
    subtitleKey: 'gallery.img4.subtitle',
    scaleKey: 'gallery.img4.scale',
  },
  {
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663499575388/k9G3EiRAAtsP9HKo2g57xn/markjordbaer_c7fc8b07.webp',
    titleKey: 'gallery.img5.title',
    subtitleKey: 'gallery.img5.subtitle',
    scaleKey: 'gallery.img5.scale',
  },
  {
    src: 'https://res.cloudinary.com/dqdupx0zl/image/upload/v1775414981/2025-01-14-10.24.16_ZS_PMax_UDR-Edit_ffvf8y.jpg',
    titleKey: 'gallery.img6.title',
    subtitleKey: 'gallery.img6.subtitle',
    scaleKey: 'gallery.img6.scale',
  },
  {
    src: 'https://res.cloudinary.com/dqdupx0zl/image/upload/v1775414981/2025-05-23-12.12.14_ZS_PMax_UDR-Edit_evwfbb.jpg',
    titleKey: 'gallery.img7.title',
    subtitleKey: 'gallery.img7.subtitle',
    scaleKey: 'gallery.img7.scale',
  },
  {
    src: 'https://res.cloudinary.com/dqdupx0zl/image/upload/v1775415637/best_av_best_bakgrunn9_i5z4ec.jpg',
    titleKey: 'gallery.img8.title',
    subtitleKey: 'gallery.img8.subtitle',
    scaleKey: 'gallery.img8.scale',
  },
  {
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663499575388/k9G3EiRAAtsP9HKo2g57xn/rughavre_6d1e0076.webp',
    titleKey: 'gallery.img9.title',
    subtitleKey: 'gallery.img9.subtitle',
    scaleKey: 'gallery.img9.scale',
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [uiVisible, setUiVisible] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const uiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = GALLERY_IMAGES.length;

  const resetUiTimer = useCallback(() => {
    if (uiTimerRef.current) clearTimeout(uiTimerRef.current);
    setUiVisible(true);
    uiTimerRef.current = setTimeout(() => setUiVisible(false), 3200);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      const newIndex = ((index % total) + total) % total;
      if (newIndex === current) return;
      setTransitioning(true);
      setPrevIndex(current);
      setTimeout(() => {
        setCurrent(newIndex);
        setPrevIndex(null);
        setTransitioning(false);
      }, 700);
    },
    [transitioning, total, current]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false);
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
        return;
      }
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev, lightboxOpen]);

  useEffect(() => {
    resetUiTimer();
    const handleMouseMove = () => resetUiTimer();
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (uiTimerRef.current) clearTimeout(uiTimerRef.current);
    };
  }, [resetUiTimer]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const img = GALLERY_IMAGES[current];

  return (
    <>
      <div
        style={{ position: 'fixed', inset: 0, background: '#080807', overflow: 'hidden' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => resetUiTimer()}
      >
        {GALLERY_IMAGES.map((image, i) => {
          const isActive = i === current;
          const isPrev = i === prevIndex;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? (transitioning ? 0 : 1) : isPrev ? (transitioning ? 1 : 0) : 0,
                transition: 'opacity 0.7s ease',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
              }}
            >
              <img
                src={image.src}
                alt={t(image.titleKey)}
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(8,8,7,0.55) 100%)',
            pointerEvents: 'none', zIndex: 3,
          }}
        />

        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            pointerEvents: 'none',
            opacity: uiVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          {/* Top bar */}
          <div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 4rem) 3rem',
              background: 'linear-gradient(to bottom, rgba(8,8,7,0.75) 0%, transparent 100%)',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
              pointerEvents: 'all',
            }}
          >
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9b99a', marginBottom: '4px' }}>
                {t('gallery.label')}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1.1rem', color: '#f0ece4', letterSpacing: '0.02em' }}>
                {t('gallery.title')}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1.8rem', color: '#f0ece4', lineHeight: 1 }}>
                {String(current + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.6rem', color: '#3a3a38' }}>/</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.6rem', letterSpacing: '0.1em', color: '#8c8880' }}>
                {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '3rem clamp(1.5rem, 4vw, 4rem) clamp(2rem, 5vh, 3.5rem)',
              background: 'linear-gradient(to top, rgba(8,8,7,0.85) 0%, transparent 100%)',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
              pointerEvents: 'all',
            }}
          >
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: '#f0ece4', lineHeight: 1.2, marginBottom: '4px' }}>
                {t(img.titleKey)}
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8c8880' }}>
                {t(img.subtitleKey)}
              </p>
              {img.scaleKey && t(img.scaleKey) !== img.scaleKey && (
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.52rem', letterSpacing: '0.14em', color: '#5a5a58', marginTop: '6px' }}>
                  {t(img.scaleKey)}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <button
                onClick={() => setLightboxOpen(true)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                aria-label={t('gallery.zoom')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="#8c8880" strokeWidth="1" />
                  <line x1="11" y1="11" x2="15" y2="15" stroke="#8c8880" strokeWidth="1" />
                  <line x1="5" y1="7" x2="9" y2="7" stroke="#8c8880" strokeWidth="1" />
                  <line x1="7" y1="5" x2="7" y2="9" stroke="#8c8880" strokeWidth="1" />
                </svg>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8c8880' }}>
                  {t('gallery.zoom')}
                </span>
              </button>

              <button
                onClick={prev}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(-3px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                aria-label={t('gallery.prev')}
              >
                <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
                  <line x1="28" y1="5" x2="0" y2="5" stroke="#8c8880" strokeWidth="1" />
                  <polyline points="7,1 0,5 7,9" stroke="#8c8880" strokeWidth="1" fill="none" />
                </svg>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8c8880' }}>
                  {t('gallery.prev')}
                </span>
              </button>

              <button
                onClick={next}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(3px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                aria-label={t('gallery.next')}
              >
                <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
                  <line x1="0" y1="5" x2="28" y2="5" stroke="#8c8880" strokeWidth="1" />
                  <polyline points="21,1 28,5 21,9" stroke="#8c8880" strokeWidth="1" fill="none" />
                </svg>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8c8880' }}>
                  {t('gallery.next')}
                </span>
              </button>
            </div>
          </div>

          {/* Progress dots */}
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(1.2rem, 3vh, 2rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              pointerEvents: 'all',
            }}
          >
            {GALLERY_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? '24px' : '4px',
                  height: '1px',
                  background: i === current ? '#c9b99a' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'width 0.4s ease, background 0.4s ease',
                }}
                aria-label={`Bilde ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(8,8,7,0.97)',
          zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: lightboxOpen ? 1 : 0,
          pointerEvents: lightboxOpen ? 'all' : 'none',
          transition: 'opacity 0.5s ease',
        }}
        onClick={() => setLightboxOpen(false)}
      >
        <img
          src={GALLERY_IMAGES[current].src}
          alt={t(GALLERY_IMAGES[current].titleKey)}
          style={{ maxWidth: '92vw', maxHeight: '92vh', objectFit: 'contain' }}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          style={{ position: 'absolute', top: '1.5rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8c8880', pointerEvents: 'all' }}
          onClick={() => setLightboxOpen(false)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="1" y1="1" x2="13" y2="13" stroke="#8c8880" strokeWidth="1" />
            <line x1="13" y1="1" x2="1" y2="13" stroke="#8c8880" strokeWidth="1" />
          </svg>
          {t('gallery.close')}
        </button>
        <button
          style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', pointerEvents: 'all', padding: '1rem' }}
          onClick={(e) => { e.stopPropagation(); prev(); }}
        >
          <svg width="32" height="14" viewBox="0 0 32 14" fill="none">
            <line x1="32" y1="7" x2="0" y2="7" stroke="#8c8880" strokeWidth="1" />
            <polyline points="8,1 0,7 8,13" stroke="#8c8880" strokeWidth="1" fill="none" />
          </svg>
        </button>
        <button
          style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', pointerEvents: 'all', padding: '1rem' }}
          onClick={(e) => { e.stopPropagation(); next(); }}
        >
          <svg width="32" height="14" viewBox="0 0 32 14" fill="none">
            <line x1="0" y1="7" x2="32" y2="7" stroke="#8c8880" strokeWidth="1" />
            <polyline points="24,1 32,7 24,13" stroke="#8c8880" strokeWidth="1" fill="none" />
          </svg>
        </button>
      </div>
    </>
  );
}
