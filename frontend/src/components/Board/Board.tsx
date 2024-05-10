import "./Board.css";
import React, { useState } from "react";

export default function Board() {
  const [selectedPiece, setSelectedPiece] = useState<HTMLDivElement | null>(
    null,
  );

  const allSquares = document.querySelectorAll<HTMLDivElement>(".square");

  const [toBeat, setToBeat] = useState<HTMLDivElement | null>(null);

  const [currentPlayer, setCurrentPlayer] = useState<"blue" | "red">("blue");

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const selectedSquare = e.target as HTMLDivElement;

    if (selectedPiece === null) {
      console.log(selectedSquare);

      if (
        (currentPlayer === "blue" &&
          selectedSquare.classList.contains("blue-pawn")) ||
        (currentPlayer === "red" &&
          selectedSquare.classList.contains("red-pawn"))
      ) {
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
    // Pobierz kolor pionka
    const isBluePawn = selectedSquare.classList.contains("blue-pawn");
    const isRedPawn = selectedSquare.classList.contains("red-pawn");

    // Pobierz indeks aktualnego pola
    const selectedClass = selectedSquare.classList.item(0);
    const selectedSquareIndex = parseInt(selectedClass!.split("-")[1]);

    const availableMoves: HTMLDivElement[] = [];

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
        squareRowUpLeft.classList.contains("red-pawn")
      ) {
        availableMoves.push(squareTwoRowUpLeft);
        setToBeat(squareRowUpLeft);
      } else if (
        squareRowUpLeft &&
        !squareRowUpLeft.classList.contains("pawn") &&
        toBeat === null
      )
        availableMoves.push(squareRowUpLeft);

      if (
        squareTwoRowUpRight &&
        squareRowUpRight &&
        !squareTwoRowUpRight.classList.contains("pawn") &&
        squareRowUpRight.classList.contains("red-pawn")
      ) {
        availableMoves.push(squareTwoRowUpRight);
        setToBeat(squareRowUpRight);
      } else if (
        squareRowUpRight &&
        !squareRowUpRight.classList.contains("pawn") &&
        toBeat === null
      )
        availableMoves.push(squareRowUpRight);
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
        squareRowDownLeft.classList.contains("blue-pawn")
      ) {
        availableMoves.push(squareTwoRowDownLeft);
        setToBeat(squareRowDownLeft);
      } else if (
        squareRowDownLeft &&
        !squareRowDownLeft.classList.contains("pawn") &&
        toBeat === null
      )
        availableMoves.push(squareRowDownLeft);

      if (
        squareTwoRowDownRight &&
        squareRowDownRight &&
        !squareTwoRowDownRight.classList.contains("pawn") &&
        squareRowDownRight.classList.contains("blue-pawn")
      ) {
        availableMoves.push(squareTwoRowDownRight);
        setToBeat(squareRowDownRight);
      } else if (
        squareRowDownRight &&
        !squareRowDownRight.classList.contains("pawn") &&
        toBeat === null
      )
        availableMoves.push(squareRowDownRight);
    }

    return availableMoves;
  }

  function isMoveLegal(
    selectedSquare: HTMLDivElement,
    targetSquare: HTMLDivElement,
  ) {
    // Pobierz dostępne ruchy dla wybranego pionka
    const availableMoves = getAvailableMoves(selectedSquare);

    // Sprawdź, czy docelowy kwadrat jest jednym z dostępnych ruchów
    return availableMoves.includes(targetSquare);
  }

  function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const targetSquare = e.target as HTMLDivElement;

    if (targetSquare.classList.contains("square") && selectedPiece) {
      const selectedClass = selectedPiece.classList.item(0);
      const targetClass = targetSquare.classList.item(0);

      if (isMoveLegal(selectedPiece, targetSquare)) {
        selectedPiece.classList.replace(selectedClass!, targetClass!);
        if (toBeat) {
          toBeat.remove();
          setToBeat(null);
        }
        setCurrentPlayer(currentPlayer === "blue" ? "red" : "blue");
      }

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
        {Array.from({ length: 64 }, (_, index) => (
          <div key={index} className="w-100 h-100 "></div>
        ))}

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
                    " position-absolute bg-transparent square "
                  }
                ></div>,
              );
            }
          }
          return squares;
        })()}
      </div>
    </div>
  );
}
