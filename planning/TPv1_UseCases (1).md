# TennisPro V1 (TPv1) - Use Cases Document

**Document ID:** TPv1-UC-001  
**Version:** 1.1.0  
**Created:** 2025-12-06T18:30:00Z  
**Last Updated:** 2025-12-06T19:55:00Z  
**Status:** ✅ V1 Starting Point Complete (Living Document)  
**Author:** Bob O'Brien  

---

## Document Hierarchy

```
TPv1_Plan.md ✅ COMPLETE (v1.3.0)
TPv1_ADR_001_Backend_Infrastructure.md ✅ DECIDED
TPv1_Requirements.md ✅ COMPLETE (v1.0.0)
TPv1_Requirements_StudentPortal.md ✅ COMPLETE (v1.0.0)
TPv1_UseCases.md (this document) ✅ STARTING POINT
TPv1_Tasks.md ✅ COMPLETE (v2.0.0)
```

---

## Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.1.0 | 2025-12-06 | All V1 gaps resolved; Updated coverage matrix; Clarified document is starting point, not exhaustive; Student Portal, Goals, Messaging, Blog added to scope; AI Chatbot and Admin Portal deferred to V1.1 | Bob O'Brien |
| 1.0.0 | 2025-12-06 | Initial use cases document; identified 4 actors; 45+ use cases; gap analysis completed | Bob O'Brien |

---

## Overview

> **📝 NOTE:** This document represents a **starting point** for use cases, not an exhaustive list. Additional use cases will be identified and added as development progresses and user feedback is gathered. The purpose of this document is to ensure core user journeys are captured and that requirements/tasks address the primary interactions.

This document defines the initial use cases for the TennisPro platform, organized by actor (user type). It serves as a validation checkpoint to ensure primary user interactions are captured in our requirements, specifications, and task lists.

---

# ACTORS

## Actor Definitions

| Actor | Description | Authentication | Primary Value |
|-------|-------------|----------------|---------------|
| **Anonymous Browser** | Any visitor to the marketing site | None | Discover platform, evaluate fit |
| **Coach** | Tennis professional managing their business | Cognito (Email/OAuth) | Manage students, track progress, analyze video |
| **Student** | Player receiving coaching | Cognito (Email/OAuth) | View progress, upload video, communicate with coach |
| **System Admin** | TennisPro platform administrator | Cognito (Admin pool) | Manage platform, support users |

---

# USE CASES BY ACTOR

## 1. Anonymous Browser (General Public)

### UC-AB-001: Browse Marketing Site
**Actor:** Anonymous Browser  
**Description:** User explores the public marketing website to learn about TennisPro.  
**Preconditions:** None  
**Main Flow:**
1. User navigates to tennispro.com
2. User views home page with value proposition
3. User browses features, pricing, blog, help sections
4. User can switch language (EN/ES/FR/PT)

**Postconditions:** User understands platform value  
**Coverage:** ✅ REQ-MKT-001 through REQ-MKT-105

---

### UC-AB-002: View Coach Public Profile
**Actor:** Anonymous Browser  
**Description:** User views a coach's public profile page (SEO-driven discovery).  
**Preconditions:** Coach has public profile enabled  
**Main Flow:**
1. User finds coach via search engine or direct link
2. User views coach bio, credentials, services, gallery
3. User reads testimonials
4. User can initiate signup to become student

**Postconditions:** User decides whether to sign up with coach  
**Coverage:** ✅ REQ-MKT-060 through REQ-MKT-064

---

### UC-AB-003: Read Blog Articles
**Actor:** Anonymous Browser  
**Description:** User reads blog content for tennis tips and platform updates.  
**Preconditions:** None  
**Main Flow:**
1. User navigates to /blog
2. User browses articles by category
3. User reads full article
4. User can share article on social media

**Postconditions:** User engaged with content  
**Coverage:** ✅ REQ-MKT-040 through REQ-MKT-043

---

### UC-AB-004: Search Help Center
**Actor:** Anonymous Browser  
**Description:** User searches help documentation for answers.  
**Preconditions:** None  
**Main Flow:**
1. User navigates to /help
2. User searches for topic or browses categories
3. User reads help article
4. User provides feedback on article helpfulness

**Postconditions:** User finds answer or contacts support  
**Coverage:** ✅ REQ-MKT-050 through REQ-MKT-053

---

### UC-AB-005: Sign Up as Coach
**Actor:** Anonymous Browser → Coach  
**Description:** User creates a coach account.  
**Preconditions:** User has valid email  
**Main Flow:**
1. User clicks "Sign Up" or "Start Free Trial"
2. User chooses registration method (email/Google/Apple)
3. User completes registration form
4. User verifies email
5. User is redirected to onboarding wizard

**Postconditions:** Coach account created, onboarding begins  
**Coverage:** ✅ REQ-CP-001

---

### UC-AB-006: Sign Up as Student (via Coach Page)
**Actor:** Anonymous Browser → Student  
**Description:** User signs up as a student through a coach's profile page.  
**Preconditions:** Coach has public profile with signup enabled  
**Main Flow:**
1. User views coach profile at /c/{coach-slug}
2. User clicks "Become a Student" or "Sign Up"
3. User completes student registration
4. User is automatically associated with the coach
5. User receives welcome email

**Postconditions:** Student account created, linked to coach  
**Coverage:** ✅ REQ-MKT-063, ⚠️ **NEEDS: Student registration requirements**

---

## 2. Coach

### Authentication & Account

#### UC-C-001: Login to Portal
**Actor:** Coach  
**Description:** Coach authenticates and accesses their portal.  
**Preconditions:** Coach has active account  
**Main Flow:**
1. Coach navigates to login page (from marketing site or app.tennispro.com)
2. Coach enters credentials or uses OAuth
3. Coach is redirected to dashboard

**Postconditions:** Coach authenticated, session established  
**Coverage:** ✅ REQ-CP-002

---

#### UC-C-002: Manage Account Settings
**Actor:** Coach  
**Description:** Coach updates account preferences and settings.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach navigates to Settings
2. Coach updates profile, notifications, language, timezone
3. Changes are saved

**Postconditions:** Settings updated  
**Coverage:** ✅ REQ-CP-004

---

#### UC-C-003: Manage Subscription
**Actor:** Coach  
**Description:** Coach views and manages billing.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach navigates to Billing/Subscription
2. Coach views current tier and usage
3. Coach can upgrade/downgrade or update payment method

**Postconditions:** Subscription managed  
**Coverage:** ✅ REQ-CP-005

---

### Student Management

#### UC-C-010: View Student List
**Actor:** Coach  
**Description:** Coach views all their students with filtering and search.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach navigates to Students
2. Coach views list with search, filter (status, category, level)
3. Coach sorts by name, date, activity

**Postconditions:** Student list displayed  
**Coverage:** ✅ REQ-CP-030

---

#### UC-C-011: Add Student Manually
**Actor:** Coach  
**Description:** Coach adds a new student to their roster.  
**Preconditions:** Coach authenticated, within student limit  
**Main Flow:**
1. Coach clicks "Add Student"
2. Coach enters student info (name, email, category)
3. Coach optionally assigns progression path
4. Student record created

**Postconditions:** Student added to roster  
**Coverage:** ✅ REQ-CP-031

---

#### UC-C-012: Invite Student via Email
**Actor:** Coach  
**Description:** Coach sends invitation for student to self-register.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach enters student email
2. System sends invitation email
3. Student clicks link and registers
4. Student auto-associated with coach

**Postconditions:** Student receives invitation  
**Coverage:** ✅ REQ-CP-032

---

#### UC-C-013: View Student Profile
**Actor:** Coach  
**Description:** Coach views detailed student information.  
**Preconditions:** Coach authenticated, student belongs to coach  
**Main Flow:**
1. Coach clicks on student
2. Coach views: basic info, progression status, video library, lesson history
3. Coach can take actions from profile

**Postconditions:** Student detail displayed  
**Coverage:** ✅ REQ-CP-034

---

#### UC-C-014: Edit Student Information
**Actor:** Coach  
**Description:** Coach updates student details.  
**Preconditions:** Coach authenticated, student belongs to coach  
**Main Flow:**
1. Coach opens student edit form
2. Coach modifies fields
3. Changes saved

**Postconditions:** Student updated  
**Coverage:** ✅ REQ-CP-035

---

#### UC-C-015: Archive/Restore Student
**Actor:** Coach  
**Description:** Coach archives inactive students (doesn't count toward limit).  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach selects archive action
2. System confirms
3. Student moved to archived state

**Postconditions:** Student archived, can be restored  
**Coverage:** ✅ REQ-CP-036

---

### Content Management (Sanity CMS)

#### UC-C-020: Edit Public Profile via CMS
**Actor:** Coach  
**Description:** Coach manages their public profile content.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach accesses Sanity Studio (embedded or standalone)
2. Coach edits bio, photo, credentials, philosophy
3. Coach previews changes
4. Coach publishes

**Postconditions:** Public profile updated  
**Coverage:** ✅ REQ-CP-070, REQ-CP-071

---

#### UC-C-021: Manage Services/Offerings
**Actor:** Coach  
**Description:** Coach defines lesson types and pricing.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach navigates to Services in CMS
2. Coach adds/edits services (name, description, duration, price)
3. Services displayed on public profile

**Postconditions:** Services updated  
**Coverage:** ✅ REQ-CP-073

---

#### UC-C-022: Manage Photo Gallery
**Actor:** Coach  
**Description:** Coach uploads and organizes gallery images.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach navigates to Gallery in CMS
2. Coach uploads images
3. Coach reorders, captions, deletes as needed

**Postconditions:** Gallery updated  
**Coverage:** ✅ REQ-CP-074

---

#### UC-C-023: Manage Testimonials
**Actor:** Coach  
**Description:** Coach curates student testimonials.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach views testimonials (manual or student-submitted)
2. Coach approves, hides, or requests new ones
3. Approved testimonials appear on public profile

**Postconditions:** Testimonials curated  
**Coverage:** ✅ REQ-CP-075

---

#### UC-C-024: Create Blog Post ⚠️ NEW
**Actor:** Coach  
**Description:** Coach creates blog content for their profile.  
**Preconditions:** Coach authenticated (Professional+ tier?)  
**Main Flow:**
1. Coach navigates to Blog section in CMS
2. Coach creates new post (title, content, images, tags)
3. Coach previews and publishes
4. Blog post appears on coach profile and/or platform blog

**Postconditions:** Blog post published  
**Coverage:** ❌ **GAP - Not in current requirements**

---

#### UC-C-025: Add Custom Page ⚠️ VERIFY
**Actor:** Coach  
**Description:** Coach adds additional content pages.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach creates custom page in CMS
2. Coach adds rich content
3. Page accessible via coach profile navigation

**Postconditions:** Custom page published  
**Coverage:** ⚠️ Partially covered in REQ-CP-070 concept

---

### Progression Framework

#### UC-C-030: View Progression Templates
**Actor:** Coach  
**Description:** Coach browses available progression path templates.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach navigates to Progression Paths
2. Coach views system templates (USPTA, PTR)
3. Coach can preview template structure

**Postconditions:** Templates reviewed  
**Coverage:** ✅ REQ-CP-040

---

#### UC-C-031: Create Custom Progression Path
**Actor:** Coach  
**Description:** Coach creates path from scratch or template.  
**Preconditions:** Coach authenticated (Professional+ for custom)  
**Main Flow:**
1. Coach starts new path (from template or blank)
2. Coach defines levels, skills, milestones
3. Coach sets target metrics for milestones
4. Coach saves path

**Postconditions:** Custom path created  
**Coverage:** ✅ REQ-CP-041, REQ-CP-042

---

#### UC-C-032: Assign Path to Student
**Actor:** Coach  
**Description:** Coach assigns a progression path to a student.  
**Preconditions:** Coach authenticated, student exists, path exists  
**Main Flow:**
1. Coach selects student
2. Coach assigns progression path
3. Student's progress initialized

**Postconditions:** Student has active progression path  
**Coverage:** ✅ REQ-CP-043

---

#### UC-C-033: Track Student Progress
**Actor:** Coach  
**Description:** Coach views and updates student progress.  
**Preconditions:** Coach authenticated, student has assigned path  
**Main Flow:**
1. Coach views student's progression visualization
2. Coach sees current level, completed milestones
3. Coach marks milestones as achieved
4. Progress history updated

**Postconditions:** Progress tracked  
**Coverage:** ✅ REQ-CP-045, REQ-CP-046

---

#### UC-C-034: Set Target Metrics for Student
**Actor:** Coach  
**Description:** Coach defines personalized target metrics.  
**Preconditions:** Coach authenticated, milestone supports metrics  
**Main Flow:**
1. Coach views milestone details
2. Coach sets target values (e.g., "knee bend > 45°")
3. Targets used for AI validation

**Postconditions:** Personalized targets set  
**Coverage:** ✅ REQ-CP-044

---

### Video Management

#### UC-C-040: Upload Video for Student
**Actor:** Coach  
**Description:** Coach uploads video to student's library.  
**Preconditions:** Coach authenticated, within storage limit  
**Main Flow:**
1. Coach selects student or navigates to upload
2. Coach selects video file
3. Coach tags video (stroke type, date)
4. Upload progresses with indicator
5. Video added to student library

**Postconditions:** Video uploaded  
**Coverage:** ✅ REQ-CP-050

---

#### UC-C-041: View Student Video Library
**Actor:** Coach  
**Description:** Coach browses student's videos.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach navigates to student's videos
2. Coach views thumbnails, metadata
3. Coach filters by stroke type, date, status

**Postconditions:** Video library displayed  
**Coverage:** ✅ REQ-CP-051

---

#### UC-C-042: Play and Review Video
**Actor:** Coach  
**Description:** Coach watches video with playback controls.  
**Preconditions:** Coach authenticated, video exists  
**Main Flow:**
1. Coach opens video player
2. Coach uses controls: play, pause, speed, frame-by-frame
3. Coach reviews technique

**Postconditions:** Video reviewed  
**Coverage:** ✅ REQ-CP-052

---

#### UC-C-043: Request AI Analysis
**Actor:** Coach  
**Description:** Coach requests AI analysis of video.  
**Preconditions:** Coach authenticated, within analysis quota  
**Main Flow:**
1. Coach selects video
2. Coach specifies stroke type and focus areas
3. Coach submits analysis request
4. System processes video (Step Functions workflow)
5. Coach notified when complete

**Postconditions:** Analysis queued/complete  
**Coverage:** ✅ REQ-CP-054

---

#### UC-C-044: View Analysis Results
**Actor:** Coach  
**Description:** Coach reviews AI analysis with metrics and skeleton overlay.  
**Preconditions:** Analysis complete  
**Main Flow:**
1. Coach opens analysis results
2. Coach views skeleton overlay on video
3. Coach reviews extracted metrics
4. Coach compares to target metrics
5. Coach reads AI coaching insights

**Postconditions:** Analysis reviewed  
**Coverage:** ✅ REQ-CP-055

---

#### UC-C-045: Adjust Skeleton Landmarks
**Actor:** Coach  
**Description:** Coach manually corrects AI skeleton detection.  
**Preconditions:** Analysis complete  
**Main Flow:**
1. Coach enables edit mode
2. Coach drags landmarks to correct positions
3. Metrics recalculate
4. Corrected version saved

**Postconditions:** Skeleton corrected  
**Coverage:** ✅ REQ-CP-056

---

#### UC-C-046: Link Analysis to Milestone
**Actor:** Coach  
**Description:** Coach uses analysis to validate milestone achievement.  
**Preconditions:** Analysis complete, milestone exists  
**Main Flow:**
1. Coach opens analysis
2. Coach clicks "Link to Milestone"
3. Coach selects milestone
4. Analysis becomes validation evidence

**Postconditions:** Milestone validated with video evidence  
**Coverage:** ✅ REQ-CP-057

---

### Lesson Management

#### UC-C-050: Log Lesson
**Actor:** Coach  
**Description:** Coach records lesson details after the fact.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach clicks "Log Lesson"
2. Coach selects student, date, duration, type
3. Coach adds notes, skills worked on
4. Coach optionally links videos
5. Lesson saved

**Postconditions:** Lesson recorded  
**Coverage:** ✅ REQ-CP-060

---

#### UC-C-051: Add Lesson Notes
**Actor:** Coach  
**Description:** Coach adds private or shareable notes.  
**Preconditions:** Lesson exists  
**Main Flow:**
1. Coach opens lesson
2. Coach adds notes (rich text)
3. Coach optionally marks notes as shareable with student

**Postconditions:** Notes added  
**Coverage:** ✅ REQ-CP-061

---

#### UC-C-052: View Lesson History
**Actor:** Coach  
**Description:** Coach reviews past lessons with student.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach navigates to student's lessons
2. Coach filters by date range
3. Coach views lesson details

**Postconditions:** History reviewed  
**Coverage:** ✅ REQ-CP-062

---

### Communication ⚠️ NEW SECTION

#### UC-C-060: Send Message to Student ⚠️ NEW
**Actor:** Coach  
**Description:** Coach sends private message to student.  
**Preconditions:** Coach authenticated, student exists  
**Main Flow:**
1. Coach opens messaging interface
2. Coach composes message
3. Message sent to student
4. Student notified

**Postconditions:** Message delivered  
**Coverage:** ❌ **GAP - Not in current requirements**

---

#### UC-C-061: View Message History ⚠️ NEW
**Actor:** Coach  
**Description:** Coach reviews conversation with student.  
**Preconditions:** Messages exist  
**Main Flow:**
1. Coach opens conversation
2. Coach scrolls through message history
3. Coach can search messages

**Postconditions:** History displayed  
**Coverage:** ❌ **GAP - Not in current requirements**

---

### Analytics & Reporting

#### UC-C-070: View Dashboard
**Actor:** Coach  
**Description:** Coach views business overview.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach lands on dashboard
2. Coach views stats: students, lessons, analyses
3. Coach sees recent activity
4. Coach views upcoming schedule (if implemented)

**Postconditions:** Overview displayed  
**Coverage:** ✅ REQ-CP-020, REQ-CP-021

---

#### UC-C-071: Generate Student Report
**Actor:** Coach  
**Description:** Coach creates progress report for student/parent.  
**Preconditions:** Coach authenticated, student has progress data  
**Main Flow:**
1. Coach selects student
2. Coach clicks "Generate Report"
3. Coach selects date range and sections
4. System generates PDF
5. Coach downloads or shares

**Postconditions:** Report generated  
**Coverage:** ✅ REQ-CP-081

---

#### UC-C-072: View Public Page Analytics
**Actor:** Coach  
**Description:** Coach sees traffic to their public profile.  
**Preconditions:** Coach authenticated  
**Main Flow:**
1. Coach navigates to Analytics
2. Coach views page views, visitors, signups
3. Coach sees trends over time

**Postconditions:** Analytics displayed  
**Coverage:** ✅ REQ-CP-082

---

## 3. Student

### Authentication

#### UC-S-001: Login to Student Portal
**Actor:** Student  
**Description:** Student authenticates to access their portal.  
**Preconditions:** Student has account linked to coach  
**Main Flow:**
1. Student navigates to login (via coach page or direct)
2. Student enters credentials
3. Student redirected to their dashboard

**Postconditions:** Student authenticated  
**Coverage:** ⚠️ **NEEDS: Student authentication requirements**

---

#### UC-S-002: Manage Account Settings
**Actor:** Student  
**Description:** Student updates their profile and preferences.  
**Preconditions:** Student authenticated  
**Main Flow:**
1. Student navigates to Settings
2. Student updates profile photo, contact info, notifications

**Postconditions:** Settings updated  
**Coverage:** ⚠️ **NEEDS: Student settings requirements**

---

### Progress Viewing

#### UC-S-010: View Progress Dashboard
**Actor:** Student  
**Description:** Student sees their overall progress summary.  
**Preconditions:** Student authenticated  
**Main Flow:**
1. Student lands on dashboard
2. Student sees current level, recent achievements
3. Student sees "You Are Here" on progression path

**Postconditions:** Progress overview displayed  
**Coverage:** ⚠️ **NEEDS: Student dashboard requirements**

---

#### UC-S-011: View Progression Path
**Actor:** Student  
**Description:** Student explores their assigned progression path.  
**Preconditions:** Student has assigned path  
**Main Flow:**
1. Student navigates to Progression
2. Student views levels and skills
3. Student sees completed vs pending milestones
4. Student can drill into skill/milestone details

**Postconditions:** Path explored  
**Coverage:** ⚠️ **NEEDS: Student progression view requirements**

---

#### UC-S-012: View Achievement History
**Actor:** Student  
**Description:** Student reviews past milestone achievements.  
**Preconditions:** Student has achievements  
**Main Flow:**
1. Student navigates to Achievements
2. Student sees timeline of completions
3. Student can view linked videos/evidence

**Postconditions:** History reviewed  
**Coverage:** ⚠️ **NEEDS: Student achievement view requirements**

---

### Goals & Objectives ⚠️ NEW SECTION

#### UC-S-020: Set Personal Goals ⚠️ NEW
**Actor:** Student  
**Description:** Student defines personal goals to guide coaching.  
**Preconditions:** Student authenticated  
**Main Flow:**
1. Student navigates to Goals section
2. Student adds goal (e.g., "Improve serve consistency", "Play USTA 4.0")
3. Student sets target date (optional)
4. Coach is notified of new goal
5. Coach can incorporate into progression planning

**Postconditions:** Goal saved and visible to coach  
**Coverage:** ❌ **GAP - Not in current requirements**

---

#### UC-S-021: Track Goal Progress ⚠️ NEW
**Actor:** Student  
**Description:** Student monitors progress toward goals.  
**Preconditions:** Goals exist  
**Main Flow:**
1. Student views goal dashboard
2. Student sees progress indicators
3. Student can mark milestones related to goal
4. Student can update or close goals

**Postconditions:** Goal progress tracked  
**Coverage:** ❌ **GAP - Not in current requirements**

---

### Video

#### UC-S-030: Upload Video ⚠️ NEW
**Actor:** Student  
**Description:** Student uploads their own practice/match video.  
**Preconditions:** Student authenticated, coach allows student uploads  
**Main Flow:**
1. Student navigates to Videos
2. Student selects "Upload Video"
3. Student selects file and adds tags
4. Video uploaded to their library
5. Coach is notified of new video
6. Coach can request analysis

**Postconditions:** Video uploaded, coach notified  
**Coverage:** ❌ **GAP - Not in current requirements**

---

#### UC-S-031: View Video Library
**Actor:** Student  
**Description:** Student browses their videos.  
**Preconditions:** Student authenticated  
**Main Flow:**
1. Student navigates to Videos
2. Student views thumbnails and metadata
3. Student can play videos
4. Student can view analysis results (if any)

**Postconditions:** Library displayed  
**Coverage:** ⚠️ **NEEDS: Student video view requirements**

---

#### UC-S-032: View Analysis Results
**Actor:** Student  
**Description:** Student reviews AI analysis of their video.  
**Preconditions:** Analysis complete  
**Main Flow:**
1. Student opens analyzed video
2. Student sees skeleton overlay
3. Student views metrics and coach's notes
4. Student sees improvement suggestions

**Postconditions:** Analysis reviewed  
**Coverage:** ⚠️ **NEEDS: Student analysis view requirements**

---

### Content Viewing

#### UC-S-040: View Coach Blog Posts ⚠️ NEW (related to UC-C-024)
**Actor:** Student  
**Description:** Student reads blog content from their coach.  
**Preconditions:** Coach has published blog posts  
**Main Flow:**
1. Student navigates to Blog/Articles
2. Student browses coach's posts
3. Student reads article

**Postconditions:** Content consumed  
**Coverage:** ❌ **GAP - Depends on coach blog feature**

---

#### UC-S-041: View Lesson Notes (Shared)
**Actor:** Student  
**Description:** Student views notes coach has shared.  
**Preconditions:** Coach has shared notes  
**Main Flow:**
1. Student navigates to Lessons
2. Student views lessons with shared notes
3. Student reads coach feedback

**Postconditions:** Notes reviewed  
**Coverage:** ⚠️ **NEEDS: Student lesson view requirements**

---

### Communication ⚠️ NEW SECTION

#### UC-S-050: Chat with Coach ⚠️ NEW
**Actor:** Student  
**Description:** Student sends messages to coach.  
**Preconditions:** Student authenticated  
**Main Flow:**
1. Student opens chat/messaging
2. Student composes message
3. Message sent to coach
4. Coach notified

**Postconditions:** Message delivered  
**Coverage:** ❌ **GAP - Not in current requirements**

---

#### UC-S-051: Interact with AI Chatbot ⚠️ NEW
**Actor:** Student  
**Description:** Student asks questions to AI assistant (coach context).  
**Preconditions:** Student authenticated, feature enabled  
**Main Flow:**
1. Student opens AI chat
2. Student asks question about technique, schedule, progress
3. AI responds with contextual information (coach's methodology, student's progress)
4. AI can reference videos, milestones, etc.
5. If AI can't answer, routes to coach

**Postconditions:** Student gets answer or escalation  
**Coverage:** ❌ **GAP - Not in current requirements**

---

#### UC-S-052: View Message History ⚠️ NEW
**Actor:** Student  
**Description:** Student reviews past conversations.  
**Preconditions:** Messages exist  
**Main Flow:**
1. Student opens conversation
2. Student scrolls through history
3. Student can search

**Postconditions:** History displayed  
**Coverage:** ❌ **GAP - Not in current requirements**

---

## 4. System Admin

### UC-A-001: Manage System Templates
**Actor:** System Admin  
**Description:** Admin creates/updates platform-wide progression templates.  
**Main Flow:**
1. Admin accesses admin panel
2. Admin creates/edits USPTA/PTR templates
3. Templates available to all coaches

**Coverage:** ⚠️ **NEEDS: Admin requirements**

---

### UC-A-002: View Platform Analytics
**Actor:** System Admin  
**Description:** Admin monitors platform health and usage.  
**Main Flow:**
1. Admin views dashboard
2. Admin sees: active coaches, students, videos, analyses
3. Admin monitors system health

**Coverage:** ⚠️ **NEEDS: Admin requirements**

---

### UC-A-003: Support User Issues
**Actor:** System Admin  
**Description:** Admin helps users with account/technical issues.  
**Main Flow:**
1. Admin receives support request
2. Admin can view user data (within privacy bounds)
3. Admin resolves issue

**Coverage:** ⚠️ **NEEDS: Admin requirements**

---

# GAP ANALYSIS

## Summary of Gaps - RESOLVED

| Gap ID | Feature | Actors | Priority | Status |
|--------|---------|--------|----------|--------|
| **GAP-001** | Student Video Upload | Student | HIGH | ✅ **RESOLVED** - Added to V1 scope |
| **GAP-002** | Student Goals/Objectives | Student, Coach | HIGH | ✅ **RESOLVED** - Added to V1 scope |
| **GAP-003** | Coach-Student Messaging | Coach, Student | HIGH | ✅ **RESOLVED** - Added to V1 scope |
| **GAP-004** | AI Chatbot for Students | Student | MEDIUM | ⏳ **DEFERRED** - V1.1 scope |
| **GAP-005** | Coach Blog Posts | Coach | MEDIUM | ✅ **RESOLVED** - Added to V1 scope |
| **GAP-006** | Student Portal (Full) | Student | HIGH | ✅ **RESOLVED** - TPv1_Requirements_StudentPortal.md created |
| **GAP-007** | Admin Portal | Admin | LOW (V1) | ⏳ **DEFERRED** - V1.1+ scope |

### V1 Scope Summary

**Included in V1:**
- ✅ Student Video Upload (REQ-SP-033 to REQ-SP-036)
- ✅ Student Goals/Objectives (REQ-SP-040 to REQ-SP-047)
- ✅ Coach-Student Messaging (REQ-CP-093 to REQ-CP-098, REQ-SP-050 to REQ-SP-056)
- ✅ Coach Blog Posts (REQ-CP-100 to REQ-CP-103, REQ-SP-060 to REQ-SP-063)
- ✅ Complete Student Portal (TPv1_Requirements_StudentPortal.md)

**Deferred to V1.1+:**
- ⏳ AI Chatbot for Students
- ⏳ Admin Portal

---

## GAP-001: Student Video Upload

### Description
Students should be able to upload their own videos (practice sessions, matches) that coaches can then review and analyze.

### Use Cases Affected
- UC-S-030: Upload Video

### Proposed Requirements

**REQ-SP-050:** Student Video Upload
- Students SHALL be able to upload videos to their library
- Uploads SHALL be subject to coach-defined limits (if any)
- Coach SHALL be notified of new student uploads
- Coach SHALL have ability to enable/disable student uploads per student
- Student uploads SHALL count toward coach's storage quota

**REQ-SP-051:** Upload Configuration (Coach Side)
- Coach SHALL be able to enable/disable student uploads globally
- Coach SHALL be able to set per-student upload permissions
- Coach MAY set file size/duration limits for student uploads

### Database Changes
```prisma
model Video {
  // Add field:
  uploadedBy  UploadedBy  @default(coach) @map("uploaded_by")
}

enum UploadedBy {
  coach
  student
}
```

### Task Impact
- Add to TG-13: Video Management
- New task: TG-13-007: Implement student upload permissions
- New task: TG-13-008: Add coach notification for student uploads

---

## GAP-002: Student Goals & Objectives

### Description
Students should be able to set personal goals that inform the coach's progression planning. This creates a two-way relationship in development planning.

### Use Cases Affected
- UC-S-020: Set Personal Goals
- UC-S-021: Track Goal Progress

### Proposed Requirements

**REQ-SP-060:** Student Goals
- Students SHALL be able to create personal goals
- Goals SHALL include: title, description, target date (optional), category
- Goals SHALL be visible to their coach
- Coach SHALL be notified when student adds/updates goals
- Goals MAY be linked to milestones

**REQ-SP-061:** Goal Categories
- System SHALL provide predefined goal categories:
  - Skill improvement (e.g., "Consistent first serve")
  - Competition (e.g., "Win club championship")
  - Rating (e.g., "Reach UTR 6.0")
  - Fitness (e.g., "Improve court coverage")
  - Custom

**REQ-SP-062:** Goal Progress
- Students SHALL be able to update goal status (in progress, achieved, paused)
- Coach SHALL be able to add notes to student goals
- System MAY auto-link milestone achievements to related goals

### Database Changes
```prisma
model StudentGoal {
  id          String   @id @default(uuid())
  studentId   String   @map("student_id")
  student     Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  
  title       String
  description String?
  category    GoalCategory
  targetDate  DateTime? @map("target_date")
  status      GoalStatus @default(in_progress)
  
  coachNotes  String?  @map("coach_notes")
  
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  achievedAt  DateTime? @map("achieved_at")
  
  @@index([studentId])
  @@map("student_goals")
}

enum GoalCategory {
  skill_improvement
  competition
  rating
  fitness
  custom
}

enum GoalStatus {
  in_progress
  achieved
  paused
  abandoned
}
```

### Task Impact
- New Task Group: TG-19: Student Goals (6-8 hours)
  - TG-19-001: Create goals API endpoints
  - TG-19-002: Create student goals UI
  - TG-19-003: Add coach goals view
  - TG-19-004: Implement goal notifications
  - TG-19-005: Create goal-milestone linking

---

## GAP-003: Coach-Student Messaging

### Description
Private messaging channel between coach and student for asynchronous communication about lessons, progress, scheduling, etc.

### Use Cases Affected
- UC-C-060: Send Message to Student
- UC-C-061: View Message History
- UC-S-050: Chat with Coach
- UC-S-052: View Message History

### Proposed Requirements

**REQ-MSG-001:** Messaging System
- Platform SHALL provide private messaging between coach and student
- Messages SHALL be stored and retrievable
- Messages SHALL support text and optional media attachments
- Unread message count SHALL be displayed

**REQ-MSG-002:** Message Notifications
- Recipients SHALL be notified of new messages (in-app, email, push)
- Notification preferences SHALL be configurable

**REQ-MSG-003:** Message History
- Users SHALL be able to view full conversation history
- Users SHALL be able to search within conversations
- Messages SHALL be retained according to data retention policy

### Database Changes
```prisma
model Conversation {
  id          String   @id @default(uuid())
  coachId     String   @map("coach_id")
  coach       Coach    @relation(fields: [coachId], references: [id], onDelete: Cascade)
  studentId   String   @map("student_id")
  student     Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  
  lastMessageAt DateTime? @map("last_message_at")
  
  createdAt   DateTime @default(now()) @map("created_at")
  
  messages    Message[]
  
  @@unique([coachId, studentId])
  @@index([coachId])
  @@index([studentId])
  @@map("conversations")
}

model Message {
  id             String   @id @default(uuid())
  conversationId String   @map("conversation_id")
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  
  senderId       String   @map("sender_id")
  senderType     SenderType @map("sender_type")
  
  content        String
  attachments    Json?    // Array of attachment URLs
  
  readAt         DateTime? @map("read_at")
  
  createdAt      DateTime @default(now()) @map("created_at")
  
  @@index([conversationId])
  @@index([conversationId, createdAt])
  @@map("messages")
}

enum SenderType {
  coach
  student
  system
  ai
}
```

### Task Impact
- New Task Group: TG-20: Messaging System (10-12 hours)
  - TG-20-001: Create conversation/message API
  - TG-20-002: Create WebSocket connection for real-time
  - TG-20-003: Build coach messaging UI
  - TG-20-004: Build student messaging UI
  - TG-20-005: Implement read receipts
  - TG-20-006: Add message notifications

---

## GAP-004: AI Chatbot for Students

### Description
AI-powered chatbot that students can interact with to get answers about their progress, schedule, technique tips, etc. The AI has context of the coach's methodology and student's data.

### Use Cases Affected
- UC-S-051: Interact with AI Chatbot

### Proposed Requirements

**REQ-AI-001:** Student AI Assistant
- Students SHALL have access to AI chat assistant
- AI SHALL have context of:
  - Student's progression path and current level
  - Student's video analyses and metrics
  - Coach's methodology and teaching approach (from Sanity content)
  - Scheduled lessons and history
- AI SHALL answer questions about technique, progress, schedule
- AI SHALL escalate to coach for complex/personal questions

**REQ-AI-002:** AI Guardrails
- AI SHALL NOT provide medical advice
- AI SHALL NOT contradict coach's methodology
- AI SHALL clearly indicate when escalating to coach
- AI responses SHALL be logged for coach review

**REQ-AI-003:** AI Availability
- AI chat MAY be tier-gated (Professional+)
- AI usage MAY be quota-limited

### Technical Approach
- Use Claude API or similar LLM
- RAG (Retrieval Augmented Generation) with student data
- Store conversations in Messages table (senderType = 'ai')

### Task Impact
- New Task Group: TG-21: AI Student Assistant (12-16 hours) - **V1.1+ candidate**
  - TG-21-001: Design AI prompt/context system
  - TG-21-002: Implement RAG for student data
  - TG-21-003: Create AI chat API
  - TG-21-004: Build AI chat UI
  - TG-21-005: Implement escalation flow
  - TG-21-006: Add coach review dashboard

---

## GAP-005: Coach Blog Posts

### Description
Coaches can create blog-style content that appears on their profile, demonstrating expertise and engaging students.

### Use Cases Affected
- UC-C-024: Create Blog Post
- UC-S-040: View Coach Blog Posts

### Proposed Requirements

**REQ-CP-077:** Coach Blog
- Coaches SHALL be able to create blog posts via Sanity CMS
- Posts SHALL include: title, content (rich text), featured image, tags
- Posts SHALL support draft/published states
- Posts SHALL appear on coach's public profile
- Posts MAY be featured on platform blog (with coach permission)

**REQ-CP-078:** Blog Management
- Coach MAY set posts as student-only (authenticated)
- Coach SHALL see view counts for posts
- Coach MAY enable/disable comments (future)

### Sanity Schema Addition
```typescript
// schemas/coach/blogPost.ts
export default {
  name: 'coachBlogPost',
  title: 'Coach Blog Post',
  type: 'document',
  fields: [
    {
      name: 'coach',
      title: 'Coach',
      type: 'reference',
      to: [{ type: 'coachProfile' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Students Only', value: 'students' },
        ],
      },
      initialValue: 'public',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
};
```

### Task Impact
- Add to TG-07: Sanity CMS
  - TG-07-008: Create coach blog post schema
  - TG-07-009: Configure blog post workflow
- Add to TG-15: Coach Public Pages
  - TG-15-007: Add blog section to coach profile
  - TG-15-008: Create blog post detail page

---

## GAP-006: Student Portal (Full)

### Description
Complete student-facing application with authentication, progress viewing, video access, messaging, and goals.

### Proposed Requirements Document
This requires a full **TPv1_Requirements_StudentPortal.md** document (see recommendation below).

### High-Level Sections
1. Student Authentication & Account
2. Dashboard & Progress Overview
3. Progression Path Viewing
4. Video Library & Analysis Viewing
5. Goals & Objectives
6. Messaging with Coach
7. Lesson History & Notes
8. Coach Blog/Content Access
9. Profile Settings

---

## GAP-007: Admin Portal

### Description
Platform administration interface for TennisPro team.

### Priority
LOW for V1 - Can manage via direct database access and AWS Console initially.

### V1.1+ Scope
- User management (coaches, students)
- Platform analytics
- System template management
- Support tools

---

# IMPLEMENTATION STATUS

## Completed Actions

### 1. ✅ Created Student Portal Requirements Document
**Document:** TPv1_Requirements_StudentPortal.md (v1.0.0)
- Full requirements for all student use cases
- 65+ requirements across 12 sections
- Data model additions specified

### 2. ✅ Updated Existing Documents

**TPv1_Requirements.md (v1.0.0):**
- Added REQ-CP-093 to REQ-CP-098 (Messaging)
- Added REQ-CP-100 to REQ-CP-103 (Coach Blog)
- Updated data model with new entities

**TPv1_Plan.md (v1.3.0):**
- Added Student Portal to V1 scope
- Added Messaging, Goals, Blog features
- Extended timeline to 14 weeks

**TPv1_Tasks.md (v2.0.0):**
- Added TG-19: Student Portal (14-18 hours)
- Added TG-20: Student Goals (6-8 hours)
- Added TG-21: Messaging System (10-12 hours)
- Updated TG-07, TG-13, TG-15 with new features

### 3. ✅ V1 Scope Finalized

| Feature | Status | Document |
|---------|--------|----------|
| Student Video Upload | ✅ V1 | REQ-SP-033+ |
| Student Goals | ✅ V1 | REQ-SP-040+ |
| Coach-Student Messaging | ✅ V1 | REQ-CP-093+, REQ-SP-050+ |
| Coach Blog Posts | ✅ V1 | REQ-CP-100+ |
| AI Chatbot | ⏳ V1.1 | Deferred |
| Admin Portal | ⏳ V1.1+ | Deferred |

---

# APPENDIX: Use Case Coverage Matrix

| Use Case ID | Description | Requirements | Tasks | Status |
|-------------|-------------|--------------|-------|--------|
| UC-AB-001 | Browse Marketing Site | REQ-MKT-* | TG-09 | ✅ Covered |
| UC-AB-002 | View Coach Profile | REQ-MKT-060+ | TG-15 | ✅ Covered |
| UC-AB-003 | Read Blog | REQ-MKT-040+ | TG-09 | ✅ Covered |
| UC-AB-004 | Search Help | REQ-MKT-050+ | TG-09 | ✅ Covered |
| UC-AB-005 | Sign Up Coach | REQ-CP-001 | TG-04 | ✅ Covered |
| UC-AB-006 | Sign Up Student | REQ-SP-001, REQ-SP-002 | TG-19 | ✅ Covered |
| UC-C-001 | Coach Login | REQ-CP-002 | TG-04 | ✅ Covered |
| UC-C-010-015 | Student Management | REQ-CP-030+ | TG-11 | ✅ Covered |
| UC-C-020-025 | Content Management | REQ-CP-070+, REQ-CP-100+ | TG-07, TG-10 | ✅ Covered |
| UC-C-030-034 | Progression | REQ-CP-040+ | TG-12 | ✅ Covered |
| UC-C-040-046 | Video | REQ-CP-050+ | TG-13, TG-14 | ✅ Covered |
| UC-C-050-052 | Lessons | REQ-CP-060+ | TG-10 | ✅ Covered |
| UC-C-060-061 | Messaging | REQ-CP-093+ | TG-21 | ✅ Covered |
| UC-C-070-072 | Analytics | REQ-CP-080+ | TG-10 | ✅ Covered |
| UC-S-001-002 | Student Auth | REQ-SP-001+ | TG-19 | ✅ Covered |
| UC-S-010-012 | Progress View | REQ-SP-020+ | TG-19 | ✅ Covered |
| UC-S-020-021 | Goals | REQ-SP-040+ | TG-20 | ✅ Covered |
| UC-S-030-032 | Video | REQ-SP-030+ | TG-13, TG-19 | ✅ Covered |
| UC-S-040-041 | Content View | REQ-SP-060+ | TG-19 | ✅ Covered |
| UC-S-050-052 | Messaging | REQ-SP-050+ | TG-21 | ✅ Covered |

---

*Document ready for review and scope decisions.*
