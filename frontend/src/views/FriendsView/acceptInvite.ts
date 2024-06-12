export async function acceptInvite(invitedUserEmail: string): Promise<void> {
	try {
		const endpoint = "http://localhost:3000/api/user/acceptInvite";
		await fetch(endpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userEmail: localStorage.getItem("loggedUserEmail"),
				invitedUserEmail: invitedUserEmail,
			}),
		});
	} catch (error) {
		console.log(error);
	}
}
