import { defineType, defineField } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'sponsor' }),
    defineField({ name: 'name', title: 'Sponsor name', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'link', title: 'Website', type: 'url' }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'reference',
      to: [{ type: 'sponsorTier' }],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'tier.name.en' } },
});
