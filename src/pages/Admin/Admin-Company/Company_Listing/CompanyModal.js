import React from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  AdditionalButtonWrapper,
  AdditionalNotesBody,
  AdditionalNotesContainer,
  AdditionalNotesHeader,
  AdminAllCompanyModalContainer
} from "../../../../components/modals/Modals.style";

const CompanyModal = ({
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
      <AdminAllCompanyModalContainer>
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
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "14px" }}
                >
                  Brand Name
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.brandName}
                </p>
              </div>
              <div>
                <p
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "14px" }}
                >
                  First Name
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.user?.firstName}
                </p>
              </div>
              <div>
                <p
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "14px" }}
                >
                  Last Name
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.user?.lastName}
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
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "14px" }}
                >
                  Phone Number
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.user?.mobile}
                </p>
              </div>
              <div>
                <p
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "14px" }}
                >
                  Currency
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.currency}
                </p>
              </div>

              <div>
                <p
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "14px" }}
                >
                  Primary Email
                </p>
                <p
                  style={{
                    color: "rgba(35, 35, 35, 1)",
                    fontSize: "18px",
                  }}
                >
                  {data?.user?.email}
                </p>
              </div>
            </div>
          </div>
        </AdditionalNotesBody>
      </AdminAllCompanyModalContainer>
    </Modal>
  );
};

export default CompanyModal;
