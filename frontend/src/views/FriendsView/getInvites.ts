export async function getInvites(): Promise<Object> {
	const userEmail = localStorage.getItem("loggedUserEmail");
	if (userEmail !== null) {
		const endpoint = `http://192.168.220.148:3000/api/user/${userEmail}/getInvites`;
		const response = await fetch(endpoint);
		let data = { email: "" };
		if (response.ok) {
			const text = await response.text();
			if (text) {
				data = JSON.parse(text);
			}
		}
		return data;
	} else return { email: "" };
}
