import { Game } from "./Game";

export async function getGameCredentials(gameId: string): Promise<Game> {
    const endpoint = `http://localhost:3000/api/game/${gameId}/credentials`;
    const response = await fetch(endpoint);
    return await response.json();
}