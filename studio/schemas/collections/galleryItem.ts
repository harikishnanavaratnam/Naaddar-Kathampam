import { defineType, defineField } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default defineType({
  name: 'galleryItem',
  title: 'Gallery item',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'galleryItem' }),
    defineField({ name: 'image', title: 'Image', type: 'image',
      description: 'Upload an image, OR leave blank and paste a YouTube URL below.' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'caption', title: 'Caption', type: 'localeString' }),
    defineField({ name: 'album', title: 'Album / category', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
  ],
  preview: { select: { title: 'caption.en', subtitle: 'album', media: 'image' } },
});
