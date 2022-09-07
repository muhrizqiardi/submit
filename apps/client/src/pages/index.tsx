import PostsFeed from "@/components/PostsFeed";
import PageProps from "@/helpers/PageProps";
import { GetServerSideProps } from "next";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Toolbar from "../components/Toolbar";
import getPageProps from "@/helpers/getPageProps";

function Home(props: PageProps) {
  return (
    <Container>
      <Header
        isLoggedIn={props.isLoggedIn}
        username={props.user?.username ?? ""}
      />
      <Toolbar />
      <PostsFeed
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
      <Footer />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  return {
    props: await getPageProps(context),
  };
};

export default Home;
