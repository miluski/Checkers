export async function setGameLoser(
	loser: string,
	gameId: string
): Promise<void> {
	try {
		const endpoint = `http://localhost:3000/api/game/${gameId}/end`;
		await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ loser: loser }),
		});
	} catch (error) {
		console.log(error);
	}
}
