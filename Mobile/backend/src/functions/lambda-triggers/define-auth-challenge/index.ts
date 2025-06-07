import { handlerPath } from "@common/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  tracing: true,
};
