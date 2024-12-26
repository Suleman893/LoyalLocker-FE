import React, { useEffect, useState } from "react";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CustomSwitch } from "./consumer.style";
import "./style.css";
import DateComp from "../../../../components/Date-Component/DateComp";
import Searchbar from "../../../../components/InputFields/SearchField";
import {
  allMembers,
  changeMemberStatus,
} from "../../../../redux/admin/adminThunks";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import CustomTable from "../../../../components/customTable/CustomTable";

const useStyles = styled({
  customFilterIcon: {
    "& .css-ptiqhd-MuiSvgIcon-root": {
      backgroundImage: 'url("./images/Vector.png")',
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      width: "16px",
      height: "16px",
      cursor: "pointer",
    },
  },
});

const Consumer = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.admin.members);
  const { isLoading } = useSelector((state) => state.admin);

  const [duplicateArray, setDuplicateArray] = useState([]);
  const [switchStatus, setSwitchStatus] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateSearch, setDateSearch] = useState(false);
  const [textSearch, setTextSearch] = useState(false);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalCount, setTotalCounts] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

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
      width: 100,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 190,
      headerClassName: useStyles().customFilterIcon,
    },
    {
      field: "loyaltyNumber",
      headerName: "Loyalty Number",
      width: 200,
    },
    {
      field: "mobile",
      headerName: "Mobile Number",
      sortable: false,
      width: 210,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 350,
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
      width: 146,
      renderCell: (params) => (
        <div>
          <div className="dec-btn-1">
            <CustomSwitch
              checked={switchStatus[params.row.id] || false}
              size="small"
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
       className="admin-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="admin-dashboard-main-div">
          <div className="al-main-div">
            <div style={{ display: "flex" }}>
              <div className="al-title-design"></div>
              <div className="al-title">Members</div>
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
                type="text"
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
              loading={isLoading}
              rows={duplicateArray}
              columns={columns}
              page={page}
              totalPages={totalPages || 0}
              totalCount={totalCount || 0}
              changePage={setPage}
              pinnedLeftColumns={["fname"]}
              pageName="Members"
            />
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default Consumer;
