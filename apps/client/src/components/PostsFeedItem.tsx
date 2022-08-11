export interface PostsFeedItemProps {
  item: {
    id: string;
    title: string;
    link: string;
  };
}

function PostsFeedItem(props: PostsFeedItemProps) {
  return (
    <li>
      <span className="ml-2 inline-flex flex-col">
        <a href={props.item.link} className="hover:underline">
          {props.item.title}
        </a>
        <span className="text-sm inline-flex gap-2">
          <button className="hover:underline">upvote</button> |
          <button className="hover:underline">downvote</button> |
          <button className="hover:underline">save to bookmarks</button>|
          <button className="hover:underline">hide</button> |
          <a href={`/posts/${props.item.id}`} className="hover:underline">
            comments
          </a>
        </span>
      </span>
    </li>
  );
}

export default PostsFeedItem;
