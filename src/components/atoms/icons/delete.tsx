import { THEME } from "@/utils/theme";
import React, { useState } from "react";

const Delete = ({ onClick = () => {} }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const strokeColor = hovered ? "red" : THEME.primary;

  return (
    <svg
      onClick={onClick}
      cursor="pointer"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-trash"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={strokeColor} // Set the stroke color dynamically
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />{" "}
      <path d="M4 7l16 0" /> <path d="M10 11l0 6" /> <path d="M14 11l0 6" />{" "}
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />{" "}
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />{" "}
    </svg>
  );
};

export default Delete;
