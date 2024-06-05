import { Square } from "../../utils/types/Square";

export function getSquaresArray(): Square {
  const squares = [];
  for (let rows = 1; rows < 9; rows++) {
    for (let cols = 1; cols < 9; cols++) {
      const squareKey = rows.toString() + cols.toString();
      squares.push({
        key: squareKey,
        className:
          "square-" +
          parseInt(rows.toString() + cols.toString()) +
          (rows % 2 === 0
            ? cols % 2 === 0
              ? " bg-checker-secondary"
              : " bg-checker-primary"
            : cols % 2 === 0
              ? " bg-checker-primary"
              : " bg-checker-secondary") +
          " position-absolute bg-transparent square ",
      });
    }
  }
  return squares;
}
