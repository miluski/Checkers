import {
  CHANGE_NICKNAME,
  CHANGE_ENEMY_NICKNAME,
  CHANGE_CURRENT_PLAYER_COLOR,
  CHANGE_PAWNS_POSITIONS,
  CHANGE_MOVES,
  CHANGE_FIRST_PLAYER_POINTS,
  CHANGE_SECOND_PLAYER_POINTS,
  CHANGE_IS_GAME_ENDED,
} from "../../utils/ActionTypes";

export async function secondPlayerGameRefresh(
  dispatch: Function,
  gameCredentials: any
) {
  if (gameCredentials.gameId) {
    const endpoint = `http://192.168.220.148:3000/api/game/${gameCredentials.gameId}/credentials`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data) {
      dispatch({
        type: CHANGE_NICKNAME,
        newNickname: data[0].firstPlayerNickname,
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
      data[0].isStarted
        ? dispatch({
            type: CHANGE_PAWNS_POSITIONS,
            newPawnsPositions: data[0].pawnPositions,
          })
        : null;
    } else dispatch({ type: CHANGE_IS_GAME_ENDED, newIsGameEnded: true });
  }
}
