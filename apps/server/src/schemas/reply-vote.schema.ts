import { defaultProtectedHeaderAuthorizationSchema } from "@/helpers/defaultSchema";
import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const replyVotePutParamsSchema = Type.Object({
  replyId: Type.String({ format: "uuid" }),
});

export const replyVotePutBodySchema = Type.Object({
  vote: Type.Number({ minimum: -1, maximum: 1 }),
});

export const replyVotePutHeadersSchema = Type.Object({
  authorization: defaultProtectedHeaderAuthorizationSchema,
});

export const replyVotePutSchema: FastifySchema = {
  params: replyVotePutParamsSchema,
  body: replyVotePutBodySchema,
};
