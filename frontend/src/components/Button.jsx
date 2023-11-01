import React from "react";

const Button = ({ name, handleLoginVisible }) => {
  return <button onClick={handleLoginVisible}>{name}</button>;
};

export default Button;
