import {
	CHANGE_CURRENT_PLAYER_COLOR,
	CHANGE_GAME_ID,
} from "../../utils/ActionTypes";
import { GameCredentials } from "../../utils/types/GameCredentials";
import { firstPlayerGameRefresh } from "./firstPlayerGameRefresh";
import { initializeGame } from "./initializeGame";

export function firstPlayerActions(
	dispatch: Function,
	nickname: string,
	gameCredentials: GameCredentials,
	isGameStarted: boolean
): NodeJS.Timeout | null {
	let interval: NodeJS.Timeout | null = null;
	dispatch({
		type: CHANGE_CURRENT_PLAYER_COLOR,
		newCurrentPlayerColor: "blue",
	});
	localStorage.setItem("playerColor", "blue");
	(async () => {
		let localGameId = await initializeGame(nickname, gameCredentials);
		dispatch({ type: CHANGE_GAME_ID, newGameId: localGameId });
		interval = setInterval(
			async () =>
				await firstPlayerGameRefresh(dispatch, localGameId, isGameStarted),
			100
		);
		localStorage.removeItem("onlineGameCredentials");
	})();
	return interval;
}
