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
	gameCredentials: GameCredentials,
	navigate: Function
): NodeJS.Timeout | null {
	let interval: NodeJS.Timeout | null = null;
	dispatch({
		type: CHANGE_GAME_ID,
		newGameId: gameCredentials.gameId,
	});
	(async () => {
		const endpoint = `http://localhost:3000/api/game/${gameCredentials.gameId}/credentials`;
		const response = await fetch(endpoint);
		const data = await response.json();
		await startTimer(data[0].firstTimerId);
		await joinGame(dispatch, gameCredentials);
	})();
	let needToClearInterval = false;
	interval = setInterval(async () => {
		needToClearInterval = await secondPlayerGameRefresh(
			dispatch,
			gameCredentials
		);
		needToClearInterval && interval && clearInterval(interval);
		needToClearInterval && navigate("/screenAfterLogin");
	}, 100);
	dispatch({
		type: CHANGE_CURRENT_PLAYER_COLOR,
		newCurrentPlayerColor: "red",
	});
	localStorage.setItem("playerColor", "red");
	localStorage.removeItem("onlineGameCredentials");
	return interval;
}
