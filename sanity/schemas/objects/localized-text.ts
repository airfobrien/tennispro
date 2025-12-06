import { defineType } from 'sanity';

/**
 * Localized text (multiline) for i18n support
 */
export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
    },
    {
      name: 'es',
      title: 'Spanish',
      type: 'text',
      rows: 3,
    },
    {
      name: 'fr',
      title: 'French',
      type: 'text',
      rows: 3,
    },
    {
      name: 'pt',
      title: 'Portuguese',
      type: 'text',
      rows: 3,
    },
  ],
});
