# TennisPro V1 (TPv1) - Requirements Document

**Document ID:** TPv1-REQ-001  
**Version:** 0.2.0 (AWS Architecture Applied)  
**Created:** 2025-12-06T16:15:00Z  
**Last Updated:** 2025-12-06T17:25:00Z  
**Status:** 🟡 In Progress - Requirements Phase  
**Author:** Bob O'Brien  
**Derived From:** TPv1_Plan.md v1.2.0  

---

## Document Hierarchy

```
TPv1_Plan.md ✅ COMPLETE (v1.2.0)
    ├── TPv1_ADR_001_Backend_Infrastructure.md ✅ DECIDED (AWS Native)
    └── TPv1_Requirements.md (this document) 🟡 IN PROGRESS
        ├── TPv1_Spec.md (Phase 3 - pending)
        ├── TPv1_Technical_Spec.md (Phase 3 - pending)
        └── TPv1_Tasks.md (Phase 4 - pending)
```

---

## Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.2.0 | 2025-12-06 | Updated for AWS Native architecture; revised integration requirements (Cognito, Aurora, API Gateway, Lambda); updated data model storage references | Bob O'Brien |
| 0.1.0 | 2025-12-06 | Initial requirements document; Marketing Site and Coach Portal segments | Bob O'Brien |

---

## Document Scope

This requirements document covers two primary segments of the TennisPro platform:

| Segment | Description | Primary Users |
|---------|-------------|---------------|
| **Marketing Site** | Public-facing website for lead generation, SEO, and brand presence | Prospective coaches, general public |
| **Coach Portal** | Authenticated application for coach business management | Independent Pros, HP/Academy Coaches |

**Out of Scope (Covered in Separate Documents):**
- Student Portal (TPv1_Requirements_StudentPortal.md)
- Video Analysis Engine (TPv1_Requirements_VideoAnalysis.md)
- External Integrations (TPv1_Requirements_Integrations.md)

---

# PART 1: MARKETING SITE

## 1.1 Overview

### Purpose
The Marketing Site serves as the public face of TennisPro, driving coach acquisition through SEO, content marketing, and social proof. It must communicate the value proposition clearly and convert visitors into trial signups.

### Success Criteria
- Organic traffic growth month-over-month
- Visitor-to-signup conversion rate > 3%
- SEO ranking for target keywords (e.g., "tennis coaching software", "tennis lesson management")
- Support for 4 languages with localized content

### User Personas

| Persona | Description | Goals |
|---------|-------------|-------|
| **Curious Coach** | Heard about TennisPro, exploring options | Understand features, see pricing, evaluate fit |
| **Comparison Shopper** | Actively comparing coaching tools | See differentiators, read testimonials, check integrations |
| **Ready Buyer** | Decided to try, looking to sign up | Quick signup flow, clear pricing, no friction |
| **Returning Visitor** | Signed up previously, returning for info | Access blog, help docs, login quickly |

---

## 1.2 Functional Requirements

### 1.2.1 Site Structure & Navigation

**REQ-MKT-001:** Global Navigation
- The site SHALL display a persistent navigation header on all pages
- Navigation SHALL include: Features, Pricing, Blog, Help, Login, Sign Up (CTA)
- Navigation SHALL be responsive (hamburger menu on mobile)
- Navigation SHALL include language selector (EN/ES/FR/PT)

**REQ-MKT-002:** Footer
- The site SHALL display a persistent footer on all pages
- Footer SHALL include: Company info, legal links, social media, language selector
- Footer SHALL include newsletter signup form

**REQ-MKT-003:** Site Map
```
tennispro.com/
├── / (Home)
├── /features
│   ├── /features/player-development
│   ├── /features/video-analysis
│   ├── /features/student-management
│   └── /features/coach-branding
├── /pricing
├── /blog
│   └── /blog/{slug}
├── /help
│   └── /help/{category}/{article}
├── /about
├── /contact
├── /login
├── /signup
├── /legal
│   ├── /legal/terms
│   ├── /legal/privacy
│   └── /legal/cookies
└── /c/{coach-slug} (Coach Public Pages - see 1.2.7)
```

### 1.2.2 Home Page

**REQ-MKT-010:** Hero Section
- The home page SHALL display a hero section with:
  - Primary headline communicating core value proposition
  - Secondary supporting text
  - Primary CTA button ("Start Free Trial" or equivalent)
  - Secondary CTA ("See How It Works")
  - Hero image or video showcasing the platform

**REQ-MKT-011:** Value Proposition Sections
- The home page SHALL include sections highlighting:
  - Quantified Player Development framework
  - AI-powered video analysis
  - Business management consolidation
  - Coach-branded student portals

**REQ-MKT-012:** Social Proof
- The home page SHALL display:
  - Coach testimonials (minimum 3)
  - Key statistics (coaches using platform, students tracked, etc.)
  - Trust badges (security, certifications if applicable)

**REQ-MKT-013:** Feature Preview
- The home page SHALL include visual previews of key features
- Each preview SHALL link to detailed feature page

**REQ-MKT-014:** Final CTA
- The home page SHALL end with a prominent call-to-action section
- CTA SHALL include signup form or button

### 1.2.3 Features Pages

**REQ-MKT-020:** Features Overview
- The /features page SHALL provide overview of all major features
- Each feature SHALL link to its dedicated page

**REQ-MKT-021:** Feature Detail Pages
- Each feature page SHALL include:
  - Detailed description of the feature
  - Screenshots or video demonstrations
  - Specific benefits for coaches and students
  - Use cases or scenarios
  - CTA to sign up

**REQ-MKT-022:** Required Feature Pages
- Player Development Framework (/features/player-development)
- Video Analysis (/features/video-analysis)
- Student Management (/features/student-management)
- Coach Branding & SEO (/features/coach-branding)

### 1.2.4 Pricing Page

**REQ-MKT-030:** Pricing Display
- The pricing page SHALL display all subscription tiers:
  - Starter ($49/mo)
  - Professional ($99/mo)
  - Enterprise ($199/mo)
- Each tier SHALL clearly show:
  - Price (monthly and annual if applicable)
  - Student limit
  - Storage limit
  - AI analyses per month
  - Feature access (progression paths, integrations)
  - CTA button

**REQ-MKT-031:** Feature Comparison
- The pricing page SHALL include a feature comparison table
- Table SHALL clearly indicate which features are included in each tier
- Table SHALL use checkmarks/X marks or similar clear indicators

**REQ-MKT-032:** FAQ Section
- The pricing page SHALL include pricing-related FAQs:
  - Billing frequency
  - Upgrade/downgrade process
  - Overage policies
  - Refund policy
  - Enterprise/custom pricing

**REQ-MKT-033:** Annual Discount (Future)
- The pricing page SHOULD support annual pricing with discount
- Toggle between monthly/annual views

### 1.2.5 Blog

**REQ-MKT-040:** Blog Index
- The /blog page SHALL display a list of published articles
- Articles SHALL be displayed in reverse chronological order
- Each article preview SHALL show: title, excerpt, date, author, category, featured image
- Pagination SHALL be implemented (10-20 articles per page)

**REQ-MKT-041:** Blog Categories
- The blog SHALL support categorization:
  - Product Updates
  - Tennis Coaching Tips
  - Player Development
  - Success Stories
  - Industry News
- Category filtering SHALL be available

**REQ-MKT-042:** Blog Article Page
- Each article page SHALL display:
  - Title, author, date, category
  - Featured image
  - Full article content (rich text, images, embeds)
  - Social sharing buttons
  - Related articles
  - CTA to sign up

**REQ-MKT-043:** Blog SEO
- Each article SHALL have customizable meta title and description
- Articles SHALL support Open Graph and Twitter Card metadata
- Articles SHALL have semantic HTML structure (h1, h2, etc.)

### 1.2.6 Help Center

**REQ-MKT-050:** Help Index
- The /help page SHALL display help categories
- Search functionality SHALL be available
- Popular/featured articles SHALL be highlighted

**REQ-MKT-051:** Help Categories
- Help articles SHALL be organized into categories:
  - Getting Started
  - Account & Billing
  - Student Management
  - Progression Paths
  - Video Analysis
  - Troubleshooting

**REQ-MKT-052:** Help Article Page
- Each help article SHALL display:
  - Title and category breadcrumb
  - Article content (rich text, images, videos)
  - "Was this helpful?" feedback mechanism
  - Related articles
  - Contact support link

**REQ-MKT-053:** Search
- Help center SHALL support full-text search
- Search results SHALL display relevant articles with excerpts
- Search SHALL support autocomplete suggestions

### 1.2.7 Coach Public Pages

**REQ-MKT-060:** Coach Profile URL
- Each coach SHALL have a public profile at tennispro.com/c/{coach-slug}
- Coach slug SHALL be unique and URL-safe
- Coach MAY customize their slug (subject to availability)

**REQ-MKT-061:** Coach Profile Content
- Coach public page SHALL display:
  - Coach name and photo
  - Bio/description
  - Credentials and certifications
  - Specializations (player types, age groups)
  - Teaching locations
  - Services offered (lesson types, pricing if enabled)
  - Photo gallery
  - Testimonials from students
  - Contact/inquiry form

**REQ-MKT-062:** Coach Page SEO
- Coach pages SHALL be optimized for local SEO
- Each page SHALL have unique meta title/description
- Schema.org LocalBusiness markup SHALL be included
- Pages SHALL be indexable by search engines

**REQ-MKT-063:** Student Signup
- Coach pages SHALL include "Become a Student" CTA
- CTA SHALL initiate student signup flow
- Student SHALL be associated with the coach upon signup

**REQ-MKT-064:** Coach Control
- Coaches SHALL be able to:
  - Enable/disable public profile visibility
  - Edit all content via Coach Portal or Sanity Studio
  - View analytics for their page (views, inquiries)

---

## 1.3 Internationalization (i18n) Requirements

**REQ-MKT-100:** Supported Languages
- The marketing site SHALL support 4 languages:
  - English (en) - default
  - Spanish (es)
  - French (fr)
  - Portuguese (pt)

**REQ-MKT-101:** URL Structure
- Localized pages SHALL use path prefix:
  - tennispro.com/es/features
  - tennispro.com/fr/pricing
  - tennispro.com/pt/blog
- English MAY omit prefix (tennispro.com/features)

**REQ-MKT-102:** Language Detection
- Site SHALL detect user's browser language preference
- Site SHALL offer to switch to detected language (non-intrusive)
- User's language choice SHALL be persisted (cookie/localStorage)

**REQ-MKT-103:** Language Selector
- Language selector SHALL be available in header and footer
- Selector SHALL display language names in native script (Español, Français, Português)
- Switching language SHALL navigate to equivalent page in new language

**REQ-MKT-104:** Content Translation
- All UI strings SHALL be translated
- Marketing content (Sanity) SHALL support per-language versions
- Blog posts MAY be language-specific (not all posts in all languages)

**REQ-MKT-105:** SEO for i18n
- Pages SHALL include hreflang tags for all language versions
- Sitemap SHALL include all language variations
- Each language version SHALL have unique meta descriptions

---

## 1.4 Non-Functional Requirements

### Performance

**REQ-MKT-200:** Page Load Speed
- Marketing pages SHALL achieve Lighthouse Performance score ≥ 90
- Largest Contentful Paint (LCP) SHALL be < 2.5 seconds
- First Input Delay (FID) SHALL be < 100ms
- Cumulative Layout Shift (CLS) SHALL be < 0.1

**REQ-MKT-201:** Image Optimization
- Images SHALL be served in modern formats (WebP, AVIF)
- Images SHALL be responsive (srcset)
- Images SHALL be lazy-loaded below the fold

**REQ-MKT-202:** Caching
- Static assets SHALL have long cache TTLs (1 year)
- HTML pages SHALL use ISR (Incremental Static Regeneration)
- Sanity content SHALL trigger revalidation on publish

### SEO

**REQ-MKT-210:** Technical SEO
- Site SHALL have valid robots.txt
- Site SHALL have XML sitemap (auto-generated)
- Site SHALL have proper canonical URLs
- Site SHALL not have duplicate content issues

**REQ-MKT-211:** Structured Data
- Home page SHALL include Organization schema
- Blog posts SHALL include Article schema
- Coach pages SHALL include LocalBusiness schema
- Pricing page SHALL include Product schema

**REQ-MKT-212:** Meta Tags
- All pages SHALL have unique title tags (< 60 chars)
- All pages SHALL have unique meta descriptions (< 160 chars)
- All pages SHALL have Open Graph tags
- All pages SHALL have Twitter Card tags

### Accessibility

**REQ-MKT-220:** WCAG Compliance
- Site SHALL meet WCAG 2.1 Level AA standards
- All images SHALL have alt text
- All interactive elements SHALL be keyboard accessible
- Color contrast ratios SHALL meet minimum requirements
- Skip navigation link SHALL be provided

### Analytics

**REQ-MKT-230:** Tracking
- Site SHALL integrate analytics (Vercel Analytics, Plausible, or similar)
- Privacy-respecting analytics SHALL be preferred
- Key events SHALL be tracked:
  - Page views
  - Signup button clicks
  - Pricing tier selection
  - Blog article reads
  - Help article searches

---

## 1.5 Content Management Requirements

**REQ-MKT-300:** CMS Integration
- All marketing content SHALL be managed via Sanity.io
- Content editors SHALL be able to update without developer involvement
- Changes SHALL be previewable before publishing
- Publishing SHALL trigger site revalidation

**REQ-MKT-301:** Content Types (Sanity)
- CMS SHALL support these content types:
  - Page (landing pages)
  - Feature (feature detail pages)
  - BlogPost (blog articles)
  - HelpArticle (help documentation)
  - Testimonial (coach testimonials)
  - FAQ (frequently asked questions)
  - Announcement (banners, alerts)
  - TeamMember (about page)

**REQ-MKT-302:** Rich Text
- Rich text fields SHALL support:
  - Headings (H2-H4)
  - Bold, italic, underline
  - Links (internal and external)
  - Bullet and numbered lists
  - Images with captions
  - Video embeds (YouTube, Vimeo)
  - Code blocks
  - Block quotes
  - Tables

**REQ-MKT-303:** Editorial Workflow
- Content SHALL support draft/published states
- Content SHOULD support scheduled publishing
- Content SHOULD support revision history

---

# PART 2: COACH PORTAL

## 2.1 Overview

### Purpose
The Coach Portal is the authenticated application where tennis professionals manage their coaching business. It consolidates student management, progression tracking, video analysis, scheduling, and business operations into a single platform.

### Success Criteria
- Coach activation rate > 80% (completing onboarding within 7 days)
- Weekly active usage > 3 sessions
- Feature adoption across core modules
- Coach retention > 90% (after Month 3)

### User Personas

| Persona | Description | Primary Needs |
|---------|-------------|---------------|
| **New Coach** | Just signed up, setting up | Guided onboarding, import students, configure basics |
| **Active Coach** | Regular user, managing business | Quick student access, log progress, upload videos |
| **Data-Driven Coach** | HP/Academy, metrics-focused | Detailed analytics, AI insights, progression tracking |
| **Mobile Coach** | Works primarily on phone/tablet | Touch-friendly, offline capable, quick actions |

---

## 2.2 Functional Requirements

### 2.2.1 Authentication & Account

**REQ-CP-001:** Registration
- Coaches SHALL be able to register via:
  - Email and password
  - Google OAuth
  - Apple OAuth (for iOS PWA)
- Registration SHALL require email verification

**REQ-CP-002:** Login
- Coaches SHALL be able to login via:
  - Email and password
  - Google OAuth
  - Apple OAuth
- "Remember me" option SHALL be available
- Session timeout SHALL be configurable (default: 7 days)

**REQ-CP-003:** Password Management
- Coaches SHALL be able to reset password via email
- Coaches SHALL be able to change password when authenticated
- Passwords SHALL meet minimum complexity requirements

**REQ-CP-004:** Account Settings
- Coaches SHALL be able to manage:
  - Email address (with verification)
  - Password
  - Profile photo
  - Notification preferences
  - Language preference
  - Timezone
  - Account deletion (with confirmation)

**REQ-CP-005:** Subscription Management
- Coaches SHALL be able to view current subscription tier
- Coaches SHALL be able to upgrade/downgrade tier
- Coaches SHALL be able to update payment method
- Coaches SHALL be able to view billing history
- Coaches SHALL be able to cancel subscription

### 2.2.2 Onboarding

**REQ-CP-010:** Onboarding Flow
- New coaches SHALL be guided through setup wizard
- Wizard SHALL be skippable (can return later)
- Wizard SHALL track completion progress

**REQ-CP-011:** Onboarding Steps
1. Welcome and account basics
2. Profile setup (bio, photo, credentials)
3. Teaching location(s)
4. Services/lesson types
5. First student (add or import)
6. Choose progression template (or create custom)
7. Public profile preview

**REQ-CP-012:** Onboarding Checklist
- Dashboard SHALL display onboarding checklist until complete
- Checklist items SHALL link to relevant setup areas
- Completion SHALL trigger "congratulations" acknowledgment

### 2.2.3 Dashboard

**REQ-CP-020:** Dashboard Overview
- Dashboard SHALL be the default landing page after login
- Dashboard SHALL provide at-a-glance business summary

**REQ-CP-021:** Dashboard Widgets
- Dashboard SHALL display:
  - Quick stats (total students, active students, upcoming lessons)
  - Recent activity feed (new students, milestones achieved, videos analyzed)
  - Upcoming schedule (next 7 days)
  - Quick actions (add student, upload video, log progress)
  - Alerts/notifications

**REQ-CP-022:** Dashboard Customization
- Coaches SHOULD be able to customize widget layout
- Coaches SHOULD be able to hide/show specific widgets

### 2.2.4 Student Management

**REQ-CP-030:** Student List
- Coaches SHALL be able to view all their students
- List SHALL support:
  - Search by name
  - Filter by status (active, inactive, archived)
  - Filter by player category
  - Filter by level
  - Sort by name, date added, last activity
  - Pagination or infinite scroll

**REQ-CP-031:** Add Student
- Coaches SHALL be able to add students manually:
  - Name (required)
  - Email (optional, for student portal access)
  - Phone (optional)
  - Photo (optional)
  - Player category (required)
  - Starting level (optional)
  - Notes (optional)

**REQ-CP-032:** Student Invitation
- Coaches SHALL be able to invite students via email
- Invitation SHALL include link to student signup
- Invited student SHALL be auto-associated with coach

**REQ-CP-033:** Student Import
- Coaches SHOULD be able to bulk import students via CSV
- Import SHALL map columns to student fields
- Import SHALL report errors and successes

**REQ-CP-034:** Student Profile View
- Coaches SHALL be able to view student detail page including:
  - Basic info (name, photo, contact)
  - Player category and current level
  - Progression path status ("You are here")
  - Skill ratings and milestones
  - Video library
  - Lesson history/notes
  - Achievement badges

**REQ-CP-035:** Edit Student
- Coaches SHALL be able to edit all student fields
- Changes SHALL be saved and timestamped
- Coaches SHALL be able to change player category (with confirmation)

**REQ-CP-036:** Archive Student
- Coaches SHALL be able to archive students (soft delete)
- Archived students SHALL not count toward tier limit
- Archived students SHALL be restorable
- Coaches SHALL be able to permanently delete (with confirmation)

### 2.2.5 Player Development Framework

**REQ-CP-040:** Progression Path Templates
- Platform SHALL provide pre-built templates:
  - USPTA-based progression
  - PTR-based progression
- Templates SHALL be available for all 5 player categories

**REQ-CP-041:** Path Customization
- Coaches SHALL be able to customize templates:
  - Rename levels
  - Add/remove/reorder levels
  - Add/remove skills within levels
  - Add/remove milestones within skills
  - Modify milestone descriptions
  - Set target metrics for milestones

**REQ-CP-042:** Custom Path Creation (Professional/Enterprise)
- Coaches on Professional or Enterprise tiers SHALL be able to create paths from scratch
- Creation SHALL support full hierarchy:
  - Path → Levels → Skills → Milestones

**REQ-CP-043:** Path Assignment
- Coaches SHALL assign a progression path to each student
- Students MAY be moved between paths (with progress mapping)

**REQ-CP-044:** Target Metrics
- Coaches SHALL be able to define target metrics for milestones
- Targets SHALL include:
  - Biomechanical angles (e.g., "knee bend > 40°")
  - Ranges (e.g., "hip-shoulder separation: 35-50°")
  - Boolean achievements (e.g., "consistent kinetic chain")
- Targets SHALL be per-student (personalized "ideal")

**REQ-CP-045:** Progress Tracking
- Coaches SHALL be able to mark milestones as:
  - Not started
  - In progress
  - Achieved
- Achievement SHALL record:
  - Date achieved
  - Method (coach assessment, AI validation, match result)
  - Notes (optional)
  - Linked video (optional)

**REQ-CP-046:** Progress Visualization
- Student profile SHALL display visual progression:
  - Current level indicator
  - Skills radar/spider chart
  - Milestone completion percentage
  - "You are here" on path timeline

### 2.2.6 Video Management

**REQ-CP-050:** Video Upload
- Coaches SHALL be able to upload videos for students
- Supported formats: MP4, MOV, WebM
- Maximum file size: 500MB (configurable by tier)
- Maximum duration: 5 minutes
- Upload SHALL show progress indicator
- Upload SHALL support resume on failure

**REQ-CP-051:** Video Library
- Each student SHALL have a video library
- Library SHALL display thumbnails and metadata:
  - Title/filename
  - Upload date
  - Duration
  - Stroke type (if tagged)
  - Analysis status (pending, complete, failed)

**REQ-CP-052:** Video Playback
- Coach SHALL be able to play videos in-app
- Player SHALL support:
  - Play/pause
  - Seek
  - Playback speed (0.25x, 0.5x, 1x, 1.5x, 2x)
  - Frame-by-frame navigation
  - Fullscreen

**REQ-CP-053:** Video Tagging
- Coaches SHALL be able to tag videos:
  - Stroke type (serve, forehand, backhand, volley, overhead, movement)
  - Date recorded
  - Location/context
  - Custom tags

**REQ-CP-054:** Request Analysis
- Coaches SHALL be able to request AI analysis for uploaded video
- Analysis request SHALL specify:
  - Stroke type
  - Focus areas (optional)
- Analysis SHALL consume quota per tier

**REQ-CP-055:** Analysis Results
- Analysis results SHALL display:
  - Skeleton overlay on video
  - Extracted metrics (angles, positions)
  - Comparison to coach-defined targets
  - AI coaching insights (textual feedback)
  - Frame-by-frame metric graphs

**REQ-CP-056:** Skeleton Correction
- Coaches SHALL be able to manually adjust skeleton landmarks
- Adjusted landmarks SHALL trigger metric recalculation
- Original and corrected versions SHALL be preserved

**REQ-CP-057:** Link to Milestone
- Analysis results SHALL be linkable to milestone achievement
- Linking SHALL auto-populate validation evidence

### 2.2.7 Lesson Management

**REQ-CP-060:** Lesson Logging
- Coaches SHALL be able to log lessons after the fact:
  - Student
  - Date and time
  - Duration
  - Type (private, semi-private, group, clinic)
  - Location
  - Notes/observations
  - Skills worked on
  - Videos associated

**REQ-CP-061:** Lesson Notes
- Lesson notes SHALL support rich text
- Notes SHALL be visible to coach only (not student) by default
- Coaches SHALL be able to share specific notes with students

**REQ-CP-062:** Lesson History
- Student profile SHALL display lesson history
- History SHALL be searchable and filterable

**REQ-CP-063:** Quick Actions
- From lesson view, coaches SHALL be able to:
  - Mark milestones achieved
  - Upload video
  - Update skill ratings
  - Schedule follow-up (future)

### 2.2.8 Coach Profile & Branding

**REQ-CP-070:** Profile Management
- Coaches SHALL manage their profile via portal or embedded Sanity Studio
- Profile content SHALL sync to public coach page

**REQ-CP-071:** Profile Fields
- Editable profile fields:
  - Display name
  - Photo/avatar
  - Bio (rich text)
  - Credentials (USPTA, PTR, certifications)
  - Specializations (selectable taxonomy)
  - Years of experience
  - Teaching philosophy
  - Contact preferences

**REQ-CP-072:** Location Management
- Coaches SHALL be able to add multiple teaching locations:
  - Name (e.g., "Main Street Tennis Club")
  - Address
  - Operating hours
  - Photo
  - Notes
- Locations SHALL be displayed on public profile

**REQ-CP-073:** Service Offerings
- Coaches SHALL be able to define services:
  - Name (e.g., "Private Lesson - 1 Hour")
  - Description
  - Duration
  - Price (optional - can hide)
  - Player category fit
- Services SHALL be displayed on public profile

**REQ-CP-074:** Gallery
- Coaches SHALL be able to upload gallery images
- Images SHALL be manageable (reorder, delete, caption)
- Gallery SHALL display on public profile

**REQ-CP-075:** Testimonials
- Coaches SHALL be able to manage testimonials:
  - Add manually (name, text, date)
  - Request from students (email trigger)
  - Approve/hide student-submitted testimonials
- Approved testimonials SHALL display on public profile

**REQ-CP-076:** Custom Slug
- Coaches SHALL be able to customize their profile URL slug
- Slugs SHALL be validated for uniqueness and URL-safety
- Slug changes SHALL implement redirect from old URL

### 2.2.9 Analytics & Reporting

**REQ-CP-080:** Business Dashboard
- Coaches SHALL have access to business analytics:
  - Total students (active/inactive)
  - Student acquisition trend
  - Lesson count over time
  - Video analysis usage

**REQ-CP-081:** Student Progress Report
- Coaches SHALL be able to generate student progress reports:
  - Summary of milestones achieved
  - Skills improvement over time
  - Comparison to targets
  - Videos analyzed
- Reports SHALL be exportable (PDF)
- Reports SHALL be shareable with students/parents

**REQ-CP-082:** Public Page Analytics
- Coaches SHALL see analytics for their public profile:
  - Page views
  - Unique visitors
  - Inquiry form submissions
  - Student signups attributed

### 2.2.10 Notifications

**REQ-CP-090:** In-App Notifications
- Portal SHALL display notification center (bell icon)
- Notifications SHALL include:
  - New student signup
  - Student milestone achievement
  - Video analysis complete
  - Subscription/billing alerts
  - System announcements

**REQ-CP-091:** Email Notifications
- Coaches SHALL receive email notifications for:
  - New student signup (immediate)
  - Weekly summary (configurable)
  - Billing issues (immediate)
- Email preferences SHALL be configurable

**REQ-CP-092:** Push Notifications (PWA)
- PWA SHALL support push notifications (opt-in)
- Push SHALL be used for time-sensitive alerts

---

## 2.3 User Interface Requirements

### 2.3.1 Responsive Design

**REQ-CP-100:** Device Support
- Portal SHALL be fully functional on:
  - Desktop (1024px+)
  - Tablet (640-1024px)
  - Mobile (< 640px)

**REQ-CP-101:** Mobile-First
- UI SHALL be designed mobile-first
- Touch targets SHALL be minimum 44x44px
- Forms SHALL use appropriate mobile keyboards

**REQ-CP-102:** Navigation
- Desktop: Persistent side navigation
- Tablet: Collapsible side navigation
- Mobile: Bottom navigation bar for primary actions

### 2.3.2 PWA Requirements

**REQ-CP-110:** Installability
- Portal SHALL be installable as PWA
- Install prompt SHALL appear after engagement criteria met
- App icon and splash screen SHALL be configured

**REQ-CP-111:** Offline Support
- Core UI SHALL load offline
- Cached data SHALL be available offline (read-only)
- Offline actions SHALL be queued and synced when online
- Offline status SHALL be clearly indicated

**REQ-CP-112:** Background Sync
- Video uploads SHALL continue in background
- Failed syncs SHALL retry automatically

### 2.3.3 Accessibility

**REQ-CP-120:** WCAG Compliance
- Portal SHALL meet WCAG 2.1 Level AA
- All interactive elements SHALL be keyboard accessible
- Screen reader support SHALL be implemented
- Focus management SHALL be proper

---

## 2.4 Non-Functional Requirements

### Performance

**REQ-CP-200:** Load Time
- Initial load SHALL be < 3 seconds on 4G
- Subsequent navigations SHALL be < 1 second
- Time to Interactive SHALL be < 5 seconds

**REQ-CP-201:** Video Performance
- Video playback SHALL start within 2 seconds
- Seek operations SHALL be responsive (< 500ms)
- Analysis overlay SHALL not impact playback performance

### Security

**REQ-CP-210:** Data Protection
- All data in transit SHALL use TLS 1.3
- All data at rest SHALL be encrypted
- PII SHALL be handled per privacy policy

**REQ-CP-211:** Session Security
- Sessions SHALL expire after inactivity (configurable)
- Concurrent session limits MAY be enforced
- Suspicious activity SHALL trigger alerts

**REQ-CP-212:** Multi-Tenancy
- Coach data SHALL be strictly isolated
- Row-level security SHALL prevent cross-coach access
- API endpoints SHALL validate coach ownership

### Reliability

**REQ-CP-220:** Availability
- Portal SHALL target 99.9% uptime
- Planned maintenance SHALL be scheduled and communicated
- Degraded functionality SHALL be handled gracefully

**REQ-CP-221:** Data Durability
- Video files SHALL be stored with 99.999999999% durability (S3)
- Database SHALL be backed up daily
- Point-in-time recovery SHALL be available

### Scalability

**REQ-CP-230:** Capacity
- Portal SHALL support growth to 1000+ coaches
- Each coach SHALL support up to 500 students
- Video storage SHALL scale per tier limits

---

## 2.5 Content Management Requirements

**REQ-CP-300:** Coach Content in Sanity
- Coach profile content SHALL be stored in Sanity
- Coaches SHALL access content via:
  - Embedded Sanity Studio in portal, OR
  - Simplified forms that sync to Sanity

**REQ-CP-301:** Real-time Preview
- Profile changes SHALL preview in real-time
- Changes SHALL be saveable as draft before publishing

**REQ-CP-302:** Content Scoping
- Each coach SHALL only access their own content
- Sanity queries SHALL filter by coach ID

---

# PART 3: CROSS-CUTTING REQUIREMENTS

## 3.1 Data Model Summary

### Core Entities

| Entity | Storage | Description |
|--------|---------|-------------|
| Coach | Aurora PostgreSQL | Account, subscription, settings |
| CoachProfile | Sanity | Bio, photo, public content |
| Student | Aurora PostgreSQL | Player info, linked to coach |
| ProgressionPath | Aurora PostgreSQL | Template or custom path |
| Level | Aurora PostgreSQL | Stage within path |
| Skill | Aurora PostgreSQL | Ability within level |
| Milestone | Aurora PostgreSQL | Achievement within skill |
| StudentProgress | Aurora PostgreSQL | Student's milestone status |
| Video | Aurora (meta) + S3 (file) | Uploaded videos |
| Analysis | Aurora PostgreSQL | AI analysis results |
| Lesson | Aurora PostgreSQL | Logged lesson record |

### Entity Relationships

```
Coach (1) ──────< (N) Student
Coach (1) ──────< (N) ProgressionPath (templates + custom)
Student (N) >────── (1) ProgressionPath
ProgressionPath (1) ──────< (N) Level ──────< (N) Skill ──────< (N) Milestone
Student (1) ──────< (N) StudentProgress >────── (1) Milestone
Student (1) ──────< (N) Video ──────< (N) Analysis
Student (1) ──────< (N) Lesson
```

### Multi-Tenancy Pattern

All entities with coach-owned data SHALL include `coach_id` column:
- Enforced at application layer (Lambda handlers)
- coach_id extracted from Cognito JWT claims
- All queries filtered by coach_id

---

## 3.2 Integration Requirements

**REQ-INT-001:** Sanity ↔ Next.js
- Marketing site SHALL fetch content from Sanity at build time (SSG/ISR)
- Content changes SHALL trigger revalidation via webhook to Vercel

**REQ-INT-002:** Sanity ↔ Aurora PostgreSQL
- Coach profile in Sanity SHALL link to Coach ID in Aurora
- Query patterns SHALL join data from both sources as needed
- Sanity webhook SHALL update coach metadata in Aurora when profile changes

**REQ-INT-003:** AWS Cognito Auth
- All authentication SHALL use AWS Cognito
- OAuth providers SHALL be configured (Google, Apple)
- JWTs SHALL include custom claims: coach_id, role, tier
- API Gateway authorizer SHALL validate Cognito JWTs

**REQ-INT-004:** S3 Storage
- Video uploads SHALL use presigned URLs (generated by Lambda)
- Downloads SHALL use CloudFront signed URLs
- Storage paths SHALL include coach_id for isolation
- S3 events SHALL trigger Step Functions for processing

**REQ-INT-005:** API Gateway ↔ Lambda
- REST API SHALL be exposed via API Gateway HTTP API
- WebSocket API SHALL handle real-time notifications
- Lambda functions SHALL be TypeScript (Node.js 20.x)
- All Lambdas SHALL extract coach_id from JWT claims

**REQ-INT-006:** Step Functions ↔ Modal.com
- Video processing workflow SHALL call Modal.com API
- Modal.com SHALL output results to S3
- Step Functions SHALL update Aurora with analysis metadata

**REQ-INT-007:** EventBridge Scheduling
- Daily analytics aggregation SHALL run via EventBridge schedule
- Weekly report generation SHALL run via EventBridge schedule
- Schedules SHALL be defined in CDK infrastructure

---

## 3.3 Acceptance Criteria Format

For Phase 3 (Specification), each requirement will be expanded with:

```
Given [context]
When [action]
Then [expected outcome]
```

---

# NEXT STEPS

1. [ ] Review and validate requirements with stakeholders
2. [ ] Prioritize requirements for MVP vs. post-MVP
3. [ ] Identify gaps or missing requirements
4. [ ] Proceed to Phase 3: Specification (TPv1_Spec.md)

---

*This is a living document. Updates will be tracked in the changelog.*
