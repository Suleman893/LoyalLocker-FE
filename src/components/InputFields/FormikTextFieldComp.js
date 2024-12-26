import React, { useState } from "react";
import { Stack } from "@mui/system";

const FormikTextFieldComp = ({
  label,
  backgroundColor,
  type,
  placeholder,
  width,
  stackStyle,
  name,
  value,
  onChange,
  height,
  paddingLeft,
  showButton = false,
  disabled,
}) => {
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleButtonClick = () => {
    setButtonVisible(!buttonVisible);
  };

  return (
    <>
      <Stack sx={{ ...stackStyle }}>
        <label style={{ fontSize: "14px", color: "black", fontWeight: "500" }}>
          {label}
        </label>
        <div style={{ position: "relative" }}>
          <input
            placeholder={placeholder}
            style={{
              fontSize: "14px",
              color: "#0B7974",
              width: width,
              height: "55px",
              borderRadius: "5px",
              border: "1px solid #BDBDBD",
              backgroundColor: { backgroundColor },
              outline: "none",
              marginTop: "10px",
            }}
            type={type}
            name={name}
            value={value}
            height={height}
            onChange={onChange}
            disabled={disabled}
          />
          {showButton && buttonVisible && (
            <button
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                padding: "5px 10px",
                borderRadius: "5px",
                backgroundColor: "#0B7974",
                color: "white",
                cursor: "pointer",
                border: "none",
              }}
              onClick={handleButtonClick}
            >
              Browser Photo
            </button>
          )}
        </div>
      </Stack>
    </>
  );
};

export default FormikTextFieldComp;
