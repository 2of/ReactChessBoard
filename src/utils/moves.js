// utils/moveLogic.js

export const onBoard = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

/**
 * Calculate all possible moves for sliding pieces along given directions.
 * @param {number} row 
 * @param {number} col 
 * @param {Array<Array<string|null>>} board 
 * @param {Array<[number,number]>} directions 
 * @returns {Array<{row:number, col:number, isCapture:boolean}>}
 */
function calculateSlidingMoves(row, col, board, directions) {
  const moves = [];
  const piece = board[row][col];
  const isWhite = piece === piece.toUpperCase();

  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;

    while (onBoard(r, c)) {
      const target = board[r][c];

      if (target === null) {
        moves.push({ row: r, col: c, isCapture: false });
      } else {
        const targetIsWhite = target === target.toUpperCase();
        if (targetIsWhite !== isWhite) {
          moves.push({ row: r, col: c, isCapture: true }); // capture opponent
        }
        break; // blocked
      }

      r += dr;
      c += dc;
    }
  }

  return moves;
}

/**
 * Calculate rook moves (vertical + horizontal)
 */
export function calculateRookMoves(row, col, board) {
  const rookDirections = [
    [1, 0],  // down
    [-1, 0], // up
    [0, 1],  // right
    [0, -1], // left
  ];

  return calculateSlidingMoves(row, col, board, rookDirections);
}

/**
 * Calculate bishop moves (diagonal)
 */
export function calculateBishopMoves(row, col, board) {
  const bishopDirections = [
    [1, 1],   // down-right
    [1, -1],  // down-left
    [-1, 1],  // up-right
    [-1, -1], // up-left
  ];

  return calculateSlidingMoves(row, col, board, bishopDirections);
}

/**
 * Calculate queen moves (rook + bishop)
 */
export function calculateQueenMoves(row, col, board) {
  const queenDirections = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [1, -1], [-1, 1], [-1, -1],
  ];

  return calculateSlidingMoves(row, col, board, queenDirections);
}

/**
 * Calculate pawn moves
 */
export function calculatePawnMoves(row, col, board) {
  const moves = [];
  const piece = board[row][col];
  const direction = piece === "P" ? -1 : 1;
  const startRow = piece === "P" ? 6 : 1;

  const forwardRow = row + direction;

  // Forward move
  if (board[forwardRow]?.[col] == null) {
    moves.push({ row: forwardRow, col, isCapture: false });

    // Double move
    if (row === startRow && board[forwardRow + direction]?.[col] == null) {
      moves.push({ row: forwardRow + direction, col, isCapture: false });
    }
  }

  // Diagonal captures
  for (let dc of [-1, 1]) {
    const target = board[forwardRow]?.[col + dc];
    if (
      target &&
      (piece === "P" ? target.toLowerCase() === target : target.toUpperCase() === target)
    ) {
      moves.push({ row: forwardRow, col: col + dc, isCapture: true });
    }
  }

  return moves;
}