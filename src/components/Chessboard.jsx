import React, { useState } from "react";
import Square from "./Square";
import {
  calculateQueenMoves,
  calculateRookMoves,
  calculateBishopMoves,
  calculatePawnMoves,
} from "../utils/moves"; // Make sure your utils file exports these

const START_POSITION = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["P", "P", "P", null, "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const Chessboard = () => {
  const [board, setBoard] = useState(START_POSITION);
  const [selected, setSelected] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);

const getPossibleMoves = (row, col, board) => {
  const piece = board[row][col];
  if (!piece) return [];

  const lower = piece.toLowerCase();
  switch (lower) {
    case "q":
      return calculateQueenMoves(row, col, board);
    case "r":
      return calculateRookMoves(row, col, board);
    case "b":
      return calculateBishopMoves(row, col, board);
    case "p":
      console.log("P")
      return calculatePawnMoves(row, col, board);
    default:
      return [];
  }
};

  const handleSquareClick = (row, col) => {
    const clickedPiece = board[row][col];

    if (possibleMoves.some((m) => m.row === row && m.col === col)) {
      const newBoard = board.map((r) => r.slice());
      newBoard[row][col] = board[selected.row][selected.col];
      newBoard[selected.row][selected.col] = null;
      setBoard(newBoard);
      setSelected(null);
      setPossibleMoves([]);
      return;
    }

    if (clickedPiece && ["q", "r", "b", "p"].includes(clickedPiece.toLowerCase())) {
      setSelected({ row, col });
      setPossibleMoves(getPossibleMoves(row, col, board));
      return;
    }

    // Otherwise clear selection
    setSelected(null);
    setPossibleMoves([]);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 60px)",
        gridTemplateRows: "repeat(8, 60px)",
        border: "2px solid black",
        width: "480px",
        height: "480px",
      }}
    >
{board.flatMap((rowData, row) =>
  rowData.map((piece, col) => {
    const isDark = (row + col) % 2 === 1;
    const isSelected = selected && selected.row === row && selected.col === col;
    const isPossibleMove = possibleMoves.some((m) => m.row === row && m.col === col);
    const isCaptureMove = possibleMoves.some(
      (m) => m.row === row && m.col === col && m.isCapture
    );

    return (
      <Square
        key={`${row}-${col}`}
        isDark={isDark}
        piece={piece}
        isSelected={isSelected}
        isPossibleMove={isPossibleMove}
        isCaptureMove={isCaptureMove}
        onClick={() => handleSquareClick(row, col)}
      />
    );
  })
)}


    </div>
  );
};

export default Chessboard;