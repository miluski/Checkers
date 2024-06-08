import { CHANGE_PAWN_TO_BEAT } from "../../utils/ActionTypes";

export function getAvailableMoves(
	selectedSquare: HTMLDivElement,
	isGameStarted: boolean,
	pawnToBeat: HTMLDivElement | null,
	dispatch: Function
): HTMLDivElement[] {
	const isBluePawn = selectedSquare.classList.contains("blue-pawn");
	const isBluePawnKing = selectedSquare.classList.contains("blue-pawn-king");
	const isRedPawn = selectedSquare.classList.contains("red-pawn");
	const isRedPawnKing = selectedSquare.classList.contains("red-pawn-king");
	const selectedClass = selectedSquare.classList.item(0);
	const selectedSquareIndex = parseInt(selectedClass!.split("-")[1]);
	let availableMoves: HTMLDivElement[] = [];
	if (isBluePawn && isGameStarted) {
		const squareRowUpLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 9}`
		);
		const squareRowUpRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 11}`
		);
		const squareTwoRowUpLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 18}`
		);
		const squareTwoRowUpRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 22}`
		);
		if (
			squareTwoRowUpLeft &&
			squareRowUpLeft &&
			!squareTwoRowUpLeft.classList.contains("pawn") &&
			(squareRowUpLeft.classList.contains("red-pawn") ||
				squareRowUpLeft.classList.contains("red-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowUpLeft);
			dispatch({ type: CHANGE_PAWN_TO_BEAT, newPawnToBeat: squareRowUpLeft });
		} else if (
			squareTwoRowUpRight &&
			squareRowUpRight &&
			!squareTwoRowUpRight.classList.contains("pawn") &&
			(squareRowUpRight.classList.contains("red-pawn") ||
				squareRowUpRight.classList.contains("red-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowUpRight);
			dispatch({ type: CHANGE_PAWN_TO_BEAT, newPawnToBeat: squareRowUpRight });
		} else {
			if (
				squareRowUpRight &&
				!squareRowUpRight.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowUpRight);
			}
			if (
				squareRowUpLeft &&
				!squareRowUpLeft.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowUpLeft);
			}
		}
	} else if (isRedPawn) {
		const squareRowDownLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 9}`
		);
		const squareRowDownRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 11}`
		);
		const squareTwoRowDownLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 18}`
		);
		const squareTwoRowDownRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 22}`
		);
		if (
			squareTwoRowDownLeft &&
			squareRowDownLeft &&
			!squareTwoRowDownLeft.classList.contains("pawn") &&
			(squareRowDownLeft.classList.contains("blue-pawn") ||
				squareRowDownLeft.classList.contains("blue-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowDownLeft);
			dispatch({ type: CHANGE_PAWN_TO_BEAT, newPawnToBeat: squareRowDownLeft });
		} else if (
			squareTwoRowDownRight &&
			squareRowDownRight &&
			!squareTwoRowDownRight.classList.contains("pawn") &&
			(squareRowDownRight.classList.contains("blue-pawn") ||
				squareRowDownRight.classList.contains("blue-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowDownRight);
			dispatch({
				type: CHANGE_PAWN_TO_BEAT,
				newPawnToBeat: squareRowDownRight,
			});
		} else {
			if (
				squareRowDownLeft &&
				!squareRowDownLeft.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowDownLeft);
			}
			if (
				squareRowDownRight &&
				!squareRowDownRight.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowDownRight);
			}
		}
	} else if (isBluePawnKing) {
		const squareRowUpLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 9}`
		);
		const squareRowUpRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 11}`
		);
		const squareTwoRowUpLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 18}`
		);
		const squareTwoRowUpRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 22}`
		);
		const squareRowDownLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 9}`
		);
		const squareRowDownRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 11}`
		);
		const squareTwoRowDownLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 18}`
		);
		const squareTwoRowDownRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 22}`
		);
		if (
			squareTwoRowUpLeft &&
			squareRowUpLeft &&
			!squareTwoRowUpLeft.classList.contains("pawn") &&
			(squareRowUpLeft.classList.contains("red-pawn") ||
				squareRowUpLeft.classList.contains("red-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowUpLeft);
			dispatch({
				type: CHANGE_PAWN_TO_BEAT,
				newPawnToBeat: squareRowUpLeft,
			});
		} else {
			if (
				squareRowUpLeft &&
				!squareRowUpLeft.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowUpLeft);
			}
			if (
				squareRowUpRight &&
				!squareRowUpRight.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowUpRight);
			}
			if (
				squareRowDownLeft &&
				!squareRowDownLeft.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowDownLeft);
			}
			if (
				squareRowDownRight &&
				!squareRowDownRight.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowDownRight);
			}
		}
		if (
			squareTwoRowUpRight &&
			squareRowUpRight &&
			!squareTwoRowUpRight.classList.contains("pawn") &&
			(squareRowUpRight.classList.contains("red-pawn") ||
				squareRowUpRight.classList.contains("red-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowUpRight);
			dispatch({
				type: CHANGE_PAWN_TO_BEAT,
				newPawnToBeat: squareRowUpRight,
			});
		}

		if (
			squareTwoRowDownLeft &&
			squareRowDownLeft &&
			!squareTwoRowDownLeft.classList.contains("pawn") &&
			(squareRowDownLeft.classList.contains("red-pawn") ||
				squareRowDownLeft.classList.contains("red-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowDownLeft);
			dispatch({
				type: CHANGE_PAWN_TO_BEAT,
				newPawnToBeat: squareRowDownLeft,
			});
		}

		if (
			squareTwoRowDownRight &&
			squareRowDownRight &&
			!squareTwoRowDownRight.classList.contains("pawn") &&
			(squareRowDownRight.classList.contains("red-pawn") ||
				squareRowDownRight.classList.contains("red-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowDownRight);
			dispatch({
				type: CHANGE_PAWN_TO_BEAT,
				newPawnToBeat: squareRowDownRight,
			});
		}
	} else if (isRedPawnKing) {
		const squareRowUpLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 9}`
		);
		const squareRowUpRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 11}`
		);
		const squareTwoRowUpLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 18}`
		);
		const squareTwoRowUpRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex + 22}`
		);
		const squareRowDownLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 9}`
		);
		const squareRowDownRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 11}`
		);
		const squareTwoRowDownLeft = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 18}`
		);
		const squareTwoRowDownRight = document.querySelector<HTMLDivElement>(
			`.square-${selectedSquareIndex - 22}`
		);

		if (
			squareTwoRowUpLeft &&
			squareRowUpLeft &&
			!squareTwoRowUpLeft.classList.contains("pawn") &&
			(squareRowUpLeft.classList.contains("blue-pawn") ||
				squareRowUpLeft.classList.contains("blue-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowUpLeft);
			dispatch({
				type: CHANGE_PAWN_TO_BEAT,
				newPawnToBeat: squareRowUpLeft,
			});
		} else {
			if (
				squareRowUpLeft &&
				!squareRowUpLeft.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowUpLeft);
			}
			if (
				squareRowUpRight &&
				!squareRowUpRight.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowUpRight);
			}

			if (
				squareRowDownLeft &&
				!squareRowDownLeft.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowDownLeft);
			}

			if (
				squareRowDownRight &&
				!squareRowDownRight.classList.contains("pawn") &&
				pawnToBeat === null
			) {
				availableMoves.push(squareRowDownRight);
			}
		}

		if (
			squareTwoRowUpRight &&
			squareRowUpRight &&
			!squareTwoRowUpRight.classList.contains("pawn") &&
			(squareRowUpRight.classList.contains("blue-pawn") ||
				squareRowUpRight.classList.contains("blue-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowUpRight);
			dispatch({
				type: CHANGE_PAWN_TO_BEAT,
				newPawnToBeat: squareRowUpRight,
			});
		}

		if (
			squareTwoRowDownLeft &&
			squareRowDownLeft &&
			!squareTwoRowDownLeft.classList.contains("pawn") &&
			(squareRowDownLeft.classList.contains("blue-pawn") ||
				squareRowDownLeft.classList.contains("blue-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowDownLeft);
			dispatch({
				type: CHANGE_PAWN_TO_BEAT,
				newPawnToBeat: squareRowDownLeft,
			});
		}

		if (
			squareTwoRowDownRight &&
			squareRowDownRight &&
			!squareTwoRowDownRight.classList.contains("pawn") &&
			(squareRowDownRight.classList.contains("blue-pawn") ||
				squareRowDownRight.classList.contains("blue-pawn-king"))
		) {
			availableMoves = [];
			availableMoves.push(squareTwoRowDownRight);
			dispatch({
				type: CHANGE_PAWN_TO_BEAT,
				newPawnToBeat: squareRowDownRight,
			});
		}
	}
	return availableMoves;
}
