import "./Board.css";
import {
	ACCEPT_INVITE,
	CHANGE_CURRENT_PLAYER_COLOR,
	CHANGE_IS_GAME_ENDED,
	CHANGE_IS_GAME_STARTED,
	CREATE_GAME,
	JOIN_GAME,
	SEND_INVITE,
} from "../../utils/ActionTypes";
import { getSquaresArray } from "./getSquaresArray";
import { BiSolidHourglassTop } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertModal from "../Modals/AlertModal/AlertModal";
import { Pawn, BoardState, GameState } from "../../utils/types/Types";
import { setPawnsArray } from "./setPawnsArray";
import { getGameCredentials } from "./getGameCredentials";
import { grabPiece } from "./grabPiece";
import { movePiece } from "./movePiece";
import { useNavigate } from "react-router-dom";
import { firstPlayerActions } from "./firstPlayerActions";
import { secondPlayerActions } from "./secondPlayerActions";
import { deleteGame } from "../../utils/GameLogic/deleteGame";
import { IoAlertCircleOutline } from "react-icons/io5";
import { resetTimers } from "./resetTimers";

export default function Board() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const squares = getSquaresArray();
	const allSquares = document.querySelectorAll<HTMLDivElement>(".square");
	const {
		stateNickname,
		stateEnemyNickname,
		statePlayerColor,
		moves,
		turnNumber,
		firstPlayerPoints,
		secondPlayerPoints,
		firstTimerId,
		secondTimerId
	} = useSelector((state: GameState) => state.gameReducer);
	const {
		selectedPiece,
		pawnToBeat,
		gameId,
		currentPlayerColor,
		isGameStarted,
		pawnsPositions,
		isGameEnded,
	} = useSelector((state: BoardState) => state.boardReducer);
	const [showConfirmLeave, setShowConfirmLeave] = useState(false);
	let { nickname, enemyNickname, playerColor, gameCredentials } =
		getGameCredentials(stateNickname, stateEnemyNickname, statePlayerColor);
	const handleBeforeUnload = () => {
		(async () => {
			dispatch({ type: CHANGE_IS_GAME_ENDED, newIsGameEnded: false });
			await resetTimers(firstTimerId, secondTimerId);
			await deleteGame(gameId);
		})();
	};
	useEffect(() => {
		window.addEventListener("beforeunload", handleBeforeUnload);
		setPawnsArray(dispatch);
		let interval: NodeJS.Timeout | null = null;
		if (gameCredentials) {
			switch (gameCredentials.actionType) {
				case SEND_INVITE:
					interval = firstPlayerActions(
						dispatch,
						nickname,
						gameCredentials,
						isGameStarted
					);
					gameCredentials = null;
					break;
				case ACCEPT_INVITE:
					interval = secondPlayerActions(
						dispatch,
						gameCredentials,
						isGameStarted
					);
					break;
				case CREATE_GAME:
					gameCredentials = null;
					dispatch({
						type: CHANGE_CURRENT_PLAYER_COLOR,
						newCurrentPlayerColor: "blue",
					});
					localStorage.setItem("playerColor", "blue");
					break;
				case JOIN_GAME:
					gameCredentials = null;
					dispatch({
						type: CHANGE_CURRENT_PLAYER_COLOR,
						newCurrentPlayerColor: "red",
					});
					localStorage.setItem("playerColor", "red");
					break;
			}
		} else {
			dispatch({
				type: CHANGE_IS_GAME_STARTED,
				newIsGameStarted: true,
			});
			dispatch({
				type: CHANGE_CURRENT_PLAYER_COLOR,
				newCurrentPlayerColor: "blue",
			});
			localStorage.setItem("playerColor", "blue");
		}
		return () => {
			interval ? clearInterval(interval) : null;
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return (
		<div className='bg-white align-self-center border border-2 border-secondary board-wrapper game-main-container'>
			{[
				"",
				"A",
				"B",
				"C",
				"D",
				"E",
				"F",
				"G",
				"H",
				"",
				"8",
				"8",
				"7",
				"7",
				"6",
				"6",
				"5",
				"5",
				"4",
				"4",
				"3",
				"3",
				"2",
				"2",
				"1",
				"1",
				"",
				"A",
				"B",
				"C",
				"D",
				"E",
				"F",
				"G",
				"H",
				"",
			].map((item, index) => (
				<div key={index}>{item}</div>
			))}
			<div
				onClick={(e) => {
					grabPiece(
						e,
						dispatch,
						selectedPiece,
						pawnToBeat,
						currentPlayerColor,
						playerColor,
						allSquares,
						isGameStarted
					);
				}}
				onMouseDown={(e) => {
					movePiece(
						e,
						selectedPiece,
						dispatch,
						isGameStarted,
						pawnToBeat,
						playerColor,
						currentPlayerColor,
						pawnsPositions,
						gameId,
						nickname,
						enemyNickname,
						moves,
						turnNumber,
						firstPlayerPoints,
						secondPlayerPoints,
						allSquares,
						firstTimerId,
						secondTimerId
					);
				}}
				className='border border-2 border-secondary board-areas-container w-100 h-100 position-relative'>
				{pawnsPositions.map((pawn: Pawn) => (
					<div
						tabIndex={pawn.tabIndex}
						data-row={pawn.dataRow}
						data-col={pawn.dataCol}
						key={pawn.key}
						className={pawn.className}
					/>
				))}
				{isGameStarted ? (
					<AlertModal
						show={!(playerColor === currentPlayerColor)}
						title='Oczekiwanie na ruch przeciwnika'
						color='var(--clr-sky-250)'
						onProceed={() => {}}
						icon={<BiSolidHourglassTop size={128} />}
						onProceedButtonVariant={null}
					/>
				) : (
					<AlertModal
						show={!isGameStarted}
						title='Oczekiwanie na przeciwnika'
						color='var(--clr-sky-250)'
						onProceed={() => {}}
						icon={<BiSolidHourglassTop size={128} />}
						onProceedButtonText='Anuluj'
						onProceedButtonVariant='secondary'
					/>
				)}
				{isGameStarted ? (
					<>
						<AlertModal
							show={showConfirmLeave}
							title='Uwaga!'
							text='Czy napewno chcesz poddać mecz?'
							color='var(--clr-sky-250)'
							onProceed={() => {}}
							onDismiss={() => {
								setShowConfirmLeave(false);
							}}
							icon={<BiSolidHourglassTop size={128} />}
							onProceedButtonText='Tak'
							onProceedButtonVariant='secondary'
							onDismissButtonText='Nie'
							onDismissButtonVariant='neutral'
						/>
						<AlertModal
							show={isGameEnded}
							title='Koniec gry'
							color='var(--clr-red-400)'
							onProceedButtonText='Wróć do menu'
							icon={<IoAlertCircleOutline size={128} />}
							onProceed={() => {
								(async () => {
									dispatch({
										type: CHANGE_IS_GAME_ENDED,
										newIsGameEnded: false,
									});
									await deleteGame(gameId);
								})();
								navigate("/screenAfterLogin");
							}}
						/>
					</>
				) : (
					<></>
				)}
				{squares.map((square) => (
					<div key={square.key} className={square.className} />
				))}
			</div>
		</div>
	);
}
