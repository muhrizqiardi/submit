import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Toolbar from "@/components/Toolbar";
import axiosInstance from "@/helpers/axiosInstance";
import getPageProps from "@/helpers/getPageProps";
import PageProps from "@/helpers/PageProps";
import { GetServerSideProps } from "next";
import type { Post } from "@/helpers/types";

interface PostDetailPageProps extends PageProps {
  post: Post;
}

function PostDetailPage(props: PostDetailPageProps) {
  return (
    <Container>
      <Header
        isLoggedIn={props.isLoggedIn}
        username={props.user?.username ?? ""}
      />
      <Toolbar />
      <Footer />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<
  PostDetailPageProps,
  { postId: string }
> = async (context) => {
  const pageProps = await getPageProps(context);
  let postDetail;

  try {
    postDetail = await axiosInstance().get<{
      code: number;
      message: string;
      data: Post;
    }>(`/posts/${context.params?.postId}`);
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: { ...pageProps, post: postDetail?.data.data },
  };
};

export default PostDetailPage;
