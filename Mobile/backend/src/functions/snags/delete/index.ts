import { handlerPath } from "../../../common/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  tracing: true,
  events: [
    {
      http: {
        method: "delete",
        path: "/snags/{snagId}",
        cors: true,
        authorizer: {
          name: "snagit-stag",
          arn: "arn:aws:cognito-idp:eu-central-1:731880665167:userpool/eu-central-1_wLeHxBjI8",
        },
      },
    },
  ],
};
