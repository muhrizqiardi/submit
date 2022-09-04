import { useState } from "react";

function useError(
  initialIsError: boolean = false,
  initialErrorMessage: string = ""
) {
  const [isError, setIsError] = useState<boolean>(initialIsError);
  const [errorMessage, setErrorMessage] = useState<string>(initialErrorMessage);

  const setError = (isError: boolean = false, errorMessage: string = "") => {
    setIsError(isError);
    setErrorMessage(errorMessage);
  };

  return {
    setError,
    isError,
    errorMessage,
  };
}

export default useError;
