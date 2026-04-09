/*
 * OVE HETLAND — Home Page
 * Design: «Cinematisk Natt»
 * Sections:
 *   1. Hero — fullscreen, cinematic, parallax
 *   2. Gallery Preview — asymmetric 3-image grid
 *   3. Quote — centered, italic, atmospheric
 * Typography: Cormorant Garamond (display) + Montserrat (UI)
 * Colors: #080807 bg / #f0ece4 text / #c9b99a accent / #8c8880 muted
 */

import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFadeIn } from '@/hooks/useFadeIn';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663499575388/k9G3EiRAAtsP9HKo2g57xn/hero-forside_b29d3123.webp';

const PREVIEW_IMAGES = [
  {
    src: 'https://res.cloudinary.com/dqdupx0zl/image/upload/v1774984998/Hanekam_m%C3%A5lestokk-3_bse8jl.jpg',
    titleKey: 'preview.img1.title',
    subtitleKey: 'preview.img1.subtitle',
  },
  {
    src: 'https://res.cloudinary.com/dqdupx0zl/image/upload/v1775218878/fagerklokke_1_xdhhnk.jpg',
    titleKey: 'preview.img2.title',
    subtitleKey: 'preview.img2.subtitle',
  },
  {
    src: 'https://res.cloudinary.com/dqdupx0zl/image/upload/v1775231930/2024-12-07-10.19.22_ZS_PMax_UDR-Edit3_dfekle.jpg',
    titleKey: 'preview.img3.title',
    subtitleKey: 'preview.img3.subtitle',
  },
];

export default function Home() {
  const { t } = useLanguage();
  const heroImgRef = useRef<HTMLImageElement>(null);
  const previewRef = useFadeIn(0.08) as React.RefObject<HTMLDivElement>;
  const textRef = useFadeIn(0.08) as React.RefObject<HTMLDivElement>;
  const ctaRef = useFadeIn(0.08) as React.RefObject<HTMLDivElement>;

  // Subtle parallax on hero image
  useEffect(() => {
    const handleScroll = () => {
      if (heroImgRef.current) {
        const y = window.scrollY;
        heroImgRef.current.style.transform = `translateY(${y * 0.05}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#080807', minHeight: '100vh' }}>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          width: '100vw',
          height: '80svh',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <img
          ref={heroImgRef}
          src={HERO_IMAGE}
          alt="Makrofotografi av frøkapsel — Ove Hetland"
          className="hero-img-reveal"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            willChange: 'transform',
            filter: 'contrast(1.08) saturate(1.05)',
            imageRendering: 'crisp-edges',
          }}
          loading="eager"
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                to bottom,
                rgba(8,8,7,0.10) 0%,
                rgba(8,8,7,0.00) 35%,
                rgba(8,8,7,0.20) 70%,
                rgba(8,8,7,0.75) 100%
              )
            `,
          }}
        />

        {/* Hero content — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingLeft: 'clamp(1.5rem, 6vw, 6rem)',
            paddingRight: 'clamp(1.5rem, 6vw, 6rem)',
            paddingBottom: 'clamp(4rem, 8vh, 7rem)',
          }}
        >
          <p
            className="text-fade-up text-fade-up-delay-1"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c9b99a',
              marginBottom: '1.2rem',
            }}
          >
            {t('hero.label')}
          </p>

          <h1
            className="text-fade-up text-fade-up-delay-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)',
              lineHeight: 0.95,
              color: '#f0ece4',
              letterSpacing: '-0.025em',
              whiteSpace: 'pre-line',
              marginBottom: '0.8rem',
            }}
          >
            {t('hero.title')}
          </h1>

          <p
            className="text-fade-up text-fade-up-delay-3"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.1rem, 2.8vw, 2.2rem)',
              color: '#c9b99a',
              marginBottom: '2.8rem',
            }}
          >
            {t('hero.subtitle')}
          </p>

          <div className="text-fade-up text-fade-up-delay-4 flex flex-wrap gap-4">
            <Link href="/gallery">
              <span className="btn-gold">{t('hero.cta.gallery')}</span>
            </Link>
            <Link href="/contact">
              <span className="btn-ghost">{t('hero.cta.contact')}</span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-indicator"
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: 'clamp(1.5rem, 4vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.45,
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: '0.52rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#f0ece4',
              writingMode: 'vertical-rl',
            }}
          >
            {t('hero.scroll')}
          </span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, #c9b99a, transparent)',
            }}
          />
        </div>
      </section>

      {/* ─── GALLERY PREVIEW ──────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'clamp(5rem, 10vh, 9rem)',
          paddingBottom: 'clamp(5rem, 10vh, 9rem)',
          paddingLeft: 'clamp(1.5rem, 6vw, 6rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 6rem)',
        }}
      >
        {/* Section header */}
        <div
          ref={textRef}
          className="fade-in"
          style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c9b99a',
              marginBottom: '1.2rem',
            }}
          >
            {t('preview.label')}
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
            className="md:flex-row md:items-end md:justify-between"
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 5vw, 4.2rem)',
                color: '#f0ece4',
                lineHeight: 1.05,
                maxWidth: '580px',
                letterSpacing: '-0.01em',
              }}
            >
              {t('preview.title')}
            </h2>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: '0.82rem',
                color: '#8c8880',
                lineHeight: 1.85,
                maxWidth: '340px',
              }}
            >
              {t('preview.body')}
            </p>
          </div>
        </div>

        {/* Thin separator */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,185,154,0.2), transparent)',
            marginBottom: 'clamp(3rem, 6vh, 5rem)',
          }}
        />

        {/* Asymmetric image grid */}
        <div
          ref={previewRef}
          className="fade-in"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto',
            gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
            alignItems: 'start',
          }}
        >
          {PREVIEW_IMAGES.map((img, i) => (
            <Link
              href="/gallery"
              key={i}
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  background: '#0d0d0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={img.src}
                  alt={t(img.titleKey)}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  loading="lazy"
                />
              </div>
              <ImageCaption titleKey={img.titleKey} subtitleKey={img.subtitleKey} />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="fade-in"
          style={{ marginTop: 'clamp(3rem, 6vh, 5rem)', display: 'flex', justifyContent: 'center' }}
        >
          <Link href="/gallery">
            <span className="btn-gold">{t('preview.cta')}</span>
          </Link>
        </div>
      </section>

      {/* ─── QUOTE SECTION ────────────────────────────────────────────────── */}
      <QuoteSection />
    </div>
  );
}

function ImageCaption({ titleKey, subtitleKey }: { titleKey: string; subtitleKey: string }) {
  const { t } = useLanguage();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: '0.75rem',
        paddingTop: '0',
        paddingBottom: '0',
        borderBottom: 'none',
      }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: '1rem',
          color: '#f0ece4',
          letterSpacing: '0.01em',
        }}
      >
        {t(titleKey)}
      </p>
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 400,
          fontSize: '0.58rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#8c8880',
        }}
      >
        {t(subtitleKey)}
      </p>
    </div>
  );
}

function QuoteSection() {
  const { lang } = useLanguage();
  const ref = useFadeIn(0.15) as React.RefObject<HTMLDivElement>;

  const quote = lang === 'no'
    ? 'Det finnes en verden som eksisterer rett foran oss — men som vi aldri ser. Makrolinsen er nøkkelen.'
    : 'There is a world that exists right before us — but which we never see. The macro lens is the key.';

  return (
    <section
      ref={ref}
      className="fade-in"
      style={{
        paddingTop: 'clamp(5rem, 10vh, 9rem)',
        paddingBottom: 'clamp(5rem, 10vh, 9rem)',
        paddingLeft: 'clamp(1.5rem, 12vw, 14rem)',
        paddingRight: 'clamp(1.5rem, 12vw, 14rem)',
        borderTop: '1px solid rgba(201, 185, 154, 0.08)',
        borderBottom: '1px solid rgba(201, 185, 154, 0.08)',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.4rem, 3.2vw, 2.8rem)',
          color: '#f0ece4',
          lineHeight: 1.45,
          maxWidth: '820px',
          margin: '0 auto',
        }}
      >
        "{quote}"
      </p>
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#c9b99a',
          marginTop: '2.5rem',
        }}
      >
        — Ove Hetland
      </p>
    </section>
  );
}
