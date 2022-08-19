import prisma from "@/helpers/prisma";
import {
  replyDeleteOneByIdParamsSchema,
  replyGetOneByIdParamsSchema,
  replyUpdateOneByIdBodySchema,
  replyUpdateOneByIdParamsSchema,
} from "@/schemas/reply.schema";
import { Static } from "@sinclair/typebox";

export async function createChild(
  parentReplyId: string,
  authorId: string,
  payload: {
    content: string;
  }
) {
  const { content } = payload;

  try {
    const newReply = await prisma.reply.update({
      where: {
        id: parentReplyId,
      },
      data: {
        childrenReplies: {
          create: {
            childReply: {
              create: {
                content,
                authorId,
              },
            },
          },
        },
      },
      select: {
        childrenReplies: {
          select: {
            childReply: true,
          },
        },
      },
    });

    return newReply.childrenReplies[0];
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}

export async function getOneById(
  filter: Static<typeof replyGetOneByIdParamsSchema>
) {
  const { replyId } = filter;

  try {
    const reply = await prisma.reply.findUniqueOrThrow({
      where: {
        id: replyId,
      },
    });

    return reply;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}

export async function updateOneById(
  filter: Static<typeof replyUpdateOneByIdParamsSchema>,
  payload: Static<typeof replyUpdateOneByIdBodySchema>
) {
  const { replyId } = filter;
  const { content } = payload;

  try {
    const updatedReply = await prisma.reply.update({
      where: { id: replyId },
      data: { content },
    });

    return updatedReply;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}

export async function deleteOneById(
  filter: Static<typeof replyDeleteOneByIdParamsSchema>
) {
  const { replyId } = filter;

  try {
    await prisma.reply.delete({
      where: { id: replyId },
    });

    return;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}
