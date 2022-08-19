function getTokenFromHeader(input: string) {
  try {
    const token = input.split(" ")[1];

    if (token === undefined) throw new Error("Token is not valid");

    return token;
  } catch (error) {
    throw error;
  }
}
