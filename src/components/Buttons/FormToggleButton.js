import React from "react";
import { ToggleButtonDivOne } from "./Button.style";
import { Button } from "./Button";

const FormToggleButton = ({
  setActiveButton,
  activeButton,
  btn1text,
  btn2text,
  toggleView,
}) => {
  const handleButtonClick = (buttonName) => {
    // setActiveButton(buttonName);
    // toggleView()
  };

  return (
    <ToggleButtonDivOne>
      <Button
        cursor="normal"
        text={btn1text || "Create Reward"}
        fontSize="14px"
        width="250px"
        height="40px"
        padding="0px"
        margin="5px"
        borderRadius="10px"
        backgroundColor={
          activeButton === "Create Reward" ? "white" : "rgba(255, 88, 51, 1)"
        }
        color={
          activeButton === "Create Reward" ? "rgba(255, 88, 51, 1)" : "white"
        }
        onClick={() => handleButtonClick("Create Reward")}
      />
      <Button
        cursor="normal"
        text={btn2text || "Create Offer"}
        fontSize="14px"
        width="250px"
        height="40px"
        padding="0px"
        margin="5px"
        borderRadius="10px"
        backgroundColor={
          activeButton === "Create Offer" ? "white" : "rgba(255, 88, 51, 1)"
        }
        color={
          activeButton === "Create Offer" ? "rgba(255, 88, 51, 1)" : "white"
        }
        onClick={() => handleButtonClick("Create Offer")}
      />
    </ToggleButtonDivOne>
  );
};

export default FormToggleButton;
