import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const defaultResponseDefaultSchema = Type.Object({
  code: Type.Number({ default: 200 }),
  message: Type.String({ default: "OK" }),
  data: Type.Optional(Type.Any()),
  query: Type.Optional(Type.Object({}, { additionalProperties: true })),
});

export const defaultResponse2xxSchema = Type.Object({
  code: Type.Number({ default: 200 }),
  message: Type.String({ default: "OK" }),
  data: Type.Optional(Type.Any()),
  query: Type.Optional(Type.Object({}, { additionalProperties: true })),
});

export const defaultResponse4xxSchema = Type.Object({
  code: Type.Number({ default: 400 }),
  message: Type.String({ default: "Bad Request" }),
});

export const defaultResponse401Schema = Type.Object({
  code: Type.Number({ default: 401 }),
  message: Type.String({ default: "Unauthorized" }),
});

export const defaultResponse5xxSchema = Type.Object({
  code: Type.Number({ default: 400 }),
  message: Type.String({ default: "Internal Server Error" }),
});

export const defaultSchema: FastifySchema = {
  response: {
    default: defaultResponseDefaultSchema,
    "2xx": defaultResponse2xxSchema,
    "4xx": defaultResponse4xxSchema,
    "401": defaultResponse401Schema,
    "5xx": defaultResponse5xxSchema,
  },
};

export const defaultProtectedHeaderAuthorizationSchema = Type.String({
  pattern: "Bearer [^]+",
});

export const defaultProtectedSchema: typeof defaultSchema = {
  ...defaultSchema,
  headers: {
    authorization: defaultProtectedHeaderAuthorizationSchema,
  },
};

export type DefaultSchema = typeof defaultSchema;

export type DefaultProtectedSchema = typeof defaultProtectedSchema;
