import { getAvailableMoves } from "./getAvalaibleMoves";

export function isMoveLegal(
	selectedSquare: HTMLDivElement,
	targetSquare: HTMLDivElement,
	dispatch: Function,
	isGameStarted: boolean,
	pawnToBeat: HTMLDivElement | null,
	playerColor: string,
	currentPlayerColor: string
): boolean {
	const availableMoves = getAvailableMoves(
		selectedSquare,
		isGameStarted,
		pawnToBeat,
		dispatch
	);
	return (
		availableMoves.includes(targetSquare) &&
		isGameStarted &&
		playerColor === currentPlayerColor
	);
}
