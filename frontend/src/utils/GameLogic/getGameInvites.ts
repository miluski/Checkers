export async function getGameInvites(): Promise<Object> {
	const userEmail = localStorage.getItem("loggedUserEmail");
	if (userEmail !== null && userEmail !== undefined) {
		const endpoint = `http://localhost:3000/api/user/${userEmail}/getGameInvites`;
		const response = await fetch(endpoint);
		let data = {};
		if (response.ok) {
			const text = await response.text();
			if (text) {
				data = JSON.parse(text);
			}
		}
		return data;
	} else return {};
}
