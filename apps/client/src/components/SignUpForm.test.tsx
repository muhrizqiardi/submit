import * as AxiosInstance from "@/helpers/axiosInstance";
import { faker } from "@faker-js/faker";
import { fireEvent, render, screen } from "@testing-library/react";
import SignUpForm from "./SignUpForm";

describe("SignUpForm", () => {
  it("should render error message if form is empty when submitted", () => {
    render(<SignUpForm />);

    const emailInputElement = screen.getByLabelText(/email/i);
    const usernameInputElement = screen.getByLabelText(/username/i);
    const passwordInputElement = screen.getByLabelText(/password/i);
    const signinButtonElement = screen.getByText(/sign up/i);

    fireEvent.change(emailInputElement, {
      event: { target: { value: "" } },
    });
    fireEvent.change(usernameInputElement, {
      event: { target: { value: "" } },
    });
    fireEvent.change(passwordInputElement, {
      event: { target: { value: "" } },
    });
    fireEvent.click(signinButtonElement);

    expect(screen.getByText(/email should not be empty/i)).toBeVisible();
    expect(screen.getByText(/username should not be empty/i)).toBeVisible();
    expect(screen.getByText(/password should not be empty/i)).toBeVisible();
  });

  it("should render error message if password value length is < 8", () => {
    render(<SignUpForm />);

    const passwordInputElement = screen.getByLabelText(/password/i);
    const signinButtonElement = screen.getByText(/sign up/i);

    fireEvent.change(passwordInputElement, {
      event: { target: { value: faker.word.noun(7) } },
    });
    fireEvent.click(signinButtonElement);

    expect(
      screen.getByText(/password's length should not be less than 8/i)
    ).toBeVisible();
  });

  it("should render error message if email's format is not correct", () => {
    render(<SignUpForm />);

    const emailInputElement = screen.getByLabelText(/email/i);
    const signinButtonElement = screen.getByText(/sign up/i);

    fireEvent.change(emailInputElement, {
      event: { target: { value: faker.word.noun(7) } },
    });
    fireEvent.click(signinButtonElement);

    expect(screen.getByText(/email's format is not correct/i)).toBeVisible();
  });

  it.skip("should render error message if API returned error", async () => {
    render(<SignUpForm />);

    const axiosInstanceSpy = jest.spyOn(AxiosInstance, "default");
  });
});
