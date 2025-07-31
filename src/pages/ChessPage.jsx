import React from "react";
import Chessboard from "../components/Chessboard";

const ChessPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Chessboard</h1>
      <p>Play a quick game against my model</p>
      <Chessboard />
    </div>
  );
};

export default ChessPage;