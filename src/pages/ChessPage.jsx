import React, { useState } from "react";
import Chessboard from "../components/Chessboard";
import { Ticker } from "../components/Ticker";

const ChessPage = () => {
  const [boardState, setBoardState] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);

  const handleStateUpdate = (board, moves) => {
    setBoardState(board);
    setMoveHistory(moves);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Chessboard</h1>
      <p>So far rough and dirty game that plays random moves</p>
      <div style={{ display: "flex", gap: "2rem" }}>
        <Chessboard stateCallback={handleStateUpdate} />
        <Ticker moveHistory={moveHistory} />
      </div>
    </div>
  );
};

export default ChessPage;