function evaluateBoard(board: any) {
  let score = 0;
  for (let row of board) {
    for (let cell of row) {
      if (cell === "M") score += 1;
      if (cell === "m") score -= 1;
    }
  }
  return score;
}

function getAllPossibleMoves(board: string | any[], isMax: any) {
  let possibleMoves = [];
  let player = isMax ? "M" : "m";
  let direction = isMax ? 1 : -1;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === player) {
        if (board[i + direction] && board[i + direction][j - 1] === " ") {
          let newBoard = JSON.parse(JSON.stringify(board));
          newBoard[i][j] = " ";
          newBoard[i + direction][j - 1] = player;
          possibleMoves.push(newBoard);
        }
        if (board[i + direction] && board[i + direction][j + 1] === " ") {
          let newBoard = JSON.parse(JSON.stringify(board));
          newBoard[i][j] = " ";
          newBoard[i + direction][j + 1] = player;
          possibleMoves.push(newBoard);
        }
      }
    }
  }
  return possibleMoves;
}

function minimax(
  board: string[][],
  depth: number,
  isMax: boolean,
  maxDepth: number
) {
  if (depth === maxDepth) {
    return evaluateBoard(board);
  }

  if (isMax) {
    let best = -Infinity;

    let possibleMoves = getAllPossibleMoves(board, isMax);
    for (let move of possibleMoves) {
      let val = minimax(move, depth + 1, false, maxDepth);
      best = Math.max(best, val);
    }
    return best;
  } else {
    let best = Infinity;

    let possibleMoves = getAllPossibleMoves(board, isMax);
    for (let move of possibleMoves) {
      let val = minimax(move, depth + 1, true, maxDepth);
      best = Math.min(best, val);
    }
    return best;
  }
}

let initialBoard = [
  [" ", "m", " ", "m", " ", "m", " ", "m"],
  ["m", " ", "m", " ", "m", " ", "m", " "],
  [" ", "m", " ", "m", " ", "m", " ", "m"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["M", " ", "M", " ", "M", " ", "M", " "],
  [" ", "M", " ", "M", " ", "M", " ", "M"],
  ["M", " ", "M", " ", "M", " ", "M", " "],
];
let maxDepth = 3;
let optimalValue = minimax(initialBoard, 0, true, maxDepth);
console.log("The optimal value is: " + optimalValue);
