import "source-map-support/register";
import { DefineAuthChallengeTriggerHandler } from "aws-lambda";
import { middyfy } from "@common/lambda";

const handler: DefineAuthChallengeTriggerHandler = async (event) => {
  console.log(event.request);

  // If user is not registered
  if (event.request.userNotFound) {
    event.response.issueTokens = false;
    event.response.failAuthentication = true;
    throw new Error("User does not exist");
  }

  if (
    event.request.session.length >= 3 &&
    event.request.session.slice(-1)[0].challengeResult === false
  ) {
    // wrong OTP even After 3 sessions?
    event.response.issueTokens = false;
    event.response.failAuthentication = true;
    throw new Error("Invalid OTP");
  } else if (
    event.request.session.length > 0 &&
    event.request.session.slice(-1)[0].challengeResult === true
  ) {
    // Correct OTP!
    event.response.issueTokens = true;
    event.response.failAuthentication = false;
  } else {
    // not yet received correct OTP
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = "CUSTOM_CHALLENGE";
  }

  return event;
};

export const main = middyfy(handler);
