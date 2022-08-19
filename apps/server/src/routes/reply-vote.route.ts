import { postVotePutSchema } from "@/schemas/post-vote.schema";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

async function replyVoteRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {
  /**
   * PUT /reply-votes/:postId
   */
  fastify.put("/:postId", { schema: postVotePutSchema }, () => null);

  return next();
}

export default replyVoteRoute;