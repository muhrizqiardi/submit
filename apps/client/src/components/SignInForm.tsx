function SignInForm() {
  

  return (
    <form className="mb-12 flex flex-col gap-4">
      <h1 className="mb-4 text-xl font-bold">Sign In</h1>
      <label className="flex flex-col">
        Username
        <input type="email" name="text" required />
      </label>
      <label className="flex flex-col">
        Password
        <input type="email" name="password" minLength={8} required />
      </label>
      <button
        type="submit"
        className="p-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
      >
        Sign In
      </button>
    </form>
  );
}

export default SignInForm;
