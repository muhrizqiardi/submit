import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  switch (request.method) {
    case "POST":
      console.log("bebek mama");
      try {
        const result = await axios.post<{
          code: number;
          message: string;
          data: string;
        }>(`${process.env.NEXT_APP_API_BASE_URL}/auth`, request.body);

        if (!result) throw new Error();

        setCookie("token", result.data.data, {
          req: request,
          res: response,
          maxAge: 60 * 60 * 24 * 30 * 3,
        });

        response.status(200).json(result.data);
        break;
      } catch (error) {
        console.error({ error });
        return response.status(400).end();
      }

    case "DELETE":
      deleteCookie("token");
      return response.status(400).end();

    default:
      return response.status(400).end();
  }
}
