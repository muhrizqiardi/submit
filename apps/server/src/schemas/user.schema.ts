import StringEnum from "@/helpers/StringEnum";
import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";

export const userCreateBodySchema = Type.Object({
  username: Type.String({ pattern: "^S+w{8,32}S{1,}" }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
  role: StringEnum(["ADMIN", "USER"]),
});

export const userCreateSchema: FastifySchema = {
  body: userCreateBodySchema,
};

export const userGetOneByIdParamsSchema = Type.Object({
  userId: Type.String({ format: "uuid" }),
});

export const userGetOneByIdSchema: FastifySchema = {
  params: userGetOneByIdParamsSchema,
};

export const userGetManyQuerystringSchema = Type.Object({
  limit: Type.Optional(Type.Number({ default: 10 })),
  page: Type.Optional(Type.Number({ default: 1 })),
  email: Type.Optional(Type.String({ format: "email" })),
  username: Type.Optional(Type.String({ pattern: "^S+w{8,32}S{1,}" })),
  role: Type.Optional(StringEnum(["ADMIN", "USER"])),
  orderBy: Type.Optional(StringEnum(["createdAt", "updatedAt"])),
  sort: Type.Optional(StringEnum(["asc", "desc"])),
  createdBefore: Type.Optional(Type.String({ format: "date-time" })),
  createdAfter: Type.Optional(Type.String({ format: "date-time" })),
  updatedBefore: Type.Optional(Type.String({ format: "date-time" })),
  updatedAfter: Type.Optional(Type.String({ format: "date-time" })),
});

export const userGetManySchema: FastifySchema = {
  querystring: userGetManyQuerystringSchema,
};

export const userUpdateOneByIdBodySchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
  role: StringEnum(["ADMIN", "USER"]),
});

export const userUpdateOneByIdParamsSchema = Type.Object({
  userId: Type.String({ format: "uuid" }),
});

export const userUpdateOneByIdSchema: FastifySchema = {
  body: userUpdateOneByIdBodySchema,
  params: userUpdateOneByIdParamsSchema,
};

export const userDeleteOneByIdParamsSchema = Type.Object({
  userId: Type.String({ format: "uuid" }),
});

export const userDeleteOneByIdSchema: FastifySchema = {
  params: userDeleteOneByIdParamsSchema,
};
