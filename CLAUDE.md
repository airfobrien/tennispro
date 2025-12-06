# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TennisProPlus is a professional tennis coaching platform combining business management with AI-powered biomechanical video analysis. The platform helps tennis coaches manage students, analyze technique through pose estimation, and track progress over time.

## Tech Stack

**Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Konva.js
**Backend:** AWS API Gateway, Lambda (Node.js 20.x), Aurora PostgreSQL Serverless v2, Step Functions
**Auth:** AWS Cognito User Pools + OAuth (Google, Apple)
**Storage:** AWS S3 + CloudFront CDN + signed URLs
**Content Management:** Sanity.io (headless CMS)
**Orchestration:** AWS Step Functions + EventBridge
**AI/ML Processing:** Modal.com (GPU scaling)
**Infrastructure:** AWS CDK (TypeScript)
**State Management:** TanStack Query (server state), Zustand (client state)

## Architecture

**AWS-Native Serverless Architecture** (decision: TPv1-ADR-001)

```
┌─────────────────────────────────────────────────────────────┐
│                      VERCEL (Frontend)                      │
│  Next.js 14 + shadcn/ui + PWA                              │
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

## Development Commands

**Project Setup (Monorepo with pnpm):**
```bash
pnpm install         # Install all dependencies
pnpm dev            # Start all development servers
pnpm build          # Build all packages
pnpm lint           # Run ESLint across workspace
pnpm typecheck      # TypeScript checking across workspace
pnpm test           # Run all tests
```

**Frontend (Next.js):**
```bash
pnpm dev:web        # Start Next.js development server
pnpm build:web      # Build Next.js for production
pnpm start:web      # Start production build locally
```

**Sanity Studio:**
```bash
pnpm dev:studio     # Start Sanity Studio development
pnpm build:studio   # Build Sanity Studio
pnpm deploy:studio  # Deploy Studio to Sanity hosting
```

**AWS Infrastructure (CDK):**
```bash
pnpm cdk:diff       # Compare deployed stack with current state
pnpm cdk:deploy     # Deploy to development environment
pnpm cdk:deploy:prod # Deploy to production environment
pnpm cdk:destroy    # Destroy development stack
pnpm cdk:synth      # Synthesize CloudFormation templates
```

**Database Operations:**
```bash
pnpm db:generate    # Generate Prisma client
pnpm db:push        # Push schema changes to database
pnpm db:migrate     # Run database migrations
pnpm db:seed        # Seed database with initial data
pnpm db:reset       # Reset database and apply migrations
pnpm db:studio      # Open Prisma Studio
```

**Video Processing (Modal.com):**
```bash
pnpm modal:deploy   # Deploy video analysis functions
pnpm modal:logs     # View Modal function logs
pnpm modal:shell    # Interactive Modal shell
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