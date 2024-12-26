import React, { useState } from "react";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import { Stack } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allTransferPoints } from "../../../../redux/admin/adminThunks";
import { useEffect } from "react";
import eye from "../../../../assets/Admin images/eye.png";
import DateComp from "../../../../components/Date-Component/DateComp";
import Searchbar from "../../../../components/InputFields/SearchField";
import ModalComp from "../../../../components/modals/Modal";
import CustomTable from "../../../../components/customTable/CustomTable";
import PointModal from "../../../../components/modals/PointModal";

const PointTransferListing = () => {
  const dispatch = useDispatch();

  const transferPoints = useSelector((state) => state.admin.transferPoints);
  const { isLoading, isUpdate } = useSelector((state) => state.admin);

  const [isAdditionalModal, setIsAdditionalModal] = useState(false);
  const [duplicateArray, setDuplicateArray] = useState([]);
  const [memberInfo, setMemberInfo] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateSearch, setDateSearch] = useState(false);
  const [textSearch, setTextSearch] = useState(false);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalCount, setTotalCounts] = useState(null);

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
      setTotalPages(transferPoints?.totalPages);
      setTotalCounts(transferPoints?.totalCount);
    } else setDuplicateArray([]);
  }, [transferPoints?.response]);

  const columns = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 100,
    },
    {
      field: "consumerName",
      headerName: "Member Name",
      width: 200,
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
      headerName: "Transfer Date",
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
      width: 250,
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
        <>
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
        </>
      ),
    },
  ];

  const handleActionClick = (memberInfo) => {
    setMemberInfo(memberInfo);
    setIsAdditionalModal(true);
  };

  return (
    <div>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar />
        <Stack
          className="admin-main-height"
        >
          <Header />
          <Stack className="admin-dashboard-main-div">
            <div className="ptl-main-div">
              <div className="ptl-header-div">
                <div style={{ display: "flex" }}>
                  <div className="ptl-title-design"></div>
                  <div className="ptl-title">Points Transfer Details</div>
                </div>
                <Link to="/admin_transfer_point">
                  <button className="ptl-now-btn" style={{ cursor: "pointer" }}>
                    Transfer Now
                  </button>
                </Link>
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
                  border="1px solid rgba(189, 189, 189, 1)"
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
                columns={columns}
                page={page}
                totalPages={totalPages || 0}
                totalCount={totalCount || 0}
                changePage={setPage}
                pinnedLeftColumns={["fname"]}
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
        data={memberInfo}
        headingTitles={["Heading 1"]}
        cancelButtonText="Cancel"
      /> */}
       <PointModal
        isModalOpen={isAdditionalModal}
        closeModal={() => setIsAdditionalModal(false)}
        title="Member Point Transfer Detail"
        data={memberInfo}
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default PointTransferListing;
