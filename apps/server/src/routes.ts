import { FastifyInstance, FastifyPluginOptions } from "fastify";
import postRoute from "@/routes/post.route";
import userRoutes from "@/routes/user.route";
import authRoutes from "@/routes/auth.route";
import postVoteRoute from "@/routes/post-vote.route";

async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(postRoute, { prefix: "/posts" });
  fastify.register(postVoteRoute, { prefix: "/post-votes" });

  return next();
}

export default routes;
