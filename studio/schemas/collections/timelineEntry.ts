import { defineType, defineField } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default defineType({
  name: 'timelineEntry',
  title: 'Timeline entry',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'timelineEntry' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image' }),
  ],
  preview: { select: { title: 'year', subtitle: 'description.en' } },
});
