#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';

import { AuthStack } from '../lib/stacks/auth-stack';
import { DatabaseStack } from '../lib/stacks/database-stack';
import { NetworkStack } from '../lib/stacks/network-stack';
import { StorageStack } from '../lib/stacks/storage-stack';

const app = new cdk.App();

// Get environment from context (default to 'dev')
const environment = app.node.tryGetContext('environment') || 'dev';
const environments = app.node.tryGetContext('environments');
const envConfig = environments?.[environment];

if (!envConfig) {
  throw new Error(`Environment configuration not found for: ${environment}`);
}

const env = {
  account: envConfig.account,
  region: envConfig.region,
};

// Stack naming prefix
const prefix = `TennisPro-${environment}`;

// Network Stack
const networkStack = new NetworkStack(app, `${prefix}-Network`, {
  env,
  environment,
  description: `TennisPro Network Stack (${environment})`,
});

// Auth Stack
const authStack = new AuthStack(app, `${prefix}-Auth`, {
  env,
  environment,
  domainPrefix: `tennispro-${environment}`,
  callbackUrls:
    environment === 'prod'
      ? ['https://tennispro.com/api/auth/callback']
      : ['http://localhost:3000/api/auth/callback', 'https://dev.tennispro.com/api/auth/callback'],
  logoutUrls:
    environment === 'prod'
      ? ['https://tennispro.com']
      : ['http://localhost:3000', 'https://dev.tennispro.com'],
  description: `TennisPro Auth Stack (${environment})`,
});

// Database Stack
const databaseStack = new DatabaseStack(app, `${prefix}-Database`, {
  env,
  environment,
  vpc: networkStack.vpc,
  description: `TennisPro Database Stack (${environment})`,
});
databaseStack.addDependency(networkStack);

// Storage Stack
const storageStack = new StorageStack(app, `${prefix}-Storage`, {
  env,
  environment,
  description: `TennisPro Storage Stack (${environment})`,
});

// Tags for all resources
cdk.Tags.of(app).add('Project', 'TennisPro');
cdk.Tags.of(app).add('Environment', environment);
cdk.Tags.of(app).add('ManagedBy', 'CDK');
