import React from "react";
import "./style.css";

const ReactStepper = ({ activeStep, handleStepClick, width }) => {
  return (
    <div className="stepper-container">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
        <div
          style={{ width: width }}
          key={step}
          className={`step ${activeStep >= step ? "active" : ""}`}
          onClick={() => handleStepClick(step)}
        />
      ))}
    </div>
  );
};

export default ReactStepper;
