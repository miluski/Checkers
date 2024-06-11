export async function resetTimers(
	firstTimerId: string,
	secondTimerId: string
): Promise<void> {
	try {
		const endpoint = "http://localhost:3000/api/game/resetTimers";
		await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstTimerId: firstTimerId,
				secondTimerId: secondTimerId,
			}),
		});
	} catch (error) {
		console.log(error);
	}
}
