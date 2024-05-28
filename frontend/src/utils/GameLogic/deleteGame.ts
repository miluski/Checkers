export async function deleteGame(gameId: string): Promise<boolean> {
	const endpoint = `http://192.168.220.148:3000/api/game/${gameId}/delete`;
	const response = await fetch(endpoint, {
		method: "DELETE",
	});
	return response.status === 200;
}
