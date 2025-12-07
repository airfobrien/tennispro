# TennisProPlus Git Workflow

## Branch Strategy

```
master (production) ◄─────────────────────────── merge when tested
                                                       ↑
staging (testing) ◄──────────────────────────── merge features here
       ↑                                               ↑
       └─────── feature/* (development) ───────────────┘
                    ↑
                pull from staging
```

## Branches

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `master` | Production code - only merge from staging | Production |
| `staging` | Testing/QA environment | Staging |
| `feature/*` | Development work | Local only |

## Workflow

### 1. Start New Feature
```bash
# Always pull from staging
git checkout staging
git pull origin staging
git checkout -b feature/TG-XX-description
```

### 2. Complete Feature → Merge to Staging
```bash
# Push feature branch
git push origin feature/TG-XX-description

# Create PR targeting STAGING
gh pr create --base staging --title "feat(TG-XX): description"

# After review, merge to staging
# Delete feature branch
```

### 3. Promote Staging → Production (when testing is good)
```bash
# Create PR from staging to master
gh pr create --base master --head staging --title "Release: description"

# Or merge directly if no PR required:
git checkout master
git merge staging
git push origin master
```

## Key Rules

1. **Feature branches ALWAYS branch from staging**
2. **Feature PRs ALWAYS target staging**
3. **Only staging merges to master** (never feature → master directly)
4. **Master = Production** - only merge when staging is tested and stable

## Claude Code Checklist

Before any git operation:
- [ ] Check current branch: `git branch --show-current`
- [ ] Verify staging/master sync status when promoting

After merging to staging:
- [ ] Confirm feature is in staging
- [ ] Ask user if ready to promote to production

After merging to master:
- [ ] Verify master and staging match (they should after a promotion)

## Quick Commands

```bash
# Start new feature
git checkout staging && git pull && git checkout -b feature/TG-XX-name

# Check what's in staging vs master
git log staging --oneline -5
git log master --oneline -5
git log master..staging --oneline  # commits in staging not in master

# Promote staging to production
git checkout master && git merge staging && git push origin master
```

## Visual Flow

```
Time →

feature/TG-22 ──●──●──●─┐
                       ↓ PR merge
staging ───────●───────●───────●───────●─┐
                                         ↓ promote when ready
master ────────●───────────────────────●─●
               ↑                         ↑
           last release              new release
```

---

*Last updated: 2024-12-06*
