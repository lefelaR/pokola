import "source-map-support/register";
import { getSnag } from "@repositories/snagsRepository";
import ResponseModel, { StatusCode } from "@common/response.model";
import { middyfy } from "@common/lambda";

const getAll = async (event: any) => {
  try {
    const userid = event.requestContext.authorizer.claims.sub;
    const { snagId } = event.pathParameters;
    const data = await getSnag(userid, snagId);

    return new ResponseModel(data, StatusCode.OK).generate();
  } catch (e: any) {
    const response =
      e instanceof ResponseModel
        ? e
        : new ResponseModel({}, StatusCode.ERROR, e.message);
    return response.generate();
  }
};

export const main = middyfy(getAll);
