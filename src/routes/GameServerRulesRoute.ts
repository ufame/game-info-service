import { FastifyInstance } from "fastify";
import { QueryOptions } from "gamedig";

import { getServerRules } from "../game/GameServerInfo";
import { requiredQuerySchema } from "./RequiredQuerySchema";

export const gameRulesInfoRoute = async (server: FastifyInstance) => {
  server.get('/rules', { schema: requiredQuerySchema }, async (request, reply) => {
    const gameQueryOptions: QueryOptions = request.query as QueryOptions;

    gameQueryOptions.requestRules = true;

    const result = await getServerRules(gameQueryOptions);

    if (result instanceof Error) {
      reply.code(500).send({ error: result.message });
    } else {
      reply.send(result);
    }
  })
}