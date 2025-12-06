import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface NetworkStackProps extends cdk.StackProps {
  environment: string;
}

export class NetworkStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props: NetworkStackProps) {
    super(scope, id, props);

    // Create VPC for both environments
    // Dev uses minimal config (no NAT gateway, isolated private subnets) to save costs
    // Prod uses full config with NAT gateway for Lambda internet access
    this.vpc = new ec2.Vpc(this, 'TennisProVpc', {
      maxAzs: 2,
      natGateways: props.environment === 'prod' ? 1 : 0,
      subnetConfiguration:
        props.environment === 'prod'
          ? [
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
            ]
          : [
              {
                name: 'Public',
                subnetType: ec2.SubnetType.PUBLIC,
                cidrMask: 24,
              },
              {
                name: 'Isolated',
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                cidrMask: 24,
              },
            ],
    });

    // Output VPC ID
    new cdk.CfnOutput(this, 'VpcId', {
      value: this.vpc.vpcId,
      exportName: `${props.environment}-TennisProVpcId`,
    });
  }
}
