import DynamoDatabaseService from "@services/DynamoDatabaseService";
import Feedback from "@models/feedback.model";

const feedbackTable = process.env.FEEDBACK_TABLE;

export const createFeedback = async (feedback: Feedback) => {

  const params = {
    TableName: feedbackTable,
    Item: {
      ...feedback.mapEntity(),
    }
  };
  return await DynamoDatabaseService.create(params);
};
