import { defineType } from 'sanity';

/**
 * SEO metadata for pages and posts
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines (50-60 characters)',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 characters'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters)',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters'),
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630 recommended)',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Hide this page from search engines',
      initialValue: false,
    },
  ],
});
