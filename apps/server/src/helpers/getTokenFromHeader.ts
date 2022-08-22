/**
 * Get token from an authorization header
 *
 * @param input
 * @returns token
 *
 * @example
 * const authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImJlYmVrIGdvcmVuZyBlbmFrIHJhc2FueWEiLCJpYXQiOjE1MTYyMzkwMjJ9.KkcoWh77Q5GBaQgD2K8WXXy82lIplgJV4T8MtYrXs6o"
 * const token = getTokenFromHeader(authorization);
 *
 */
function getTokenFromHeader(input: string) {
  try {
    const token = input.split(" ")[1];

    if (token === undefined) throw new Error("Token is not valid");

    return token;
  } catch (error) {
    throw error;
  }
}

export default getTokenFromHeader;
