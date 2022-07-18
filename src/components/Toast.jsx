import React from "react";
import "../assets/scss/styles.css";

const Toast = ({ className, text }) => {
  return <div className={className}>{text}</div>;
};

export default Toast;
