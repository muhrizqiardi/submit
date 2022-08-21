import { FastifyInstance, FastifyPluginOptions } from "fastify";
import postController, {
  PostCreateRequest,
  PostDeleteOneById,
  PostGetManyRequest,
  PostGetOneByIdRequest,
  PostUpdateOneByIdRequest,
} from "@/controllers/post.controller";
import {
  postCreateChildReplySchema,
  postCreateSchema,
  postDeleteOneByIdSchema,
  postGetManySchema,
  postGetOneByIdSchema,
  postUpdateOneByIdSchema,
} from "@/schemas/post.schema";

async function postRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {
  /**
   * POST /posts
   * Create a post
   */
  fastify.post<PostCreateRequest>(
    "/",
    { schema: postCreateSchema },
    postController.create
  );

  /**
   * POST /posts/:postId/replies
   * Create a child reply of a post
   */
  fastify.post(
    "/:postId/replies",
    { schema: postCreateChildReplySchema },
    postController.createChildReply
  );

  /**
   * GET /posts/:postId
   * Get a post by it's ID
   */
  fastify.get<PostGetOneByIdRequest>(
    "/:postId",
    { schema: postGetOneByIdSchema },
    postController.getOneById
  );

  /**
   * GET /posts
   * Get many post
   */
  fastify.get<PostGetManyRequest>(
    "/",
    { schema: postGetManySchema },
    postController.getMany
  );

  /**
   * PATCH /posts/:postId
   * Update (edit) a post by it's ID
   */
  fastify.patch<PostUpdateOneByIdRequest>(
    "/:postId",
    { schema: postUpdateOneByIdSchema },
    postController.updateOneById
  );

  /**
   * DELETE /posts/:postId
   */
  fastify.delete<PostDeleteOneById>(
    "/:postId",
    { schema: postDeleteOneByIdSchema },
    postController.deleteOneById
  );

  return next();
}

export default postRoute;
