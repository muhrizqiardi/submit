import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import CreatePostForm from "./CreatePostForm";

describe("CreatePostForm", () => {
  afterEach(() => cleanup());
  it("should render all of the form and inputs", () => {
    render(<CreatePostForm />);

    screen.getByLabelText("Post Title");
    screen.getByLabelText("Post Link (optional)");
    screen.getByLabelText("Post Self Text (optional)");
    screen.getByText("Submit Post");
  });

  it("should be able to enter the form and submit the form", () => {
    render(<CreatePostForm />);

    const postTitleInputElement = screen.getByLabelText("Post Title");
    const postLinkInputElement = screen.getByLabelText("Post Link (optional)");
    const postSelfTextInputElement = screen.getByLabelText(
      "Post Self Text (optional)"
    );
    const submitPostButtonElement = screen.getByText("Submit Post");

    fireEvent.change(postTitleInputElement, {
      target: { value: faker.lorem.sentence(5) },
    });
    fireEvent.change(postLinkInputElement, {
      target: { value: faker.internet.url() },
    });
    fireEvent.change(postSelfTextInputElement, {
      target: { value: faker.lorem.sentences(10) },
    });
    fireEvent.click(submitPostButtonElement);
  });

  it("should render error message if post title is not entered", () => {
    render(<CreatePostForm />);

    const postTitleInputElement = screen.getByLabelText("Post Title");
    const submitPostButtonElement = screen.getByTitle("Submit Post");

    fireEvent.change(postTitleInputElement, {
      target: { value: "" },
    });
    fireEvent.click(submitPostButtonElement);

    expect(screen.getByText(/title is empty/i));
  });

  it("should render error message if post link is not formatted correctly", () => {
    render(<CreatePostForm />);

    const postTitleInputElement = screen.getByLabelText("Post Title");
    const postLinkInputElement = screen.getByLabelText("Post Link (optional)");
    const submitPostButtonElement = screen.getByTitle("Submit Post");

    fireEvent.change(postTitleInputElement, {
      target: { value: faker.lorem.sentence(5) },
    });
    fireEvent.change(postLinkInputElement, {
      target: { value: faker.lorem.sentence(5) },
    });
    fireEvent.click(submitPostButtonElement);

    expect(screen.getByText(/link is not formatted correctly/i));
  });
});
