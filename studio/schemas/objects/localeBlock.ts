import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeBlock',
  title: 'Bilingual rich text',
  type: 'object',
  fields: [
    defineField({ name: 'ta', title: 'தமிழ் (Tamil)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] }),
  ],
});
