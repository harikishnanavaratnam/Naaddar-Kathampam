import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({ name: 'intro', title: 'Intro', type: 'localeText' }),
    defineField({
      name: 'founder',
      title: 'Founder',
      type: 'object',
      fields: [
        defineField({ name: 'photo', title: 'Photo', type: 'image' }),
        defineField({ name: 'name', title: 'Name', type: 'localeString' }),
        defineField({ name: 'role', title: 'Role', type: 'string' }),
        defineField({ name: 'bio', title: 'Bio', type: 'localeText' }),
      ],
    }),
    // Timeline entries live in their own orderable collection (timelineEntry).
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
