import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Fastify from "fastify";
import swaggerConfigs from "./helpers/swaggerConfigs";
import routes from "./routes";

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

server.register(require("@fastify/swagger"), swaggerConfigs);
server.register(routes);

export default server;
