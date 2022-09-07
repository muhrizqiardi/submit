import axiosInstance from "@/helpers/axiosInstance";
import useError from "@/hooks/useError";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  title: string;
  link?: string;
  content?: string;
}

interface CreatePostFormProps {
  user: {
    username: string;
    email: string;
    id: string;
    role: {
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  } | null;
}

function CreatePostForm(props: CreatePostFormProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const { errorMessage, isError, setError } = useError();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let requestData = { ...data, authorId: props.user?.id ?? "" };
    if (requestData.link?.length === 0) delete requestData.link;
    if (requestData.content?.length === 0) delete requestData.content;

    try {
      const result = await axiosInstance().post("/posts", requestData);

      if (!result) throw new Error("");
    } catch (error) {
      if (error instanceof Error) {
        setError(
          true,
          `Can not create new post${error.message ? ":" : ""} ${error.message}`
        );
        console.error(error);
      }
    }
  };

  return (
    <form
      className="mb-12 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-4 text-xl font-bold">New Post</h1>
      <label className="flex flex-col gap-2">
        Post Title
        <input type="text" {...register("title")} required />
      </label>
      <label className="flex flex-col gap-2">
        Post Link (optional)
        <input type="url" {...register("link")} />
      </label>
      <label className="flex flex-col gap-2">
        Post Self Text (optional)
        <textarea {...register("content")} />
      </label>
      <button
        type="submit"
        className="p-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
      >
        Submit Post
      </button>
      {isError ? (
        <div className="p-4 border border-red-400  flex items-center justify-center">
          <p>{errorMessage}</p>
        </div>
      ) : null}
    </form>
  );
}

export default CreatePostForm;
