import CustomNavbar from "../../../components/CustomNavbar/CustomNavbar.tsx";
import "../GameViews.module.css";
import Board from "../../../components/Board/Board.tsx";
import GameFlowTableManager from "../../../components/GameFlowTableManager/GameFlowTableManager.tsx";
import computerSvg from "../../../assets/icons/computer.svg";
import playerSvg from "../../../assets/icons/account.svg";
import PlayerDetails from "../../../components/PlayerDetails/PlayerDetails.tsx";
import styles from "../GameViews.module.css";

export default function GameAgainstBotView() {
  return (
    <div
      className={`d-flex flex-column flex-lg-row justify-content-between ${styles.baseContainer} `}
    >
      <CustomNavbar />
      <main className="align-self-center d-flex flex-column align-self-center justify-content-center my-4 my-xl-0 text-white  ">
        <PlayerDetails
          variant={"red"}
          icon={computerSvg}
          nickname={"Komputer"}
          pawnsCollected={0}
        />
        <Board />
        <PlayerDetails
          variant={"blue"}
          icon={playerSvg}
          nickname={"Jan Kowalskiiiiiiiiiiii"}
          pawnsCollected={0}
          areYou
        />
      </main>
      <GameFlowTableManager />
    </div>
  );
}
