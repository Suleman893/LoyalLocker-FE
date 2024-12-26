import React from "react";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    height: "55px",
    border: "1px solid rgba(189, 189, 189, 1)",
    borderRadius: "15px",
    "&:hover": {
      border: "1px solid rgba(189, 189, 189, 1)",
    },
    outline: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    paddingTop: "10px",
    width: "100%",
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "rgba(11, 121, 116, 1)" : "white",
  }),
  menu: (provided, state) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    background: "white",
  }),
  singleValue: (provided, state) => ({
    ...provided,

    color: "rgba(11, 121, 116, 1)",
    "&:hover": {
      color: "rgba(189, 189, 189, 1)",
    },
  }),
  indicatorSeparator: (provided, state) => ({
    display: "none",
  }),
};

const DropDownField = ({ options, inputWidth, onChange }) => {
  return (
    <Select
      onChange={onChange}
      options={options}
      styles={{
        ...customStyles,
        control: (provided, state) => ({
          ...customStyles.control(provided, state),
          width: inputWidth, 
        }),
      }}
    />
  );
};

export default DropDownField;
