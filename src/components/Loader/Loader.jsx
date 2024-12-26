import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="inherit" style={{ color: "#0B7974" }} />
    </div>
  );
};

export default Loader;
