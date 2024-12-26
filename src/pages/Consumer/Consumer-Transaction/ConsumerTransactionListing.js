import React, { useEffect, useState } from "react";
import "./style.css";
import "../../../components/dashboard/Dashboard.css";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Button } from "@mui/material";
import SideBar from "../../../components/Layout/SideBar2";
import Header from "../../../components/Layout/Header";
import dots from "../../../../src/assets/Admin images/dots.png";
import { styled } from "@mui/material/styles";
import OutlinedPagination from "@mui/material/Pagination";
import DateComp from "../../../components/Date-Component/DateComp";
import Searchbar from "../../../components/InputFields/SearchField";
import eye from "../../../assets/Admin images/eye.png";
import ModalComp from "../../../components/modals/Modal";
import CustomTable from "../../../components/customTable/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { allTransactions } from "../../../redux/consumer/consumerThunk";
import { ConsumerMobileScreen } from "./ConsumerMobileScreen";

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

const ConsumerTransactionListing = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.consumer.transactions);
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
  const [totalPages, setTotalPages] = useState(null);
  const [totalCount, setTotalCounts] = useState(null);
  const [transactionInfo, setTransactionInfo] = useState(null);
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
      allTransactions({
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
    if (transactions?.response?.length) {
      const updatedArray = transactions?.response?.map((item, index) => ({
        ...item,
        srNo: index + 1,
      }));

      setDuplicateArray(updatedArray);
      setTotalPages(transactions?.totalPages);
      setTotalCounts(transactions?.totalCount);
    } else setDuplicateArray([]);
  }, [transactions?.response]);

  const columns = [
    {
      field: "id",
      headerName: "Sr#.",
      width: 120,
      renderCell: (params) => {
        return <p>{params?.row?.srNo}</p>;
      },
    },
    {
      field: "transactionType",
      headerName: "Transaction Type",
      width: 230,
      renderCell: (params) => {
        return <p>{params?.row?.transactionType}</p>;
      },
    },
    {
      field: "merchantInfo",
      headerName: "Merchant",
      width: 230,
      renderCell: (params) => {
        return <p>{params?.row?.merchantInfo?.brandName}</p>;
      },
    },
    {
      field: "transactionDate",
      headerName: "Transaction Date",
      width: 240,

      renderCell: (params) => {
        return (
          <p>
            {new Date(params?.row?.transactionDate).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </p>
        );
      },
    },
    {
      field: "discountedPrice",
      headerName: "Discounted Price",
      width: 180,
      renderCell: (params) => {
        return <p>{params?.row?.discountedPrice || "-"}</p>;
      },
    },
    {
      field: "points",
      headerName: "Points",
      width: 180,
      renderCell: (params) => {
        return <p>{params?.row?.points || "-"}</p>;
      },
    },
    {
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (params) => (
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
      ),
    },
  ];

  const handleActionClick = (transactionInfo) => {
    setTransactionInfo(transactionInfo);
    setIsAdditionalModal(true);
  };

  return (
    <div style={{width:'100%',minHeight:'100vh',display: "flex"}}>
      <SideBar />
      <Stack Stack className="main-height">
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="consumer-main-div">
          <div className="dashboard-main-div">
            <div className="atl-header">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="consumer-atl-title-design"></div>
                <div className="atl-title">Find Transaction</div>
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
                  placeholder="Search by transaction type"
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
            <div className="mobile-resposive">
              <ConsumerMobileScreen data={duplicateArray} />
            </div>
            <div>
              <CustomTable
                rows={duplicateArray}
                loading={isLoading}
                columns={columns}
                page={page}
                totalPages={totalPages || 0}
                totalCount={totalCount || 0}
                changePage={setPage}
                pinnedLeftColumns={["fname"]}
                pageName="Transactions"
              />
            </div>
          </div>
        </Stack>
      </Stack>
      <ModalComp
        isModalOpen={isAdditionalModal}
        closeModal={() => setIsAdditionalModal(false)}
        title="Transaction Details"
        data={transactionInfo}
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default ConsumerTransactionListing;
