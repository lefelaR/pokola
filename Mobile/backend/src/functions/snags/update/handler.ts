import "source-map-support/register";
import { middyfy } from "@common/lambda";
import ResponseModel, { StatusCode } from "@common/response.model";
import { formatJSONResponse } from "@common/apiGateway";
import { getSnag, updateSnag } from "@repositories/snagsRepository";

const update = async (event: any) => {
  const snagId = event.pathParameters.snagId;
  const userId = event.requestContext.authorizer.claims.sub;
  const title = event.body;

  try {
    const dbItem = await getSnag(userId, snagId);
    if (!dbItem)
      return new ResponseModel(
        {},
        StatusCode.NOT_FOUND,
        `Item with id ${snagId} does not exist.`
      ).generate();

    dbItem.title = title;
    console.log("This is the dbItem: ", dbItem);
    const data = await updateSnag(dbItem);

    return formatJSONResponse(
      new ResponseModel(data, StatusCode.OK, "Snag updated")
    );
  } catch (e: any) {
    return e.generate();
  }
};

export const main = middyfy(update);
