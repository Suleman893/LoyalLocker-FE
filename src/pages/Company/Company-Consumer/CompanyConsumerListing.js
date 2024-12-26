import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import { Stack } from "@mui/material";
import "./style.css";
import { CustomSwitch } from "../../Admin/Admin-Consumer/Consumer_Listing/consumer.style";
import CustomTable from "../../../components/customTable/CustomTable";
import DateComp from "../../../components/Date-Component/DateComp";
import Searchbar from "../../../components/InputFields/SearchField";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  allMembers,
  changeMemberStatus,
} from "../../../redux/company/companyThunks";

const CompanyConsumerListing = () => {
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

  const members = useSelector((state) => state.company.members);
  const { isLoading } = useSelector((state) => state.company);

  const [duplicateArray, setDuplicateArray] = useState([]);
  const [switchStatus, setSwitchStatus] = useState({});
  const [collapsed, setCollapsed] = useState(false);
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
      allMembers({
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
    if (members?.response?.length) {
      const updatedArray = members?.response?.map((item, index) => ({
        ...item,
        srNo: index + 1,
      }));
      setDuplicateArray(updatedArray);

      const newSwitchStatus = {};
      updatedArray.forEach((item) => {
        newSwitchStatus[item.id] = item.status === "ACTIVE";
      });
      setSwitchStatus(newSwitchStatus);
      setTotalPages(members?.totalPages);
      setTotalCounts(members?.totalCount);
    } else setDuplicateArray([]);
  }, [members?.response]);

  const handleChange = (id) => {
    setSwitchStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
    dispatch(changeMemberStatus({ id }));
  };

  const columns = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 90,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 200,
    },

    {
      field: "lastName",
      headerName: "Last Name",
      width: 200,
    },
    {
      field: "loyaltyNumber",
      headerName: "Loyalty Number",
      width: 200,
      editable: true,
    },
    {
      field: "mobile",
      headerName: "Mobile Number",
      sortable: false,
      width: 200,
    },

    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 290,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>{format(new Date(params.row.createdAt), "MMMM d, yyyy")}</div>
      ),
    },
    {
      headerName: "Action",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <div>
          <div className="dec-btn-1">
            <CustomSwitch
              size="small"
              checked={switchStatus[params.row.id] || false}
              onChange={() => handleChange(params.row.id)}
              sx={switchStatus[params.row.id] ? activeStyles : defaultStyles}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
        className="company-main-height"
      >
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
                    marginLeft: "30px",
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
                  Members
                </div>
              </div>
              <div>
                <Link to="/company_invite_member">
                  <button
                    style={{
                      cursor: "pointer",
                      width: "159px",
                      height: "40px",
                      background: "#FF5833",
                      color: "white",
                      borderRadius: "10px",
                      border: "none",
                      marginTop: "20px",
                      marginRight: "20px",
                    }}
                  >
                    Add Member
                  </button>
                </Link>
              </div>
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
                placeholder="Search by email"
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
              totalCount={totalCount || 0}
              totalPages={totalPages}
              changePage={setPage}
              pageName="Members"
            />
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default CompanyConsumerListing;
