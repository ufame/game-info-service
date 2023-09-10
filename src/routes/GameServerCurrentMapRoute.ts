import { FastifyInstance } from "fastify";
import { QueryOptions } from "gamedig";

import { getCurrentMapInfo } from "../game/GameServerInfo";
import { requiredQuerySchema } from "./RequiredQuerySchema";

export const gameMapInfoRoute = async (server: FastifyInstance) => {
  server.get('/map', { schema: requiredQuerySchema }, async (request, reply) => {
    const gameQueryOptions: QueryOptions = request.query as QueryOptions;

    const result = await getCurrentMapInfo(gameQueryOptions);

    if (result instanceof Error) {
      reply.code(500).send({ error: result.message });
    } else {
      reply.send(result);
    }
  })
}