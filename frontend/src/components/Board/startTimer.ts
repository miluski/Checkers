export async function startTimer(timerId: number) {
	const endpoint = "http://192.168.220.148:3000/api/game/startTimer";
	await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ timerId: timerId }),
	});
}
