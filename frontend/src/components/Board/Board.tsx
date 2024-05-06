import redPawn from "../../assets/red-pawn.png";
import bluePawn from "../../assets/blue-pawn.png";
import "./Board.css";

export default function Board() {
  return (
    <div className=" bg-white align-self-center border border-2 border-secondary  board-wrapper game-main-container">
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
      <div className="border border-2 border-secondary board-areas-container w-100 h-100 position-relative">
        {Array.from({ length: 64 }, (_, index) => (
          <div key={index} className="w-100 h-100 p-1"></div>
        ))}
        {(() => {
          const squares = [];
          for (let rows = 1; rows < 9; rows++) {
            for (let cols = 1; cols < 9; cols++) {
              if ((rows + cols) % 2 == 0 && (rows < 4 || rows > 5)) {
                const squareKey = rows.toString() + cols.toString();
                squares.push(
                  <div
                    key={squareKey}
                    className={
                      "p-1 position-absolute bg-transparent pawn square square-" +
                      parseInt(rows.toString() + cols.toString())
                    }
                  >
                    <img
                      src={rows < 4 ? bluePawn : redPawn}
                      draggable="false"
                      className="img-fluid "
                      tabIndex={0}
                      alt={"#"}
                    />
                  </div>,
                );
              }
            }
          }
          return squares;
        })()}
      </div>
    </div>
  );
}
