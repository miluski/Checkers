import { getPawnPositions } from "./getPawnPositions";
import { createGame, sendInvite } from "../../utils/GameLogic/GameLogic";
import { GameCredentials } from "../../utils/types/GameCredentials";

export async function initializeGame(
	nickname: string,
	onlineGameCredentials: GameCredentials
): Promise<String> {
	const pawnPositions = getPawnPositions();
	const gameId = await createGame({
		creatorEmail: localStorage.getItem("loggedUserEmail") ?? "",
		actualTurn: "blue",
		pawnPositions: pawnPositions,
		firstPlayerPoints: 0,
		secondPlayerPoints: 0,
		firstPlayerNickname: nickname,
		secondPlayerNickname: "",
		moves: [],
		private: onlineGameCredentials.friendEmail ? true : false
	});
	onlineGameCredentials.friendEmail &&
		(await sendInvite(onlineGameCredentials.friendEmail, gameId));
	return gameId;
}
