import React, { useState } from "react";
import Square from "./Square";
import styles from "./styles/Chessboard.module.scss"
import { Ticker } from "./Ticker";
import {
  calculateQueenMoves,
  calculateRookMoves,
  calculateBishopMoves,
  calculatePawnMoves,
  getPossibleMoves
} from "../utils/moves";

import { getMove,initModel } from "../utils/modelhandler";

const START_POSITION = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];





const Chessboard = ({stateCallback}) => {
  const [board, setBoard] = useState(START_POSITION);
  const [selected, setSelected] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]); 
  

const [castlingRights, setCastlingRights] = useState({
  whiteKingSide: true,
  whiteQueenSide: true,
  blackKingSide: true,
  blackQueenSide: true,
});

const updateStateAndNotify = (newBoard, newMoveHistory) => {
  setBoard(newBoard);
  setMoveHistory(newMoveHistory);
  if (stateCallback) {
    stateCallback({ board: newBoard, moveHistory: newMoveHistory });
  }
};

const handleSquareClick = (row, col) => {
  const clickedPiece = board[row][col];
  if (possibleMoves.some((m) => m.row === row && m.col === col)) {
    const newBoard = board.map((r) => r.slice());
    const movedPiece = board[selected.row][selected.col];
    const capturedPiece = board[row][col];

    newBoard[row][col] = movedPiece;
    newBoard[selected.row][selected.col] = null;

    const newMoveHistory = [
      ...moveHistory,
      {
        player: movedPiece === movedPiece.toUpperCase() ? "White" : "Black",
        piece: movedPiece,
        from: { row: selected.row, col: selected.col },
        to: { row, col },
        capturedPiece,
      },
    ];

    updateStateAndNotify(newBoard, newMoveHistory);
    setSelected(null);
    setPossibleMoves([]);

  setTimeout(async () => {
  try {
    const aiMove = await getMove(newBoard); // expected: { from: {row, col}, to: {row, col} }

    if (!aiMove) return;

    const aiMovedPiece = newBoard[aiMove.from.row][aiMove.from.col];
    const aiCapturedPiece = newBoard[aiMove.to.row][aiMove.to.col];

    const updatedBoard = newBoard.map((r) => r.slice());
    updatedBoard[aiMove.to.row][aiMove.to.col] = aiMovedPiece;
    updatedBoard[aiMove.from.row][aiMove.from.col] = null;

    const updatedMoveHistory = [
      ...newMoveHistory,
      {
        player: aiMovedPiece === aiMovedPiece.toUpperCase() ? "White" : "Black",
        piece: aiMovedPiece,
        from: aiMove.from,
        to: aiMove.to,
        capturedPiece: aiCapturedPiece,
      },
    ];

    updateStateAndNotify(updatedBoard, updatedMoveHistory);
  } catch (err) {
    console.error("AI move failed:", err);
  }
}, 300);

    return;
  }

  if (clickedPiece && ["q", "r", "b", "p", "k", "n"].includes(clickedPiece.toLowerCase())) {
    setSelected({ row, col });
    setPossibleMoves(getPossibleMoves(row, col, board));
    return;
  }

  setSelected(null);
  setPossibleMoves([]);
};

  return (
    <>
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

      <Ticker moveHistory={moveHistory} />
    </>
  );
};

export default Chessboard;