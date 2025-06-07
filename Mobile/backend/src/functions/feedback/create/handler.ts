import "source-map-support/register";
import ResponseModel, { StatusCode } from "@common/response.model";
import { createFeedback } from "@repositories/feedbackRepository";
import Feedback from "@models/feedback.model";
import { middyfy } from "@common/lambda";
import { sendEmail } from "@services/simpleEmailingService";

const create = async (event: any) => {
  const { body } = event;
  console.log(body);
  try {
    const feedback = new Feedback();

    feedback.phone_number = body?.phoneNumber;
    feedback.description = body?.description;
    feedback.brand = body?.brand;
    feedback.manufacturer = body?.manufacturer;
    feedback.modelname = body?.modelname;
    feedback.os = body?.os;
    feedback.version = body?.version;
    feedback.app_version = body?.appVersion;

    const data = await createFeedback(feedback)
      .then((res) => {
        console.log("feedback successfully added");
      })
      .catch((err: any) => {
        console.log(err);
      });

    const message = `${body?.name}, with phone number: ${body?.phoneNumber} has given their feedback,\n`+
    `listed below is their device information and issue details \n` +

    `Description: ${body?.description} \n` +
    `-----------------------------\n` +
    `Device information \n` +
    `-----------------------------\n` +
    `Brand: ${body?.brand} \n` +
    `Manufacturer: ${body?.manufacturer}\n` +
    `Model: ${body?.modelname}\n` +
    `OS: ${body?.os}\n` +
    `Version: ${body?.version}`;
    const subject = 'Snagger Feedback';
    const toAddresses = ['rakheoana@turati.co.za'];
    await sendEmail(message,subject,toAddresses);
    return ResponseModel.ok(data, "Success");
  } catch (error) {
    const response =
      error instanceof ResponseModel
        ? error
        : new ResponseModel(null, StatusCode.ERROR, error.message);
    return response.generate();
  }
};
export const main = middyfy(create);
