import React, { useState } from "react";
import SideBar3 from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import { Stack, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import OutlinedPagination from "@mui/material/Pagination";
import "./style.css";
import "./EmailListing.css";
import { Link } from "react-router-dom";

import CampaignTabsButton from "./CampaignTabsButton";
import AddIcon from "@mui/icons-material/Add";

const SMSListing = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar3 />
        <Stack
          sx={{
            width: "100%",
            padding: "0px",
            background: "#FAFAFA",
          }}
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack sx={{ padding: "0px 30px" }}>
            <div className="ptl-main-div">
              <Stack
                sx={{
                  margin: "20px 0px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  gap={2}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  {" "}
                  <div
                    className="ptl-title-design"
                    style={{ marginTop: "0px", marginLeft: "0px" }}
                  ></div>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
                  >
                    Campaigns
                  </Typography>
                </Stack>
                <Link to="/pointTransferForm">
                  <Button
                    startIcon={<AddIcon />}
                    sx={{
                      padding: "8px 16px",
                      height: "40px",
                      background: "#FF5833",
                      color: "#FFFFFF",
                      borderRadius: "12px",
                      textTransform: "none",
                    }}
                  >
                    Add New SMS
                  </Button>
                </Link>
              </Stack>
              <CampaignTabsButton />
              {/* <Table>
                <TableBody>
                  {data.slice(startingRow - 1, endingRow).map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#F5F7FA" : "#ffffff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <TableCell
                          sx={{
                            border: "none",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={dummy_image}
                            alt=""
                            width="53px"
                            height="50px"
                            style={{ borderRadius: "10px" }}
                          />
                          <Typography className="email-template-name">
                            {row.name}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ border: "none", color: "#6F767E" }}
                          className="email-description"
                        >
                          {row.subject}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "none",
                            color: "#6F767E",
                            width: "497px",
                          }}
                          className="email-description"
                        >
                          {row.description}
                        </TableCell>
                      </div>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="pagination">
                <span>
                  Showing {endingRow} from {data?.length} PointTransferDetail
                </span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={handlePreviousClick}
                    style={{
                      width: "30px",
                      height: "40px",
                      borderRadius: "10px",
                      border: "none",
                      marginRight: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: "white",
                      color: "rgba(54, 48, 98, 1)",
                    }}
                  >
                    <img src="./images/Vectoria.png" />
                  </button>
                  <CustomOutlinedPagination
                    shape="rounded"
                    variant="filled"
                    count={Math.ceil(data?.length / rowsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    hideNextButton
                    hidePrevButton
                  />
                  <button
                    onClick={handleNextClick}
                    style={{
                      width: "30px",
                      height: "40px",
                      borderRadius: "34px",
                      border: "none",
                      marginLeft: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: "white",
                      color: "rgba(54, 48, 98, 1)",
                    }}
                  >
                    <img src="./images/Vectori.png" />
                  </button>
                </div>
              </div> */}
              <div className="no-records-found">
                <Typography variant="paragraph">No record found</Typography>
              </div>
            </div>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default SMSListing;
