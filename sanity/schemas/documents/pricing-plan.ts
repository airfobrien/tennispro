import { defineType, defineField } from 'sanity';

/**
 * Subscription pricing plans
 */
export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Starter', value: 'starter' },
          { title: 'Professional', value: 'professional' },
          { title: 'Enterprise', value: 'enterprise' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'monthlyPrice',
      title: 'Monthly Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'yearlyPrice',
      title: 'Yearly Price (USD)',
      type: 'number',
      description: 'Total yearly price (not per month)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', type: 'localizedString', title: 'Feature Text' },
            {
              name: 'included',
              type: 'boolean',
              title: 'Included',
              initialValue: true,
            },
            { name: 'highlight', type: 'boolean', title: 'Highlight', initialValue: false },
          ],
          preview: {
            select: {
              title: 'text.en',
              included: 'included',
            },
            prepare({ title, included }) {
              return {
                title: title || 'Untitled',
                subtitle: included ? '✓ Included' : '✗ Not included',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'limits',
      title: 'Plan Limits',
      type: 'object',
      fields: [
        { name: 'students', type: 'number', title: 'Max Students' },
        { name: 'storage', type: 'number', title: 'Storage (GB)' },
        { name: 'analyses', type: 'number', title: 'Monthly Analyses' },
      ],
    }),
    defineField({
      name: 'recommended',
      title: 'Recommended',
      type: 'boolean',
      description: 'Highlight as recommended plan',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      tier: 'tier',
      price: 'monthlyPrice',
    },
    prepare({ title, tier, price }) {
      return {
        title: title || 'Untitled',
        subtitle: `${tier} - $${price}/mo`,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
