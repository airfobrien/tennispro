import { defineType, defineField } from 'sanity';

/**
 * System-level progression templates (USPTA, PTR, etc.)
 * These are used to seed coach progression paths
 */
export const progressionTemplate = defineType({
  name: 'progressionTemplate',
  title: 'Progression Template',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Template Name',
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
      name: 'source',
      title: 'Source Organization',
      type: 'string',
      options: {
        list: [
          { title: 'USPTA', value: 'uspta' },
          { title: 'PTR', value: 'ptr' },
          { title: 'ITF', value: 'itf' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'playerCategory',
      title: 'Player Category',
      type: 'string',
      options: {
        list: [
          { title: 'Recreational', value: 'recreational' },
          { title: 'Competitive Junior', value: 'competitive_junior' },
          { title: 'Collegiate Track', value: 'collegiate_track' },
          { title: 'Professional Track', value: 'professional_track' },
          { title: 'Senior', value: 'senior' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'levels',
      title: 'Levels',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'level',
          fields: [
            { name: 'name', type: 'localizedString', title: 'Level Name' },
            { name: 'description', type: 'localizedText', title: 'Description' },
            { name: 'order', type: 'number', title: 'Order' },
            {
              name: 'skills',
              type: 'array',
              title: 'Skills',
              of: [
                {
                  type: 'object',
                  name: 'skill',
                  fields: [
                    { name: 'name', type: 'localizedString', title: 'Skill Name' },
                    { name: 'description', type: 'localizedText', title: 'Description' },
                    {
                      name: 'category',
                      type: 'string',
                      title: 'Category',
                      options: {
                        list: [
                          { title: 'Serve', value: 'serve' },
                          { title: 'Forehand', value: 'forehand' },
                          { title: 'Backhand', value: 'backhand' },
                          { title: 'Volley', value: 'volley' },
                          { title: 'Overhead', value: 'overhead' },
                          { title: 'Movement', value: 'movement' },
                          { title: 'Strategy', value: 'strategy' },
                          { title: 'Mental', value: 'mental' },
                        ],
                      },
                    },
                    { name: 'order', type: 'number', title: 'Order' },
                    {
                      name: 'milestones',
                      type: 'array',
                      title: 'Milestones',
                      of: [
                        {
                          type: 'object',
                          name: 'milestone',
                          fields: [
                            { name: 'name', type: 'localizedString', title: 'Milestone Name' },
                            { name: 'description', type: 'localizedText', title: 'Description' },
                            { name: 'order', type: 'number', title: 'Order' },
                            {
                              name: 'targetMetrics',
                              type: 'array',
                              title: 'Target Metrics',
                              of: [
                                {
                                  type: 'object',
                                  fields: [
                                    { name: 'name', type: 'string', title: 'Metric Name' },
                                    { name: 'value', type: 'number', title: 'Target Value' },
                                    { name: 'unit', type: 'string', title: 'Unit' },
                                    {
                                      name: 'comparison',
                                      type: 'string',
                                      title: 'Comparison',
                                      options: {
                                        list: [
                                          { title: 'Greater than', value: 'gt' },
                                          { title: 'Less than', value: 'lt' },
                                          { title: 'Equal to', value: 'eq' },
                                          { title: 'Between', value: 'between' },
                                        ],
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                          preview: {
                            select: { title: 'name.en', order: 'order' },
                            prepare({ title, order }) {
                              return { title: `${order}. ${title || 'Untitled'}` };
                            },
                          },
                        },
                      ],
                    },
                  ],
                  preview: {
                    select: { title: 'name.en', category: 'category' },
                    prepare({ title, category }) {
                      return { title: title || 'Untitled', subtitle: category };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'name.en', order: 'order' },
            prepare({ title, order }) {
              return { title: `Level ${order}: ${title || 'Untitled'}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Make template available to coaches',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      source: 'source',
      category: 'playerCategory',
    },
    prepare({ title, source, category }) {
      return {
        title: title || 'Untitled',
        subtitle: `${source?.toUpperCase() || ''} • ${category || ''}`,
      };
    },
  },
});
