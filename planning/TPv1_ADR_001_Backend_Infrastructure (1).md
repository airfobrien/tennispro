# TennisPro V1 - Architecture Decision Record

**Document ID:** TPv1-ADR-001  
**Version:** 1.0.0  
**Created:** 2025-12-06T16:45:00Z  
**Last Updated:** 2025-12-06T17:15:00Z  
**Status:** ✅ DECIDED - AWS Native  
**Decision:** Backend Infrastructure - AWS Native (Consolidated)  
**Author:** Bob O'Brien  

---

## Decision

**TennisPro will use AWS as the consolidated backend platform.**

### Rationale

| Factor | Decision Driver |
|--------|-----------------|
| **Platform Consolidation** | Prefer one ecosystem over managing multiple platforms |
| **Avoid Migration** | Invest upfront to avoid Supabase → AWS migration later |
| **Future Analytics** | AWS native path to QuickSight, Athena, Timestream |
| **Future Streaming** | AWS IVS available when live coaching is needed |
| **Long-term Investment** | Accept slower initial velocity for better foundation |

### Trade-offs Accepted

| We Accept | In Exchange For |
|-----------|-----------------|
| Slower initial development | No future migration pain |
| Higher initial complexity | Single platform mastery |
| More infrastructure code | Full control and flexibility |
| Steeper learning curve | Enterprise-grade capabilities |

---

## Final Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            PRESENTATION                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                         VERCEL                                       ││
│  │  Next.js 14 (App Router) + shadcn/ui + PWA                          ││
│  │  • Marketing Site    • Coach Portal    • Student Portal              ││
│  └─────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                         CONTENT MANAGEMENT                               │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                       SANITY.IO                                      ││
│  │  • Marketing content   • Coach profiles   • Help articles            ││
│  │  • i18n (EN/ES/FR/PT)  • Blog posts      • System templates          ││
│  └─────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                              AWS CORE                                    │
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   COGNITO   │  │   AURORA    │  │     S3      │  │ CLOUDFRONT  │    │
│  │    Auth     │  │ PostgreSQL  │  │   Storage   │  │     CDN     │    │
│  │             │  │ Serverless  │  │             │  │             │    │
│  │ • User pools│  │ • v2        │  │ • Videos    │  │ • Global    │    │
│  │ • OAuth     │  │ • Auto-scale│  │ • Images    │  │ • Signed URL│    │
│  │ • MFA       │  │ • RDS Proxy │  │ • Exports   │  │ • Caching   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ API GATEWAY │  │   LAMBDA    │  │STEP FUNCTIONS│ │ EVENTBRIDGE │    │
│  │   + HTTP    │  │  Compute    │  │ Orchestrate  │  │   Events    │    │
│  │             │  │             │  │              │  │             │    │
│  │ • REST API  │  │ • Node.js   │  │ • Video proc │  │ • Async     │    │
│  │ • WebSocket │  │ • TypeScript│  │ • Data sync  │  │ • Schedules │    │
│  │ • Auth      │  │ • Handlers  │  │ • Reports    │  │ • Triggers  │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │     SES     │  │     SNS     │  │  SECRETS    │  │ CLOUDWATCH  │    │
│  │   Email     │  │    Push     │  │  MANAGER    │  │  Monitoring │    │
│  │             │  │             │  │             │  │             │    │
│  │ • Transact  │  │ • Mobile    │  │ • API keys  │  │ • Logs      │    │
│  │ • Marketing │  │ • Web push  │  │ • DB creds  │  │ • Metrics   │    │
│  │ • Templates │  │ • Topics    │  │ • Rotation  │  │ • Alarms    │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                         AI / ML PROCESSING                               │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                       MODAL.COM                                      ││
│  │  • GPU compute for video analysis                                    ││
│  │  • MediaPipe BlazePose (33-point skeleton)                          ││
│  │  • Ball tracking (OpenCV)                                            ││
│  │  • Outputs → S3 → Database                                           ││
│  └─────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                      ANALYTICS (Progressive)                             │
│                                                                          │
│  V1 (Launch)           V2 (Growth)              V3 (Scale)              │
│  ┌─────────────┐      ┌─────────────┐          ┌─────────────┐         │
│  │  PLAUSIBLE  │  +   │   ATHENA    │    +     │ QUICKSIGHT  │         │
│  │  Web Stats  │      │  S3 Queries │          │ Dashboards  │         │
│  └─────────────┘      └─────────────┘          └─────────────┘         │
│  ┌─────────────┐      ┌─────────────┐          ┌─────────────┐         │
│  │  POSTHOG    │  +   │ TIMESTREAM  │    +     │  REDSHIFT   │         │
│  │  Product    │      │ Time-series │          │  Warehouse  │         │
│  └─────────────┘      └─────────────┘          └─────────────┘         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                       STREAMING (Future V2+)                             │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                        AWS IVS                                       ││
│  │  • Live coaching sessions                                            ││
│  │  • Real-time video with <5s latency                                  ││
│  │  • Interactive features                                              ││
│  └─────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL INTEGRATIONS                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  STRIPE  │ │CLUBAUTO  │ │ UTR/USTA │ │SMASHPOINT│ │  TWILIO  │      │
│  │ Payments │ │ Members  │ │ Ratings  │ │  Stats   │ │   SMS    │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Authentication: Amazon Cognito

| Feature | Implementation |
|---------|----------------|
| User Pools | Separate pools for Coaches and Students |
| OAuth | Google, Apple sign-in |
| MFA | Optional TOTP for coaches |
| Custom UI | Amplify UI components or custom forms |
| JWT Claims | Include `coach_id`, `role`, `tier` |
| Hosted UI | For initial MVP, migrate to custom later |

**Cognito Considerations:**
- Hosted UI is basic but functional for MVP
- Can build custom UI with Amplify SDK
- User migration from other providers supported
- ~$0.0055 per MAU after free tier (50K free)

### 2. Database: Aurora PostgreSQL Serverless v2

| Feature | Configuration |
|---------|---------------|
| Engine | PostgreSQL 15+ |
| Scaling | 0.5 - 16 ACUs (auto) |
| Proxy | RDS Proxy for connection pooling |
| Encryption | At-rest and in-transit |
| Backup | Automated daily + PITR |
| Multi-AZ | Enabled for production |

**Why Aurora Serverless v2:**
- Scales to zero-ish (0.5 ACU minimum)
- Handles traffic spikes automatically
- PostgreSQL compatibility (can use same schemas planned for Supabase)
- No connection limit issues with RDS Proxy
- ~$0.12/ACU-hour (~$43/mo minimum)

**Database Access Pattern:**
```
Vercel (Next.js)
      │
      ▼
API Gateway → Lambda → RDS Proxy → Aurora PostgreSQL
      │
      └── JWT validation via Cognito
```

### 3. API Layer: API Gateway + Lambda

| Component | Purpose |
|-----------|---------|
| HTTP API | REST endpoints for CRUD operations |
| WebSocket API | Real-time updates (progress, notifications) |
| Lambda | Business logic handlers |
| Authorizer | Cognito JWT validation |

**API Structure:**
```
/api/v1/
├── /auth/          (Cognito integration)
├── /coaches/       (Coach management)
├── /students/      (Student CRUD)
├── /paths/         (Progression paths)
├── /milestones/    (Progress tracking)
├── /videos/        (Upload URLs, metadata)
├── /analyses/      (Request, results)
├── /lessons/       (Lesson logging)
└── /reports/       (Analytics, exports)
```

**Lambda Configuration:**
- Runtime: Node.js 20.x with TypeScript
- Memory: 256-512MB typical
- Timeout: 30s for most, 5min for reports
- Layers: Shared dependencies (Prisma, etc.)

### 4. Storage: S3 + CloudFront

| Bucket | Purpose | Access |
|--------|---------|--------|
| `tennispro-videos-{env}` | Raw video uploads | Presigned upload URLs |
| `tennispro-processed-{env}` | Analyzed videos + frames | CloudFront signed URLs |
| `tennispro-exports-{env}` | Reports, CSVs | Presigned download URLs |
| `tennispro-assets-{env}` | Static assets | Public via CloudFront |

**CloudFront Configuration:**
- Origin: S3 buckets
- Signed URLs: For video playback (coach-scoped)
- Caching: Aggressive for processed content
- Edge locations: Global

**Video Upload Flow:**
```
1. Client requests upload URL (Lambda)
2. Lambda generates presigned S3 URL (5min expiry)
3. Client uploads directly to S3
4. S3 event triggers Step Function
5. Step Function orchestrates Modal.com processing
6. Results stored in S3 + metadata in Aurora
```

### 5. Real-time: API Gateway WebSocket

| Channel | Purpose |
|---------|---------|
| `analysis-progress` | Video analysis status updates |
| `notifications` | New student, milestone achieved |
| `presence` | Online status (future) |

**Alternative Considered:** AppSync
- More features (subscriptions, offline)
- More complex setup
- Decision: Start with WebSocket, add AppSync if needed

### 6. Orchestration: Step Functions

| Workflow | Triggers | Steps |
|----------|----------|-------|
| `VideoProcessing` | S3 upload | Validate → Extract frames → Analyze → Store |
| `DailyAnalytics` | EventBridge schedule | Aggregate → Calculate → Store |
| `WeeklyReports` | EventBridge schedule | Query → Generate → Email |
| `StudentOnboarding` | API call | Create → Notify coach → Welcome email |

### 7. Email: Amazon SES

| Type | Template | Trigger |
|------|----------|---------|
| Welcome | `welcome-coach` | Registration |
| Student Invite | `student-invite` | Coach action |
| Milestone Achieved | `milestone` | Progress update |
| Weekly Summary | `weekly-digest` | Scheduled |
| Password Reset | `password-reset` | User request |

---

## Security Architecture

### Multi-Tenancy Isolation

```
┌─────────────────────────────────────────────────────────────┐
│  REQUEST FLOW WITH ISOLATION                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Request arrives at API Gateway                          │
│     └── JWT in Authorization header                         │
│                                                             │
│  2. Cognito Authorizer validates JWT                        │
│     └── Extracts coach_id, role, tier                       │
│                                                             │
│  3. Lambda receives validated claims                        │
│     └── coach_id injected into context                      │
│                                                             │
│  4. Database queries ALWAYS filter by coach_id              │
│     └── WHERE coach_id = $context.coach_id                  │
│                                                             │
│  5. S3 access scoped by path                                │
│     └── s3://bucket/coaches/{coach_id}/*                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### IAM Roles

| Role | Permissions |
|------|-------------|
| `TennisProLambdaExecution` | Aurora, S3, SES, SNS, Secrets Manager |
| `TennisProStepFunctions` | Lambda invoke, S3, EventBridge |
| `TennisProCognitoAuth` | Cognito user operations |

### Data Protection

| Layer | Protection |
|-------|------------|
| Transit | TLS 1.3 everywhere |
| Rest (DB) | AWS KMS encryption |
| Rest (S3) | SSE-S3 or SSE-KMS |
| Secrets | Secrets Manager with rotation |
| PII | Encrypted columns for sensitive data |

---

## Infrastructure as Code

### Recommended: AWS CDK (TypeScript)

```
infrastructure/
├── bin/
│   └── tennispro.ts           # Entry point
├── lib/
│   ├── stacks/
│   │   ├── auth-stack.ts      # Cognito
│   │   ├── database-stack.ts  # Aurora
│   │   ├── api-stack.ts       # API Gateway + Lambda
│   │   ├── storage-stack.ts   # S3 + CloudFront
│   │   ├── workflow-stack.ts  # Step Functions
│   │   └── monitoring-stack.ts # CloudWatch
│   └── constructs/
│       ├── lambda-function.ts # Reusable Lambda construct
│       └── api-endpoint.ts    # Reusable API construct
├── cdk.json
└── package.json
```

**Why CDK over Terraform:**
- TypeScript consistency with Lambda code
- Higher-level constructs
- Better AWS-native integration
- Easier refactoring

---

## Cost Projection (AWS Native)

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
| **Total** | | **~$90-135/mo** |

### Growth Phase (100 Coaches, 1000 Students)

| Service | Configuration | Monthly Cost |
|---------|---------------|--------------|
| Cognito | ~1,200 MAUs | $0 (free tier) |
| Aurora Serverless v2 | 1-4 ACU | $90-180 |
| RDS Proxy | 1 instance | $18 |
| API Gateway | ~5M requests | $17.50 |
| Lambda | ~10M invocations | $2 |
| S3 | 500GB stored | $11.50 |
| CloudFront | 500GB transfer | $42.50 |
| SES | 50K emails | $5 |
| Step Functions | 50K executions | $12.50 |
| CloudWatch | Enhanced | $20 |
| **Total** | | **~$220-310/mo** |

### Scale Phase (500 Coaches, 5000 Students)

| Service | Monthly Cost |
|---------|--------------|
| Cognito | ~$30 |
| Aurora | $300-500 |
| API Gateway + Lambda | $75 |
| S3 + CloudFront | $200 |
| SES + SNS | $30 |
| Step Functions | $50 |
| CloudWatch | $50 |
| Analytics (Athena) | $50 |
| **Total** | **~$800-1000/mo** |

---

## Development Approach

### Phase 1: Foundation (Weeks 1-3)
1. Set up AWS CDK project structure
2. Deploy Cognito user pools
3. Deploy Aurora PostgreSQL + RDS Proxy
4. Create base Lambda layer with dependencies
5. Set up CI/CD (GitHub Actions → AWS)

### Phase 2: Core API (Weeks 4-6)
1. Implement auth endpoints
2. Build coach/student CRUD
3. Create progression path APIs
4. Set up S3 upload flow
5. WebSocket for notifications

### Phase 3: Integration (Weeks 7-8)
1. Connect Vercel → API Gateway
2. Integrate Sanity webhooks
3. Modal.com → S3 → Step Functions flow
4. Email templates in SES

### Recommended Lambda Framework

**Option A: SST (Serverless Stack)**
- Built on CDK
- Great DX for serverless
- Live Lambda development
- Built-in patterns

**Option B: Plain CDK + Custom**
- More control
- No additional abstraction
- Steeper learning curve

**Recommendation:** Start with SST for faster development, can eject to plain CDK if needed.

---

## Migration Prevention Checklist

By choosing AWS native, we avoid these future migrations:

| Would Have Been | Now Is | Migration Avoided |
|-----------------|--------|-------------------|
| Supabase Auth → Cognito | Cognito from start | User migration, token changes |
| Supabase DB → Aurora | Aurora from start | Schema migration, RLS rewrite |
| Supabase Storage → S3 | S3 from start | File migration, URL changes |
| Supabase Realtime → AppSync/WS | WebSocket from start | Client refactor |
| External analytics → AWS | AWS path ready | Data pipeline rebuild |

---

## Next Steps

1. [x] ~~Make platform decision~~ → **AWS Native**
2. [ ] Update TPv1_Plan.md with final architecture
3. [ ] Create detailed infrastructure specification
4. [ ] Set up AWS CDK project
5. [ ] Begin foundation deployment

---

*Decision finalized: 2025-12-06*
