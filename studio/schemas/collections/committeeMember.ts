import { defineType, defineField } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default defineType({
  name: 'committeeMember',
  title: 'Committee member',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'committeeMember' }),
    defineField({ name: 'name', title: 'Name', type: 'localeString' }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image' }),
  ],
  preview: { select: { title: 'name.en', subtitle: 'role', media: 'photo' } },
});
