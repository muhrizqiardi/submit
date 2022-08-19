import { Static } from "@sinclair/typebox";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  userCreateBodySchema,
  userDeleteOneByIdParamsSchema,
  userGetManyQuerystringSchema,
  userGetOneByIdParamsSchema,
  userUpdateOneByIdBodySchema,
  userUpdateOneByIdParamsSchema,
} from "@/schemas/user.schema";
import userService from "@/services/user.service";

export type UserCreateRequest = {
  Body: Static<typeof userCreateBodySchema>;
};

export async function create(
  request: FastifyRequest<UserCreateRequest>,
  reply: FastifyReply
) {
  const { body } = request;

  try {
    const newUser = await userService.create(body);

    return reply.code(201).send({
      code: 201,
      message: "User created",
      data: newUser,
    });
  } catch (error) {
    throw new Error("Failed creating user");
  }
}

export type UserGetOneByIdRequest = {
  Params: Static<typeof userGetOneByIdParamsSchema>;
};

export async function getOneById(
  request: FastifyRequest<UserGetOneByIdRequest>,
  reply: FastifyReply
) {
  try {
    const user = await userService.getOneById(request.params);

    return reply.code(200).send({
      code: 200,
      message: "User found",
      data: user,
      query: {
        userId: request.params.userId,
      },
    });
  } catch (error) {
    throw new Error("User cannot be found");
  }
}

export type UserGetManyRequest = {
  Querystring: Static<typeof userGetManyQuerystringSchema>;
}

export async function getMany(
  request: FastifyRequest<UserGetManyRequest>,
  reply: FastifyReply
) {
  try {
    const users = await userService.getMany(request.query);

    return reply.code(200).send({
      code: 200,
      message: "User(s) found",
      data: users,
      query: request.query,
    });
  } catch (error) {
    throw new Error("Failed get user(s)");
  }
}

export type UserUpdateOneByIdRequest = {
  Params: Static<typeof userUpdateOneByIdParamsSchema>;
  Body: Static<typeof userUpdateOneByIdBodySchema>;
};

export async function updateOneById(
  request: FastifyRequest<UserUpdateOneByIdRequest>,
  reply: FastifyReply
) {
  try {
    const updatedUser = await userService.updateOneById(
      request.params,
      request.body
    );

    return reply.code(201).send({
      code: 201,
      message: "Successfully updated user",
      data: updatedUser,
      query: request.params,
    });
  } catch (error) {}
}

export type UserDeleteOneByIdRequest = {
  Params: Static<typeof userDeleteOneByIdParamsSchema>;
};

export async function deleteOneById(
  request: FastifyRequest<UserDeleteOneByIdRequest>,
  reply: FastifyReply
) {
  try {
    await userService.deleteOneById({
      userId: request.params.userId,
    });

    return reply.code(200).send({
      code: 200,
      message: "Successfully deleted a user",
      query: request.params,
    });
  } catch (error) {
    throw new Error("Failed to update user");
  }
}

export default {
  create,
  getOneById,
  getMany,
  updateOneById,
  deleteOneById,
};
