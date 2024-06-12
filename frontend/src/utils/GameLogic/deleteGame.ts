export async function deleteGame(gameId: string): Promise<boolean> {
	try {
		const endpoint = `http://localhost:3000/api/game/${gameId}/delete`;
		const response = await fetch(endpoint, {
			method: "DELETE",
		});
		return response.status === 200;
	} catch (error) {
		console.log(error);
		return false;
	}
}
