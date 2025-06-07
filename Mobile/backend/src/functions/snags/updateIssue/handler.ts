import "source-map-support/register";
import { middyfy } from "@common/lambda";
import ResponseModel, { StatusCode } from "@common/response.model";
import { formatJSONResponse } from "@common/apiGateway";
import { getSnag, updateIssue } from "@repositories/snagsRepository";

const update = async (event: any) => {
  const snagId = event.pathParameters.snagId;
  const issueId = event.pathParameters.issueId;

  const userId = event.requestContext.authorizer.claims.sub;

  const title = event.body;

  try {
    const snag = await getSnag(userId, snagId);

    if (!snag)
      return new ResponseModel(
        {},
        StatusCode.NOT_FOUND,
        `Item with id ${snagId} does not exist.`
      ).generate();
    snag.issues = snag.issues.map((issue) => {
      if (issue.id === issueId) {
        issue.title = title;
        issue.updatedAt = new Date().getTime();
      }
      return issue;
    });

    const data = await updateIssue(snag);

    return formatJSONResponse(
      new ResponseModel(data, StatusCode.OK, "Snag updated")
    );
  } catch (e: any) {
    return e.generate();
  }
};

export const main = middyfy(update);
