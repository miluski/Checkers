export async function stopTimer(timerId: number) {
	const endpoint = "http://192.168.220.148:3000/api/game/stopTimer";
	await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ timerId: timerId }),
	});
}
