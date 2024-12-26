import React, { useEffect, useState } from "react";
import "./style.css";
import { CircularProgress, Stack, Switch } from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import storeicon from "../../../../assets/Admin images/storeicon.png";
import ee from "../../../../assets/Admin images/ee.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allMerchants,
  merchantStatus,
} from "../../../../redux/admin/adminThunks";
import DateComp from "../../../../components/Date-Component/DateComp";
import Searchbar from "../../../../components/InputFields/SearchField";
import CompanyModal from "./CompanyModal";

const CompanyListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { companies, isUpdate, isLoading } = useSelector(
    (state) => state.admin
  );

  const [text, setText] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [statusChangeItem, setStatusChangeItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeStatus, setActiveStatus] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateSearch, setDateSearch] = useState(false);
  const [textSearch, setTextSearch] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isAdditionalModal, setIsAdditionalModal] = useState(false);

  const MAX_NAME_LENGTH = 10;
  const MAX_ADDRESS_LENGTH = 15;

  const handleCardClick = (item) => {
    setSelectedBrand(item);
    setIsAdditionalModal(true);
  };

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    dispatch(
      allMerchants({
        activeStatus,
        page: 1,
        pageSize: 8,
        startDate: startDate
          ? startDate.format("YYYY-MM-DD HH:mm:ss.SSS")
          : null,
        endDate: endDate ? endDate.format("YYYY-MM-DD HH:mm:ss.SSS") : null,
        text: text.length ? text : null,
      })
    );
  }, [isUpdate, activeStatus, dateSearch, textSearch]);

  const handleStatusChange = async (e, item) => {
    setStatusChangeItem(item);
    setShowModal(true);
  };

  const handleActiveChange = async () => {
    activeStatus ? setActiveStatus(null) : setActiveStatus("ACTIVE");
  };

  const DeactiveModal = ({ statusChangeItem }) => {
    const handleYes = async () => {
      dispatch(merchantStatus({ statusChangeItem }));
      setShowModal(false);
    };
    return (
      <div className="popup-overlay">
        <div className="dec-popup">
          <div className="dec-card-header">
            <div style={{ display: "flex" }}>
              {" "}
              <div className="dec-card-title-design"></div>
              <div className="dec-card-title">
                {`Do you really want to ${
                  statusChangeItem?.status === "INACTIVE"
                    ? "activate"
                    : "deactivate"
                }?`}
              </div>
            </div>
            <button className="dec-btn">
              <img
                src="./images/light.png"
                onClick={() => setShowModal(false)}
                alt="cross"
              />
            </button>
          </div>
          <div style={{ display: "flex" }}>
            <button
              className="dec-cancel-btn"
              onClick={() => setShowModal(false)}
            >
              cancel
            </button>
            <button className="dec-invite-btn" onClick={handleYes}>
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
        className="admin-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="admin-dashboard-main-div">
          <div className="admin-store-main-div">
            <div className="cl-header-div">
              <div className="" style={{ display: "flex" }}>
                <div className="cl-title-design"></div>
                <div className="cl-title">Companies / Brands</div>
              </div>
              <div style={{ display: "flex" }}>
                <select
                  style={{
                    outline: "none",
                    width: "99px",
                    height: "40px",
                    borderRadius: "10px",
                    border: "1px solid rgba(239, 239, 239, 1)",
                    paddingLeft: "10px",
                    color: "rgba(111, 118, 126, 1)",
                    marginRight: "10px",
                    marginTop: "20px",
                  }}
                  className="ui dropdown"
                  value={activeStatus || ""}
                  onChange={(e) => handleActiveChange(e.target.value)}
                >
                  <option value="">All </option>
                  <option value="ACTIVE">Active </option>
                </select>
                <button
                  className="cl-add-btn"
                  onClick={() => navigate("/add_company")}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      className="filter-icon"
                      src="./images/plus.png"
                      alt="plus"
                    />
                    <p> Add Company</p>
                  </div>
                </button>
              </div>
            </div>
            <div
              className="input-container"
            >
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
                placeholder="Search by brand name"
                border="1px solid rgba(189, 189, 189, 1)"
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
            {isLoading ? (
              <div className="loader-container">
                <CircularProgress style={{ color: "rgba(11, 121, 116, 1)" }} />
              </div>
            ) : (
              <div className="cl-card-container">
                {companies && companies?.length ? (
                  companies?.map((itm, idx) => (
                    <div className="cl-card" key={itm.id}>
                      <img
                        className="cl-card-img"
                        src={storeicon}
                        alt=""
                        onClick={() => handleCardClick(itm)}
                      />
                      <div
                        style={{ marginTop: "30px" }}
                        onClick={() => handleCardClick(itm)}
                      >
                        <div className="cl-brand-name">
                          {" "}
                          {truncateText(itm?.brandName, MAX_NAME_LENGTH)}
                        </div>
                        <div className="cl-email">
                          {truncateText(itm?.user?.email, MAX_ADDRESS_LENGTH)}
                        </div>
                        <div className="cl-number">{itm?.user?.mobile}</div>
                      </div>
                      <div className="cl-btns">
                        <button
                          className="cl-edit-btn"
                          onClick={() => navigate(`/edit_company/${itm?.id}`)}
                        >
                          <img src={ee} alt="" />
                        </button>
                        <button className="cl-switch-btn">
                          <Switch
                            size="small"
                            sx={{ marginRight: "20px" }}
                            defaultChecked
                            color="default"
                            checked={itm?.status === "ACTIVE" ? true : false}
                            onChange={(e) => handleStatusChange(e, itm)}
                          />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ paddingLeft: "20px", fontSize: "20px" }}>
                    No companies
                  </p>
                )}
              </div>
            )}
          </div>
        </Stack>
      </Stack>
      {showModal && <DeactiveModal statusChangeItem={statusChangeItem} />}
      <CompanyModal
        isModalOpen={isAdditionalModal}
        closeModal={() => setIsAdditionalModal(false)}
        title="Company Details"
        data={selectedBrand}
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default CompanyListing;
