# Git Practices for TennisPro

This document defines git conventions and best practices for the TennisPro project.

---

## Branch Strategy

### Main Branches

| Branch | Purpose | Protected |
|--------|---------|-----------|
| `master` | Production-ready code | Yes |
| `staging` | Pre-production testing | Yes |

### Feature Branches

**Naming Convention:** `feature/TG-XX-short-description`

- `TG-XX` corresponds to the Task Group from `TPv1_Tasks.md`
- Use lowercase with hyphens
- Keep descriptions concise (2-4 words)

**Examples:**
```
feature/TG-01-project-foundation
feature/TG-02-aws-infrastructure
feature/TG-08-nextjs-foundation
```

### Other Branch Types

| Prefix | Purpose | Example |
|--------|---------|---------|
| `bugfix/` | Bug fixes | `bugfix/TG-05-api-auth-error` |
| `hotfix/` | Urgent production fixes | `hotfix/critical-security-patch` |
| `chore/` | Maintenance, deps, docs | `chore/update-dependencies` |

---

## Branch Workflow

```
master (production)
  │
  └── staging (pre-production)
        │
        └── feature/TG-XX-* (development)
```

### Flow

1. Create feature branch from `staging`
2. Develop and commit on feature branch
3. PR: feature → staging (code review required)
4. PR: staging → master (after QA approval)

---

## Commit Message Format

### Structure

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change, no new feature or fix |
| `test` | Adding/updating tests |
| `chore` | Maintenance, build, deps |
| `perf` | Performance improvement |

### Scope (Optional)

Use the package or area affected:
- `web` - Next.js frontend
- `api` - Lambda/API handlers
- `infra` - CDK/Infrastructure
- `shared` - Shared packages
- `cms` - Sanity CMS
- `db` - Database/Prisma

### Subject

- Use imperative mood ("add" not "added" or "adds")
- No period at the end
- Max 72 characters
- Capitalize first letter

### Examples

```
feat(web): add coach dashboard layout

fix(api): handle null student in progression endpoint

chore(infra): update CDK to v2.120

docs: add API endpoint documentation

refactor(shared): extract validation utilities
```

### Multi-line Commits

For complex changes, include a body:

```
feat(api): implement video upload presigned URLs

- Add presigned URL generation Lambda
- Configure S3 CORS for direct uploads
- Add file type and size validation
- Return CloudFront URL for playback

Closes TG-06-003
```

---

## Pull Request Guidelines

### PR Title

Follow commit message format:
```
feat(web): add student progress dashboard
```

### PR Description Template

```markdown
## Summary
Brief description of changes (1-3 bullet points)

## Task Reference
- Task Group: TG-XX
- Subtasks: TG-XX-001, TG-XX-002

## Changes
- List specific changes made

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if UI changes)
[Add screenshots here]
```

### PR Rules

1. **One task group per PR** when possible
2. **Keep PRs focused** - split large changes
3. **Self-review before requesting** - check diff, run tests
4. **Resolve all comments** before merging
5. **Squash commits** when merging to staging/master

---

## Protected Branch Rules

### Master Branch

- Require PR for all changes
- Require at least 1 approval
- Require status checks to pass
- No force pushes
- No deletions

### Staging Branch

- Require PR for all changes
- Require status checks to pass
- No force pushes

---

## Common Git Commands

### Starting Work on a Task Group

```bash
# Ensure staging is up to date
git checkout staging
git pull origin staging

# Create feature branch
git checkout -b feature/TG-XX-description
```

### Daily Workflow

```bash
# Check status
git status

# Stage changes
git add <files>        # Specific files
git add -p             # Interactive staging

# Commit
git commit -m "type(scope): message"

# Push feature branch
git push -u origin feature/TG-XX-description
```

### Keeping Feature Branch Updated

```bash
# Rebase on staging (preferred for clean history)
git fetch origin
git rebase origin/staging

# Or merge (if conflicts are complex)
git merge origin/staging
```

### After PR Merged

```bash
# Switch to staging
git checkout staging
git pull origin staging

# Delete local feature branch
git branch -d feature/TG-XX-description

# Delete remote feature branch (if not auto-deleted)
git push origin --delete feature/TG-XX-description
```

---

## Git Configuration

### Recommended Global Settings

```bash
# Set default branch name
git config --global init.defaultBranch master

# Enable rebase on pull
git config --global pull.rebase true

# Set merge conflict style
git config --global merge.conflictstyle diff3

# Prune deleted remote branches on fetch
git config --global fetch.prune true

# Sign commits (if using GPG)
git config --global commit.gpgsign true
```

### Project-Specific Settings

These are set in `.git/config` or via commands in the repo:

```bash
# Set upstream tracking
git config push.autoSetupRemote true
```

---

## .gitignore Essentials

The project `.gitignore` should include:

```
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
.next/
cdk.out/
*.tsbuildinfo

# Environment
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Misc
*.bak
*.tmp
```

---

## Troubleshooting

### Undo Last Commit (Keep Changes)

```bash
git reset --soft HEAD~1
```

### Discard Local Changes

```bash
git checkout -- <file>      # Single file
git checkout -- .           # All files
```

### Fix Commit Message

```bash
git commit --amend -m "new message"
```

### Stash Work in Progress

```bash
git stash push -m "WIP: description"
git stash list
git stash pop
```

---

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
