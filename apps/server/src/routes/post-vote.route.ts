import { postVotePutSchema } from "@/schemas/post-vote.schema";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

async function postVoteRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {
  /**
   * PUT /post-votes/:postId
   */
  fastify.put("/:postId", { schema: postVotePutSchema }, () => null);

  return next();
}

export default postVoteRoute;
