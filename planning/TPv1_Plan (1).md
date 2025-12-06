# TennisPro V1 (TPv1) - Product Plan

**Document ID:** TPv1-PLAN-001  
**Version:** 1.3.0 (V1 Features Complete)  
**Created:** 2025-12-06T14:30:00Z  
**Last Updated:** 2025-12-06T19:30:00Z  
**Status:** ✅ Complete  
**Author:** Bob O'Brien  

---

## Document Hierarchy

```
TPv1_Plan.md (this document) ✅ COMPLETE
    ├── TPv1_ADR_001_Backend_Infrastructure.md ✅ DECIDED (AWS Native)
    ├── TPv1_Requirements.md ✅ COMPLETE (Marketing + Coach Portal)
    ├── TPv1_Requirements_StudentPortal.md ✅ COMPLETE
    ├── TPv1_UseCases.md ✅ COMPLETE
    ├── TPv1_Tasks.md ✅ COMPLETE
    ├── TPv1_Spec.md (Phase 3 - pending)
    └── TPv1_Technical_Spec.md (Phase 3 - pending)
```

---

## Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.3.0 | 2025-12-06 | **V1 Features Expanded:** Added Student Portal, Coach-Student Messaging, Student Goals/Objectives, Coach Blog Posts, Student Video Upload to V1 scope; AI Chatbot deferred to V1.1 | Bob O'Brien |
| 1.2.0 | 2025-12-06 | **Architecture Decision: AWS Native.** Updated core platform to AWS (Cognito, Aurora PostgreSQL, API Gateway, Lambda, S3, CloudFront, Step Functions); updated multi-tenancy for AWS; revised cost projections; added progressive analytics path | Bob O'Brien |
| 1.1.0 | 2025-12-06 | Added Sanity.io headless CMS architecture for marketing and coach content management | Bob O'Brien |
| 1.0.0 | 2025-12-06 | **Plan Phase Complete.** Added comprehensive AI biomechanical metrics scope; defined coach-defined ideal vs AI-measured approach | Bob O'Brien |
| 0.6.0 | 2025-12-06 | Global launch with 4 languages; PWA-first strategy; hybrid video processing; multi-tenancy isolation | Bob O'Brien |
| 0.5.0 | 2025-12-06 | Set 6-month targets (25 coaches, $1K MRR); defined pricing tier gates | Bob O'Brien |
| 0.4.0 | 2025-12-06 | Defined success metrics (coach retention); full V1 scope for Player Development Framework | Bob O'Brien |
| 0.3.0 | 2025-12-06 | Defined V1 target segments: Independent Pros + HP/Academy Coaches | Bob O'Brien |
| 0.2.0 | 2025-12-06 | Refined vision to include quantified player development | Bob O'Brien |
| 0.1.0 | 2025-12-06 | Initial shell created | Bob O'Brien |

---

# SECTION 1: MISSION

## 1.1 Vision Statement

> _"To be the essential platform that empowers tennis professionals to build thriving coaching businesses while providing structured frameworks to define, quantify, and track student development—transforming coaching from subjective art into measurable science without losing the personal touch that makes great instruction."_

### Vision Pillars

1. **Thriving Coach Businesses** - Consolidate fragmented tools, streamline operations, optimize revenue
2. **Quantified Player Development** - Make progress measurable, visible, and celebratable  
3. **Configurable Methodology** - "It's a Process, YOUR Process" - coaches define their own paths
4. **AI-Enhanced Instruction** - Augment coach expertise with biomechanical analysis and insights

## 1.2 Core Value Proposition

### For Tennis Professionals (Primary Customer)
- **Business Consolidation** - One platform replaces scheduling, payments, video, and student management tools
- **Methodology Framework** - Define progression paths based on USPTA/PTR models (or create custom)
- **Quantified Coaching** - Track student development with measurable milestones, not just intuition
- **AI Analysis Tools** - Biomechanical video analysis that extends coach expertise
- **Student Acquisition** - SEO-optimized coach profiles that drive new student discovery
- **Revenue Optimization** - Clear visibility into business health and growth opportunities

### For Students (End Users)
- **Visible Progress** - "You are here" on your development journey with clear next steps
- **Structured Learning** - Know what skills you're working on and why they matter
- **Objective Feedback** - AI-assisted video analysis complements coach instruction
- **Seamless Experience** - Book, pay, track progress, review videos in one place

## 1.3 Player Development Framework

> *The heart of TennisPro's differentiation: configurable progression paths that let each coach formalize their methodology.*

### V1 Scope Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Template vs. Custom** | Both | Coaches can start from USPTA/PTR templates OR build from scratch. Maximum flexibility honors "It's YOUR Process" |
| **Player Categories** | All 5 | Full coverage from day one - Recreational through Professional + Senior |
| **Validation Methods** | Both | Coach assessment + AI metrics. Full quantification capability differentiates from competitors |

### Player Categories (All Supported in V1)

| Category | Description | Typical Goals | Progression Focus |
|----------|-------------|---------------|-------------------|
| **Recreational** | Adults playing for fitness and fun | Consistency, enjoyment, social play | Technique fundamentals, rally consistency |
| **Competitive Junior** | Tournament-focused youth players | Ranking improvement, skill mastery | Technical + tactical + mental development |
| **Collegiate Track** | High school players targeting college tennis | Recruitment readiness, UTR optimization | Match performance, video portfolio |
| **Professional Track** | Elite juniors/adults pursuing pro careers | Peak performance, tour preparation | Advanced tactics, physical/mental edge |
| **Senior** | 40+ competitive or recreational players | Adapted techniques, injury prevention | Modified mechanics, strategic play |

### Progression Path Components

Each path consists of:

1. **Levels** - Stages of development (e.g., Beginner → Intermediate → Advanced → Elite)
2. **Skills** - Categorized abilities within each level (e.g., Forehand → Grip, Stance, Swing Path, Contact Point)
3. **Milestones** - Specific, measurable achievements (e.g., "Can rally 20 balls crosscourt with topspin")
4. **Criteria** - How milestones are validated (V1 supports ALL methods):
   - ✅ Coach assessment (subjective but expert)
   - ✅ AI metrics (objective biomechanical data from video analysis)
   - ✅ Match results (UTR, tournament performance - via integration)
   - ✅ Time/repetition (hours practiced, drills completed)

### Framework Sources

Coaches can start from established models and customize, OR build from scratch:

**Template Starting Points:**
- **USPTA** - Skill development benchmarks by age/level
- **PTR** - Performance pathway progressions  
- **USTA** - American Development Model stages
- **UTR Ranges** - Rating-based skill expectations

**Custom Creation:**
- Blank canvas for coaches with unique methodologies
- Import/export capability for sharing between coaches (future)
- Clone and modify existing paths

### Quantification Philosophy

> "What gets measured gets improved."

The platform transforms coaching from *"I think you're getting better"* to *"You've mastered 8 of 12 intermediate forehand skills, with 'low-to-high swing path' rated at 85% consistency based on your last 3 video analyses."*

This quantification:
- Motivates students with visible progress
- Justifies lesson investment to parents/players
- Differentiates coaches who use the platform
- Creates data for AI-enhanced recommendations
- Enables objective comparison over time

## 1.4 Target Users

### Primary: Tennis Professionals (V1 Focus)

#### Segment A: Independent Teaching Pros
> *Primary V1 target - fastest path to adoption*

**Profile:**
- Self-employed or 1099 contractors
- Teach at multiple locations (clubs, parks, private courts)
- Manage their own scheduling, payments, and client relationships
- Typically 15-40 students across skill levels
- Tech-savvy enough to adopt new tools, but time-constrained

**Pain Points:**
- Juggling multiple apps (calendar, Venmo, Google Drive for videos, spreadsheets for tracking)
- No systematic way to document student progress
- Difficulty scaling beyond word-of-mouth referrals
- Administrative overhead cuts into teaching time

**Value Drivers:**
- Time savings from consolidation
- Professional image with branded portal
- Student retention through visible progress
- New student acquisition via SEO

#### Segment B: High-Performance / Academy Coaches
> *Secondary V1 target - higher complexity, higher value*

**Profile:**
- Work within academy structure but may also have private clients
- Focus on competitive juniors, collegiate track, and aspiring pros
- Data-driven mindset (already tracking UTR, match stats, training loads)
- Often certified (USPTA/PTR) with formal methodology training
- Straddle both academy and independent work

**Pain Points:**
- Need sophisticated progress tracking across multiple development dimensions
- Want to quantify what separates their coaching from competitors
- Require integration with rating systems (UTR, USTA) and match data (Smashpoint)
- Managing parent expectations with objective progress data

**Value Drivers:**
- Quantified player development framework validates their methodology
- AI video analysis extends their expertise
- Data-backed progress reports for parents/players
- Competitive differentiation in crowded HP market

### V1 Segment Strategy

```
┌─────────────────────────────────────────────────────────────┐
│  PRIMARY: Independent Pros                                  │
│  - Fastest adoption cycle (they decide)                     │
│  - Validates core platform value                            │
│  - Several available as beta testers in Bob's network       │
├─────────────────────────────────────────────────────────────┤
│  SECONDARY: HP/Academy Coaches                              │
│  - 4-5 SMEs available for co-development                    │
│  - Stress-tests progression framework                       │
│  - Higher feature requirements inform roadmap               │
│  - Work within Bob's academy                                │
└─────────────────────────────────────────────────────────────┘
```

### SME Access (Competitive Advantage)

> Direct access to coaches across both segments within the academy provides:
> - Real-world workflow validation
> - Beta testing with authentic use cases
> - Rapid feedback loops during development
> - Domain expertise for progression path templates
> - Immediate customer discovery interviews

### Secondary: Tennis Students (V1 Focus)

#### Segment A: Recreational Adults
- Playing for fitness, fun, and social connection
- Want to see improvement but not obsessive about metrics
- Value convenience (booking, payments) and encouragement

#### Segment B: Competitive Juniors (and Parents)
- Tournament-focused, often with college aspirations
- Parents deeply invested in tracking progress and ROI
- Want objective data to complement coach feedback
- UTR-aware, tracking rankings and match results

### Deferred Segments (Post-V1)

- **Club-Employed Coaches** - Require facility-level sales, slower adoption
- **College Coaches** - Institutional sales cycle, compliance complexity
- **Pure Recreational Students** - Lower willingness to pay for premium features

## 1.5 Success Metrics

### North Star Metric: Coach Retention

> **Coach retention is the ONE metric that proves product-market fit.** If coaches stay, it means the platform delivers real value. Everything else flows from retention.

**Target:** 90%+ monthly retention after Month 3 (allowing for early churn during onboarding)

### 6-Month Success Targets

| Metric | Target | Notes |
|--------|--------|-------|
| **Paying Coaches** | 25 | Validates market demand |
| **MRR** | $1,000 | ~$40 ARPC blended across tiers |
| **Monthly Retention** | 90%+ | North star after Month 3 |

### Business Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| Monthly Coach Retention | 90%+ | North star - proves stickiness |
| Paying Coaches (6-mo) | 25 | Primary acquisition goal |
| MRR (6-mo) | $1,000 | Proves willingness to pay |
| Average Revenue Per Coach | ~$40 | Will increase as coaches upgrade tiers |
| Coach Acquisition Cost | Track from launch | Optimize over time |

### Product Metrics (Leading Indicators of Retention)

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Coach Activation Rate | 80%+ | % completing onboarding within 7 days |
| Students per Coach | 10+ active | Proves value to coach's business |
| Progression Milestones Logged | 5+ per student/month | Proves framework is being used |
| Video Analyses per Coach | 10+ per month | Proves AI differentiator adoption |
| Weekly Active Usage | 3+ sessions | Habitual engagement |

### Quality Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| Coach NPS | 50+ | Promoter score indicates word-of-mouth potential |
| Support Tickets | <2 per coach/month | Platform stability and UX quality |
| AI Analysis Accuracy Rating | 4+ stars | Coach validation of AI insights |

> *[TO BE DEFINED: How do we measure success?]*

### Business Metrics
- [ ] Monthly Recurring Revenue (MRR) targets
- [ ] Coach acquisition rate
- [ ] Coach retention/churn rate
- [ ] Average Revenue Per Coach (ARPC)

### Product Metrics
- [ ] Coach activation rate (% completing onboarding)
- [ ] Feature adoption rates
- [ ] Student engagement metrics
- [ ] Video analysis usage

### Quality Metrics
- [ ] NPS score targets
- [ ] Support ticket volume
- [ ] AI analysis accuracy ratings

---

# SECTION 2: MARKET POSITIONING

## 2.1 Problem Statement

> *[TO BE DEFINED: What specific pain points are we solving?]*

### For Coaches
1. Fragmented tools (scheduling here, payments there, videos elsewhere)
2. No standardized way to track student progression
3. Limited AI assistance for analysis
4. Difficulty scaling their business
5. *[Others?]*

### For Students
1. Inconsistent feedback between lessons
2. No visibility into their learning path
3. *[Others?]*

## 2.2 Competitive Landscape

| Competitor | Strengths | Weaknesses | Our Differentiation |
|------------|-----------|------------|---------------------|
| *[TBD]* | | | |
| *[TBD]* | | | |
| *[TBD]* | | | |

## 2.3 Unique Differentiators

1. **Quantified Player Development Framework**  
   - Configurable progression paths by player category (recreational → professional)
   - Measurable milestones with multiple validation criteria (coach, AI, match results)
   - "You are here" visibility that motivates students and justifies investment

2. **"It's a Process, YOUR Process" Methodology**  
   - No single "correct" progression imposed
   - Coaches define their own paths, starting from USPTA/PTR templates or from scratch
   - Platform adapts to coach philosophy, not the other way around

3. **AI-Powered Biomechanical Analysis**  
   - MediaPipe BlazePose 33-point skeleton detection
   - Ball tracking with shot segmentation
   - Interactive Konva.js overlays for frame-by-frame review
   - AI coaching insights that augment (not replace) human expertise

4. **Coach-Branded Student Portals**  
   - SEO-optimized public profiles (`tennispro.com/c/coach-slug`)
   - Student acquisition through organic search
   - White-label feel while leveraging platform infrastructure

5. **Unified Platform**  
   - Replaces 5+ point solutions (scheduling, payments, video, student management, progress tracking)
   - Single source of truth for coach and student data
   - Integrations with existing tools (ClubAutomation, UTR, Smashpoint) rather than full replacement

---

# SECTION 3: PRODUCT ROADMAP

## 3.1 Phase Overview

| Phase | Name | Duration | Focus |
|-------|------|----------|-------|
| 1 | Foundation MVP | Weeks 1-8 | Core platform, auth, **full progression framework**, basic video |
| 2 | Enhanced Analysis | Weeks 9-14 | Advanced video analysis, AI coaching insights |
| 3 | Business Tools | Weeks 15-20 | Payments, scheduling, integrations |
| 4 | Growth & Scale | Weeks 21+ | Marketplace, advanced features |

## 3.2 Phase 1: Foundation MVP

> **Key Decision:** The Player Development Framework ships complete in V1. This is the core differentiator and must be proven with early adopters.

### Must-Have Features

**Authentication & Profiles**
- [ ] Coach authentication (email + social)
- [ ] Coach profile setup and branding
- [ ] Student invitations and onboarding
- [ ] Student authentication (email + social)
- [ ] Student registration via coach invite or public page

**Student Management**
- [ ] Add/edit/archive students
- [ ] Student profiles with basic info
- [ ] Assign students to player categories
- [ ] Student-facing progress view

**Player Development Framework (FULL)**
- [ ] All 5 player categories supported
- [ ] Pre-built USPTA/PTR progression templates
- [ ] Custom path creation from scratch
- [ ] Level → Skill → Milestone hierarchy
- [ ] Coach assessment validation
- [ ] AI metrics validation (from video analysis)
- [ ] "You are here" progress visualization
- [ ] Milestone completion tracking

**Video Analysis (Basic)**
- [ ] Video upload and storage (coach uploads)
- [ ] Student video uploads (for coach review)
- [ ] MediaPipe BlazePose integration (33-point skeleton)
- [ ] Basic AI metrics extraction
- [ ] Link video analysis to milestone validation

**Coach-Branded Pages**
- [ ] Public coach profile (`tennispro.com/c/{slug}`)
- [ ] Student signup flow
- [ ] Basic SEO optimization
- [ ] Coach blog posts (via Sanity CMS)

**Student Portal**
- [ ] Student dashboard with progress overview
- [ ] View assigned progression path ("You Are Here")
- [ ] View video library and analysis results
- [ ] Student goals/objectives creation
- [ ] View shared lesson notes
- [ ] View coach blog posts

**Messaging**
- [ ] Coach-student private messaging
- [ ] Conversation threads per student
- [ ] Message notifications (in-app, email, push)
- [ ] Read receipts
- [ ] Unread message indicators

**Student Goals**
- [ ] Students create personal goals
- [ ] Goal categories (skill, competition, rating, fitness, custom)
- [ ] Goal status tracking (in progress, achieved, paused)
- [ ] Coach visibility and notes on student goals

### Nice-to-Have (Phase 1)
- [ ] Basic lesson scheduling (calendar view)
- [ ] Simple notes/comments on student progress
- [ ] Email notifications for milestone completions
- [ ] Message search functionality

### Out of Scope (Phase 1)
- [ ] Payment processing (Stripe Connect)
- [ ] Advanced video comparison views
- [ ] Third-party integrations (ClubAutomation, UTR, Smashpoint)
- [ ] Marketplace features
- [ ] Native mobile apps
- [ ] AI Chatbot for students (V1.1)

## 3.3 Phase 2: Enhanced Analysis

- [ ] MediaPipe BlazePose integration (33-point skeleton)
- [ ] Interactive Konva.js overlays
- [ ] Ball tracking and trajectory
- [ ] AI coaching feedback
- [ ] Comparison views

## 3.4 Phase 3: Business Tools

- [ ] Stripe Connect integration
- [ ] ClubAutomation sync
- [ ] UTR/USTA/WTN rating integration
- [ ] Smashpoint import
- [ ] Advanced scheduling

## 3.5 Phase 4: Growth & Scale

- [ ] Coach marketplace
- [ ] Advanced analytics
- [ ] Mobile applications
- [ ] Enterprise features

---

# SECTION 4: TECHNOLOGY STACK

## 4.1 Core Platform

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js 14 (App Router) | SSR, SEO, React ecosystem |
| UI Components | shadcn/ui | Composable, accessible |
| Hosting | Vercel | Seamless Next.js integration, edge functions |
| Content Management | Sanity.io | Headless CMS for marketing + coach content |
| Backend | **AWS Native** | Consolidated platform, future-proof |
| AI/ML Processing | Modal.com | GPU scaling, cost-effective |

### AWS Services Stack

| Concern | AWS Service | Notes |
|---------|-------------|-------|
| **Authentication** | Cognito | User pools, OAuth, MFA |
| **Database** | Aurora PostgreSQL Serverless v2 | Auto-scaling, managed |
| **Connection Pooling** | RDS Proxy | Lambda-friendly connections |
| **API Layer** | API Gateway (HTTP + WebSocket) | REST API + real-time |
| **Compute** | Lambda (Node.js/TypeScript) | Serverless functions |
| **Storage** | S3 + CloudFront | Videos, images, CDN |
| **Orchestration** | Step Functions | Video processing, reports |
| **Events** | EventBridge | Async triggers, schedules |
| **Email** | SES | Transactional + marketing |
| **Push Notifications** | SNS | Mobile + web push |
| **Secrets** | Secrets Manager | API keys, credentials |
| **Monitoring** | CloudWatch | Logs, metrics, alarms |
| **Infrastructure** | CDK (TypeScript) | Infrastructure as code |

### Architecture Decision

> **Decision:** AWS Native (Consolidated)  
> **Rationale:** Invest upfront for long-term stability; avoid migration pain; single platform mastery; native path to analytics and streaming.  
> **Reference:** TPv1-ADR-001

```
┌─────────────────────────────────────────────────────────────┐
│                      VERCEL (Frontend)                       │
│  Next.js 14 + shadcn/ui + PWA                               │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      SANITY.IO (Content)                     │
│  Marketing + Coach Profiles + i18n                          │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      AWS (Backend)                           │
│  Cognito │ Aurora PostgreSQL │ S3/CloudFront │ Lambda       │
│  API Gateway │ Step Functions │ EventBridge │ SES/SNS       │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   MODAL.COM (AI/ML)                          │
│  GPU compute for video analysis                              │
└─────────────────────────────────────────────────────────────┘
```

### Progressive Analytics Path

| Phase | Solution | Capabilities |
|-------|----------|--------------|
| **V1 (Launch)** | Plausible + PostHog | Web analytics + product analytics |
| **V2 (Growth)** | + Athena | Ad-hoc S3 queries |
| **V3 (Scale)** | + QuickSight | Enterprise dashboards |
| **V4 (Enterprise)** | + Timestream/Redshift | Time-series + data warehouse |

### Future Streaming Path

| Capability | Service | Trigger |
|------------|---------|---------|
| Live Coaching Sessions | AWS IVS | Coach demand for live video |
| Adaptive Bitrate VOD | MediaConvert | Quality requirements |
| Real-time Collaboration | AppSync | Multi-user editing needs |

## 4.2 Content Management Architecture (Sanity.io)

### Why Headless CMS?

- **Separation of concerns:** Content creators (marketing, coaches) don't need developers
- **Structured content:** Reusable across marketing site, coach portals, emails
- **Multi-language:** Native i18n support for EN/ES/FR/PT
- **Real-time collaboration:** Multiple editors, live preview
- **API-first:** Integrates seamlessly with Next.js

### Content Domains

```
┌─────────────────────────────────────────────────────────────┐
│  SANITY STUDIO (Content Management Interface)              │
│  ├── Marketing Workspace (TennisPro team)                  │
│  └── Coach Workspace (Per-coach, scoped access)            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  SANITY CONTENT LAKE (Structured Data)                     │
│  ├── Marketing Content (global)                            │
│  ├── Coach Content (per-coach, isolated)                   │
│  └── System Content (templates, defaults)                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  NEXT.JS FRONTEND (Rendering)                              │
│  ├── Marketing Site (tennispro.com)                        │
│  ├── Coach Portals (app.tennispro.com)                     │
│  └── Coach Public Pages (tennispro.com/c/{slug})           │
└─────────────────────────────────────────────────────────────┘
```

### Layer 1: Marketing/Business Content (TennisPro Team)

| Content Type | Description | Examples |
|--------------|-------------|----------|
| **Landing Pages** | Marketing pages with rich content | Home, Features, Pricing, About |
| **Blog Posts** | SEO content, tennis tips, product updates | "5 Ways AI Improves Your Coaching" |
| **Testimonials** | Coach success stories | Quotes, photos, video embeds |
| **FAQs** | Frequently asked questions | Organized by category |
| **Legal Pages** | Terms, Privacy, Cookies | Version-controlled legal content |
| **Announcements** | Banners, alerts, promotions | "New feature: Ball tracking!" |
| **Email Templates** | Transactional email content | Welcome, milestone achieved, etc. |
| **Help Articles** | Documentation, tutorials | Searchable knowledge base |
| **Localized Content** | Translations for ES/FR/PT | All above content types |

### Layer 2: Coach-Managed Content (Per-Coach)

| Content Type | Description | Coach Control |
|--------------|-------------|---------------|
| **Profile** | Bio, photo, credentials, philosophy | Full edit |
| **Services** | Lesson types, pricing, packages | Full edit |
| **Specializations** | Player types they work with | Select from taxonomy |
| **Location(s)** | Where they teach | Address, map, hours |
| **Gallery** | Photos of lessons, facilities | Upload + arrange |
| **Testimonials** | Student reviews (moderated) | Approve/hide |
| **Custom Pages** | Additional content pages | Rich text editor |
| **Announcements** | Coach-specific news | "Taking new students!" |

### Layer 3: System/Template Content (Platform-Managed)

| Content Type | Description | Purpose |
|--------------|-------------|---------|
| **Progression Templates** | USPTA/PTR path defaults | Starting points for coaches |
| **Skill Taxonomies** | Standard skill categories | Consistency across platform |
| **Achievement Badges** | Default milestone graphics | Can be customized by coach |
| **Onboarding Flows** | Step-by-step setup guides | Interactive tutorials |
| **Default Copy** | Fallback text for empty states | "Add your first student" |

### Sanity Schema Overview

```typescript
// Marketing content (global)
marketing/
  ├── page.ts           // Landing pages
  ├── post.ts           // Blog posts
  ├── testimonial.ts    // Success stories
  ├── faq.ts            // FAQ items
  ├── announcement.ts   // Banners/alerts
  └── helpArticle.ts    // Documentation

// Coach content (scoped by coachId)
coach/
  ├── profile.ts        // Coach bio, photo, credentials
  ├── service.ts        // Lesson offerings
  ├── location.ts       // Teaching locations
  ├── galleryImage.ts   // Photo gallery
  ├── customPage.ts     // Additional pages
  └── announcement.ts   // Coach-specific news

// System content (platform-managed)
system/
  ├── progressionTemplate.ts  // USPTA/PTR paths
  ├── skillCategory.ts        // Skill taxonomy
  ├── badge.ts                // Achievement graphics
  └── defaultCopy.ts          // Fallback text
```

### Content Access Control

| Role | Marketing | Own Coach Content | Other Coach Content | System |
|------|-----------|-------------------|---------------------|--------|
| TennisPro Admin | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Marketing Team | ✅ Full | ❌ None | ❌ None | 👁️ Read |
| Coach | 👁️ Read | ✅ Full | ❌ None | 👁️ Read |
| Student | 👁️ Read | 👁️ Read (own coach) | ❌ None | 👁️ Read |

### Sanity + Supabase Separation

```
┌─────────────────────────────────────────────────────────────┐
│  SANITY (Content)                                           │
│  - Marketing copy, blog posts, help docs                    │
│  - Coach profiles, bios, service descriptions               │
│  - Rich text, images, embedded media                        │
│  - Localized content (i18n)                                 │
│  - Slowly changing, editorial content                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SUPABASE (Application Data)                                │
│  - User accounts, authentication                            │
│  - Student records, lesson history                          │
│  - Progression paths, milestones, achievements              │
│  - Video metadata, analysis results                         │
│  - Scheduling, payments, transactions                       │
│  - Fast-changing, transactional data                        │
└─────────────────────────────────────────────────────────────┘
```

### Integration Pattern

```typescript
// Next.js page fetching both content sources
export async function CoachPage({ params }) {
  // Sanity: Editorial content (bio, services, gallery)
  const coachContent = await sanityClient.fetch(
    `*[_type == "coachProfile" && slug == $slug][0]`,
    { slug: params.slug }
  );
  
  // Supabase: Application data (students, stats)
  const coachData = await supabase
    .from('coaches')
    .select('*, students(count), analyses(count)')
    .eq('slug', params.slug)
    .single();
  
  return <CoachProfile content={coachContent} data={coachData} />;
}
```

### Sanity Studio Deployment

- **Marketing Studio:** `studio.tennispro.com` (internal team)
- **Coach Studio:** Embedded in coach portal or `studio.tennispro.com/coach/{id}`
- **Access:** SSO via Supabase auth, role-based permissions

## 4.3 Video Analysis Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Pose Estimation | MediaPipe BlazePose | 33-point skeleton detection |
| Canvas Rendering | Konva.js | Interactive overlay editing |
| Ball Tracking | OpenCV | Shot segmentation |
| Video Storage | S3 + CloudFront | CDN delivery |
| Server Processing | Modal.com | GPU-accelerated analysis |

### Hybrid Video Processing Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  CLIENT-SIDE (Browser/PWA)                                  │
│  ├── Video capture and preview                              │
│  ├── Real-time pose overlay (lightweight MediaPipe)         │
│  ├── Frame selection for analysis                           │
│  ├── Interactive skeleton adjustment (Konva.js)             │
│  └── Compressed upload to S3                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  SERVER-SIDE (Modal.com GPU)                                │
│  ├── Full-resolution pose estimation                        │
│  ├── Ball tracking and trajectory analysis                  │
│  ├── Biomechanical metric extraction                        │
│  ├── AI coaching insights generation                        │
│  └── Processed results → Database + CDN                     │
└─────────────────────────────────────────────────────────────┘
```

### Client-Side Capabilities

- **Video Capture:** Record directly from device camera
- **Preview Analysis:** Lightweight real-time skeleton overlay for positioning
- **Frame Navigation:** Scrub through video, select key moments
- **Manual Correction:** Drag skeleton points to correct detection errors
- **Upload Optimization:** Compress and chunk large video files

### Server-Side Processing

- **Heavy Computation:** Full BlazePose analysis at higher resolution
- **Ball Tracking:** OpenCV-based trajectory extraction
- **Metric Calculation:** Joint angles, timing, consistency scores
- **AI Insights:** LLM-powered coaching feedback generation
- **Batch Processing:** Handle multiple videos in queue

## 4.4 Orchestration & Workflows

### AWS Step Functions

| Workflow | Trigger | Description |
|----------|---------|-------------|
| `VideoProcessing` | S3 upload event | Validate → Extract frames → Modal.com → Store results |
| `StudentOnboarding` | API call | Create student → Notify coach → Send welcome email |
| `DailyAnalytics` | EventBridge schedule | Aggregate metrics → Store snapshots |
| `WeeklyReports` | EventBridge schedule | Generate reports → Email coaches |
| `DataExport` | API call | Query data → Generate CSV/PDF → S3 → Presigned URL |

### Event-Driven Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     EVENTBRIDGE                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  S3 Events  │  │ Scheduled   │  │  API Events │         │
│  │  (uploads)  │  │  (cron)     │  │  (custom)   │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         ▼                ▼                ▼                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              EVENT RULES & ROUTING                   │   │
│  └─────────────────────────────────────────────────────┘   │
│         │                │                │                 │
│         ▼                ▼                ▼                 │
│  ┌───────────┐    ┌───────────┐    ┌───────────┐          │
│  │  Lambda   │    │   Step    │    │    SNS    │          │
│  │ (simple)  │    │ Functions │    │  (notify) │          │
│  └───────────┘    └───────────┘    └───────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### Lambda Function Categories

| Category | Functions | Runtime |
|----------|-----------|---------|
| **API Handlers** | CRUD operations, business logic | Node.js 20, TypeScript |
| **Event Processors** | S3 triggers, EventBridge handlers | Node.js 20, TypeScript |
| **Integrations** | Stripe webhooks, Sanity webhooks | Node.js 20, TypeScript |
| **Utilities** | Email templates, PDF generation | Node.js 20, TypeScript |

## 4.5 Multi-Tenancy & Data Isolation

### Coach ID Architecture

Every coach receives a unique identifier that governs all data isolation:

```
coach_id: "coach_abc123xyz"
         │
         ├── Authentication: Cognito JWT claims
         │   └── JWT includes coach_id, role, tier
         │
         ├── Database: Application-level enforcement
         │   └── All queries filtered by coach_id from JWT
         │
         ├── Storage: S3 prefix isolation
         │   └── s3://tennispro-videos/coaches/{coach_id}/...
         │
         ├── CDN: CloudFront signed URLs scoped to coach
         │   └── Signed cookies or URLs enforce access
         │
         └── Students: Belong to exactly one coach
             └── student.coach_id = coach_abc123xyz
```

### Authentication Flow (Cognito)

```
1. User authenticates via Cognito
2. Cognito returns JWT with custom claims:
   {
     "sub": "cognito-user-id",
     "custom:coach_id": "coach_abc123xyz",
     "custom:role": "coach",
     "custom:tier": "professional"
   }
3. API Gateway validates JWT
4. Lambda extracts coach_id from claims
5. All database queries include coach_id filter
```

### Database Access Pattern

```typescript
// Lambda handler - coach_id from JWT context
export async function getStudents(event: APIGatewayEvent) {
  const coachId = event.requestContext.authorizer?.claims['custom:coach_id'];
  
  // All queries MUST include coach_id
  const students = await db.query(
    'SELECT * FROM students WHERE coach_id = $1',
    [coachId]
  );
  
  return students;
}
```

### S3 Storage Structure

```
tennispro-videos-{env}/
├── coaches/
│   ├── {coach_id_1}/
│   │   ├── students/
│   │   │   ├── {student_id}/
│   │   │   │   ├── videos/
│   │   │   │   ├── analyses/
│   │   │   │   └── thumbnails/
│   │   └── exports/
│   ├── {coach_id_2}/
│   │   └── ...
└── system/
    └── default-templates/
```

### Access Control Summary

| Resource | Isolation Method | Enforcement Layer |
|----------|------------------|-------------------|
| Student Records | coach_id column | Lambda + SQL |
| Progression Data | coach_id column | Lambda + SQL |
| Video Files | S3 prefix + presigned URLs | S3 + Lambda |
| Video Playback | CloudFront signed URLs | CloudFront |
| API Access | Cognito JWT claims | API Gateway + Lambda |
| Real-time | WebSocket + coach_id | API Gateway |

## 4.6 External Integrations

| System | Purpose | Priority |
|--------|---------|----------|
| ClubAutomation | Member/facility sync | Phase 3 |
| UTR/USTA/WTN | Player ratings | Phase 3 |
| Smashpoint | Match statistics | Phase 3 |
| Stripe Connect | Payments | Phase 3 |

## 4.7 AI Biomechanical Metrics (V1 Scope)

### Philosophy: Coach-Defined Ideal

> **"This is where you want to be"** (coach-defined target) vs **"This is where you are"** (AI-measured current state)

The platform does NOT impose a universal "correct" form. Instead:
- Coach defines target metrics for each student (the "ideal")
- AI measures the student's current state objectively
- Gap analysis shows progress toward coach's vision
- Personal, not universal - honors the coach-student relationship

```
┌─────────────────────────────────────────────────────────────┐
│  COACH DEFINES TARGET                                       │
│  "For Sarah's forehand, I want to see:                      │
│   - Knee bend at load: 35-45°                               │
│   - Hip-shoulder separation: 40-50°                         │
│   - Contact point: 12-18" in front of body"                 │
├─────────────────────────────────────────────────────────────┤
│  AI MEASURES CURRENT STATE                                  │
│  "Sarah's latest video shows:                               │
│   - Knee bend at load: 28° (below target)                   │
│   - Hip-shoulder separation: 44° (in range ✓)               │
│   - Contact point: 8" in front (below target)"              │
├─────────────────────────────────────────────────────────────┤
│  STUDENT SEES PROGRESS                                      │
│  "You're hitting your hip-shoulder separation target!       │
│   Focus area: knee bend and contact point extension"        │
└─────────────────────────────────────────────────────────────┘
```

### V1 Metrics by Stroke

#### Serve
| Metric | Description | Landmark Calculation |
|--------|-------------|---------------------|
| Trophy Position - Knee Bend | Depth of knee bend at peak racket-back | Angle: hip-knee-ankle |
| Trophy Position - Shoulder Tilt | Shoulder-over-hip lean | Angle: shoulder line vs vertical |
| Racket Drop Depth | How far racket drops behind back | Wrist position relative to spine |
| Contact Point Height | Reach at contact | Wrist Y-coordinate vs height estimate |
| Hip-Shoulder Separation | X-factor at load | Angle between hip line and shoulder line |

#### Forehand
| Metric | Description | Landmark Calculation |
|--------|-------------|---------------------|
| Unit Turn | Degree of shoulder rotation on backswing | Shoulder line angle vs baseline |
| Hip-Shoulder Separation | X-factor / coil | Angle between hip line and shoulder line |
| Knee Bend at Load | Athletic base depth | Angle: hip-knee-ankle |
| Swing Path Angle | Low-to-high trajectory | Wrist path vector angle |
| Contact Point Extension | How far in front of body | Wrist X relative to hip center |
| Contact Point Height | Strike zone position | Wrist Y relative to hip |
| Follow-Through Position | Finish position | Wrist position at swing end |

#### Backhand (1H and 2H)
| Metric | Description | Notes |
|--------|-------------|-------|
| Shoulder Turn | Rotation on take-back | Similar to forehand |
| Racket Preparation | Height and position | Wrist relative to shoulder |
| Contact Point | Extension and height | Same as forehand |
| Non-Dominant Arm (1H) | Extension for balance | Track off-hand position |

#### Volley
| Metric | Description | Notes |
|--------|-------------|-------|
| Split Step Timing | When feet leave ground | Frame detection |
| Split Step Width | Athletic base | Distance between ankles |
| Racket Preparation | High vs low ready | Wrist height at ready |
| Punch vs Swing | Compact motion | Wrist travel distance |
| Recovery Position | Return to ready | Frames to ready position |

#### Overhead
| Metric | Description | Notes |
|--------|-------------|-------|
| Positioning | Body under ball | Requires ball tracking (simplified V1) |
| Contact Point Height | Full extension | Same as serve |
| Scissor Kick | Leg action | Detect leg crossing pattern |

### Movement & Footwork Metrics (V1)

| Pattern | Metrics |
|---------|---------|
| **Split Step** | Timing (frames before opponent contact if visible), width, air time |
| **Ready Position** | Stance width, knee bend, weight distribution |
| **Recovery** | Step count to return, frames to recover, path efficiency |
| **Lateral Movement** | Step pattern (shuffle vs crossover), distance covered |
| **Approach Footwork** | Final step positioning, body balance at contact |

### Kinetic Chain Analysis (V1)

Track the sequencing of body segment rotation/movement:

```
Ideal Kinetic Chain (Groundstrokes):
Legs → Hips → Torso → Shoulder → Elbow → Wrist

Measurement Approach:
- Detect peak rotation/velocity timing for each segment
- Flag if sequence is broken (e.g., arm fires before hips)
- Provide "chain score" - % of segments in correct order
```

### What's NOT in V1

| Deferred | Reason | Target Phase |
|----------|--------|--------------|
| Velocities & Acceleration | Complexity; angles more coach-friendly | V1.1 |
| Ball Tracking Integration | Additional ML model needed | V2 |
| Pro Comparison Baseline | "Compare to Federer's forehand" | V2 (big feature) |
| Cross-Stroke Consistency | Requires session-level analysis | V2 |
| Fatigue Detection | Requires multiple video analysis | V2 |

### Future: Pro Reference Comparisons (V2+)

> **Flagged as high-value future feature**

Allow coaches to select professional players as reference baselines:
- "Show me how Sarah's serve compares to [selected pro]"
- Library of pro stroke analyses as benchmarks
- Overlay visualization: student skeleton vs pro skeleton
- Gap analysis against elite metrics

This is powerful for:
- Aspirational goal-setting with students
- Parent communication ("Here's how far Johnny has come toward pro-level mechanics")
- Marketing (coaches can offer "pro-level analysis")

*Implementation Note: Would require licensed/obtained pro footage or synthetic reference data.*

---

# SECTION 5: BUSINESS MODEL

## 5.1 Revenue Streams

### Coach Subscriptions (B2B)

| Feature | Starter ($49/mo) | Professional ($99/mo) | Enterprise ($199/mo) |
|---------|------------------|----------------------|---------------------|
| **Students** | 15 | 40 | Unlimited |
| **Video Storage** | 10 GB | 50 GB | Unlimited |
| **AI Analyses/month** | 20 | 100 | Unlimited |
| **Progression Paths** | Templates only | + Custom creation | + Custom creation |
| **Integrations** | None | UTR/USTA | All (ClubAutomation, Smashpoint, etc.) |
| **Support** | Email | Priority email | Priority + onboarding call |
| **Branding** | Basic profile | Custom colors/logo | Full white-label |

### Tier Strategy

```
┌─────────────────────────────────────────────────────────────┐
│  STARTER ($49) - Independent Pros Getting Started          │
│  "I have a handful of students and want to look professional"│
├─────────────────────────────────────────────────────────────┤
│  PROFESSIONAL ($99) - Established Coaches Scaling Up        │
│  "I have a real business and need custom methodology"       │
├─────────────────────────────────────────────────────────────┤
│  ENTERPRISE ($199) - HP/Academy Coaches                     │
│  "I need everything integrated and unlimited capacity"      │
└─────────────────────────────────────────────────────────────┘
```

### Expected Tier Distribution (6-Month Projection)

| Tier | % of Coaches | Coaches | Revenue |
|------|--------------|---------|---------|
| Starter | 50% | 12-13 | ~$600 |
| Professional | 35% | 8-9 | ~$850 |
| Enterprise | 15% | 3-4 | ~$700 |
| **Total** | 100% | **25** | **~$2,150** |

> Note: Initial MRR target of $1,000 is conservative; actual may exceed based on tier mix.

### Per-Student Overages (Future)
- Overage pricing for coaches exceeding tier limits
- Alternative to forcing tier upgrades
- *Pricing TBD based on usage patterns*

### Future Revenue Streams
- Marketplace commissions (coach discovery)
- White-label licensing (academies/clubs)
- Enterprise contracts (multi-coach facilities)
- Premium AI features (advanced biomechanics)

## 5.2 Cost Structure (AWS Native)

### MVP Phase (25 Coaches, 250 Students)

| Service | Configuration | Monthly Cost |
|---------|---------------|--------------|
| Cognito | ~300 MAUs | $0 (free tier) |
| Aurora Serverless v2 | 0.5-2 ACU | $45-90 |
| RDS Proxy | 1 instance | $18 |
| API Gateway | ~1M requests | $3.50 |
| Lambda | ~2M invocations | $0.40 |
| S3 | 100GB stored | $2.30 |
| CloudFront | 100GB transfer | $8.50 |
| SES | 10K emails | $1 |
| Step Functions | 10K executions | $2.50 |
| Secrets Manager | 5 secrets | $2 |
| CloudWatch | Basic | $5 |
| Vercel | Pro | $20 |
| Sanity | Team | $15 |
| Modal.com | ~50 GPU hrs | $50 |
| **Total** | | **~$175-220/mo** |

### Growth Phase (100 Coaches, 1000 Students)

| Category | Monthly Cost |
|----------|--------------|
| AWS Services | ~$200-280 |
| Vercel | $20 |
| Sanity | $15 |
| Modal.com | ~$150 |
| Analytics (PostHog) | $0 (free tier) |
| **Total** | **~$385-465/mo** |

### Scale Phase (500 Coaches, 5000 Students)

| Category | Monthly Cost |
|----------|--------------|
| AWS Services | ~$600-800 |
| Vercel | $20 |
| Sanity | $99 (Business) |
| Modal.com | ~$400 |
| Analytics (PostHog + Athena) | ~$100 |
| **Total** | **~$1,200-1,400/mo** |

## 5.3 Go-to-Market Strategy

### Product-Led Growth (PLG)

> **Core Philosophy:** Build a product so good that coaches share it organically. Minimize paid acquisition; maximize viral loops and SEO.

### Viral Loops

```
┌─────────────────────────────────────────────────────────────┐
│  Coach signs up → Creates branded page → Shares with students│
│         ↓                                                    │
│  Students see progress → Share achievements on social        │
│         ↓                                                    │
│  Other players discover → Ask their coach about TennisPro    │
│         ↓                                                    │
│  New coach signs up → Cycle repeats                          │
└─────────────────────────────────────────────────────────────┘
```

### SEO Strategy

- **Coach Profile Pages:** `tennispro.com/c/{coach-slug}` indexed for local search
  - "Tennis lessons in [City]"
  - "[Coach Name] tennis coach"
- **Content Marketing:** Blog posts on tennis development, progression frameworks
- **Multi-language SEO:** Localized content for ES/FR/PT markets

### Social Media Approach

- **Platform Focus:** Instagram, TikTok (video-native), YouTube
- **Content Types:**
  - Before/after progress videos (with student permission)
  - AI analysis clips showing skeleton overlay
  - Milestone celebration moments
  - Coach tips and methodology snippets
- **Hashtag Strategy:** #TennisPro #TennisProgress #TennisCoach

### Launch Sequence

1. **Beta (Weeks 1-8):** SME network, 5-10 coaches, validate core features
2. **Soft Launch (Weeks 9-12):** Expand to 25 coaches via referral
3. **Public Launch (Week 13+):** Open signup, social push, PR outreach

### Marketing TBD Items

- [ ] Detailed content calendar
- [ ] Influencer/coach ambassador program
- [ ] Referral incentive structure
- [ ] Launch PR strategy

---

# SECTION 6: PORTAL ARCHITECTURE

## 6.1 Three-Layer Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: Marketing Site (Public)                           │
│  tennispro.com                                              │
│  - Landing pages, pricing, features, blog                   │
│  - Multi-language support (EN/ES/FR/PT)                     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│  Layer 2: Coach Portal (Authenticated)                      │
│  app.tennispro.com/dashboard                                │
│  - Business management, video analysis, student tracking    │
│  - Fully responsive PWA                                     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│  Layer 3: Coach-Branded Student Pages (Public + Auth)       │
│  tennispro.com/c/{coach-slug}                               │
│  - SEO-driven acquisition, student signup, progress view    │
│  - Inherits coach's language preference or detects user's   │
└─────────────────────────────────────────────────────────────┘
```

## 6.2 URL Strategy

- **Marketing:** `tennispro.com/*` (with `/es/`, `/fr/`, `/pt/` prefixes for i18n)
- **Coach App:** `app.tennispro.com/*`
- **Coach Profiles:** `tennispro.com/c/{slug}`
- **Student Portal:** `tennispro.com/c/{slug}/student/*`

## 6.3 Internationalization (i18n)

### Supported Languages (V1)

| Language | Code | Market Rationale |
|----------|------|------------------|
| **English** | `en` | Primary market, global default |
| **Spanish** | `es` | Spain, Latin America, US Hispanic market |
| **French** | `fr` | France (Roland Garros heritage), Canada, West Africa |
| **Portuguese** | `pt` | Brazil (massive growing tennis market), Portugal |

### i18n Implementation

- **Framework:** next-intl or similar Next.js i18n solution
- **Content Strategy:** 
  - UI strings: Translated for all 4 languages
  - Coach content: Created in coach's language, not auto-translated
  - Progression templates: Translated versions of USPTA/PTR templates
- **Detection:** Browser preference → User selection → Default to English
- **SEO:** Proper hreflang tags, localized URLs for marketing pages

### Future Languages (Post-V1)

- German (strong tennis culture)
- Mandarin Chinese (growing market)
- Italian (tennis tradition)
- Japanese (strong junior development)

## 6.4 Responsive PWA Strategy

### Design Principles

- **Mobile-first:** Design for phone, enhance for tablet/desktop
- **PWA-first, PWA-forever:** No native app plans; PWA must be excellent
- **Offline capability:** Core features work offline, sync when connected
- **Installable:** Add-to-homescreen prompt for app-like experience

### Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 640px | Single column, bottom nav |
| Tablet | 640-1024px | Two column, side nav |
| Desktop | > 1024px | Full dashboard, expanded views |

### PWA Features

- [ ] Service worker for offline support
- [ ] App manifest for installation
- [ ] Push notifications (lesson reminders, milestone completions)
- [ ] Background sync for video uploads
- [ ] Camera access for video capture

---

# SECTION 7: OPEN QUESTIONS

> *Items requiring decisions before finalizing the plan*

## Resolved Questions ✅

1. ~~**Target Segment:** Should we focus on independent pros first, or club coaches?~~  
   **Decision:** Focus on Independent Pros (primary) + HP/Academy Coaches (secondary).

2. ~~**Success Metric:** What's the ONE metric to obsess over?~~  
   **Decision:** Coach Retention (90%+ monthly after Month 3).

3. ~~**Framework Scope - Templates vs. Custom:** Should coaches create paths from scratch, or just customize templates?~~  
   **Decision:** Both. Maximum flexibility.

4. ~~**Framework Scope - Player Categories:** All 5 categories in V1, or start with 2-3?~~  
   **Decision:** All 5 (Recreational, Competitive Junior, Collegiate, Professional, Senior).

5. ~~**Framework Scope - Validation Methods:** Include AI metrics in V1, or just coach assessment?~~  
   **Decision:** Both. Coach assessment + AI metrics from day one.

6. ~~**6-Month Targets:** What specific numbers define V1 success?~~  
   **Decision:** 25 paying coaches, $1,000 MRR, 90%+ retention.

7. ~~**Pricing Tier Gates:** What features unlock at each tier?~~  
   **Decision:** Defined limits for students, storage, analyses, custom paths, and integrations per tier.

8. ~~**Geographic Focus:** US-only initially, or broader?~~  
   **Decision:** Global from launch. 4 languages: English, Spanish, French, Portuguese.

9. ~~**Mobile Strategy:** PWA first, or native apps from the start?~~  
   **Decision:** PWA-first, possibly forever. Fully responsive, no native apps planned.

10. ~~**Video Processing:** Client-side vs server-side?~~  
    **Decision:** Hybrid. Client-side for capture, preview, and interaction. Server-side (Modal.com GPU) for heavy analysis.

11. ~~**Multi-tenancy:** How do we handle coach data isolation?~~  
    **Decision:** Unique coach IDs with Supabase RLS, S3 prefix isolation, and CloudFront signed URLs.

12. ~~**Go-to-Market:** How do we acquire coaches?~~  
    **Decision:** Product-led growth via social media virality and SEO. YouTube content channel. Potential USTA/PTR pro list outreach.

13. ~~**AI Biomechanical Metrics:** What should V1 measure?~~  
    **Decision:** Core angles for all strokes, kinetic chain sequencing, movement patterns. Coach-defined "ideal" targets vs AI-measured current state. Defer velocities/acceleration and pro comparisons to later versions.

14. ~~**Backend Platform:** AWS vs Supabase?~~  
    **Decision:** **AWS Native (Consolidated).** Invest upfront to avoid migration; single platform mastery; native path to analytics (QuickSight) and streaming (IVS). See TPv1-ADR-001.

## Product Questions (Remaining)

1. ~~**Template Content:** Who builds the initial USPTA/PTR progression templates?~~  
   **Decision:** Bob (as SME) will create initial templates by analyzing and merging existing USPTA/PTR paths.

2. ~~**Onboarding Flow:** What's the critical path to coach activation?~~  
   **Decision:** General internet/YouTube content strategy. Dedicated product channel for tutorials. Social media presence. Potential outreach to USTA/PTR pro lists.

3. ~~**AI Metrics:** What specific biomechanical measurements should V1 extract?~~  
   **Decision:** V1 includes:
   - Core joint angles for all strokes (serve, forehand, backhand, volley, overhead)
   - Kinetic chain sequencing analysis
   - Contact point position tracking
   - Movement pattern analysis (split step, recovery, lateral movement)
   - Coach-defined "ideal" targets vs AI-measured current state
   
   Deferred to V1.1+: Velocities, acceleration, ball tracking, pro comparison baselines

## All Major Questions Resolved ✅

The Plan phase is complete. Ready to proceed to **Requirements phase**.

---

# NEXT STEPS

## Plan Phase: ✅ COMPLETE

All major decisions resolved:
- [x] Vision and mission defined
- [x] Target segments identified (Independent Pros + HP/Academy)
- [x] Success metrics established (90%+ retention, 25 coaches, $1K MRR)
- [x] Player Development Framework scoped (full V1)
- [x] Pricing tiers defined ($49/$99/$199)
- [x] Technical architecture confirmed
- [x] AI biomechanical metrics scoped
- [x] i18n strategy set (EN/ES/FR/PT)
- [x] Go-to-market approach outlined (PLG via social/SEO)

## Ready for Phase 2: Requirements

Generate **TPv1_Requirements.md** to transform this plan into detailed functional and non-functional requirements.

---

*This is a living document. Updates will be tracked in the changelog.*
