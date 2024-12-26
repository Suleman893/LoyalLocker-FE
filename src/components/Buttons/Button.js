import React from "react";
import { StyledButton } from "./Button.style";

export const Button = ({
  text,
  height,
  width,
  fontSize,
  backgroundColor,
  alignSelf,
  padding,
  color,
  borderRadius,
  onClick,
  position,
  margin,
  border,
  marginTop,
  isLoading,
  cursor,
  type = "button",
}) => {
  return (
    <StyledButton
      width={width}
      height={height}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      alignSelf={alignSelf}
      padding={padding}
      color={color}
      borderRadius={borderRadius}
      position={position}
      onClick={onClick}
      margin={margin}
      border={border}
      marginTop={marginTop}
      disabled={isLoading}
      type={type}
      cursor={cursor}
    >
      {text}
    </StyledButton>
  );
};
