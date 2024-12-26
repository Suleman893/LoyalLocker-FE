import React, { useEffect, useState } from "react";
import "./style.css";
import { Stack } from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import TabComp from "../../../../components/tabs/TabsComp";
import eye from "../../../../assets/Admin images/eye.png";
import CustomTable from "../../../../components/customTable/CustomTable";
import {
  changeRuleStatus,
  getRuleByEvent,
} from "../../../../redux/admin/adminThunks";
import RuleModal from "../../../../components/modals/RuleModal";
import { CustomSwitch } from "../../Admin-Consumer/Consumer_Listing/consumer.style";
import { format, startOfDay } from "date-fns";
import { parseISO, isAfter, startOfToday } from "date-fns";
import { toast } from "react-toastify";

const RuleListing = () => {
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
  const { ruleOfEvent, isLoading, isUpdate } = useSelector(
    (state) => state.admin
  );

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [switchStatus, setSwitchStatus] = useState({});
  const [duplicateArray, setDuplicateArray] = useState([]);

  useEffect(() => {
    dispatch(getRuleByEvent({ id: activeTab + 1, page: page, pageSize: 8 }));
  }, [activeTab, isUpdate, page]);

  useEffect(() => {
    if (ruleOfEvent?.response?.length) {
      const updatedArray = ruleOfEvent?.response?.map((item, index) => ({
        ...item,
        srNo: index + 1,
      }));
      setDuplicateArray(updatedArray);
      const newSwitchStatus = {};
      updatedArray.forEach((item) => {
        if (item.status === "ACTIVE" || item.status === "ALWAYS_ACTIVE") {
          newSwitchStatus[item.id] = item.status;
        }
      });
      setSwitchStatus(newSwitchStatus);
      setTotalPages(ruleOfEvent?.totalPages);
      setTotalCount(ruleOfEvent?.totalCount);
    } else {
      setDuplicateArray([]);
      setTotalPages(0);
      setTotalCount(0);
    }
  }, [ruleOfEvent?.response]);

  const handleActionClick = (selected) => {
    setSelectedRule(selected);
    setIsOpen(!isOpen);
  };

  const handleTabChange = (index) => {
    setPage(1);
    setActiveTab(index);
  };

  const handleChange = (row) => {
    if (row.eventId === 2 && row.status === "INACTIVE") {
      const alreadyExistReferral = ruleOfEvent?.response?.some(
        (itm) => itm.status === "ACTIVE" || itm.status === "ALWAYS_ACTIVE"
      );
      if (alreadyExistReferral) {
        return toast.info("Disable existing rule", { theme: "colored" });
      }
    }
    if (row?.status === "INACTIVE") {
      if (row?.endAt) {
        const today = startOfToday();
        const endAtDate = startOfDay(parseISO(row?.endAt));
        if (isAfter(endAtDate, today)) {
          //Send ACTIVE
          setSwitchStatus((prevStatus) => ({
            ...prevStatus,
            [row.id]: !prevStatus[row.id],
          }));
          return dispatch(changeRuleStatus({ id: row.id, status: "ACTIVE" }));
        } else {
          return toast.error("Rule is expired", { theme: "colored" });
        }
      } else if (row.endAt === null) {
        //Send ALWAYS_ACTIVE
        setSwitchStatus((prevStatus) => ({
          ...prevStatus,
          [row.id]: !prevStatus[row.id],
        }));
        return dispatch(
          changeRuleStatus({ id: row.id, status: "ALWAYS_ACTIVE" })
        );
      }
    }
    if (row?.status === "ACTIVE" || "ALWAYS_ACTIVE") {
      //Send INACTIVE
      setSwitchStatus((prevStatus) => ({
        ...prevStatus,
        [row.id]: !prevStatus[row.id],
      }));
      return dispatch(changeRuleStatus({ id: row.id, status: "INACTIVE" }));
    }
  };

  const scenarioColumn = [
    {
      field: "name",
      headerName: "Rule Name",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.name ? params?.row?.name : "-"}</p>
      ),
    },
    {
      field: "points",
      headerName: "Set Points",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.points ? params?.row?.points : "-"} </p>
      ),
    },
    {
      field: "minTransactionValue",
      headerName: "Minimum Transaction",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.minTransactionValue
            ? params?.row?.minTransactionValue
            : "-"}
        </p>
      ),
    },
    {
      field: "pointsType",
      headerName: "Points Type",
      width: 155,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.pointsType
            ? params?.row?.pointsType?.charAt(0)?.toUpperCase() +
              params?.row?.pointsType?.slice(1)?.toLowerCase()
            : "-"}
        </p>
      ),
    },
    {
      field: "purchaseType",
      headerName: "Purchase Type",
      width: 130,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.purchaseType
            ? params?.row?.purchaseType
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")
            : "-"}
        </p>
      ),
    },
    {
      field: "startAt",
      headerName: "Start Date",
      sortable: false,
      width: 190,
      renderCell: (params) => (
        <p>
          {params?.row?.startAt
            ? format(new Date(params?.row?.startAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.endAt
            ? format(new Date(params?.row?.endAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.createdAt
            ? format(new Date(params?.row?.createdAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <button
            variant="text"
            color="primary"
            style={{
              background: "rgba(11, 121, 116, 0.08)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              border: "none",
              marginRight: "10px",
            }}
            onClick={() => handleActionClick(params.row)}
          >
            <img src={eye} alt="dots" />
          </button>
          <div className="dec-btn-2">
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
  const referralColumn = [
    {
      field: "name",
      headerName: "Rule Name",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.name ? params?.row?.name : "-"}</p>
      ),
    },
    {
      field: "points",
      headerName: "Earn Points",
      width: 230,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.points ? params?.row?.points : "-"} </p>
      ),
    },
    {
      field: "pointsType",
      headerName: "Points Type",
      width: 230,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.pointsType
            ? params?.row?.pointsType?.charAt(0)?.toUpperCase() +
              params?.row?.pointsType?.slice(1)?.toLowerCase()
            : "-"}
        </p>
      ),
    },
    {
      field: "startAt",
      headerName: "Start Date",
      sortable: false,
      width: 230,
      renderCell: (params) => (
        <p>
          {params?.row?.startAt
            ? format(new Date(params?.row?.startAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      sortable: false,
      width: 230,
      renderCell: (params) => (
        <p>
          {params?.row?.endAt
            ? format(new Date(params?.row?.endAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      sortable: false,
      width: 230,
      renderCell: (params) => (
        <p>
          {params?.row?.createdAt
            ? format(new Date(params?.row?.createdAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      headerName: "Actions",
      sortable: false,
      width: 230,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <button
            variant="text"
            color="primary"
            style={{
              background: "rgba(11, 121, 116, 0.08)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              border: "none",
              marginRight: "10px",
            }}
            onClick={() => handleActionClick(params.row)}
          >
            <img src={eye} alt="dots" />
          </button>
          <div className="dec-btn-2">
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
  const generalSpendingColumn = [
    {
      field: "name",
      headerName: "Rule Name",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.name ? params?.row?.name : "-"}</p>
      ),
    },
    {
      field: "points",
      headerName: "Earn Point",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.points ? params?.row?.points : "-"} </p>
      ),
    },
    {
      field: "minTransactionValue",
      headerName: "Minimum Transaction",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.minTransactionValue
            ? params?.row?.minTransactionValue
            : "-"}
        </p>
      ),
    },
    {
      field: "pointsType",
      headerName: "Points Type",
      width: 185,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.pointsType
            ? params?.row?.pointsType?.charAt(0)?.toUpperCase() +
              params?.row?.pointsType?.slice(1)?.toLowerCase()
            : "-"}
        </p>
      ),
    },
    {
      field: "purchaseType",
      headerName: "Purchase Type",
      width: 185,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.purchaseType
            ? params?.row?.purchaseType
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")
            : "-"}
        </p>
      ),
    },
    {
      field: "startAt",
      headerName: "Start Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.startAt
            ? format(new Date(params?.row?.startAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.endAt
            ? format(new Date(params?.row?.endAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.createdAt
            ? format(new Date(params?.row?.createdAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <button
            variant="text"
            color="primary"
            style={{
              background: "rgba(11, 121, 116, 0.08)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              border: "none",
              marginRight: "10px",
            }}
            onClick={() => handleActionClick(params.row)}
          >
            <img src={eye} alt="dots" />
          </button>
          <div className="dec-btn-2">
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
  const geolocationColumn = [
    {
      field: "name",
      headerName: "Rule Name",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.name ? params?.row?.name : "-"}</p>
      ),
    },
    {
      field: "points",
      headerName: "Earn Points",
      width: 180,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.points ? params?.row?.points : "-"} </p>
      ),
    },
    {
      field: "Distance From Store",
      headerName: "Minimum Transaction",
      width: 180,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.distanceFromStore
            ? params?.row?.distanceFromStore
            : "-"}
        </p>
      ),
    },
    {
      field: "pointsType",
      headerName: "Points Type",
      width: 185,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.pointsType
            ? params?.row?.pointsType?.charAt(0)?.toUpperCase() +
              params?.row?.pointsType?.slice(1)?.toLowerCase()
            : "-"}
        </p>
      ),
    },
    {
      field: "purchaseType",
      headerName: "Purchase Type",
      width: 185,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.purchaseType
            ? params?.row?.purchaseType
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")
            : "-"}
        </p>
      ),
    },
    {
      field: "startAt",
      headerName: "Start Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.startAt
            ? format(new Date(params?.row?.startAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.endAt
            ? format(new Date(params?.row?.endAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.createdAt
            ? format(new Date(params?.row?.createdAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <button
            variant="text"
            color="primary"
            style={{
              background: "rgba(11, 121, 116, 0.08)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              border: "none",
              marginRight: "10px",
            }}
            onClick={() => handleActionClick(params.row)}
          >
            <img src={eye} alt="dots" />
          </button>
          <div className="dec-btn-2">
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
  const multiplyPointsColumn = [
    {
      field: "name",
      headerName: "Rule Name",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.name ? params?.row?.name : "-"}</p>
      ),
    },
    {
      field: "points",
      headerName: "Earn Points",
      width: 180,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.points ? params?.row?.points : "-"} </p>
      ),
    },
    {
      field: "multiplier",
      headerName: "Multiplier",
      width: 180,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.multiplier ? params?.row?.multiplier : "-"}</p>
      ),
    },
    {
      field: "pointsType",
      headerName: "Points Type",
      width: 185,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.pointsType
            ? params?.row?.pointsType?.charAt(0)?.toUpperCase() +
              params?.row?.pointsType?.slice(1)?.toLowerCase()
            : "-"}
        </p>
      ),
    },
    {
      field: "purchaseType",
      headerName: "Purchase Type",
      width: 185,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.purchaseType
            ? params?.row?.purchaseType
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")
            : "-"}
        </p>
      ),
    },
    {
      field: "startAt",
      headerName: "Start Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.startAt
            ? format(new Date(params?.row?.startAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.endAt
            ? format(new Date(params?.row?.endAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.createdAt
            ? format(new Date(params?.row?.createdAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <button
            variant="text"
            color="primary"
            style={{
              background: "rgba(11, 121, 116, 0.08)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              border: "none",
              marginRight: "10px",
            }}
            onClick={() => handleActionClick(params.row)}
          >
            <img src={eye} alt="dots" />
          </button>
          <div className="dec-btn-2">
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
  const productsPurchaseColumn = [
    {
      field: "name",
      headerName: "Rule Name",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.name ? params?.row?.name : "-"}</p>
      ),
    },
    {
      field: "points",
      headerName: "Earn Points",
      width: 180,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.points ? params?.row?.points : "-"} </p>
      ),
    },
    {
      field: "products",
      headerName: "Product",
      width: 180,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.products?.name ? params?.row?.products?.name : "-"}</p>
      ),
    },
    {
      field: "pointsType",
      headerName: "Points Type",
      width: 185,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.pointsType
            ? params?.row?.pointsType?.charAt(0)?.toUpperCase() +
              params?.row?.pointsType?.slice(1)?.toLowerCase()
            : "-"}
        </p>
      ),
    },
    {
      field: "purchaseType",
      headerName: "Purchase Type",
      width: 185,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.purchaseType
            ? params?.row?.purchaseType
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")
            : "-"}
        </p>
      ),
    },
    {
      field: "startAt",
      headerName: "Start Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.startAt
            ? format(new Date(params?.row?.startAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.endAt
            ? format(new Date(params?.row?.endAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <p>
          {params?.row?.createdAt
            ? format(new Date(params?.row?.createdAt), "d MMMM yyyy")
            : "-"}
        </p>
      ),
    },
    {
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <button
            variant="text"
            color="primary"
            style={{
              background: "rgba(11, 121, 116, 0.08)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              border: "none",
              marginRight: "10px",
            }}
            onClick={() => handleActionClick(params.row)}
          >
            <img src={eye} alt="dots" />
          </button>
          <div className="dec-btn-2">
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

  const tabs = [
    { label: "Scenario", columns: [...scenarioColumn] },
    { label: "Referral", columns: [...referralColumn] },
    { label: "General Spending", columns: [...generalSpendingColumn] },
    { label: "Geolocation", columns: [...geolocationColumn] },
    { label: "Multiply Earned Points", columns: [...multiplyPointsColumn] },
    { label: "Product Purchase", columns: [...productsPurchaseColumn] },
  ];

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
       className="admin-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="admin-dashboard-main-div">
          <div className="arl-main-div">
            <div className="arl-header-div">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="arl-title-design"></div>
                <div className="arl-title">Rules</div>
              </div>
            </div>
            <TabComp
              tabs={tabs.map((tab) => tab.label)}
              initial={activeTab}
              setActiveTab={handleTabChange}
            />
            <CustomTable
              rows={duplicateArray?.length ? duplicateArray : []}
              columns={tabs[activeTab].columns}
              page={page}
              totalPages={totalPages || 0}
              changePage={setPage}
              totalCount={totalCount || 0}
              pinnedLeftColumns={["fname"]}
              pageName="Rules"
              loading={isLoading}
            />
          </div>
        </Stack>
      </Stack>
      <RuleModal
        isModalOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        title="Earning Rules"
        data={selectedRule}
        cancelButtonText="Cancel"
        headingTitles={tabs[activeTab].label}
        activeTab={activeTab}
      />
    </div>
  );
};

export default RuleListing;
