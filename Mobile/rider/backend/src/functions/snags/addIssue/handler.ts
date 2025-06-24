import "source-map-support/register";
import ResponseModel, { StatusCode } from "@common/response.model";
import { getSnag, addIssue } from "@repositories/snagsRepository";
// import Snag from "@models/snag.model";
import Issue from "@models/issue.model";
import { middyfy } from "@common/lambda";
import Image from "@models/image.model";

const add = async (event: any) => {
  try {
    const { body } = event;
    const { snagId } = event.pathParameters;
    const userId = event.requestContext.authorizer.claims.sub;

    let snag = await getSnag(userId, snagId);

    if (!snag)
      return new ResponseModel(
        {},
        StatusCode.NOT_FOUND,
        `Item with id ${snagId} does not exist.`
      ).generate();

    const issue = new Issue();
    issue.title = body.title;
    issue.longDescription = body.longDescription;
    issue.images = body.images.map((image: any) => {
      const img = new Image();
      img.caption = image.caption;
      img.description = image.description;
      img.url = image.url;
      img.path = image.path;

      return img;
    });
    console.log("This is the issue: ", issue);
    const data = await addIssue(issue, snag);

    return ResponseModel.ok(data, "Issue added");
  } catch (error) {
    const response =
      error instanceof ResponseModel
        ? error
        : new ResponseModel(null, StatusCode.ERROR, error.message);
    return response.generate();
  }
};
export const main = middyfy(add);
