import { CHANGE_IS_GAME_STARTED } from "../../utils/ActionTypes";
import { acceptGameInvite } from "../../utils/GameLogic/GameLogic";
import { GameCredentials } from "../../utils/types/GameCredentials";

export async function joinGame(
	dispatch: Function,
	onlineGameCredentials: GameCredentials
): Promise<void> {
	console.log(onlineGameCredentials)
	const isAccepted =
		onlineGameCredentials.gameId &&
		onlineGameCredentials.friendEmail &&
		(await acceptGameInvite(
			onlineGameCredentials.gameId,
			onlineGameCredentials.friendEmail
		));
	isAccepted
		? dispatch({ type: CHANGE_IS_GAME_STARTED, newIsGameStarted: true })
		: null;
}
