export async function sendInvite(
	friendEmail: string,
	gameId: string
): Promise<boolean> {
	const endpoint = "http://localhost:3000/api/user/gameInvite";
	const email = localStorage.getItem("loggedUserEmail");
	if (email) {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ friendEmail: friendEmail, email: email, gameId: gameId }),
		});
		const status = response.status;
		return status === 200 ? true : false;
	} else return false;
}
