const Analytics = ({ fill = "#fff", width = "330", height = "70" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chart-histogram"
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
      <path d="M3 3v18h18" /> <path d="M20 18v3" /> <path d="M16 16v5" />{" "}
      <path d="M12 13v8" /> <path d="M8 16v5" />{" "}
      <path d="M3 11c6 0 5 -5 9 -5s3 5 9 5" />{" "}
    </svg>
  );
};

export default Analytics;
