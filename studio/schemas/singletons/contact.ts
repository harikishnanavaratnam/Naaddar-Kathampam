import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  // NOTE: the contact-form recipient email is intentionally NOT stored here.
  // Sanity Free datasets are public — keep the recipient in the Web3Forms
  // dashboard / a Cloudflare env var instead.
  fields: [
    defineField({ name: 'phone', title: 'Public phone', type: 'string' }),
    defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'address', title: 'Address / map note', type: 'localeString' }),
  ],
  preview: { prepare: () => ({ title: 'Contact page' }) },
});
