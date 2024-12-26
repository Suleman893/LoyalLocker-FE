// // Header.jsx

// import React from 'react';
// import { Stack, Box, Avatar } from '@mui/material';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import Input from "../InputFields/Input";

// function Header({ setCollapsed, collapsed }) {
//   return (
//     <>
//       <Stack sx={{ height: '100px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #F0F0F0', background: '#FFFFFF', padding: '0px 30px' ,border:'none'}}>
//         {/* <Stack gap={6} sx={{ display: 'flex', flexDirection: 'row' }}>
//           <Box sx={{ paddingTop: '20px' }}>
//             <RxHamburgerMenu style={{ fontSize: '24px', color: '#09D8C4' }} onClick={() => setCollapsed(!collapsed)} />
//           </Box>
//           <Input id="standard-basic" label="Search" type="text" />
//         </Stack>*/}
//         <Stack sx={{marginLeft:"1550px"}} >
//           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//         </Stack>
//       </Stack>
//     </>
//   );
// }

// export default Header;
// Header.jsx

import React, { useState } from "react";
import {
  Stack,
  Avatar,
  MenuItem,
  ListItemIcon,
  Menu,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";
import vector from "../../assets/Admin images/Vector.png";
import Ellipse6 from "../../assets/Ellipse6.png";
import lock from "../../assets/Admin images/Lock.png";
import profile from "../../assets/Admin images/Profile.png";
import responsiveMenu from "../../assets/responsive-menu.png";
import logo from "../../assets/logo.png";
import "./style.css";
import { toggleSidebar } from "../../redux/consumer/consumerSlice"; 

function Header({ setCollapsed, collapsed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const openSidebar = useSelector((state) => state.consumer.openSidebar);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    navigate("/profile_update");
    setAnchorEl(null);
  };

  const goToSetting = () => {
    navigate("/settings");
    setAnchorEl(null);
  };

  const goToLogout = async () => {
    navigate("/update_password");
  };

  const handleMenuClick = async () => {
    dispatch(toggleSidebar());
  }
  return (
    <>
      <Stack
        className="web-header-section"
        sx={{
          height: "80px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          borderBottom: "2px solid #F0F0F0",
          background: "#FFFFFF",
          padding: "0px 30px",
          border: "none",
        }}
      >
        <Stack>
          <Avatar
            style={{ marginRight: "40px" }}
            alt="User"
            src={userInfo?.photoUrl || Ellipse6}
            // onClick={() => {
            //   if (userInfo?.role === "ROLE_ADMIN") {
            //     navigate("/company_profile");
            //   } else if (userInfo?.role === "ROLE_MERCHANT") {
            //     navigate("/company_profile");
            //   }
            // }}
          />
        </Stack>
        <img
          src={vector}
          alt="vector"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            style: {
              backgroundColor: "#FAFAFA",
              borderRadius: "10px",
            },
          }}
        >
          <MenuItem onClick={goToProfile}>
            <ListItemIcon>
              <img src={profile} alt="vector" />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: "black",
              }}
            >
              My Profile
            </ListItemText>
          </MenuItem>
          {/* <MenuItem onClick={goToSetting}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
              Setting
            </ListItemText>
          </MenuItem> */}
          <MenuItem onClick={goToLogout}>
            <ListItemIcon>
              <img src={lock} alt="vector" />
            </ListItemIcon>
            <ListItemText sx={{ color: "black" }}>Change Password</ListItemText>
          </MenuItem>
        </Menu>
      </Stack>
      <Stack
        className={`${openSidebar ? 'mobile-header-section-toggle' : 'mobile-header-section'}`}
        sx={{
          height: "80px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "2px solid #F0F0F0",
          background: "#FFFFFF",
          padding: "0px 30px",
          border: "none",
        }}
      >
        <Stack>
          <img
            style={{
              width: "130px",
              height: "45px",
            }}
            src={logo}
            alt=""
          />
        </Stack>
        <Stack>
          <img
            src={responsiveMenu}
            onClick={handleMenuClick}
            alt="vector"
            style={{
              cursor: "pointer",
              width: "24px",
              height: "24px",
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default Header;
