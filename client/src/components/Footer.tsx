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

        {/* Center: Tagline */}
        <p
          className="text-center"
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
