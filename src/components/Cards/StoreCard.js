import React, { useState } from "react";
import "./style.css";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeStoreStatus } from "../../redux/company/companyThunks";

const StoreCard = ({ width, showSwitch, item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const MAX_NAME_LENGTH = 20;
  const MAX_ADDRESS_LENGTH = 30;

  const [statusChangeItem, setStatusChangeItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleStatusChange = async (e, item) => {
    setStatusChangeItem(item);
    setShowModal(true);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  
  const DeactiveModal = ({ statusChangeItem }) => {
    const handleYes = async () => {
      dispatch(changeStoreStatus({ statusChangeItem }));
      setShowModal(false);
    };

    return (
      <div className="popup-overlay">
        <div className="dec-popup">
          <div className="dec-card-header">
            <div style={{ display: "flex" }}>
              
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
                onClick={() => {
                  navigate("/company_store_detail", { state: item });
                }}
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
    <div
      className="store-card"
      style={{
        width: width,
      }}
    >
      <div style={{ display: "flex" }}>
        <img
          style={{
            objectFit: "fill",
            width: "80px",
            height: "80px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
          src="./images/storeicon.png"
          onClick={() => {
            navigate("/company_store_detail", { state: item });
          }}
          alt="storeicon"
        />
        <div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#1F074F",
              paddingLeft: "20px",
            }}
            onClick={() => {
              navigate("/company_store_detail", { state: item });
            }}
          >
            {truncateText(item?.name, MAX_NAME_LENGTH)}
          </p>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#22222299",
              paddingLeft: "20px",
            }}
            onClick={() => {
              navigate("/company_store_detail", { state: item });
            }}
          >
            {truncateText(item?.address, MAX_ADDRESS_LENGTH)}
          </div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#22222299",
              paddingLeft: "20px",
            }}
            onClick={() => {
              navigate("/company_store_detail", { state: item });
            }}
          >
            {item?.locationCity}
          </p>
        </div>
        {showSwitch && (
          <button
            style={{
              width: "42px",
              height: "40px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(11, 121, 116, 1)",
              marginTop: "20px",
              marginLeft: "90px",
            }}
          >
            <Switch
              size="small"
              sx={{ marginRight: "20px" }}
              defaultChecked
              color="default"
            />
          </button>
        )}
      </div>
      <div className="cl-btns">
        <button className="cl-switch-btn">
          <Switch
            size="small"
            sx={{ marginRight: "20px" }}
            defaultChecked
            color="default"
            checked={item?.status === "ACTIVE" ? true : false}
            onChange={(e) => handleStatusChange(e, item)}
          />
        </button>
      </div>
      {showModal && <DeactiveModal statusChangeItem={statusChangeItem} />}
    </div>
  );
};

export default StoreCard;
