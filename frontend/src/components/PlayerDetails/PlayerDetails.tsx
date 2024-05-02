import pawnCollectedBlue from "../../assets/pawn-colected-blue.png";
import pawnCollectedRed from "../../assets/pawn-colected-red.png";
import PlayerIcon from "../PlayerIconContainer/PlayerIcon.tsx";
import "./PlayerDetails.css";

export default function PlayerDetails({
  variant,
  nickname,
  icon,
  pawnsCollected,
  areYou,
}: {
  variant: "blue" | "red";
  nickname: string;
  icon: string;
  pawnsCollected: number;
  areYou?: boolean;
}) {
  return (
    <div
      className={
        "d-flex w-100 justify-content-between player-details " +
        (variant === "red" ? "mb-4" : "mt-4")
      }
    >
      <div className={variant === "red" ? "" : "order-last"}>
        <div
          className={
            " d-flex border border-2 border-secondary p-2 rounded-2 timer fw-semibold text-" +
            variant
          }
        >
          <i className="bi bi-hourglass-top me-3"></i>3:00
        </div>
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
