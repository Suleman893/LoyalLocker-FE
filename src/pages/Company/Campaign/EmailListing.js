import React, { useState } from "react";
import SideBar3 from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import { Stack, Grid, Button, Typography } from "@mui/material";
import edit from "../../../assets/Company images/email-edit.png";
import { styled } from "@mui/material/styles";
import OutlinedPagination from "@mui/material/Pagination";
import "./style.css";
import "./EmailListing.css";
import { Link, useNavigate } from "react-router-dom";
import { Table, TableRow, TableCell, TableBody } from "@mui/material";
import CampaignTabsButton from "./CampaignTabsButton";
import { useDispatch, useSelector } from "react-redux";
import { allEmailTemplates } from "../../../redux/company/companyThunks";
import { useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import AddIcon from "@mui/icons-material/Add";
import ContentPreviewModal from "./modals/ContentPreviewModal";
import { clearSingleTemplate } from "../../../redux/company/companySlice";
import eye from "../../../assets/Admin images/eye.png";

const CustomOutlinedPagination = styled(OutlinedPagination)(({ theme }) => ({
  "& .Mui-selected": {
    backgroundColor: "rgba(255, 88, 51, 1) !important",
    color: "#fff !important",
  },
  "& .MuiPaginationItem-root": {
    backgroundColor: "transparent",
    color: "black",
    border: "none",
    "&:hover": {
      backgroundColor: "rgba(255, 88, 51, 1)",
      color: "#fff",
    },
  },
}));

const EmailListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { emailTemplates, isLoading } = useSelector((state) => state.company);

  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewModal, setPreviewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    dispatch(allEmailTemplates());
    dispatch(clearSingleTemplate());
  }, []);

  const rowsPerPage = 8;
  const startingRow = (currentPage - 1) * rowsPerPage + 1;
  const endingRow = Math.min(currentPage * rowsPerPage, emailTemplates?.length);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(emailTemplates?.length / rowsPerPage))
    );
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar3 />
        <Stack
       className='company-main-height'
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack className='company-dashboard-main-div'>
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
                <Link to="/add_email">
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
                    Add Email Creative
                  </Button>
                </Link>
              </Stack>
              <CampaignTabsButton />
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {emailTemplates?.length === 0 ? (
                    <div className="no-records-found">
                      <Typography variant="paragraph">
                        No record found
                      </Typography>
                    </div>
                  ) : (
                    <Table>
                      <TableBody>
                        {emailTemplates
                          .slice(startingRow - 1, endingRow)
                          .map((template, index) => (
                            <TableRow
                              key={template.id}
                              sx={{
                                backgroundColor:
                                  index % 2 === 0 ? "#F5F7FA" : "#ffffff",
                              }}
                            >
                              <Grid container>
                                <Grid item md={3}>
                                  <TableCell
                                    sx={{
                                      border: "none",
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography className="email-template-name">
                                      {template.name}
                                    </Typography>
                                  </TableCell>
                                </Grid>
                                <Grid item md={5}>
                                  <TableCell
                                    sx={{
                                      border: "none",
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                    className="email-description"
                                  >
                                    {template.description}
                                  </TableCell>
                                </Grid>
                                <Grid item md={2} style={{ display: "flex" }}>
                                  <TableCell
                                    sx={{
                                      border: "none",
                                      display: "flex",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      navigate(`/edit_email/${template.id}`)
                                    }
                                  >
                                    <img
                                      src={edit}
                                      alt="dots"
                                      width="30px"
                                      height="30px"
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      border: "none",
                                      display: "flex",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <img
                                      onClick={() => {
                                        setPreviewModal(true);
                                        setSelectedTemplate(template);
                                      }}
                                      src={eye}
                                      alt="dots"
                                      width="30px"
                                      height="30px"
                                    />
                                  </TableCell>
                                </Grid>
                              </Grid>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                  {emailTemplates.length > 0 && (
                    <div className="pagination">
                      <span>
                        Showing {endingRow} from {emailTemplates?.length}{" "}
                        Templates
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
                          count={Math.ceil(
                            emailTemplates?.length / rowsPerPage
                          )}
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
                          <img src="./images/Vectori.png" alt="vector" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </Stack>
        </Stack>
        {previewModal && (
          <ContentPreviewModal
            previewModal={previewModal}
            setPreviewModal={setPreviewModal}
            selectedTemplate={selectedTemplate}
          />
        )}
      </div>
    </div>
  );
};

export default EmailListing;
