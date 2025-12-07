# TennisPro V1 (TPv1) - Feature Backlog

**Document ID:** TPv1-BACKLOG-001
**Version:** 1.0.0
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
