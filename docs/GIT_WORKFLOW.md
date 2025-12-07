# TennisProPlus Git Workflow

## Branch Strategy

```
main/master ─────────────────────────────────────────────►  (production-ready)
                    ↑
staging ────────────┴────────────────────────────────────►  (pre-production)
                    ↑
feature/* ──────────┘                                       (development)
```

## Branches

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `master` | Production-ready code | Production |
| `staging` | Pre-production testing | Staging environment |
| `feature/*` | New features/fixes | Local only |

## Workflow Rules

### 1. Feature Development
```bash
# Always branch from staging (which should match master)
git checkout staging
git pull origin staging
git checkout -b feature/TG-XX-description
```

### 2. Completing a Feature
```bash
# Create PR targeting staging first
gh pr create --base staging --title "feat: description"

# After PR is merged to staging and tested:
# Create PR from staging to master
gh pr create --base master --head staging --title "Release: description"
```

### 3. Keeping Branches in Sync
**CRITICAL: staging and master must always be in sync after releases**

```bash
# After any merge to master, immediately sync staging:
git checkout staging
git merge master
git push origin staging
```

### 4. Hotfixes (Production Issues)
```bash
# Branch from master for urgent fixes
git checkout master
git checkout -b hotfix/description

# After fix, merge to BOTH master and staging
gh pr create --base master
# Then sync staging
```

## Claude Code Rules

When working with git in this repository:

1. **Before switching branches**: Always run `git fetch && git log --oneline origin/master -1 && git log --oneline origin/staging -1` to check if branches are in sync

2. **After merging any PR to master**: Always ask "Should I sync staging with master?"

3. **Never merge directly to master**: All changes go through staging first (except hotfixes)

4. **PR workflow**:
   - Feature branches → staging (via PR)
   - staging → master (via PR, after testing)

5. **After completing a PR merge**: Verify both branches are at the same commit

## Quick Reference

```bash
# Check if staging and master are in sync
git fetch origin
git log origin/master --oneline -1
git log origin/staging --oneline -1

# Sync staging with master
git checkout staging && git merge origin/master && git push origin staging

# Sync master with staging (after staging is tested)
git checkout master && git merge origin/staging && git push origin master
```

## Branch Protection (Recommended)

Consider enabling these GitHub branch protection rules:

- **master**: Require PR reviews, require status checks
- **staging**: Require PR (no direct pushes)

---

*Last updated: 2024-12-06*
