import { CHANGE_NICKNAME } from "../../../utils/ActionTypes";
import { User } from "../../../utils/types/User";

export async function loginUser(
	user: User,
	navigate: Function,
	handleShow: Function,
	dispatch: Function
): Promise<void> {
	try {
		const handleLogin = (user: User) => {
			localStorage.setItem("nickname", user.nickname ?? "");
			localStorage.setItem("playerColor", "blue");
			localStorage.setItem("loggedUserEmail", user.email);
			dispatch({type: CHANGE_NICKNAME, newNickname: user.nickname});
			navigate("/screenAfterLogin");
		};
		const endpoint = "http://192.168.220.148:3000/api/user/auth/login";
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await response.json();
		response.status === 202 ? handleLogin(data) : handleShow();
	} catch (error) {
		console.error(error);
	}
}
