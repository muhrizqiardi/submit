import useError from "@/hooks/useError";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  username: string;
  password: string;
}

function SignInForm() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isError, errorMessage, setError } = useError();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post<{
        code: number;
        message: string;
        data: string;
      }>("/api/auth", { ...data, role: "USER" });

      if (!response) throw new Error();

      window.location.pathname = "/";
    } catch (error) {
      if (error instanceof Error)
        setError(true, `Failed to sign up: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="mb-12 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-4 text-xl font-bold">Sign In</h1>
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
        Sign In
      </button>
      {isError ? (
        <div className="p-4 border border-red-400  flex items-center justify-center">
          <p>{errorMessage}</p>
        </div>
      ) : null}
    </form>
  );
}

export default SignInForm;
