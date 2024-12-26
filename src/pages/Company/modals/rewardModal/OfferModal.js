import React from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import {
  AdditionalButtonWrapper,
  AdditionalNotesBody,
  AdditionalNotesContainer,
  AdditionalNotesHeader,
} from "./rewardModal.style";

const OfferModal = ({
  isModalOpen,
  closeModal,
  title,
  data,
  cancelButtonText,
}) => {
  const renderBasicInfoRows = (labels) => {
    return labels.map((label) => {
      switch (label.title) {
        case "Store Details":
          return (
            <div key={label.title}>
              <div
                style={{ color: "rgba(111, 118, 126, 1)", fontSize: "14px" }}
              >
                {label.title}
              </div>
              {label.value?.length ? (
                <div style={{ display: "grid",gridTemplateColumns:'auto auto auto', gridGap: "5px" }}>
                  {label.value?.length &&
                    label.value.map((itm, idx) => <p key={idx}>{itm.name}</p>)}
                </div>
              ) : (
                "-"
              )}
            </div>
          );
        case "Created Date":
        case "Expiration Date":
          return (
            <div key={label.title}>
              <div
                style={{ color: "rgba(111, 118, 126, 1)", fontSize: "14px" }}
              >
                {label.title}
              </div>
              <div style={{ color: "black", fontSize: "18px" }}>
                {label.value
                  ? format(new Date(label.value), "d MMMM yyyy")
                  : "-"}
              </div>
            </div>
          );
        default:
          return (
            <div key={label.title}>
              <div
                style={{ color: "rgba(111, 118, 126, 1)", fontSize: "14px" }}
              >
                {label.title}
              </div>
              <div style={{ color: "black", fontSize: "18px" }}>
                {label.value ? label.value : "-"}
              </div>
            </div>
          );
      }
    });
  };

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
          <div style={{ fontWeight: "bold" }}>Basic Information</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              padding: "0px 20px",
            }}
          >
            {renderBasicInfoRows([
              { title: "Store Details", value: data?.storeInfo },
              { title: "Product", value: data?.productInfo?.title },
              { title: "Discount", value: data?.discountPercentage },
              { title: "Discount Price", value: data?.discountedPrice },
              { title: "Expiration Date", value: data?.expiryDate },
              { title: "Created Date", value: data?.createdAt },
              { title: "Description", value: data?.claimInstruction },
            ])}
          </div>
        </AdditionalNotesBody>
      </AdditionalNotesContainer>
    </Modal>
  );
};

export default OfferModal;
