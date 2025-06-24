import "source-map-support/register";
import ResponseModel, { StatusCode } from "@common/response.model";
import { deleteIssue, getSnag } from "@repositories/snagsRepository";
import { APIGatewayEvent } from "aws-lambda";
import { middyfy } from "@common/lambda";

const issueDelete = async (event: APIGatewayEvent) => {
  try {
    const { snagId, issueId } = event.pathParameters;
    const userId = event.requestContext.authorizer.claims.sub;
    let snag = await getSnag(userId, snagId);

    if (!snag)
      return new ResponseModel(
        {},
        StatusCode.NOT_FOUND,
        `Item with id ${snagId} does not exist.`
      ).generate();

    const data = await deleteIssue(snag, issueId);

    return ResponseModel.ok(data, "Issue deleted");
  } catch (error) {
    const response =
      error instanceof ResponseModel
        ? error
        : new ResponseModel(null, StatusCode.ERROR, error.message);
    return response.generate();
  }
};
export const main = middyfy(issueDelete);
