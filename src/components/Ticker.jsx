// components/Ticker.jsx
import React from "react";
import styles from "./styles/ticker.module.scss";

const colToFile = (col) => String.fromCharCode("a".charCodeAt(0) + col);
const rowToRank = (row) => 8 - row;

export const Ticker = ({ moveHistory }) => {
  if (!Array.isArray(moveHistory)) return null;

  const formatMove = ({ player, piece, from, to, capturedPiece }) => {
    const fromSquare = `${colToFile(from.col)}${rowToRank(from.row)}`;
    const toSquare = `${colToFile(to.col)}${rowToRank(to.row)}`;
    const action = capturedPiece
      ? `x${capturedPiece.toUpperCase()}`
      : "-";
    return `${player}: ${piece.toUpperCase()} ${fromSquare}${action}${toSquare}`;
  };

  return (
    <div className={styles.moveHistory}>
      <h3>Move History</h3>
      <ol>
        {moveHistory.map((move, i) => (
          <li key={i}>{formatMove(move)}</li>
        ))}
      </ol>
    </div>
  );
};