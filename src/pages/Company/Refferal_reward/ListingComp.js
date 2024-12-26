import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import {  Stack } from "@mui/material";
import { CustomSwitch } from "../../Admin/Admin-Consumer/Consumer_Listing/consumer.style";
import CustomTable from "../../../components/customTable/CustomTable";
import { Link } from "react-router-dom";
import ToggleButton from "../../../components/Buttons/ToggleButton";
import eye from "../../../assets/Admin images/eye.png";
import group from "../../../assets/Group.png";
import RewardModal from "../modals/rewardModal/RewardModal";
import OfferModal from "../modals/rewardModal/OfferModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOfferStatus,
  changeRewardStatus,
  getOffers,
  getRewards,
} from "../../../redux/company/companyThunks";

const ListingComp = () => {
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

  const allRewards = useSelector((state) => state.company.allRewards);
  const allOffers = useSelector((state) => state.company.allOffers);
  const { isLoading } = useSelector((state) => state.company);

  const [page, setPage] = useState(1);
  const [duplicateArray, setDuplicateArray] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [activeButton, setActiveButton] = useState("Reward");
  const [collapsed, setCollapsed] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [rewardSwitchStatus, setRewardSwitchStatus] = useState({});
  const [offerSwitchStatus, setOfferSwitchStatus] = useState({});
  const [totalPages, setTotalPages] = useState(null);
  const [totalCount, setTotalCounts] = useState(null);

  useEffect(() => {
    setPage(1);
    setTotalPages(null);
    setTotalCounts(null);
  }, [activeButton]);

  useEffect(() => {
    if (activeButton === "Reward") {
      dispatch(getRewards({ page: page, pageSize: 8 }));
    } else if (activeButton === "Offer") {
      dispatch(getOffers({ page: page, pageSize: 8 }));
    }
  }, [activeButton, page]);

  useEffect(() => {
    if (activeButton === "Reward") {
      if (allRewards?.response?.length) {
        const updatedArray = allRewards?.response?.map((item, index) => ({
          ...item,
          srNo: index + 1,
        }));
        setDuplicateArray(updatedArray);
        setTotalPages(allRewards?.totalPages);
        setTotalCounts(allRewards?.totalCount);
        const newSwitchStatus = {};
        updatedArray.forEach((item) => {
          newSwitchStatus[item.id] = item.status === "ACTIVE";
        });
        setRewardSwitchStatus(newSwitchStatus);
      } else setDuplicateArray([]);
    } else if (activeButton === "Offer") {
      if (allOffers?.response?.length) {
        const updatedArray = allOffers?.response?.map((item, index) => ({
          ...item,
          srNo: index + 1,
        }));
        setDuplicateArray(updatedArray);
        setTotalPages(allOffers?.totalPages);
        setTotalCounts(allOffers?.totalCount);
        const newSwitchStatus = {};
        updatedArray.forEach((item) => {
          newSwitchStatus[item.id] = item.status === "ACTIVE";
        });
        setOfferSwitchStatus(newSwitchStatus);
      } else setDuplicateArray([]);
    }
  }, [allRewards?.response, allOffers?.response]);

  const selectReward = (rewardRec) => {
    setSelectedData(rewardRec);
    setIsRewardModalOpen(true);
  };

  const selectOffer = (offerRec) => {
    setSelectedData(offerRec);
    setIsOfferModalOpen(true);
  };

  const rewardColumns = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 190,
      editable: true,
    },
    {
      field: "name",
      headerName: "Reward Name",
      width: 200,
      editable: true,
    },
    {
      field: "rewardPoints",
      headerName: "Reward Points",
      width: 200,
      editable: true,
    },
    {
      field: "product",
      headerName: "Product ID",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return <p>{params?.row?.productInfo?.productId || ""}</p>;
      },
    },
    {
      field: "expiryDate",
      headerName: "Expiration Date",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.expirationDate
              ? new Date(params?.row?.expirationDate).toLocaleDateString(
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
      field: "createdAt",
      headerName: "Created Date",
      sortable: false,
      width: 290,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.createdAt
              ? new Date(params?.row?.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"}
          </p>
        );
      },
    },
    {
      headerName: "Action",
      width: 240,
      editable: false,
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
            onClick={() => selectReward(params.row)}
          >
            <img src={eye} alt="dots" />
          </button>
          <button
            className="dec-btn-1"
            onClick={() =>
              navigate(
                `/edit/${activeButton === "Reward" ? "reward" : "offer"}/${
                  params.row.id
                }`
              )
            }
          >
            <img src={group} alt="edit" />{" "}
          </button>
          <div className="dec-btn-1">
            <CustomSwitch
              size="small"
              checked={rewardSwitchStatus[params.row.id] || false}
              onChange={() => {
                setRewardSwitchStatus((prevStatus) => ({
                  ...prevStatus,
                  [params.row.id]: !prevStatus[params.row.id],
                }));
                dispatch(changeRewardStatus({ id: params.row.id }));
              }}
              sx={
                rewardSwitchStatus[params.row.id] ? activeStyles : defaultStyles
              }
            />
          </div>
        </div>
      ),
    },
  ];

  const offerColumns = [
    {
      field: "srNo",
      headerName: "Sr#.",
      width: 90,
    },
    {
      field: "storeInfo",
      headerName: "Store Name",
      width: 150,
      renderCell: (params) => {
        const storeNames = params?.row?.storeInfo
          ?.map((store) => store?.name)
          .join(", ");
        return <p>{storeNames}</p>;
      },
    },
    {
      field: "product",
      headerName: "Product",
      width: 150,
      renderCell: (params) => {
        return <p>{params?.row?.productInfo?.title || ""}</p>;
      },
    },
    {
      field: "discountPercentage",
      headerName: "Discount",
      width: 150,
      renderCell: (params) => {
        return <p>{params?.row?.discountPercentage+"%"|| ""}</p>;
      },
    },
    {
      field: "discountedPrice",
      headerName: "Price",
      width: 150,
      renderCell: (params) => {
        return <p>{params?.row?.discountedPrice || 0}</p>;
      },
    },
    {
      field: "expiryDate",
      headerName: "Expiration Date",
      sortable: false,
      width: 290,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.expiryDate
              ? new Date(params?.row?.expiryDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"}
          </p>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      sortable: false,
      width: 290,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.createdAt
              ? new Date(params?.row?.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"}
          </p>
        );
      },
    },
    {
      headerName: "Action",
      width: 240,
      editable: false,
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
            onClick={() => selectOffer(params.row)}
          >
            <img src={eye} alt="dots" />
          </button>
          <button
            className="dec-btn-1"
            onClick={() =>
              navigate(
                `/edit/${activeButton === "Reward" ? "reward" : "offer"}/${
                  params.row.id
                }`
              )
            }
          >
            <img src={group} alt="edit" />{" "}
          </button>
          <div className="dec-btn-1">
            <CustomSwitch
              size="small"
              checked={offerSwitchStatus[params.row.id] || false}
              onChange={() => {
                setOfferSwitchStatus((prevStatus) => ({
                  ...prevStatus,
                  [params.row.id]: !prevStatus[params.row.id],
                }));
                dispatch(changeOfferStatus({ id: params.row.id }));
              }}
              sx={
                offerSwitchStatus[params.row.id] ? activeStyles : defaultStyles
              }
            />
          </div>
        </div>
      ),
    },
  ];

  const columns = activeButton === "Reward" ? rewardColumns : offerColumns;
  const rewardButtonText =
    activeButton === "Reward" ? "Create Reward" : "Create Offer";

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
      className="company-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="company-dashboard-main-div">
          <div className="ccl-main-div">
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
                <ToggleButton
                  setActiveButton={setActiveButton}
                  activeButton={activeButton}
                />
              </div>
              <div>
                <Link
                  to={`/add/${activeButton === "Reward" ? "reward" : "offer"}`}
                >
                  <button
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
                    {rewardButtonText}
                  </button>
                </Link>
              </div>
            </div>
            <div style={{ position: "relative", minHeight: "100vh" }}>
              <CustomTable
                rows={duplicateArray}
                loading={isLoading}
                columns={columns}
                pinnedLeftColumns={["fname"]}
                page={page}
                totalPages={totalPages}
                totalCount={totalCount || 0}
                changePage={setPage}
                pageName={activeButton === "Reward" ? "Rewards" : "Offers"}
              />
            </div>
          </div>
        </Stack>
      </Stack>
      <RewardModal
        isModalOpen={isRewardModalOpen}
        closeModal={() => setIsRewardModalOpen(false)}
        title="Reward View"
        data={selectedData}
      />
      <OfferModal
        isModalOpen={isOfferModalOpen}
        closeModal={() => setIsOfferModalOpen(false)}
        title="Offer View"
        data={selectedData}
      />
    </div>
  );
};

export default ListingComp;
