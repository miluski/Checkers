import { GameCredentials } from "../../utils/types/GameCredentials";

export function getGameCredentials(
	nickname: string,
	enemyNickname: string,
	currentPlayerColor: string
): GameCredentials {
	const onlineGameCredentials = localStorage.getItem("onlineGameCredentials");
	return {
		nickname:
			nickname !== "" ? nickname : localStorage.getItem("nickname") ?? "",
		enemyNickname:
			enemyNickname !== ""
				? enemyNickname
				: localStorage.getItem("enemyNickname") ?? "",
		playerColor:
			currentPlayerColor !== "" && currentPlayerColor !== null
				? currentPlayerColor
				: localStorage.getItem("playerColor") ?? "blue",
		gameCredentials:
			onlineGameCredentials !== null ? JSON.parse(onlineGameCredentials) : null,
	};
}
