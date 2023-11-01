import React from "react";

const Logout = ({ name, handleLogout }) => {
  return (
    <p>
      {name} <span>logged in</span>{" "}
      <button onClick={handleLogout}>Logout</button>
    </p>
  );
};

export default Logout;
