import { FastifyInstance, FastifyPluginOptions } from "fastify";
import postRoute from "@/routes/post.route";
import userRoutes from "@/routes/user.route";
import authRoutes from "@/routes/auth.routes";

async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(postRoute, { prefix: "/posts" });

  return next();
}

export default routes;
