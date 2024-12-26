import { useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

export const InputWithButton = ({
  label,
  placeholder,
  defaultValue,
  id,
  size,
  width,
  formik,
  button,
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
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (file && acceptedImageTypes.includes(file.type)) {
      formik.setFieldValue("photoUrl", file);
      setSelectedFileName(file);
    } else {
      toast.error("Only images are supported.", { theme: "colored" });
      setSelectedFileName(null);
    }
  };

  const handleChange = (e) => {
  };
  return (
    <InputCheckboxWrapper width={width}>
      <ButtonInText
        selectedFileName={selectedFileName || formik?.values?.photoUrl}
        onClick={handleButtonClick}
      >
        {selectedFileName || formik?.values?.photoUrl
          ? "Image Selected"
          : button}
      </ButtonInText>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        label={label}
        placeholder="Upload Picture"
        onChange={handleChange}
        id="outlined-basic"
        size="medium"
        value={selectedFileName && selectedFileName?.name}
        style={{
          width: "100%",
          borderRadius: "15px",
          height: "50px",
          border: "1px solid #BDBDBD",
          paddingLeft: "10px",
          background: "white",
        }}
        variant="outlined"
        focused
        {...otherProps}
        disabled={disabled}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </InputCheckboxWrapper>
  );
};

export const ButtonIcon = ({
  position,
  bottom,
  right,
  bgColor,
  icon,
  text,
  width,
  fontSize,
  clickHandler,
  height,
  borderRadius,
  marginLeft,
  border,
  padding,
  color,
  type = "button",
}) => {
  return (
    <IconStyledButton
      position={position}
      bottom={bottom}
      right={right}
      width={width}
      fontSize={fontSize}
      bgColor={bgColor}
      onClick={clickHandler}
      height={height}
      padding={padding}
      borderRadius={borderRadius}
      marginLeft={marginLeft}
      border={border}
      color={color}
      type={type}
    >
      {icon}
      {text}
    </IconStyledButton>
  );
};

const InputCheckboxWrapper = styled.div`
  position: relative;
  width: ${({ width }) => width};
`;
const ButtonInText = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  padding: ${({ selectedFileName }) => (selectedFileName ? "10px" : "0")};
  border: ${({ selectedFileName }) =>
    selectedFileName ? "1px solid rgba(11, 121, 116, 1)" : "none"};
  border-radius: ${({ selectedFileName }) => (selectedFileName ? "10px" : "0")};
  /* color: white;
  background-color: rgba(11, 121, 116, 1); */
`;
const IconStyledButton = styled.button`
  display: flex;
  align-items: center;
  background: ${({ bgColor }) => bgColor || "rgba(11, 121, 116, 1)"};
  border: ${({ border }) => border || "none"};
  border-radius: ${({ borderRadius }) => borderRadius || "10px"};
  padding: ${({ padding }) => padding || "12px 14px 12px 14px"};
  color: ${({ color }) => color || "white"};
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize || "20px"};
  grid-gap: 8px;
  height: ${({ height }) => height || "43px"};
  position: ${({ position }) => position || ""};
  bottom: ${({ bottom }) => bottom || ""};
  right: ${({ right }) => right || ""};
  margin-left: ${({ marginLeft }) => marginLeft || "10px"};
  padding: 10px;
`;
