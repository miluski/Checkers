import "../Board/Board.css";
import React, { useEffect, useState } from "react";
import AlertModal from "../Modals/AlertModal/AlertModal.tsx";

export default function AiBoard({
  openResetModal,
  setOpenResetModal,
  setBluePawnCollected,
  setRedPawnCollected,
  addMove,
}: {
  openResetModal: boolean;
  setOpenResetModal: Function;
  redPawnCollected: number;
  bluePawnCollected: number;
  setBluePawnCollected: Function;
  setRedPawnCollected: Function;
  addMove: Function;
}) {
  const [selectedPiece, setSelectedPiece] = useState<HTMLDivElement | null>(
    null,
  );
  const [selectedPieceByAi, setSelectedPieceByAi] =
    useState<HTMLDivElement | null>(null);
  const [toBeat, setToBeat] = useState<HTMLDivElement | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"blue" | "red">("blue");
  const [openWinModal, setOpenWindModal] = useState(false);
  const [openLostModal, setOpenLostModal] = useState(false);

  function handleReset() {
    window.location.reload();
  }

  const indexToCoordinate = (index: any) => {
    const tens = Math.floor(index / 10);
    const units = index % 10;

    const letters = "ABCDEFGH";
    const letter = letters[units - 1];
    return `${letter}${tens}`;
  };

  useEffect(() => {
    if (currentPlayer === "red") {
      const timer = setTimeout(() => {
        getRandomPawn();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (
      document.querySelectorAll<HTMLDivElement>(".red-pawn").length === 0 &&
      document.querySelectorAll<HTMLDivElement>(".red-pawn-king").length === 0
    ) {
      setOpenWindModal(true);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (
      document.querySelectorAll<HTMLDivElement>(".blue-pawn").length === 0 &&
      document.querySelectorAll<HTMLDivElement>(".blue-pawn-king").length === 0
    ) {
      setOpenLostModal(true);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (selectedPieceByAi) {
      const timer = setTimeout(() => {
        movePieceAi();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [selectedPieceByAi]);

  function getRandomPawn() {
    const allBotPawns = document.querySelectorAll<HTMLDivElement>(
      ".red-pawn, .red-pawn-king",
    );
    let randomIndex = Math.floor(Math.random() * allBotPawns.length);
    let availableMoves = getAvailableMoves(allBotPawns[randomIndex]);

    while (availableMoves.length === 0) {
      randomIndex = Math.floor(Math.random() * allBotPawns.length);
      availableMoves = getAvailableMoves(allBotPawns[randomIndex]);
    }

    setSelectedPieceByAi(allBotPawns[randomIndex]);
  }

  function movePieceAi() {
    if (!selectedPieceByAi) return;

    const availableAiMoves: HTMLDivElement[] = [];
    const availableMoves = getAvailableMoves(selectedPieceByAi);

    availableMoves.forEach((square) => {
      availableAiMoves.push(square);
    });

    const randomIndex = Math.floor(Math.random() * availableAiMoves.length);
    const targetSquare = availableAiMoves[randomIndex];

    if (targetSquare.classList.contains("square") && selectedPieceByAi) {
      const selectedClass = selectedPieceByAi.classList.item(0);
      const targetClass = targetSquare.classList.item(0);

      if (isMoveLegal(selectedPieceByAi, targetSquare)) {
        const startCoordinate = indexToCoordinate(selectedClass!.slice(7));
        const endCoordinate = indexToCoordinate(targetClass!.slice(7));

        selectedPieceByAi.classList.replace(selectedClass!, targetClass!);
        if (
          targetClass === "square-11" ||
          targetClass === "square-12" ||
          targetClass === "square-13" ||
          targetClass === "square-14" ||
          targetClass === "square-15" ||
          targetClass === "square-16" ||
          targetClass === "square-17" ||
          targetClass === "square-18"
        ) {
          selectedPieceByAi.classList.replace("red-pawn", "red-pawn-king");
        }
        if (toBeat) {
          toBeat.remove();
          setBluePawnCollected((prev: number) => prev + 1);
          setToBeat(null);
        }
        addMove("red", `${startCoordinate} -> ${endCoordinate}`);
        setCurrentPlayer(currentPlayer === "blue" ? "red" : "blue");
      }

      const allSquares = document.querySelectorAll<HTMLDivElement>(".square");
      allSquares.forEach((square) => {
        square.classList.remove("available-move");
      });
      setSelectedPieceByAi(null);
    }
  }

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const selectedSquare = e.target as HTMLDivElement;

    if (selectedPiece === null) {
      if (
        (currentPlayer === "blue" &&
          selectedSquare.classList.contains("blue-pawn")) ||
        (currentPlayer === "red" &&
          selectedSquare.classList.contains("red-pawn")) ||
        (currentPlayer === "blue" &&
          selectedSquare.classList.contains("blue-pawn-king")) ||
        (currentPlayer === "red" &&
          selectedSquare.classList.contains("red-pawn-king"))
      ) {
        const allSquares = document.querySelectorAll<HTMLDivElement>(".square");
        allSquares.forEach((square) => {
          square.classList.remove("available-move");
        });

        const availableMoves = getAvailableMoves(selectedSquare);
        availableMoves.forEach((square) => {
          square.classList.add("available-move");
        });

        setSelectedPiece(selectedSquare);
      } else {
        setSelectedPiece(null);
      }
    }
  }

  function getAvailableMoves(selectedSquare: HTMLDivElement): HTMLDivElement[] {
    const isBluePawn = selectedSquare.classList.contains("blue-pawn");
    const isBluePawnKing = selectedSquare.classList.contains("blue-pawn-king");
    const isRedPawn = selectedSquare.classList.contains("red-pawn");
    const isRedPawnKing = selectedSquare.classList.contains("red-pawn-king");
    const selectedClass = selectedSquare.classList.item(0);
    const selectedSquareIndex = parseInt(selectedClass!.split("-")[1]);

    let availableMoves: HTMLDivElement[] = [];

    if (isBluePawn) {
      const squareRowUpLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 9}`,
      );
      const squareRowUpRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 11}`,
      );
      const squareTwoRowUpLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 18}`,
      );
      const squareTwoRowUpRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 22}`,
      );

      if (
        squareTwoRowUpLeft &&
        squareRowUpLeft &&
        !squareTwoRowUpLeft.classList.contains("pawn") &&
        (squareRowUpLeft.classList.contains("red-pawn") ||
          squareRowUpLeft.classList.contains("red-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowUpLeft);
        setToBeat(squareRowUpLeft);
      } else {
        if (
          squareRowUpLeft &&
          !squareRowUpLeft.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowUpLeft);
        }

        if (
          squareRowUpRight &&
          !squareRowUpRight.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowUpRight);
        }
      }

      if (
        squareTwoRowUpRight &&
        squareRowUpRight &&
        !squareTwoRowUpRight.classList.contains("pawn") &&
        (squareRowUpRight.classList.contains("red-pawn") ||
          squareRowUpRight.classList.contains("red-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowUpRight);
        setToBeat(squareRowUpRight);
      }
    } else if (isRedPawn) {
      const squareRowDownLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 9}`,
      );
      const squareRowDownRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 11}`,
      );
      const squareTwoRowDownLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 18}`,
      );
      const squareTwoRowDownRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 22}`,
      );

      if (
        squareTwoRowDownLeft &&
        squareRowDownLeft &&
        !squareTwoRowDownLeft.classList.contains("pawn") &&
        (squareRowDownLeft.classList.contains("blue-pawn") ||
          squareRowDownLeft.classList.contains("blue-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowDownLeft);
        setToBeat(squareRowDownLeft);
      } else {
        if (
          squareRowDownLeft &&
          !squareRowDownLeft.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowDownLeft);
        }

        if (
          squareRowDownRight &&
          !squareRowDownRight.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowDownRight);
        }
      }

      if (
        squareTwoRowDownRight &&
        squareRowDownRight &&
        !squareTwoRowDownRight.classList.contains("pawn") &&
        (squareRowDownRight.classList.contains("blue-pawn") ||
          squareRowDownRight.classList.contains("blue-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowDownRight);
        setToBeat(squareRowDownRight);
      }
    } else if (isBluePawnKing) {
      const squareRowUpLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 9}`,
      );
      const squareRowUpRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 11}`,
      );
      const squareTwoRowUpLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 18}`,
      );
      const squareTwoRowUpRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 22}`,
      );
      const squareRowDownLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 9}`,
      );
      const squareRowDownRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 11}`,
      );
      const squareTwoRowDownLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 18}`,
      );
      const squareTwoRowDownRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 22}`,
      );

      if (
        squareTwoRowUpLeft &&
        squareRowUpLeft &&
        !squareTwoRowUpLeft.classList.contains("pawn") &&
        (squareRowUpLeft.classList.contains("red-pawn") ||
          squareRowUpLeft.classList.contains("red-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowUpLeft);
        setToBeat(squareRowUpLeft);
      } else {
        if (
          squareRowUpLeft &&
          !squareRowUpLeft.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowUpLeft);
        }
        if (
          squareRowUpRight &&
          !squareRowUpRight.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowUpRight);
        }

        if (
          squareRowDownLeft &&
          !squareRowDownLeft.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowDownLeft);
        }

        if (
          squareRowDownRight &&
          !squareRowDownRight.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowDownRight);
        }
      }

      if (
        squareTwoRowUpRight &&
        squareRowUpRight &&
        !squareTwoRowUpRight.classList.contains("pawn") &&
        (squareRowUpRight.classList.contains("red-pawn") ||
          squareRowUpRight.classList.contains("red-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowUpRight);
        setToBeat(squareRowUpRight);
      }

      if (
        squareTwoRowDownLeft &&
        squareRowDownLeft &&
        !squareTwoRowDownLeft.classList.contains("pawn") &&
        (squareRowDownLeft.classList.contains("red-pawn") ||
          squareRowDownLeft.classList.contains("red-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowDownLeft);
        setToBeat(squareRowDownLeft);
      }

      if (
        squareTwoRowDownRight &&
        squareRowDownRight &&
        !squareTwoRowDownRight.classList.contains("pawn") &&
        (squareRowDownRight.classList.contains("red-pawn") ||
          squareRowDownRight.classList.contains("red-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowDownRight);
        setToBeat(squareRowDownRight);
      }
    } else if (isRedPawnKing) {
      const squareRowUpLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 9}`,
      );
      const squareRowUpRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 11}`,
      );
      const squareTwoRowUpLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 18}`,
      );
      const squareTwoRowUpRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex + 22}`,
      );
      const squareRowDownLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 9}`,
      );
      const squareRowDownRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 11}`,
      );
      const squareTwoRowDownLeft = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 18}`,
      );
      const squareTwoRowDownRight = document.querySelector<HTMLDivElement>(
        `.square-${selectedSquareIndex - 22}`,
      );

      if (
        squareTwoRowUpLeft &&
        squareRowUpLeft &&
        !squareTwoRowUpLeft.classList.contains("pawn") &&
        (squareRowUpLeft.classList.contains("blue-pawn") ||
          squareRowUpLeft.classList.contains("blue-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowUpLeft);
        setToBeat(squareRowUpLeft);
      } else {
        if (
          squareRowUpLeft &&
          !squareRowUpLeft.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowUpLeft);
        }
        if (
          squareRowUpRight &&
          !squareRowUpRight.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowUpRight);
        }

        if (
          squareRowDownLeft &&
          !squareRowDownLeft.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowDownLeft);
        }

        if (
          squareRowDownRight &&
          !squareRowDownRight.classList.contains("pawn") &&
          toBeat === null
        ) {
          availableMoves.push(squareRowDownRight);
        }
      }

      if (
        squareTwoRowUpRight &&
        squareRowUpRight &&
        !squareTwoRowUpRight.classList.contains("pawn") &&
        (squareRowUpRight.classList.contains("blue-pawn") ||
          squareRowUpRight.classList.contains("blue-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowUpRight);
        setToBeat(squareRowUpRight);
      }

      if (
        squareTwoRowDownLeft &&
        squareRowDownLeft &&
        !squareTwoRowDownLeft.classList.contains("pawn") &&
        (squareRowDownLeft.classList.contains("blue-pawn") ||
          squareRowDownLeft.classList.contains("blue-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowDownLeft);
        setToBeat(squareRowDownLeft);
      }

      if (
        squareTwoRowDownRight &&
        squareRowDownRight &&
        !squareTwoRowDownRight.classList.contains("pawn") &&
        (squareRowDownRight.classList.contains("blue-pawn") ||
          squareRowDownRight.classList.contains("blue-pawn-king"))
      ) {
        availableMoves = [];
        availableMoves.push(squareTwoRowDownRight);
        setToBeat(squareRowDownRight);
      }
    }

    return availableMoves;
  }

  function isMoveLegal(
    selectedSquare: HTMLDivElement,
    targetSquare: HTMLDivElement,
  ) {
    const availableMoves = getAvailableMoves(selectedSquare);
    return availableMoves.includes(targetSquare);
  }

  function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const targetSquare = e.target as HTMLDivElement;

    if (targetSquare.classList.contains("square") && selectedPiece) {
      const selectedClass = selectedPiece.classList.item(0);
      const targetClass = targetSquare.classList.item(0);

      if (isMoveLegal(selectedPiece, targetSquare)) {
        const startCoordinate = indexToCoordinate(selectedClass!.slice(7));
        const endCoordinate = indexToCoordinate(targetClass!.slice(7));

        selectedPiece.classList.replace(selectedClass!, targetClass!);
        if (
          targetClass === "square-81" ||
          targetClass === "square-82" ||
          targetClass === "square-83" ||
          targetClass === "square-84" ||
          targetClass === "square-85" ||
          targetClass === "square-86" ||
          targetClass === "square-87" ||
          targetClass === "square-88"
        ) {
          selectedPiece.classList.replace("blue-pawn", "blue-pawn-king");
        }
        if (toBeat) {
          toBeat.remove();
          setRedPawnCollected((prev: number) => prev + 1);
          setToBeat(null);
        }
        addMove("blue", `${startCoordinate}->${endCoordinate}`);
        setCurrentPlayer(currentPlayer === "blue" ? "red" : "blue");
      }

      const allSquares = document.querySelectorAll<HTMLDivElement>(".square");
      allSquares.forEach((square) => {
        square.classList.remove("available-move");
      });
      setSelectedPiece(null);
    }
  }

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
      <div
        onClick={grabPiece}
        onMouseDown={movePiece}
        className="border border-2 border-secondary board-areas-container w-100 h-100 position-relative"
      >
        {(() => {
          const squares = [];
          for (let rows = 1; rows < 9; rows++) {
            for (let cols = 1; cols < 9; cols++) {
              const squareKey = rows.toString() + cols.toString();
              if ((rows + cols) % 2 == 0 && (rows < 4 || rows > 5)) {
                squares.push(
                  <div
                    tabIndex={0}
                    key={squareKey}
                    className={
                      " square-" +
                      parseInt(rows.toString() + cols.toString()) +
                      " position-absolute bg-transparent z-1 pawn square " +
                      (rows < 4 ? "blue-pawn" : "red-pawn")
                    }
                  ></div>,
                );
              }
            }
          }
          return squares;
        })()}
        {(() => {
          const squares = [];
          for (let rows = 1; rows < 9; rows++) {
            for (let cols = 1; cols < 9; cols++) {
              const squareKey = rows.toString() + cols.toString();
              squares.push(
                <div
                  key={squareKey}
                  className={
                    "square-" +
                    parseInt(rows.toString() + cols.toString()) +
                    (rows % 2 === 0
                      ? cols % 2 === 0
                        ? " bg-checker-secondary"
                        : " bg-checker-primary"
                      : cols % 2 === 0
                        ? " bg-checker-primary"
                        : " bg-checker-secondary") +
                    " position-absolute  square "
                  }
                ></div>,
              );
            }
          }
          return squares;
        })()}
      </div>
      <AlertModal
        show={openResetModal}
        onProceed={handleReset}
        onDismiss={() => setOpenResetModal(false)}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="currentColor"
            className="bi bi-question-lg"
            viewBox="0 0 16 16"
          >
            <path d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14" />
          </svg>
        }
        title="Nowa gra?"
        text="Czy napewno chcesz zacząć nową grę ?"
        color="var(--color-orange-300)"
        onProceedButtonVariant="primary"
        onDismissButtonVariant="neutral"
        onProceedButtonText="Tak"
        onDismissButtonText="Anuluj"
      />
      <AlertModal
        show={openWinModal}
        onProceed={handleReset}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="currentColor"
            className="bi bi-check-lg"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
          </svg>
        }
        title="Gratulację!"
        text="Wygrałeś"
        color="var(--color-green-300)"
        onProceedButtonVariant="success"
        onProceedButtonText="Nowa gra"
      />
      <AlertModal
        show={openLostModal}
        onProceed={handleReset}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        }
        title="Niestety!"
        text="Przegrałeś"
        color="var(--clr-red-450)"
        onProceedButtonVariant="primary"
        onProceedButtonText="Nowa gra"
      />
    </div>
  );
}
