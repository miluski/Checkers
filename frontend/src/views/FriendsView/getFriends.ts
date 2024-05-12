export async function getFriends(): Promise<Object> {
	const userEmail = localStorage.getItem("loggedUserEmail");
	if (userEmail !== null) {
        const endpoint = `http://localhost:3000/api/user/friends/email/${userEmail}`;
		const response = await fetch(endpoint);
        return await response.json();
	} else return [{ email: "" }];
}
