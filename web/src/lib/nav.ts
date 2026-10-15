// Header navigation. `primary` items sit in the bar; the rest go under "More".
export interface NavItem { href: string; ta: string; en: string; primary: boolean }

export const NAV: NavItem[] = [
  { href: '/', ta: 'முகப்பு', en: 'Home', primary: true },
  { href: '/about', ta: 'பற்றி', en: 'About', primary: true },
  { href: '/event', ta: 'நிகழ்வு', en: 'Event', primary: true },
  { href: '/programme', ta: 'நிரல்', en: 'Programme', primary: true },
  { href: '/participation', ta: 'பங்கேற்பு', en: 'Participate', primary: false },
  { href: '/rules', ta: 'விதிமுறைகள்', en: 'Rules', primary: false },
  { href: '/sponsors', ta: 'அனுசரணை', en: 'Sponsors', primary: false },
  { href: '/committee', ta: 'குழு', en: 'Committee', primary: false },
  { href: '/gallery', ta: 'படங்கள்', en: 'Gallery', primary: true },
  { href: '/news', ta: 'செய்திகள்', en: 'News', primary: false },
  { href: '/contact', ta: 'தொடர்பு', en: 'Contact', primary: true },
];
