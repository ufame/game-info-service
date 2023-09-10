import { FastifyInstance } from "fastify";
import { QueryOptions } from "gamedig";

import { getPlayerInfo } from "../game/GameServerInfo";
import { requiredQuerySchema } from "./RequiredQuerySchema";

export const gamePlayersInfoRoute = async (server: FastifyInstance) => {
  server.get('/players', { schema: requiredQuerySchema }, async (request, reply) => {
    const gameQueryOptions: QueryOptions = request.query as QueryOptions;

    const result = await getPlayerInfo(gameQueryOptions);

    if (result instanceof Error) {
      reply.code(500).send({ error: result.message });
    } else {
      reply.send(result);
    }
  })
}