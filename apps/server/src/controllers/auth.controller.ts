import { defaultProtectedHeaderAuthorizationSchema } from "@/helpers/defaultSchema";
import { Static } from "@sinclair/typebox";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  authCreateTokenBodySchema,
} from "@/schemas/auth.schema";
import authService from "@/services/auth.service";

export type AuthCreateTokenRequest = {
  Body: Static<typeof authCreateTokenBodySchema>;
};

export async function createToken(
  request: FastifyRequest<AuthCreateTokenRequest>,
  reply: FastifyReply
) {
  try {
    const newToken = await authService.createToken(request.body);

    return reply.code(201).send({
      code: 201,
      message: "Successfully created authorization token",
      data: newToken,
    });
  } catch (error) {
    if (error instanceof Error)
      if (error.message === "Invalid Request")
        return reply.code(400).send({
          code: 400,
          message: "Invalid Request",
        });

    return reply.code(500).send({
      code: 500,
      message: "Internal Server Error",
    });
  }
}

export type AuthCheckTokenIsValid = {
  Headers: {
    authorization: Static<typeof defaultProtectedHeaderAuthorizationSchema>;
  };
};

export async function checkTokenIsValid(
  request: FastifyRequest<AuthCheckTokenIsValid>,
  reply: FastifyReply
) {
  const {
    headers: { authorization },
  } = request;
  try {
    const token = authorization.split(" ")[1];
    const tokenIsValid = await authService.checkTokenIsValid(token);

    if (!tokenIsValid) throw new Error("Token is not valid");
    return reply.code(200).send({
      code: 200,
      message: "OK",
    });
  } catch (error) {
    if (error instanceof Error)
      return reply.code(401).send({
        code: 401,
        message: error.message,
      });
    throw error;
  }
}

export default { createToken, checkTokenIsValid };
