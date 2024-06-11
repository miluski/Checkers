export async function removeFriend(friendEmail: string): Promise<void> {
	try {
		const endpoint = "http://localhost:3000/api/user/removeFriend";
		await fetch(endpoint, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userEmail: localStorage.getItem("loggedUserEmail"),
				friendEmail: friendEmail,
			}),
		});
	} catch (error) {
		console.log(error);
	}
}
