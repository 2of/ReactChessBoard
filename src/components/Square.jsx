import React from "react";
import Piece from "./Piece";
import styles from "./styles/Square.module.scss";

const Square = ({
  isDark,
  piece,
  isSelected,
  isPossibleMove,
  isCaptureMove,
  onClick,
}) => {
  const colorClass = isDark ? styles.dark : styles.light;

  return (
    <div onClick={onClick} className={`${styles.square} ${colorClass} ${isSelected ? styles.selected : ""}`}>
      {isPossibleMove && <div className={styles.possibleMoveIndicator} />}
      {isCaptureMove && <div className={styles.captureMoveIndicator} />}
      {piece && <Piece type={piece} />}
    </div>
  );
};

export default Square;