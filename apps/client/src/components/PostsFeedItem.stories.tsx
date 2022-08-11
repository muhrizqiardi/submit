import { Story } from "@ladle/react";
import PostsFeedItemComponent, { PostsFeedItemProps } from "./PostsFeedItem";

export const PostsFeedItem: Story<PostsFeedItemProps["item"]> = (props) => (
  <ol className="list-decimal list-outside">
    <PostsFeedItemComponent item={props} />
  </ol>
);

PostsFeedItem.args = {
  id: "1",
  link: "https://google.com",
  title: "Best JavaScript Framework of 2022"
}