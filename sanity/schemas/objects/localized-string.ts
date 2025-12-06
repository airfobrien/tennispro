import { defineType } from 'sanity';

/**
 * Localized string for i18n support
 * Supports: English, Spanish, French, Portuguese
 */
export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
    {
      name: 'es',
      title: 'Spanish',
      type: 'string',
    },
    {
      name: 'fr',
      title: 'French',
      type: 'string',
    },
    {
      name: 'pt',
      title: 'Portuguese',
      type: 'string',
    },
  ],
});
