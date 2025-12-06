import { defineType, defineField } from 'sanity';

/**
 * Global site settings
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Open Graph Image',
      type: 'image',
      description: 'Default image for social sharing',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        {
          name: 'main',
          title: 'Main Navigation',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'localizedString', title: 'Label' },
                { name: 'href', type: 'string', title: 'URL' },
                { name: 'external', type: 'boolean', title: 'External Link', initialValue: false },
              ],
              preview: {
                select: { title: 'label.en', href: 'href' },
                prepare({ title, href }) {
                  return { title, subtitle: href };
                },
              },
            },
          ],
        },
        {
          name: 'footer',
          title: 'Footer Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'heading', type: 'localizedString', title: 'Section Heading' },
                {
                  name: 'links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'label', type: 'localizedString', title: 'Label' },
                        { name: 'href', type: 'string', title: 'URL' },
                      ],
                    },
                  ],
                },
              ],
              preview: {
                select: { title: 'heading.en' },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'email', type: 'email', title: 'Support Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'address', type: 'text', title: 'Address', rows: 3 },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        { name: 'googleAnalyticsId', type: 'string', title: 'Google Analytics ID' },
        { name: 'plausibleDomain', type: 'string', title: 'Plausible Domain' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
});
