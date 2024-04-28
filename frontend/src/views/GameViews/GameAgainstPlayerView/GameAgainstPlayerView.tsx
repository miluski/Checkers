import CustomNavbar from "../../../components/CustomNavbar/CustomNavbar.tsx";
import "../GameViews.css";
import Board from "../../../components/Board/Board.tsx";
import GameFlowTableManager from "../../../components/GameFlowTableManager/GameFlowTableManager.tsx";
import computerSvg from "../../../assets/computer.svg";
import playerSvg from "../../../assets/account.svg";

export default function GameAgainstBotView() {
  return (
    <div className="d-flex flex-column flex-lg-row justify-content-between base-container ">
      <CustomNavbar />
      <Board
        redPlayerNick="Adrian Nowak"
        redPlayerIcon={playerSvg}
        bluePlayerNick="Jan Kowalski"
        bluePlayerIcon={playerSvg}
      />
      <GameFlowTableManager />
    </div>
  );
}
