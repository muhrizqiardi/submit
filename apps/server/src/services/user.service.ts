import prisma from "@/helpers/prisma";
import { Static } from "@sinclair/typebox";
import {
  userCreateBodySchema,
  userDeleteOneByIdParamsSchema,
  userGetManyQuerystringSchema,
  userGetOneByIdParamsSchema,
  userUpdateOneByIdBodySchema,
  userUpdateOneByIdParamsSchema,
} from "@/schemas/user.schema";
import bcrypt from "bcrypt";
import { ROLE_ID } from "@/helpers/constants";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import env from "@/helpers/env";

export async function create(payload: Static<typeof userCreateBodySchema>) {
  const { email, password, role, username } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: {
          connectOrCreate: {
            where: {
              id: ROLE_ID[role],
            },
            create: {
              name: role,
            },
          },
        },
      },
      select: {
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export async function getOneById(
  filter: Static<typeof userGetOneByIdParamsSchema>
) {
  const { userId } = filter;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    new Error("Failed to get user");
  }
}

export async function getOneByToken(token: string) {
  try {
    const jwtPayload: JwtPayload = jwt.verify(
      token,
      env.secretKey
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        email: jwtPayload.email,
        username: jwtPayload.username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user == null) throw new Error();

    return user;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function getMany(
  filter: Static<typeof userGetManyQuerystringSchema>
) {
  const {
    limit = 10,
    page = 1,
    username,
    email,
    role = "USER",
    sort,
    orderBy,
    createdBefore,
    createdAfter,
    updatedBefore,
    updatedAfter,
  } = filter;
  try {
    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        username,
        email,
        role: {
          id: ROLE_ID[role],
        },
        createdAt: {
          gt: createdAfter,
          lt: createdBefore,
        },
        updatedAt: {
          gt: updatedAfter,
          lt: updatedBefore,
        },
      },
      orderBy: {
        [orderBy as string]: sort,
      },
      select: {
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  } catch (error) {
    throw new Error("Failed to get user(s)");
  }
}

export async function updateOneById(
  filter: Static<typeof userUpdateOneByIdParamsSchema>,
  payload: Static<typeof userUpdateOneByIdBodySchema>
) {
  const { email, password, role } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: filter.userId },
      data: {
        email,
        password: hashedPassword,
        roleId: ROLE_ID[role],
      },
      select: {
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user");
  }
}

export async function deleteOneById(
  filter: Static<typeof userDeleteOneByIdParamsSchema>
) {
  try {
    const result = prisma.user.delete({
      where: { id: filter.userId },
    });
  } catch (error) {
    throw new Error("Failed to delete user");
  }
}

export default {
  create,
  getOneById,
  getOneByToken,
  getMany,
  updateOneById,
  deleteOneById,
};
