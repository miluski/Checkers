import { Game } from "./Game";

export async function createGame(game: Game): Promise<string> {
	const endpoint = "http://192.168.0.11:3000/api/game/create";
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(game),
	});
	let data = {gameId: ""};
	if (response.ok) {
		const text = await response.text();
		if (text) {
			data = JSON.parse(text);
		}
	}
	return data.gameId;
}
