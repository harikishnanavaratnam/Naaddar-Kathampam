import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'rules',
  title: 'Rules & Guidelines',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ruleSection',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'localeString' }),
            defineField({ name: 'body', title: 'Body', type: 'localeBlock' }),
          ],
          preview: { select: { title: 'title.en' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Rules & Guidelines' }) },
});
