import "source-map-support/register";
import { middyfy } from "../../../common/lambda";
import ResponseModel from "../../../common/response.model";
import User from "../../../models/user.model";
import errorResponse from "../../../common/errorResponse";
import { addUser } from "../../../repositories/userRepository";
const addUserHandler = async (event: any) => {
  try {
    const { body } = event;
    const userBody = body;
    const user = new User(userBody.id);

    user.name = userBody.name;
    user.phoneNumber = userBody.phoneNumber;
    
  const data = await addUser(user);

    return ResponseModel.ok(data, "user created");
  } catch (error) {
    return errorResponse(error);
  }
};
export const main = middyfy(addUserHandler);
