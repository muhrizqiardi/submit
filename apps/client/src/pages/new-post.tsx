import CreatePostForm from "@/components/CreatePostForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Container from "@/components/Container";
import { GetServerSideProps } from "next";
import PageProps from "@/helpers/PageProps";
import getPageProps from "@/helpers/getPageProps";

function CreatePost(props: PageProps) {
  return (
    <Container>
      <Header
        isLoggedIn={props.isLoggedIn}
        username={props.user?.username ?? ""}
      />
      {props.isLoggedIn ? (
        <CreatePostForm user={props.user} />
      ) : (
        <p className="my-12 text-lg font-bold text-center">Sign in first.</p>
      )}
      <Footer />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => ({
  props: await getPageProps(context),
});

export default CreatePost;
