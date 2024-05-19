import { Game } from "./Game"

export async function updateGameObject(game: Game) : Promise<boolean> {
    console.log(game);
    const endpoint = `http://localhost:3000/api/game/${game.gameId}/updateCredentials`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    });
    return response.status === 200;
}