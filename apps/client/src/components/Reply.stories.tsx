import Reply from "./Reply";

const content =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat reprehenderit consectetur harum, explicabo amet ea perspiciatis quia eveniet delectus cupiditate vitae illum, saepe eligendi nemo totam tenetur? Molestias laborum fugit error consequuntur explicabo, facilis, corrupti a ipsa, ullam nesciunt quod itaque laboriosam libero eaque eveniet suscipit dicta maiores recusandae dignissimos?";

export const defaultStory = () => (
  <Reply
    username="bebek1"
    content={content}
    hasReply
    childReply={{
      username: "bebek2",
      content,
      hasReply: true,
      childReply: { username: "bebek2", content, hasReply: false },
    }}
  />
);
