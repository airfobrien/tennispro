# TennisPro V1 (TPv1) - Student Portal Requirements

**Document ID:** TPv1-REQ-002  
**Version:** 1.0.0  
**Created:** 2025-12-06T19:00:00Z  
**Last Updated:** 2025-12-06T19:00:00Z  
**Status:** ✅ Complete  
**Author:** Bob O'Brien  
**Derived From:** TPv1_Plan.md v1.2.0, TPv1_UseCases.md v1.0.0  

---

## Document Hierarchy

```
TPv1_Plan.md ✅ COMPLETE (v1.2.0)
TPv1_ADR_001_Backend_Infrastructure.md ✅ DECIDED
TPv1_Requirements.md ✅ (Marketing + Coach Portal)
TPv1_Requirements_StudentPortal.md (this document) ✅ NEW
TPv1_UseCases.md ✅ 
TPv1_Tasks.md ✅
```

---

## Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-12-06 | Initial student portal requirements; display-focused architecture; goals, video upload, messaging features | Bob O'Brien |

---

## Overview

### Purpose

The Student Portal is the authenticated application where tennis students access content assigned by their coach, view their progress, upload videos, set goals, and communicate with their coach. 

**Key Architectural Principle:** The Student Portal is primarily a **display layer** for coach-curated content. Students view what coaches have assigned, shared, or published. The student's active contributions are limited to:
- Uploading videos for coach review
- Setting personal goals/objectives
- Messaging their coach
- Viewing their own progress

### Design Philosophy

```
┌─────────────────────────────────────────────────────────────┐
│                    COACH CREATES/MANAGES                     │
│  • Progression paths & milestones                           │
│  • Video analyses & feedback                                │
│  • Lesson notes (shared/private)                            │
│  • Blog posts & content                                     │
│  • Target metrics & assessments                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (assigned/shared)
┌─────────────────────────────────────────────────────────────┐
│                    STUDENT VIEWS/CONSUMES                    │
│  • Their assigned progression path                          │
│  • Their progress & achievements                            │
│  • Videos and analysis results                              │
│  • Shared lesson notes                                      │
│  • Coach's blog posts                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (student contributes)
┌─────────────────────────────────────────────────────────────┐
│                    STUDENT CREATES                           │
│  • Video uploads (for coach review)                         │
│  • Personal goals & objectives                              │
│  • Messages to coach                                        │
└─────────────────────────────────────────────────────────────┘
```

### Success Criteria

- Student activation rate > 70% (login within 7 days of invitation)
- Weekly engagement > 1 session
- Video upload rate: 2+ per month per active student
- Goal completion visibility improves retention

### User Personas

| Persona | Description | Primary Needs |
|---------|-------------|---------------|
| **New Student** | Just invited by coach | Easy onboarding, understand platform |
| **Active Recreational** | Regular lessons, casual goals | View progress, see improvement |
| **Competitive Junior** | Tournament-focused, data-driven | Detailed metrics, video analysis, goals |
| **Parent/Guardian** | Monitors child's progress | View reports, see achievements |

---

# FUNCTIONAL REQUIREMENTS

## 1. Authentication & Account

### 1.1 Registration

**REQ-SP-001:** Student Registration via Invitation
- Students SHALL register via invitation link from coach
- Invitation link SHALL pre-associate student with coach
- Registration SHALL support:
  - Email and password
  - Google OAuth
  - Apple OAuth
- Registration SHALL require email verification

**REQ-SP-002:** Student Registration via Coach Profile
- Students SHALL be able to register via coach's public page (/c/{slug})
- Registration SHALL auto-associate student with that coach
- Coach SHALL be notified of new student signup

**REQ-SP-003:** Registration Information
- Required fields: Name, Email, Password (or OAuth)
- Optional fields: Phone, Photo
- Student SHALL accept Terms of Service and Privacy Policy

### 1.2 Login

**REQ-SP-004:** Student Login
- Students SHALL login via:
  - Email and password
  - Google OAuth
  - Apple OAuth
- Login page SHALL be accessible from:
  - Marketing site
  - Coach's public profile page
  - Direct URL (app.tennispro.com/student/login)
- "Remember me" option SHALL be available

**REQ-SP-005:** Session Management
- Session timeout: 30 days (configurable)
- Students SHALL be able to logout
- Students SHALL be able to logout from all devices

### 1.3 Account Settings

**REQ-SP-006:** Profile Settings
- Students SHALL be able to manage:
  - Name
  - Email (with verification)
  - Phone
  - Profile photo
  - Password (if not OAuth-only)

**REQ-SP-007:** Notification Preferences
- Students SHALL configure notifications for:
  - New messages from coach
  - Milestone achievements
  - New video analysis ready
  - Lesson reminders (future)
- Notification channels: Email, Push (PWA), In-app

**REQ-SP-008:** Account Management
- Students SHALL be able to request account deletion
- Deletion SHALL require confirmation
- Deletion SHALL notify coach
- Data retention per privacy policy

---

## 2. Dashboard

**REQ-SP-010:** Student Dashboard
- Dashboard SHALL be the default landing page after login
- Dashboard SHALL display student's coach information
- Dashboard SHALL provide at-a-glance progress summary

**REQ-SP-011:** Dashboard Components
- Dashboard SHALL display:
  - Welcome message with student name
  - Coach info (name, photo, contact quick action)
  - Current level in progression path
  - Recent achievements (last 5 milestones)
  - Unread message indicator
  - Recent videos with analysis status
  - Active goals summary
  - Quick actions (upload video, message coach, view progress)

**REQ-SP-012:** Dashboard Notifications
- Dashboard SHALL show notification badge for:
  - Unread messages
  - New analysis results
  - New shared content from coach

---

## 3. Progression & Progress

### 3.1 Path Viewing

**REQ-SP-020:** View Assigned Progression Path
- Students SHALL view their assigned progression path
- Path display SHALL show:
  - All levels in the path
  - Current level highlighted ("You Are Here")
  - Completed vs pending levels
- Students SHALL NOT be able to modify the path structure

**REQ-SP-021:** Level Detail View
- Students SHALL drill into each level to see:
  - Level name and description
  - Skills within the level
  - Completion percentage per skill
  - Overall level completion percentage

**REQ-SP-022:** Skill Detail View
- Students SHALL drill into each skill to see:
  - Skill name and description
  - Milestones within the skill
  - Status of each milestone (not started, in progress, achieved)
  - Linked videos/evidence for achieved milestones

**REQ-SP-023:** Milestone Detail View
- Students SHALL view milestone details:
  - Name and description
  - Target metrics (if defined by coach)
  - Current measured values (from AI analysis)
  - Achievement status and date
  - Validation evidence (video link)
  - Coach notes (if shared)

### 3.2 Progress Visualization

**REQ-SP-024:** Progress Overview
- Students SHALL see visual progress representation:
  - Progress bar or percentage for overall path
  - Level-by-level completion
  - Skills radar/spider chart (optional)
  - Achievement timeline

**REQ-SP-025:** "You Are Here" Indicator
- Platform SHALL clearly indicate student's current position
- Visual marker on path showing current level
- Contextual messaging: "You've completed X of Y milestones in [Level]"

**REQ-SP-026:** Achievement History
- Students SHALL view chronological list of achievements
- Each achievement SHALL show:
  - Milestone name
  - Date achieved
  - Validation method (coach assessment, AI, match result)
  - Link to evidence video (if any)

### 3.3 Progress Insights (Read-Only)

**REQ-SP-027:** Metrics Display
- Students SHALL view their measured metrics from analyses
- Metrics displayed SHALL include:
  - Current value
  - Target value (coach-defined)
  - Trend over time (if multiple measurements)
- Students SHALL NOT modify target metrics

**REQ-SP-028:** Comparison to Targets
- Students SHALL see how their metrics compare to coach-defined targets
- Visual indicators: below target, at target, exceeding target
- Gap analysis: "Your knee bend is 38°, target is 45°"

---

## 4. Video Library

### 4.1 Viewing Videos

**REQ-SP-030:** Video Library Access
- Students SHALL access their video library
- Library SHALL display all videos (coach-uploaded and self-uploaded)
- Library SHALL show:
  - Thumbnail
  - Title/filename
  - Upload date
  - Uploader (coach or self)
  - Stroke type tag
  - Analysis status (none, pending, complete)

**REQ-SP-031:** Video Filtering & Search
- Students SHALL filter videos by:
  - Stroke type
  - Date range
  - Analysis status
  - Uploader (coach vs self)
- Students SHALL search by title/filename

**REQ-SP-032:** Video Playback
- Students SHALL play videos with controls:
  - Play/pause
  - Seek
  - Playback speed (0.25x - 2x)
  - Frame-by-frame navigation
  - Fullscreen

### 4.2 Video Upload (Student Contribution)

**REQ-SP-033:** Student Video Upload
- Students SHALL be able to upload videos
- Upload capability MAY be enabled/disabled by coach per student
- Supported formats: MP4, MOV, WebM
- Maximum file size: Per coach/tier limits
- Maximum duration: 5 minutes

**REQ-SP-034:** Upload Workflow
- Student selects video file
- Student adds optional metadata:
  - Title
  - Stroke type
  - Date recorded
  - Notes for coach
- Upload shows progress indicator
- Upload supports background completion (PWA)

**REQ-SP-035:** Upload Notifications
- Coach SHALL be notified when student uploads video
- Notification SHALL include:
  - Student name
  - Video title/type
  - Link to video in coach portal

**REQ-SP-036:** Student Upload Limits
- Coach SHALL define upload permissions per student:
  - Enabled/disabled
  - Frequency limits (optional)
- Student uploads SHALL count toward coach's storage quota
- Students SHALL see remaining upload allowance (if limited)

### 4.3 Analysis Results Viewing

**REQ-SP-037:** View Analysis Results
- Students SHALL view completed analysis for their videos
- Analysis view SHALL display:
  - Video with skeleton overlay
  - Toggle skeleton on/off
  - Extracted metrics list
  - Comparison to target metrics
  - Coach's insights/notes (if added)

**REQ-SP-038:** Analysis Navigation
- Students SHALL navigate analysis:
  - Jump to key frames
  - View metrics at specific timestamps
  - Compare metrics across multiple analyses (future)

**REQ-SP-039:** Analysis Limitations
- Students SHALL NOT:
  - Request new analyses (coach only)
  - Modify skeleton landmarks
  - Change stroke type classification
  - Delete analyses

---

## 5. Goals & Objectives (Student Contribution)

### 5.1 Goal Management

**REQ-SP-040:** Create Personal Goal
- Students SHALL create personal goals
- Goal fields:
  - Title (required): e.g., "Improve serve consistency"
  - Description (optional): Details about the goal
  - Category (required): Skill improvement, Competition, Rating, Fitness, Custom
  - Target date (optional): When student hopes to achieve
- Goals SHALL be visible to coach immediately

**REQ-SP-041:** Goal Categories
- System SHALL provide predefined categories:
  - **Skill Improvement**: Technical goals (e.g., "Hit 70% first serves in")
  - **Competition**: Tournament goals (e.g., "Win club championship")
  - **Rating**: Rating system goals (e.g., "Reach UTR 6.0", "NTRP 4.0")
  - **Fitness**: Physical goals (e.g., "Improve court coverage")
  - **Custom**: Free-form goals

**REQ-SP-042:** View Goals
- Students SHALL view all their goals
- Goals list SHALL show:
  - Title
  - Category icon/badge
  - Status (in progress, achieved, paused)
  - Target date (if set)
  - Coach notes (if any)

**REQ-SP-043:** Update Goal Status
- Students SHALL update goal status:
  - In Progress (default)
  - Achieved (with achievement date)
  - Paused (temporarily suspended)
  - Abandoned (no longer pursuing)
- Status changes SHALL notify coach

**REQ-SP-044:** Edit/Delete Goals
- Students SHALL edit goal details
- Students SHALL delete goals (with confirmation)
- Deleted goals MAY be retained for history (soft delete)

### 5.2 Goal-Progress Integration

**REQ-SP-045:** Link Goals to Milestones
- Students MAY link goals to progression milestones
- Linked milestone completion MAY auto-progress goal
- Coach MAY link milestones to student goals

**REQ-SP-046:** Coach Goal Notes
- Coach MAY add notes to student goals
- Coach notes SHALL be visible to student
- Notes provide guidance on achieving goal

**REQ-SP-047:** Goal Achievement Recognition
- Achieved goals SHALL be celebrated (visual feedback)
- Achievement MAY trigger notification to coach
- Goals history SHALL be maintained

---

## 6. Messaging (Student Contribution)

### 6.1 Conversation

**REQ-SP-050:** Message Coach
- Students SHALL send messages to their coach
- Messages support text content
- Messages MAY include attachments (images, links)
- Messages sent SHALL notify coach

**REQ-SP-051:** View Conversation
- Students SHALL view full conversation history with coach
- Messages displayed in chronological order
- Clear distinction between sent/received messages
- Timestamps on all messages

**REQ-SP-052:** Message Status
- Students SHALL see message status:
  - Sent
  - Delivered
  - Read (if coach has read)

**REQ-SP-053:** Unread Indicators
- Unread message count SHALL display on:
  - Dashboard
  - Navigation menu
  - Messages icon

### 6.2 Message Features

**REQ-SP-054:** Message Search
- Students SHALL search within conversation
- Search by keyword
- Results highlight matching messages

**REQ-SP-055:** Message Notifications
- Students SHALL receive notifications for new coach messages
- Notifications per preferences (email, push, in-app)
- Notification SHALL include message preview

**REQ-SP-056:** Attachment Support
- Students MAY attach to messages:
  - Images (with preview)
  - Links (with unfurl preview)
- Attachments SHALL have size limits
- Video attachments NOT supported (use video upload instead)

---

## 7. Content Viewing (Coach-Published)

### 7.1 Coach Blog/Articles

**REQ-SP-060:** View Coach Blog Posts
- Students SHALL access coach's published blog posts
- Blog section accessible from student portal
- Posts displayed in reverse chronological order

**REQ-SP-061:** Blog Post Display
- Blog posts SHALL show:
  - Title
  - Featured image
  - Publication date
  - Full content (rich text)
- Students MAY share posts (if coach enables)

**REQ-SP-062:** Blog Filtering
- Students SHALL filter posts by:
  - Tags/categories
  - Date
- Students SHALL search posts by title/content

**REQ-SP-063:** Visibility Respect
- Only posts marked "public" or "students" SHALL appear
- "Students only" posts require authentication

### 7.2 Lesson Notes (Shared)

**REQ-SP-064:** View Shared Lesson Notes
- Students SHALL view lesson notes coach has marked as "shared"
- Notes accessible from lesson history
- Private notes (coach-only) SHALL NOT be visible

**REQ-SP-065:** Lesson History
- Students SHALL view their lesson history
- Lesson entry shows:
  - Date and time
  - Duration
  - Type (private, semi-private, etc.)
  - Shared notes (if any)
  - Linked videos (if any)

---

## 8. Coach Information

**REQ-SP-070:** View Coach Profile
- Students SHALL view their coach's profile information
- Profile displays:
  - Name and photo
  - Bio/credentials
  - Contact information (as coach permits)
  - Services offered

**REQ-SP-071:** Contact Coach Quick Actions
- Students SHALL have quick actions:
  - Send message (opens messaging)
  - View coach's public page
- Email/phone links (if coach provides)

---

## 9. User Interface Requirements

### 9.1 Responsive Design

**REQ-SP-100:** Device Support
- Student Portal SHALL be fully functional on:
  - Desktop (1024px+)
  - Tablet (640-1024px)
  - Mobile (< 640px)
- Mobile-first design approach

**REQ-SP-101:** Navigation
- Desktop: Top navigation with left sidebar (optional)
- Mobile: Bottom navigation bar
- Primary nav items: Dashboard, Progress, Videos, Goals, Messages

### 9.2 PWA Requirements

**REQ-SP-110:** Installability
- Student Portal SHALL be installable as PWA
- App icon and splash screen configured
- Works offline for cached content

**REQ-SP-111:** Offline Support
- Dashboard SHALL display cached data offline
- Progress view SHALL work offline (cached)
- Video list SHALL display offline (playback requires connection)
- Message composition SHALL queue for send when online
- Clear offline status indicator

**REQ-SP-112:** Background Operations
- Video uploads SHALL continue in background
- Messages SHALL send when connection restored
- Push notifications SHALL work when app closed

### 9.3 Accessibility

**REQ-SP-120:** WCAG Compliance
- Student Portal SHALL meet WCAG 2.1 Level AA
- All interactive elements keyboard accessible
- Screen reader support
- Proper focus management

---

## 10. Non-Functional Requirements

### 10.1 Performance

**REQ-SP-200:** Load Time
- Initial load < 3 seconds on 4G
- Subsequent navigation < 1 second
- Video playback start < 2 seconds

**REQ-SP-201:** Responsiveness
- UI interactions < 100ms response
- Smooth scrolling (60fps)
- No layout shifts after load

### 10.2 Security

**REQ-SP-210:** Data Access
- Students SHALL only access their own data
- Students SHALL only see content from their coach
- Cross-student data access SHALL be prevented

**REQ-SP-211:** Session Security
- Sessions expire after inactivity (configurable)
- Secure token storage
- HTTPS required

### 10.3 Privacy

**REQ-SP-220:** Data Visibility
- Students SHALL NOT see other students' data
- Students SHALL NOT see coach's other students
- Video content isolated per student

---

## 11. Data Model Additions

### Student Goals

```
StudentGoal
├── id (uuid)
├── studentId (fk → Student)
├── title (string, required)
├── description (text, optional)
├── category (enum: skill_improvement, competition, rating, fitness, custom)
├── targetDate (date, optional)
├── status (enum: in_progress, achieved, paused, abandoned)
├── coachNotes (text, optional)
├── linkedMilestoneId (fk → Milestone, optional)
├── createdAt
├── updatedAt
└── achievedAt (date, optional)
```

### Video Upload Tracking

```
Video (additions)
├── uploadedBy (enum: coach, student)
└── studentNotes (text, optional) // Notes from student on upload
```

### Messaging

```
Conversation
├── id (uuid)
├── coachId (fk → Coach)
├── studentId (fk → Student)
├── lastMessageAt (datetime)
└── createdAt

Message
├── id (uuid)
├── conversationId (fk → Conversation)
├── senderId (uuid) // Coach or Student ID
├── senderType (enum: coach, student)
├── content (text)
├── attachments (json, optional)
├── readAt (datetime, optional)
└── createdAt
```

---

## 12. Integration Points

### With Coach Portal

| Student Action | Coach Portal Effect |
|----------------|---------------------|
| Student signs up | Coach sees new student, can accept/manage |
| Student uploads video | Coach notified, video in student library |
| Student creates goal | Coach sees goal, can add notes |
| Student updates goal | Coach notified of status change |
| Student sends message | Coach receives in messaging |
| Student views analysis | (No effect, view-only) |

### With Sanity CMS

| Content Type | Source | Student Access |
|--------------|--------|----------------|
| Coach Profile | Sanity (coach-managed) | Read-only view |
| Coach Blog Posts | Sanity (coach-managed) | Read-only, filtered by visibility |
| Progression Templates | Sanity (system) | Read-only via assigned path |

### With AWS Services

| Service | Student Portal Usage |
|---------|---------------------|
| Cognito | Authentication, JWT tokens |
| S3 | Video upload (presigned URLs), video playback |
| CloudFront | Video delivery, static assets |
| API Gateway | All API calls |
| Lambda | Business logic |

---

## Appendix: Screen Inventory

| Screen | Route | Description |
|--------|-------|-------------|
| Login | /student/login | Authentication |
| Register | /student/register | New account creation |
| Register via Coach | /c/{slug}/join | Registration from coach profile |
| Dashboard | /student | Home/overview |
| Progress Overview | /student/progress | Progression path view |
| Level Detail | /student/progress/level/{id} | Level details |
| Skill Detail | /student/progress/skill/{id} | Skill details |
| Milestone Detail | /student/progress/milestone/{id} | Milestone details |
| Achievement History | /student/achievements | Timeline of achievements |
| Video Library | /student/videos | All videos |
| Video Player | /student/videos/{id} | Video playback |
| Video Upload | /student/videos/upload | Upload new video |
| Analysis View | /student/videos/{id}/analysis | Analysis results |
| Goals | /student/goals | Goals list |
| Goal Detail | /student/goals/{id} | Goal details |
| New Goal | /student/goals/new | Create goal |
| Messages | /student/messages | Conversation with coach |
| Blog | /student/blog | Coach's blog posts |
| Blog Post | /student/blog/{slug} | Single blog post |
| Lessons | /student/lessons | Lesson history |
| Coach Profile | /student/coach | Coach information |
| Settings | /student/settings | Account settings |
| Notifications | /student/settings/notifications | Notification preferences |

---

*Document complete. Ready for implementation.*
