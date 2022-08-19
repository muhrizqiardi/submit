import getTokenFromHeader from "@/helpers/getTokenFromHeader";
import {
  postVotePutBodySchema,
  postVotePutHeadersSchema,
  postVotePutParamsSchema,
} from "@/schemas/post-vote.schema";
import postVoteService from "@/services/post-vote.service";
import userService from "@/services/user.service";
import { Static } from "@sinclair/typebox";
import { FastifyReply, FastifyRequest } from "fastify";

export interface PostVotePutRequest {
  Headers: Static<typeof postVotePutHeadersSchema>;
  Params: Static<typeof postVotePutParamsSchema>;
  Body: Static<typeof postVotePutBodySchema>;
}

/**
 * Handler for PUT /post-votes/:postId
 */
export async function put(
  request: FastifyRequest<PostVotePutRequest>,
  reply: FastifyReply
) {
  const {
    headers: { authorization },
    params: { postId },
    body: { vote },
  } = request;

  if (authorization === undefined) throw new Error();

  try {
    const token = getTokenFromHeader(authorization);
    const user = await userService.getOneByToken(token);
    const postVote = await postVoteService.put(user.id, { postId }, { vote });

    return reply.code(201).send({
      code: 201,
      message: "Successfully put vote on a post",
      data: postVote,
      query: { postId },
    });
  } catch (error) {
    return reply.code(500).send({
      code: 500,
      message: "Internal Server Error",
      query: { postId },
    });
  }
}

export default {
  put,
};
