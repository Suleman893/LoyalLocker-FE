import React, { useEffect, useState } from "react";
import "./style.css";
import {
  Stack,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import SideBar from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TabComp from "../../../components/tabs/TabsComp";
import eye from "../../../assets/Admin images/eye.png";
import RuleModal from "../../../components/modals/RuleModal";
import CustomTable from "../../../components/customTable/CustomTable";
import { CustomSwitch } from "../../Admin/Admin-Consumer/Consumer_Listing/consumer.style";
import {
  duplicateEarningRule,
  getRuleOfMerchantByEvent,
} from "../../../redux/company/companyThunks";
import { changeRuleStatus } from "../../../redux/admin/adminThunks";
import { format, startOfDay } from "date-fns";
import { parseISO, isAfter, startOfToday } from "date-fns";
import { toast } from "react-toastify";
import group from "../../../assets/Group.png";
import icon from "../../../assets/Icon.png";
import { useNavigate } from "react-router-dom";

const CompanyRuleListing = () => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    ruleOfEvent,
    isLoading,
    isUpdate: isDuplicateUpdate,
  } = useSelector((state) => state.company);
  const { isUpdate } = useSelector((state) => state.admin);

  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAdditionalModal, setIsAdditionalModal] = useState(false);
  const [switchStatus, setSwitchStatus] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [duplicateArray, setDuplicateArray] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(
      getRuleOfMerchantByEvent({ id: activeTab + 1, page: page, pageSize: 8 })
    );
  }, [activeTab, isUpdate, page, isDuplicateUpdate]);

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
  }, [ruleOfEvent?.response, activeTab]);

  const editHandleClick = (row) => {
    navigate(`/edit_earning_rule/${row?.id}`, { state: { data: row } });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDuplicateRow = (row) => {
    dispatch(duplicateEarningRule({ id: row?.id }));
  };

  const scenarioColumn = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 90,
    },
    {
      field: "name",
      headerName: "Rule Name",
      width: 230,
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
      width: 120,
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
      width: 150,
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
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => editHandleClick(params.row)}
            >
              <img src={group} alt="" />
            </button>
          </div>
          <div className="dec-btn-2">
            <CustomSwitch
              size="small"
              checked={switchStatus[params.row.id] || false}
              onChange={() => handleChange(params.row)}
              sx={switchStatus[params.row.id] ? activeStyles : defaultStyles}
            />
          </div>
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => handleDuplicateRow(params.row)}
            >
              <img src={icon} alt="" />
            </button>
          </div>
        </div>
      ),
    },
  ];
  const referralColumn = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 90,
    },
    {
      field: "name",
      headerName: "Rule Name",
      width: 280,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.name ? params?.row?.name : "-"}</p>
      ),
    },
    {
      field: "points",
      headerName: "Earn Points",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.points ? params?.row?.points : "-"} </p>
      ),
    },
    {
      field: "pointsType",
      headerName: "Points Type",
      width: 200,
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
      width: 200,
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
      width: 200,
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
      width: 200,
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
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => editHandleClick(params.row)}
            >
              <img src={group} alt="" />
            </button>
          </div>
          <div className="dec-btn-2">
            <CustomSwitch
              size="small"
              checked={switchStatus[params.row.id] || false}
              onChange={() => handleChange(params.row)}
              sx={switchStatus[params.row.id] ? activeStyles : defaultStyles}
            />
          </div>
          <div>
            
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => handleDuplicateRow(params.row)}
            >
              <img src={icon} alt="" />
            </button>
          </div>
        </div>
      ),
    },
  ];
  const generalSpendingColumn = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 90,
    },
    {
      field: "name",
      headerName: "Rule Name",
      width: 250,
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
      width: 130,
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
      width: 150,
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
      width: 130,
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
      width: 130,
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
      width: 210,
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
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => editHandleClick(params.row)}
            >
              <img src={group} alt="" />
            </button>
          </div>
          <div className="dec-btn-2">
            <CustomSwitch
              size="small"
              checked={switchStatus[params.row.id] || false}
              onChange={() => handleChange(params.row)}
              sx={switchStatus[params.row.id] ? activeStyles : defaultStyles}
            />
          </div>
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => handleDuplicateRow(params.row)}
            >
              <img src={icon} alt="" />
            </button>
          </div>
        </div>
      ),
    },
  ];
  const geolocationColumn = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 90,
    },
    {
      field: "name",
      headerName: "Rule Name",
      width: 250,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.name ? params?.row?.name : "-"}</p>
      ),
    },
    {
      field: "points",
      headerName: "Earn Points",
      width: 150,
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
      width: 130,
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
      width: 130,
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
      width: 130,
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
      width: 210,
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
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => editHandleClick(params.row)}
            >
              <img src={group} alt="" />
            </button>
          </div>
          <div className="dec-btn-2">
            <CustomSwitch
              size="small"
              checked={switchStatus[params.row.id] || false}
              onChange={() => handleChange(params.row)}
              sx={switchStatus[params.row.id] ? activeStyles : defaultStyles}
            />
          </div>
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => handleDuplicateRow(params.row)}
            >
              <img src={icon} alt="" />
            </button>
          </div>
        </div>
      ),
    },
  ];
  const multiplyPointsColumn = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 90,
    },
    {
      field: "name",
      headerName: "Rule Name",
      width: 250,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.name ? params?.row?.name : "-"}</p>
      ),
    },
    {
      field: "points",
      headerName: "Earn Points",
      width: 130,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.points ? params?.row?.points : "-"} </p>
      ),
    },
    {
      field: "multiplier",
      headerName: "Multiplier",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.multiplier ? params?.row?.multiplier : "-"}</p>
      ),
    },
    {
      field: "pointsType",
      headerName: "Points Type",
      width: 135,
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
      width: 135,
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
      width: 150,
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
      width: 150,
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
      width: 210,
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
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => editHandleClick(params.row)}
            >
              <img src={group} alt="" />
            </button>
          </div>
          <div className="dec-btn-2">
            <CustomSwitch
              size="small"
              checked={switchStatus[params.row.id] || false}
              onChange={() => handleChange(params.row)}
              sx={switchStatus[params.row.id] ? activeStyles : defaultStyles}
            />
          </div>
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => handleDuplicateRow(params.row)}
            >
              <img src={icon} alt="" />
            </button>
          </div>
        </div>
      ),
    },
  ];
  const productsPurchaseColumn = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 90,
    },
    {
      field: "name",
      headerName: "Rule Name",
      width: 250,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.name ? params?.row?.name : "-"}</p>
      ),
    },
    {
      field: "points",
      headerName: "Earn Points",
      width: 140,
      editable: false,
      renderCell: (params) => (
        <p>{params?.row?.points ? params?.row?.points : "-"} </p>
      ),
    },
    {
      field: "products",
      headerName: "Product",
      width: 130,
      editable: false,
      renderCell: (params) => (
        <p>
          {params?.row?.productInfo?.title
            ? params?.row?.productInfo?.title
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
      width: 155,
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
      width: 150,
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
      width: 150,
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
      width: 150,
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
      width: 210,
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
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => editHandleClick(params.row)}
            >
              <img src={group} alt="" />
            </button>
          </div>
          <div className="dec-btn-2">
            <CustomSwitch
              size="small"
              checked={switchStatus[params.row.id] || false}
              onChange={() => handleChange(params.row)}
              sx={switchStatus[params.row.id] ? activeStyles : defaultStyles}
            />
          </div>
          <div>
            <button
              variant="text"
              color="primary"
              style={{
                background: "#FAFAFA",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                marginRight: "10px",
              }}
              onClick={() => handleDuplicateRow(params.row)}
            >
              <img src={icon} alt="" />
            </button>
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

  const handleTabChange = (index) => {
    setPage(1);
    setActiveTab(index);
  };

  const handleActionClick = (selected) => {
    setSelectedRule(selected);
    setIsAdditionalModal(true);
  };

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
       className="company-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="company-dashboard-main-div">
          <div className="p-main-div">
            <div className="arl-header-div">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="arl-title-design"></div>
                <div className="arl-title">Earning Rules</div>
              </div>
              <Link to="/add_earning_rules">
                <button
                  className="add-user-btn"
                  style={{
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
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      className="filter-icon"
                      src="./images/plus.png"
                      alt="plus"
                    />
                    <p> Add New Rule</p>
                  </div>
                </button>
              </Link>
            </div>
            <TabComp
              tabs={tabs}
              initial={activeTab}
              setActiveTab={handleTabChange}
            />
            <CustomTable
              rows={duplicateArray?.length ? duplicateArray : []}
              loading={isLoading}
              columns={tabs[activeTab].columns}
              page={page}
              totalPages={totalPages}
              changePage={setPage}
              pageName="Rules"
              totalCount={totalCount || 0}
            />
          </div>
        </Stack>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            backgroundColor: "#FAFAFA",
            borderRadius: "10px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon></ListItemIcon>
          <ListItemText
            sx={{
              color: "black",
            }}
          >
            Deactivate
          </ListItemText>
        </MenuItem>
        <div style={{ border: "1px soild grey" }}></div>
        <MenuItem>
          <ListItemIcon></ListItemIcon>
          <ListItemText sx={{ color: "black" }}>
            Duplicate this rule
          </ListItemText>
        </MenuItem>
      </Menu>
      <RuleModal
        isModalOpen={isAdditionalModal}
        closeModal={() => setIsAdditionalModal(false)}
        title="Earning Rules"
        data={selectedRule}
        cancelButtonText="Cancel"
        headingTitles={tabs[activeTab].label}
        activeTab={activeTab}
      />
    </div>
  );
};

export default CompanyRuleListing;
