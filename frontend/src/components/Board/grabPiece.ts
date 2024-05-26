import { CHANGE_SELECTED_PIECE } from "../../utils/ActionTypes";
import { getAvailableMoves } from "./getAvalaibleMoves";

export function grabPiece(
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	dispatch: Function,
	selectedPiece: HTMLDivElement,
	pawnToBeat: HTMLDivElement,
	currentPlayerColor: string,
	playerColor: string,
	allSquares: any,
	isGameStarted: boolean
) {
	const selectedSquare = e.target as HTMLDivElement;
	if (selectedPiece === null && currentPlayerColor === playerColor) {
		if (
			(currentPlayerColor === "blue" &&
				selectedSquare.classList.contains("blue-pawn")) ||
			(currentPlayerColor === "red" &&
				selectedSquare.classList.contains("red-pawn"))
		) {
			allSquares.forEach(
				(square: { classList: { remove: (arg0: string) => void } }) => {
					square.classList.remove("available-move");
				}
			);
			const availableMoves = getAvailableMoves(
				selectedSquare,
				isGameStarted,
				pawnToBeat,
				dispatch
			);
			availableMoves.forEach((square: any) => {
				square.classList.add("available-move");
			});
			dispatch({
				type: CHANGE_SELECTED_PIECE,
				newSelectedPiece: selectedSquare,
			});
		} else {
			dispatch({ type: CHANGE_SELECTED_PIECE, newSelectedPiece: null });
		}
	}
}
