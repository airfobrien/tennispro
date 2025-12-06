import { author } from './documents/author';
import { category } from './documents/category';
import { coachBlogPost } from './documents/coach-blog-post';
import { coachProfile } from './documents/coach-profile';
import { faq } from './documents/faq';
import { page } from './documents/page';
import { post } from './documents/post';
import { pricingPlan } from './documents/pricing-plan';
import { progressionTemplate } from './documents/progression-template';
import { siteSettings } from './documents/site-settings';
import { testimonial } from './documents/testimonial';
import { blockContent } from './objects/block-content';
import { localizedBlockContent } from './objects/localized-block-content';
import { localizedString } from './objects/localized-string';
import { localizedText } from './objects/localized-text';
import { seo } from './objects/seo';

export const schemaTypes = [
  // Documents - Marketing
  page,
  post,
  author,
  category,
  faq,
  testimonial,
  pricingPlan,

  // Documents - Coach
  coachProfile,
  coachBlogPost,

  // Documents - System
  progressionTemplate,
  siteSettings,

  // Objects
  blockContent,
  seo,
  localizedString,
  localizedText,
  localizedBlockContent,
];
