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
  if (variant === "red") {
    return (
      <div className="d-flex mb-4 w-100 justify-content-between">
        <div>
          <div
            className={
              " d-flex border border-2 border-secondary p-2 rounded-2  fw-semibold text-red"
            }
          >
            <i className="bi bi-hourglass-top me-3"></i>3:00
          </div>
        </div>
        <div className="d-flex">
          <div className="mt-1 me-3 mt-sm-2  d-flex flex-column w-100 align-items-end justify-content-between">
            <span>{nickname}</span>
            <div className="d-flex justify-content-end align-items-end mb-2">
              <span className="me-2">x{pawnsCollected}</span>
              <img
                className=" pawn-collected"
                src={pawnCollectedBlue}
                alt="pawnCollected"
              />
            </div>
          </div>
          <PlayerIcon color={"red"} icon={icon} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-4 d-flex  justify-content-between ">
        <div className="d-flex">
          <div className="hexagon hexagon-border-blue">
            <PlayerIcon color={"blue"} icon={icon} />
          </div>
          <div className="mt-1 ms-3 mt-sm-2  d-flex flex-column justify-content-between ">
            <span className="d-flex">
              <span className="d-inline-block flex-fill nickname me-2">
                {nickname}
              </span>{" "}
              {areYou ? <span className="text-white-50">(Ty)</span> : ""}
            </span>
            <div className="d-flex mb-2 align-items-end">
              <img
                className="me-2 pawn-collected"
                src={pawnCollectedRed}
                alt="pawnCollected"
              />
              <span>x{pawnsCollected}</span>
            </div>
          </div>
        </div>
        <div>
          <div className=" d-flex border border-2 border-secondary p-2 rounded-2 text-blue fw-semibold">
            <i className="bi bi-hourglass-top me-3"></i>3:00
          </div>
        </div>
      </div>
    );
  }
}
