/*
 * OVE HETLAND — Navigation Component
 * Design: «Cinematisk Natt» — minimal, almost invisible nav
 * Behavior: Fades in on scroll, hides after inactivity on hero
 * Colors: #f0ece4 (primary) / #8c8880 (muted) / #c9b99a (accent/active)
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  const resetHideTimer = useCallback(() => {
    clearHideTimer();
    setVisible(true);
    if (!scrolled && location === '/') {
      hideTimerRef.current = setTimeout(() => setVisible(false), 3500);
    }
  }, [scrolled, location]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setVisible(true);
      clearHideTimer();
    };

    const handleMouseMove = () => resetHideTimer();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    if (location === '/') {
      hideTimerRef.current = setTimeout(() => setVisible(false), 3500);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearHideTimer();
    };
  }, [location, resetHideTimer]);

  const isAlwaysVisible = location !== '/';
  const navVisible = isAlwaysVisible || visible || menuOpen;

  const navLinks = [
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          opacity: navVisible ? 1 : 0,
          transform: navVisible ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: navVisible ? 'all' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between px-8 py-6 transition-all duration-500"
          style={{
            background: scrolled
              ? 'linear-gradient(to bottom, rgba(8,8,7,0.96) 0%, rgba(8,8,7,0.0) 100%)'
              : 'linear-gradient(to bottom, rgba(8,8,7,0.55) 0%, rgba(8,8,7,0.0) 100%)',
          }}
        >
          {/* Logo */}
          <Link href="/">
            <div className="flex flex-col cursor-pointer group" style={{ textDecoration: 'none' }}>
              <span
                className="transition-colors duration-300 group-hover:text-[#c9b99a]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: '1.05rem',
                  letterSpacing: '0.06em',
                  color: '#f0ece4',
                  lineHeight: 1.2,
                }}
              >
                Ove Hetland
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.58rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#8c8880',
                  marginTop: '2px',
                }}
              >
                Makrofotografi
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`nav-link ${location === link.href ? 'active' : ''}`}>
                  {link.label}
                </span>
              </Link>
            ))}

            {/* Language toggle */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setLang('no')}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: lang === 'no' ? '#c9b99a' : '#8c8880',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                NO
              </button>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.6rem',
                  color: '#2a2a28',
                }}
              >
                /
              </span>
              <button
                onClick={() => setLang('en')}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: lang === 'en' ? '#c9b99a' : '#8c8880',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Meny"
            style={{ background: 'none', border: 'none' }}
          >
            <span
              className="block h-px bg-[#f0ece4] transition-all duration-300 origin-center"
              style={{
                width: '22px',
                transform: menuOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none',
              }}
            />
            <span
              className="block h-px bg-[#f0ece4] transition-all duration-300"
              style={{ width: '22px', opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px bg-[#f0ece4] transition-all duration-300 origin-center"
              style={{
                width: '22px',
                transform: menuOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center items-center md:hidden"
        style={{
          background: 'rgba(8,8,7,0.98)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.5s ease',
        }}
      >
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              <span
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: '2.8rem',
                  color: location === link.href ? '#c9b99a' : '#f0ece4',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                {link.label}
              </span>
            </Link>
          ))}

          {/* Language toggle mobile */}
          <div
            className="flex items-center gap-5 mt-4"
            style={{
              opacity: menuOpen ? 1 : 0,
              transition: 'opacity 0.5s ease 0.3s',
            }}
          >
            <button
              onClick={() => setLang('no')}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: lang === 'no' ? '#c9b99a' : '#8c8880',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Norsk
            </button>
            <span style={{ color: '#3a3a38', fontSize: '0.65rem' }}>/</span>
            <button
              onClick={() => setLang('en')}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: lang === 'en' ? '#c9b99a' : '#8c8880',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
