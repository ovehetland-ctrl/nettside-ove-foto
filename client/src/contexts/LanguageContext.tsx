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
    'preview.body': 'Hvert frø er et univers. Gjennom makrolinsen avdekker jeg en presisjon og skjønnhet som er usynlig for det blotte øye — og jeg kan ikke slutte å lete.',
    'preview.cta': 'Se hele galleriet',
    'preview.img1.title': 'Hanekam',
    'preview.img1.subtitle': 'Celosia cristata',
    'preview.img2.title': 'Fagerklokke',
    'preview.img2.subtitle': 'Aquilegia vulgaris',
    'preview.img3.title': 'Markjordbær',
    'preview.img3.subtitle': 'Fragaria vesca',

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
    'gallery.img1.title': 'Storengkall',
    'gallery.img1.subtitle': 'Rhinanthus angustifolius',
    'gallery.img2.title': 'Vassarve',
    'gallery.img2.subtitle': 'Stellaria media',
    'gallery.img3.title': 'Fagerklokke',
    'gallery.img3.subtitle': 'Aquilegia vulgaris',
    'gallery.img4.title': 'Prestekrage',
    'gallery.img4.subtitle': 'Leucanthemum vulgare',
    'gallery.img5.title': 'Vanlig hønsegras',
    'gallery.img5.subtitle': 'Polygonum aviculare',
    'gallery.img6.title': 'Veronika',
    'gallery.img6.subtitle': 'Veronica chamaedrys',
    'gallery.img7.title': 'Løvetann',
    'gallery.img7.subtitle': 'Taraxacum officinale',
    'gallery.img8.title': 'Rød jonsokblom',
    'gallery.img8.subtitle': 'Silene dioica',
    'gallery.img9.title': 'Rughavre',
    'gallery.img9.subtitle': 'Avena strigosa',

    // About page
    'about.label': 'Om meg',
    'about.title': 'Ove Hetland',
    'about.subtitle': 'Makrofotograf',
    'about.p1': 'Det begynte med et kamera og en nysgjerrighet som ikke lot seg stanse. Syv år gammel oppdaget jeg at verden sett gjennom et linse var en annen verden — mer intens, mer presis, mer sann.',
    'about.p2': 'Over femti år senere er den nysgjerrigheten intakt. Det som har endret seg er dybden. Jeg har smalnet fokuset mitt til det som er nesten usynlig for det blotte øye: frøenes indre arkitektur. Strukturer som naturen har perfeksjonert over millioner av år.',
    'about.p3': 'Hvert bilde er resultatet av timer med forberedelse, presisjonsjustering og tålmodighet. Ingenting overlater jeg til tilfeldighetene. Lyset, vinkelen, dybdeskarpheten — alt er en bevisst avgjørelse. For meg er dette ikke bare fotografi. Det er botanisk dokumentasjon som kunst.',
    'about.p4': 'Bildene mine er kjøpt av private samlere i Norge og internasjonalt. Hvert trykk er signert og nummerert av meg.',
    'about.stat1.num': '50+',
    'about.stat1.label': 'Års erfaring',
    'about.stat2.num': '10',
    'about.stat2.label': 'Begynte å fotografere da jeg var 10 år gammel',
    'about.stat3.num': '∞',
    'about.stat3.label': 'Detaljer per bilde',

    // Contact page
    'contact.label': 'Kontakt',
    'contact.title': 'Ta kontakt',
    'contact.subtitle': 'For kjøp eller samarbeid',
    'contact.body': 'Jeg produserer hvert trykk på bestilling. Ta gjerne kontakt for å snakke om tilgjengelighet, størrelser og priser. Ingen henvendelse er for liten — jeg svarer alltid.',
    'contact.name': 'Navn',
    'contact.email': 'E-post',
    'contact.message': 'Melding',
    'contact.send': 'Send melding',
    'contact.or': 'Eller skriv direkte til',
    'contact.success': 'Takk for din henvendelse. Jeg svarer innen 48 timer.',
    'contact.error': 'Noe gikk galt. Prøv igjen eller send e-post direkte.',

    // Footer
    'footer.rights': 'Alle rettigheter forbeholdt',
    'footer.prints': 'Jeg lager signerte trykk på bestilling',
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
    'preview.body': 'Every seed is a universe. Through the macro lens, I uncover a precision and beauty invisible to the naked eye — and I cannot stop looking.',
    'preview.cta': 'View full gallery',
    'preview.img1.title': 'Cockscomb',
    'preview.img1.subtitle': 'Celosia cristata',
    'preview.img2.title': 'Columbine',
    'preview.img2.subtitle': 'Aquilegia vulgaris',
    'preview.img3.title': 'Wild Strawberry',
    'preview.img3.subtitle': 'Fragaria vesca',

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
    'gallery.img1.title': 'Yellow Rattle',
    'gallery.img1.subtitle': 'Rhinanthus angustifolius',
    'gallery.img2.title': 'Chickweed',
    'gallery.img2.subtitle': 'Stellaria media',
    'gallery.img3.title': 'Columbine',
    'gallery.img3.subtitle': 'Aquilegia vulgaris',
    'gallery.img4.title': 'Ox-eye Daisy',
    'gallery.img4.subtitle': 'Leucanthemum vulgare',
    'gallery.img5.title': 'Common Knotgrass',
    'gallery.img5.subtitle': 'Polygonum aviculare',
    'gallery.img6.title': 'Germander Speedwell',
    'gallery.img6.subtitle': 'Veronica chamaedrys',
    'gallery.img7.title': 'Dandelion',
    'gallery.img7.subtitle': 'Taraxacum officinale',
    'gallery.img8.title': 'Red Campion',
    'gallery.img8.subtitle': 'Silene dioica',
    'gallery.img9.title': 'Black Oat',
    'gallery.img9.subtitle': 'Avena strigosa',

    // About page
    'about.label': 'About me',
    'about.title': 'Ove Hetland',
    'about.subtitle': 'Macro Photographer',
    'about.p1': 'It began with a camera and a curiosity that refused to be contained. At seven years old, I discovered that the world seen through a lens was a different world — more intense, more precise, more true.',
    'about.p2': 'More than fifty years later, that curiosity remains intact. What has changed is the depth. I have narrowed my focus to what is nearly invisible to the naked eye: the inner architecture of seeds. Structures that nature has perfected over millions of years.',
    'about.p3': 'Each image is the result of hours of preparation, precision adjustment, and patience. I leave nothing to chance. The light, the angle, the depth of field — every element is a deliberate decision. For me, this is not merely photography. It is botanical documentation as art.',
    'about.p4': 'My works have been acquired by private collectors in Norway and internationally. Each print is personally signed and numbered by me.',
    'about.stat1.num': '50+',
    'about.stat1.label': 'Years of experience',
    'about.stat2.num': '10',
    'about.stat2.label': 'Started photographing at the age of 10',
    'about.stat3.num': '∞',
    'about.stat3.label': 'Details per image',

    // Contact page
    'contact.label': 'Contact',
    'contact.title': 'Get in touch',
    'contact.subtitle': 'For purchases or collaboration',
    'contact.body': 'I produce every print to order. Feel free to reach out to discuss availability, sizes, and pricing. No enquiry is too small — I always respond.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.or': 'Or write directly to',
    'contact.success': 'Thank you for your enquiry. I will respond within 48 hours.',
    'contact.error': 'Something went wrong. Please try again or send an email directly.',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.prints': 'I make signed prints to order',
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
