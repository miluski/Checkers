import { Move } from "./Move";

export type Game = {
	creatorEmail: string;
	actualTurn: string;
	pawnPositions: Array;
	firstPlayerPoints: number;
	secondPlayerPoints: number;
	firstPlayerNickname: string;
	secondPlayerNickname: string;
	firstPlayerTime?: string;
	secondPlayerTime?: string;
	moves: Array<Move>;
	gameId?: string;
	isStarted?: boolean;
	loser?: string;
	private?: boolean;
};
