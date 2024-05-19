import CustomNavbar from "../../../components/CustomNavbar/CustomNavbar.tsx";
import styles from "../GameViews.module.css";
import Board from "../../../components/Board/Board.tsx";
import GameFlowTableManager from "../../../components/GameFlowTableManager/GameFlowTableManager.tsx";
import playerSvg from "../../../assets/icons/account.svg";
import PlayerDetails from "../../../components/PlayerDetails/PlayerDetails.tsx";
import { useSelector } from "react-redux";
import { State } from "../../../utils/State";

export default function GameAgainstPlayerView() {
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
	return (
		<div
			className={`d-flex flex-column flex-lg-row justify-content-between ${styles.baseContainer} `}>
			<CustomNavbar />
			<main className='align-self-center d-flex flex-column align-self-center justify-content-center my-4 my-xl-0 text-white  '>
				{finalPlayerColor === "red" ? (
					<PlayerDetails
						variant={"red"}
						icon={playerSvg}
						nickname={playerEnemyNickname}
						pawnsCollected={0}
            areYou
					/>
				) : (
					<PlayerDetails
						variant={"red"}
						icon={playerSvg}
						nickname={playerEnemyNickname}
						pawnsCollected={0}
					/>
				)}
				<Board />
				{finalPlayerColor === "blue" ? (
					<PlayerDetails
						variant={"blue"}
						icon={playerSvg}
						nickname={playerNickname}
						pawnsCollected={0}
						areYou
					/>
				) : (
					<PlayerDetails
						variant={"blue"}
						icon={playerSvg}
						nickname={playerNickname}
						pawnsCollected={0}
					/>
				)}
			</main>
			<GameFlowTableManager />
		</div>
	);
}
