import type { StructureResolver } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

const SINGLETONS: [string, string][] = [
  ['siteSettings', 'Site Settings'],
  ['home', 'Home'],
  ['about', 'About'],
  ['participation', 'Participation'],
  ['rules', 'Rules & Guidelines'],
  ['contact', 'Contact'],
];

export const deskStructure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(([type, title]) =>
        S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type))
      ),
      S.divider(),
      orderableDocumentListDeskItem({ type: 'timelineEntry', title: 'Timeline', S, context }),
      S.documentTypeListItem('event').title('Events'),
      orderableDocumentListDeskItem({ type: 'sponsorTier', title: 'Sponsor tiers', S, context }),
      orderableDocumentListDeskItem({ type: 'sponsor', title: 'Sponsors', S, context }),
      orderableDocumentListDeskItem({ type: 'committeeMember', title: 'Committee', S, context }),
      orderableDocumentListDeskItem({ type: 'galleryItem', title: 'Gallery', S, context }),
      S.documentTypeListItem('newsPost').title('News'),
    ]);
