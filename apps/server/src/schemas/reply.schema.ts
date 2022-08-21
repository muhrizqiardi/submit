import { defaultSchema } from "@/helpers/defaultSchema";
import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const replyCreateChildReplyParamsSchema = Type.Object({
  parentReplyId: Type.String({ format: "uuid" }),
});

export const replyCreateChildReplyBodySchema = Type.Object({
  content: Type.String(),
});

export const replyCreateChildReplyHeadersSchema = Type.Object({
  authorization: Type.String({
    pattern: "Bearer [^]+",
  }),
});

export const replyCreateChildReplySchema: FastifySchema = {
  ...defaultSchema,
  headers: replyCreateChildReplyHeadersSchema,
  params: replyCreateChildReplyParamsSchema,
  body: replyCreateChildReplyBodySchema,
};

export const replyGetOneByIdParamsSchema = Type.Object({
  replyId: Type.String({ format: "uuid" }),
});

export const replyGetOneByIdSchema: FastifySchema = {
  ...defaultSchema,
  params: replyGetOneByIdParamsSchema,
};

export const replyUpdateOneByIdParamsSchema = Type.Object({
  replyId: Type.String({ format: "uuid" }),
});

export const replyUpdateOneByIdBodySchema = Type.Object({
  content: Type.String(),
});

export const replyUpdateOneByIdSchema: FastifySchema = {
  ...defaultSchema,
  params: replyUpdateOneByIdParamsSchema,
  body: replyUpdateOneByIdBodySchema,
};

export const replyDeleteOneByIdParamsSchema = Type.Object({
  replyId: Type.String({ format: "uuid" }),
});

export const replyDeleteOneByIdSchema: FastifySchema = {
  ...defaultSchema,
  params: replyDeleteOneByIdParamsSchema,
};
