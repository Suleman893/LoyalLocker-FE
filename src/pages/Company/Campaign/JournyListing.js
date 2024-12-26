import React, { useRef, useState } from "react";
import SideBar3 from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import {
  Stack,
  Button,
  Typography,
  Menu,
  MenuItem,
  TextField,
  Modal,
} from "@mui/material";
import dots from "../../../assets/Company images/3dots.png";
import { styled } from "@mui/material/styles";
import OutlinedPagination from "@mui/material/Pagination";
import "./style.css";
import "./CampaignListing.css";
import { Link } from "react-router-dom";
import { Table, TableRow, TableCell, TableBody } from "@mui/material";
import CampaignTabsButton from "./CampaignTabsButton";
import { allJourneys } from "../../../redux/company/companyThunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../../../components/Loader/Loader";
import { executeJourney } from "../../../redux/company/companyThunks";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Box } from "@mui/system";

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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 3,
  display: "flex",
  flexDirection: "column",
  gridGap: "10px",
};

const JournyListing = () => {
  const dispatch = useDispatch();
  const currentDateTime = dayjs();

  const { journeys, isLoading, isUpdate } = useSelector(
    (state) => state.company
  );

  const latestDate = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [journeySelected, setJourneySelected] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(allJourneys());
  }, [isUpdate]);

  const rowsPerPage = 8;
  const startingRow = (currentPage - 1) * rowsPerPage + 1;
  const endingRow = Math.min(currentPage * rowsPerPage, journeys?.length);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(journeys?.length / rowsPerPage))
    );
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleScheduleJourney = () => {
    const selectedDate = latestDate.current;
    if (selectedDate) {
      dispatch(
        executeJourney({
          journeyId: journeySelected,
          scheduleTime: selectedDate,
        })
      );
      setOpenDatePicker(false);
      handleClose();
    }
  };

  return (
    <div>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar3 />
        <Stack
       className="company-main-height"
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack className="company-dashboard-main-div">
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
                <Link to="/add_journey">
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
                    Add New Journey
                  </Button>
                </Link>
              </Stack>

              <CampaignTabsButton />
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {journeys?.length === 0 ? (
                    <div className="no-records-found">
                      <Typography variant="paragraph">
                        No record found
                      </Typography>
                    </div>
                  ) : (
                    <Table>
                      <TableBody>
                        {journeys
                          .slice(startingRow - 1, endingRow)
                          .map((journey, index) => (
                            <TableRow
                              key={journey.id}
                              sx={{
                                backgroundColor:
                                  index % 2 === 0 ? "#F5F7FA" : "#ffffff",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <TableCell
                                  sx={{ border: "none" }}
                                  className="segment-name"
                                >
                                  {journey.name}
                                  <Typography className="segment-name-span">
                                    {journey.description}
                                  </Typography>
                                </TableCell>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      border: "none",
                                      marginRight: "100px",
                                    }}
                                    className="segment-name-value"
                                  >
                                    <Typography>
                                      Journey completed{" "}
                                      <span style={{ color: "#0B7974" }}>
                                        {journey?.successfulExecution}
                                      </span>{" "}
                                    </Typography>
                                    <Typography>
                                      Journey not completed{" "}
                                      <span style={{ color: "#FF5833" }}>
                                        {journey?.failedExecution}
                                      </span>{" "}
                                    </Typography>
                                  </TableCell>
                                  <TableCell sx={{ border: "none" }}>
                                    <Typography sx={{ color: "#0B7974" }}>
                                      Created Date:{" "}
                                      {journey?.createdAt
                                        ? format(
                                            new Date(journey?.createdAt),
                                            "MM/dd/yyyy"
                                          )
                                        : "-"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      border: "none",
                                    }}
                                  >
                                    <img
                                      src={dots}
                                      width="30px"
                                      height="30px"
                                      id="basic-button"
                                      aria-controls={
                                        open ? "basic-menu" : undefined
                                      }
                                      aria-haspopup="true"
                                      aria-expanded={open ? "true" : undefined}
                                      onClick={handleClick}
                                      alt="dot"
                                    />
                                    <Menu
                                      // anchorEl={menuAnchor}
                                      // open={true}
                                      // onClose={handleMenuClose}
                                      id="basic-menu"
                                      anchorEl={anchorEl}
                                      open={open}
                                      onClose={handleClose}
                                      MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                      }}
                                    >
                                      <MenuItem
                                        onClick={() => {
                                          dispatch(
                                            executeJourney({
                                              journeyId: journey?.id,
                                              scheduleTime: null,
                                            })
                                          );
                                          handleClose();
                                        }}
                                      >
                                        Execute Now
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          setJourneySelected(journey?.id);
                                          setOpenDatePicker(true);
                                        }}
                                      >
                                        Schedule Later
                                      </MenuItem>
                                    </Menu>
                                    <Modal
                                      open={openDatePicker}
                                      onClose={() => setOpenDatePicker(false)}
                                      aria-labelledby="modal-modal-title"
                                      aria-describedby="modal-modal-description"
                                      BackdropProps={{
                                        style: {
                                          backgroundColor: "transparent",
                                        },
                                      }}
                                    >
                                      <Box sx={modalStyle}>
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DateTimePicker
                                            format="MM/DD/YYYY hh:mm A"
                                            label="Select Date & Time"
                                            value={currentDateTime}
                                            onChange={(newValue) => {
                                              latestDate.current = newValue;
                                            }}
                                            sx={{
                                              width: "100% !important",
                                            }}
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                onChange={(date) => {
                                                  if (date === null) {
                                                    return toast.info(
                                                      "Set date",
                                                      {
                                                        theme: "colored",
                                                      }
                                                    );
                                                  }
                                                  latestDate.current =
                                                    date.valueOf();
                                                }}
                                                sx={{
                                                  width: "100% !important",
                                                }}
                                              />
                                            )}
                                            minDateTime={currentDateTime}
                                          />
                                        </LocalizationProvider>
                                        <Button
                                          onClick={handleScheduleJourney}
                                          sx={{
                                            mt: 2,
                                            background: "#FF5833",
                                            color: "#fff",
                                            textTransform: "none",
                                            "&:hover": {
                                              background: "#FF5833",
                                            },
                                            borderRadius: "8px",
                                          }}
                                        >
                                          Schedule
                                        </Button>
                                      </Box>
                                    </Modal>
                                  </TableCell>
                                </div>
                              </div>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                  {journeys.length > 0 && (
                    <div className="pagination">
                      <span>
                        Showing {endingRow} from {journeys?.length} Journeys
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
                          <img src="./images/Vectoria.png" alt="Vectori" />
                        </button>
                        <CustomOutlinedPagination
                          shape="rounded"
                          variant="filled"
                          count={Math.ceil(journeys?.length / rowsPerPage)}
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
                          <img src="./images/Vectori.png" alt="Vectori" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default JournyListing;
