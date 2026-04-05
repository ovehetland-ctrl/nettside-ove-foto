/*
 * OVE HETLAND — Language Context
 * Bilingual support: Norwegian (NO) + English (EN)
 */

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'no' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  no: {
    // Navigation
    'nav.gallery': 'Galleri',
    'nav.about': 'Om meg',
    'nav.contact': 'Kontakt',

    // Hero
    'hero.label': 'Makrofotografi',
    'hero.title': 'En verden du\naldri har sett',
    'hero.subtitle': 'På nært hold',
    'hero.cta.gallery': 'Se galleri',
    'hero.cta.contact': 'Ta kontakt',
    'hero.scroll': 'Bla ned',

    // Gallery preview section
    'preview.label': 'Utvalgte verk',
    'preview.title': 'Frøenes skjulte geometri',
    'preview.body': 'Hvert frø er et univers. Gjennom makrolinsen åpenbarer naturen en presisjon og skjønnhet som er usynlig for det blotte øye.',
    'preview.cta': 'Se hele galleriet',

    // Gallery page
    'gallery.label': 'Galleri',
    'gallery.title': 'Botanisk arkiv',
    'gallery.subtitle': 'Makrofotografi av frø',
    'gallery.prev': 'Forrige',
    'gallery.next': 'Neste',
    'gallery.close': 'Lukk',
    'gallery.zoom': 'Forstørr',
    'gallery.of': 'av',

    // Gallery image titles
    'gallery.img1.title': 'Hanekam',
    'gallery.img1.subtitle': 'Celosia cristata',
    'gallery.img2.title': 'Fagerklokke',
    'gallery.img2.subtitle': 'Aquilegia vulgaris',
    'gallery.img3.title': 'Markjordbær',
    'gallery.img3.subtitle': 'Fragaria vesca',
    'gallery.img4.title': 'Frøsamling',
    'gallery.img4.subtitle': 'Botanisk studie',
    'gallery.img5.title': 'Frøkapsel II',
    'gallery.img5.subtitle': 'Nigella damascena',
    'gallery.img6.title': 'Frøhode',
    'gallery.img6.subtitle': 'Scabiosa columbaria',

    // About page
    'about.label': 'Om fotografen',
    'about.title': 'Ove Hetland',
    'about.subtitle': 'Makrofotograf',
    'about.p1': 'Det begynte med et kamera og en nysgjerrighet som ikke lot seg stanse. Syv år gammel oppdaget Ove Hetland at verden sett gjennom et linse var en annen verden — mer intens, mer presis, mer sann.',
    'about.p2': 'Over femti år senere er den nysgjerrigheten intakt. Det som har endret seg er dybden. Hetland har smalnet sitt fokus til det som er nesten usynlig for det blotte øye: frøenes indre arkitektur. Strukturer som naturen har perfeksjonert over millioner av år.',
    'about.p3': 'Hvert bilde er resultatet av timer med forberedelse, presisjonsjustering og tålmodighet. Ingenting overlates til tilfeldighetene. Lyset, vinkelen, dybdeskarphet — alt er en bevisst avgjørelse. Det er ikke bare fotografi. Det er botanisk dokumentasjon som kunst.',
    'about.p4': 'Hetlands arbeider er kjøpt av private samlere i Norge og internasjonalt. Hvert trykk er signert og nummerert.',
    'about.stat1.num': '50+',
    'about.stat1.label': 'Års erfaring',
    'about.stat2.num': '7',
    'about.stat2.label': 'Alder ved start',
    'about.stat3.num': '∞',
    'about.stat3.label': 'Detaljer per bilde',

    // Contact page
    'contact.label': 'Kontakt',
    'contact.title': 'Ta kontakt',
    'contact.subtitle': 'For kjøp eller samarbeid',
    'contact.body': 'Hvert trykk produseres på bestilling. Ta kontakt for å diskutere tilgjengelighet, størrelser og priser. Ingen henvendelse er for liten.',
    'contact.name': 'Navn',
    'contact.email': 'E-post',
    'contact.message': 'Melding',
    'contact.send': 'Send melding',
    'contact.or': 'Eller skriv direkte til',
    'contact.success': 'Takk for din henvendelse. Jeg svarer innen 48 timer.',
    'contact.error': 'Noe gikk galt. Prøv igjen eller send e-post direkte.',

    // Footer
    'footer.rights': 'Alle rettigheter forbeholdt',
    'footer.prints': 'Signerte trykk tilgjengelig på forespørsel',
  },
  en: {
    // Navigation
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Hero
    'hero.label': 'Macro Photography',
    'hero.title': 'A world you\nhave never seen',
    'hero.subtitle': 'Up close',
    'hero.cta.gallery': 'View gallery',
    'hero.cta.contact': 'Get in touch',
    'hero.scroll': 'Scroll',

    // Gallery preview section
    'preview.label': 'Selected works',
    'preview.title': 'The hidden geometry of seeds',
    'preview.body': 'Every seed is a universe. Through the macro lens, nature reveals a precision and beauty invisible to the naked eye.',
    'preview.cta': 'View full gallery',

    // Gallery page
    'gallery.label': 'Gallery',
    'gallery.title': 'Botanical archive',
    'gallery.subtitle': 'Macro photography of seeds',
    'gallery.prev': 'Previous',
    'gallery.next': 'Next',
    'gallery.close': 'Close',
    'gallery.zoom': 'Enlarge',
    'gallery.of': 'of',

    // Gallery image titles
    'gallery.img1.title': 'Cockscomb',
    'gallery.img1.subtitle': 'Celosia cristata',
    'gallery.img2.title': 'Columbine',
    'gallery.img2.subtitle': 'Aquilegia vulgaris',
    'gallery.img3.title': 'Wild Strawberry',
    'gallery.img3.subtitle': 'Fragaria vesca',
    'gallery.img4.title': 'Seed Collection',
    'gallery.img4.subtitle': 'Botanical study',
    'gallery.img5.title': 'Seed Pod II',
    'gallery.img5.subtitle': 'Nigella damascena',
    'gallery.img6.title': 'Seed Head',
    'gallery.img6.subtitle': 'Scabiosa columbaria',

    // About page
    'about.label': 'About the photographer',
    'about.title': 'Ove Hetland',
    'about.subtitle': 'Macro Photographer',
    'about.p1': 'It began with a camera and a curiosity that refused to be contained. At seven years old, Ove Hetland discovered that the world seen through a lens was a different world — more intense, more precise, more true.',
    'about.p2': 'More than fifty years later, that curiosity remains intact. What has changed is the depth. Hetland has narrowed his focus to what is nearly invisible to the naked eye: the inner architecture of seeds. Structures that nature has perfected over millions of years.',
    'about.p3': 'Each image is the result of hours of preparation, precision adjustment, and patience. Nothing is left to chance. The light, the angle, the depth of field — every element is a deliberate decision. This is not merely photography. It is botanical documentation as art.',
    'about.p4': "Hetland's works have been acquired by private collectors in Norway and internationally. Each print is signed and numbered.",
    'about.stat1.num': '50+',
    'about.stat1.label': 'Years of experience',
    'about.stat2.num': '7',
    'about.stat2.label': 'Age when he began',
    'about.stat3.num': '∞',
    'about.stat3.label': 'Details per image',

    // Contact page
    'contact.label': 'Contact',
    'contact.title': 'Get in touch',
    'contact.subtitle': 'For purchases or collaboration',
    'contact.body': 'Each print is produced to order. Get in touch to discuss availability, sizes, and pricing. No enquiry is too small.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.or': 'Or write directly to',
    'contact.success': 'Thank you for your enquiry. I will respond within 48 hours.',
    'contact.error': 'Something went wrong. Please try again or send an email directly.',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.prints': 'Signed prints available on request',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('no');

  const t = (key: string): string => {
    return translations[lang][key] || translations['no'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
