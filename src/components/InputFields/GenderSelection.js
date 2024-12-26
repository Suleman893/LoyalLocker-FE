import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./style.css";

const GenderSelection = ({ onChange, value }) => {
  return (
    <div style={{ display: "flex" }}>
      <RadioGroup
        sx={{color: "#0B7974", fontWeight: "700" }}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="gender"
        value={value}
        onChange={onChange}
      >
        <p style={{paddingRight: "30px" }}>Gender</p>
        <FormControlLabel
          value="F"
          control={
            <Radio
              sx={{
                color: "#0B7974",
                "&.Mui-checked": {
                  color: "#0B7974",
                },
              }}
            />
          }
          label="Female"
        />
        <FormControlLabel
          value="M"
          control={
            <Radio
              sx={{
                color: "#0B7974",
                "&.Mui-checked": {
                  color: "#0B7974",
                },
              }}
            />
          }
          label="Male"
        />
        <FormControlLabel
          value="U"
          control={
            <Radio
              sx={{
                color: "#0B7974",
                "&.Mui-checked": {
                  color: "#0B7974",
                },
              }}
            />
          }
          label="Other"
        />
      </RadioGroup>
    </div>
  );
};

export default GenderSelection;
