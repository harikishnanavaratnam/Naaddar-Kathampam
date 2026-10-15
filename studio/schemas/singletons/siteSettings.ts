import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'tagline', title: 'Footer tagline', type: 'localeText' }),
    defineField({ name: 'phone', title: 'Public phone', type: 'string' }),
    defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
