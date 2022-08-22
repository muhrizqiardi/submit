import prisma from "@/helpers/prisma";
import {
  postVotePutBodySchema,
  postVotePutParamsSchema,
} from "@/schemas/post-vote.schema";
import { Static } from "@sinclair/typebox";

export async function put(
  userId: string,
  filter: Static<typeof postVotePutParamsSchema>,
  payload: Static<typeof postVotePutBodySchema>
) {
  const { postId } = filter;
  const { vote } = payload;

  // TODO: better error message 
  if (vote > 1 || vote < -1) throw new Error();

  try {
    const updatedPostVote = await prisma.userVotesOnPost.upsert({
      where: {
        userId,
      },
      create: {
        vote,
        userId,
        postId,
      },
      update: {
        vote,
      },
      select: {
        vote: true,
        user: true,
        post: true,
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
