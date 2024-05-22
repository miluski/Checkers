import { createGame } from "../../utils/GameLogic/createGame";
import { sendInvite } from "../../utils/GameLogic/sendInvite";
import "./Board.css";
import React, { useCallback, useEffect, useState } from "react";
import {
	ACCEPT_INVITE,
	CREATE_GAME,
	JOIN_GAME,
	SEND_INVITE,
} from "./GameActionTypes";
import { acceptGameInvite } from "../../utils/GameLogic/acceptGameInvite";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../utils/State";
import {
	CHANGE_ENEMY_NICKNAME,
	CHANGE_NICKNAME,
	CHANGE_PLAYER_COLOR,
} from "../../utils/ActionTypes";
import { updateGameObject } from "../../utils/GameLogic/updateGameObject";

type Pawn = {
	tabIndex: number;
	dataRow: number;
	dataCol: number;
	key: string;
	className: string;
};

export default function Board() {
	const dispatch = useDispatch();
	const { nickname, enemyNickname, playerColor } = useSelector(
		(state: State) => state
	);
	const playerNickname =
		nickname !== "" ? nickname : localStorage.getItem("nickname") ?? "";
	const playerEnemyNickname =
		enemyNickname !== ""
			? enemyNickname
			: localStorage.getItem("enemyNickname") ?? "";
	const finalPlayerColor =
		playerColor !== "" && playerColor !== null
			? playerColor
			: localStorage.getItem("playerColor") ?? "blue";
	const onlineGameCredentials = localStorage.getItem("onlineGameCredentials");
	const parsedOnlineGameCredentials =
		onlineGameCredentials !== null ? JSON.parse(onlineGameCredentials) : null;
	const [selectedPiece, setSelectedPiece] = useState<HTMLDivElement | null>(
		null
	);
	const allSquares = document.querySelectorAll<HTMLDivElement>(".square");
	const [toBeat, setToBeat] = useState<HTMLDivElement | null>(null);
	const [gameId, setGameId] = useState(parsedOnlineGameCredentials.gameId);
	const [currentPlayer, setCurrentPlayer] = useState<"blue" | "red">("blue");
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [pawns, setPawns] = useState<Pawn[]>([]);

	const squares = [];
	for (let rows = 1; rows < 9; rows++) {
		for (let cols = 1; cols < 9; cols++) {
			const squareKey = rows.toString() + cols.toString();
			squares.push({
				key: squareKey,
				className:
					"square-" +
					parseInt(rows.toString() + cols.toString()) +
					" position-absolute bg-transparent square ",
			});
		}
	}

	const initializeGame = useCallback(async () => {
		const pawnPositions = getPawnPositions();
		const gameId = await createGame({
			creatorEmail: localStorage.getItem("loggedUserEmail") ?? "",
			actualTurn: "blue",
			pawnPositions: pawnPositions,
			firstPlayerPoints: 0,
			secondPlayerPoints: 0,
			firstPlayerNickname: playerNickname,
			secondPlayerNickname: "",
		});
		await sendInvite(parsedOnlineGameCredentials.friendEmail, gameId);
		return gameId;
	}, [parsedOnlineGameCredentials]);

	const joinGame = useCallback(async () => {
		const isAccepted = await acceptGameInvite(
			parsedOnlineGameCredentials.gameId,
			parsedOnlineGameCredentials.friendEmail
		);
		isAccepted ? setIsGameStarted(true) : null;
	}, []);

	useEffect(() => {
		const tempPawns = [];
		for (let rows = 1; rows < 9; rows++) {
			for (let cols = 1; cols < 9; cols++) {
				const squareKey = rows.toString() + cols.toString();
				const baseClassName =
					"square-" +
					parseInt(rows.toString() + cols.toString()) +
					" position-absolute bg-transparent square";
				if ((rows + cols) % 2 == 0 && (rows < 4 || rows > 5)) {
					tempPawns.push({
						tabIndex: 0,
						dataRow: rows,
						dataCol: cols,
						key: squareKey,
						className:
							baseClassName +
							" z-1 pawn " +
							(rows < 4 ? "blue-pawn" : "red-pawn"),
					});
				}
			}
		}
		setPawns(tempPawns);
		let interval: string | number | NodeJS.Timeout | null | undefined = null;
		if (parsedOnlineGameCredentials) {
			switch (parsedOnlineGameCredentials.actionType) {
				case SEND_INVITE:
					dispatch({ type: CHANGE_PLAYER_COLOR, newPlayerColor: "blue" });
					localStorage.setItem("playerColor", "blue");
					(async () => {
						let localGameId = await initializeGame();
						setGameId(localGameId);
						interval = setInterval(async () => {
							console.log("Interval running");
							if (localGameId) {
								const endpoint = `http://192.168.0.11:3000/api/game/${localGameId}/credentials`;
								const response = await fetch(endpoint);
								const data = await response.json();
								if (
									data[0].secondPlayerNickname !== undefined &&
									data[0].secondPlayerNickname !== ""
								) {
									dispatch({
										type: CHANGE_ENEMY_NICKNAME,
										newEnemyNickname: data[0].secondPlayerNickname,
									});
									setIsGameStarted(true);
									setCurrentPlayer(data[0].actualTurn);
									data[0].isStarted ? setPawns(data[0].pawnPositions) : null;
								}
							}
						}, 1000);
					})();
					break;
				case ACCEPT_INVITE:
					(async () => {
						setGameId(parsedOnlineGameCredentials.gameId);
						await joinGame();
						interval = setInterval(async () => {
							console.log("Interval running");
							if (gameId) {
								const endpoint = `http://192.168.0.11:3000/api/game/${parsedOnlineGameCredentials.gameId}/credentials`;
								const response = await fetch(endpoint);
								const data = await response.json();
								dispatch({
									type: CHANGE_NICKNAME,
									newNickname: data[0].firstPlayerNickname,
								});
								localStorage.setItem("nickname", data[0].firstPlayerNickname);
								dispatch({
									type: CHANGE_ENEMY_NICKNAME,
									newEnemyNickname: data[0].secondPlayerNickname,
								});
								localStorage.setItem(
									"enemyNickname",
									data[0].secondPlayerNickname
								);
								setCurrentPlayer(data[0].actualTurn);
								data[0].isStarted ? setPawns(data[0].pawnPositions) : null;
							}
						}, 1000);
					})();
					dispatch({ type: CHANGE_PLAYER_COLOR, newPlayerColor: "red" });
					localStorage.setItem("playerColor", "red");
					break;
				case CREATE_GAME:
					dispatch({ type: CHANGE_PLAYER_COLOR, newPlayerColor: "blue" });
					localStorage.setItem("playerColor", "blue");
					break;
				case JOIN_GAME:
					dispatch({ type: CHANGE_PLAYER_COLOR, newPlayerColor: "red" });
					localStorage.setItem("playerColor", "red");
					break;
			}
		} else {
			setIsGameStarted(true);
			dispatch({ type: CHANGE_PLAYER_COLOR, newPlayerColor: "blue" });
			localStorage.setItem("playerColor", "blue");
		}
		return () => {
			interval ? clearInterval(interval) : null;
		};
	}, []);

	// const blocker = useBlocker(
	// 	({ currentLocation, nextLocation }) =>
	// 		!canLeavePage && currentLocation.pathname !== nextLocation.pathname
	// );

	function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		const selectedSquare = e.target as HTMLDivElement;
		if (selectedPiece === null && finalPlayerColor === currentPlayer) {
			if (
				(currentPlayer === "blue" &&
					selectedSquare.classList.contains("blue-pawn")) ||
				(currentPlayer === "red" &&
					selectedSquare.classList.contains("red-pawn"))
			) {
				allSquares.forEach((square) => {
					square.classList.remove("available-move");
				});

				const availableMoves = getAvailableMoves(selectedSquare);

				availableMoves.forEach((square) => {
					square.classList.add("available-move");
				});

				setSelectedPiece(selectedSquare);
			} else {
				setSelectedPiece(null);
			}
		}
	}

	function getAvailableMoves(selectedSquare: HTMLDivElement): HTMLDivElement[] {
		const isBluePawn = selectedSquare.classList.contains("blue-pawn");
		const isRedPawn = selectedSquare.classList.contains("red-pawn");

		const selectedClass = selectedSquare.classList.item(0);
		const selectedSquareIndex = parseInt(selectedClass!.split("-")[1]);

		const availableMoves: HTMLDivElement[] = [];

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
				squareRowUpLeft.classList.contains("red-pawn")
			) {
				availableMoves.push(squareTwoRowUpLeft);
				setToBeat(squareRowUpLeft);
			} else if (
				squareRowUpLeft &&
				!squareRowUpLeft.classList.contains("pawn") &&
				toBeat === null
			)
				availableMoves.push(squareRowUpLeft);

			if (
				squareTwoRowUpRight &&
				squareRowUpRight &&
				!squareTwoRowUpRight.classList.contains("pawn") &&
				squareRowUpRight.classList.contains("red-pawn")
			) {
				availableMoves.push(squareTwoRowUpRight);
				setToBeat(squareRowUpRight);
			} else if (
				squareRowUpRight &&
				!squareRowUpRight.classList.contains("pawn") &&
				toBeat === null
			)
				availableMoves.push(squareRowUpRight);
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
				squareRowDownLeft.classList.contains("blue-pawn")
			) {
				availableMoves.push(squareTwoRowDownLeft);
				setToBeat(squareRowDownLeft);
			} else if (
				squareRowDownLeft &&
				!squareRowDownLeft.classList.contains("pawn") &&
				toBeat === null
			)
				availableMoves.push(squareRowDownLeft);

			if (
				squareTwoRowDownRight &&
				squareRowDownRight &&
				!squareTwoRowDownRight.classList.contains("pawn") &&
				squareRowDownRight.classList.contains("blue-pawn")
			) {
				availableMoves.push(squareTwoRowDownRight);
				setToBeat(squareRowDownRight);
			} else if (
				squareRowDownRight &&
				!squareRowDownRight.classList.contains("pawn") &&
				toBeat === null
			)
				availableMoves.push(squareRowDownRight);
		}

		return availableMoves;
	}

	function isMoveLegal(
		selectedSquare: HTMLDivElement,
		targetSquare: HTMLDivElement
	) {
		const availableMoves = getAvailableMoves(selectedSquare);
		return (
			availableMoves.includes(targetSquare) &&
			isGameStarted &&
			finalPlayerColor === currentPlayer
		);
	}

	function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		const targetSquare = e.target as HTMLDivElement;
		if (targetSquare.classList.contains("square") && selectedPiece) {
			const selectedClass = selectedPiece.classList.item(0);
			const copiedSelectedPiece = selectedPiece;
			const targetClass = targetSquare.classList.item(0);
			let pawnPositions = getPawnPositions();
			if (isMoveLegal(selectedPiece, targetSquare)) {
				selectedPiece.classList.replace(selectedClass!, targetClass!);
				if (toBeat) {
					const toBeatRow = toBeat.getAttribute("data-row");
					const toBeatCol = toBeat.getAttribute("data-col");
					const toBeatKey = `${toBeatRow}-${toBeatCol}`;
					pawnPositions = pawns.filter(
						(pawn) => `${pawn.dataRow}-${pawn.dataCol}` !== toBeatKey
					);
					pawnPositions = pawnPositions.filter(
						(pawn) =>
							pawn.tabIndex !== copiedSelectedPiece.tabIndex ||
							pawn.dataRow !==
								Number(copiedSelectedPiece.getAttribute("data-row")) ||
							pawn.dataCol !==
								Number(copiedSelectedPiece.getAttribute("data-col"))
					);
					const selectedPawn = {
						tabIndex: Number(selectedPiece.getAttribute("tab-index")),
						className: selectedPiece.className,
						dataRow: Number(selectedPiece.getAttribute("data-row")),
						dataCol: Number(selectedPiece.getAttribute("data-col")),
						key:
							selectedPiece.getAttribute("key") ??
							`${selectedPiece.getAttribute(
								"data-row"
							)}${selectedPiece.getAttribute("data-col")}`,
					};
					pawnPositions.push(selectedPawn);
					setPawns(pawnPositions);
					setToBeat(null);
				} else pawnPositions = getPawnPositions();
				(async () => {
					await updateGameObject({
						gameId: gameId,
						creatorEmail: "",
						actualTurn: currentPlayer === "blue" ? "red" : "blue",
						pawnPositions: pawnPositions,
						firstPlayerPoints: 0,
						secondPlayerPoints: 0,
						firstPlayerNickname: playerNickname,
						secondPlayerNickname: playerEnemyNickname,
						isStarted: true,
					});
				})();
				setCurrentPlayer(currentPlayer === "blue" ? "red" : "blue");
			}
			allSquares.forEach((square) => {
				square.classList.remove("available-move");
			});
			setSelectedPiece(null);
		}
	}

	function getPawnPositions(): Array<{
		tabIndex: number;
		dataRow: number;
		dataCol: number;
		key: string;
		className: string;
	}> {
		const pawns = document.querySelectorAll(".blue-pawn, .red-pawn");
		const pawnPositions = Array.from(pawns).map((pawn: any) => {
			const dataRow = pawn.getAttribute("data-row");
			const dataCol = pawn.getAttribute("data-col");
			return {
				tabIndex: 0,
				dataRow: parseInt(dataRow),
				dataCol: parseInt(dataCol),
				key: dataRow + dataCol,
				className: pawn.className,
			};
		});
		console.log(pawnPositions);
		return pawnPositions;
	}

	return (
		<div className=' bg-white align-self-center border border-2 border-secondary  board-wrapper game-main-container'>
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
				onClick={grabPiece}
				onMouseDown={movePiece}
				className='border border-2 border-secondary board-areas-container w-100 h-100 position-relative'>
				{Array.from({ length: 64 }, (_, index) => (
					<div key={index} className='w-100 h-100 '></div>
				))}
				{pawns.map((pawn) => (
					<div
						tabIndex={pawn.tabIndex}
						data-row={pawn.dataRow}
						data-col={pawn.dataCol}
						key={pawn.key}
						className={pawn.className}
					/>
				))}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: isGameStarted ? "none" : "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "white",
						fontSize: "2em",
						zIndex: 2,
					}}>
					Game is not started
				</div>
				{squares.map((square) => (
					<div key={square.key} className={square.className} />
				))}
			</div>
		</div>
	);
}
