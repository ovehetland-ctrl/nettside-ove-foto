/*
 * OVE HETLAND — Contact Page
 * Design: «Cinematisk Natt»
 * Layout: Asymmetric — description left, form right
 */

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFadeIn } from '@/hooks/useFadeIn';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const headerRef = useFadeIn(0.1) as React.RefObject<HTMLDivElement>;
  const contentRef = useFadeIn(0.1) as React.RefObject<HTMLDivElement>;

  const px = 'clamp(1.5rem, 6vw, 6rem)';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

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
          paddingLeft: px, paddingRight: px,
          paddingTop: 'clamp(4rem, 8vh, 6rem)',
          paddingBottom: 'clamp(4rem, 8vh, 6rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
        }}
      >
        {/* Left: Description */}
        <div className="lg:col-span-4" style={{ maxWidth: '400px' }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: '#8c8880', lineHeight: 1.95, marginBottom: '3rem' }}>
            {t('contact.body')}
          </p>
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8c8880', marginBottom: '0.75rem' }}>
              {t('contact.or')}
            </p>
            <a
              href="mailto:ove.hetland@gmail.com"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1.15rem', color: '#c9b99a', textDecoration: 'none', borderBottom: '1px solid rgba(201, 185, 154, 0.25)', paddingBottom: '2px', transition: 'border-color 0.3s ease, color 0.3s ease', letterSpacing: '0.02em', display: 'block', marginBottom: '1.25rem' }}
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
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1.15rem', color: '#c9b99a', textDecoration: 'none', borderBottom: '1px solid rgba(201, 185, 154, 0.25)', paddingBottom: '2px', transition: 'border-color 0.3s ease, color 0.3s ease', letterSpacing: '0.02em', display: 'block' }}
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
        </div>

        {/* Right: Form */}
        <div style={{ maxWidth: '560px' }}>
          {status === 'success' ? (
            <div style={{ border: '1px solid rgba(201, 185, 154, 0.15)', padding: '4rem 2.5rem', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1.6rem', color: '#c9b99a', lineHeight: 1.4, marginBottom: '1.5rem' }}>
                {t('contact.success')}
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8c8880', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#f0ece4')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#8c8880')}
              >
                ← Tilbake
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <FormField label={t('contact.name')} name="name" type="text" value={formData.name} onChange={handleChange} required />
              <FormField label={t('contact.email')} name="email" type="email" value={formData.email} onChange={handleChange} required />
              <FormField label={t('contact.message')} name="message" type="textarea" value={formData.message} onChange={handleChange} required />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-gold"
                  style={{ opacity: status === 'sending' ? 0.5 : 1, cursor: status === 'sending' ? 'wait' : 'pointer' }}
                >
                  {status === 'sending' ? '···' : t('contact.send')}
                </button>
                {status === 'error' && (
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '0.75rem', color: '#c97a7a' }}>
                    {t('contact.error')}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}

function FormField({ label, name, type, value, onChange, required }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8c8880', marginBottom: '0.75rem' }}
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea id={name} name={name} value={value} onChange={onChange} required={required} rows={5} className="contact-input" placeholder={label} />
      ) : (
        <input id={name} type={type} name={name} value={value} onChange={onChange} required={required} className="contact-input" placeholder={label} />
      )}
    </div>
  );
}
