import { defaultResponseDefaultSchema } from "@/helpers/defaultSchema";
import { FastifyReplyWithPayload } from "@/helpers/FastifyReplyWithPayload";
import getTokenFromHeader from "@/helpers/getTokenFromHeader";
import {
  replyVotePutBodySchema,
  replyVotePutHeadersSchema,
  replyVotePutParamsSchema,
} from "@/schemas/reply-vote.schema";
import replyVoteService from "@/services/reply-vote.service";
import userService from "@/services/user.service";
import { Static } from "@sinclair/typebox";
import { FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";

export interface ReplyVotePutRequest extends RouteGenericInterface {
  Headers: Static<typeof replyVotePutHeadersSchema>;
  Params: Static<typeof replyVotePutParamsSchema>;
  Body: Static<typeof replyVotePutBodySchema>;
  Reply: Static<typeof defaultResponseDefaultSchema>;
}

export async function put(
  request: FastifyRequest<ReplyVotePutRequest>,
  reply: FastifyReplyWithPayload<ReplyVotePutRequest>
) {
  const {
    headers: { authorization },
    params: { replyId },
    body: { vote },
  } = request;

  if (authorization === undefined) throw new Error();

  try {
    const token = getTokenFromHeader(authorization);
    const user = await userService.getOneByToken(token);
    const postVote = await replyVoteService.put(user.id, { replyId }, { vote });

    return reply.code(201).send({
      code: 201,
      message: "Successfully put vote on a reply",
      data: postVote,
      query: { replyId },
    });
  } catch (error) {
    return reply.code(500).send({
      code: 500,
      message: "Internal Server Error",
      query: {
        replyId,
      },
    });
  }
}
