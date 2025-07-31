/*


all random moves for now until we add the model imports etc


*/
import {
  calculateBishopMoves,
  calculateQueenMoves,
  calculateRookMoves,
  calculatePawnMoves,
} from "./moves";
export const getMove = (board, as) => {
  const moves = [];
  as = "white";
  const isBlack = as.toLowerCase() === "white";

  board.forEach((rowData, row) => {
    rowData.forEach((piece, col) => {
      if (!piece) return;

      // Check if piece color matches 'as' param
      const pieceIsBlack = piece === piece.toLowerCase();
      if (pieceIsBlack !== isBlack) return;

      const lower = piece.toLowerCase();
      let pieceMoves = [];

      switch (lower) {
        case "q":
          pieceMoves = calculateQueenMoves(row, col, board);
          break;
        case "r":
          pieceMoves = calculateRookMoves(row, col, board);
          break;
        case "b":
          pieceMoves = calculateBishopMoves(row, col, board);
          break;
        case "p":
          pieceMoves = calculatePawnMoves(row, col, board);
          break;
        default:
          return;
      }

      pieceMoves.forEach((move) => {
        moves.push({
          from: { row, col },
          to: { row: move.row, col: move.col },
        });
      });
    });
  });

  if (moves.length === 0) return null;

  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  return randomMove;
};

export const initModel = () => {
  console.log("BEEP BOOP IM THINKLING");
};
