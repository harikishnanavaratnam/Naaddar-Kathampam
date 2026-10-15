import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeText',
  title: 'Bilingual text (long)',
  type: 'object',
  fields: [
    defineField({ name: 'ta', title: 'தமிழ் (Tamil)', type: 'text', rows: 3 }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
  ],
});
