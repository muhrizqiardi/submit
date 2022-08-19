import prisma from "@/helpers/prisma";
import {
  replyVotePutBodySchema,
  replyVotePutParamsSchema,
} from "@/schemas/reply-vote.schema";
import { Static } from "@sinclair/typebox";

export async function put(
  userId: string,
  filter: Static<typeof replyVotePutParamsSchema>,
  payload: Static<typeof replyVotePutBodySchema>
) {
  const { replyId } = filter;
  const { vote } = payload;

  try {
    const updatedPostVote = await prisma.userVotesOnReply.upsert({
      where: {
        userId,
      },
      create: {
        vote,
        userId,
        replyId,
      },
      update: {
        vote,
      },
      select: {
        vote: true,
        user: true,
        reply: true,
      },
    });

    return updatedPostVote;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}

export default {
  put,
};
