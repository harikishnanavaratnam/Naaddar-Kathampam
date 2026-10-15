import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeString',
  title: 'Bilingual text (short)',
  type: 'object',
  fields: [
    defineField({ name: 'ta', title: 'தமிழ் (Tamil)', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ],
});
