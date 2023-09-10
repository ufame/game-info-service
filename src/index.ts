import fastify, { FastifyInstance } from "fastify";

import { gameServerInfoRoute } from "./routes/GameServerInfoRoute";
import { gamePlayersInfoRoute } from "./routes/GameServerPlayersRoute";
import { gameMapInfoRoute } from "./routes/GameServerCurrentMapRoute";
import { gameRulesInfoRoute } from "./routes/GameServerRulesRoute";

const server: FastifyInstance = fastify();

server.register(
  import("@fastify/rate-limit"), {
    max: 60,
    timeWindow: "1 minute"
  }
);

server.register(gameServerInfoRoute, { prefix: "/api/game-info" });
server.register(gameMapInfoRoute, { prefix: "/api/game-info" });
server.register(gamePlayersInfoRoute, { prefix: "/api/game-info" });
server.register(gameRulesInfoRoute, { prefix: "/api/game-info" });

server.listen({ port: 3000 }, (err: Error | null, address: string) => {
  if (err) {
    throw err;
  }

  console.log("Server is running on", address);
  console.log(server.printRoutes());
});
