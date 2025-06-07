import "source-map-support/register";
import { PreSignUpTriggerHandler } from "aws-lambda";
import { middyfy } from "@common/lambda";
import { addUser } from "@repositories/userRepository";
import User from "@models/user.model";
import ResponseModel from "@common/response.model";
import { sendEmail} from "@services/simpleEmailingService"

const handler: PreSignUpTriggerHandler = async (event) => {
  try {
    const { userName, request } = event;
    const { name, phone_number } = request.userAttributes;
    const user = new User(userName);
    user.name = name;
    user.phoneNumber = phone_number;
    const data = await addUser(user);
    
    console.log("new user saved ", data);
    console.log(user);
    const message = `${name}, with phone number: ${phone_number} has just created a new Account. \n`;
    const subject = 'Snagger account created';
    const toAddresses = ['rakheoana@turati.co.za'];//to change
    await sendEmail(message,subject,toAddresses);

    event.response.autoConfirmUser = true;
    event.response.autoVerifyPhone = true;
    
    return event;
  } catch (error) {
    console.log(error);
    return ResponseModel.badRequest({}, "Failed to save user");
  }
};
export const main = middyfy(handler);
