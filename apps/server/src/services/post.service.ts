import prisma from "@/helpers/prisma";
import { Static } from "@sinclair/typebox";
import {
  postCreateBodySchema,
  postDeleteOneByIdParamsSchema,
  postGetManyQuerystringSchema,
  postGetOneByIdParamsSchema,
  postUpdateOneByIdBodySchema,
  postUpdateOneByIdParamsSchema,
} from "@/schemas/post.schema";

export async function create(payload: Static<typeof postCreateBodySchema>) {
  const { authorId, title, link = "", content = "" } = payload;

  try {
    const newPost = await prisma.post.create({
      data: {
        authorId,
        title,
        link,
        content,
      },
    });

    return newPost;
  } catch (error) {
    throw new Error("Failed to create a new post");
  }
}

export async function createChildReply() {
  
}

export async function getOneById(
  filter: Static<typeof postGetOneByIdParamsSchema>
) {
  const { postId } = filter;

  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
    });

    return post;
  } catch (error) {
    throw new Error("Failed to get a post");
  }
}

export async function getMany(
  filter: Static<typeof postGetManyQuerystringSchema>
) {
  const {
    page = 1,
    limit = 10,
    title,
    link,
    content,
    authorUsername,
    orderBy = "createdAt",
    sort = "desc",
    createdAfter,
    createdBefore,
    updatedAfter,
    updatedBefore,
  } = filter;
  try {
    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        title,
        link,
        content,
        author: {
          username: authorUsername,
        },
        createdAt: {
          gt: createdAfter,
          lt: createdBefore,
        },
        updatedAt: {
          gt: updatedAfter,
          lt: updatedBefore,
        },
      },
      orderBy: {
        [orderBy as string]: sort,
      },
    });

    if (posts.length === 0) throw new Error();

    return posts;
  } catch (error) {
    throw new Error("Failed to get post(s)");
  }
}

export async function updateOneById(
  filter: Static<typeof postUpdateOneByIdParamsSchema>,
  payload: Static<typeof postUpdateOneByIdBodySchema>
) {
  const { postId } = filter;
  const { title, content, link } = payload;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, content, link },
    });

    return updatedPost;
  } catch (error) {
    throw new Error("Failed to update post");
  }
}

export async function upvote(filter: { postId: string; userId: string }) {
  const { postId, userId } = filter;

  try {
    const upvotedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        votes: {
          connectOrCreate: {
            create: {
              userId,
              vote: 1,
            },
            where: {
              userId,
            },
          },
        },
      },
    });

    return upvotedPost;
  } catch (error) {
    throw new Error("Failed to update post");
  }
}

export async function downvote(filter: { postId: string; userId: string }) {
  const { postId, userId } = filter;

  try {
    const downvotedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        votes: {
          connectOrCreate: {
            create: {
              userId,
              vote: -1,
            },
            where: {
              userId,
            },
          },
        },
      },
    });

    return downvotedPost;
  } catch (error) {
    throw new Error("Failed to update post");
  }
}

export async function deleteOneById(
  filter: Static<typeof postDeleteOneByIdParamsSchema>
) {
  const { postId } = filter;

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    return;
  } catch (error) {
    throw new Error("Failed to delete post");
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
