import replyVoteController from "@/controllers/reply-vote.controller";
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
  fastify.put(
    "/:postId",
    { schema: postVotePutSchema },
    replyVoteController.put
  );

  return next();
}

export default replyVoteRoute;
