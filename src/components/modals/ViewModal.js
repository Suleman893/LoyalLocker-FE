import React from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  AdditionalButtonWrapper,
  AdditionalNotesBody,
  AdditionalNotesContainer,
  AdditionalNotesHeader,
} from "./Modals.style";
import { format } from "date-fns";

const EventBasedContent = ({ data }) => {
  if (data?.eventId === 2) {
    return null;
  }

  let label = "";
  let content;

  if (data?.eventId === 6 || data?.eventId === 5) {
    label = "Product";
    content = data?.productInfo?.title ? (
      <p>{data.productInfo.title}</p>
    ) : data?.productsInfo?.length > 0 ? (
      <ProductList products={data} />
    ) : (
      "-"
    );
  } else if (data?.eventId === 1 || data?.eventId === 3) {
    label = "Minimum Transaction";
    content = data?.minTransactionValue ? (
      <p>{data?.minTransactionValue}</p>
    ) : (
      "-"
    );
  } else if (data?.eventId === 4) {
    label = "Distance from Store";
    content = data?.distanceFromStore ? <p>{data?.distanceFromStore} Miles</p> : "-";
  }

  return (
    <>
      <div
        style={{
          fontFamily: "bold",
          fontSize: "16px",
          color: "rgba(136, 136, 136, 1)",
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: "bold", fontSize: "20px" }}>{content}</div>
    </>
  );
};

// StoreList Component
const StoreList = ({ stores }) => {
  return (
    <>
      <div style={{ display: "flex", margin: "10px 0px" }}>
        {stores?.storeInfo && stores?.storeInfo?.length ? (
          stores?.storeInfo?.map((store, idx) => (
            <div
              key={idx}
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                borderRadius: "20px",
                border: "none",
                background: "rgba(11, 121, 116, 0.1)",
                fontSize: "12px",
                textAlign: "center",
                padding: "10px 15px",
              }}
            >
              {store?.name}
            </div>
          ))
        ) : (
          <p>-</p>
        )}
      </div>
    </>
  );
};

// ProductList Component
const ProductList = ({ products }) => {
  return (
    <>
      <div style={{ display: "flex", margin: "10px 0px" }}>
        {products?.productsInfo?.length ? (
          products?.productsInfo?.map((product, idx) => (
            <div
              key={idx}
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                borderRadius: "20px",
                border: "none",
                background: "rgba(11, 121, 116, 0.1)",
                fontSize: "12px",
                textAlign: "center",
                padding: "10px 15px",
              }}
            >
              {product?.title}
            </div>
          ))
        ) : (
          <p>-</p>
        )}
      </div>
    </>
  );
};

// ViewModal Component component//
const ViewModal = ({ isModalOpen, closeModal, title, data }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <AdditionalNotesContainer>
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
              display: "flex",
              flexDirection: "column",
              gridGap: "10px",
              padding: "0px 20px",
              height: "auto",
              overflowY: "scroll",
            }}
          >
            <div style={{ fontFamily: "700", fontSize: "23px" }}>
              Basic Information
            </div>
            <div
              style={{
                fontFamily: "bold",
                fontSize: "16px",
                color: "rgba(136, 136, 136, 1)",
              }}
            >
              Store Details
            </div>
            <StoreList stores={data} />
            <EventBasedContent data={data} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "30%",
              }}
            >
              <div>
                <p
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Expiration Date
                </p>
                <p style={{ color: "black", fontSize: "18px" }}>
                  {data?.expirationDate
                    ? format(new Date(data?.expirationDate), "MM/dd/yyyy")
                    : data?.expiryDate
                    ? format(new Date(data?.expiryDate), "MM/dd/yyyy")
                    : data?.endAt
                    ? format(new Date(data?.endAt), "MM/dd/yyyy")
                    : "-"}
                </p>
              </div>
              <div>
                <p
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Created Date
                </p>
                <p style={{ color: "black", fontSize: "18px" }}>
                  {data?.createdAt
                    ? format(new Date(data.createdAt), "MM/dd/yyyy")
                    : "-"}
                </p>
              </div>
            </div>
            <div style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}>
              Description
            </div>
            <p>
              {data?.claimInstruction
                ? data?.claimInstruction
                : data?.description
                ? data?.description
                : "-"}
            </p>
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
              marginLeft: "380px",
              marginBottom: '10px',
              marginRight: '20px'
            }}
            onClick={closeModal}
          >
            {cancelButtonText}
          </button> */}
        </AdditionalButtonWrapper>
      </AdditionalNotesContainer>
    </Modal>
  );
};

export default ViewModal;
