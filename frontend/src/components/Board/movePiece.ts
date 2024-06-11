import {
	CHANGE_CURRENT_PLAYER_COLOR,
	CHANGE_FIRST_PLAYER_POINTS,
	CHANGE_MOVES,
	CHANGE_PAWNS_POSITIONS,
	CHANGE_PAWN_TO_BEAT,
	CHANGE_SECOND_PLAYER_POINTS,
	CHANGE_SELECTED_PIECE,
	CHANGE_TURN_NUMBER,
} from "../../utils/ActionTypes";
import { updateGameObject } from "../../utils/GameLogic/GameLogic";
import { Move } from "../../utils/types/Move";
import { Pawn } from "../../utils/types/Types";
import { getColRowDescription } from "./getColRowDescription";
import { getPawnPositions } from "./getPawnPositions";
import { isMoveLegal } from "./isMoveLegal";
import { startTimer } from "./startTimer";
import { stopTimer } from "./stopTimer";

export function movePiece(
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	selectedPiece: HTMLDivElement,
	dispatch: Function,
	isGameStarted: boolean,
	pawnToBeat: HTMLDivElement | null,
	playerColor: string,
	currentPlayerColor: string,
	pawnsPositions: Pawn[],
	gameId: string,
	nickname: string,
	enemyNickname: string,
	moves: Array<Move>,
	actualTurn: number,
	firstPlayerPoints: number,
	secondPlayerPoints: number,
	allSquares: any,
	firstTimerId: string,
	secondTimerId: string
) {
	const targetSquare = e.target as HTMLDivElement;
	let finalFirstPlayerPoints = firstPlayerPoints;
	let finalSecondPlayerPoints = secondPlayerPoints;
	if (targetSquare.classList.contains("square") && selectedPiece) {
		const selectedClass = selectedPiece.classList.item(0);
		const copiedSelectedPiece = selectedPiece;
		const targetClass = targetSquare.classList.item(0);
		let newPawnPositions = getPawnPositions();
		if (
			isMoveLegal(
				selectedPiece,
				targetSquare,
				dispatch,
				isGameStarted,
				pawnToBeat,
				playerColor,
				currentPlayerColor
			)
		) {
			const moveFrom = getColRowDescription(selectedPiece);
			const className = targetSquare.className;
			const match = className.match(/square-(\d+)/);
			const number = match ? match[1] : null;
			const numberString = number && number.toString();
			const firstDigit = numberString && numberString[0];
			const secondDigit = numberString && numberString[1];
			const moveTo = String.fromCharCode(Number(secondDigit) + 64) + firstDigit;
			let index = moves.findIndex(
				(move) => Number(move.turnNumber) === Number(actualTurn) + Number(1)
			);
			if (index !== -1 && currentPlayerColor === "red") {
				moves[index].redMove = moveFrom + "->" + moveTo;
			} else {
				moves.push({
					turnNumber: Number(actualTurn) + Number(1),
					blueMove: moveFrom + "->" + moveTo,
					redMove: " ",
				});
			}
			dispatch({ type: CHANGE_MOVES, newMoves: moves });
			dispatch({
				type: CHANGE_TURN_NUMBER,
				newTurnNumber: Number(actualTurn) + Number(1),
			});
			selectedPiece.classList.replace(selectedClass!, targetClass!);
			if (
				targetClass === "square-81" ||
				targetClass === "square-82" ||
				targetClass === "square-83" ||
				targetClass === "square-84" ||
				targetClass === "square-85" ||
				targetClass === "square-86" ||
				targetClass === "square-87" ||
				targetClass === "square-88"
			) {
				selectedPiece.classList.replace("blue-pawn", "blue-pawn-king");
				copiedSelectedPiece.classList.replace("blue-pawn", "blue-pawn-king");
			} else if (
				targetClass === "square-11" ||
				targetClass === "square-12" ||
				targetClass === "square-13" ||
				targetClass === "square-14" ||
				targetClass === "square-15" ||
				targetClass === "square-16" ||
				targetClass === "square-17" ||
				targetClass === "square-18"
			) {
				selectedPiece.classList.replace("red-pawn", "red-pawn-king");
				copiedSelectedPiece.classList.replace("red-pawn", "red-pawn-king");
			}
			if (pawnToBeat) {
				currentPlayerColor === "blue"
					? (finalFirstPlayerPoints = Number(firstPlayerPoints) + Number(1))
					: (finalSecondPlayerPoints = Number(secondPlayerPoints) + Number(1));
				dispatch({
					type: CHANGE_FIRST_PLAYER_POINTS,
					newFirstPlayerPoints: finalFirstPlayerPoints,
				});
				dispatch({
					type: CHANGE_SECOND_PLAYER_POINTS,
					newSecondPlayerPoints: finalSecondPlayerPoints,
				});
				const toBeatRow = pawnToBeat.getAttribute("data-row");
				const toBeatCol = pawnToBeat.getAttribute("data-col");
				const toBeatKey = `${toBeatRow}-${toBeatCol}`;
				newPawnPositions = pawnsPositions.filter(
					(pawn: Pawn) => `${pawn.dataRow}-${pawn.dataCol}` !== toBeatKey
				);
				newPawnPositions = newPawnPositions.filter(
					(pawn: Pawn) =>
						pawn.tabIndex !== copiedSelectedPiece.tabIndex ||
						pawn.dataRow !==
							Number(copiedSelectedPiece.getAttribute("data-row")) ||
						pawn.dataCol !==
							Number(copiedSelectedPiece.getAttribute("data-col"))
				);
				const newPawn = {
					tabIndex: copiedSelectedPiece.tabIndex,
					dataRow: Number(toBeatRow),
					dataCol: Number(toBeatCol),
					className: copiedSelectedPiece.className,
				};
				newPawnPositions.push(newPawn);
				dispatch({
					type: CHANGE_PAWNS_POSITIONS,
					newPawnsPositions: newPawnPositions,
				});
				dispatch({ type: CHANGE_PAWN_TO_BEAT, newPawnToBeat: null });
			} else newPawnPositions = getPawnPositions();
			(async () => {
				isGameStarted && currentPlayerColor === "blue"
					? (await stopTimer(firstTimerId), await startTimer(secondTimerId))
					: (await stopTimer(secondTimerId), await startTimer(firstTimerId));
				isGameStarted
					? await updateGameObject({
							gameId: gameId,
							creatorEmail: "",
							actualTurn: currentPlayerColor === "blue" ? "red" : "blue",
							pawnPositions: newPawnPositions,
							firstPlayerPoints: finalFirstPlayerPoints,
							secondPlayerPoints: finalSecondPlayerPoints,
							firstPlayerNickname: nickname,
							secondPlayerNickname: enemyNickname,
							isStarted: true,
							moves: moves,
					  })
					: null;
			})();
			dispatch({
				type: CHANGE_CURRENT_PLAYER_COLOR,
				newCurrentPlayerColor: "blue" ? "red" : "blue",
			});
		}
		allSquares.forEach((square: any) => {
			square.classList.remove("available-move");
		});
		dispatch({ type: CHANGE_SELECTED_PIECE, newSelectedPiece: null });
	}
}
