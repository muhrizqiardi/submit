import { defaultProtectedHeaderAuthorizationSchema } from "@/helpers/defaultSchema";
import userService from "@/services/user.service";
import { Static } from "@sinclair/typebox";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  postCreateBodySchema,
  postDeleteOneByIdParamsSchema,
  postDownvoteParamsSchema,
  postGetManyQuerystringSchema,
  postGetOneByIdParamsSchema,
  postUpdateOneByIdBodySchema,
  postUpdateOneByIdParamsSchema,
  postUpvoteParamsSchema,
} from "@/schemas/post.schema";
import postService from "@/services/post.service";

export interface PostCreateRequest {
  Body: Static<typeof postCreateBodySchema>;
}

/**
 * Handler for POST /posts
 */
export async function create(
  request: FastifyRequest<PostCreateRequest>,
  reply: FastifyReply
) {
  try {
    const newPost = await postService.create(request.body);

    return reply.code(201).send({
      code: 201,
      message: "Successfully created a post",
      data: newPost,
    });
  } catch (error) {
    return reply.code(500).send({
      code: 500,
      message: "Failed creating a post",
    });
  }
}

/**
 * Handler for POST /posts/:postId/replies
 */
// TODO: create handler for createChildReply

export interface PostGetOneByIdRequest {
  Params: Static<typeof postGetOneByIdParamsSchema>;
}

/**
 * Handler for GET /posts/:postId
 */
export async function getOneById(
  request: FastifyRequest<PostGetOneByIdRequest>,
  reply: FastifyReply
) {
  const { postId } = request.params;

  try {
    const post = await postService.getOneById({ postId });

    return reply.code(200).send({
      code: 200,
      message: "Successfully get post",
      data: post,
      query: { postId },
    });
  } catch (error) {
    if (error instanceof Error)
      return reply.code(404).send({
        code: 404,
        message: error.message,
        query: { postId },
      });
  }
}

export interface PostGetManyRequest {
  Querystring: Static<typeof postGetManyQuerystringSchema>;
}

/** 
 * Handler for GET /posts
 */
export async function getMany(
  request: FastifyRequest<PostGetManyRequest>,
  reply: FastifyReply
) {
  try {
    const posts = await postService.getMany(request.query);

    return reply.code(200).send({
      code: 200,
      message: "Successfully get post(s)",
      data: posts,
      query: request.query,
    });
  } catch (error) {
    if (error instanceof Error)
      return reply.code(404).send({
        code: 404,
        message: error.message,
        query: request.query,
      });

    throw new Error("Internal server error");
  }
}

export interface PostUpdateOneByIdRequest {
  Params: Static<typeof postUpdateOneByIdParamsSchema>;
  Body: Static<typeof postUpdateOneByIdBodySchema>;
}

/**
 * Handler for PATCH /posts/:postId
 */
export async function updateOneById(
  request: FastifyRequest<PostUpdateOneByIdRequest>,
  reply: FastifyReply
) {
  try {
    const updatedPost = await postService.updateOneById(
      request.params,
      request.body
    );

    return reply.code(201).send({
      code: 201,
      message: "Successfully created a post",
      data: updatedPost,
      query: request.query,
    });
  } catch (error) {
    throw new Error("Internal server error");
  }
}

export interface PostUpvoteRequest {
  Params: Static<typeof postUpvoteParamsSchema>;
  Headers: {
    authorization: Static<typeof defaultProtectedHeaderAuthorizationSchema>;
  };
}

/**
 * Handler for /:postId/upvote
 * @deprecated
 */
export async function upvote(
  request: FastifyRequest<PostUpvoteRequest>,
  reply: FastifyReply
) {
  const { postId } = request.params;
  const { authorization } = request.headers;
  const jwtToken = authorization.split(" ")[1] ?? "";
  try {
    const userFromToken = await userService.getOneByToken(jwtToken);
    const { id } = userFromToken;
    const upvotedPost = await postService.upvote({ postId, userId: id });

    return reply.code(201).send({
      code: 201,
      message: "Successfully upvoted a post",
      data: upvotedPost,
      query: { postId },
    });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}

export interface PostDownvoteRequest {
  Params: Static<typeof postDownvoteParamsSchema>;
  Headers: {
    authorization: Static<typeof defaultProtectedHeaderAuthorizationSchema>;
  };
}

/**
 * Handler for /:postId/downvote
 * @deprecated
 */
export async function downvote(
  request: FastifyRequest<PostDownvoteRequest>,
  reply: FastifyReply
) {
  const { postId } = request.params;
  const { authorization } = request.headers;
  const jwtToken = authorization.split(" ")[1] ?? "";
  try {
    const userFromToken = await userService.getOneByToken(jwtToken);
    const { id } = userFromToken;
    const upvotedPost = await postService.downvote({ postId, userId: id });

    return reply.code(201).send({
      code: 201,
      message: "Successfully downvoted a post",
      data: upvotedPost,
      query: { postId },
    });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}

export interface PostDeleteOneById {
  Params: Static<typeof postDeleteOneByIdParamsSchema>;
}

export async function deleteOneById(
  request: FastifyRequest<PostDeleteOneById>,
  reply: FastifyReply
) {
  try {
    const result = await postService.deleteOneById({
      postId: request.params.postId,
    });

    return reply.code(200).send({
      code: 200,
      message: "Successfully deleted a post",
      query: request.query,
    });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}

export default {
  create,
  getOneById,
  getMany,
  updateOneById,
  upvote,
  downvote,
  deleteOneById,
};
