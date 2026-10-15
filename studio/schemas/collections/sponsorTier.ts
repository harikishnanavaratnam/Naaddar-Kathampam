import { defineType, defineField } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default defineType({
  name: 'sponsorTier',
  title: 'Sponsor tier',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'sponsorTier' }),
    defineField({ name: 'name', title: 'Tier name', type: 'localeString' }),
  ],
  preview: { select: { title: 'name.en' } },
});
