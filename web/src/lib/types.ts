// Shared content types. `L` is the bilingual primitive used everywhere.
export interface L { ta: string; en: string }

export interface QuickLink { href: string; icon: string; title: L; desc: L }
export interface TimelineEntry { year: string; text: L }
export interface ProgrammeRow { time: string; item: L; performer: L; stage: string }
export interface Member { initial: string; name: L; role: string; photo?: string }
export interface Sponsor { name: string; tier: string; logo?: string; link?: string }
export interface SponsorTier { key: string; name: L }
export interface GalleryItem { label: L; image?: string; youtube?: string; video?: boolean; grad?: string }
export interface NewsPost { slug: string; date: string; category: string; title: L; body: L; image?: string }

export interface EventInfo { name: L; dateText: string; venue: L; description: L; poster?: string; pdf?: string }

export interface SiteContent {
  site: { tagline: L; phone: string; youtube: string; facebook: string };
  home: { kicker: L; heroTitle: L; heroSub: L; quickLinks: QuickLink[] };
  about: {
    intro: L;
    founder: { initial: string; name: L; role: string; bio: L; photo?: string };
    timeline: TimelineEntry[];
  };
  participation: { intro: L; cards: { title: L; body: L }[] };
  rules: { title: L; body: L }[];
  event: EventInfo | null;
  programme: ProgrammeRow[];
  sponsorTiers: SponsorTier[];
  sponsors: Sponsor[];
  committee: Member[];
  gallery: GalleryItem[];
  news: NewsPost[];
}
