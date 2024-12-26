import React from "react";
import { Button as SimpleButton } from "@mui/material";

function CustomButton({
  text,
  width,
  marginLeft,
  type = "submit",
}) {
  return (
    <>
      <SimpleButton
        type={type}
        id="my-button-id"
        className="my-button-class"
        sx={{
          background: "#0B7974",
          color: "white",
          borderRadius: "10px",
          height: "52px",
          width: width,
          marginTop: "15px",
          marginLeft: marginLeft,
          textTransform: "none",
          "&:hover": {
            cursor: "pointer",
            background: "#0B7974",
          },
        }}
      >
        {text}
      </SimpleButton>
    </>
  );
}

export default CustomButton;
