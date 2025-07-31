
import React from "react";
import { PIECES } from "../utils/pieces";

const Piece = ({ type }) => {
  return <span style={{ fontSize: "4rem" }}>{PIECES[type]}</span>;
};

export default Piece;