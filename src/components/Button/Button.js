import React from "react";
import "./Button.css";

const Button = ({ type, children, handleClick }) => {
  return (
    <div className={`btn btn-${type}`} onClick={() => handleClick(children)}>
      <p className="btn-label">{children}</p>
    </div>
  );
};

export default Button;
