import { faker } from "@faker-js/faker";
import { fireEvent, render, screen } from "@testing-library/react";
import SignInForm from "./SignInForm";

describe("SignInForm", () => {
  it("should render error message if form is empty when submitted", () => {
    render(<SignInForm />);

    const usernameInputElement = screen.getByLabelText(/username/i);
    const passwordInputElement = screen.getByLabelText(/password/i);
    const signinButtonElement = screen.getByText(/sign in/i);

    fireEvent.change(usernameInputElement, {
      event: { target: { value: "" } },
    });
    fireEvent.change(passwordInputElement, {
      event: { target: { value: "" } },
    });
    fireEvent.click(signinButtonElement);

    expect(screen.getByText(/username should not be empty/i)).toBeVisible();
    expect(screen.getByText(/password should not be empty/i)).toBeVisible();
  });

  it("should render error message if password value length is < 8", () => {
    render(<SignInForm />);

    const passwordInputElement = screen.getByLabelText(/password/i);
    const signinButtonElement = screen.getByText(/sign in/i);

    fireEvent.change(passwordInputElement, {
      event: { target: { value: faker.word.noun(7) } },
    });
    fireEvent.click(signinButtonElement);

    expect(
      screen.getByText(/password's length should not be less than 8/i)
    ).toBeVisible();
  });
});
