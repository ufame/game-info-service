import Gamedig, { QueryOptions } from "gamedig";

export async function getGameServerInfo(gameQueryOptions: QueryOptions) {
  try {
    const result = await Gamedig.query(gameQueryOptions);

    return result;
  } catch (error) {
    console.error("Failed to query game server:", error);
    return new Error(`Failed to query game server: ${error}`);
  }
}

export async function getCurrentMapInfo(gameQueryOptions: QueryOptions) {
  const result = await getGameServerInfo(gameQueryOptions);
  
  if (result instanceof Error) {
    console.error("Error:", result.message);
    return result;
  }

  return result.map;
}

export async function getPlayerInfo(gameQueryOptions: QueryOptions) {
  const result = await getGameServerInfo(gameQueryOptions);
  
  if (result instanceof Error) {
    console.error("Error:", result.message);
    return result;
  }

  return result.players;
}

export async function getServerRules(gameQueryOptions: QueryOptions) {
  const result = await getGameServerInfo(gameQueryOptions);
  
  if (result instanceof Error) {
    console.error("Error:", result.message);
    return result;
  }

  if (!result.raw || typeof result.raw !== "object" || !("rules" in result.raw)) {
    console.error("Error: requestRules is false. Need true.");
    return new Error("Error: requestRules is false. Need true.");
  }

  return result.raw.rules;
}