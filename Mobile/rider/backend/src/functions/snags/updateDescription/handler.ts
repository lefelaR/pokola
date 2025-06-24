import "source-map-support/register";
import { middyfy } from "@common/lambda";
import ResponseModel, { StatusCode } from "@common/response.model";
import { formatJSONResponse } from "@common/apiGateway";
import { getSnag, updateDescription } from "@repositories/snagsRepository";

const update = async (event: any) => {
  const snagId = event.pathParameters.snagId;
  const issueId = event.pathParameters.issueId;

  const userId = event.requestContext.authorizer.claims.sub;
  console.log(event.body);
  const longDescription = event.body.longDescription;
  const title = event.body.title;

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
        issue.longDescription = longDescription;
        issue.title = title;
        issue.updatedAt = new Date().getTime();
      }
      return issue;
    });

    const data = await updateDescription(snag);

    return formatJSONResponse(
      new ResponseModel(data, StatusCode.OK, "Snag updated")
    );
  } catch (e: any) {
    return e.generate();
  }
};

export const main = middyfy(update);
