import React from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  AdditionalButtonWrapper,
  AdditionalNotesBody,
  AdditionalNotesContainer,
  AdditionalNotesContainer2,
  ShopifyModalTextContainer,
  AdditionalNotesHeader,
  
} from "./Modals.style";

const ShopifyViewModal = ({
  isModalOpen,
  closeModal,
  title,
  data,
  cancelButtonText,
  headingTitles,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <AdditionalNotesContainer2>
        <AdditionalNotesHeader>
          <div style={{ display: "flex" }}>
            <div className="ptl-title-design"></div>
            <div className="ptl-title">{title}</div>
          </div>
          <CloseIcon
            sx={{ color: "black", cursor: "pointer" }}
            onClick={closeModal}
          />
        </AdditionalNotesHeader>
        <AdditionalNotesBody>
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                }}
              >
                <label
                  htmlFor="shopifyApiKey"
                  style={{ color: "#888888", fontSize: "13px" }}
                >
                  Shop Name
                </label>
                <p
                  id="shopifyApiKey"
                  style={{ fontWeight: "500" }}
                  type="text"
                  disabled={true}
                >
                  {data?.shopifyShopName}
                </p>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0px" }}
            >
              <label
                htmlFor="shopifyPassword"
                style={{ color: "#888888", fontSize: "13px" }}
              >
                API Key
              </label>
              <p
                id="shopifyPassword"
                style={{ fontWeight: "500" }}
                type="text"
                disabled={true}
              >
                {data?.shopifyApiKey}
              </p>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0px" }}
            >
              <label
                htmlFor="shopifyPassword"
                style={{ color: "#888888", fontSize: "13px" }}
              >
                Password
              </label>
              <p
                id="shopifyPassword"
                style={{ fontWeight: "500" }}
                type="text"
                disabled={true}
              >
                {data?.shopifyPassword}
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "2px",
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              color: "#6F767E",
              fontSize: "16px",
            }}
          >
            <div>
              <p>
                To enable the webhooks to get updated record of shopify store
                with platform
              </p>

              <p>1- Go to setting in account </p>
              <p>2- Go to notifications in account </p>
              <p>3- Go to webhooks in account </p>
              <p>4- Create webhook </p>
            </div>
            <div
              style={{ height: "1px", width: "auto", background: "#00000033" }}
            ></div>
            <div
              style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}
            >
              Events
            </div>
            <ShopifyModalTextContainer>
              <div
                style={{ fontSize: "16px", fontWeight: "500", color: "black" }}
              >
                {" "}
                For product created:
              </div>
              <p>
                Enter the url as API endpoint as setting, with the mobile number
                at end of the endpoint
                https://api.loyallocker.com/api/v2/merchant/webhook/product-created/:mobile
              </p>
              <div
              style={{ height: "1px", width: "auto", background: "#00000033" }}
            ></div>
            </ShopifyModalTextContainer>
            <ShopifyModalTextContainer>
              <div
                style={{ fontSize: "16px", fontWeight: "500", color: "black" }}
              >
                {" "}
                For product created:
              </div>
              <p>
                Enter the url as API endpoint as setting, with the mobile number
                at end of the endpoint
                https://api.loyallocker.com/api/v2/merchant/webhook/product-updated/:mobile
              </p>
              <div
              style={{ height: "1px", width: "auto", background: "#00000033" }}
            ></div>
            </ShopifyModalTextContainer>
            <ShopifyModalTextContainer>
              <div
                style={{ fontSize: "16px", fontWeight: "500", color: "black" }}
              >
                {" "}
                For product created:
              </div>
              <p>
                Enter the url as API endpoint as setting, with the mobile number
                at end of the endpoint
                https://api.loyallocker.com/api/v2/merchant/webhook/product-deleted/:mobile
              </p>
              <div
              style={{ height: "1px", width: "auto", background: "#00000033" }}
            ></div>
            </ShopifyModalTextContainer>
          </div>
        </AdditionalNotesBody>
        <AdditionalButtonWrapper>
          {/* <button
            style={{
              width: "340px",
              height: "52px",
              border: "1px solid #0B7974",
              color: "#0B7974",
              background: "white",
              borderRadius: "10px",
              marginTop: "40px",
              marginLeft: "380px",
              marginBottom: "10px",
              marginRight: "20px",
            }}
            onClick={closeModal}
          >
            {cancelButtonText}
          </button> */}
        </AdditionalButtonWrapper>
      </AdditionalNotesContainer2>
    </Modal>
  );
};

export default ShopifyViewModal;
