export interface PostReplyProps {
  username: string;
  content: string;
  hasReply: boolean;
  childReply?: PostReplyProps;
}

function PostReply(props: PostReplyProps) {
  return (
    <details>
      <summary className="mb-2">
        <p className="inline-flex divide-x text-sm ">
          <a href="" className="pr-2 hover:underline">
            @{props.username}
          </a>
          <button className="px-2 hover:underline">upvote</button>
          <button className="px-2 hover:underline">downvote</button>
          <span className="px-2">2 hours ago</span>
        </p>
      </summary>
      <p className="mb-2 text-sm">{props.content}</p>
      {props.hasReply && props.childReply ? (
        <div className="px-4 border-l">
          <PostReply {...props.childReply} />
        </div>
      ) : null}
    </details>
  );
}

export default PostReply;
