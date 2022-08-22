import replyVoteController from "@/controllers/reply-vote.controller";
import { replyVotePutSchema } from "@/schemas/reply-vote.schema";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

async function replyVoteRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {
  /**
   * PUT /reply-votes/:replyId
   */
  fastify.put(
    "/:replyId",
    { schema: replyVotePutSchema },
    replyVoteController.put
  );

  return next();
}

export default replyVoteRoute;
