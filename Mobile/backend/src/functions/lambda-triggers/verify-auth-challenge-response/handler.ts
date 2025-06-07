import "source-map-support/register";
import { VerifyAuthChallengeResponseTriggerHandler } from "aws-lambda";
import { middyfy } from "@common/lambda";

const handler: VerifyAuthChallengeResponseTriggerHandler = async (event) => {
  console.log(event.request);

  const expectedAnswer =
    event.request.privateChallengeParameters.secretLoginCode;
  if (event.request.challengeAnswer === expectedAnswer) {
    event.response.answerCorrect = true;
  } else {
    event.response.answerCorrect = false;
  }

  return event;
};

export const main = middyfy(handler);
