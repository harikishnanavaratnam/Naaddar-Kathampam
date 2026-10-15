import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'quickLink',
  title: 'Quick link',
  type: 'object',
  fields: [
    defineField({ name: 'href', title: 'Link (path)', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon (glyph)', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'localeString' }),
    defineField({ name: 'desc', title: 'Description', type: 'localeString' }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'href' } },
});
