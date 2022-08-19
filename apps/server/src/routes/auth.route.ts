import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authController, { AuthCreateTokenRequest } from "@/controllers/auth.controller";
import { authCreateTokenSchema, authCheckTokenIsValid } from "@/schemas/auth.schema";

async function authRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {
  /**
   * POST /auth
   * Create token
   */
  fastify.post<AuthCreateTokenRequest>(
    "/",
    { schema: authCreateTokenSchema },
    authController.createToken
  );
  
  /**
   * GET /auth
   * Check whether token is valid or not
   */
  fastify.get(
    "/",
    { schema: authCheckTokenIsValid },
    authController.checkTokenIsValid
  );

  return next();
}

export default authRoutes;
