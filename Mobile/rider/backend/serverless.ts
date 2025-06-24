import type { AWS } from "@serverless/typescript";
import * as feedbackFunctions from "@functions/feedback";
import * as snagsFunctions from "@functions/snags";
import * as userFunctions from "@functions/users";
import * as lambdaTriggers from "@functions/lambda-triggers";
import dynamoDbTables from "./resources/dynamodb-tables";

const serverlessConfiguration: AWS = {
  service: "snagit",
  frameworkVersion: "3",
  plugins: [
    "serverless-better-credentials",
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-central-1",
    tracing: {
      apiGateway: true,
      lambda: true,
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    stage: "stag",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      ADMIN_EMAIL: "lesego@turati.co.za",
      USER_SNAGS_TABLE: "${self:service}-${self:provider.stage}-user-snags",
      USER_ISSUES_TABLE: "${self:service}-${self:provider.stage}-user-issues",
      USERS_TABLE: "${self:service}-${self:provider.stage}-users",
      FEEDBACK_TABLE: "${self:service}-${self:provider.stage}-feedback",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["xray:PutTraceSegments", "xray:PutTelemetryRecords"],
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: "events:PutEvents",
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: ["s3:*"],
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: ["lambda:InvokeFunction"],
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: ["ses:*"],
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: ["sns:*"],
            Resource: "*",
          },
          {
            Sid: "VisualEditor0",
            Effect: "Allow",
            Action: [
              "cloudformation:CreateStack",
              "cloudformation:DeleteStack",
              "cloudformation:DescribeStacks",
              "cloudformation:DescribeStackEvents",
              "cloudformation:DescribeStackResource",
              "cloudformation:DescribeStackResources",
              "cloudformation:ListStackResources",
              "cloudformation:UpdateStack",
              "cloudformation:ValidateTemplate",
              "logs:CreateLogGroup",
              "logs:DescribeLogGroups",
              "logs:DeleteLogGroup",
            ],
            Resource: "*",
          },
        ],
      },
    },
    deploymentBucket: {
      name: "turati-serverless-framework-deployments",
      serverSideEncryption: "AES256",
    },
  },
  // import the function via paths
  functions: {
    ...snagsFunctions,
    ...userFunctions,
    ...feedbackFunctions,
    ...lambdaTriggers,
  },

  resources: {
    Resources: dynamoDbTables,
  },
  package: { patterns: ["!.dynamodb/**", "!node_modules/**"] },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    prune: {
      automatic: true,
      includeLayers: true,
    },
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    dynamodb: {
      stages: ["dev", "stag", "prod"],
      start: {
        port: 8000,
        dbPath: "./",
        migrate: true,
      },
    },

    splitStacks: {
      perFunction: false,
      perType: true,
      perGroupFunction: false,
    },
  },
};

module.exports = serverlessConfiguration;
