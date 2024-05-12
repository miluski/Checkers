import { User } from "../../../utils/User.ts";

export async function loginUser(
	user: User,
	navigate: Function,
	handleShow: Function
): Promise<void> {
	try {
		const handleLogin = () => {
			navigate("/screenAfterLogin");
			localStorage.setItem("loggedUserEmail", user.email);
		};
		const endpoint = "http://localhost:3000/api/user/auth/login";
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		response.status === 202 ? handleLogin() : handleShow();
	} catch (error) {
		console.error(error);
	}
}
