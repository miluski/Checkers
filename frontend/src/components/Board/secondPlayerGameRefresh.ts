import {
	CHANGE_NICKNAME,
	CHANGE_ENEMY_NICKNAME,
	CHANGE_CURRENT_PLAYER_COLOR,
	CHANGE_PAWNS_POSITIONS,
	CHANGE_MOVES,
	CHANGE_FIRST_PLAYER_POINTS,
	CHANGE_SECOND_PLAYER_POINTS,
	CHANGE_FIRST_TIMER_ID,
	CHANGE_SECOND_TIMER_ID,
	CHANGE_LOSER,
} from "../../utils/ActionTypes";
import { GameCredentials } from "../../utils/types/GameCredentials";

export async function secondPlayerGameRefresh(
	dispatch: Function,
	gameCredentials: GameCredentials
): Promise<boolean> {
	if (gameCredentials.gameId) {
		try {
			const endpoint = `http://localhost:3000/api/game/${gameCredentials.gameId}/credentials`;
			const response = await fetch(endpoint);
			const data = await response.json();
			if (
				data &&
				data[0].firstPlayerNickname !== undefined &&
				data[0].firstPlayerNickname !== ""
			) {
				dispatch({
					type: CHANGE_NICKNAME,
					newNickname: data[0].firstPlayerNickname,
				});
				dispatch({
					type: CHANGE_FIRST_TIMER_ID,
					newFirstTimerId: data[0].firstTimerId,
				});
				dispatch({
					type: CHANGE_SECOND_TIMER_ID,
					newSecondTimerId: data[0].secondTimerId,
				});
				localStorage.setItem("nickname", data[0].firstPlayerNickname);
				dispatch({
					type: CHANGE_ENEMY_NICKNAME,
					newEnemyNickname: data[0].secondPlayerNickname,
				});
				localStorage.setItem("enemyNickname", data[0].secondPlayerNickname);
				dispatch({
					type: CHANGE_CURRENT_PLAYER_COLOR,
					newCurrentPlayerColor: data[0].actualTurn,
				});
				dispatch({ type: CHANGE_MOVES, newMoves: data[0].moves });
				dispatch({
					type: CHANGE_FIRST_PLAYER_POINTS,
					newFirstPlayerPoints: Number(data[0].firstPlayerPoints),
				});
				dispatch({
					type: CHANGE_SECOND_PLAYER_POINTS,
					newSecondPlayerPoints: Number(data[0].secondPlayerPoints),
				});
				dispatch({ type: CHANGE_LOSER, newLoser: data[0].loser });
				data[0].isStarted
					? dispatch({
							type: CHANGE_PAWNS_POSITIONS,
							newPawnsPositions: data[0].pawnPositions,
					  })
					: null;
			}
			return false;
		} catch (error) {
			console.log(error);
			return true;
		}
	} else return false;
}
