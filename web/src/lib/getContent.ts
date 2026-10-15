import type { SiteContent, L } from './types';
import { sanity, sanityConfigured } from './sanity';
import { SITE_QUERY } from './queries';

const blankL = (): L => ({ ta: '', en: '' });
const initialOf = (name?: L): string => (name?.ta || name?.en || '•').trim().charAt(0) || '•';

/** Empty structure — used only when Sanity isn't configured or a fetch fails.
 *  No placeholder content: the site is fully CMS-driven. */
const EMPTY: SiteContent = {
  site: { tagline: blankL(), phone: '', youtube: '', facebook: '' },
  home: { kicker: blankL(), heroTitle: blankL(), heroSub: blankL(), quickLinks: [] },
  about: { intro: blankL(), founder: { initial: '', name: blankL(), role: '', bio: blankL() }, timeline: [] },
  participation: { intro: blankL(), cards: [] },
  rules: [],
  event: null,
  programme: [],
  sponsorTiers: [],
  sponsors: [],
  committee: [],
  gallery: [],
  news: [],
};

export async function getContent(): Promise<SiteContent> {
  if (!sanityConfigured || !sanity) return EMPTY;
  try {
    const d: any = await sanity.fetch(SITE_QUERY);
    const ev = d.event;
    return {
      site: {
        tagline: d.settings?.tagline ?? blankL(),
        phone: d.settings?.phone ?? '',
        youtube: d.settings?.youtube ?? '',
        facebook: d.settings?.facebook ?? '',
      },
      home: {
        kicker: d.home?.kicker ?? blankL(),
        heroTitle: d.home?.heroTitle ?? blankL(),
        heroSub: d.home?.heroSub ?? blankL(),
        quickLinks: (d.home?.quickLinks ?? []).map((q: any) => ({
          href: q.href ?? '#', icon: q.icon ?? '◈', title: q.title ?? blankL(), desc: q.desc ?? blankL(),
        })),
      },
      about: {
        intro: d.about?.intro ?? blankL(),
        founder: d.about?.founder
          ? { name: d.about.founder.name ?? blankL(), role: d.about.founder.role ?? '', bio: d.about.founder.bio ?? blankL(), photo: d.about.founder.photo, initial: initialOf(d.about.founder.name) }
          : { initial: '', name: blankL(), role: '', bio: blankL() },
        timeline: (d.timeline ?? []).map((t: any) => ({ year: t.year ?? '', text: t.text ?? blankL() })),
      },
      participation: {
        intro: d.participation?.intro ?? blankL(),
        cards: (d.participation?.cards ?? []).map((c: any) => ({ title: c.title ?? blankL(), body: c.body ?? blankL() })),
      },
      rules: (d.rules?.sections ?? []).map((s: any) => ({ title: s.title ?? blankL(), body: s.body ?? blankL() })),
      event: ev ? { name: ev.name ?? blankL(), dateText: ev.dateText ?? '', venue: ev.venue ?? blankL(), description: ev.description ?? blankL(), poster: ev.poster, pdf: ev.pdf } : null,
      programme: (ev?.programme ?? []).map((r: any) => ({ time: r.time ?? '', item: r.item ?? blankL(), performer: r.performer ?? blankL(), stage: r.stage ?? '' })),
      sponsorTiers: (d.sponsorTiers ?? []).map((t: any) => ({ key: t.key, name: t.name ?? blankL() })),
      sponsors: (d.sponsors ?? []).map((s: any) => ({ name: s.name ?? '', tier: s.tier ?? '', logo: s.logo, link: s.link })),
      committee: (d.committee ?? []).map((m: any) => ({ name: m.name ?? blankL(), role: m.role ?? '', photo: m.photo, initial: initialOf(m.name) })),
      gallery: (d.gallery ?? []).map((g: any) => ({ label: g.caption ?? blankL(), image: g.image, youtube: g.youtubeUrl, video: !!g.youtubeUrl })),
      news: (d.news ?? []).map((n: any) => ({ slug: n.slug ?? '', date: n.date ?? '', category: n.category ?? '', title: n.title ?? blankL(), body: n.body ?? blankL(), image: n.image })),
    };
  } catch (err) {
    console.warn('[getContent] Sanity fetch failed — rendering empty.', err);
    return EMPTY;
  }
}
