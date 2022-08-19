import {
  defaultProtectedHeaderAuthorizationSchema,
  defaultSchema,
} from "@/helpers/defaultSchema";
import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const postVotePutParamsSchema = Type.Object({
  postId: Type.String({ format: "uuid" }),
});

export const postVotePutBodySchema = Type.Object({
  vote: Type.Number({ minimum: -1, maximum: 1 }),
});

export const postVotePutHeadersSchema = Type.Object({
  authorization: defaultProtectedHeaderAuthorizationSchema,
});

export const postVotePutSchema: FastifySchema = {
  ...defaultSchema,
  headers: postVotePutHeadersSchema,
  params: postVotePutParamsSchema,
  body: postVotePutBodySchema,
};
