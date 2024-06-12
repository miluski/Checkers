import CustomNavbar from "../../../components/CustomNavbar/CustomNavbar.tsx";
import styles from "../GameViews.module.css";
import Board from "../../../components/Board/Board.tsx";
import GameFlowTableManager from "../../../components/GameFlowTableManager/GameFlowTableManager.tsx";
import playerSvg from "../../../assets/icons/account.svg";
import PlayerDetails from "../../../components/PlayerDetails/PlayerDetails.tsx";
import { useSelector } from "react-redux";
import { GameState } from "../../../utils/types/State";
import { getGameCredentials } from "../../../components/Board/getGameCredentials.ts";

export default function GameAgainstPlayerView() {
	const {
		stateNickname,
		stateEnemyNickname,
		statePlayerColor,
		firstPlayerPoints,
		secondPlayerPoints,
	} = useSelector((state: GameState) => state.gameReducer);
	const { nickname, enemyNickname, playerColor } = getGameCredentials(
		stateNickname,
		stateEnemyNickname,
		statePlayerColor
	);
	return (
		<div
			className={`d-flex flex-column flex-lg-row justify-content-between ${styles.baseContainer} `}>
			<CustomNavbar />
			<main className='align-self-center d-flex flex-column align-self-center justify-content-center my-4 my-xl-0 text-white  '>
				{playerColor === "red" ? (
					<PlayerDetails
						variant={"red"}
						icon={playerSvg}
						nickname={enemyNickname}
						pawnsCollected={secondPlayerPoints}
						areYou
					/>
				) : (
					<PlayerDetails
						variant={"red"}
						icon={playerSvg}
						nickname={enemyNickname}
						pawnsCollected={secondPlayerPoints}
					/>
				)}
				<Board />
				{playerColor === "blue" ? (
					<PlayerDetails
						variant={"blue"}
						icon={playerSvg}
						nickname={nickname}
						pawnsCollected={firstPlayerPoints}
						areYou
					/>
				) : (
					<PlayerDetails
						variant={"blue"}
						icon={playerSvg}
						nickname={nickname}
						pawnsCollected={firstPlayerPoints}
					/>
				)}
			</main>
			<GameFlowTableManager />
		</div>
	);
}
