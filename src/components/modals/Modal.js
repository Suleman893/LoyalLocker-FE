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

const ModalComp = ({
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
          {data?.userInfo?.firstName && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gridGap: "10px",
                  padding: "0px 20px",
                }}
              >
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  Basic Information
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
                      First Name
                    </p>
                    <p
                      style={{
                        color: "black",
                        fontSize: "18px",
                      }}
                    >
                      {data?.userInfo?.firstName || "-"}
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
                      {data?.userInfo?.lastName || "-"}
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
                      {data?.userInfo?.email || "-"}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "rgba(111, 118, 126, 1)",
                        fontSize: "14px",
                      }}
                    >
                      Phone Number
                    </p>
                    <p
                      style={{
                        color: "black",
                        fontSize: "18px",
                      }}
                    >
                      {data?.userInfo?.mobile || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* Order info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gridGap: "10px",
              padding: "0px 20px",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "600" }}>
              Order Details
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Transaction Type
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  {data?.transactionType}
                </p>
              </div>
              <div>
                <p
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  {data?.transactionType === "Reward"
                    ? "Reward Name"
                    : "Offer on Product"}
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  {data?.rewardInfo
                    ? data?.rewardInfo?.name
                    : data?.offerInfo
                    ? data?.offerInfo?.productInfo?.title
                    : " -"}
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
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Product
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  {data?.rewardInfo
                    ? data?.rewardInfo?.productInfo?.title
                    : data?.offerInfo
                    ? data?.offerInfo?.productInfo?.title
                    : " -"}
                </p>
              </div>
              <div>
                <p
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  {data?.transactionType === "Reward"
                    ? "Points"
                    : "Discounted Price"}
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  {data?.transactionType === "Reward"
                    ? data?.points
                    : data?.discountedPrice}
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
                    fontSize: "13px",
                  }}
                >
                  Transaction Date
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  {data?.transactionDate
                    ? format(new Date(data?.transactionDate), "d MMMM yyyy")
                    : "-"}
                </p>
              </div>
              {/* <div>
                <p
                  style={{
                    color: "rgba(111, 118, 126, 1)",
                    fontSize: "13px",
                  }}
                >
                  Points Expiring on
                </p>
                <p
                  style={{
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  {data?.points}
                </p>
              </div> */}
            </div>
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
            //   marginTop: "40px",
              marginLeft: "380px",
              marginBottom:'10px',
              marginRight:'20px'
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

export default ModalComp;
