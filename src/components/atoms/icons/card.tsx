const Card = ({ fill = "#fff", width = "330", height = "70" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-credit-card"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={fill}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />{" "}
      <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />{" "}
      <path d="M3 10l18 0" /> <path d="M7 15l.01 0" /> <path d="M11 15l2 0" />{" "}
    </svg>
  );
};

export default Card;
