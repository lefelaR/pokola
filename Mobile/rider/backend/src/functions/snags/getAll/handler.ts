import "source-map-support/register";
import { getAllSnags, getUserSnags } from "@repositories/snagsRepository";
import ResponseModel, { StatusCode } from "@common/response.model";
import { middyfy } from "@common/lambda";

const getAll = async (event: any) => {
  const userId = event.requestContext.authorizer.claims.sub;
  if (userId) {
    try {
      const data = await getUserSnags(userId);

      return new ResponseModel(data, StatusCode.OK).generate();
    } catch (e: any) {
      const response =
        e instanceof ResponseModel
          ? e
          : new ResponseModel({}, StatusCode.ERROR, e.message);
      return response.generate();
    }
  }

  try {
    const data = await getAllSnags();

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
