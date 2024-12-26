import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import { Stack } from "@mui/material";
import "./style.css";
import CustomTable from "../../../components/customTable/CustomTable";
import DateComp from "../../../components/Date-Component/DateComp";
import Searchbar from "../../../components/InputFields/SearchField";
import { merchantProducts } from "../../../redux/company/companyThunks";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

const ProductListing = () => {
  const dispatch = useDispatch();

  const shopifyProducts = useSelector((state) => state.company.shopifyProducts);
  const { isLoading } = useSelector((state) => state.company);

  const [collapsed, setCollapsed] = useState(false);
  const [duplicateArray, setDuplicateArray] = useState([]);
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
      merchantProducts({
        page: page,
        pageSize: 8,
        startDate: startDate
          ? startDate.format("YYYY-MM-DD HH:mm:ss.SSS")
          : null,
        endDate: endDate ? endDate.format("YYYY-MM-DD HH:mm:ss.SSS") : null,
        text: text.length ? text : null,
      })
    );
  }, [dateSearch, textSearch, page]);

  useEffect(() => {
    if (shopifyProducts?.response?.length) {
      const updatedArray = shopifyProducts?.response?.map((item, index) => ({
        ...item,
        srNo: index + 1,
      }));
      setDuplicateArray(updatedArray);
      setTotalPages(shopifyProducts?.totalPages);
      setTotalCounts(shopifyProducts?.totalCount);
    } else setDuplicateArray([]);
  }, [shopifyProducts?.response]);

  const columns = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 90,
      editable: true,
    },
    {
      field: "title",
      headerName: "Product",
      width: 320,
      renderCell: (params) => <p>{params?.row?.title || "-"}</p>,
    },
    {
      field: "productType",
      headerName: "Category",
      width: 180,
      renderCell: (params) => <p>{params?.row?.productType || "-"}</p>,
    },
    {
      field: "type",
      headerName: "SKU",
      width: 200,
      renderCell: (params) => <p>{params?.row?.sku || "-"}</p>,
    },
    {
      field: "createdAt",
      headerName: "Date Published",
      sortable: false,
      width: 250,
      renderCell: (params) => (
        <p>
          {params?.row?.createdAt
            ? format(new Date(params?.row?.createdAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      sortable: false,
      width: 250,
      renderCell: (params) => <p>{params?.row?.stock || 0}</p>,
    },
    {
      field: "price",
      headerName: "Price",
      sortable: false,
      width: 250,
      renderCell: (params) => <p>{params?.row?.price || 0}</p>,
    },
  ];

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack className="company-main-height">
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="company-dashboard-main-div">
          <div className="p-main-div">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: "white",
                  marginTop: "20px",
                }}
              >
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
                  }}
                >
                  Products
                </div>
              </div>
            </div>
            <div className="input-container" >
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
                placeholder="Search by product name"
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
              columns={columns}
              pinnedLeftColumns={["fname"]}
              page={page}
              totalPages={totalPages}
              totalCount={totalCount || 0}
              changePage={setPage}
              pageName="Products"
            />
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default ProductListing;
