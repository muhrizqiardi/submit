/**
 * Model Role
 *
 */
export type Role = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model User
 *
 */
export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Bio
 *
 */
export type Bio = {
  id: string;
  userId: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Post
 *
 */
export type Post = {
  id: string;
  title: string;
  content: string;
  link: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model Reply
 *
 */
export type Reply = {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model RepliesOnPost
 *
 */
export type RepliesOnPost = {
  parentPostId: string;
  childReplyId: string;
};

/**
 * Model RepliesOnReply
 *
 */
export type RepliesOnReply = {
  parentReplyId: string;
  childReplyId: string;
};

/**
 * Model UserVotesOnPost
 *
 */
export type UserVotesOnPost = {
  vote: number;
  postId: string;
  userId: string;
};

/**
 * Model UserVotesOnReply
 *
 */
export type UserVotesOnReply = {
  vote: number;
  replyId: string;
  userId: string;
};
