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
	navigate: Function
): NodeJS.Timeout | null {
	let interval: NodeJS.Timeout | null = null;
	dispatch({
		type: CHANGE_CURRENT_PLAYER_COLOR,
		newCurrentPlayerColor: "blue",
	});
	localStorage.setItem("playerColor", "blue");
	(async () => {
		let localGameId = await initializeGame(nickname, gameCredentials);
		let needToClearInterval = false;
		dispatch({ type: CHANGE_GAME_ID, newGameId: localGameId });
		interval = setInterval(async () => {
			needToClearInterval = await firstPlayerGameRefresh(dispatch, localGameId);
			needToClearInterval && interval && clearInterval(interval);
			needToClearInterval && navigate("/screenAfterLogin");
		}, 100);
		localStorage.removeItem("onlineGameCredentials");
	})();
	return interval;
}
