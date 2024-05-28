import { Move } from "./Move";
import { Pawn } from "./Pawn";

export type GameState = {
	stateNickname: string;
	stateEnemyNickname: string;
	statePlayerColor: string;
	firstPlayerPoints: number;
	secondPlayerPoints: number;
	firstPlayerTime: string;
	secondPlayerTime: string;
	moves: Array<Move>;
	turnNumber: number;
	gameReducer: any;
};

export type BoardState = {
	selectedPiece: HTMLDivElement;
	pawnToBeat: HTMLDivElement | null;
	gameId: string;
	currentPlayerColor: "blue" | "red";
	isGameStarted: boolean;
	pawnsPositions: Pawn[];
	boardReducer: any;
	isGameEnded: boolean;
};
