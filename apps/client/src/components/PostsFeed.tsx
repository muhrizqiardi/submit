import { useEffect, useState } from "react";
import PostsFeedItem from "./PostsFeedItem";

export interface PostsFeedProps {
  items: {
    id: string;
    title: string;
    link: string;
  }[];
}

function PostsFeed(props: PostsFeedProps) {
  const [windowIsAvailable, setWindowIsAvailable] = useState<boolean>(false);
  useEffect(() => {
    setWindowIsAvailable(true);
  }, []);

  if (!windowIsAvailable) return null;

  return (
    <>
      <div className="mb-4 p-4 rounded-lg bg-custom-light text-custom-dark">
        <ol className="mb-4 list-decimal list-inside flex flex-col items-start justify-start gap-4">
          {props.items.map((item, index) => (
            <PostsFeedItem key={index} item={item} />
          ))}
        </ol>

        <div className="">
          <a
            href={`?page=${
              Number.parseInt(
                new URLSearchParams(window.location.search).get("page") ?? "1"
              ) + 1
            }`}
            className="hover:underline"
          >
            next page
          </a>
        </div>
      </div>
    </>
  );
}

export default PostsFeed;
