import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Stack, Typography, MenuItem } from "@mui/material";
import { Menu, SubMenu } from "react-pro-sidebar";
import dashboardIcon from "../../assets/sidebar-icons/d-icon.png";
import companyIcon from "../../assets/sidebar-icons/comp-icon.png";
import findIcon from "../../assets/sidebar-icons/f-icon.png";
import point from "../../assets/Admin images/point.png";
import frnd from "../../assets/sidebar-icons/frnd.png";
import faq from "../../assets/sidebar-icons/faq.png";
import logout from "../../assets/Admin images/logout.png";
import logo from "../../assets/logo.png";
import crossIcon from "../../assets/responsive-cross-icon.png";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/auth/authSlice";
import { reset as consumerReset } from "../../redux/consumer/consumerSlice";
import { toggleSidebar } from "../../redux/consumer/consumerSlice"; 
import "./SideBar2.css";

function SideBar2() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  // const handleMenuItemClick = () => {
  //   // Collapse the sidebar when a menu item is clicked
  //   setCollapsed(!collapsed);
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openSidebar = useSelector((state) => state.consumer.openSidebar);

  const handleLogout = async () => {
    navigate("/");
    dispatch(reset());
    dispatch(consumerReset());
  };

  const handleClose = async () => {
    dispatch(toggleSidebar());
  }

  const menuItems = [
    {
      label: "Dashboard",
      endpoint: "/consumer_dashboard",
      icon: dashboardIcon,
    },
    {
      label: "My Transactions",
      endpoint: "/consumer_transactions",
      icon: findIcon,
    },
    { label: "My Points", endpoint: "/my_points", icon: point },
    // {
    //   label: "Get Rewards",
    //    to:"/loyalty_reward" ,
    //   icon: pointTransferIcon,
    //   subMenuItems: [
    //     { label: "Get Rewards", endpoint: "/loyalty_reward", icon: pointTransferIcon },
    //     { label: "Levels", endpoint: "/levels", icon: null },
    //     {
    //       label: "Available Rewards",
    //       endpoint: "/available_reward",
    //       icon: null,
    //     },
    //     {
    //       label: "How to Earn points",
    //       endpoint: "/earn_more_points",
    //       icon: null,
    //     },
    //     { label: "Activity History", endpoint: "/active_history", icon: null },
    //   ],
    // },
    {
      label: "Offers & Super Sale",
      endpoint: "/sale_listing",
      icon: companyIcon,
    },
    { label: "Invite Friend", endpoint: "/friends", icon: frnd },
    { label: "FAQ", endpoint: "/faq", icon: faq },
    { label: "Logout", endpoint: "/", icon: logout },
  ];

  return (
    <Stack className={`${openSidebar ? "sidebar-2-toggle" : "sidebar-2"}`}>
      <div
        className="sidebar-2-header"
        style={{ height: "86px", border: "none" }}
      >
        <img
          style={{
            width: "130px",
            height: "45px",
            marginTop: "20px",
            marginLeft: "30px",
          }}
          src={logo}
          alt=""
        />
      </div>
      <Stack
        className={`${
          openSidebar ? "sidebar-2-items-toggle" : "sidebar-2-items"
        }`}
        sx={{ height: "100%", backgroundColor: "#0B7974", border: "none" }}
        collapsed={collapsed}
      >
        <Menu
          className={`${openSidebar ? "menu-items-toggle" : ""}`}
          style={{
            paddingTop: "30px ",
            color: "white",
            "&:hover": { backgroundColor: "green" },
          }}
        >
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center',paddingBottom:'30px'}}>
            <img onClick={handleClose} className="responsive-cross-icon" src={crossIcon} alt="" />
          </div>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              className={
                location.pathname === item.endpoint ? "active-link" : ""
              }
              style={{
                height: "50px",
                backgroundColor:
                  location.pathname === item.endpoint
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
              }}
            >
              {item.subMenuItems ? (
                <SubMenu
                  key={index}
                  label={item.label}
                  icon={
                    <img
                      src={item.icon}
                      alt={item.label}
                      style={{ width: "20px", height: "20px", color: "white" }}
                    />
                  }
                  sx={{
                    "&:hover": { backgroundColor: "green" },
                    paddingRight: "10px",
                  }}
                >
                  {item.subMenuItems.map((subItem, subIndex) => (
                    <MenuItem key={subIndex} style={{ background: "#0B7974" }}>
                      <Link
                        to={subItem.endpoint}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          ":hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                          ":active": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                        }}
                      >
                        {subItem.label}
                      </Link>
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <div
                  onClick={() =>
                    item.label === "Logout"
                      ? handleLogout()
                      : navigate(item.endpoint)
                  }
                  style={{
                    textDecoration: "none",
                    ":hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    ":active": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                  // onClick={() => setCollapsed(!collapsed)}
                >
                  <Stack sx={{ display: "flex", flexDirection: "row" }}>
                    {item.icon !== null && (
                      <img
                        src={item.icon}
                        alt={item.label}
                        style={{ width: "20px", height: "20px" }}
                      />
                    )}
                    <Stack>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          paddingLeft: "20px",
                        }}
                        onClick={() => setCollapsed(!collapsed)}
                      >
                        {item.label}
                      </Typography>
                    </Stack>
                  </Stack>
                </div>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Stack>
  );
}

export default SideBar2;
