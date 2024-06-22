import CustomNavbar from "../../../components/CustomNavbar/CustomNavbar.tsx";
import "../GameViews.module.css";

import computerSvg from "../../../assets/icons/computer.svg";
import playerSvg from "../../../assets/icons/account.svg";
import PlayerDetails from "../../../components/PlayerDetails/PlayerDetails.tsx";
import styles from "../GameViews.module.css";
import AiBoard from "../../../components/AiBoard/AiBoard.tsx";
import GameFlowTableManager from "../../../components/AiBoard/GameFlowTableManager.tsx";
import { useState } from "react";

export default function GameAgainstBotView() {
  const nickname = localStorage.getItem("nickname") ?? "";
  localStorage.removeItem("onlineGameCredentials");

  const [redPawnsCollected, setRedPawnsCollected] = useState(0);
  const [bluePawnsCollected, setBluePawnsCollected] = useState(0);
  const [moves, setMoves] = useState([]);
  const [openResetModal, setOpenResetModal] = useState(false);

  const addMove = (color, move) => {
    setMoves((prevMoves) => {
      const lastMove = prevMoves[prevMoves.length - 1];
      if (!lastMove || (lastMove.blue && lastMove.red)) {
        return [...prevMoves, { [color]: move }];
      } else {
        return prevMoves.map((m, index) =>
          index === prevMoves.length - 1 ? { ...m, [color]: move } : m,
        );
      }
    });
  };

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
          pawnsCollected={bluePawnsCollected}
          botGame
        />
        <AiBoard
          openResetModal={openResetModal}
          setOpenResetModal={setOpenResetModal}
          setBluePawnCollected={setBluePawnsCollected}
          setRedPawnCollected={setRedPawnsCollected}
          addMove={addMove}
        />
        <PlayerDetails
          variant={"blue"}
          icon={playerSvg}
          nickname={nickname}
          pawnsCollected={redPawnsCollected}
          areYou
          botGame
        />
      </main>
      <GameFlowTableManager
        moves={moves}
        setOPenResetModal={setOpenResetModal}
      />
    </div>
  );
}
