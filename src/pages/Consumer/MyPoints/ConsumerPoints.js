import React, { useEffect, useState } from "react";
import "./style.css";
import "../../../components/dashboard/Dashboard.css";
import { Stack } from "@mui/material";
import SideBar from "../../../components/Layout/SideBar2";
import Header from "../../../components/Layout/Header";
import DateComp from "../../../components/Date-Component/DateComp";
import Searchbar from "../../../components/InputFields/SearchField";
import eye from "../../../assets/Admin images/eye.png";
import ModalComp from "../../../components/modals/Modal";
import CustomTable from "../../../components/customTable/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { allTransferPoints } from "../../../redux/consumer/consumerThunk";
import PointModal from "../../../components/modals/PointModal";
import { MyPointsMobileScreen } from "./MyPointsMobileScreen";

const ConsumerPoints = () => {
  const dispatch = useDispatch();

  const transferPoints = useSelector((state) => state.consumer.transferPoints);
  const { isLoading, isUpdate } = useSelector((state) => state.consumer);

  const [collapsed, setCollapsed] = useState(false);
  const [isAdditionalModal, setIsAdditionalModal] = useState(false);
  const [duplicateArray, setDuplicateArray] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateSearch, setDateSearch] = useState(false);
  const [textSearch, setTextSearch] = useState(false);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [transferInfo, setTransferInfo] = useState(null);
  const [totalCount, setTotalCounts] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState();

  const updatePageSize = () => {
    if (window.innerWidth < 768) {
      setPageSize(2);
    } else {
      setPageSize(8);
    }
  };

  useEffect(() => {
    updatePageSize();
  
    window.addEventListener("resize", updatePageSize);
  
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  useEffect(() => {
    dispatch(
      allTransferPoints({
        page: page,
        pageSize: pageSize,
        startDate: startDate
          ? startDate.format("YYYY-MM-DD HH:mm:ss.SSS")
          : null,
        endDate: endDate ? endDate.format("YYYY-MM-DD HH:mm:ss.SSS") : null,
        text: text.length ? text : null,
      })
    );
  }, [textSearch, dateSearch, isUpdate, page, pageSize]);

  useEffect(() => {
    if (transferPoints?.response?.length) {
      const updatedArray = transferPoints?.response?.map((item, index) => ({
        ...item,
        srNo: index + 1,
      }));
      setDuplicateArray(updatedArray);
      setTotalPages(transferPoints?.totalPages);
      setTotalCounts(transferPoints?.totalCount);
    } else {
      setDuplicateArray([]);
      setTotalPages(0);
      setTotalCounts(0);
    }
  }, [transferPoints?.response]);

  const handleActionClick = (transferRec) => {
    setTransferInfo(transferRec);
    setIsAdditionalModal(true);
  };

  const columns = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 100,
    },
    {
      field: "transferType",
      headerName: "Points type",
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
      field: "merchantInfo",
      headerName: "Points transferred by",
      width: 250,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.merchantInfo?.email
              ? params?.row?.merchantInfo?.email
              : params?.row?.adminInfo?.email
              ? params?.row?.adminInfo?.email
              : "-"}
          </p>
        );
      },
    },
    {
      field: "transferDate",
      headerName: "Point Transfer Date",
      width: 210,
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
      field: "pointsExpiry",
      headerName: "Point Expiry On",
      width: 210,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.pointsExpiry
              ? new Date(params?.row?.pointsExpiry).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )
              : "-"}
          </p>
        );
      },
    },
    {
      field: "points",
      headerName: "Points Earn",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return <p>{params?.row?.points}</p>;
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

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex" }}>
      <SideBar />
      <Stack Stack className="main-height">
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="consumer-main-div">
          <div className="dashboard-main-div">
            <div className="atl-header-1">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="atl-header-design-1"></div>
                <div className="atl-title-1">My Points</div>
              </div>
            </div>
            <div className="consumer-transection-tabel-search-bar">
              <DateComp
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                dateSearch={dateSearch}
                setDateSearch={setDateSearch}
              />
              <div>
                <Searchbar
                  color="00#AEB6CF"
                  backgroundColor="white"
                  placeholder="Search by email"
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
            </div>
            <div className="points-mobile-resposive">
              <MyPointsMobileScreen data={duplicateArray}/>
            </div>
            <div>
              <CustomTable
                rows={duplicateArray}
                loading={isLoading}
                columns={columns}
                pinnedLeftColumns={["fname"]}
                page={page}
                changePage={setPage}
                totalPages={totalPages | 0}
                totalCount={totalCount || 0}
                pageName="Transfers"
              />
            </div>
          </div>
        </Stack>
      </Stack>
      <PointModal
        isModalOpen={isAdditionalModal}
        closeModal={() => setIsAdditionalModal(false)}
        title="Member Point Transfer Detail"
        data={transferInfo}
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default ConsumerPoints;
