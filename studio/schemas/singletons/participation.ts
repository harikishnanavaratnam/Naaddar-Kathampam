import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'participation',
  title: 'Participation & Registration',
  type: 'document',
  fields: [
    defineField({ name: 'intro', title: 'Intro note', type: 'localeText' }),
    defineField({
      name: 'cards',
      title: 'Info cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'infoCard',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'localeString' }),
            defineField({ name: 'body', title: 'Body', type: 'localeText' }),
          ],
          preview: { select: { title: 'title.en' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Participation page' }) },
});
