import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import SideBar from "../../../components/Layout/SideBar";
import Header from "../../../components/Layout/Header";
import Footer from "../../../components/Footer";
import { createTheme } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

const redTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: "#09D8C4",
          },
          "&:after": {
            borderBottomColor: "#09D8C4",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "#09D8C4",
          },
        },
      },
    },
  },
});
const AddEvent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showDataGrid, setShowDataGrid] = useState(false);
  const toggleDataGrid = () => {
    setShowDataGrid(!showDataGrid);
  };
  const listingHeight = showDataGrid ? "420px" : "auto";

  return (
    <>
      <div>
        <div style={{ display: "flex" }}>
          <SideBar />
          <Stack sx={{ width: "100%", padding: "0px", background: "#FAFAFA" }}>
            <Header setCollapsed={setCollapsed} collapsed={collapsed} />
            <Stack sx={{ padding: "0px 30px" }}>
              <p
                className="add-event-title"
                style={{
                  fontSize: "43px",
                  color: "#1F074F",
                  fontFamily: "Roboto, Medium",
                  fontWeight: "700",
                  marginLeft: "590px",
                }}
              >
                Add New Event
              </p>
              <div style={{ display: "flex" }}>
                <TextField
                  id="standard-basic"
                  label="Display Name *"
                  variant="standard"
                  className="ae-textfield"
                />
                <TextField
                  id="standard-basic"
                  label="Event Name *"
                  variant="standard"
                  className="ae-textfield1"
                />
              </div>
              <TextField
                id="standard-basic"
                label="Description"
                variant="standard"
                className="ae-textfield-desc"
              />
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#2222224D",
                    paddingLeft: "200px",
                    paddingRight: "20px",
                  }}
                >
                  Trigger all Campaigns
                </p>
                <FormControlLabel
                  value="female"
                  size="small"
                  control={<Radio />}
                  label="No"
                />
                <FormControlLabel
                  value="male"
                  size="small"
                  control={<Radio />}
                  label="Yes"
                />
              </div>
              <div
                className="event"
                style={{
                  height: listingHeight,
                  transition: "height 0.3s ease-in-out",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      marginTop: "15px",
                      marginLeft: "20px",
                      fontWeight: "500",
                      color: "#1F074F",
                      fontSize: "18px",
                      fontFamily: "Roboto-Medium",
                    }}
                  >
                    Rule Name
                  </div>
                  <button
                    style={{
                      backgroundColor: "#FAFAFA",
                      border: "none",
                      marginTop: "15px",
                      marginRight: "30PX",
                      marginBottom: "10PX",
                    }}
                    onClick={toggleDataGrid}
                  >
                    <ArrowDropDownIcon />
                  </button>
                </div>
                {showDataGrid && (
                  <>
                    <div
                      style={{
                        width: "700px",
                        height: "44px",
                        background: "#FFF9D9",
                        color: "#22222299",
                        marginLeft: "20px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "14px",
                          paddingTop: "10px",
                          paddingLeft: "10px",
                        }}
                      >
                        Publishing an event will create a new event on the user
                        and may trigger campaigns associated with this event.
                      </p>
                    </div>

                    <div
                      style={{
                        fontSize: "23px",
                        color: "#22222299",
                        fontWeight: "500",
                        paddingLeft: "20px",
                        paddingTop: "10px",
                      }}
                    >
                      Publish Event
                    </div>
                    <div style={{ display: "flex" }}>
                      <TextField
                        id="standard-basic"
                        label="Key"
                        variant="standard"
                        style={{
                          width: "350px",
                          marginLeft: "20px",
                          fontSize: "10px",
                          marginTop: "20px",
                        }}
                      />
                      <TextField
                        id="standard-basic"
                        label="Value"
                        variant="standard"
                        style={{
                          width: "350px",
                          marginLeft: "20px",
                          fontSize: "10px",
                          marginTop: "20px",
                        }}
                      />
                      <div>
                        <img
                          style={{
                            width: "584px",
                            height: "115px",
                            marginLeft: "10px",
                          }}
                          src=""
                          alt=""
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <button
                        style={{
                          width: "33px",
                          height: "33px",
                          background: "#09D8C4",
                          fontSize: "20px",
                          color: "white",
                          border: "none",
                          marginLeft: "20px",
                        }}
                      >
                        +
                      </button>
                      <p
                        style={{
                          color: "#22222299",
                          fontSize: "14px",
                          paddingLeft: "10px",
                        }}
                      >
                        Add Attribute
                      </p>
                    </div>
                    <button
                      style={{
                        width: "156px",
                        height: "42px",
                        borderRadius: "5px",
                        fontSize: "18px",
                        background: "#1F074F",
                        color: "#09D8C4",
                        marginTop: "10px",
                        marginLeft: "20px",
                      }}
                    >
                      Publish
                    </button>
                  </>
                )}
              </div>

              <div style={{ display: "flex" }}>
                <button
                  style={{
                    width: "156px",
                    height: "42px",
                    border: "1px solid #09D8C4",
                    borderRadius: "5px",
                    fontSize: "18px",
                    background: "none",
                    marginTop: "140px",
                    marginLeft: "1050px",
                    color: "#09D8C4",
                    marginBottom: "20px",
                  }}
                >
                  cancel
                </button>
                <button
                  style={{
                    width: "156px",
                    height: "42px",
                    borderRadius: "5px",
                    fontSize: "18px",
                    background: "#1F074F",
                    color: "#09D8C4",
                    marginTop: "140px",
                    marginLeft: "20px",
                    marginBottom: "20px",
                  }}
                >
                  save
                </button>
              </div>
            </Stack>
          </Stack>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddEvent;
