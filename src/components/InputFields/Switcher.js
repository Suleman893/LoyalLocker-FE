import React from "react";
import {
  Button as SimpleButton,
  Switch,
  FormControlLabel,
} from "@mui/material";

function Switcher({ checked, onChange, label }) {
  return (
    <>
      <FormControlLabel
        control={<Switch checked={checked} onChange={onChange} />}
        label="Remember me"
        name="modalSwitch"
        sx={{
          "& .MuiSwitch-thumb": {
            bgcolor: "#09D8C4", 
          },
        }}
      />
    </>
  );
}

export default Switcher;
