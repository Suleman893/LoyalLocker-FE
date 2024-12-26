import styled from "styled-components";

export const StyledButton = styled.button`
  cursor: ${({ cursor }) => cursor || "pointer"};
  background: ${({ backgroundColor }) => backgroundColor || "#00adef"};
  text-align: center;
  border: ${({ border }) => border || "none"};
  border-radius: ${({ borderRadius }) => borderRadius || "16px"};
  padding: ${({ padding }) => padding || "16px"};
  color: ${({ color }) => color || "#fff"};
  width: ${({ width }) => width || "100%"};
  font-size: ${({ fontSize }) => fontSize || "20px"};
  align-self: ${({ alignSelf }) => alignSelf || "flex-start"};
  position: ${({ position }) => position || ""};
  margin: ${({ margin }) => margin || ""};
  height: ${({ height }) => height || ""};
  margin-top: ${({ marginTop }) => marginTop || ""};
  padding: 5px;
`;

export const IconStyledButton = styled.button`
  display: flex;
  align-items: center;
  background: ${({ bgColor }) => bgColor || "#00adef"};
  border: ${({ border }) => border || "none"};
  border-radius: ${({ borderRadius }) => borderRadius || "10px"};
  padding: ${({ padding }) => padding || "12px 14px 12px 14px"};
  color: ${({ color }) => color || "white"};
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize || "20px"};
  grid-gap: 8px;
  height: ${({ height }) => height};
  position: ${({ position }) => position || ""};
  bottom: ${({ bottom }) => bottom || ""};
  right: ${({ right }) => right || ""};
  margin-left: ${({ marginLeft }) => marginLeft || "10px"};
  padding: 10px;
`;

export const UploadPdfButton = styled.button`
  display: flex;
  grid-gap: 20px;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  border: 0.5px solid #000000;
  padding: 2px 10px;
`;

export const UploadPdfLeft = styled.div`
  display: flex;
  grid-gap: 5px;
  align-items: center;
`;

export const UploadPdfRight = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  padding: 5px;
`;

export const TextSec = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ToggleButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;
  border-radius: 10px;
  background: rgba(11, 121, 116, 1);
  align-items: center;
  height: 50px;
  cursor: pointer !important;
`;

export const ToggleButtonDivOne = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;
  border-radius: 10px;
  background: rgba(255, 88, 51, 1);
  align-items: center;
  height: 50px;
  margin: 20px;
`;
