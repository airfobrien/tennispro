# AWS Environment Management

This document covers managing AWS infrastructure costs and lifecycle for the TennisPro project.

## Quick Reference

| Action | Command |
|--------|---------|
| Deploy dev | `cd infrastructure && pnpm run deploy:dev` |
| Deploy prod | `cd infrastructure && pnpm run deploy:prod` |
| Destroy dev | `cd infrastructure && pnpm cdk destroy --all -c environment=dev --profile tennispro` |
| Check diff | `cd infrastructure && pnpm run diff` |

## Environment Costs (Estimated)

### Dev Environment (~$55-65/month if running 24/7)

| Resource | Cost | Notes |
|----------|------|-------|
| Aurora Serverless v2 | ~$43/month | 0.5 ACU minimum, scales with load |
| RDS Proxy | ~$11/month | Always running when stack exists |
| Secrets Manager | ~$0.40/month | Per secret stored |
| S3 | ~$0.02/GB | Storage only, negligible for dev |
| CloudFront | Pay per request | Free tier covers dev usage |
| Cognito | Free | Up to 50k MAU |
| VPC | Free | No NAT gateway in dev |

### Prod Environment (~$100-150/month baseline)

Additional costs vs dev:
- NAT Gateway: ~$32/month + data transfer
- Aurora reader instance (scales with writer)
- Higher Aurora max capacity (16 ACU vs 4)

## Shutting Down Dev Environment

To completely remove all dev resources and stop all costs:

```bash
cd infrastructure
pnpm cdk destroy --all -c environment=dev --profile tennispro
```

You'll be prompted to confirm each stack deletion. Order of deletion:
1. Database (depends on Network)
2. Storage (independent)
3. Auth (independent)
4. Network (deleted last)

**Time to destroy:** ~5-10 minutes
**Time to redeploy:** ~12-15 minutes (Aurora + RDS Proxy creation is slow)

## Pausing vs Destroying

### Option 1: Full Destroy (Recommended for Dev)
- Removes everything
- Zero ongoing costs
- Clean slate on redeploy
- Cognito users are deleted
- Database data is deleted

### Option 2: Stop Aurora Only (Keep Other Resources)
Stops the database but keeps VPC, Cognito, S3:

```bash
# Get cluster identifier
aws rds describe-db-clusters --profile tennispro --query 'DBClusters[?contains(DBClusterIdentifier, `tennispro-dev`)].DBClusterIdentifier' --output text

# Stop the cluster (saves ~$43/month)
aws rds stop-db-cluster --db-cluster-identifier <cluster-id> --profile tennispro

# Restart when needed
aws rds start-db-cluster --db-cluster-identifier <cluster-id> --profile tennispro
```

**Note:** Aurora auto-restarts after 7 days. You'd need to stop it again.

### Option 3: Delete Database Stack Only
Removes database but keeps networking, auth, storage:

```bash
cd infrastructure
pnpm cdk destroy TennisPro-dev-Database -c environment=dev --profile tennispro
```

## Checking What's Running

```bash
# List all CloudFormation stacks
aws cloudformation list-stacks --profile tennispro \
  --query 'StackSummaries[?StackStatus!=`DELETE_COMPLETE`].{Name:StackName,Status:StackStatus}' \
  --output table

# Check Aurora clusters
aws rds describe-db-clusters --profile tennispro \
  --query 'DBClusters[].{ID:DBClusterIdentifier,Status:Status,Engine:Engine}' \
  --output table

# Check S3 buckets
aws s3 ls --profile tennispro | grep tennispro
```

## Cost Monitoring

Set up AWS Budget alerts to avoid surprises:

```bash
# Create a $50 monthly budget with email alert
aws budgets create-budget --profile tennispro \
  --account-id 053903062427 \
  --budget '{
    "BudgetName": "TennisPro-Dev-Monthly",
    "BudgetLimit": {"Amount": "50", "Unit": "USD"},
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST"
  }' \
  --notifications-with-subscribers '[{
    "Notification": {
      "NotificationType": "ACTUAL",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 80,
      "ThresholdType": "PERCENTAGE"
    },
    "Subscribers": [{"SubscriptionType": "EMAIL", "Address": "your-email@example.com"}]
  }]'
```

## Data Persistence

### What's Lost on Destroy (Dev)
- Aurora database and all data
- Cognito user accounts
- S3 bucket contents
- Secrets Manager secrets

### What's Preserved
- CDK code (in git)
- Infrastructure configuration
- Can redeploy identical infrastructure anytime

### Prod Environment
Prod uses `RemovalPolicy.RETAIN` for:
- Aurora cluster
- S3 buckets (videos, assets)
- Cognito user pool

This prevents accidental data loss even if stack is destroyed.

## Deployment Workflow

```
feature branch → staging → master
                    ↓
              deploy to dev
                    ↓
              test & validate
                    ↓
              deploy to prod (from master)
```

## Troubleshooting

### Stack Deletion Fails
If a stack fails to delete (usually due to non-empty S3 buckets):

```bash
# Empty bucket first
aws s3 rm s3://bucket-name --recursive --profile tennispro

# Then retry destroy
pnpm cdk destroy TennisPro-dev-Storage -c environment=dev --profile tennispro
```

### Stack in ROLLBACK_COMPLETE State
Delete manually before redeploying:

```bash
aws cloudformation delete-stack --stack-name TennisPro-dev-Database --profile tennispro
```

### Check Stack Events for Errors
```bash
aws cloudformation describe-stack-events --stack-name TennisPro-dev-Database \
  --profile tennispro --query 'StackEvents[?ResourceStatus==`CREATE_FAILED`]'
```
