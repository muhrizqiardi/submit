import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const replyGetOneByIdParamsSchema = Type.Object({
  replyId: Type.String({ format: "uuid" }),
});

export const replyGetOneByIdSchema: FastifySchema = {
  params: replyGetOneByIdParamsSchema,
};

export const replyUpdateOneByIdParamsSchema = Type.Object({
  replyId: Type.String({ format: "uuid" }),
});

export const replyUpdateOneByIdBodySchema = Type.Object({
  content: Type.String(),
});

export const replyUpdateOneByIdSchema: FastifySchema = {
  params: replyUpdateOneByIdParamsSchema,
  body: replyUpdateOneByIdBodySchema,
};

export const replyDeleteOneByIdParamsSchema = Type.Object({
  replyId: Type.String({ format: "uuid" }),
});

export const replyDeleteOneByIdSchema: FastifySchema = {
  params: replyDeleteOneByIdParamsSchema,
};

