import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({ name: 'kicker', title: 'Hero kicker', type: 'localeString' }),
    defineField({ name: 'heroTitle', title: 'Hero tagline', type: 'localeText' }),
    defineField({ name: 'heroSub', title: 'Hero subtitle', type: 'localeText' }),
    defineField({
      name: 'quickLinks',
      title: 'Quick links',
      type: 'array',
      of: [{ type: 'quickLink' }],
      validation: (r) => r.max(4),
    }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
});
