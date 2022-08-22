import { FastifyInstance, FastifyPluginOptions } from "fastify";
import userController, {
  UserCreateRequest,
  UserDeleteOneByIdRequest,
  UserGetManyRequest,
  UserGetOneByIdRequest,
  UserUpdateOneByIdRequest,
} from "@/controllers/user.controller";
import {
  userCreateSchema,
  userDeleteOneByIdSchema,
  userGetManySchema,
  userGetOneByIdSchema,
  userUpdateOneByIdSchema,
} from "@/schemas/user.schema";

async function userRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {
  fastify.post<UserCreateRequest>(
    "/",
    {
      schema: userCreateSchema,
    },
    userController.create
  );

  fastify.get<UserGetOneByIdRequest>(
    "/:userId",
    {
      schema: userGetOneByIdSchema,
    },
    userController.getOneById
  );

  fastify.get<UserGetManyRequest>(
    "/",
    { schema: userGetManySchema },
    userController.getMany
  );

  fastify.patch<UserUpdateOneByIdRequest>(
    "/:userId",
    {
      schema: userUpdateOneByIdSchema,
    },
    userController.updateOneById
  );

  fastify.delete<UserDeleteOneByIdRequest>(
    "/:userId",
    {
      schema: userDeleteOneByIdSchema,
    },
    userController.deleteOneById
  );

  return next();
}

export default userRoutes;
