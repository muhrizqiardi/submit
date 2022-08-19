import { FastifyInstance, FastifyPluginOptions } from "fastify";

async function replyRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) {

  return next();
}
