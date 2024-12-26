import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Menu, MenuItem } from "react-pro-sidebar";
import dashboardIcon from "../../assets/sidebar-icons/d-icon.png";
import consumerIcon from "../../assets/sidebar-icons/c-icon.png";
import findIcon from "../../assets/sidebar-icons/f-icon.png";
import deIcon from "../../assets/sidebar-icons/de-icon.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import point from "../../assets/Admin images/point.png";
import logout from "../../assets/Admin images/logout.png";
import "./style.css";
import cint from "../../assets/sidebar-icons/c-int.png";
import reward from "../../assets/sidebar-icons/c-reward.png";
import camp from "../../assets/sidebar-icons/c-camp.png";
import light from "../../assets/sidebar-icons/light.png";
import icon from "../../assets/sidebar-icons/Icon.png";
import logo from "../../assets/logo.png";
import { reset } from "../../redux/auth/authSlice";
import { reset as companyReset } from "../../redux/company/companySlice";

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    navigate("/");
    dispatch(reset());
    dispatch(companyReset())
  };

  const menuItems = [
    { label: "Dashboard", endpoint: "/company_dashboard", icon: dashboardIcon },
    { label: "Store", endpoint: "/company_stores", icon: light },
    {
      label: "Members",
      endpoint: "/company_members",
      icon: consumerIcon,
      style: { opacity: "100%" },
    },
    { label: "Products", endpoint: "/company_products", icon: icon },
    {
      label: "Points transfers",
      endpoint: "/company_transfers",
      icon: point,
    },
    {
      label: "Find transaction",
      endpoint: "/company_transactions",
      icon: findIcon,
    },
    { label: "Earning Rules", endpoint: "/company_rules", icon: deIcon },
    { label: "Campaigns", endpoint: "/campaigns", icon: camp },

    { label: "Integrations", endpoint: "/integrations", icon: cint },
    {
      label: "Reward & Offers",
      endpoint: "/reward_offer",
      icon: reward,
    },
    { label: "Logout", endpoint: "/", icon: logout },
  ];
  const location = useLocation();
  return (
    <>
      <Stack className="sidebar-3">
        <div style={{ height: "86px", border: "none" }}>
          <img
            style={{
              width: "130px",
              height: "45px",
              marginTop: "20px",
              marginLeft: "30px",
            }}
            src={logo}
            alt=""
          />{" "}
        </div>
        <Stack
          sx={{ height: "100%", backgroundColor: "#0B7974", border: "none" }}
          collapsed={collapsed}
        >
          <Menu style={{ paddingTop: "50px " }}>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                className={
                  location.pathname === item.endpoint ? "active-link" : ""
                }
                style={{
                  backgroundColor:
                    location.pathname === item.endpoint
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {item.icon !== null && (
                    <img
                      src={item.icon}
                      alt={item.label}
                      style={{ width: "20px", height: "20px", opacity: 1 }}
                    />
                  )}
                  <div
                    to={item.endpoint}
                    className="ps-menu-button"
                    style={{
                      textDecoration: "none",
                      fontSize: "16px",
                      paddingLeft: "20px",
                      color: "white",
                      fontWeight:
                        location.pathname === item.endpoint ? 700 : "normal",
                    }}
                    onClick={() =>
                      item.label === "Logout"
                        ? handleLogout()
                        : navigate(item.endpoint)
                    }
                    // onClick={() => setCollapsed(!collapsed)}
                  >
                    <Stack>
                      <Typography>{item.label}</Typography>
                    </Stack>
                  </div>
                </Stack>
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Stack>
    </>
  );
}

export default SideBar;
