import CustomNavbar from "../../components/CustomNavbar/CustomNavbar.tsx";
import drawSvg from "../../assets/draw_icon.svg";
import { Button, Table } from "react-bootstrap";
import "./GameAgainstBotView.css";
import { useState } from "react";
import bluePawn from "../../assets/blue-pawn.png";
import redPawn from "../../assets/red-pawn.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import computerSvg from "../../assets/computer.svg";
import nicola from "../../assets/nicola.png";
import pawnCollectedRed from "../../assets/pawn-colected-red.png";
import pawnCollectedBlue from "../../assets/pawn-colected-blue.png";
import { bool, boolean } from "yup";

type SelectedPawn = {
  id: number;
  row: number;
  col: {
    name: string;
    number: number;
  };
  color: string;
};

export default function GameAgainstBotView() {
  const [selectedPawn, setSelectedPawn] = useState<SelectedPawn | null>(null);

  //ta tablica zawiera wszystkie miejsca poczatkowe planszy
  const [pawnBoard, setPawnBoard] = useState([
    { id: 1, row: 1, col: { name: "B", number: 2 }, color: "red" },
    { id: 2, row: 1, col: { name: "D", number: 4 }, color: "red" },
    { id: 3, row: 1, col: { name: "F", number: 6 }, color: "red" },
    { id: 4, row: 1, col: { name: "H", number: 8 }, color: "red" },
    { id: 5, row: 2, col: { name: "A", number: 1 }, color: "red" },
    { id: 6, row: 2, col: { name: "C", number: 3 }, color: "red" },
    { id: 7, row: 2, col: { name: "E", number: 5 }, color: "red" },
    { id: 8, row: 2, col: { name: "G", number: 7 }, color: "red" },
    { id: 9, row: 3, col: { name: "B", number: 2 }, color: "red" },
    { id: 10, row: 3, col: { name: "D", number: 4 }, color: "red" },
    { id: 11, row: 3, col: { name: "F", number: 6 }, color: "red" },
    { id: 12, row: 3, col: { name: "H", number: 8 }, color: "red" },
    { id: 13, row: 4, col: { name: "A", number: 1 }, color: "none" },
    { id: 14, row: 4, col: { name: "C", number: 3 }, color: "none" },
    { id: 15, row: 4, col: { name: "E", number: 5 }, color: "none" },
    { id: 16, row: 4, col: { name: "G", number: 7 }, color: "none" },
    { id: 17, row: 5, col: { name: "B", number: 2 }, color: "none" },
    { id: 18, row: 5, col: { name: "D", number: 4 }, color: "none" },
    { id: 19, row: 5, col: { name: "F", number: 6 }, color: "none" },
    { id: 20, row: 5, col: { name: "H", number: 8 }, color: "none" },
    { id: 21, row: 6, col: { name: "A", number: 1 }, color: "blue" },
    { id: 22, row: 6, col: { name: "C", number: 3 }, color: "blue" },
    { id: 23, row: 6, col: { name: "E", number: 5 }, color: "blue" },
    { id: 24, row: 6, col: { name: "G", number: 7 }, color: "blue" },
    { id: 25, row: 7, col: { name: "B", number: 2 }, color: "blue" },
    { id: 26, row: 7, col: { name: "D", number: 4 }, color: "blue" },
    { id: 27, row: 7, col: { name: "F", number: 6 }, color: "blue" },
    { id: 28, row: 7, col: { name: "H", number: 8 }, color: "blue" },
    { id: 29, row: 8, col: { name: "A", number: 1 }, color: "blue" },
    { id: 30, row: 8, col: { name: "C", number: 3 }, color: "blue" },
    { id: 31, row: 8, col: { name: "E", number: 5 }, color: "blue" },
    { id: 32, row: 8, col: { name: "G", number: 7 }, color: "blue" },
  ]);

  const handlePawnClick = (id: number | null) => {
    const clickedPawn = pawnBoard.find((pawn) => pawn.id === id);

    if (clickedPawn && clickedPawn.color === "blue") {
      setSelectedPawn(clickedPawn);
    }
  };

  const handleEmptyFieldClick = (
    row: number,
    col: {
      name: string;
      number: number;
    }
  ) => {
    if (selectedPawn !== null) {
      const isAvailableField = pawnBoard.some(
        (pawn: SelectedPawn) =>
          pawn.row === row && pawn.col.name == col.name && pawn.color === "none"
      );
      const isOccupiedField = pawnBoard.some(
        (pawn: SelectedPawn) =>
          pawn.row === row &&
          pawn.col.name === col.name &&
          pawn.color !== "none"
      );

      if (isAvailableField && !isOccupiedField) {
        const movedPawn = pawnBoard.find(
          (pawn: SelectedPawn) => pawn.id === selectedPawn.id
        );
        const canMove =
          movedPawn !== undefined &&
          Math.abs(col.number - movedPawn.col.number) == 1;
        console.log(col.number, movedPawn?.col.number);
        if (canMove) {
          //Bedzie przydatne do tablicy rychow
          console.log(
            `Pionek o ID ${selectedPawn.id} przesunięty z (${movedPawn?.row}, ${movedPawn?.col.name}) do (${row}, ${col.name})`
          );
          const newBoardColors = pawnBoard.map((pawn: SelectedPawn) => {
            if (
              pawn.row === row &&
              pawn.col.name === col.name &&
              pawn.color === "none"
            ) {
              return { ...pawn, color: "blue" };
            } else if (pawn.id === selectedPawn.id) {
              return { ...pawn, color: "none" };
            }
            return pawn;
          });

          setPawnBoard(newBoardColors);
        }
        setSelectedPawn(null);
      }
    }
  };

  return (
    <div
      className="d-flex flex-column flex-lg-row justify-content-between"
      style={{ backgroundColor: "var(--clr-neutral-750)" }}
    >
      <CustomNavbar />
      <div
        style={{ backgroundColor: "var(--clr-neutral-750)" }}
        className="align-self-center d-flex flex-column align-self-center justify-content-center my-4 my-xl-0 text-white mx-5"
      >
        <div className="d-flex mb-4 w-100 justify-content-end">
          <span className="mt-1 me-3 mt-sm-2 ms-sm-4">
            Bot <span className="text-white-50">(Średnio zaawansowany)</span>
          </span>
          <div
            className="hexagon "
            style={{ backgroundColor: "var(--clr-red-450)" }}
          >
            <div
              className="hexagon p-3"
              style={{ scale: "80%", backgroundColor: "var(--color-grid)" }}
            >
              <img className="img-fluid" src={computerSvg} alt="" />
            </div>
          </div>
        </div>
        <div
          className="xd bg-white align-self-center border border-2 border-secondary fs-4"
          id="board-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gridTemplateRows: "repeat(10, 1fr)",
            backgroundColor: "var(--color-grid)",
          }}
        >
          <div></div>
          <div>A</div>
          <div>B</div>
          <div>C</div>
          <div>D</div>
          <div>E</div>
          <div>F</div>
          <div>G</div>
          <div>H</div>
          <div></div>
          <div>1</div>
          <div>1</div>
          <div>2</div>
          <div>2</div>
          <div>3</div>
          <div>3</div>
          <div>4</div>
          <div>4</div>
          <div>5</div>
          <div>5</div>
          <div>6</div>
          <div>6</div>
          <div>7</div>
          <div>7</div>
          <div>8</div>
          <div>8</div>
          <div></div>
          <div>A</div>
          <div>B</div>
          <div>C</div>
          <div>D</div>
          <div>E</div>
          <div>F</div>
          <div>G</div>
          <div>H</div>
          <div></div>
          {/* Szachownica */}
          <div
            className="border border-2 border-secondary"
            id="container-inner"
            style={{
              gridColumn: "2/10",
              gridRow: "2/10",
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gridTemplateRows: "repeat(8, 1fr)",
            }}
          >
            {Array.from({ length: 64 }, (_, index) => {
              const row = Math.floor(index / 8) + 1;
              const col = {
                name: String.fromCharCode(65 + (index % 8)),
                number: (index % 8) + 1,
              };
              const pawn = pawnBoard.find(
                (pawn: SelectedPawn) =>
                  pawn.row === row && pawn.col.name === col.name
              );
              return (
                <div
                  key={index}
                  className="w-100 h-100 p-1"
                  style={{
                    backgroundColor: pawn
                      ? (pawn.row === selectedPawn?.row &&
                          pawn.col.number === selectedPawn?.col.number) ||
                        (pawn.row + 1 === selectedPawn?.row &&
                          pawn.col.number + 1 === selectedPawn?.col.number &&
                          pawn.color === "none") ||
                        (pawn.row + 1 === selectedPawn?.row &&
                          pawn.col.number - 1 === selectedPawn?.col.number &&
                          pawn.color === "none") ||
                        (pawn.row - 1 === selectedPawn?.row &&
                          pawn.col.number - 1 === selectedPawn?.col.number &&
                          pawn.color === "none") ||
                        (pawn.row - 1 === selectedPawn?.row &&
                          pawn.col.number + 1 === selectedPawn?.col.number &&
                          pawn.color === "none")
                        ? "green"
                        : "black"
                      : "var(--nth-color)",
                    cursor:
                      (pawn && pawn.color === "blue") || selectedPawn
                        ? "pointer"
                        : "default",
                  }}
                  onClick={() => {
                    if (selectedPawn) {
                      handleEmptyFieldClick(row, col);
                    } else {
                      handlePawnClick(pawn ? pawn.id : null);
                    }
                  }}
                >
                  {pawn && pawn.color !== "none" && (
                    <img
                      src={pawn.color === "red" ? redPawn : bluePawn}
                      className="img-fluid"
                      alt=""
                    />
                  )}
                </div>
              );
            })}
          </div>
          {/* koniec szachownicy tutaj*/}
        </div>
        <div className="mt-4 d-flex  justify-content-start  w-100">
          <div
            className="hexagon"
            style={{ backgroundColor: "var(--clr-sky-250)" }}
          >
            <div
              className="hexagon"
              style={{
                scale: "80%",
                background: `url(${nicola})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <span className="mt-1 ms-3 mt-sm-2 ms-sm-4 d-flex flex-column ">
            <span>
              Nicola Tesla <span className="text-white-50">(Ty)</span>
            </span>
          </span>
        </div>
      </div>
      <div
        className="px-2 px-sm-4 d-flex align-items-center vh-100  xd2  justify-content-center "
        style={{ backgroundColor: "var(--clr-neutral-700)" }}
      >
        <div
          className="d-flex flex-column w-100  h-75  rounded-1 text-white border border-2 border-secondary position-relative "
          style={{
            backgroundColor: "var(--clr-neutral-750)",
            minWidth: "300px",
            maxWidth: "380px",
          }}
        >
          <div className="d-flex flex-column fw-bold w-100  flex-fill border-bottom border-2 border-secondary m-0 align-items-start overflow-hidden ">
            <Table striped className="table-borderless m-0" variant="dark">
              <thead className="text-center position-sticky top-0 border border-2 border-secondary border-top-0 border-start-0 border-end-0 ">
                <tr>
                  <th>Tura</th>
                  <th>Niebieskie</th>
                  <th>Czerwone</th>
                </tr>
              </thead>
            </Table>
            <div className="w-100 overflow-auto">
              <Table striped className="table-borderless ps-2" variant="dark">
                <tbody className="text-center 2  border-secondary ">
                  <tr>
                    <td style={{ width: "21.331%" }}>1.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>F-3{"->"}E4</td>
                    <td>F-3{"->"}E4</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div
            className="w-100  bottom-0 d-flex flex-wrap justify-content-evenly p-3 gap-4"
            style={{ backgroundColor: "var(--clr-neutral-800)" }}
          >
            <OverlayTrigger
              placement="top"
              delay={{ show: 100, hide: 200 }}
              overlay={<Tooltip id={"1"}>{"Nowa gra"}</Tooltip>}
            >
              <Button
                variant={"secondary"}
                className=" px-4 py-0 rounded-2 border-0 "
              >
                <i className="bi bi-arrow-clockwise fs-4"></i>
              </Button>
            </OverlayTrigger>
            <Button
              variant={"secondary"}
              className=" px-4 py-0 rounded-2 border-0 "
            >
              <i className="bi bi-chevron-left fs-4"></i>
            </Button>
            <Button
              variant={"secondary"}
              className=" px-4 py-0 rounded-2 border-0 "
            >
              <i className="bi bi-chevron-right fs-4 "></i>
            </Button>
            <Button
              variant={"secondary"}
              className=" px-4 py-0 rounded-2 border-0"
              disabled
            >
              <i className="bi bi-download fs-4 "></i>
            </Button>
            <Button
              variant={"secondary"}
              className=" px-4 py-0 rounded-2 border-0 "
              flex-1
            >
              <img src={drawSvg} alt="drawSvg" />
            </Button>
            <Button
              variant={"secondary"}
              className=" px-4 py-0 rounded-2 border-0 "
            >
              <i className="bi bi-flag-fill fs-4"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
