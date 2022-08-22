import postVoteController, {
  PostVotePutRequest,
} from "@/controllers/post-vote.controller";
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
  fastify.put<PostVotePutRequest>(
    "/:postId",
    { schema: postVotePutSchema },
    postVoteController.put
  );

  return next();
}

export default postVoteRoute;
