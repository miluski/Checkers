export type Game = {
	creatorEmail: string;
	actualTurn: string;
	pawnPositions: Array;
	firstPlayerPoints: number;
	secondPlayerPoints: number;
	firstPlayerNickname: string;
	secondPlayerNickname: string;
	gameId?: string;
	isStarted?: boolean;
};
