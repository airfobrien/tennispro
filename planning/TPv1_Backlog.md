# TennisPro V1 (TPv1) - Feature Backlog

**Document ID:** TPv1-BACKLOG-001
**Version:** 1.4.0
**Created:** 2025-12-07
**Last Updated:** 2025-12-07
**Status:** Living Document
**Author:** Bob O'Brien

---

## Purpose

This document tracks future feature requests and enhancements that are not yet scheduled for implementation. Items here represent validated ideas that will be prioritized and moved to `TPv1_Tasks.md` when ready for development.

---

## Backlog Items

### BL-001: Smashpoint CSV Import

**Priority:** Medium
**Category:** Data Integration
**Requested:** 2025-12-07
**Affects:** Student Portal, Coach Portal

#### Description

Allow students to import match charting data from Smashpoint via CSV file upload. Smashpoint provides detailed match statistics and metrics that can enhance the player's profile and progress tracking.

#### User Stories

1. **As a student**, I want to upload my Smashpoint CSV file(s) so that my match data is tracked in the platform
2. **As a student**, I want to view my imported Smashpoint data visualized in my portal
3. **As a coach**, I want to see my student's Smashpoint data when viewing their profile so I can analyze their match performance

#### Functional Requirements

- [ ] Student can upload single or multiple Smashpoint CSV files
- [ ] System validates CSV format matches expected Smashpoint schema
- [ ] Uploaded data is parsed and stored in database
- [ ] Student portal displays imported match data (visualization TBD)
- [ ] Coach portal shows student's Smashpoint data in student detail view
- [ ] Support for multiple matches/files per student
- [ ] Data deduplication (prevent duplicate imports)

#### Technical Considerations

- CSV parsing library (e.g., papaparse)
- Smashpoint CSV schema documentation needed
- Storage: S3 for raw files, Aurora for parsed data
- Consider background processing for large files (Step Functions)
- Data model for match charting metrics

#### Smashpoint Data Points (To Research)

Common match charting metrics from Smashpoint typically include:
- Winners/Unforced errors by shot type
- First serve %, second serve %
- Points won on serve/return
- Rally length statistics
- Shot placement heatmaps
- Point-by-point data

#### UI/UX Considerations

- Drag-and-drop file upload in student portal
- Progress indicator for file processing
- Match data dashboard/visualization
- Historical match comparison views
- Integration with existing progress tracking

#### Dependencies

- Student Portal (TG-19) - Complete
- File upload infrastructure
- Database schema for match data

#### Open Questions

1. What specific Smashpoint export format(s) do we need to support?
2. What visualizations are most valuable for students and coaches?
3. Should we support other charting apps (e.g., SwingVision, PlaySight)?
4. How to handle data from matches without full charting?

---

### BL-002: Coach Lessons Management

**Priority:** High
**Category:** Core Functionality
**Requested:** 2025-12-07
**Affects:** Coach Portal, Student Portal

#### Description

Implement comprehensive lesson management for coaches, including scheduling, tracking, and a dual-comment system. Coaches need to maintain private notes about students (visible only to themselves) as well as lesson comments that are shared with students.

#### User Stories

1. **As a coach**, I want to schedule lessons with my students so that I can manage my calendar
2. **As a coach**, I want to record private notes about a student so that I can track my observations without the student seeing them
3. **As a coach**, I want to add lesson comments that students can see so that they have a record of what we worked on
4. **As a student**, I want to view my coach's lesson comments so that I can review what we covered and any homework/drills assigned
5. **As a coach**, I want to view my upcoming and past lessons so that I can prepare and track history
6. **As a coach**, I want to link videos to specific lessons so that feedback is contextualized

#### Functional Requirements

**Lesson Management:**
- [ ] Create/edit/delete lessons with student, date/time, duration, location
- [ ] Lesson types: Private, Semi-Private, Group
- [ ] Recurring lesson support (weekly, bi-weekly)
- [ ] Calendar view of lessons
- [ ] Lesson status: Scheduled, Completed, Cancelled, No-Show

**Coach Private Notes (Coach-Only):**
- [ ] Add/edit private notes per student (NOT tied to specific lesson)
- [ ] Private notes visible ONLY to the coach
- [ ] Timestamped entries for note history
- [ ] Rich text support (bullet points, basic formatting)
- [ ] Searchable across all students

**Lesson Comments (Shared with Student):**
- [ ] Add/edit lesson comments for each completed lesson
- [ ] Visible to both coach and student
- [ ] Support for structured feedback: What we worked on, Homework/Drills, Next session focus
- [ ] Student can view in their portal under lesson history
- [ ] Optional: Student can respond/acknowledge

#### Technical Considerations

- Database tables: `lessons`, `coach_private_notes`, `lesson_comments`
- Privacy enforcement: Private notes MUST be filtered server-side, never sent to student endpoints
- Real-time updates via WebSocket for lesson changes
- Consider soft-delete for lessons (maintain history)
- Pagination for lesson history

#### UI/UX Considerations

**Coach Portal:**
- Lessons page with calendar + list view toggle
- Student profile: Tab for private notes (clearly marked as private)
- Lesson detail: Section for shared comments
- Visual distinction between private notes and shared comments (e.g., lock icon, different colors)

**Student Portal:**
- Lesson history with coach's shared comments
- Upcoming lessons display
- No visibility into coach's private notes

#### Dependencies

- Student management (existing)
- Coach dashboard (existing)
- Student Portal (TG-19) - Complete

#### Open Questions

1. Should private notes be per-student or per-lesson (or both)?
2. Do we need lesson templates for common session types?
3. Should students be able to request lessons or only coaches create them?
4. Integration with external calendar (Google Calendar, iCal)?

---

### BL-003: Analytics Panel

**Priority:** Medium
**Category:** Coach Portal
**Requested:** 2025-12-07
**Affects:** Coach Portal

#### Description

Design and implement the Analytics page for the coach portal. Need to determine what metrics and visualizations are most valuable for coaches to track their business and student performance.

#### Things to Think About

- What business metrics matter most? (Revenue, student retention, lesson frequency, etc.)
- Student performance aggregates vs individual tracking
- Time-based trends (weekly, monthly, yearly views)
- Comparison tools (student vs student, period vs period)
- Export capabilities for reports
- Integration with rating systems (UTR/WTN/NTRP trends across roster)
- Video analysis statistics (uploads, analyses completed, common issues identified)
- Lesson completion rates and patterns
- Goal achievement tracking across students

#### Open Questions

1. What are the top 5 metrics coaches care about most?
2. Should analytics be part of higher-tier subscriptions only?
3. How far back should historical data be available?
4. Do coaches want printable/shareable reports?

---

### BL-004: Notifications System

**Priority:** High
**Category:** Core Functionality
**Requested:** 2025-12-07
**Affects:** Student Portal, Coach Portal

#### Description

Implement a complete notifications system for both student and coach portals. Currently, notification icons exist in headers but are not wired up to real data or a notifications page.

#### Current State

- Student header has notification bell with mock data
- Coach dashboard header has notification bell with mock data
- Links to `/student/notifications` and `/notifications` exist but pages may not be implemented
- No backend notification infrastructure

#### Things to Implement

**Student Portal:**
- [ ] Notifications page at `/student/notifications`
- [ ] Real-time notification updates
- [ ] Mark as read/unread functionality
- [ ] Notification types: New video analysis ready, coach message, lesson reminder, goal achieved, milestone reached

**Coach Portal:**
- [ ] Notifications page at `/notifications` (or `/dashboard/notifications`)
- [ ] Real-time notification updates
- [ ] Mark as read/unread functionality
- [ ] Notification types: Student video uploaded, lesson reminder, student goal achieved, new student joined

**Backend:**
- [ ] Notifications database table
- [ ] WebSocket or polling for real-time updates
- [ ] Push notification support (PWA)
- [ ] Email notification preferences

#### Technical Considerations

- Database table: `notifications` (user_id, type, title, message, read, created_at, metadata)
- Consider AWS SNS/SQS for notification dispatch
- WebSocket via API Gateway for real-time
- Batch notifications to prevent spam
- Notification preferences per user

#### Open Questions

1. Which notifications should trigger email vs in-app only?
2. Should coaches be able to send bulk notifications to all students?
3. Notification retention period (auto-delete after X days)?
4. Should notifications be grouped (e.g., "3 new videos uploaded")?

---

### BL-005: Dark/Light Mode Theme Options

**Priority:** Low
**Category:** UI/UX
**Requested:** 2025-12-07
**Affects:** Student Portal, Coach Portal

#### Description

Implement proper dark/light mode theme options in the student and coach portals. Currently have ThemeToggle component in headers but need to verify it's fully wired up and working across all components.

#### Current State

- ThemeToggle component exists in both portal headers
- Grand Slam theme system exists (Australian Open, French Open, Wimbledon, US Open)
- Need to verify dark mode variants work correctly with slam themes
- Some components may not have proper dark mode styling

#### Things to Consider

- Should dark/light be separate from slam themes, or integrated?
- Option 1: Dark/Light toggle independent of slam theme (4 slams × 2 modes = 8 combinations)
- Option 2: Each slam theme has its own light/dark variant built-in
- Option 3: Simple dark/light only, no slam themes in portals (slam themes for marketing site only)
- System preference detection (prefers-color-scheme)
- Persistence of user preference

#### Things to Implement

- [ ] Audit all components for proper dark mode support
- [ ] Ensure ThemeToggle actually changes theme
- [ ] Test all slam themes in both light and dark modes
- [ ] Charts/graphs need dark mode colors (recharts)
- [ ] Form inputs, cards, tables - verify contrast
- [ ] Settings page for theme preferences

#### Open Questions

1. Do users want slam themes in the portals, or just marketing site?
2. Should theme preference sync across devices (store in user profile)?
3. Mobile: respect system dark mode preference?

---

## Backlog Template

```markdown
### BL-XXX: [Feature Name]

**Priority:** High | Medium | Low
**Category:** [Category]
**Requested:** YYYY-MM-DD
**Affects:** [Areas affected]

#### Description
[Brief description of the feature]

#### User Stories
1. As a [user type], I want to [action] so that [benefit]

#### Functional Requirements
- [ ] Requirement 1
- [ ] Requirement 2

#### Technical Considerations
- Technical note 1
- Technical note 2

#### Dependencies
- Dependency 1

#### Open Questions
1. Question 1
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-07 | Initial backlog with BL-001 (Smashpoint CSV Import) |
| 1.1.0 | 2025-12-07 | Added BL-002 (Coach Lessons Management with dual-comment system) |
| 1.2.0 | 2025-12-07 | Added BL-003 (Analytics Panel - placeholder for design thinking) |
| 1.3.0 | 2025-12-07 | Added BL-004 (Notifications System for Student & Coach portals) |
| 1.4.0 | 2025-12-07 | Added BL-005 (Dark/Light Mode Theme Options) |
