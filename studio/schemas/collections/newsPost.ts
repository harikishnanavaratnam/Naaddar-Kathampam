import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'newsPost',
  title: 'News post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'body', title: 'Body', type: 'localeBlock' }),
  ],
  orderings: [
    { title: 'Date, newest', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: { select: { title: 'title.en', subtitle: 'date', media: 'image' } },
});
