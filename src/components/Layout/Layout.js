import { useState } from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import Navbar from "./Header";

const Layout = ({ children }) => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat((prev) => !prev);
  };

  return (
    <LayoutContainer>
      <LeftWrapper>
        <Sidebar />
      </LeftWrapper>
      <RightWrapper>
        <Navbar />
      </RightWrapper>
    </LayoutContainer>
  );
};

export default Layout;

export const LayoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
  height: 100vh;
`;

export const LeftWrapper = styled.div`
  width: 14%;
  display: flex;
  height: 100%;
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 40px;
  grid-gap: 20px;
  background: #eff3fd;
  height: 100vh;
  overflow-y: scroll;
  z-index: 1;
`;
