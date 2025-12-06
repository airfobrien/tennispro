import { groq } from 'next-sanity';

/**
 * GROQ queries for fetching Sanity content
 */

// Locale helper for i18n fields
export const localeField = (field: string, locale = 'en') => `${field}.${locale}`;

// ============================================
// PAGES
// ============================================

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    seo,
    publishedAt
  }
`;

export const allPagesQuery = groq`
  *[_type == "page"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    publishedAt
  }
`;

// ============================================
// BLOG POSTS
// ============================================

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    body,
    seo,
    publishedAt,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    categories[]->{
      _id,
      title,
      slug,
      color
    }
  }
`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    featured,
    author->{
      _id,
      name,
      image
    },
    categories[]->{
      _id,
      title,
      slug,
      color
    }
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name,
      image
    }
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name,
      image
    }
  }
`;

// ============================================
// CATEGORIES
// ============================================

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title.en asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`;

// ============================================
// FAQ
// ============================================

export const allFaqsQuery = groq`
  *[_type == "faq" && published == true] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && published == true && category == $category] | order(order asc) {
    _id,
    question,
    answer
  }
`;

// ============================================
// TESTIMONIALS
// ============================================

export const allTestimonialsQuery = groq`
  *[_type == "testimonial" && published == true] | order(featured desc) {
    _id,
    name,
    role,
    organization,
    image,
    quote,
    rating,
    featured
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && published == true && featured == true][0...6] {
    _id,
    name,
    role,
    organization,
    image,
    quote,
    rating
  }
`;

// ============================================
// PRICING
// ============================================

export const allPricingPlansQuery = groq`
  *[_type == "pricingPlan"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    tier,
    monthlyPrice,
    yearlyPrice,
    features,
    limits,
    recommended
  }
`;

// ============================================
// COACH PROFILES
// ============================================

export const coachProfileBySlugQuery = groq`
  *[_type == "coachProfile" && slug.current == $slug && published == true][0] {
    _id,
    coachId,
    name,
    slug,
    tagline,
    photo,
    coverImage,
    bio,
    credentials,
    specialties,
    playerCategories,
    services,
    location,
    contact,
    social,
    seo,
    acceptingStudents
  }
`;

export const coachProfileByIdQuery = groq`
  *[_type == "coachProfile" && coachId == $coachId][0] {
    _id,
    coachId,
    name,
    slug,
    tagline,
    photo,
    bio,
    published,
    acceptingStudents
  }
`;

export const allPublishedCoachProfilesQuery = groq`
  *[_type == "coachProfile" && published == true] | order(name asc) {
    _id,
    name,
    slug,
    tagline,
    photo,
    specialties,
    location,
    acceptingStudents
  }
`;

// ============================================
// COACH BLOG
// ============================================

export const coachBlogPostsQuery = groq`
  *[_type == "coachBlogPost" && coach->slug.current == $coachSlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    tags
  }
`;

export const coachBlogPostBySlugQuery = groq`
  *[_type == "coachBlogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    body,
    tags,
    publishedAt,
    seo,
    coach->{
      _id,
      name,
      slug,
      photo,
      tagline
    }
  }
`;

// ============================================
// PROGRESSION TEMPLATES
// ============================================

export const allProgressionTemplatesQuery = groq`
  *[_type == "progressionTemplate" && published == true] | order(source asc, name.en asc) {
    _id,
    name,
    slug,
    description,
    source,
    playerCategory
  }
`;

export const progressionTemplateBySlugQuery = groq`
  *[_type == "progressionTemplate" && slug.current == $slug && published == true][0] {
    _id,
    name,
    slug,
    description,
    source,
    playerCategory,
    levels
  }
`;

// ============================================
// SITE SETTINGS
// ============================================

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    favicon,
    ogImage,
    navigation,
    social,
    contact,
    analytics
  }
`;
