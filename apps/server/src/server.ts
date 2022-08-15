import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Fastify from "fastify";

const server = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

export default server;
