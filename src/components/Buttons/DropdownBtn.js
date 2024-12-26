import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./style.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const redTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: "#09D8C4",
          },
          "&:after": {
            borderBottomColor: "#09D8C4",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "#09D8C4",
          },
        },
      },
    },
  },
});

const DropdownBtn = () => {
  return (
    <div>
      <ThemeProvider theme={redTheme}>
        <Autocomplete
          style={{ width: "350px" }}
          id="disable-close-on-select"
          disableCloseOnSelect
          options={["Option 1", "Option 2", "Option 3"]}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label="All" variant="standard" />
          )}
          classes={{
            popupIndicator: "red-dropdown-button",
            inputRoot: "#09D8C4",
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default DropdownBtn;
