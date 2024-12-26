import React, { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
var TimeFormat = require("hh-mm-ss");

function DelayComponent({ setSelectedDelay }) {
  const [hour, setHour] = useState(0);
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [mins, setMins] = useState(0);
  // const [sec, setSec] = useState(0);
  // const [secs, setSecs] = useState(0);

  const handleSave = () => {
    if (min > 5 && mins > 0) {
      return toast.info("Invalid minute format ", {
        theme: "colored",
      });
    }
    // if (sec > 5 && secs > 0) {
    //   return toast.info("Invalid second format ", {
    //     theme: "colored",
    //   });
    // }
    // const formatted = `${hour}${hours}:${min}${mins}:${sec}${secs}`;
    const formatted = `${hour}${hours}:${min}${mins}:00`;
    const miliSecond = TimeFormat.toMs(formatted);
    setSelectedDelay(miliSecond);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gridGap: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItem: "center",
          margin: "20px 0px",
        }}
      >
        <div style={{ display: "flex", gridGap: "10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ marginBottom: "5px", fontWeight: "bold" }}>H</span>

            <TextField
              type="number"
              inputProps={{ min: 0, max: 9 }}
              value={hour}
              onChange={(e) => {
                if (!/^[0-9]?$/.test(e.target.value)) {
                  return toast.info("Only 0-9 allowed ", { theme: "colored" });
                }
                setHour(e.target.value);
              }}
            />
            {/* <span>hh</span> */}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ marginBottom: "5px", fontWeight: "bold" }}>H</span>

            <TextField
              type="number"
              inputProps={{ min: 0, max: 9 }}
              value={hours}
              onChange={(e) => {
                if (!/^[0-9]?$/.test(e.target.value)) {
                  return toast.info("Only 0-9 allowed ", { theme: "colored" });
                }
                setHours(e.target.value);
              }}
            />
            {/* <span>hh</span> */}
          </div>
        </div>

        <div style={{ display: "flex", gridGap: "10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ marginBottom: "5px", fontWeight: "bold" }}>M</span>

            <TextField
              type="number"
              inputProps={{ min: 0, max: 6 }}
              value={min}
              onChange={(e) => {
                if (!/^[0-6]?$/.test(e.target.value)) {
                  return toast.info("Only 0-6 allowed ", { theme: "colored" });
                }

                setMin(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ marginBottom: "5px", fontWeight: "bold" }}>M</span>

            <TextField
              type="number"
              inputProps={{ min: 0, max: 9 }}
              value={mins}
              onChange={(e) => {
                if (!/^[0-9]?$/.test(e.target.value)) {
                  return toast.info("Only 0-9 allowed ", { theme: "colored" });
                }
                setMins(e.target.value);
              }}
            />
          </div>
        </div>

        {/* <div>
            <TextField
              type="number"
              inputProps={{ min: 0, max: 6 }}
              value={sec}
              onChange={(e) => {
                if (!/^[0-6]?$/.test(e.target.value)) {
                  return toast.info("Only 0-6 allowed ", { theme: "colored" });
                }
                setSec(e.target.value);
              }}
            />
            <TextField
              type="number"
              inputProps={{ min: 0, max: 9 }}
              value={secs}
              onChange={(e) => {
                if (!/^[0-9]?$/.test(e.target.value)) {
                  return toast.info("Only 0-9 allowed ", { theme: "colored" });
                }
                setSecs(e.target.value);
              }}
            />
          </div> */}
      </div>
   
      <Button
        onClick={handleSave}
        sx={{
          margin: "10px auto",
          border: "1px solid #0B7974",
          borderRadius: "10px",
          width: "25%",
          textTransform: "none",
          padding: "10px 30px",
          background: "#0B7974",
          color: "white",
          "&:hover": {
            cursor: "pointer",
            background: "#0B7974",
          },
        }}
      >
        Save time
      </Button>
    </div>
  );
}

export default DelayComponent;
