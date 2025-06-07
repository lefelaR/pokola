export default {
  UserSnagsTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Delete",
    Properties: {
      TableName: "${self:provider.environment.USER_SNAGS_TABLE}",
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [
        { AttributeName: "userid", AttributeType: "S" },
        { AttributeName: "id", AttributeType: "S" },
      ],
      KeySchema: [
        { AttributeName: "userid", KeyType: "HASH" },
        { AttributeName: "id", KeyType: "RANGE" },
      ],
    },
  },
  IssuesTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Delete",
    Properties: {
      TableName: "${self:provider.environment.USER_ISSUES_TABLE}",
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    },
  },
  UsersTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Delete",
    Properties: {
      TableName: "${self:provider.environment.USERS_TABLE}",
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    },
  },
  FeedbackTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Delete",
    Properties: {
      TableName: "${self:provider.environment.FEEDBACK_TABLE}",
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    },
  },
};
