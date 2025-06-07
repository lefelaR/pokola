import "source-map-support/register";
import { middyfy } from "@common/lambda";
import ResponseModel, { StatusCode } from "@common/response.model";
import { formatJSONResponse } from "@common/apiGateway";
import { getSnag, updateSnagImages } from "@repositories/snagsRepository";

const update = async (event: any) => {
  const snagId = event.pathParameters.snagId;
  const issueId = event.pathParameters.issueId;
  const userId = event.requestContext.authorizer.claims.sub;
  const imageId = event.pathParameters.imageId;

  const path = event.body;
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
        issue.images.map((image) => {
          console.log("image: ", image);
          if (image.id === imageId) {
            console.log("imagePath: ",image.path);
            image.path = path;
          }
        });
      }
      return issue;
    });
    console.log("updatedSnag: ", snag.issues.map(issue => issue));
    const data = await updateSnagImages(snag);
    console.log("this is data: ", data);
    return formatJSONResponse(
      new ResponseModel(data, StatusCode.OK, "Snag updated")
    );
  } catch (e) {
    const response =
      e instanceof ResponseModel
        ? e
        : new ResponseModel(null, StatusCode.ERROR, e.message);
    return response.generate();
  }
};

export const main = middyfy(update);
