import { Move } from "./Move";

export type GameAction = {
	type: string;
	newNickname: string;
	newEnemyNickname: string;
	newPlayerColor: "blue" | "red";
	newFirstPlayerPoints: number;
	newSecondPlayerPoints: number;
	newFirstPlayerTime: string;
	newSecondPlayerTime: string;
	newFirstTimerId: string;
	newSecondTimerId: string;
	newMoves: Array<Move>;
	newTurnNumber: number;
};

export type BoardAction = {
	type: string;
	newSelectedPiece: HTMLDivElement;
	newPawnToBeat: HTMLDivElement;
	newGameId: string;
	newCurrentPlayerColor: "blue" | "red";
	newIsGameStarted: boolean;
	newPawnsPositions: Pawn[];
	newIsGameEnded: boolean;
};
