import React, { useState } from "react";
import SideBar from "../../../../components/Layout/SideBar3";
import Header from "../../../../components/Layout/Header";
import { Stack } from "@mui/material";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  allTransferPoints,
  editPointStatus,
} from "../../../../redux/company/companyThunks";
import CustomTable from "../../../../components/customTable/CustomTable";
import Searchbar from "../../../../components/InputFields/SearchField";
import DateComp from "../../../../components/Date-Component/DateComp";
import ModalComp from "../../../../components/modals/Modal";
import eye from "../../../../assets/Admin images/eye.png";
import { CustomSwitch } from "../../../Admin/Admin-Consumer/Consumer_Listing/consumer.style";
import { startOfDay } from "date-fns";
import { parseISO, isAfter, startOfToday } from "date-fns";
import { toast } from "react-toastify";
import PointModal from "../../../../components/modals/PointModal";

const CompanyPointTransfer = () => {
  const activeStyles = {
    "& .MuiSwitch-switchBase": {
      color: "rgba(11, 121, 116, 1) !important",
    },
    "& .css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
      {
        backgroundColor: "white",
        border: "1px solid rgba(11, 121, 116, 1) !important",
      },
  };

  const defaultStyles = {
    "& .MuiSwitch-switchBase": {
      color: "defaultColor",
    },
    "& .css-1yjjitx-MuiSwitch-track": {
      backgroundColor: "defaultBackgroundColor",
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transferPoints = useSelector((state) => state.company.transferPoints);
  const { isLoading, isUpdate } = useSelector((state) => state.company);

  const [isAdditionalModal, setIsAdditionalModal] = useState(false);
  const [duplicateArray, setDuplicateArray] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateSearch, setDateSearch] = useState(false);
  const [textSearch, setTextSearch] = useState(false);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [totalCount, setTotalCounts] = useState(null);
  const [switchStatus, setSwitchStatus] = useState({});

  useEffect(() => {
    dispatch(
      allTransferPoints({
        page: page,
        pageSize: 8,
        startDate: startDate
          ? startDate.format("YYYY-MM-DD HH:mm:ss.SSS")
          : null,
        endDate: endDate ? endDate.format("YYYY-MM-DD HH:mm:ss.SSS") : null,
        text: text.length ? text : null,
      })
    );
  }, [textSearch, dateSearch, isUpdate, page]);

  useEffect(() => {
    if (transferPoints?.response?.length) {
      const updatedArray = transferPoints?.response?.map((item, index) => ({
        ...item,
        srNo: index + 1,
      }));
      setDuplicateArray(updatedArray);
      const newSwitchStatus = {};
      updatedArray.forEach((item) => {
        if (
          item.pointStatus === "ACTIVE" ||
          item.pointStatus === "ALWAYS_ACTIVE"
        ) {
          newSwitchStatus[item.id] = item.pointStatus;
        }
      });
      setSwitchStatus(newSwitchStatus);
      setTotalPages(transferPoints?.totalPages);
      setTotalCounts(transferPoints?.totalCount);
    } else setDuplicateArray([]);
  }, [transferPoints?.response]);

  const handleChange = (row) => {
    if (row?.pointStatus === "INACTIVE") {
      if (row?.pointsExpiry) {
        const today = startOfToday();
        const endAtDate = startOfDay(parseISO(row?.pointsExpiry));
        if (isAfter(endAtDate, today)) {
          //Send ACTIVE
          setSwitchStatus((prevStatus) => ({
            ...prevStatus,
            [row.id]: !prevStatus[row.id],
          }));
          return dispatch(
            editPointStatus({ id: row.id, pointStatus: "ACTIVE" })
          );
        } else {
          return toast.error("Rule is expired", { theme: "colored" });
        }
      } else if (row?.pointsExpiry === null) {
        //Send ALWAYS_ACTIVE
        setSwitchStatus((prevStatus) => ({
          ...prevStatus,
          [row.id]: !prevStatus[row.id],
        }));
        return dispatch(
          editPointStatus({ id: row.id, pointStatus: "ALWAYS_ACTIVE" })
        );
      }
    }
    if (row?.pointStatus === "ACTIVE" || "ALWAYS_ACTIVE") {
      //Send INACTIVE
      setSwitchStatus((prevStatus) => ({
        ...prevStatus,
        [row.id]: !prevStatus[row.id],
      }));
      return dispatch(editPointStatus({ id: row.id, pointStatus: "INACTIVE" }));
    }
  };

  const handleActionClick = (transferRec) => {
    setIsAdditionalModal(true);
    setSelectedTransfer(transferRec);
  };
  
  const columns = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 90,
    },
    {
      field: "consumerName",
      headerName: "Member Name",
      width: 180,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.consumerInfo?.firstName +
              " " +
              params?.row?.consumerInfo?.lastName}
          </p>
        );
      },
    },
    {
      field: "transferDate",
      headerName: "Date",
      width: 190,
      renderCell: (params) => {
        return (
          <p>
            {new Date(params?.row?.transferDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        );
      },
    },
    {
      field: "transferType",
      headerName: "Transfer Type",
      width: 200,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.transferType?.charAt(0)?.toUpperCase() +
              params?.row?.transferType?.slice(1)?.toLowerCase() +
              " " +
              "Points"}
          </p>
        );
      },
    },
    {
      field: "points",
      headerName: "Points",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return <p>{params?.row?.points}</p>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 260,
      renderCell: (params) => {
        return <p>{params?.row?.description}</p>;
      },
    },
    {
      headerName: "Actions",
      sortable: false,
      width: 260,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <button
            style={{
              background: "rgba(11, 121, 116, 0.08)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              border: "none",
            }}
            onClick={() => handleActionClick(params.row)}
          >
            <img src={eye} alt="dots" />
          </button>
          <div className="dec-btn-1">
            <CustomSwitch
              size="small"
              checked={switchStatus[params.row.id] || false}
              onChange={() => handleChange(params.row)}
              sx={switchStatus[params.row.id] ? activeStyles : defaultStyles}
            />
          </div>
        </div>
      ),
    },
  ];


  return (
    <div>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar />
        <Stack
        className="company-main-height"
        >
          <Header />
          <Stack className="company-dashboard-main-div">
            <div className="p-main-div">
              <div
                style={{
                  display: "flex",
                  background: "white",
                  marginTop: "20px",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  {" "}
                  <div
                    style={{
                      width: "16px",
                      height: "32px",
                      background: "#0B7974",
                      borderRadius: "10px",
                    }}
                  ></div>
                  <div
                    style={{
                      fontSize: "23px",
                      fontWeight: "500",
                      color: "#black",
                      paddingLeft: "30px",
                      paddingBottom: "30px",
                    }}
                  >
                    Point Transfer Detail
                  </div>
                </div>
                <button
                  style={{
                    width: "122px",
                    height: "40px",
                    background: "#FF5833",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/company_transfer_points")}
                >
                  Transfer Now
                </button>
              </div>

              <div className="input-container">
                <DateComp
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  dateSearch={dateSearch}
                  setDateSearch={setDateSearch}
                />
                <Searchbar
                  color="00#AEB6CF"
                  backgroundColor="white"
                  placeholder="Search by member name"
                  border="1px solid rgba(189, 189, 189, 1) "
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setTextSearch(!textSearch);
                    }
                  }}
                />
              </div>
              <CustomTable
                rows={duplicateArray}
                loading={isLoading}
                totalCount={totalCount || 0}
                columns={columns}
                pinnedLeftColumns={["fname"]}
                page={page}
                totalPages={totalPages}
                changePage={setPage}
                pageName="Transfers"
              />
            </div>
          </Stack>
        </Stack>
      </div>
      {/* <ModalComp
        isModalOpen={isAdditionalModal}
        closeModal={() => setIsAdditionalModal(false)}
        title="Member Points Transfer Detail"
        data={selectedTransfer}
        headingTitles={["Heading 1"]}
        cancelButtonText="Cancel"
      /> */}
      <PointModal
        isModalOpen={isAdditionalModal}
        closeModal={() => setIsAdditionalModal(false)}
        title="Member Point Transfer Detail"
        data={selectedTransfer}
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default CompanyPointTransfer;
