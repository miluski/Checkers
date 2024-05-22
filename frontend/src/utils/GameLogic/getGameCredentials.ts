import { Game } from "./Game";

export async function getGameCredentials(gameId: string): Promise<Game> {
    const endpoint = `http://192.168.0.11:3000/api/game/${gameId}/credentials`;
    const response = await fetch(endpoint);
    return await response.json();
}