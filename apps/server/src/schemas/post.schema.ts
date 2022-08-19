import { defaultProtectedHeaderAuthorizationSchema } from "@/helpers/defaultSchema";
import StringEnum from "@/helpers/StringEnum";
import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const postCreateBodySchema = Type.Object({
  title: Type.String(),
  content: Type.Optional(Type.String()),
  link: Type.Optional(Type.String({ format: "uri" })),
  authorId: Type.String({ format: "uuid" }),
});

export const postCreateSchema: FastifySchema = {
  headers: {
    authorization: defaultProtectedHeaderAuthorizationSchema,
  },
  body: postCreateBodySchema,
};

export const postCreateChildReplyBodySchema = Type.Object({
  content: Type.String(),
});

export const postCreateChildReplySchema: FastifySchema = {
  headers: {
    authorization: defaultProtectedHeaderAuthorizationSchema,
  },
  body: postCreateChildReplyBodySchema,
};

export const postGetOneByIdParamsSchema = Type.Object({
  postId: Type.String({ format: "uuid" }),
});

export const postGetOneByIdSchema: FastifySchema = {
  params: postGetOneByIdParamsSchema,
};

export const postGetManyQuerystringSchema = Type.Object({
  limit: Type.Optional(Type.Number({ default: 10 })),
  page: Type.Optional(Type.Number({ default: 1 })),
  title: Type.Optional(Type.String()),
  content: Type.Optional(Type.String()),
  link: Type.Optional(Type.String({ format: "uri" })),
  authorUsername: Type.Optional(Type.String()),
  orderBy: Type.Optional(StringEnum(["createdAt", "updatedAt"])),
  sort: Type.Optional(StringEnum(["asc", "desc"])),
  createdBefore: Type.Optional(Type.String({ format: "date-time" })),
  createdAfter: Type.Optional(Type.String({ format: "date-time" })),
  updatedBefore: Type.Optional(Type.String({ format: "date-time" })),
  updatedAfter: Type.Optional(Type.String({ format: "date-time" })),
});

export const postGetManySchema: FastifySchema = {
  querystring: postGetManyQuerystringSchema,
};

export const postUpdateOneByIdParamsSchema = Type.Object({
  postId: Type.String({ format: "uuid" }),
});

export const postUpdateOneByIdBodySchema = Type.Object({
  title: Type.Optional(Type.String()),
  content: Type.Optional(Type.String()),
  link: Type.Optional(Type.String({ format: "uri" })),
});

export const postUpdateOneByIdSchema: FastifySchema = {
  headers: {
    authorization: defaultProtectedHeaderAuthorizationSchema,
  },
  body: postUpdateOneByIdBodySchema,
  params: postUpdateOneByIdParamsSchema,
};

export const postDeleteOneByIdParamsSchema = Type.Object({
  postId: Type.String({ format: "uuid" }),
});

export const postDeleteOneByIdSchema: FastifySchema = {
  headers: {
    authorization: defaultProtectedHeaderAuthorizationSchema,
  },
  params: postDeleteOneByIdParamsSchema,
};

export const postUpvoteParamsSchema = Type.Object({
  postId: Type.String({ format: "uuid" }),
});

export const postUpvoteSchema: FastifySchema = {
  headers: {
    authorization: defaultProtectedHeaderAuthorizationSchema,
  },
  params: postUpvoteParamsSchema,
};

export const postDownvoteParamsSchema = Type.Object({
  postId: Type.String({ format: "uuid" }),
});

export const postDownvoteSchema: FastifySchema = {
  params: postDownvoteParamsSchema,
};
