import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import ButtonInText from './ButtonInText'; 

const InputWithButton = ({
  label,
  placeholder,
  defaultValue,
  id,
  size,
  width,
  value,
  button,
  onFileSelect, 
  onChange,
  addHyphens = false,
  disabled = false,
  ...otherProps
}) => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFileName(file ? file.name : null);
    if (onFileSelect && typeof onFileSelect === "function") {
      onFileSelect(file);
    }
  };

  const handleChange = (e) => {
    let updatedValue = e.target.value;
    if (addHyphens) {
      updatedValue = updatedValue.replace(/-/g, '').trim();
      updatedValue = updatedValue.replace(/(.{3})/g, '$1-');
      updatedValue = updatedValue.replace(/-$/, '');
    }
    if (onChange && typeof onChange === "function") {
      onChange(updatedValue);
    }
  };

  return (
    <div>
      <TextField
        label={label}
        placeholder={placeholder}
        onChange={handleChange}
        id={id}
        size={size}
        value={value}
        defaultValue={defaultValue}
        sx={{ width: "100%" }}
        variant="outlined"
        focused
        disabled={disabled}
        InputLabelProps={{
          shrink: true,
        }}
        {...otherProps}
      />
      <ButtonInText selectedFileName={selectedFileName} onClick={handleButtonClick}>
        {selectedFileName ? "File Selected" : button}
      </ButtonInText>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default InputWithButton;
