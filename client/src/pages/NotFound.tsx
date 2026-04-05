import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div
      style={{
        background: '#080807',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 'clamp(1.5rem, 6vw, 6rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#c9b99a',
          marginBottom: '2rem',
        }}
      >
        404
      </p>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          color: '#f0ece4',
          lineHeight: 0.95,
          letterSpacing: '-0.025em',
          marginBottom: '1.5rem',
        }}
      >
        Side ikke funnet
      </h1>

      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
          fontSize: '0.85rem',
          color: '#8c8880',
          lineHeight: 1.8,
          maxWidth: '380px',
          marginBottom: '3rem',
        }}
      >
        Siden du leter etter eksisterer ikke. Kanskje den er skjult — som et frø under jorda.
      </p>

      <Link href="/">
        <span className="btn-gold">Tilbake til forsiden</span>
      </Link>
    </div>
  );
}
