import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'programmeRow',
  title: 'Programme row',
  type: 'object',
  fields: [
    defineField({ name: 'time', title: 'Time', type: 'string' }),
    defineField({ name: 'item', title: 'Item', type: 'localeString' }),
    defineField({ name: 'performer', title: 'Performer', type: 'localeString' }),
    defineField({ name: 'stage', title: 'Stage', type: 'string' }),
  ],
  preview: {
    select: { title: 'item.en', subtitle: 'time' },
  },
});
