import { defaultResponseDefaultSchema } from "@/helpers/defaultSchema";
import { FastifyReplyWithPayload } from "@/helpers/FastifyReplyWithPayload";
import getTokenFromHeader from "@/helpers/getTokenFromHeader";
import {
  replyCreateChildReplyBodySchema,
  replyCreateChildReplyHeadersSchema,
  replyCreateChildReplyParamsSchema,
  replyGetOneByIdParamsSchema,
  replyUpdateOneByIdParamsSchema,
  replyUpdateOneByIdBodySchema,
  replyDeleteOneByIdParamsSchema,
} from "@/schemas/reply.schema";
import replyService from "@/services/reply.service";
import userService from "@/services/user.service";
import { Static } from "@sinclair/typebox";
import { FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";

export interface ReplyCreateChildReplyRequest extends RouteGenericInterface {
  Header: Static<typeof replyCreateChildReplyHeadersSchema>;
  Params: Static<typeof replyCreateChildReplyParamsSchema>;
  Body: Static<typeof replyCreateChildReplyBodySchema>;
  Reply: Static<typeof defaultResponseDefaultSchema>;
}

/**
 * Handler for POST /replies/:parentReply/replies
 */
export async function createChildReply(
  request: FastifyRequest<ReplyCreateChildReplyRequest>,
  reply: FastifyReplyWithPayload<ReplyCreateChildReplyRequest>
) {
  const {
    headers: { authorization },
    params: { parentReplyId },
    body: { content },
  } = request;

  try {
    if (authorization === undefined) throw new Error();

    const token = getTokenFromHeader(authorization);
    const author = await userService.getOneByToken(token);
    const { childReply: newReply } = await replyService.createChildReply(
      parentReplyId,
      author.id,
      { content }
    );

    return reply.code(201).send({
      code: 201,
      message: "Successfull created child reply",
      data: {
        newReply,
      },
      query: {
        parentReplyId,
      },
    });
  } catch (error) {
    return reply.code(500).send({
      code: 500,
      message: "Internal Server Error",
      query: {
        parentReplyId,
      },
    });
  }
}

export interface ReplyGetOneByIdRequest extends RouteGenericInterface {
  Params: Static<typeof replyGetOneByIdParamsSchema>;
  Reply: Static<typeof defaultResponseDefaultSchema>;
}

/**
 * Handler for GET /replies/:replyId
 */
export async function getOneById(
  request: FastifyRequest<ReplyGetOneByIdRequest>,
  reply: FastifyReplyWithPayload<ReplyGetOneByIdRequest>
) {
  const {
    params: { replyId },
  } = request;

  try {
    const replyData = await replyService.getOneById({ replyId });

    return reply.code(200).send({
      code: 200,
      message: "Successfully get reply",
      data: replyData,
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

export interface ReplyUpdateOneByIdRequest extends RouteGenericInterface {
  Params: Static<typeof replyUpdateOneByIdParamsSchema>;
  Body: Static<typeof replyUpdateOneByIdBodySchema>;
  Reply: Static<typeof defaultResponseDefaultSchema>;
}

/**
 * Handler for PATCH /replies/:replyId
 */
export async function updateOneById(
  request: FastifyRequest<ReplyUpdateOneByIdRequest>,
  reply: FastifyReplyWithPayload<ReplyUpdateOneByIdRequest>
) {
  const {
    params: { replyId },
    body: { content },
  } = request;

  try {
    const updatedReply = await replyService.updateOneById(
      { replyId },
      { content }
    );

    return reply.code(201).send({
      code: 201,
      message: "Successfully updated reply",
      data: updatedReply,
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

export interface ReplyDeleteOneByIdRequest extends RouteGenericInterface {
  Params: Static<typeof replyDeleteOneByIdParamsSchema>;
  Reply: Static<typeof defaultResponseDefaultSchema>;
}

/**
 * Handler for DELETE /replies/:replyId
 */
export async function deleteOneById(
  request: FastifyRequest<ReplyDeleteOneByIdRequest>,
  reply: FastifyReplyWithPayload<ReplyDeleteOneByIdRequest>
) {
  const {
    params: { replyId },
  } = request;

  try {
    await replyService.deleteOneById({ replyId });

    return reply.code(200).send({
      code: 200,
      message: "Successfully deleted reply",
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

export default {
  createChildReply,
  getOneById,
  updateOneById,
  deleteOneById,
};
