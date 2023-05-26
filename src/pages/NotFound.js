import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <h2>Sorry Page not Found!</h2>
      <Link
        to="/"
        className="px-3 font-bold py-1  rounded-full text-sm bg-cyan text-primary"
      >
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
