import { useDispatch, useSelector } from "react-redux";
import pawnCollectedBlue from "../../assets/pawn-colected-blue.png";
import pawnCollectedRed from "../../assets/pawn-colected-red.png";
import PlayerIcon from "../PlayerIconContainer/PlayerIcon.tsx";
import "./PlayerDetails.css";
import { BoardState, GameState } from "../../utils/types/Types.ts";
import { useEffect } from "react";
import {
  CHANGE_FIRST_PLAYER_TIME,
  CHANGE_LOSER,
  CHANGE_SECOND_PLAYER_TIME,
} from "../../utils/ActionTypes.ts";
import { setGameLoser } from "../../utils/GameLogic/setGameLoser.ts";

export default function PlayerDetails({
  variant,
  nickname,
  icon,
  pawnsCollected,
  areYou,
  botGame,
}: {
  variant: "blue" | "red";
  nickname: string;
  icon: string;
  pawnsCollected: number;
  areYou?: boolean;
  botGame?: boolean;
}) {
  const dispatch = useDispatch();
  const { currentPlayerColor, isGameStarted, isGameEnded, gameId } =
    useSelector((state: BoardState) => state.boardReducer);
  const { firstPlayerTime, secondPlayerTime, firstTimerId, secondTimerId } =
    useSelector((state: GameState) => state.gameReducer);
  useEffect(() => {
    const interval = setInterval(async () => {
      const endpoint = "http://localhost:3000/api/game/getTime";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstTimerId: firstTimerId,
          secondTimerId: secondTimerId,
        }),
      });
      const data = await response.json();
      data.firstPlayerTime &&
        dispatch({
          type: CHANGE_FIRST_PLAYER_TIME,
          newFirstPlayerTime: data.firstPlayerTime,
        });
      data.secondPlayerTime &&
        dispatch({
          type: CHANGE_SECOND_PLAYER_TIME,
          newSecondPlayerTime: data.secondPlayerTime,
        });
      if (data.firstPlayerTime === "0:00" && (isGameEnded || isGameStarted)) {
        dispatch({ type: CHANGE_LOSER, newLoser: "blue" });
        await setGameLoser("blue", gameId);
      } else if (
        data.secondPlayerTime === "0:00" &&
        (isGameEnded || isGameStarted)
      ) {
        dispatch({ type: CHANGE_LOSER, newLoser: "red" });
        await setGameLoser("red", gameId);
      }
    }, 1005);
    isGameEnded ? clearInterval(interval) : null;
    return () => clearInterval(interval);
  }, [isGameStarted, currentPlayerColor, firstPlayerTime, secondPlayerTime]);

  return (
    <div
      className={
        "d-flex w-100 justify-content-between player-details " +
        (variant === "red" ? "mb-4" : "mt-4")
      }
    >
      <div className={variant === "red" ? "" : "order-last"}>
        {!botGame && (
          <div
            className={
              " d-flex border border-2 border-secondary p-2 rounded-2 timer fw-semibold text-" +
              variant
            }
          >
            <i className="bi bi-hourglass-top me-3"></i>
            {variant === "blue" ? firstPlayerTime : secondPlayerTime}
          </div>
        )}
      </div>
      <div className="d-flex ">
        <div
          className={
            "  d-flex flex-column w-100  justify-content-evenly  " +
            (variant === "red"
              ? " me-3 align-items-end"
              : "ms-3 order-last align-items-start")
          }
        >
          <span className={"d-flex align-items-center"}>
            {<span className={"nickname"}>{nickname}</span>}{" "}
            {areYou ? <span className="text-white-50">(Ty)</span> : ""}
          </span>
          <div className="d-flex justify-content-end  align-items-center">
            <span className={variant === "red" ? "me-2" : "order-last ms-2"}>
              x{pawnsCollected}
            </span>
            <img
              className=" pawn-collected"
              src={variant === "red" ? pawnCollectedBlue : pawnCollectedRed}
              alt="pawnCollected"
            />
          </div>
        </div>
        <PlayerIcon color={variant} icon={icon} />
      </div>
    </div>
  );
}
