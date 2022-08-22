import PostsFeedComponent from "./PostsFeed";

export const PostsFeed = () => (
  <PostsFeedComponent
    items={[
      {
        id: "1",
        title:
          "MacBook Air 2022 outperforms every single Windows Laptop on the market",
        link: "https://google.com",
      },
      {
        id: "2",
        title: "Astro version 1.0 just released",
        link: "https://google.com",
      },
      {
        id: "1",
        title: "	Faster Ruby: Thoughts from the Outside",
        link: "https://google.com",
      },
    ]}
  />
);
