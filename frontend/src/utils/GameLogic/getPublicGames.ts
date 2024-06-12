import { Game } from "../types/Types";

export async function getPublicGames() {
	try {
		const endpoint = "http://localhost:3000/api/game/getAll";
		const response = await fetch(endpoint);
		const data = await response.json();
		return data.filter((game: Game, _index: number) => !game.private);
	} catch (error) {
		console.log(error);
	}
}
