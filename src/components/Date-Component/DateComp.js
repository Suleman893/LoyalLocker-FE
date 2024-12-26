import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import "./style.css";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const DateComp = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  dateSearch,
  setDateSearch,
}) => {
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  const handleStartDateChange = (date) => {
    if (date) {
      const newStartDate = dayjs(date);
      const isValidDate =
        !isNaN(newStartDate.$d) ||
        !isNaN(newStartDate.$y) ||
        !isNaN(newStartDate.$M);
      if (isValidDate) {
        setStartDate(newStartDate);
        setStartDateError(false);
      } else {
        setStartDate(null);
        setStartDateError(true);
      }
    } else {
      setStartDate(null);
      setStartDateError(true);
    }
  };

  const handleEndDateChange = (date) => {
    if (date) {
      const endEndDate = dayjs(date);
      const isValidDate =
        !isNaN(endEndDate.$d) || !isNaN(endEndDate.$y) || !isNaN(endEndDate.$M);
      if (isValidDate) {
        setEndDate(endEndDate);
        setEndDateError(false);
      } else {
        setEndDate(null);
        setEndDateError(true);
      }
    } else {
      setEndDate(null);
      setEndDateError(true);
    }
  };

  return (
    <div
      className="date-container"
    >
      <div
        style={{
          color: "rgba(111, 118, 126, 1)",
          textAlign: "center",
          paddingTop: "35px",
        }}
      >
        Sort By:
      </div>
      <div
        style={{
          width: "300px",
          display: "flex",
          marginLeft: "20px",
          gap: "5px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={[
              "DatePicker",
              "MobileDatePicker",
              "DesktopDatePicker",
              "StaticDatePicker",
            ]}
          >
            <DemoItem label="Start Date">
              <DesktopDatePicker
                variant="standard"
                sx={{
                  "& fieldset": {
                    borderRadius: "15px !important",
                    border: startDateError
                      ? "1px solid red !important"
                      : "1px solid rgba(189, 189, 189, 1)",
                  },
                  "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                    readOnly: true,
                  },
                }}
                value={startDate}
                onChange={handleStartDateChange}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={[
              "DatePicker",
              "MobileDatePicker",
              "DesktopDatePicker",
              "StaticDatePicker",
            ]}
          >
            <DemoItem sx={{ paddingLeft: "20px" }} label="End Date">
              <DesktopDatePicker
                variant="standard"
                sx={{
                  "& fieldset": {
                    borderRadius: "15px !important",
                    border: endDateError
                      ? "1px solid red !important"
                      : "1px solid rgba(189, 189, 189, 1)",
                  },
                }}
                value={endDate}
                onChange={handleEndDateChange}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <button
        style={{
          borderRadius: "10px",
          border: "none",
          width: "52px",
          height: "50px",
          background: "rgba(11, 121, 116, 1)",
          color: "white",
          marginLeft: "10px",
          marginTop: "33px",
          cursor: "pointer",
        }}
        onClick={() => {
          if (startDateError === false && endDateError === false) {
            setDateSearch(!dateSearch);
          }
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(0, 150, 136, 1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(11, 121, 116, 1)";
        }}
      >
        GO
      </button>
    </div>
  );
};

export default DateComp;
