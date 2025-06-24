export default {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    phoneNumber: { type: "string" },
  },
  required: ["id", "name", "phoneNumber"],
} as const;
