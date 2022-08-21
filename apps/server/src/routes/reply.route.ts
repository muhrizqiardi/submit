import replyController from "@/controllers/reply.controller";
import {
  replyCreateChildReplySchema,
  replyDeleteOneByIdSchema,
  replyGetOneByIdSchema,
  replyUpdateOneByIdSchema,
} from "@/schemas/reply.schema";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

async function replyRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {
  /**
   * POST /replies/:parentReply/replies
   * Create a child reply of a reply
   */
  fastify.post(
    "/:parentReply/replies",
    { schema: replyCreateChildReplySchema },
    replyController.createChildReply
  );

  /**
   * GET /replies/:replyId
   * Get a reply by it's ID
   */
  fastify.get(
    "/:replyId",
    { schema: replyGetOneByIdSchema },
    replyController.getOneById
  );

  /**
   * PATCH /replies/:replyId
   * Edit a reply by it's ID
   */
  fastify.patch(
    "/:replyId",
    { schema: replyUpdateOneByIdSchema },
    replyController.updateOneById
  );

  /**
   * DELETE /replies/:replyId
   * Delete a reply by it's ID
   */
  fastify.delete(
    "/:replyId",
    { schema: replyDeleteOneByIdSchema },
    replyController.deleteOneById
  );

  return next();
}

export default replyRoute;
