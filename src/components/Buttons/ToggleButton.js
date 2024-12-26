import React from "react";
import { ToggleButtonDiv } from "./Button.style";
import { Button } from "./Button";

const ToggleButton = ({
  setActiveButton,
  activeButton,
  btn1text,
  btn2text,
}) => {
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <ToggleButtonDiv>
      <Button
        text={btn1text || "Reward List"}
        fontSize="14px"
        width="250px"
        height="40px"
        padding="0px"
        margin="5px"
        borderRadius="10px"
        cursor="pointer"
        backgroundColor={
          activeButton === "Reward" ? "white" : "rgba(11, 121, 116, 1)"
        }
        color={activeButton === "Reward" ? "rgba(11, 121, 116, 1)" : "white"}
        onClick={() => handleButtonClick("Reward")}
      />
      <Button
        text={btn2text || "Offer List"}
        fontSize="14px"
        width="250px"
        height="40px"
        padding="0px"
        margin="5px"
        borderRadius="10px"
        cursor="pointer"
        backgroundColor={
          activeButton === "Offer" ? "white" : "rgba(11, 121, 116, 1)"
        }
        color={activeButton === "Offer" ? "rgba(11, 121, 116, 1)" : "white"}
        onClick={() => handleButtonClick("Offer")}
      />
    </ToggleButtonDiv>
  );
};

export default ToggleButton;
