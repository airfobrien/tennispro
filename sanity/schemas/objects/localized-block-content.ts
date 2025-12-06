import { defineType } from 'sanity';

/**
 * Localized block content for i18n support
 */
export const localizedBlockContent = defineType({
  name: 'localizedBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'blockContent',
    },
    {
      name: 'es',
      title: 'Spanish',
      type: 'blockContent',
    },
    {
      name: 'fr',
      title: 'French',
      type: 'blockContent',
    },
    {
      name: 'pt',
      title: 'Portuguese',
      type: 'blockContent',
    },
  ],
});
