/*
 * OVE HETLAND — Footer Component
 * Design: «Cinematisk Natt» — minimal, elegant footer
 */

import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 px-8"
      style={{ borderTop: '1px solid rgba(201, 185, 154, 0.12)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo */}
        <Link href="/">
          <div className="flex flex-col cursor-pointer group">
            <span
              className="text-[#f0ece4] transition-colors duration-300 group-hover:text-[#c9b99a]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: '1rem',
                letterSpacing: '0.05em',
              }}
            >
              Ove Hetland
            </span>
            <span className="text-label" style={{ marginTop: '2px', fontSize: '0.6rem' }}>
              Makrofotografi
            </span>
          </div>
        </Link>

        {/* Center: Contact links */}
        <div className="flex flex-col items-center gap-2">
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: '#8c8880',
              textTransform: 'uppercase',
            }}
          >
            {t('footer.prints')}
          </p>
          <div className="flex gap-5 items-center">
            <a
              href="mailto:ove.hetland@gmail.com"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.08em', color: '#8c8880', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#c9b99a')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#8c8880')}
            >
              ove.hetland@gmail.com
            </a>
            <span style={{ color: '#3a3a38', fontSize: '0.5rem' }}>·</span>
            <a
              href="tel:+4740622912"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.08em', color: '#8c8880', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#c9b99a')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#8c8880')}
            >
              +47 406 22 912
            </a>
          </div>
        </div>

        {/* Right: Copyright */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: '#3a3a38',
            textTransform: 'uppercase',
          }}
        >
          © {year} Ove Hetland. {t('footer.rights')}.
        </p>
      </div>
    </footer>
  );
}
