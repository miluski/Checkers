import { getGameCredentials } from "./getGameCredentials";

export async function acceptGameInvite(
	gameId: string,
	friendEmail: string
): Promise<boolean> {
	const gameCredentials = await getGameCredentials(gameId);
	const email = localStorage.getItem("loggedUserEmail");
	if (email) {
		const endpoint = "http://192.168.0.11:3000/api/user/acceptGameInvite";
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				gameId: gameId,
				friendEmail: friendEmail,
				email: email,
				...gameCredentials,
			}),
		});
		return response.status === 200 ? true : false;
	} else return false;
}
