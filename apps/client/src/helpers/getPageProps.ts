import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import axios from "axios";
import PageProps from "./PageProps";

async function getPageProps(
  context: GetServerSidePropsContext
): Promise<PageProps> {
  let tokenIsValidResult;
  let isLoggedIn = true;

  try {
    tokenIsValidResult = await axios.get<{
      code: number;
      message: string;
      data: {
        token: string;
        user: {
          username: string;
          email: string;
          id: string;
          role: {
            id: number;
            name: string;
            createdAt: string;
            updatedAt: string;
          };
          createdAt: string;
          updatedAt: string;
        };
      };
    }>("/auth", {
      baseURL: process?.env?.API_BASE_URL ?? "http://localhost:9000",
      headers: {
        Authorization: `Bearer ${getCookie("token", {
          req: context.req,
          res: context.res,
        })}`,
      },
    });
  } catch (error) {
    console.error(error);
    isLoggedIn = false;
  }

  return {
    isLoggedIn,
    user: tokenIsValidResult?.data.data.user ?? null,
  };
}

export default getPageProps;
