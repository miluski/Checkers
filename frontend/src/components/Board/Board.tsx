import redPawn from "../../assets/red-pawn.png";
import bluePawn from "../../assets/blue-pawn.png";
import "./Board.css";
import PlayerDetails from "../PlayerDetails/PlayerDetails.tsx";

export default function Board({
  redPlayerNick,
  redPlayerIcon,
  bluePlayerNick,
  bluePlayerIcon,
}: {
  redPlayerNick: string;
  redPlayerIcon: string;
  bluePlayerNick: string;
  bluePlayerIcon: string;
}) {
  return (
    <main className="align-self-center d-flex flex-column align-self-center justify-content-center my-4 my-xl-0 text-white mx-5 ">
      <PlayerDetails
        variant={"red"}
        icon={redPlayerIcon}
        nickname={redPlayerNick}
        pawnsCollected={0}
      />
      <div className=" bg-white align-self-center border border-2 border-secondary fs-4 fs-6-mobile-only board-wrapper game-main-container">
        {["", "A", "B", "C", "D", "E", "F", "G", "H", ""].map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        {[
          "1",
          "1",
          "2",
          "2",
          "3",
          "3",
          "4",
          "4",
          "5",
          "5",
          "6",
          "6",
          "7",
          "7",
          "8",
          "8",
        ].map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        {["", "A", "B", "C", "D", "E", "F", "G", "H", ""].map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        <div className="border border-2 border-secondary board-areas-container w-100 h-100">
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1 ">
            <img
              src={redPawn}
              draggable="false"
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={redPawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="redPawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
          <div className="w-100 h-100 p-1">
            <img
              draggable="false"
              src={bluePawn}
              className="img-fluid pawn"
              tabIndex={0}
              alt="bluePawn"
            />
          </div>
          <div className="w-100 h-100 p-1"></div>
        </div>
      </div>
      <PlayerDetails
        variant={"blue"}
        icon={bluePlayerIcon}
        nickname={bluePlayerNick}
        pawnsCollected={0}
        areYou
      />
    </main>
  );
}
