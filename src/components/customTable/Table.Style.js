import styled from "styled-components";

export const PaginationButton = styled.button`
  background: ${({ backgroundColor }) => backgroundColor || "white"};
  text-align: center;
  border: none;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: margin-left;
  cursor: pointer;
  padding: ${({ padding }) => padding || "16px"};
  color: ${({ color }) => color || "#fff"};
  width: 30px;
  height: 40px;
`;
