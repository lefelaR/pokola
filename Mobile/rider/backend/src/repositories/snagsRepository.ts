import DynamoDatabaseService from "@services/DynamoDatabaseService";
import Snag from "@models/snag.model";
import Issue from "@models/issue.model";

const snagTable = process.env.USER_SNAGS_TABLE;

export const createSnag = async (snag: Snag) => {
  const params = {
    TableName: snagTable,
    Item: {
      ...snag.mapEntity(),
    },
  };

  return await DynamoDatabaseService.create(params);
};

export const getAllSnags = async () => {
  const params = {
    TableName: snagTable,
  };
  const snags = await DynamoDatabaseService.scan(params);

  return snags.Items;
};

export const getSnag = async (userId, snagId) => {
  const params = {
    TableName: snagTable,
    Key: { userid: userId, id: snagId },
  };

  const data = await DynamoDatabaseService.get(params);
  return data.Item;
};

export const getUserSnags = async (userid) => {
  const params = {
    TableName: snagTable,
    KeyConditionExpression: "userid = :userid",
    ExpressionAttributeValues: { ":userid": userid },
  };

  const snags = await DynamoDatabaseService.query(params);

  return snags.Items;
};

export const deleteSnag = async (snagId, userId) => {
  const params = {
    TableName: snagTable,
    Key: { userid: userId, id: snagId },
  };

  return await DynamoDatabaseService.delete(params);
};

export const addIssue = async (issue: Issue, snag) => {
  snag.issues && snag.issues.push(issue.mapEntity());
  const params = {
    TableName: snagTable,
    Key: { userid: snag.userid, id: snag.id },
    UpdateExpression: "SET issues = :issue",
    ExpressionAttributeValues: {
      ":issue": snag.issues,
    },
    ReturnValues: "UPDATED_NEW",
  };

  const data = await DynamoDatabaseService.update(params);
  return data;
};

export const deleteIssue = async (snag, issueId) => {
  const issue = snag.issues.filter((issue) => issue.id !== issueId);

  const params = {
    TableName: snagTable,
    Key: { userid: snag.userid, id: snag.id },
    UpdateExpression: "SET issues = :issue",
    ExpressionAttributeValues: {
      ":issue": issue,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return await DynamoDatabaseService.update(params);
};

export const updateSnag = async (snag) => {
  const params = {
    TableName: snagTable,
    Key: { userid: snag.userid, id: snag.id },
    UpdateExpression: "SET title = :title",
    ExpressionAttributeValues: {
      ":title": snag.title,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return await DynamoDatabaseService.update(params);
};

export const updateDescription = async (snag) => {
  const params = {
    TableName: snagTable,
    Key: { userid: snag.userid, id: snag.id },
    UpdateExpression: `SET issues = :issues`,
    ExpressionAttributeValues: {
      ":issues": snag.issues,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return await DynamoDatabaseService.update(params);
};

export const updateIssue = async (snag) => {
  const params = {
    TableName: snagTable,
    Key: { userid: snag.userid, id: snag.id },
    UpdateExpression: `SET issues = :issues`,
    ExpressionAttributeValues: {
      ":issues": snag.issues,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return await DynamoDatabaseService.update(params);
};

export const deleteSnags = async () => {};
// export const getIssue = async () => {};

export const updateSnagImages = async (snag) => {
  const params = {
    TableName: snagTable,
    Key: { userid: snag.userid, id: snag.id },
    UpdateExpression: `SET issues = :issues`,
    ExpressionAttributeValues: {
      ":issues": snag.issues,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return await DynamoDatabaseService.update(params);
};