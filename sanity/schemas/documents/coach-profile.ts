import { defineType, defineField } from 'sanity';

/**
 * Coach public profile for marketing/discovery
 * Linked to coach in database via coachId
 */
export const coachProfile = defineType({
  name: 'coachProfile',
  title: 'Coach Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'coachId',
      title: 'Coach ID',
      type: 'string',
      description: 'Database coach ID (auto-linked)',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'name',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Profile URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short professional tagline',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'blockContent',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Certification/Credential' },
            { name: 'organization', type: 'string', title: 'Issuing Organization' },
            { name: 'year', type: 'number', title: 'Year Obtained' },
          ],
          preview: {
            select: { title: 'title', org: 'organization' },
            prepare({ title, org }) {
              return { title, subtitle: org };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'playerCategories',
      title: 'Player Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Recreational', value: 'recreational' },
          { title: 'Competitive Junior', value: 'competitive_junior' },
          { title: 'Collegiate Track', value: 'collegiate_track' },
          { title: 'Professional Track', value: 'professional_track' },
          { title: 'Senior', value: 'senior' },
        ],
      },
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Service Name' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'duration', type: 'number', title: 'Duration (minutes)' },
            { name: 'price', type: 'number', title: 'Price (USD)' },
          ],
          preview: {
            select: { title: 'name', price: 'price', duration: 'duration' },
            prepare({ title, price, duration }) {
              return {
                title,
                subtitle: `$${price} / ${duration} min`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State/Province' },
        { name: 'country', type: 'string', title: 'Country' },
        { name: 'facilities', type: 'array', of: [{ type: 'string' }], title: 'Facilities' },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        { name: 'email', type: 'email', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'website', type: 'url', title: 'Website' },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'twitter', type: 'url', title: 'Twitter' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Make profile publicly visible',
      initialValue: false,
    }),
    defineField({
      name: 'acceptingStudents',
      title: 'Accepting New Students',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'photo',
    },
  },
});
