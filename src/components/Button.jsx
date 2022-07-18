import React from "react";
import "./styles.css";

const Button = ({ className, text, type, onClick }) => {
  return (
    <>
      <button className={className} type={type} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
