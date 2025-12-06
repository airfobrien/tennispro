# TennisPro V1 (TPv1) - Implementation Task List

**Document ID:** TPv1-TASKS-001  
**Version:** 2.0.0  
**Created:** 2025-12-06T17:45:00Z  
**Last Updated:** 2025-12-06T19:45:00Z  
**Status:** 📋 Ready for Implementation  
**Author:** Bob O'Brien  
**Target Agent:** Claude Code (Opus 4.5)  

---

## Document Hierarchy

```
TPv1_Plan.md ✅ COMPLETE (v1.3.0)
TPv1_ADR_001_Backend_Infrastructure.md ✅ DECIDED (AWS Native)
TPv1_Requirements.md ✅ COMPLETE (v1.0.0)
TPv1_Requirements_StudentPortal.md ✅ COMPLETE (v1.0.0)
TPv1_UseCases.md ✅ COMPLETE (v1.0.0)
TPv1_Tasks.md (this document) 📋 IMPLEMENTATION GUIDE
```

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2025-12-06 | Added TG-19 (Student Portal), TG-20 (Student Goals), TG-21 (Messaging System); Updated TG-07, TG-13, TG-15 for new features; Extended implementation timeline to 14 weeks |
| 1.0.0 | 2025-12-06 | Initial task list with 18 task groups |

---

## Implementation Overview

### Technology Stack Summary

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js (App Router) | 14.x |
| UI Components | shadcn/ui | Latest |
| Styling | Tailwind CSS | 3.x |
| Content CMS | Sanity.io | 3.x |
| Auth | AWS Cognito | - |
| Database | Aurora PostgreSQL Serverless v2 | PostgreSQL 15 |
| API | AWS API Gateway + Lambda | Node.js 20.x |
| Storage | AWS S3 + CloudFront | - |
| Orchestration | AWS Step Functions | - |
| Infrastructure | AWS CDK | 2.x |
| Language | TypeScript | 5.x |
| Package Manager | pnpm | 8.x |

### Project Structure

```
tennispro/
├── apps/
│   ├── web/                    # Next.js application (Vercel)
│   │   ├── app/                # App Router pages
│   │   ├── components/         # React components
│   │   ├── lib/                # Utilities, hooks, API clients
│   │   └── ...
│   └── studio/                 # Sanity Studio
│       ├── schemas/            # Content schemas
│       └── ...
├── packages/
│   ├── shared/                 # Shared types, utilities
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Shared utilities
│   │   └── validators/         # Zod schemas
│   ├── db/                     # Database schema, migrations
│   │   ├── schema/             # Prisma or Drizzle schema
│   │   ├── migrations/         # SQL migrations
│   │   └── seed/               # Seed data
│   └── ui/                     # Shared UI components (if needed)
├── infrastructure/             # AWS CDK
│   ├── bin/                    # CDK app entry
│   ├── lib/
│   │   ├── stacks/             # CDK stacks
│   │   └── constructs/         # Reusable constructs
│   └── lambda/                 # Lambda function code
│       ├── api/                # API handlers
│       ├── triggers/           # Event triggers
│       └── shared/             # Shared Lambda utilities
├── docs/                       # Documentation
├── scripts/                    # Build/deploy scripts
├── turbo.json                  # Turborepo config
├── pnpm-workspace.yaml         # pnpm workspace
└── package.json                # Root package.json
```

---

## Task Group Index

| ID | Group | Description | Dependencies | Est. Effort |
|----|-------|-------------|--------------|-------------|
| TG-01 | Project Foundation | Monorepo, tooling, shared packages | None | 4-6 hours |
| TG-02 | AWS Infrastructure | CDK stacks, base resources | TG-01 | 8-12 hours |
| TG-03 | Database Schema | Aurora PostgreSQL, Prisma/Drizzle | TG-02 | 6-8 hours |
| TG-04 | Authentication | Cognito setup, JWT handling | TG-02 | 6-8 hours |
| TG-05 | API Layer | API Gateway, Lambda handlers | TG-02, TG-03, TG-04 | 12-16 hours |
| TG-06 | Storage & CDN | S3 buckets, CloudFront, presigned URLs | TG-02 | 4-6 hours |
| TG-07 | Sanity CMS | Schemas, studio, content types, **coach blog** | TG-01 | 8-10 hours |
| TG-08 | Next.js Foundation | App setup, layouts, auth integration | TG-01, TG-04 | 8-10 hours |
| TG-09 | Marketing Site | Public pages, SEO, i18n | TG-07, TG-08 | 10-14 hours |
| TG-10 | Coach Portal - Core | Dashboard, navigation, settings | TG-05, TG-08 | 10-14 hours |
| TG-11 | Student Management | CRUD, profiles, lists | TG-10 | 8-10 hours |
| TG-12 | Progression Framework | Paths, levels, skills, milestones | TG-10, TG-11 | 12-16 hours |
| TG-13 | Video Management | Upload (coach + student), playback, library | TG-06, TG-10 | 12-16 hours |
| TG-14 | Video Analysis | Step Functions, Modal integration | TG-13 | 12-16 hours |
| TG-15 | Coach Public Pages | Profile pages, SEO, student signup, **blog** | TG-07, TG-09 | 10-12 hours |
| TG-16 | Notifications | Email (SES), push (SNS), in-app | TG-05 | 6-8 hours |
| TG-17 | Analytics Integration | Plausible, PostHog setup | TG-08 | 2-4 hours |
| TG-18 | Testing & QA | Unit, integration, E2E tests | All | Ongoing |
| **TG-19** | **Student Portal** | Dashboard, progress view, video library, content | TG-08, TG-12, TG-13 | **14-18 hours** |
| **TG-20** | **Student Goals** | Goals CRUD, coach visibility, notifications | TG-19 | **6-8 hours** |
| **TG-21** | **Messaging System** | Conversations, messages, real-time, notifications | TG-05, TG-10, TG-19 | **10-12 hours** |

---

# TG-01: Project Foundation

## Objective
Set up monorepo with Turborepo, configure tooling, create shared packages.

## Prerequisites
- Node.js 20.x installed
- pnpm 8.x installed
- AWS CLI configured
- Git repository initialized

## Tasks

### TG-01-001: Initialize Monorepo

**Description:** Create Turborepo monorepo with pnpm workspaces.

**Commands:**
```bash
pnpm dlx create-turbo@latest tennispro --package-manager pnpm
cd tennispro
```

**Files to create/modify:**

`pnpm-workspace.yaml`:
```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "infrastructure"
```

`turbo.json`:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**", "cdk.out/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"]
    },
    "deploy": {
      "dependsOn": ["build", "test"]
    }
  }
}
```

**Acceptance Criteria:**
- [ ] `pnpm install` runs without errors
- [ ] `pnpm build` runs (even if apps are empty)
- [ ] Workspace packages resolve correctly

---

### TG-01-002: Configure TypeScript

**Description:** Set up TypeScript with strict mode, path aliases, shared config.

**Files to create:**

`tsconfig.base.json` (root):
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "incremental": true
  },
  "exclude": ["node_modules"]
}
```

**Acceptance Criteria:**
- [ ] All packages extend base config
- [ ] Path aliases work across packages
- [ ] No TypeScript errors in empty project

---

### TG-01-003: Configure ESLint and Prettier

**Description:** Set up consistent code formatting and linting.

**Dependencies to install (root):**
```bash
pnpm add -Dw eslint prettier eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import
```

**Files to create:**

`.eslintrc.js`:
```javascript
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      'alphabetize': { order: 'asc' }
    }]
  },
  ignorePatterns: ['node_modules', 'dist', '.next', 'cdk.out']
};
```

`.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

**Acceptance Criteria:**
- [ ] `pnpm lint` runs across all packages
- [ ] `pnpm format` formats all files
- [ ] Pre-commit hooks work (optional: set up husky)

---

### TG-01-004: Create Shared Types Package

**Description:** Create `@tennispro/shared` package for shared TypeScript types.

**Directory:** `packages/shared/`

**Files to create:**

`packages/shared/package.json`:
```json
{
  "name": "@tennispro/shared",
  "version": "0.0.1",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

`packages/shared/src/types/index.ts`:
```typescript
// Coach types
export interface Coach {
  id: string;
  cognitoUserId: string;
  email: string;
  name: string;
  slug: string;
  tier: SubscriptionTier;
  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionTier = 'starter' | 'professional' | 'enterprise';

// Student types
export interface Student {
  id: string;
  coachId: string;
  name: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  playerCategory: PlayerCategory;
  currentPathId?: string;
  currentLevelId?: string;
  status: StudentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type PlayerCategory = 
  | 'recreational'
  | 'competitive_junior'
  | 'collegiate_track'
  | 'professional_track'
  | 'senior';

export type StudentStatus = 'active' | 'inactive' | 'archived';

// Progression types
export interface ProgressionPath {
  id: string;
  coachId: string;
  name: string;
  description?: string;
  playerCategory: PlayerCategory;
  isTemplate: boolean;
  templateSource?: 'uspta' | 'ptr' | 'custom';
  createdAt: Date;
  updatedAt: Date;
}

export interface Level {
  id: string;
  pathId: string;
  name: string;
  description?: string;
  order: number;
  createdAt: Date;
}

export interface Skill {
  id: string;
  levelId: string;
  name: string;
  description?: string;
  category: SkillCategory;
  order: number;
  createdAt: Date;
}

export type SkillCategory = 
  | 'serve'
  | 'forehand'
  | 'backhand'
  | 'volley'
  | 'overhead'
  | 'movement'
  | 'strategy'
  | 'mental';

export interface Milestone {
  id: string;
  skillId: string;
  name: string;
  description?: string;
  targetMetrics?: TargetMetric[];
  order: number;
  createdAt: Date;
}

export interface TargetMetric {
  metricKey: string;
  operator: 'gte' | 'lte' | 'between' | 'equals';
  value: number;
  maxValue?: number; // For 'between' operator
  unit?: string;
}

// Progress tracking
export interface StudentProgress {
  id: string;
  studentId: string;
  milestoneId: string;
  status: ProgressStatus;
  achievedAt?: Date;
  validationMethod?: ValidationMethod;
  validationVideoId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProgressStatus = 'not_started' | 'in_progress' | 'achieved';
export type ValidationMethod = 'coach_assessment' | 'ai_validation' | 'match_result';

// Video upload types
export type VideoUploadedBy = 'coach' | 'student';

// Video types
export interface Video {
  id: string;
  coachId: string;
  studentId: string;
  title?: string;
  s3Key: string;
  s3Bucket: string;
  duration?: number;
  strokeType?: StrokeType;
  recordedAt?: Date;
  status: VideoStatus;
  uploadedBy: VideoUploadedBy;
  studentNotes?: string; // Notes from student on upload
  createdAt: Date;
  updatedAt: Date;
}

export type StrokeType = 
  | 'serve'
  | 'forehand'
  | 'backhand_1h'
  | 'backhand_2h'
  | 'volley'
  | 'overhead'
  | 'movement'
  | 'rally'
  | 'match';

export type VideoStatus = 'uploading' | 'uploaded' | 'processing' | 'analyzed' | 'failed';

// Analysis types
export interface Analysis {
  id: string;
  videoId: string;
  coachId: string;
  studentId: string;
  strokeType: StrokeType;
  status: AnalysisStatus;
  metrics?: Record<string, AnalysisMetric>;
  skeletonData?: SkeletonFrame[];
  insights?: string[];
  processedAt?: Date;
  createdAt: Date;
}

export type AnalysisStatus = 'pending' | 'processing' | 'complete' | 'failed';

export interface AnalysisMetric {
  key: string;
  name: string;
  value: number;
  unit: string;
  frameIndex?: number;
}

export interface SkeletonFrame {
  frameIndex: number;
  timestamp: number;
  landmarks: Landmark[];
}

export interface Landmark {
  name: string;
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

// Lesson types
export interface Lesson {
  id: string;
  coachId: string;
  studentId: string;
  date: Date;
  duration: number; // minutes
  type: LessonType;
  location?: string;
  notes?: string;
  skillsWorked?: string[];
  videoIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type LessonType = 'private' | 'semi_private' | 'group' | 'clinic';

// Student Goal types
export interface StudentGoal {
  id: string;
  studentId: string;
  title: string;
  description?: string;
  category: GoalCategory;
  targetDate?: Date;
  status: GoalStatus;
  coachNotes?: string;
  linkedMilestoneId?: string;
  createdAt: Date;
  updatedAt: Date;
  achievedAt?: Date;
}

export type GoalCategory = 
  | 'skill_improvement'
  | 'competition'
  | 'rating'
  | 'fitness'
  | 'custom';

export type GoalStatus = 'in_progress' | 'achieved' | 'paused' | 'abandoned';

// Messaging types
export interface Conversation {
  id: string;
  coachId: string;
  studentId: string;
  lastMessageAt?: Date;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: SenderType;
  content: string;
  attachments?: MessageAttachment[];
  readAt?: Date;
  createdAt: Date;
}

export type SenderType = 'coach' | 'student';

export interface MessageAttachment {
  type: 'image' | 'link';
  url: string;
  name?: string;
  previewUrl?: string;
}

// API types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  pagination?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

`packages/shared/src/index.ts`:
```typescript
export * from './types';
```

**Acceptance Criteria:**
- [ ] Package builds without errors
- [ ] Types can be imported in other packages
- [ ] All core entities have type definitions

---

### TG-01-005: Create Validators Package

**Description:** Create Zod schemas for runtime validation.

**Dependencies:**
```bash
cd packages/shared
pnpm add zod
```

**Files to create:**

`packages/shared/src/validators/index.ts`:
```typescript
import { z } from 'zod';

// Enums
export const subscriptionTierSchema = z.enum(['starter', 'professional', 'enterprise']);
export const playerCategorySchema = z.enum([
  'recreational',
  'competitive_junior',
  'collegiate_track',
  'professional_track',
  'senior'
]);
export const studentStatusSchema = z.enum(['active', 'inactive', 'archived']);
export const strokeTypeSchema = z.enum([
  'serve',
  'forehand',
  'backhand_1h',
  'backhand_2h',
  'volley',
  'overhead',
  'movement',
  'rally',
  'match'
]);
export const skillCategorySchema = z.enum([
  'serve',
  'forehand',
  'backhand',
  'volley',
  'overhead',
  'movement',
  'strategy',
  'mental'
]);

// Create/Update schemas
export const createStudentSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  playerCategory: playerCategorySchema,
  notes: z.string().max(1000).optional()
});

export const updateStudentSchema = createStudentSchema.partial();

export const createProgressionPathSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  playerCategory: playerCategorySchema,
  templateSource: z.enum(['uspta', 'ptr', 'custom']).optional()
});

export const createLevelSchema = z.object({
  pathId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  order: z.number().int().min(0)
});

export const createSkillSchema = z.object({
  levelId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: skillCategorySchema,
  order: z.number().int().min(0)
});

export const createMilestoneSchema = z.object({
  skillId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  targetMetrics: z.array(z.object({
    metricKey: z.string(),
    operator: z.enum(['gte', 'lte', 'between', 'equals']),
    value: z.number(),
    maxValue: z.number().optional(),
    unit: z.string().optional()
  })).optional(),
  order: z.number().int().min(0)
});

export const updateProgressSchema = z.object({
  milestoneId: z.string().uuid(),
  status: z.enum(['not_started', 'in_progress', 'achieved']),
  validationMethod: z.enum(['coach_assessment', 'ai_validation', 'match_result']).optional(),
  validationVideoId: z.string().uuid().optional(),
  notes: z.string().max(1000).optional()
});

export const createLessonSchema = z.object({
  studentId: z.string().uuid(),
  date: z.string().datetime(),
  duration: z.number().int().min(15).max(480),
  type: z.enum(['private', 'semi_private', 'group', 'clinic']),
  location: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
  skillsWorked: z.array(z.string()).optional(),
  videoIds: z.array(z.string().uuid()).optional()
});

export const requestVideoUploadSchema = z.object({
  studentId: z.string().uuid(),
  filename: z.string(),
  contentType: z.string(),
  strokeType: strokeTypeSchema.optional()
});

export const requestAnalysisSchema = z.object({
  videoId: z.string().uuid(),
  strokeType: strokeTypeSchema,
  focusAreas: z.array(z.string()).optional()
});

// Pagination
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// Type exports from schemas
export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type CreateProgressionPathInput = z.infer<typeof createProgressionPathSchema>;
export type CreateLevelInput = z.infer<typeof createLevelSchema>;
export type CreateSkillInput = z.infer<typeof createSkillSchema>;
export type CreateMilestoneInput = z.infer<typeof createMilestoneSchema>;
export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type RequestVideoUploadInput = z.infer<typeof requestVideoUploadSchema>;
export type RequestAnalysisInput = z.infer<typeof requestAnalysisSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
```

**Acceptance Criteria:**
- [ ] All input schemas validate correctly
- [ ] Type inference works from schemas
- [ ] Validation errors are descriptive

---

### TG-01-006: Set Up Environment Configuration

**Description:** Create environment variable handling with type safety.

**Files to create:**

`packages/shared/src/config/env.ts`:
```typescript
import { z } from 'zod';

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // AWS
  AWS_REGION: z.string().default('us-east-1'),
  AWS_ACCOUNT_ID: z.string().optional(),
  
  // Cognito
  COGNITO_USER_POOL_ID: z.string().optional(),
  COGNITO_CLIENT_ID: z.string().optional(),
  
  // Database
  DATABASE_URL: z.string().optional(),
  
  // S3
  S3_BUCKET_VIDEOS: z.string().optional(),
  S3_BUCKET_ASSETS: z.string().optional(),
  CLOUDFRONT_DOMAIN: z.string().optional(),
  CLOUDFRONT_KEY_PAIR_ID: z.string().optional(),
  
  // Sanity
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
  SANITY_API_TOKEN: z.string().optional(),
  
  // Modal
  MODAL_TOKEN_ID: z.string().optional(),
  MODAL_TOKEN_SECRET: z.string().optional(),
  
  // Analytics
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  
  // App URLs
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }
  
  return parsed.data;
}

// For client-side (only NEXT_PUBLIC_ vars)
export function getPublicEnv() {
  return {
    sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  };
}
```

`.env.example` (root):
```bash
# App
NODE_ENV=development

# AWS
AWS_REGION=us-east-1
AWS_ACCOUNT_ID=

# Cognito
COGNITO_USER_POOL_ID=
COGNITO_CLIENT_ID=

# Database
DATABASE_URL=

# S3/CloudFront
S3_BUCKET_VIDEOS=
S3_BUCKET_ASSETS=
CLOUDFRONT_DOMAIN=
CLOUDFRONT_KEY_PAIR_ID=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Modal
MODAL_TOKEN_ID=
MODAL_TOKEN_SECRET=

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
NEXT_PUBLIC_POSTHOG_KEY=

# URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Acceptance Criteria:**
- [ ] Environment validation catches missing required vars
- [ ] Type-safe access to environment variables
- [ ] `.env.example` documents all variables

---

# TG-02: AWS Infrastructure (CDK)

## Objective
Set up AWS CDK project with all required stacks for TennisPro.

## Prerequisites
- TG-01 complete
- AWS CLI configured with appropriate credentials
- AWS CDK CLI installed (`npm install -g aws-cdk`)

## Tasks

### TG-02-001: Initialize CDK Project

**Description:** Create AWS CDK TypeScript project within monorepo.

**Directory:** `infrastructure/`

**Commands:**
```bash
mkdir infrastructure
cd infrastructure
cdk init app --language typescript
```

**Files to modify:**

`infrastructure/package.json`:
```json
{
  "name": "@tennispro/infrastructure",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "build": "tsc",
    "watch": "tsc -w",
    "cdk": "cdk",
    "deploy": "cdk deploy --all",
    "deploy:dev": "cdk deploy --all -c environment=dev",
    "deploy:prod": "cdk deploy --all -c environment=prod",
    "diff": "cdk diff",
    "synth": "cdk synth"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "aws-cdk": "^2.115.0",
    "typescript": "^5.3.0"
  },
  "dependencies": {
    "aws-cdk-lib": "^2.115.0",
    "constructs": "^10.3.0"
  }
}
```

`infrastructure/cdk.json`:
```json
{
  "app": "npx ts-node --prefer-ts-exts bin/tennispro.ts",
  "watch": {
    "include": ["**"],
    "exclude": [
      "README.md",
      "cdk*.json",
      "**/*.d.ts",
      "**/*.js",
      "tsconfig.json",
      "package*.json",
      "node_modules",
      "cdk.out"
    ]
  },
  "context": {
    "@aws-cdk/aws-lambda:recognizeLayerVersion": true,
    "@aws-cdk/core:checkSecretUsage": true,
    "@aws-cdk/core:target-partitions": ["aws"],
    "environments": {
      "dev": {
        "account": "YOUR_AWS_ACCOUNT_ID",
        "region": "us-east-1",
        "domainName": "dev.tennispro.com"
      },
      "prod": {
        "account": "YOUR_AWS_ACCOUNT_ID",
        "region": "us-east-1",
        "domainName": "tennispro.com"
      }
    }
  }
}
```

**Acceptance Criteria:**
- [ ] `cdk synth` runs without errors
- [ ] Environment configuration loads correctly
- [ ] CDK bootstrap complete for target account/region

---

### TG-02-002: Create Base Stack with VPC

**Description:** Create foundational VPC and networking stack.

**File:** `infrastructure/lib/stacks/network-stack.ts`

```typescript
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface NetworkStackProps extends cdk.StackProps {
  environment: string;
}

export class NetworkStack extends cdk.Stack {
  public readonly vpc: ec2.IVpc;

  constructor(scope: Construct, id: string, props: NetworkStackProps) {
    super(scope, id, props);

    // For dev, use default VPC to save costs
    // For prod, create dedicated VPC
    if (props.environment === 'prod') {
      this.vpc = new ec2.Vpc(this, 'TennisProVpc', {
        maxAzs: 2,
        natGateways: 1,
        subnetConfiguration: [
          {
            name: 'Public',
            subnetType: ec2.SubnetType.PUBLIC,
            cidrMask: 24,
          },
          {
            name: 'Private',
            subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
            cidrMask: 24,
          },
          {
            name: 'Isolated',
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            cidrMask: 24,
          },
        ],
      });
    } else {
      // Use default VPC for dev
      this.vpc = ec2.Vpc.fromLookup(this, 'DefaultVpc', {
        isDefault: true,
      });
    }

    // Output VPC ID
    new cdk.CfnOutput(this, 'VpcId', {
      value: this.vpc.vpcId,
      exportName: `${props.environment}-TennisProVpcId`,
    });
  }
}
```

**Acceptance Criteria:**
- [ ] VPC created/referenced successfully
- [ ] Subnets configured for Aurora and Lambda
- [ ] Outputs exported for other stacks

---

### TG-02-003: Create Cognito Auth Stack

**Description:** Set up Cognito User Pools for coach and student authentication.

**File:** `infrastructure/lib/stacks/auth-stack.ts`

```typescript
import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export interface AuthStackProps extends cdk.StackProps {
  environment: string;
  domainPrefix: string;
  callbackUrls: string[];
  logoutUrls: string[];
}

export class AuthStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;
  public readonly userPoolDomain: cognito.UserPoolDomain;

  constructor(scope: Construct, id: string, props: AuthStackProps) {
    super(scope, id, props);

    // User Pool
    this.userPool = new cognito.UserPool(this, 'TennisProUserPool', {
      userPoolName: `tennispro-${props.environment}`,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        fullname: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        coach_id: new cognito.StringAttribute({ mutable: true }),
        role: new cognito.StringAttribute({ mutable: true }),
        tier: new cognito.StringAttribute({ mutable: true }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: props.environment === 'prod' 
        ? cdk.RemovalPolicy.RETAIN 
        : cdk.RemovalPolicy.DESTROY,
    });

    // User Pool Domain
    this.userPoolDomain = this.userPool.addDomain('Domain', {
      cognitoDomain: {
        domainPrefix: props.domainPrefix,
      },
    });

    // App Client
    this.userPoolClient = this.userPool.addClient('WebClient', {
      userPoolClientName: `tennispro-web-${props.environment}`,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: props.callbackUrls,
        logoutUrls: props.logoutUrls,
      },
      generateSecret: false,
      preventUserExistenceErrors: true,
      accessTokenValidity: cdk.Duration.hours(1),
      idTokenValidity: cdk.Duration.hours(1),
      refreshTokenValidity: cdk.Duration.days(30),
    });

    // Google Identity Provider (optional - configure later)
    // this.userPool.registerIdentityProvider(
    //   new cognito.UserPoolIdentityProviderGoogle(this, 'Google', {
    //     userPool: this.userPool,
    //     clientId: 'GOOGLE_CLIENT_ID',
    //     clientSecretValue: cdk.SecretValue.secretsManager('google-oauth-secret'),
    //     scopes: ['email', 'profile'],
    //     attributeMapping: {
    //       email: cognito.ProviderAttribute.GOOGLE_EMAIL,
    //       fullname: cognito.ProviderAttribute.GOOGLE_NAME,
    //     },
    //   })
    // );

    // Lambda trigger for post-confirmation (create coach record)
    // Will be added after Lambda stack is created

    // Outputs
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
      exportName: `${props.environment}-TennisProUserPoolId`,
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
      exportName: `${props.environment}-TennisProUserPoolClientId`,
    });

    new cdk.CfnOutput(this, 'UserPoolDomain', {
      value: this.userPoolDomain.domainName,
      exportName: `${props.environment}-TennisProUserPoolDomain`,
    });
  }
}
```

**Acceptance Criteria:**
- [ ] User Pool created with email sign-in
- [ ] Custom attributes for coach_id, role, tier
- [ ] App client configured for web app
- [ ] Domain prefix set up for hosted UI

---

### TG-02-004: Create Database Stack

**Description:** Set up Aurora PostgreSQL Serverless v2 with RDS Proxy.

**File:** `infrastructure/lib/stacks/database-stack.ts`

```typescript
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface DatabaseStackProps extends cdk.StackProps {
  environment: string;
  vpc: ec2.IVpc;
}

export class DatabaseStack extends cdk.Stack {
  public readonly cluster: rds.DatabaseCluster;
  public readonly proxy: rds.DatabaseProxy;
  public readonly secret: secretsmanager.ISecret;
  public readonly securityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    // Security Group for Aurora
    this.securityGroup = new ec2.SecurityGroup(this, 'AuroraSecurityGroup', {
      vpc: props.vpc,
      description: 'Security group for Aurora PostgreSQL',
      allowAllOutbound: true,
    });

    // Aurora Serverless v2 Cluster
    this.cluster = new rds.DatabaseCluster(this, 'TennisProCluster', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_15_4,
      }),
      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: props.environment === 'prod' ? 16 : 4,
      writer: rds.ClusterInstance.serverlessV2('Writer', {
        publiclyAccessible: false,
      }),
      readers: props.environment === 'prod' ? [
        rds.ClusterInstance.serverlessV2('Reader', {
          scaleWithWriter: true,
        }),
      ] : [],
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: props.environment === 'prod' 
          ? ec2.SubnetType.PRIVATE_ISOLATED 
          : ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      securityGroups: [this.securityGroup],
      defaultDatabaseName: 'tennispro',
      storageEncrypted: true,
      backup: {
        retention: cdk.Duration.days(props.environment === 'prod' ? 30 : 7),
      },
      removalPolicy: props.environment === 'prod'
        ? cdk.RemovalPolicy.RETAIN
        : cdk.RemovalPolicy.DESTROY,
    });

    this.secret = this.cluster.secret!;

    // RDS Proxy for Lambda connections
    this.proxy = new rds.DatabaseProxy(this, 'TennisProProxy', {
      proxyTarget: rds.ProxyTarget.fromCluster(this.cluster),
      secrets: [this.secret],
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: props.environment === 'prod'
          ? ec2.SubnetType.PRIVATE_ISOLATED
          : ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      securityGroups: [this.securityGroup],
      requireTLS: true,
      idleClientTimeout: cdk.Duration.minutes(30),
      maxConnectionsPercent: 100,
      maxIdleConnectionsPercent: 50,
    });

    // Outputs
    new cdk.CfnOutput(this, 'ClusterEndpoint', {
      value: this.cluster.clusterEndpoint.hostname,
      exportName: `${props.environment}-TennisProDbEndpoint`,
    });

    new cdk.CfnOutput(this, 'ProxyEndpoint', {
      value: this.proxy.endpoint,
      exportName: `${props.environment}-TennisProDbProxyEndpoint`,
    });

    new cdk.CfnOutput(this, 'SecretArn', {
      value: this.secret.secretArn,
      exportName: `${props.environment}-TennisProDbSecretArn`,
    });
  }
}
```

**Acceptance Criteria:**
- [ ] Aurora Serverless v2 cluster created
- [ ] RDS Proxy configured for Lambda
- [ ] Security groups allow Lambda access
- [ ] Secrets stored in Secrets Manager

---

### TG-02-005: Create Storage Stack

**Description:** Set up S3 buckets and CloudFront distribution.

**File:** `infrastructure/lib/stacks/storage-stack.ts`

```typescript
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface StorageStackProps extends cdk.StackProps {
  environment: string;
}

export class StorageStack extends cdk.Stack {
  public readonly videosBucket: s3.Bucket;
  public readonly assetsBucket: s3.Bucket;
  public readonly exportsBucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: StorageStackProps) {
    super(scope, id, props);

    // Videos bucket (private, presigned access)
    this.videosBucket = new s3.Bucket(this, 'VideosBucket', {
      bucketName: `tennispro-videos-${props.environment}-${this.account}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.PUT,
            s3.HttpMethods.POST,
          ],
          allowedOrigins: ['*'], // Restrict in prod
          allowedHeaders: ['*'],
          maxAge: 3000,
        },
      ],
      lifecycleRules: [
        {
          id: 'DeleteIncompleteUploads',
          abortIncompleteMultipartUploadAfter: cdk.Duration.days(7),
        },
        {
          id: 'TransitionToIA',
          transitions: [
            {
              storageClass: s3.StorageClass.INFREQUENT_ACCESS,
              transitionAfter: cdk.Duration.days(90),
            },
          ],
        },
      ],
      removalPolicy: props.environment === 'prod'
        ? cdk.RemovalPolicy.RETAIN
        : cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: props.environment !== 'prod',
    });

    // Assets bucket (public via CloudFront)
    this.assetsBucket = new s3.Bucket(this, 'AssetsBucket', {
      bucketName: `tennispro-assets-${props.environment}-${this.account}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: props.environment === 'prod'
        ? cdk.RemovalPolicy.RETAIN
        : cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: props.environment !== 'prod',
    });

    // Exports bucket (temporary files)
    this.exportsBucket = new s3.Bucket(this, 'ExportsBucket', {
      bucketName: `tennispro-exports-${props.environment}-${this.account}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      lifecycleRules: [
        {
          id: 'DeleteOldExports',
          expiration: cdk.Duration.days(7),
        },
      ],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // CloudFront Origin Access Identity
    const oai = new cloudfront.OriginAccessIdentity(this, 'OAI', {
      comment: 'OAI for TennisPro assets',
    });

    this.assetsBucket.grantRead(oai);

    // CloudFront Distribution
    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(this.assetsBucket, {
          originAccessIdentity: oai,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      additionalBehaviors: {
        '/videos/*': {
          origin: new origins.S3Origin(this.videosBucket, {
            originAccessIdentity: oai,
          }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          // Signed URLs will be required - configured via Lambda
        },
      },
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      enabled: true,
    });

    // Grant videos bucket read to CloudFront
    this.videosBucket.grantRead(oai);

    // Outputs
    new cdk.CfnOutput(this, 'VideosBucketName', {
      value: this.videosBucket.bucketName,
      exportName: `${props.environment}-TennisProVideosBucket`,
    });

    new cdk.CfnOutput(this, 'AssetsBucketName', {
      value: this.assetsBucket.bucketName,
      exportName: `${props.environment}-TennisProAssetsBucket`,
    });

    new cdk.CfnOutput(this, 'CloudFrontDomain', {
      value: this.distribution.distributionDomainName,
      exportName: `${props.environment}-TennisProCloudfrontDomain`,
    });
  }
}
```

**Acceptance Criteria:**
- [ ] Videos bucket with proper CORS and lifecycle
- [ ] Assets bucket for public content
- [ ] CloudFront distribution configured
- [ ] OAI for secure S3 access

---

### TG-02-006: Create API Stack

**Description:** Set up API Gateway (HTTP API) with Lambda integration.

**File:** `infrastructure/lib/stacks/api-stack.ts`

```typescript
import * as cdk from 'aws-cdk-lib';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as apigatewayv2Integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as apigatewayv2Authorizers from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import * as path from 'path';

export interface ApiStackProps extends cdk.StackProps {
  environment: string;
  vpc: ec2.IVpc;
  userPool: cognito.UserPool;
  userPoolClient: cognito.UserPoolClient;
  dbProxyEndpoint: string;
  dbSecret: secretsmanager.ISecret;
  dbSecurityGroup: ec2.SecurityGroup;
  videosBucket: s3.Bucket;
  assetsBucket: s3.Bucket;
}

export class ApiStack extends cdk.Stack {
  public readonly api: apigatewayv2.HttpApi;
  public readonly lambdaSecurityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    // Security Group for Lambda
    this.lambdaSecurityGroup = new ec2.SecurityGroup(this, 'LambdaSecurityGroup', {
      vpc: props.vpc,
      description: 'Security group for Lambda functions',
      allowAllOutbound: true,
    });

    // Allow Lambda to connect to RDS Proxy
    props.dbSecurityGroup.addIngressRule(
      this.lambdaSecurityGroup,
      ec2.Port.tcp(5432),
      'Allow Lambda to connect to Aurora via RDS Proxy'
    );

    // Shared Lambda environment variables
    const lambdaEnvironment = {
      NODE_ENV: props.environment,
      DATABASE_URL: `postgresql://tennispro:PASSWORD@${props.dbProxyEndpoint}:5432/tennispro?sslmode=require`,
      DB_SECRET_ARN: props.dbSecret.secretArn,
      VIDEOS_BUCKET: props.videosBucket.bucketName,
      ASSETS_BUCKET: props.assetsBucket.bucketName,
    };

    // Shared Lambda configuration
    const lambdaConfig: Partial<lambdaNodejs.NodejsFunctionProps> = {
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      securityGroups: [this.lambdaSecurityGroup],
      environment: lambdaEnvironment,
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'node20',
        externalModules: ['@aws-sdk/*'],
      },
    };

    // Create Lambda functions
    const createLambda = (name: string, entry: string, extraEnv?: Record<string, string>) => {
      const fn = new lambdaNodejs.NodejsFunction(this, name, {
        ...lambdaConfig,
        functionName: `tennispro-${props.environment}-${name.toLowerCase()}`,
        entry: path.join(__dirname, '../../lambda/api', entry),
        environment: {
          ...lambdaEnvironment,
          ...extraEnv,
        },
      });

      // Grant access to secrets
      props.dbSecret.grantRead(fn);
      
      // Grant S3 access
      props.videosBucket.grantReadWrite(fn);
      props.assetsBucket.grantRead(fn);

      return fn;
    };

    // API Handlers
    const handlers = {
      // Coach handlers
      getCoach: createLambda('GetCoach', 'coaches/get.ts'),
      updateCoach: createLambda('UpdateCoach', 'coaches/update.ts'),
      
      // Student handlers
      listStudents: createLambda('ListStudents', 'students/list.ts'),
      getStudent: createLambda('GetStudent', 'students/get.ts'),
      createStudent: createLambda('CreateStudent', 'students/create.ts'),
      updateStudent: createLambda('UpdateStudent', 'students/update.ts'),
      deleteStudent: createLambda('DeleteStudent', 'students/delete.ts'),
      
      // Progression handlers
      listPaths: createLambda('ListPaths', 'progressions/list-paths.ts'),
      getPath: createLambda('GetPath', 'progressions/get-path.ts'),
      createPath: createLambda('CreatePath', 'progressions/create-path.ts'),
      updatePath: createLambda('UpdatePath', 'progressions/update-path.ts'),
      deletePath: createLambda('DeletePath', 'progressions/delete-path.ts'),
      updateProgress: createLambda('UpdateProgress', 'progressions/update-progress.ts'),
      
      // Video handlers
      requestUpload: createLambda('RequestUpload', 'videos/request-upload.ts'),
      listVideos: createLambda('ListVideos', 'videos/list.ts'),
      getVideo: createLambda('GetVideo', 'videos/get.ts'),
      deleteVideo: createLambda('DeleteVideo', 'videos/delete.ts'),
      requestAnalysis: createLambda('RequestAnalysis', 'videos/request-analysis.ts'),
      getAnalysis: createLambda('GetAnalysis', 'videos/get-analysis.ts'),
      
      // Lesson handlers
      listLessons: createLambda('ListLessons', 'lessons/list.ts'),
      createLesson: createLambda('CreateLesson', 'lessons/create.ts'),
      updateLesson: createLambda('UpdateLesson', 'lessons/update.ts'),
      deleteLesson: createLambda('DeleteLesson', 'lessons/delete.ts'),
    };

    // Cognito Authorizer
    const authorizer = new apigatewayv2Authorizers.HttpUserPoolAuthorizer(
      'CognitoAuthorizer',
      props.userPool,
      {
        userPoolClients: [props.userPoolClient],
        identitySource: ['$request.header.Authorization'],
      }
    );

    // HTTP API
    this.api = new apigatewayv2.HttpApi(this, 'TennisProApi', {
      apiName: `tennispro-api-${props.environment}`,
      corsPreflight: {
        allowOrigins: ['*'], // Restrict in production
        allowMethods: [
          apigatewayv2.CorsHttpMethod.GET,
          apigatewayv2.CorsHttpMethod.POST,
          apigatewayv2.CorsHttpMethod.PUT,
          apigatewayv2.CorsHttpMethod.PATCH,
          apigatewayv2.CorsHttpMethod.DELETE,
          apigatewayv2.CorsHttpMethod.OPTIONS,
        ],
        allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        maxAge: cdk.Duration.days(1),
      },
    });

    // Helper to add route
    const addRoute = (
      method: apigatewayv2.HttpMethod,
      path: string,
      handler: lambda.IFunction,
      requireAuth = true
    ) => {
      this.api.addRoutes({
        path,
        methods: [method],
        integration: new apigatewayv2Integrations.HttpLambdaIntegration(
          `${method}${path.replace(/\//g, '-')}`,
          handler
        ),
        authorizer: requireAuth ? authorizer : undefined,
      });
    };

    // Define routes
    // Coach routes
    addRoute(apigatewayv2.HttpMethod.GET, '/api/v1/coach', handlers.getCoach);
    addRoute(apigatewayv2.HttpMethod.PUT, '/api/v1/coach', handlers.updateCoach);

    // Student routes
    addRoute(apigatewayv2.HttpMethod.GET, '/api/v1/students', handlers.listStudents);
    addRoute(apigatewayv2.HttpMethod.POST, '/api/v1/students', handlers.createStudent);
    addRoute(apigatewayv2.HttpMethod.GET, '/api/v1/students/{studentId}', handlers.getStudent);
    addRoute(apigatewayv2.HttpMethod.PUT, '/api/v1/students/{studentId}', handlers.updateStudent);
    addRoute(apigatewayv2.HttpMethod.DELETE, '/api/v1/students/{studentId}', handlers.deleteStudent);

    // Progression routes
    addRoute(apigatewayv2.HttpMethod.GET, '/api/v1/paths', handlers.listPaths);
    addRoute(apigatewayv2.HttpMethod.POST, '/api/v1/paths', handlers.createPath);
    addRoute(apigatewayv2.HttpMethod.GET, '/api/v1/paths/{pathId}', handlers.getPath);
    addRoute(apigatewayv2.HttpMethod.PUT, '/api/v1/paths/{pathId}', handlers.updatePath);
    addRoute(apigatewayv2.HttpMethod.DELETE, '/api/v1/paths/{pathId}', handlers.deletePath);
    addRoute(apigatewayv2.HttpMethod.POST, '/api/v1/progress', handlers.updateProgress);

    // Video routes
    addRoute(apigatewayv2.HttpMethod.POST, '/api/v1/videos/upload-url', handlers.requestUpload);
    addRoute(apigatewayv2.HttpMethod.GET, '/api/v1/students/{studentId}/videos', handlers.listVideos);
    addRoute(apigatewayv2.HttpMethod.GET, '/api/v1/videos/{videoId}', handlers.getVideo);
    addRoute(apigatewayv2.HttpMethod.DELETE, '/api/v1/videos/{videoId}', handlers.deleteVideo);
    addRoute(apigatewayv2.HttpMethod.POST, '/api/v1/videos/{videoId}/analyze', handlers.requestAnalysis);
    addRoute(apigatewayv2.HttpMethod.GET, '/api/v1/analyses/{analysisId}', handlers.getAnalysis);

    // Lesson routes
    addRoute(apigatewayv2.HttpMethod.GET, '/api/v1/students/{studentId}/lessons', handlers.listLessons);
    addRoute(apigatewayv2.HttpMethod.POST, '/api/v1/lessons', handlers.createLesson);
    addRoute(apigatewayv2.HttpMethod.PUT, '/api/v1/lessons/{lessonId}', handlers.updateLesson);
    addRoute(apigatewayv2.HttpMethod.DELETE, '/api/v1/lessons/{lessonId}', handlers.deleteLesson);

    // Outputs
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: this.api.apiEndpoint,
      exportName: `${props.environment}-TennisProApiEndpoint`,
    });
  }
}
```

**Acceptance Criteria:**
- [ ] HTTP API created with all routes
- [ ] Cognito authorizer protecting routes
- [ ] Lambda functions with VPC access
- [ ] Proper IAM permissions for S3 and Secrets Manager

---

### TG-02-007: Create Step Functions Stack

**Description:** Set up Step Functions for video processing workflow.

**File:** `infrastructure/lib/stacks/workflow-stack.ts`

```typescript
import * as cdk from 'aws-cdk-lib';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import * as path from 'path';

export interface WorkflowStackProps extends cdk.StackProps {
  environment: string;
  vpc: ec2.IVpc;
  videosBucket: s3.Bucket;
  dbProxyEndpoint: string;
  dbSecret: secretsmanager.ISecret;
  lambdaSecurityGroup: ec2.SecurityGroup;
}

export class WorkflowStack extends cdk.Stack {
  public readonly videoProcessingStateMachine: sfn.StateMachine;

  constructor(scope: Construct, id: string, props: WorkflowStackProps) {
    super(scope, id, props);

    const lambdaEnvironment = {
      NODE_ENV: props.environment,
      DATABASE_URL: `postgresql://tennispro:PASSWORD@${props.dbProxyEndpoint}:5432/tennispro?sslmode=require`,
      DB_SECRET_ARN: props.dbSecret.secretArn,
      VIDEOS_BUCKET: props.videosBucket.bucketName,
      MODAL_TOKEN_ID: process.env.MODAL_TOKEN_ID || '',
      MODAL_TOKEN_SECRET: process.env.MODAL_TOKEN_SECRET || '',
    };

    const lambdaConfig: Partial<lambdaNodejs.NodejsFunctionProps> = {
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.minutes(5),
      memorySize: 512,
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      securityGroups: [props.lambdaSecurityGroup],
      environment: lambdaEnvironment,
    };

    // Step 1: Validate Upload
    const validateUploadFn = new lambdaNodejs.NodejsFunction(this, 'ValidateUpload', {
      ...lambdaConfig,
      functionName: `tennispro-${props.environment}-validate-upload`,
      entry: path.join(__dirname, '../../lambda/triggers/validate-upload.ts'),
    });
    props.videosBucket.grantRead(validateUploadFn);
    props.dbSecret.grantRead(validateUploadFn);

    // Step 2: Extract Frames
    const extractFramesFn = new lambdaNodejs.NodejsFunction(this, 'ExtractFrames', {
      ...lambdaConfig,
      functionName: `tennispro-${props.environment}-extract-frames`,
      entry: path.join(__dirname, '../../lambda/triggers/extract-frames.ts'),
      timeout: cdk.Duration.minutes(10),
      memorySize: 1024,
    });
    props.videosBucket.grantReadWrite(extractFramesFn);

    // Step 3: Call Modal for Analysis
    const callModalFn = new lambdaNodejs.NodejsFunction(this, 'CallModal', {
      ...lambdaConfig,
      functionName: `tennispro-${props.environment}-call-modal`,
      entry: path.join(__dirname, '../../lambda/triggers/call-modal.ts'),
      timeout: cdk.Duration.minutes(15),
    });
    props.videosBucket.grantReadWrite(callModalFn);

    // Step 4: Store Results
    const storeResultsFn = new lambdaNodejs.NodejsFunction(this, 'StoreResults', {
      ...lambdaConfig,
      functionName: `tennispro-${props.environment}-store-results`,
      entry: path.join(__dirname, '../../lambda/triggers/store-results.ts'),
    });
    props.videosBucket.grantRead(storeResultsFn);
    props.dbSecret.grantRead(storeResultsFn);

    // Step 5: Notify Coach
    const notifyCoachFn = new lambdaNodejs.NodejsFunction(this, 'NotifyCoach', {
      ...lambdaConfig,
      functionName: `tennispro-${props.environment}-notify-coach`,
      entry: path.join(__dirname, '../../lambda/triggers/notify-coach.ts'),
    });
    props.dbSecret.grantRead(notifyCoachFn);

    // Define Step Functions workflow
    const validateUpload = new tasks.LambdaInvoke(this, 'ValidateUploadTask', {
      lambdaFunction: validateUploadFn,
      outputPath: '$.Payload',
    });

    const extractFrames = new tasks.LambdaInvoke(this, 'ExtractFramesTask', {
      lambdaFunction: extractFramesFn,
      outputPath: '$.Payload',
    });

    const callModal = new tasks.LambdaInvoke(this, 'CallModalTask', {
      lambdaFunction: callModalFn,
      outputPath: '$.Payload',
    });

    const storeResults = new tasks.LambdaInvoke(this, 'StoreResultsTask', {
      lambdaFunction: storeResultsFn,
      outputPath: '$.Payload',
    });

    const notifyCoach = new tasks.LambdaInvoke(this, 'NotifyCoachTask', {
      lambdaFunction: notifyCoachFn,
      outputPath: '$.Payload',
    });

    const failState = new sfn.Fail(this, 'ProcessingFailed', {
      cause: 'Video processing failed',
      error: 'ProcessingError',
    });

    const successState = new sfn.Succeed(this, 'ProcessingComplete');

    // Build workflow
    const definition = validateUpload
      .next(
        new sfn.Choice(this, 'IsValidUpload')
          .when(sfn.Condition.booleanEquals('$.valid', false), failState)
          .otherwise(extractFrames)
      )
      .next(callModal)
      .next(
        new sfn.Choice(this, 'AnalysisSuccessful')
          .when(sfn.Condition.booleanEquals('$.success', false), failState)
          .otherwise(storeResults)
      )
      .next(notifyCoach)
      .next(successState);

    // Create State Machine
    this.videoProcessingStateMachine = new sfn.StateMachine(this, 'VideoProcessing', {
      stateMachineName: `tennispro-${props.environment}-video-processing`,
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
      timeout: cdk.Duration.minutes(30),
      tracingEnabled: true,
    });

    // S3 trigger for new uploads
    const triggerFn = new lambdaNodejs.NodejsFunction(this, 'S3TriggerFn', {
      ...lambdaConfig,
      functionName: `tennispro-${props.environment}-s3-trigger`,
      entry: path.join(__dirname, '../../lambda/triggers/s3-upload-trigger.ts'),
      environment: {
        ...lambdaEnvironment,
        STATE_MACHINE_ARN: this.videoProcessingStateMachine.stateMachineArn,
      },
    });

    this.videoProcessingStateMachine.grantStartExecution(triggerFn);

    props.videosBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(triggerFn),
      { prefix: 'coaches/', suffix: '.mp4' }
    );

    // Also trigger for .mov and .webm
    props.videosBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(triggerFn),
      { prefix: 'coaches/', suffix: '.mov' }
    );

    props.videosBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(triggerFn),
      { prefix: 'coaches/', suffix: '.webm' }
    );

    // Outputs
    new cdk.CfnOutput(this, 'VideoProcessingStateMachineArn', {
      value: this.videoProcessingStateMachine.stateMachineArn,
      exportName: `${props.environment}-TennisProVideoProcessingSM`,
    });
  }
}
```

**Acceptance Criteria:**
- [ ] Step Functions workflow defined
- [ ] S3 trigger for new video uploads
- [ ] Lambda functions for each step
- [ ] Error handling and retries configured

---

### TG-02-008: Create CDK App Entry Point

**Description:** Wire all stacks together in the CDK app.

**File:** `infrastructure/bin/tennispro.ts`

```typescript
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NetworkStack } from '../lib/stacks/network-stack';
import { AuthStack } from '../lib/stacks/auth-stack';
import { DatabaseStack } from '../lib/stacks/database-stack';
import { StorageStack } from '../lib/stacks/storage-stack';
import { ApiStack } from '../lib/stacks/api-stack';
import { WorkflowStack } from '../lib/stacks/workflow-stack';

const app = new cdk.App();

// Get environment from context
const environment = app.node.tryGetContext('environment') || 'dev';
const envConfig = app.node.tryGetContext('environments')[environment];

if (!envConfig) {
  throw new Error(`Environment configuration not found for: ${environment}`);
}

const env = {
  account: envConfig.account || process.env.CDK_DEFAULT_ACCOUNT,
  region: envConfig.region || process.env.CDK_DEFAULT_REGION,
};

const tags = {
  Project: 'TennisPro',
  Environment: environment,
};

// Network Stack
const networkStack = new NetworkStack(app, `TennisPro-${environment}-Network`, {
  env,
  environment,
  tags,
});

// Auth Stack
const authStack = new AuthStack(app, `TennisPro-${environment}-Auth`, {
  env,
  environment,
  domainPrefix: `tennispro-${environment}`,
  callbackUrls: [
    'http://localhost:3000/api/auth/callback/cognito',
    `https://${envConfig.domainName}/api/auth/callback/cognito`,
  ],
  logoutUrls: [
    'http://localhost:3000',
    `https://${envConfig.domainName}`,
  ],
  tags,
});

// Database Stack
const databaseStack = new DatabaseStack(app, `TennisPro-${environment}-Database`, {
  env,
  environment,
  vpc: networkStack.vpc,
  tags,
});
databaseStack.addDependency(networkStack);

// Storage Stack
const storageStack = new StorageStack(app, `TennisPro-${environment}-Storage`, {
  env,
  environment,
  tags,
});

// API Stack
const apiStack = new ApiStack(app, `TennisPro-${environment}-Api`, {
  env,
  environment,
  vpc: networkStack.vpc,
  userPool: authStack.userPool,
  userPoolClient: authStack.userPoolClient,
  dbProxyEndpoint: databaseStack.proxy.endpoint,
  dbSecret: databaseStack.secret,
  dbSecurityGroup: databaseStack.securityGroup,
  videosBucket: storageStack.videosBucket,
  assetsBucket: storageStack.assetsBucket,
  tags,
});
apiStack.addDependency(networkStack);
apiStack.addDependency(authStack);
apiStack.addDependency(databaseStack);
apiStack.addDependency(storageStack);

// Workflow Stack
const workflowStack = new WorkflowStack(app, `TennisPro-${environment}-Workflow`, {
  env,
  environment,
  vpc: networkStack.vpc,
  videosBucket: storageStack.videosBucket,
  dbProxyEndpoint: databaseStack.proxy.endpoint,
  dbSecret: databaseStack.secret,
  lambdaSecurityGroup: apiStack.lambdaSecurityGroup,
  tags,
});
workflowStack.addDependency(apiStack);
workflowStack.addDependency(storageStack);

app.synth();
```

**Acceptance Criteria:**
- [ ] All stacks deploy successfully
- [ ] Dependencies are correctly ordered
- [ ] Environment switching works (dev/prod)
- [ ] Outputs are exported for cross-stack references

---

# TG-03: Database Schema

## Objective
Define and deploy PostgreSQL schema using Prisma or Drizzle ORM.

## Prerequisites
- TG-02 complete (Aurora PostgreSQL deployed)
- Database connection available

## Tasks

### TG-03-001: Set Up Database Package

**Description:** Create database package with Prisma ORM.

**Directory:** `packages/db/`

**Commands:**
```bash
mkdir -p packages/db
cd packages/db
pnpm init
pnpm add prisma @prisma/client
pnpm add -D typescript @types/node
npx prisma init
```

**Acceptance Criteria:**
- [ ] Prisma initialized
- [ ] Database URL configured
- [ ] Package builds successfully

---

### TG-03-002: Define Prisma Schema

**Description:** Create complete database schema.

**File:** `packages/db/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// COACH & AUTHENTICATION
// ============================================

model Coach {
  id              String   @id @default(uuid())
  cognitoUserId   String   @unique @map("cognito_user_id")
  email           String   @unique
  name            String
  slug            String   @unique
  tier            SubscriptionTier @default(starter)
  stripeCustomerId String? @map("stripe_customer_id")
  
  // Limits based on tier
  studentLimit    Int      @default(15) @map("student_limit")
  storageLimit    BigInt   @default(10737418240) @map("storage_limit") // 10GB in bytes
  analysisLimit   Int      @default(20) @map("analysis_limit") // per month
  
  // Tracking
  analysisCount   Int      @default(0) @map("analysis_count") // reset monthly
  storageUsed     BigInt   @default(0) @map("storage_used")
  
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  
  // Relations
  students        Student[]
  progressionPaths ProgressionPath[]
  videos          Video[]
  analyses        Analysis[]
  lessons         Lesson[]
  
  @@map("coaches")
}

enum SubscriptionTier {
  starter
  professional
  enterprise
}

// ============================================
// STUDENTS
// ============================================

model Student {
  id              String   @id @default(uuid())
  coachId         String   @map("coach_id")
  coach           Coach    @relation(fields: [coachId], references: [id], onDelete: Cascade)
  
  name            String
  email           String?
  phone           String?
  photoUrl        String?  @map("photo_url")
  
  playerCategory  PlayerCategory @map("player_category")
  status          StudentStatus @default(active)
  
  // Current progression
  currentPathId   String?  @map("current_path_id")
  currentPath     ProgressionPath? @relation("CurrentPath", fields: [currentPathId], references: [id])
  currentLevelId  String?  @map("current_level_id")
  currentLevel    Level?   @relation("CurrentLevel", fields: [currentLevelId], references: [id])
  
  notes           String?
  
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  archivedAt      DateTime? @map("archived_at")
  
  // Relations
  progress        StudentProgress[]
  videos          Video[]
  analyses        Analysis[]
  lessons         Lesson[]
  
  @@index([coachId])
  @@index([coachId, status])
  @@map("students")
}

enum PlayerCategory {
  recreational
  competitive_junior
  collegiate_track
  professional_track
  senior
}

enum StudentStatus {
  active
  inactive
  archived
}

// ============================================
// PROGRESSION FRAMEWORK
// ============================================

model ProgressionPath {
  id              String   @id @default(uuid())
  coachId         String   @map("coach_id")
  coach           Coach    @relation(fields: [coachId], references: [id], onDelete: Cascade)
  
  name            String
  description     String?
  playerCategory  PlayerCategory @map("player_category")
  
  isTemplate      Boolean  @default(false) @map("is_template")
  templateSource  TemplateSource? @map("template_source")
  isSystem        Boolean  @default(false) @map("is_system") // Platform-provided templates
  
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  
  // Relations
  levels          Level[]
  students        Student[] @relation("CurrentPath")
  
  @@index([coachId])
  @@index([isSystem, playerCategory])
  @@map("progression_paths")
}

enum TemplateSource {
  uspta
  ptr
  custom
}

model Level {
  id              String   @id @default(uuid())
  pathId          String   @map("path_id")
  path            ProgressionPath @relation(fields: [pathId], references: [id], onDelete: Cascade)
  
  name            String
  description     String?
  order           Int
  
  createdAt       DateTime @default(now()) @map("created_at")
  
  // Relations
  skills          Skill[]
  students        Student[] @relation("CurrentLevel")
  
  @@unique([pathId, order])
  @@index([pathId])
  @@map("levels")
}

model Skill {
  id              String   @id @default(uuid())
  levelId         String   @map("level_id")
  level           Level    @relation(fields: [levelId], references: [id], onDelete: Cascade)
  
  name            String
  description     String?
  category        SkillCategory
  order           Int
  
  createdAt       DateTime @default(now()) @map("created_at")
  
  // Relations
  milestones      Milestone[]
  
  @@unique([levelId, order])
  @@index([levelId])
  @@map("skills")
}

enum SkillCategory {
  serve
  forehand
  backhand
  volley
  overhead
  movement
  strategy
  mental
}

model Milestone {
  id              String   @id @default(uuid())
  skillId         String   @map("skill_id")
  skill           Skill    @relation(fields: [skillId], references: [id], onDelete: Cascade)
  
  name            String
  description     String?
  order           Int
  
  // Target metrics for AI validation
  targetMetrics   Json?    @map("target_metrics") // Array of TargetMetric
  
  createdAt       DateTime @default(now()) @map("created_at")
  
  // Relations
  progress        StudentProgress[]
  
  @@unique([skillId, order])
  @@index([skillId])
  @@map("milestones")
}

model StudentProgress {
  id              String   @id @default(uuid())
  studentId       String   @map("student_id")
  student         Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  milestoneId     String   @map("milestone_id")
  milestone       Milestone @relation(fields: [milestoneId], references: [id], onDelete: Cascade)
  
  status          ProgressStatus @default(not_started)
  achievedAt      DateTime? @map("achieved_at")
  
  validationMethod ValidationMethod? @map("validation_method")
  validationVideoId String? @map("validation_video_id")
  validationVideo Video?   @relation("ValidationVideo", fields: [validationVideoId], references: [id])
  
  notes           String?
  
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  
  @@unique([studentId, milestoneId])
  @@index([studentId])
  @@index([milestoneId])
  @@map("student_progress")
}

enum ProgressStatus {
  not_started
  in_progress
  achieved
}

enum ValidationMethod {
  coach_assessment
  ai_validation
  match_result
}

// ============================================
// VIDEO & ANALYSIS
// ============================================

model Video {
  id              String   @id @default(uuid())
  coachId         String   @map("coach_id")
  coach           Coach    @relation(fields: [coachId], references: [id], onDelete: Cascade)
  studentId       String   @map("student_id")
  student         Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  
  title           String?
  s3Key           String   @map("s3_key")
  s3Bucket        String   @map("s3_bucket")
  
  // Metadata
  filename        String
  contentType     String   @map("content_type")
  fileSize        BigInt   @map("file_size")
  duration        Float?   // seconds
  width           Int?
  height          Int?
  
  strokeType      StrokeType? @map("stroke_type")
  recordedAt      DateTime? @map("recorded_at")
  
  status          VideoStatus @default(uploading)
  
  // Thumbnails
  thumbnailUrl    String?  @map("thumbnail_url")
  
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  
  // Relations
  analyses        Analysis[]
  validations     StudentProgress[] @relation("ValidationVideo")
  lessons         LessonVideo[]
  
  @@index([coachId])
  @@index([studentId])
  @@index([coachId, studentId])
  @@map("videos")
}

enum StrokeType {
  serve
  forehand
  backhand_1h
  backhand_2h
  volley
  overhead
  movement
  rally
  match
}

enum VideoStatus {
  uploading
  uploaded
  processing
  analyzed
  failed
}

model Analysis {
  id              String   @id @default(uuid())
  videoId         String   @map("video_id")
  video           Video    @relation(fields: [videoId], references: [id], onDelete: Cascade)
  coachId         String   @map("coach_id")
  coach           Coach    @relation(fields: [coachId], references: [id], onDelete: Cascade)
  studentId       String   @map("student_id")
  student         Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  
  strokeType      StrokeType @map("stroke_type")
  status          AnalysisStatus @default(pending)
  
  // Results
  metrics         Json?    // Record<string, AnalysisMetric>
  skeletonDataUrl String?  @map("skeleton_data_url") // S3 URL to large skeleton data
  insights        String[] // AI-generated coaching insights
  
  // Error handling
  errorMessage    String?  @map("error_message")
  retryCount      Int      @default(0) @map("retry_count")
  
  processedAt     DateTime? @map("processed_at")
  createdAt       DateTime @default(now()) @map("created_at")
  
  @@index([videoId])
  @@index([coachId])
  @@index([studentId])
  @@map("analyses")
}

enum AnalysisStatus {
  pending
  processing
  complete
  failed
}

// ============================================
// LESSONS
// ============================================

model Lesson {
  id              String   @id @default(uuid())
  coachId         String   @map("coach_id")
  coach           Coach    @relation(fields: [coachId], references: [id], onDelete: Cascade)
  studentId       String   @map("student_id")
  student         Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  
  date            DateTime
  duration        Int      // minutes
  type            LessonType
  location        String?
  
  notes           String?
  skillsWorked    String[] @map("skills_worked")
  
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  
  // Relations
  videos          LessonVideo[]
  
  @@index([coachId])
  @@index([studentId])
  @@index([coachId, date])
  @@map("lessons")
}

enum LessonType {
  private
  semi_private
  group
  clinic
}

model LessonVideo {
  lessonId        String   @map("lesson_id")
  lesson          Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  videoId         String   @map("video_id")
  video           Video    @relation(fields: [videoId], references: [id], onDelete: Cascade)
  
  @@id([lessonId, videoId])
  @@map("lesson_videos")
}
```

**Acceptance Criteria:**
- [ ] Schema validates with `prisma validate`
- [ ] All relationships are correct
- [ ] Indexes defined for common queries
- [ ] Enums match shared types

---

### TG-03-003: Create and Run Migrations

**Description:** Generate and apply database migrations.

**Commands:**
```bash
cd packages/db
npx prisma migrate dev --name init
npx prisma generate
```

**Acceptance Criteria:**
- [ ] Migration created successfully
- [ ] Migration applies to database
- [ ] Prisma Client generated

---

### TG-03-004: Create Seed Data

**Description:** Create seed script for development data.

**File:** `packages/db/prisma/seed.ts`

```typescript
import { PrismaClient, PlayerCategory, SkillCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create system progression templates
  const usptaPath = await prisma.progressionPath.create({
    data: {
      coachId: 'system', // Special system ID
      name: 'USPTA Player Development Path',
      description: 'Based on USPTA player development guidelines',
      playerCategory: PlayerCategory.recreational,
      isTemplate: true,
      templateSource: 'uspta',
      isSystem: true,
      levels: {
        create: [
          {
            name: 'Beginner',
            description: 'Introduction to tennis fundamentals',
            order: 0,
            skills: {
              create: [
                {
                  name: 'Forehand Basics',
                  category: SkillCategory.forehand,
                  order: 0,
                  milestones: {
                    create: [
                      { name: 'Continental grip understanding', order: 0 },
                      { name: 'Ready position', order: 1 },
                      { name: 'Basic swing path', order: 2 },
                      { name: 'Contact point awareness', order: 3 },
                    ],
                  },
                },
                {
                  name: 'Backhand Basics',
                  category: SkillCategory.backhand,
                  order: 1,
                  milestones: {
                    create: [
                      { name: 'Two-hand grip', order: 0 },
                      { name: 'Unit turn', order: 1 },
                      { name: 'Basic swing path', order: 2 },
                    ],
                  },
                },
                {
                  name: 'Serve Introduction',
                  category: SkillCategory.serve,
                  order: 2,
                  milestones: {
                    create: [
                      { name: 'Service stance', order: 0 },
                      { name: 'Ball toss consistency', order: 1 },
                      { name: 'Basic service motion', order: 2 },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'Intermediate',
            description: 'Developing consistency and court awareness',
            order: 1,
            skills: {
              create: [
                {
                  name: 'Forehand Development',
                  category: SkillCategory.forehand,
                  order: 0,
                  milestones: {
                    create: [
                      { name: 'Topspin generation', order: 0 },
                      { name: 'Cross-court consistency', order: 1 },
                      { name: 'Down-the-line control', order: 2 },
                      { name: 'Approach shot', order: 3 },
                    ],
                  },
                },
                {
                  name: 'Net Play',
                  category: SkillCategory.volley,
                  order: 1,
                  milestones: {
                    create: [
                      { name: 'Split step timing', order: 0 },
                      { name: 'Forehand volley', order: 1 },
                      { name: 'Backhand volley', order: 2 },
                      { name: 'Overhead basics', order: 3 },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`Created USPTA template path: ${usptaPath.id}`);

  // Create more templates as needed...

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Acceptance Criteria:**
- [ ] Seed script runs successfully
- [ ] System templates created
- [ ] Development data available

---

# TG-04 through TG-18: Continued Implementation

Due to the length of this document, I'll provide a summary of remaining task groups. Each follows the same detailed format as above.

---

## TG-04: Authentication (6-8 hours)

### Tasks:
- TG-04-001: Create Cognito post-confirmation Lambda trigger
- TG-04-002: Implement JWT validation middleware
- TG-04-003: Create authentication hooks for Next.js
- TG-04-004: Implement login/signup pages
- TG-04-005: Configure OAuth providers (Google, Apple)
- TG-04-006: Implement password reset flow

---

## TG-05: API Layer (12-16 hours)

### Tasks:
- TG-05-001: Create Lambda handler base classes
- TG-05-002: Implement coach API handlers
- TG-05-003: Implement student CRUD handlers
- TG-05-004: Implement progression path handlers
- TG-05-005: Implement video management handlers
- TG-05-006: Implement lesson handlers
- TG-05-007: Create API client for frontend
- TG-05-008: Add request validation middleware
- TG-05-009: Add error handling middleware
- TG-05-010: Add logging and monitoring

---

## TG-06: Storage & CDN (4-6 hours)

### Tasks:
- TG-06-001: Implement presigned URL generation
- TG-06-002: Implement CloudFront signed URLs
- TG-06-003: Create upload progress tracking
- TG-06-004: Implement chunked upload for large files
- TG-06-005: Create thumbnail generation

---

## TG-07: Sanity CMS (6-8 hours)

### Tasks:
- TG-07-001: Initialize Sanity Studio project
- TG-07-002: Create marketing content schemas
- TG-07-003: Create coach profile schemas
- TG-07-004: Create system template schemas
- TG-07-005: Configure i18n support
- TG-07-006: Set up webhook for content updates
- TG-07-007: Create Sanity client for Next.js

---

## TG-08: Next.js Foundation (8-10 hours)

### Tasks:
- TG-08-001: Initialize Next.js app with App Router
- TG-08-002: Configure shadcn/ui components
- TG-08-003: Set up Tailwind CSS
- TG-08-004: Create layout components
- TG-08-005: Implement authentication context
- TG-08-006: Create API client hooks
- TG-08-007: Configure PWA manifest
- TG-08-008: Set up i18n with next-intl

---

## TG-09: Marketing Site (10-14 hours)

### Tasks:
- TG-09-001: Create home page
- TG-09-002: Create features pages
- TG-09-003: Create pricing page
- TG-09-004: Create blog layout and pages
- TG-09-005: Create help center
- TG-09-006: Implement SEO components
- TG-09-007: Add analytics integration
- TG-09-008: Create footer and navigation

---

## TG-10: Coach Portal - Core (10-14 hours)

### Tasks:
- TG-10-001: Create portal layout with navigation
- TG-10-002: Implement dashboard page
- TG-10-003: Create settings pages
- TG-10-004: Implement subscription management
- TG-10-005: Create onboarding wizard
- TG-10-006: Add notification center

---

## TG-11: Student Management (8-10 hours)

### Tasks:
- TG-11-001: Create student list page with filters
- TG-11-002: Create add/edit student forms
- TG-11-003: Create student profile page
- TG-11-004: Implement student invitation flow
- TG-11-005: Add CSV import functionality
- TG-11-006: Implement archive/restore

---

## TG-12: Progression Framework (12-16 hours)

### Tasks:
- TG-12-001: Create progression path list/grid
- TG-12-002: Create path editor (levels, skills, milestones)
- TG-12-003: Implement template selection
- TG-12-004: Create progress visualization (student view)
- TG-12-005: Implement milestone completion UI
- TG-12-006: Add target metrics editor
- TG-12-007: Create progress reports

---

## TG-13: Video Management (10-14 hours)

### Tasks:
- TG-13-001: Create video upload component
- TG-13-002: Implement upload progress UI
- TG-13-003: Create video library grid
- TG-13-004: Implement video player with controls
- TG-13-005: Add video tagging interface
- TG-13-006: Create video detail page

---

## TG-14: Video Analysis (12-16 hours)

### Tasks:
- TG-14-001: Create analysis request UI
- TG-14-002: Implement analysis status tracking
- TG-14-003: Create skeleton overlay component (Konva.js)
- TG-14-004: Implement metrics visualization
- TG-14-005: Create comparison view
- TG-14-006: Add manual skeleton adjustment
- TG-14-007: Integrate Modal.com API

---

## TG-15: Coach Public Pages (8-10 hours)

### Tasks:
- TG-15-001: Create coach profile page template
- TG-15-002: Implement profile editor
- TG-15-003: Create student signup flow
- TG-15-004: Add SEO optimization
- TG-15-005: Create gallery component
- TG-15-006: Add testimonials section

---

## TG-16: Notifications (6-8 hours)

### Tasks:
- TG-16-001: Set up SES email templates
- TG-16-002: Create email sending Lambda
- TG-16-003: Implement in-app notification system
- TG-16-004: Add push notification support (PWA)
- TG-16-005: Create notification preferences UI

---

## TG-17: Analytics Integration (2-4 hours)

### Tasks:
- TG-17-001: Set up Plausible for web analytics
- TG-17-002: Integrate PostHog for product analytics
- TG-17-003: Create analytics wrapper component
- TG-17-004: Add event tracking

---

## TG-18: Testing & QA (Ongoing)

### Tasks:
- TG-18-001: Set up Jest for unit tests
- TG-18-002: Configure Playwright for E2E
- TG-18-003: Create test utilities and fixtures
- TG-18-004: Write API handler tests
- TG-18-005: Write component tests
- TG-18-006: Create E2E test suite
- TG-18-007: Set up CI/CD pipeline

---

# TG-19: Student Portal

## Objective
Build the complete student-facing application with dashboard, progress viewing, video library access, and content viewing. The student portal is primarily a display layer for coach-curated content.

## Prerequisites
- TG-08 complete (Next.js foundation)
- TG-12 complete (Progression framework)
- TG-13 complete (Video management)

## Design Principle
The student portal displays content that coaches have assigned/shared. Students do NOT create progression paths, analyze videos, or modify coach content. They view their assigned path, uploaded/analyzed videos, shared lesson notes, and coach blog posts.

## Tasks

### TG-19-001: Student Authentication Flow

**Description:** Implement student registration and login.

**Requirements:**
- Registration via coach invitation link
- Registration via coach public profile (/c/{slug})
- Login with email/password and OAuth (Google, Apple)
- Separate Cognito user pool or shared pool with role attribute

**Files to create:**
```
apps/web/app/student/login/page.tsx
apps/web/app/student/register/page.tsx
apps/web/app/c/[slug]/join/page.tsx
apps/web/lib/auth/student-auth.ts
```

**Acceptance Criteria:**
- [ ] Student can register via invitation link
- [ ] Student can register from coach profile page
- [ ] Student is auto-associated with correct coach
- [ ] Student login redirects to student dashboard
- [ ] Session management works correctly

---

### TG-19-002: Student Dashboard

**Description:** Create student home/dashboard page.

**Requirements:**
- Welcome message with student name
- Coach info card (name, photo, quick contact)
- Current level indicator ("You Are Here")
- Recent achievements (last 5 milestones)
- Unread messages indicator
- Active goals summary
- Recent videos with analysis status
- Quick actions (upload video, message coach, view progress)

**Files to create:**
```
apps/web/app/student/(authenticated)/page.tsx
apps/web/app/student/(authenticated)/layout.tsx
apps/web/components/student/dashboard/
├── welcome-card.tsx
├── coach-info-card.tsx
├── progress-summary.tsx
├── recent-achievements.tsx
├── goals-summary.tsx
├── recent-videos.tsx
└── quick-actions.tsx
```

**Acceptance Criteria:**
- [ ] Dashboard loads with student data
- [ ] Coach information displayed correctly
- [ ] Progress summary shows current level
- [ ] Quick actions navigate to correct pages
- [ ] Notification badges display unread counts

---

### TG-19-003: Student Navigation

**Description:** Implement student portal navigation.

**Requirements:**
- Bottom navigation on mobile
- Sidebar navigation on desktop
- Nav items: Dashboard, Progress, Videos, Goals, Messages, Blog

**Files to create:**
```
apps/web/components/student/navigation/
├── student-nav.tsx
├── student-mobile-nav.tsx
├── student-sidebar.tsx
└── nav-items.ts
```

**Acceptance Criteria:**
- [ ] Navigation displays correctly on mobile (bottom)
- [ ] Navigation displays correctly on desktop (sidebar)
- [ ] Active state shows current page
- [ ] Unread badge on Messages
- [ ] Responsive breakpoint transition is smooth

---

### TG-19-004: Progress Path Viewing

**Description:** Student views their assigned progression path.

**Requirements:**
- Visual path representation with levels
- "You Are Here" indicator
- Drill-down to level detail
- Drill-down to skill detail
- Drill-down to milestone detail with status
- Link to validation videos

**Files to create:**
```
apps/web/app/student/(authenticated)/progress/page.tsx
apps/web/app/student/(authenticated)/progress/level/[levelId]/page.tsx
apps/web/app/student/(authenticated)/progress/skill/[skillId]/page.tsx
apps/web/app/student/(authenticated)/progress/milestone/[milestoneId]/page.tsx
apps/web/components/student/progress/
├── path-overview.tsx
├── level-card.tsx
├── skill-list.tsx
├── milestone-item.tsx
├── you-are-here-indicator.tsx
└── progress-percentage.tsx
```

**Acceptance Criteria:**
- [ ] Path displays all levels in order
- [ ] Current level highlighted with "You Are Here"
- [ ] Completion percentages calculate correctly
- [ ] Drill-down navigation works
- [ ] Milestone status (not started/in progress/achieved) displays
- [ ] Linked videos accessible from milestones

---

### TG-19-005: Achievement History

**Description:** Student views timeline of completed milestones.

**Requirements:**
- Chronological list of achievements
- Date achieved, validation method
- Link to validation evidence (video)
- Filter by date range

**Files to create:**
```
apps/web/app/student/(authenticated)/achievements/page.tsx
apps/web/components/student/achievements/
├── achievement-timeline.tsx
├── achievement-card.tsx
└── achievement-filters.tsx
```

**Acceptance Criteria:**
- [ ] Achievements listed in reverse chronological order
- [ ] Each shows milestone name, date, method
- [ ] Video link opens player
- [ ] Filters work correctly

---

### TG-19-006: Video Library (Student View)

**Description:** Student views their video library.

**Requirements:**
- Grid/list of videos (coach-uploaded and self-uploaded)
- Filter by stroke type, date, uploader
- Video playback with standard controls
- View analysis results (if analyzed)

**Files to create:**
```
apps/web/app/student/(authenticated)/videos/page.tsx
apps/web/app/student/(authenticated)/videos/[videoId]/page.tsx
apps/web/app/student/(authenticated)/videos/[videoId]/analysis/page.tsx
apps/web/components/student/videos/
├── video-grid.tsx
├── video-card.tsx
├── video-filters.tsx
├── video-player.tsx
└── analysis-viewer.tsx
```

**Acceptance Criteria:**
- [ ] Videos display with thumbnails
- [ ] Uploader indicator (coach vs self)
- [ ] Filters work correctly
- [ ] Video playback functional
- [ ] Analysis view shows skeleton overlay and metrics

---

### TG-19-007: Lesson History Viewing

**Description:** Student views their lesson history.

**Requirements:**
- List of past lessons
- Lesson details (date, duration, type)
- Shared notes visible
- Linked videos accessible

**Files to create:**
```
apps/web/app/student/(authenticated)/lessons/page.tsx
apps/web/app/student/(authenticated)/lessons/[lessonId]/page.tsx
apps/web/components/student/lessons/
├── lesson-list.tsx
├── lesson-card.tsx
└── lesson-detail.tsx
```

**Acceptance Criteria:**
- [ ] Lessons listed chronologically
- [ ] Shared notes display (private notes hidden)
- [ ] Linked videos accessible
- [ ] Filter by date works

---

### TG-19-008: Coach Blog Viewing

**Description:** Student views coach's blog posts.

**Requirements:**
- List of coach's published blog posts
- Filter by tags
- Full post view
- Only show posts marked "public" or "students"

**Files to create:**
```
apps/web/app/student/(authenticated)/blog/page.tsx
apps/web/app/student/(authenticated)/blog/[slug]/page.tsx
apps/web/components/student/blog/
├── blog-list.tsx
├── blog-card.tsx
└── blog-post.tsx
```

**Acceptance Criteria:**
- [ ] Blog posts from coach displayed
- [ ] Posts filtered by visibility correctly
- [ ] Full post renders rich content
- [ ] Tag filtering works

---

### TG-19-009: Coach Info Page

**Description:** Student views their coach's information.

**Requirements:**
- Coach profile (name, bio, credentials)
- Quick contact actions (message)
- Link to coach's public page

**Files to create:**
```
apps/web/app/student/(authenticated)/coach/page.tsx
apps/web/components/student/coach/
├── coach-profile.tsx
└── contact-actions.tsx
```

**Acceptance Criteria:**
- [ ] Coach info displays correctly
- [ ] Message action opens messaging
- [ ] Public page link works

---

### TG-19-010: Student Settings

**Description:** Student manages their account settings.

**Requirements:**
- Profile editing (name, photo, contact)
- Notification preferences
- Password change (if not OAuth-only)
- Account deletion request

**Files to create:**
```
apps/web/app/student/(authenticated)/settings/page.tsx
apps/web/app/student/(authenticated)/settings/notifications/page.tsx
apps/web/components/student/settings/
├── profile-form.tsx
├── notification-prefs.tsx
├── password-change.tsx
└── delete-account.tsx
```

**Acceptance Criteria:**
- [ ] Profile updates save correctly
- [ ] Notification preferences persist
- [ ] Password change works
- [ ] Account deletion requests processing

---

# TG-20: Student Goals

## Objective
Implement the student goals/objectives system where students can create personal goals that are visible to their coach.

## Prerequisites
- TG-19 complete (Student Portal foundation)
- TG-05 complete (API layer)

## Tasks

### TG-20-001: Goals API Endpoints

**Description:** Create Lambda handlers for goals CRUD.

**API Endpoints:**
```
POST   /api/v1/goals           - Create goal (student)
GET    /api/v1/goals           - List student's goals
GET    /api/v1/goals/{id}      - Get goal detail
PUT    /api/v1/goals/{id}      - Update goal (student)
DELETE /api/v1/goals/{id}      - Delete goal (student)
POST   /api/v1/goals/{id}/note - Add coach note (coach only)
GET    /api/v1/students/{id}/goals - List student goals (coach view)
```

**Files to create:**
```
infrastructure/lambda/api/goals/
├── create.ts
├── list.ts
├── get.ts
├── update.ts
├── delete.ts
└── add-coach-note.ts
```

**Acceptance Criteria:**
- [ ] Student can create goals
- [ ] Student can only access own goals
- [ ] Coach can view student goals
- [ ] Coach can add notes to goals
- [ ] Goal status updates work

---

### TG-20-002: Goals Database Schema

**Description:** Add StudentGoal model to Prisma schema.

**Schema addition:**
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
  linkedMilestoneId String? @map("linked_milestone_id")
  linkedMilestone   Milestone? @relation(fields: [linkedMilestoneId], references: [id])
  
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

**Acceptance Criteria:**
- [ ] Migration created and applied
- [ ] Prisma client regenerated
- [ ] Relations work correctly

---

### TG-20-003: Student Goals UI

**Description:** Build student-facing goals interface.

**Files to create:**
```
apps/web/app/student/(authenticated)/goals/page.tsx
apps/web/app/student/(authenticated)/goals/new/page.tsx
apps/web/app/student/(authenticated)/goals/[goalId]/page.tsx
apps/web/app/student/(authenticated)/goals/[goalId]/edit/page.tsx
apps/web/components/student/goals/
├── goals-list.tsx
├── goal-card.tsx
├── goal-form.tsx
├── goal-detail.tsx
├── goal-status-badge.tsx
├── category-select.tsx
└── goal-actions.tsx
```

**Acceptance Criteria:**
- [ ] Goals list displays all student goals
- [ ] Create goal form validates and submits
- [ ] Edit goal works
- [ ] Status changes update correctly
- [ ] Category icons/badges display

---

### TG-20-004: Coach Goals View

**Description:** Coach can view student goals in their portal.

**Files to create:**
```
apps/web/app/(coach)/students/[studentId]/goals/page.tsx
apps/web/components/coach/student/
├── student-goals-tab.tsx
├── goal-with-notes.tsx
└── add-goal-note-form.tsx
```

**Acceptance Criteria:**
- [ ] Coach sees student goals in student profile
- [ ] Coach can add notes to goals
- [ ] Goal status visible to coach
- [ ] Goals sorted by relevance/date

---

### TG-20-005: Goals Notifications

**Description:** Notify relevant parties of goal changes.

**Notifications:**
- New goal → Coach notified
- Goal achieved → Coach notified
- Coach note added → Student notified

**Files to modify:**
```
infrastructure/lambda/api/goals/*.ts (add notification triggers)
```

**Acceptance Criteria:**
- [ ] Coach receives notification on new goal
- [ ] Coach receives notification on goal achieved
- [ ] Student receives notification on coach note
- [ ] Notifications appear in-app and email

---

# TG-21: Messaging System

## Objective
Implement private messaging between coaches and students with real-time updates.

## Prerequisites
- TG-05 complete (API layer)
- TG-10 complete (Coach portal)
- TG-19 complete (Student portal)

## Tasks

### TG-21-001: Messaging Database Schema

**Description:** Add Conversation and Message models.

**Schema addition:**
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
  attachments    Json?
  
  readAt         DateTime? @map("read_at")
  
  createdAt      DateTime @default(now()) @map("created_at")
  
  @@index([conversationId])
  @@index([conversationId, createdAt])
  @@map("messages")
}

enum SenderType {
  coach
  student
}
```

**Acceptance Criteria:**
- [ ] Migration created and applied
- [ ] One conversation per coach-student pair enforced
- [ ] Messages belong to conversations

---

### TG-21-002: Messaging API Endpoints

**Description:** Create Lambda handlers for messaging.

**API Endpoints:**
```
GET    /api/v1/conversations              - List conversations (coach/student)
GET    /api/v1/conversations/{id}         - Get conversation with messages
POST   /api/v1/conversations/{id}/messages - Send message
PUT    /api/v1/messages/{id}/read         - Mark message as read
GET    /api/v1/conversations/unread-count - Get unread count
```

**Files to create:**
```
infrastructure/lambda/api/messaging/
├── list-conversations.ts
├── get-conversation.ts
├── send-message.ts
├── mark-read.ts
└── unread-count.ts
```

**Acceptance Criteria:**
- [ ] Conversations list works for both coach and student
- [ ] Messages retrieved in order
- [ ] Send message creates/updates conversation
- [ ] Read receipts update correctly
- [ ] Unread count accurate

---

### TG-21-003: Real-time Messaging (WebSocket)

**Description:** Implement WebSocket for real-time message delivery.

**Requirements:**
- API Gateway WebSocket API
- Connection management Lambda
- Message broadcast Lambda
- Client WebSocket hook

**Files to create:**
```
infrastructure/lib/stacks/websocket-stack.ts
infrastructure/lambda/websocket/
├── connect.ts
├── disconnect.ts
├── message.ts
└── broadcast.ts
apps/web/lib/hooks/use-websocket.ts
apps/web/lib/hooks/use-messaging.ts
```

**Acceptance Criteria:**
- [ ] WebSocket connects on messaging page load
- [ ] New messages appear in real-time
- [ ] Typing indicators (optional)
- [ ] Reconnection on disconnect
- [ ] Connection state shown to user

---

### TG-21-004: Coach Messaging UI

**Description:** Build messaging interface for coach portal.

**Files to create:**
```
apps/web/app/(coach)/messages/page.tsx
apps/web/app/(coach)/messages/[conversationId]/page.tsx
apps/web/components/coach/messaging/
├── conversation-list.tsx
├── conversation-item.tsx
├── message-thread.tsx
├── message-bubble.tsx
├── message-input.tsx
├── unread-badge.tsx
└── empty-state.tsx
```

**Acceptance Criteria:**
- [ ] Conversation list shows all students with messages
- [ ] Unread count per conversation
- [ ] Message thread displays correctly
- [ ] Send message works
- [ ] Read receipts display
- [ ] Real-time updates work

---

### TG-21-005: Student Messaging UI

**Description:** Build messaging interface for student portal.

**Files to create:**
```
apps/web/app/student/(authenticated)/messages/page.tsx
apps/web/components/student/messaging/
├── message-thread.tsx
├── message-bubble.tsx
├── message-input.tsx
└── coach-header.tsx
```

**Note:** Student has only ONE conversation (with their coach), so no conversation list needed.

**Acceptance Criteria:**
- [ ] Opens directly to conversation with coach
- [ ] Message thread displays correctly
- [ ] Send message works
- [ ] Real-time updates work
- [ ] Unread badge clears on view

---

### TG-21-006: Message Notifications

**Description:** Implement notifications for new messages.

**Requirements:**
- In-app notification badge
- Email notification (batched, configurable)
- Push notification (PWA)

**Files to modify:**
```
infrastructure/lambda/api/messaging/send-message.ts (add notification trigger)
apps/web/components/*/navigation/* (add unread badge)
```

**Acceptance Criteria:**
- [ ] In-app badge shows unread count
- [ ] Email sent for new message (if enabled)
- [ ] Push notification works (PWA)
- [ ] Notification preferences respected

---

# Implementation Order

```
Week 1-2: Foundation
├── TG-01: Project Foundation
├── TG-02: AWS Infrastructure
└── TG-03: Database Schema

Week 3-4: Core Backend
├── TG-04: Authentication
├── TG-05: API Layer
└── TG-06: Storage & CDN

Week 5-6: Content & Frontend Foundation
├── TG-07: Sanity CMS (including coach blog schemas)
├── TG-08: Next.js Foundation
└── TG-17: Analytics Integration

Week 7-8: Marketing & Coach Portal Core
├── TG-09: Marketing Site
└── TG-10: Coach Portal - Core

Week 9-10: Core Features
├── TG-11: Student Management
├── TG-12: Progression Framework
└── TG-15: Coach Public Pages (including blog display)

Week 11-12: Video Features
├── TG-13: Video Management (coach + student upload)
├── TG-14: Video Analysis
└── TG-16: Notifications

Week 13-14: Student Portal & Communication
├── TG-19: Student Portal
├── TG-20: Student Goals
└── TG-21: Messaging System

Ongoing: Testing
└── TG-18: Testing & QA
```

---

# Agent Instructions

When working on these tasks:

1. **Read the full task description** before starting
2. **Check prerequisites** are complete
3. **Follow the acceptance criteria** as a checklist
4. **Use TypeScript** with strict mode everywhere
5. **Add JSDoc comments** for public APIs
6. **Write tests** alongside implementation
7. **Commit frequently** with descriptive messages
8. **Update this document** as tasks are completed

For each task group, you may create a sub-agent or work sequentially. Task groups are designed to be somewhat independent once their dependencies are met.

**Key Architectural Principle for Student Portal:**
The student portal is a **display layer**. Students view coach-assigned content. They do NOT modify progression paths, analyze videos, or create content (except goals, messages, and video uploads for review).

---

*Document ready for Claude Code implementation.*
