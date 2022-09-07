import axiosInstance from "@/helpers/axiosInstance";
import useError from "@/hooks/useError";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface Inputs {
  email: string;
  username: string;
  password: string;
}

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isError, errorMessage, setError } = useError();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance().post<{
        code: number;
        message: string;
        data: {
          email: string;
          username: string;
          password: string;
        };
      }>("/users", { ...data, role: "USER" });
      if (response) window.location.pathname = "/sign-in";
    } catch (error) {
      setError(true, "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="mb-12 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-4 text-xl font-bold">Sign Up</h1>
      <label className="flex flex-col">
        Email
        <input type="email" {...register("email")} required />
      </label>
      <label className="flex flex-col">
        Username
        <input type="text" {...register("username")} required />
      </label>
      <label className="flex flex-col">
        Password
        <input
          type="password"
          {...register("password")}
          minLength={8}
          required
        />
      </label>
      <button
        type="submit"
        className={`p-2 bg-gray-300 hover:bg-gray-400 rounded-lg ${
          isLoading ? "disabled" : ""
        }`}
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
