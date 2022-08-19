import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const postVotePutParamsSchema = Type.Object({
  postId: Type.String({ format: "uuid" }),
});

export const postVotePutBodySchema = Type.Object({
  vote: Type.Number({ minimum: -1, maximum: 1 }),
});

export const postVotePutSchema: FastifySchema = {
  params: postVotePutParamsSchema,
  body: postVotePutBodySchema,
};
