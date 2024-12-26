import React, { useRef, useState } from "react";
import {
  Stack,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function EmailDeployment({
  setFieldValue,
  values,
  accountInfo,
  sendNow,
  setSendNow,
  errors,
  touched,
}) {
  const currentDateTime = dayjs();
  const latestDate = useRef(null);

  return (
    <>
      <Stack
        sx={{
          margin: "30px 0px",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
        >
          Deployment
        </Typography>
      </Stack>
      <Stack
        gap={2}
        sx={{ marginTop: "20px", flexDirection: "row", alignItems: "center" }}
      >
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="deployment"
            name="deployment-radio-buttons-group"
            value={sendNow}
            onChange={(e) => {
              const value = e.target.value;
              setSendNow(value);
              setFieldValue(
                "scheduleTime",
                value === "now" ? null : latestDate.current
              );
            }}
          >
            <FormControlLabel
              value="now"
              control={<Radio />}
              label={
                <span
                  style={{
                    fontSize: "14px",
                    color: sendNow === "now" ? "#0B7974" : "#828282",
                  }}
                >
                  Send Now
                </span>
              }
            />
            <FormControlLabel
              value="later"
              control={<Radio />}
              label={
                <span
                  style={{
                    fontSize: "14px",
                    color: sendNow === "later" ? "#0B7974" : "#828282",
                  }}
                >
                  Schedule Later
                </span>
              }
            />
          </RadioGroup>
          {sendNow === "later" && accountInfo == "monthly" && (
            <Stack sx={{ marginTop: "20px" }} style={{ width: "500px" }}>
              <input
                style={{
                  border: "1px solid gray",
                  padding: "15px",
                }}
                type="datetime-local"
                value={
                  values?.scheduleTime
                    ? dayjs(values?.scheduleTime).toDate()
                    : null
                }
                onChange={(e) => {
                  const date = dayjs(e.target.value);
                  if (!date.isValid()) {
                    return toast.info("Invalid date", {
                      theme: "colored",
                    });
                  }
                  const formattedDate = date.toISOString();
                  latestDate.current = formattedDate;
                  setFieldValue("scheduleTime", formattedDate);
                }}
                min={dayjs(currentDateTime).format("YYYY-MM-DDTHH:mm")}
              />
            </Stack>
          )}
        </FormControl>
      </Stack>
    </>
  );
}

export default EmailDeployment;
