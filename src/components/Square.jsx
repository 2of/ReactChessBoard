// components/Square.jsx

import React from "react";
import Piece from "./Piece";

const Square = ({
  isDark,
  piece,
  isSelected,
  isPossibleMove,
  isCaptureMove,
  onClick,
}) => {
  const baseColor = isDark ? "#8c5696ff" : "#eeeed2";
  const bgColor = isSelected
    ? "#f6f669" // yellow for selected
    : isPossibleMove
    ? "#6ca0dc88" // translucent blue
    : baseColor;

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
      }}
    >

      {isCaptureMove && (
        <div
          style={{
            position: "absolute",
            width: "75%",
            height: "75%",
            border: "3px solid red",
            borderRadius: "50%",
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        />
      )}
      {piece && <Piece type={piece} />}
    </div>
  );
};

export default Square;