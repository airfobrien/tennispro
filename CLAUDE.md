# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TennisPro is a professional tennis coaching platform combining business management with AI-powered biomechanical video analysis. The platform helps tennis coaches manage students, analyze technique through pose estimation, and track progress over time.

## Tech Stack

**Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Konva.js
**Backend:** AWS API Gateway, Lambda (Node.js 20.x), Aurora PostgreSQL Serverless v2, Step Functions
**Auth:** AWS Cognito User Pools + OAuth (Google, Apple)
**Storage:** AWS S3 + CloudFront CDN + signed URLs
**Content Management:** Sanity.io (headless CMS)
**Orchestration:** AWS Step Functions + EventBridge
**AI/ML Processing:** Modal.com (GPU scaling)
**Infrastructure:** AWS CDK (TypeScript)
**State Management:** TanStack Query (server state), Zustand (client state)

## Development Requirements

- **Node.js**: 20.x+ (24.x recommended for development) - Lambda runtime uses Node.js 20.x
- **pnpm**: 10.x (package manager)
- **AWS CLI**: 2.x configured with appropriate credentials
- **Git**: 2.x for version control
- **AWS CDK CLI**: 2.x (`npm install -g aws-cdk`)

## Architecture

**AWS-Native Serverless Architecture** (decision: TPv1-ADR-001)

```
┌─────────────────────────────────────────────────────────────┐
│                      VERCEL (Frontend)                      │
│  Next.js 16 + shadcn/ui + PWA                              │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      SANITY.IO (Content)                    │
│  Marketing + Coach Profiles + i18n (EN/ES/FR/PT)           │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      AWS CORE SERVICES                      │
│  Cognito │ Aurora PostgreSQL │ S3/CloudFront │ API Gateway │
│  Lambda │ Step Functions │ EventBridge │ SES/SNS          │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   MODAL.COM (AI/ML)                         │
│  GPU compute for MediaPipe pose estimation                  │
└─────────────────────────────────────────────────────────────┘
```

### Key Components:

- **Cognito**: User pools for coaches/students, OAuth integration, JWT with custom claims (coach_id, role, tier)
- **Aurora PostgreSQL Serverless v2**: Auto-scaling database (0.5-16 ACUs), RDS Proxy for connection pooling
- **API Gateway**: HTTP + WebSocket APIs, Cognito authorizer, rate limiting
- **Lambda**: Node.js 20.x TypeScript functions, shared layers, per-function IAM
- **S3 + CloudFront**: Multi-bucket strategy with signed URLs for secure video access
- **Step Functions**: Video processing workflows, data sync orchestration
- **EventBridge**: Scheduled tasks (analytics, reports), S3 event routing

## Project Structure

> **Note:** Starting with a simple single-repo structure. Can migrate to Turborepo monorepo later if build performance becomes an issue.

```
tennispro/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── forms/              # Form components
│   │   └── layout/             # Layout components
│   ├── lib/                    # Utilities, hooks, API clients
│   │   ├── api/                # API client functions
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Utility functions
│   │   └── validators/         # Zod schemas
│   └── types/                  # TypeScript type definitions
├── sanity/                     # Sanity Studio (embedded)
│   ├── schemas/                # Content schemas
│   └── lib/                    # Sanity client utilities
├── infrastructure/             # AWS CDK (separate package.json)
│   ├── bin/                    # CDK app entry
│   ├── lib/stacks/             # CDK stacks
│   └── lambda/                 # Lambda function code
├── prisma/                     # Database schema & migrations
├── public/                     # Static assets
└── package.json                # Single package.json
```

## Development Commands

**Project Setup:**
```bash
pnpm install         # Install all dependencies
pnpm dev            # Start Next.js development server
pnpm build          # Build for production
pnpm lint           # Run ESLint
pnpm typecheck      # TypeScript checking
pnpm test           # Run all tests
```

**Sanity Studio:**
```bash
pnpm dev:studio     # Start Sanity Studio development
pnpm build:studio   # Build Sanity Studio
pnpm deploy:studio  # Deploy Studio to Sanity hosting
```

**AWS Infrastructure (CDK):**
```bash
cd infrastructure
pnpm cdk diff       # Compare deployed stack with current state
pnpm cdk deploy     # Deploy to development environment
pnpm cdk synth      # Synthesize CloudFormation templates
```

**Database Operations:**
```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
npx prisma migrate dev # Run database migrations
npx prisma db seed   # Seed database with initial data
npx prisma studio    # Open Prisma Studio
```

**Video Processing (Modal.com):**
```bash
modal deploy         # Deploy video analysis functions
modal logs           # View Modal function logs
```

## Key Workflows

### Video Processing Pipeline
S3 Upload → ValidateVideo → ExtractFrames → PoseEstimation → CalculateAngles → DetectStrokePhases → GenerateMetrics → NotifyUser

### Data Sync Workflows
- ClubAutomation sync (every 4 hours)
- Rating Systems sync (daily 6AM)
- Smashpoint import (CSV upload trigger)
- Daily analytics (daily 2AM)

## Code Architecture

### Lambda Patterns

**Step Function Lambda:**
```typescript
export const handler = async (event: { video_id: string; s3_key: string; }) => {
  // Direct event processing, returns JSON for next step
  return { video_id: event.video_id, result: "..." };
};
```

**API Gateway Lambda:**
```typescript
export const handler: APIGatewayProxyHandler = async (event) => {
  const userId = event.requestContext.authorizer?.claims?.sub;
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  };
};
```

### Frontend Components

**Server Components by default, use `"use client"` only for interactivity**

**Pose Analysis:** Konva.js canvas with draggable MediaPipe landmarks for manual corrections
**Video Player:** Custom player with timeline scrubber and frame-by-frame controls

### Key MediaPipe Landmarks (Tennis Focus)
- Wrists (15/16): Critical for swing path analysis
- Shoulders (11/12): Rotation measurement
- Elbows (13/14): Arm angle tracking
- Hips (23/24): Power generation
- Knees (25/26): Stability and power
- Ankles (27/28): Footwork analysis

## API Structure

Base: `/api/v1`
- `/videos` - Upload, status, management
- `/analysis/{videoId}` - Pose data, corrections, metrics
- `/students` - Student management
- `/lessons` - Scheduling and lesson management
- `/matches` - Match history and statistics

## Database Schema

Key tables: `users`, `coaches`, `students`, `videos`, `pose_analyses`, `landmark_corrections`, `lessons`, `matches`

## Tennis Domain Knowledge

**Stroke Phases:** Preparation → Backswing → Forward Swing → Contact → Follow-through
**Key Metric:** Hip-shoulder separation (power generation measurement)
**Recording Guidelines:** Side view, 3-5m distance, 60fps preferred, stable mount

## Resource Naming

AWS resources follow pattern: `tpp-{env}-{service}-{purpose}`
Examples: `tpp-prod-lambda-validate-video`, `tpp-prod-s3-videos`

## Implementation Status

**Current Phase:** Implementation Ready - Phase 1 (AWS Infrastructure)

All planning documents are complete. Ready to begin 14-week implementation with 21 task groups.

### Implementation Phases

**Phase 1: Foundation MVP (Weeks 1-8)**
- Core platform: AWS infrastructure, authentication, basic video processing
- **Must-Have:** Full Player Development Framework, Student Portal, Messaging
- **Key Features:** Coach-student management, progression tracking, AI video analysis
- **Deliverable:** Working platform for 5-10 beta coaches

**Phase 2: Enhanced Analysis (Weeks 9-12)**
- Advanced video analysis, AI coaching insights, comparison views
- **Key Features:** Skeleton correction, detailed metrics, goal tracking
- **Integrations:** Basic external service connections

**Phase 3: Business Tools (Weeks 13-14)**
- Payment processing (Stripe Connect), advanced scheduling
- **Integrations:** ClubAutomation, UTR/USTA ratings, Smashpoint
- **Focus:** Coach business growth and operational efficiency

### Success Metrics (6-Month Targets)
- 25 paying coaches with 90%+ monthly retention (post Month 3)
- $1,000 MRR across three subscription tiers ($49/$99/$199)
- Students: 10+ active students per coach, 2+ video uploads per month

## Git Workflow (CRITICAL)

**See: `docs/GIT_WORKFLOW.md` for full documentation**

### Branch Flow
```
feature/* → staging → master (production)
```

### Rules
1. **Feature branches**: Always branch FROM staging, merge TO staging
2. **Staging**: Testing environment - all features land here first
3. **Master**: Production - only receives merges FROM staging when tested
4. **Never merge directly to master** - always go through staging

### Claude Code Checklist
- [ ] New feature? Branch from staging: `git checkout staging && git pull && git checkout -b feature/TG-XX-name`
- [ ] Feature done? PR targets staging (not master)
- [ ] Ready for production? Merge staging → master
- [ ] After production release? staging and master should match

## Important Files

**Planning Documents (All Complete):**
- `planning/TPv1_Plan.md` - Complete product roadmap and business plan (v1.3.0)
- `planning/TPv1_Requirements.md` - Detailed functional requirements for Marketing Site + Coach Portal (v1.0.0)
- `planning/TPv1_Requirements_StudentPortal.md` - Complete Student Portal requirements (v1.0.0)
- `planning/TPv1_UseCases.md` - Use case scenarios for all actors (45+ use cases) (v1.1.0)
- `planning/TPv1_ADR_001_Backend_Infrastructure.md` - AWS architecture decision record (v1.0.0)
- `planning/TPv1_Tasks.md` - Implementation task breakdown with 21 task groups (v2.0.0)

**Legacy References:**
- `TennisProPlus_PROJECT_PLAN.md` - Original project specification
- `TennisProPlus_CLAUDE.md` - Original detailed reference

**Key Implementation Order:**
1. Read `TPv1_Tasks.md` for detailed task breakdown and dependencies
2. Reference `TPv1_ADR_001_Backend_Infrastructure.md` for AWS implementation patterns  
3. Use `TPv1_Requirements*.md` files for feature specifications
4. Consult `TPv1_UseCases.md` for user journey validation

## Key Development Patterns

### Multi-Tenancy & Data Isolation

Every request must enforce coach-level data isolation:

```typescript
// Lambda handler pattern - extract coach_id from Cognito JWT
export const handler: APIGatewayProxyHandler = async (event) => {
  const coachId = event.requestContext.authorizer?.claims['custom:coach_id'];
  
  // ALL database queries MUST filter by coach_id
  const students = await prisma.student.findMany({
    where: { coachId } // Required on every query
  });
  
  return response(students);
};
```

### S3 Storage Structure

```
tennispro-videos-{env}/
├── coaches/
│   ├── {coach_id}/
│   │   ├── students/
│   │   │   ├── {student_id}/
│   │   │   │   ├── videos/
│   │   │   │   └── analyses/
│   │   └── exports/
└── system/
    └── templates/
```

### Step Functions Workflow Pattern

```typescript
// Video processing workflow
export const videoProcessingDefinition = {
  Comment: "Process uploaded tennis video",
  StartAt: "ValidateVideo",
  States: {
    ValidateVideo: {
      Type: "Task",
      Resource: lambdaArn("validate-video"),
      Next: "ExtractFrames"
    },
    ExtractFrames: {
      Type: "Task", 
      Resource: modalApiArn("extract-frames"),
      Next: "PoseEstimation"
    },
    // ... additional states
  }
};
```

### Progressive Web App (PWA) Requirements

- **Mobile-first design:** All UI components must work on touch devices
- **Offline capability:** Core features available without internet
- **Installation:** Add-to-homescreen prompts for coach and student apps
- **Background sync:** Video uploads continue when app is backgrounded

### Tennis Domain Types

```typescript
// Core tennis domain models
export interface ProgressionPath {
  id: string;
  coachId: string;
  name: string;
  playerCategory: PlayerCategory;
  levels: Level[];
}

export enum PlayerCategory {
  RECREATIONAL = 'recreational',
  COMPETITIVE_JUNIOR = 'competitive_junior', 
  COLLEGIATE_TRACK = 'collegiate_track',
  PROFESSIONAL_TRACK = 'professional_track',
  SENIOR = 'senior'
}

export enum StrokeType {
  SERVE = 'serve',
  FOREHAND = 'forehand',
  BACKHAND = 'backhand',
  VOLLEY = 'volley',
  OVERHEAD = 'overhead',
  MOVEMENT = 'movement'
}
```

### Video Analysis Integration

```typescript
// Modal.com integration for AI analysis
export async function requestAnalysis(videoS3Key: string, strokeType: StrokeType) {
  const modalRequest = {
    video_url: await getSignedUrl(videoS3Key),
    stroke_type: strokeType,
    output_bucket: `tennispro-processed-${env}`,
    webhook_url: `${apiBaseUrl}/webhooks/analysis-complete`
  };
  
  return await modal.functions.call("analyze_tennis_video", modalRequest);
}
```

### Sanity CMS Integration

```typescript
// Content fetching pattern for coach profiles
export async function getCoachProfile(slug: string) {
  const query = `*[_type == "coachProfile" && slug.current == $slug][0]{
    name,
    bio,
    photo,
    credentials,
    services[]{
      name,
      description,
      duration,
      price
    }
  }`;
  
  return await sanityClient.fetch(query, { slug });
}
```

### Grand Slam Theme System

The application uses a unique theming system based on the four Grand Slam tennis tournaments instead of traditional light/dark mode:

| Tournament | ID | Primary Color | Background |
|------------|-----|---------------|------------|
| Australian Open | `australian-open` | #377DB8 (True Blue) | Light blue tint |
| French Open | `french-open` | #B24E3A (Red Clay) | Warm cream |
| Wimbledon | `wimbledon` | #6C8E48 (Grass Green) | Crisp white |
| US Open | `us-open` | #3C638E (Blue) | Cool blue-gray |

**Implementation:**
- Themes defined in `src/app/globals.css` using CSS custom properties (oklch format)
- Theme selection via `SlamSwitcher` component in the header
- Applied via `data-slam` attribute on `<html>` element
- Persisted in `localStorage` under key `slam-theme`
- Default theme: Australian Open

**Usage:**
```typescript
// To programmatically change theme:
document.documentElement.setAttribute('data-slam', 'french-open');
localStorage.setItem('slam-theme', 'french-open');
```