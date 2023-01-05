import React, { useState } from "react";

const Nav = ({ selected, setSelected }) => {
  return (
    <div className="nav">
      <div
        className={`nav-item nav-recent${
          selected === "Recent" ? " nav-selected" : ""
        }`}
        onClick={() => setSelected("Recent")}
      >
        Recent
      </div>
      <div
        className={`nav-item nav-all${
          selected === "All" ? " nav-selected" : ""
        }`}
        onClick={() => setSelected("All")}
      >
        All
      </div>
      <div
        className={`nav-item nav-archived${
          selected === "Archived" ? " nav-selected" : ""
        }`}
        onClick={() => setSelected("Archived")}
      >
        Archived
      </div>
      <div></div>
    </div>
  );
};

export default Nav;
