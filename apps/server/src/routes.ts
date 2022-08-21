import { FastifyInstance, FastifyPluginOptions } from "fastify";
import postRoute from "@/routes/post.route";
import userRoute from "@/routes/user.route";
import authRoute from "@/routes/auth.route";
import postVoteRoute from "@/routes/post-vote.route";
import replyRoute from "./routes/reply.route";

async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {
  fastify.register(authRoute, { prefix: "/auth" });
  fastify.register(userRoute, { prefix: "/users" });
  fastify.register(postRoute, { prefix: "/posts" });
  fastify.register(replyRoute, { prefix: "/replies" });
  fastify.register(postVoteRoute, { prefix: "/post-votes" });

  return next();
}

export default routes;
