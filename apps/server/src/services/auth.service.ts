import env from "@/helpers/env";
import prisma from "@/helpers/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  username: string;
  email: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export async function createToken(input: {
  email?: string;
  username?: string;
  password: string;
}) {
  const { email, username, password } = input;
  try {
    if (email === undefined && username === undefined)
      throw new Error("Invalid Request");

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user === undefined || user === null) throw new Error("Invalid Request");

    const passwordIsMatched = await bcrypt.compare(password, user.password);

    if (!passwordIsMatched) throw new Error("Invalid Request");

    const jwtPayload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const newToken = jwt.sign(
      JSON.stringify(jwtPayload),
      env.secretKey as string
    );

    return newToken;
  } catch (error) {
    throw error;
  }
}

export async function checkTokenIsValid(token: string): Promise<boolean> {
  try {
    const jwtPayload: JwtPayload = jwt.verify(
      token,
      env.secretKey
    ) as JwtPayload;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: jwtPayload.username }, { email: jwtPayload.email }],
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user === undefined || user === null) throw new Error();

    return true;
  } catch (error) {
    return false;
  }
}

export default {
  createToken,
  checkTokenIsValid,
};
