import React, { useState } from "react";
import { Stack } from "@mui/system";

const TextFieldComp = ({
  label,
  backgroundColor,
  type = "string",
  placeholder,
  width,
  stackStyle,
  name,
  value,
  height,
  paddingLeft,
  showButton = false,
  disabled,
  text,
  onClick,
  onChange,
  min,
  max,
  format,
  defaultValue,
}) => {
  const [buttonVisible, setButtonVisible] = useState(true);

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
              borderRadius: "15px",
              border: "1px solid #BDBDBD",
              backgroundColor: { backgroundColor },
              outline: "none",
              boxSizing:'border-box',
              padding:'0px 10px',
              marginTop: "10px",
            }}
            type={type}
            name={name}
            value={value}
            height={height}
            onChange={onChange}
            disabled={disabled}
            min={min}
            max={max}
            format={format}
            defaultValue={defaultValue}
          />
          {showButton && buttonVisible && (
            <button
              style={{
                position: "absolute",
                top: "60%",
                right: "10px",
                transform: "translateY(-50%)",
                padding: "5px 10px",
                borderRadius: "5px",
                backgroundColor: "#0B7974",
                color: "white",
                cursor: "pointer",
                border: "none",
                height: "30px",
              }}
              onClick={onClick}
              type="button"
            >
              {text}
            </button>
          )}
        </div>
      </Stack>
    </>
  );
};

export default TextFieldComp;
