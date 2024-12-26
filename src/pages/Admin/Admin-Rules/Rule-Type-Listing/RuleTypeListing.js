import React, { useState, useEffect } from "react";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import { Stack } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allEvents,
  changeEventStatus,
} from "../../../../redux/admin/adminThunks";
import { CustomSwitch } from "../../Admin-Consumer/Consumer_Listing/consumer.style";
import CustomTable from "../../../../components/customTable/CustomTable";

const RuleTypeListing = () => {
  const activeStyles = {
    "& .MuiSwitch-switchBase": {
      color: "rgba(11, 121, 116, 1)",
    },
    "& .css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
      {
        backgroundColor: "white",
        border: "1px solid rgba(11, 121, 116, 1)",
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

  const { isLoading, isUpdate } = useSelector((state) => state.admin);
  const events = useSelector((state) => state.admin.events);

  const [duplicateArray, setDuplicateArray] = useState([]);
  const [switchStatus, setSwitchStatus] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalCount, setTotalCounts] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch(allEvents({ page: page, pageSize: 8 }));
  }, [isUpdate, page]);

  useEffect(() => {
    if (events?.response?.length) {
      const updatedArray = events?.response?.map((item, index) => ({
        ...item,
        srNo: index + 1,
      }));
      setDuplicateArray(updatedArray);
      const newSwitchStatus = {};
      updatedArray.forEach((item) => {
        newSwitchStatus[item.id] = item.status === "ACTIVE";
      });
      setSwitchStatus(newSwitchStatus);
      setTotalPages(events?.totalPages);
      setTotalCounts(events?.totalCount);
    } else setDuplicateArray([]);
  }, [events?.response]);

  const handleChange = (id) => {
    setSwitchStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
    dispatch(changeEventStatus({ id }));
  };

  const columns = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 120,
    },
    {
      field: "name",
      headerName: "Rule Name",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.status?.charAt(0)?.toUpperCase() +
              params?.row?.status?.slice(1)?.toLowerCase()}
          </p>
        );
      },
    },

    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return <p>{params?.row?.description}</p>;
      },
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 290,
      renderCell: (params) => {
        return (
          <p>
            {new Date(params?.row?.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        );
      },
    },
    {
      headerName: "Actions",
      sortable: false,
      width: 260,
      renderCell: (params) => (
        <div className="dec-btn-1">
          <CustomSwitch
            checked={switchStatus[params.row.id] || false}
            size="small"
            onChange={() => handleChange(params.row.id)}
            sx={switchStatus[params.row.id] ? activeStyles : defaultStyles}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar />
        <Stack
      className="admin-main-height"
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack className="admin-dashboard-main-div">
            <div className="ptl-main-div">
              <div className=" ptl-header-div">
                <div style={{ display: "flex" }}>
                  {" "}
                  <div className="ptl-title-design"></div>
                  <div className="ptl-title">Rule Type</div>
                </div>
                <Link to="/admin_add_ruletype">
                  <button
                    className="ptl-now-btn-1"
                    style={{ cursor: "pointer" }}
                  >
                    + Add New Rule Type
                  </button>
                </Link>
              </div>
              <CustomTable
                rows={duplicateArray.length ? duplicateArray : []}
                columns={columns}
                pinnedLeftColumns={["fname"]}
                page={page}
                totalPages={totalPages || 0}
                totalCount={totalCount || 0}
                changePage={setPage}
                pageName="Rule types"
                loading={isLoading}
              />
            </div>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default RuleTypeListing;
