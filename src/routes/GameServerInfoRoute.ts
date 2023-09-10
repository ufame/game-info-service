import { FastifyInstance } from "fastify";
import { QueryOptions } from "gamedig";

import { getGameServerInfo } from "../game/GameServerInfo";
import { requiredQuerySchema } from "./RequiredQuerySchema";

export const gameServerInfoRoute = async (server: FastifyInstance) => {
  server.get('/info', { schema: requiredQuerySchema }, async (request, reply) => {
    const gameQueryOptions: QueryOptions = request.query as QueryOptions;

    const result = await getGameServerInfo(gameQueryOptions);

    if (result instanceof Error) {
      reply.code(500).send({ error: result.message });
    } else {
      reply.send(result);
    }
  })
}