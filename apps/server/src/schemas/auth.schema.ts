import { defaultProtectedSchema } from "@/helpers/defaultSchema";
import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const authCreateTokenBodySchema = Type.Object({
  email: Type.Optional(Type.String({ format: "email" })),
  username: Type.Optional(Type.String({ pattern: "^S+w{8,32}S{1,}" })),
  password: Type.String({ minLength: 8 }),
});

export const authCreateTokenSchema: FastifySchema = {
  body: authCreateTokenBodySchema,
};

export const authCheckTokenIsValid = defaultProtectedSchema;
