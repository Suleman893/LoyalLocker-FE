import React from "react";
import { Button as SimpleButton, TextField } from "@mui/material";

function Input({ id, label, type }) {
  return (
    <>
      <TextField
        id={id}
        label={label}
        type={type}
        variant="standard"
        InputLabelProps={{ sx: { "&.Mui-focused": { color: "#09D8C4" } } }}
        InputProps={{
          sx: { "&.MuiInput-root:after": { borderBottomColor: "#09D8C4" } },
        }}
      />
    </>
  );
}

export default Input;
