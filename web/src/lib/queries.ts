// One combined GROQ query — returns the whole site's content in a single fetch.
// Bilingual fields ({ta,en}) map straight through; rich text is flattened with
// pt::text() so components receive plain strings. Image fields resolve to CDN URLs.
export const SITE_QUERY = `{
  "settings": *[_type=="siteSettings"][0]{ tagline, phone, youtube, facebook },
  "home": *[_type=="home"][0]{ kicker, heroTitle, heroSub, quickLinks[]{ href, icon, title, desc } },
  "about": *[_type=="about"][0]{ intro, founder{ name, role, bio, "photo": photo.asset->url } },
  "timeline": *[_type=="timelineEntry"] | order(orderRank){ year, "text": description },
  "participation": *[_type=="participation"][0]{ intro, cards[]{ title, body } },
  "rules": *[_type=="rules"][0]{
    sections[]{ title, "body": { "ta": pt::text(body.ta), "en": pt::text(body.en) } }
  },
  "event": *[_type=="event" && isCurrent==true][0]{
    name, dateText, venue, description,
    "poster": poster.asset->url, "pdf": programmePdf.asset->url,
    programme[]{ time, item, performer, stage }
  },
  "sponsorTiers": *[_type=="sponsorTier"] | order(orderRank){ "key": _id, name },
  "sponsors": *[_type=="sponsor"] | order(orderRank){ name, "tier": tier._ref, link, "logo": logo.asset->url },
  "committee": *[_type=="committeeMember"] | order(orderRank){ name, role, "photo": photo.asset->url },
  "gallery": *[_type=="galleryItem"] | order(orderRank){ caption, album, year, youtubeUrl, "image": image.asset->url },
  "news": *[_type=="newsPost" && !(_id in path("drafts.**"))] | order(date desc){
    "slug": slug.current, date, category, title,
    "body": { "ta": pt::text(body.ta), "en": pt::text(body.en) },
    "image": image.asset->url
  }
}`;
