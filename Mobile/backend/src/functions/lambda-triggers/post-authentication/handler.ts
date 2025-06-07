import "source-map-support/register";
import { PostAuthenticationTriggerHandler } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { middyfy } from "@common/lambda";

const cup = new CognitoIdentityServiceProvider();

const handler: PostAuthenticationTriggerHandler = async (event) => {
  console.log("EVENt",event)
  if (event.request.userAttributes.phone_number_verified !== "true") {
    const params: CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest =
      {
        UserPoolId: event.userPoolId,
        UserAttributes: [
          {
            Name: "email_verified",
            Value: "true",
          },
        ],
        Username: event.userName!,
      };
    await cup.adminUpdateUserAttributes(params).promise();
  }
  return event;
};

export const main = middyfy(handler);
