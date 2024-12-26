import React from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  AdditionalButtonWrapper,
  AdditionalNotesBody,
  AdditionalNotesContainer,
  AdditionalNotesHeader,
} from "./Modals.style";

const PointModal = ({
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
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gridGap: "10px",
                padding: "0px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "rgba(111, 118, 126, 1)",
                      fontSize: "14px",
                    }}
                  >
                    First Name
                  </p>
                  <p
                    style={{
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    {data?.consumerInfo?.firstName || "-"}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      color: "rgba(111, 118, 126, 1)",
                      fontSize: "14px",
                    }}
                  >
                    Last Name
                  </p>
                  <p
                    style={{
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    {data?.consumerInfo?.lastName || "-"}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "rgba(111, 118, 126, 1)",
                      fontSize: "14px",
                    }}
                  >
                    Email address
                  </p>
                  <p
                    style={{
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    {data?.consumerInfo?.email || "-"}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      color: "rgba(111, 118, 126, 1)",
                      fontSize: "14px",
                    }}
                  >
                    Points
                  </p>
                  <p
                    style={{
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    {data?.points || "-"}
                  </p>
                </div>
              </div>
            </div>
          </>
        </AdditionalNotesBody>
      </AdditionalNotesContainer>
    </Modal>
  );
};

export default PointModal;
