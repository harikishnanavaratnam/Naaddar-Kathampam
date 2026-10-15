import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Event name', type: 'localeString' }),
    defineField({ name: 'isCurrent', title: 'Current event?', type: 'boolean', initialValue: false,
      description: 'Turn on for the event shown on the Event & Programme pages.' }),
    defineField({ name: 'dateText', title: 'Date & time', type: 'string' }),
    defineField({ name: 'venue', title: 'Venue', type: 'localeString' }),
    defineField({ name: 'mapUrl', title: 'Map link', type: 'url' }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({ name: 'poster', title: 'Poster / banner', type: 'image' }),
    defineField({ name: 'programmePdf', title: 'Programme PDF', type: 'file' }),
    defineField({
      name: 'programme',
      title: 'Programme rows',
      type: 'array',
      of: [{ type: 'programmeRow' }],
    }),
  ],
  preview: { select: { title: 'name.en', subtitle: 'dateText' } },
});
