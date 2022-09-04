import { FormEvent } from "react";

function CreatePostForm() {
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData) as {
      title: string;
      link?: string;
      content?: string;
    };

    return window.location.pathname
  };

  return (
    <form onSubmit={submitHandler}>
      <label>
        Post Title
        <input type="text" name="title" required />
      </label>
      <label>
        Post Link (optional)
        <input type="text" name="link" />
      </label>
      <label>
        Post Self Text (optional)
        <input type="text" name="content" />
      </label>
      <button
        type="submit"
        className="p-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
      >
        Submit Post
      </button>
    </form>
  );
}

export default CreatePostForm;
