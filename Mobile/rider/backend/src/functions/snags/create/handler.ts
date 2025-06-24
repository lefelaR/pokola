import "source-map-support/register";
import ResponseModel, { StatusCode } from "@common/response.model";
import { createSnag } from "@repositories/snagsRepository";
import Snag from "@models/snag.model";
import Issue from "@models/issue.model";
import { middyfy } from "@common/lambda";
import Image from "@models/image.model";
import { sendEmail } from "@services/simpleEmailingService";

const create = async (event: any) => {
  try {
    const { body } = event;
    const snag = new Snag();
    snag.title = body.title;
    snag.userid = event.requestContext.authorizer.claims.sub;
    snag.issues;
    const phonenumber = event.requestContext.authorizer.claims.phone_number;
    const name = event.requestContext.authorizer.claims.name;
    const data = await createSnag(snag);
    const message = `${name}, with phone number: ${phonenumber} has just created a new Snaglist. \n`;
    const subject = 'Snaglist Created';
    const toAddresses = ['adriano@turati.co.za','admin@turati.co.za', 'help@snaggerapp.com'];
    await sendEmail(message,subject,toAddresses);
    
    return ResponseModel.ok(data, "Snag created");
  } catch (error) {
    const response =
      error instanceof ResponseModel
        ? error
        : new ResponseModel(null, StatusCode.ERROR, error.message);
    return response.generate();
  }
};
export const main = middyfy(create);
