import "./Board.css";
import {
	ACCEPT_INVITE,
	CHANGE_CURRENT_PLAYER_COLOR,
	CHANGE_GAME_ID,
	CHANGE_IS_GAME_ENDED,
	CHANGE_IS_GAME_STARTED,
	CHANGE_LOSER,
	CHANGE_SHOW_CONFIRM_LEAVE,
	CREATE_GAME,
	JOIN_GAME,
	SEND_INVITE,
} from "../../utils/ActionTypes";
import { getSquaresArray } from "./getSquaresArray";
import { BiCrown, BiSad, BiSolidHourglassTop } from "react-icons/bi";
import { useEffect } from "react";
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
import { resetTimers } from "./resetTimers";
import { stopTimer } from "./stopTimer";
import { setGameLoser } from "../../utils/GameLogic/setGameLoser";

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
		secondTimerId,
		loser,
		showConfirmLeave,
	} = useSelector((state: GameState) => state.gameReducer);
	const {
		selectedPiece,
		pawnToBeat,
		gameId,
		currentPlayerColor,
		isGameStarted,
		isGameEnded,
		pawnsPositions,
	} = useSelector((state: BoardState) => state.boardReducer);
	let { nickname, enemyNickname, playerColor, gameCredentials } =
		getGameCredentials(stateNickname, stateEnemyNickname, statePlayerColor);
	const handleBeforeUnload = () => {
		(async () => {
			await resetTimers(firstTimerId, secondTimerId);
			await deleteGame(gameId);
		})();
	};
	useEffect(() => {
		window.addEventListener("beforeunload", handleBeforeUnload);
		setPawnsArray(dispatch);
		let interval: NodeJS.Timeout | null = null;
		(async () => {
			loser !== undefined
				? (await stopTimer(firstTimerId), await stopTimer(secondTimerId))
				: null;
		})();
		if (gameCredentials) {
			switch (gameCredentials.actionType) {
				case SEND_INVITE:
					interval = firstPlayerActions(
						dispatch,
						nickname,
						gameCredentials,
						navigate
					);
					gameCredentials = null;
					break;
				case ACCEPT_INVITE:
					interval = secondPlayerActions(dispatch, gameCredentials, navigate);
					break;
				case CREATE_GAME:
					interval = firstPlayerActions(
						dispatch,
						nickname,
						gameCredentials,
						navigate
					);
					gameCredentials = null;
					break;
				case JOIN_GAME:
					interval = secondPlayerActions(dispatch, gameCredentials, navigate);
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
		if (isGameEnded) {
			dispatch({ type: CHANGE_IS_GAME_ENDED, newIsGameEnded: false });
			interval && clearInterval(interval);
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
						onProceed={async () => {
							await deleteGame(gameId);
							navigate("/screenAfterLogin");
						}}
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
							onProceed={async () => {
								await resetTimers(firstTimerId, secondTimerId);
								dispatch({ type: CHANGE_LOSER, newLoser: undefined });
								dispatch({ type: CHANGE_GAME_ID, newGameId: "" });
								localStorage.removeItem("playerColor");
								localStorage.removeItem("enemyNickname");
								navigate("/screenAfterLogin");
								await setGameLoser(playerColor, gameId);
								await deleteGame(gameId);
							}}
							onDismiss={() => {
								dispatch({
									type: CHANGE_SHOW_CONFIRM_LEAVE,
									newShowConfirmLeave: false,
								});
							}}
							icon={<BiSolidHourglassTop size={128} />}
							onProceedButtonText='Tak'
							onProceedButtonVariant='secondary'
							onDismissButtonText='Nie'
							onDismissButtonVariant='neutral'
						/>
						<AlertModal
							show={loser && loser === playerColor}
							title='Przegrałeś!'
							text='Następnym razem będzie lepiej!'
							color='var(--clr-red-600)'
							onProceed={async () => {
								dispatch({ type: CHANGE_LOSER, newLoser: undefined });
								dispatch({ type: CHANGE_GAME_ID, newGameId: "" });
								localStorage.removeItem("playerColor");
								localStorage.removeItem("enemyNickname");
								navigate("/screenAfterLogin");
								await deleteGame(gameId);
								await resetTimers(firstTimerId, secondTimerId);
							}}
							icon={<BiSad size={128} />}
							onProceedButtonText='Ok'
							onProceedButtonVariant='danger'
						/>
						<AlertModal
							show={loser && loser !== playerColor}
							title='Wygrałeś!'
							text='Gratulacje!'
							color='var(--color-green-300)'
							onProceed={async () => {
								dispatch({ type: CHANGE_LOSER, newLoser: undefined });
								dispatch({ type: CHANGE_GAME_ID, newGameId: "" });
								dispatch({ type: CHANGE_IS_GAME_ENDED, newIsGameEnded: true });
								localStorage.removeItem("playerColor");
								localStorage.removeItem("enemyNickname");
								await deleteGame(gameId);
								await resetTimers(firstTimerId, secondTimerId);
								navigate("/screenAfterLogin");
							}}
							icon={<BiCrown size={128} />}
							onProceedButtonText='Ok'
							onProceedButtonVariant='success'
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
