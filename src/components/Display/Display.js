import React from "react";
import "./Display.css";

const Display = ({ input, result }) => {
  return (
    <div className="display">
      <div className="top-display">{result}</div>
      <div className="bottom-display">{input}</div>
    </div>
  );
};

export default Display;
