import {
	CHANGE_CURRENT_PLAYER_COLOR,
	CHANGE_GAME_ID,
} from "../../utils/ActionTypes";
import { GameCredentials } from "../../utils/types/GameCredentials";
import { joinGame } from "./joinGame";
import { secondPlayerGameRefresh } from "./secondPlayerGameRefresh";
import { startTimer } from "./startTimer";

export function secondPlayerActions(
	dispatch: Function,
	gameCredentials: GameCredentials
): NodeJS.Timeout | null {
	let interval: NodeJS.Timeout | null = null;
	dispatch({
		type: CHANGE_GAME_ID,
		newGameId: gameCredentials.gameId,
	});
	(async () => {
		await startTimer(1);
		await joinGame(dispatch, gameCredentials);
	})();
	interval = setInterval(
		async () => await secondPlayerGameRefresh(dispatch, gameCredentials),
		100
	);
	dispatch({
		type: CHANGE_CURRENT_PLAYER_COLOR,
		newCurrentPlayerColor: "red",
	});
	localStorage.setItem("playerColor", "red");
	localStorage.removeItem("onlineGameCredentials");
	return interval;
}
