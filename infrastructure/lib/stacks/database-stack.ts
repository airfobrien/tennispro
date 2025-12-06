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

    // Allow inbound from VPC (for Lambda)
    this.securityGroup.addIngressRule(
      ec2.Peer.ipv4(props.vpc.vpcCidrBlock),
      ec2.Port.tcp(5432),
      'Allow PostgreSQL from VPC'
    );

    // Aurora Serverless v2 Cluster
    this.cluster = new rds.DatabaseCluster(this, 'TennisProCluster', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_16_6,
      }),
      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: props.environment === 'prod' ? 16 : 4,
      writer: rds.ClusterInstance.serverlessV2('Writer', {
        publiclyAccessible: false,
      }),
      readers:
        props.environment === 'prod'
          ? [
              rds.ClusterInstance.serverlessV2('Reader', {
                scaleWithWriter: true,
              }),
            ]
          : [],
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      securityGroups: [this.securityGroup],
      defaultDatabaseName: 'tennispro',
      storageEncrypted: true,
      backup: {
        retention: cdk.Duration.days(props.environment === 'prod' ? 30 : 7),
      },
      removalPolicy:
        props.environment === 'prod' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
    });

    this.secret = this.cluster.secret!;

    // RDS Proxy for Lambda connections
    this.proxy = new rds.DatabaseProxy(this, 'TennisProProxy', {
      proxyTarget: rds.ProxyTarget.fromCluster(this.cluster),
      secrets: [this.secret],
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
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
