import styled from "styled-components";

export const SearchWrapper = styled.div`
  position: relative;
  /* width: 100%; */
  // margin-right: 70px;
`;

export const Input = styled.input`
  width: 100%;
  background: #fff;
  border-radius: 5px;
  border: none;
  padding: 10px 10px 10px 40px;
  box-sizing:border-box;
  outline: none;
  color: #aeb6cf;
  font-size: 14px;
  font-weight: 400;
  margin-top: 40px;
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 10px;
  top: 70%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
`;
