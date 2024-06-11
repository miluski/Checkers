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
	isGameStarted: boolean,
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
	interval = setInterval(
		async () => await secondPlayerGameRefresh(dispatch, gameCredentials, isGameStarted),
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
