import React from "react";
import { Stack, InputLabel, TextField } from "@mui/material";

function SMSComponent() {
  return (
    <>
      <Stack sx={{ marginTop: "20px" }}>
        <InputLabel
          htmlFor="username"
          sx={{ color: "#232323", fontSize: "14px", paddingBottom: "5px" }}
        >
          Text
        </InputLabel>
        <TextField
          placeholder="Write your sms"
          multiline
          rows={6}
          sx={{
            "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root ": {
              borderRadius: "12px",
            },
          }}
        />
      </Stack>
    </>
  );
}

export default SMSComponent;
