import "source-map-support/register";
import { formatJSONResponse } from "@common/apiGateway";
import { middyfy } from "@common/lambda";
import { APIGatewayEvent } from "aws-lambda";
import { deleteSnag } from "@repositories/snagsRepository";
import ResponseModel, { StatusCode } from "@common/response.model";

const deleteSnagHandler = async (event: APIGatewayEvent) => {
  const snagId = event.pathParameters.snagId;
  const userId = event.requestContext.authorizer.claims.sub;
  await deleteSnag(snagId, userId);

  return formatJSONResponse(
    new ResponseModel({}, StatusCode.OK, "Item deleted")
  );
};

export const main = middyfy(deleteSnagHandler);
