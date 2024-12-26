import { useLocation } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Menu, MenuItem } from "react-pro-sidebar";
import dashboardIcon from "../../assets/sidebar-icons/d-icon.png";
import consumerIcon from "../../assets/sidebar-icons/c-icon.png";
import companyIcon from "../../assets/sidebar-icons/comp-icon.png";
import findIcon from "../../assets/sidebar-icons/f-icon.png";
import deIcon from "../../assets/sidebar-icons/de-icon.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import rule from "../../assets/Admin images/MdRule.png";
import point from "../../assets/Admin images/point.png";
import logout from "../../assets/Admin images/logout.png";
import "./style.css";
import logo from "../../assets/logo.png";
import { reset } from "../../redux/auth/authSlice";
import { reset as adminReset } from "../../redux/admin/adminSlice";

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    navigate("/admin_login");
    dispatch(reset());
    dispatch(adminReset());
  };

  const menuItems = [
    { label: "Dashboard", endpoint: "/admin_dashboard", icon: dashboardIcon },
    // { label: "Stores", endpoint: "/stores", icon: storeIcon },
    {
      label: "Members",
      endpoint: "/admin_members",
      icon: consumerIcon,
      style: { opacity: "100%" },
    },
    {
      label: "Points transfers",
      endpoint: "/admin_transfers",
      icon: point,
    },
    { label: "Companies", endpoint: "/all_companies", icon: companyIcon },
    {
      label: "Find transaction",
      endpoint: "/transaction_listing",
      icon: findIcon,
    },
    { label: "Rule Types", endpoint: "/admin_ruletypes", icon: rule },
    {
      label: "Default earning rules",
      endpoint: "/default_rules",
      icon: deIcon,
    },
    // { label: "Campaigns", endpoint: "/campaigns" ,  icon: null },
    { label: "Logout", endpoint: "/admin_login", icon: logout },
  ];
  const location = useLocation();
  return (
    <>
      <Stack>
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
          // collapsed={collapsed}
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
                    onClick={() =>
                      item.label === "Logout"
                        ? handleLogout()
                        : navigate(item.endpoint)
                    }
                    className="ps-menu-button"
                    style={{
                      textDecoration: "none",
                      fontSize: "16px",
                      paddingLeft: "20px",
                      color: "white",
                      fontWeight:
                        location.pathname === item.endpoint ? 700 : "normal",
                    }}
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
