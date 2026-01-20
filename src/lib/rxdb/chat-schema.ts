import { ExtractDocumentTypeFromTypedRxJsonSchema, RxJsonSchema } from "rxdb";

const chatSchemaLiteral = {
  title: "chat schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    name: { type: "string" },
    avatar: { type: "string" },
    lastMessage: { type: "string" },
    lastMessageAt: { type: "string" }, // Format ISO Date String
    timestamp: { type: "string" },
    unreadCount: { type: "number", minimum: 0 },
    isOnline: { type: "boolean" },
    isTyping: { type: "boolean" },
    lastSeen: { type: "string" },
    otherParticipantId: { type: "string" },
  },
  required: [
    "id",
    "name",
    "avatar",
    "lastMessage",
    "lastMessageAt",
    "timestamp",
    "unreadCount",
    "isOnline",
    "lastSeen",
    "otherParticipantId",
  ],
} as const;

export type ChatDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof chatSchemaLiteral
>;
export const chatSchema: RxJsonSchema<ChatDocType> = chatSchemaLiteral;
