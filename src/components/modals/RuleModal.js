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

const RuleModal = ({
  isModalOpen,
  closeModal,
  title,
  data,
  cancelButtonText,
  headingTitles,
  activeTab,
}) => {
  const displayDate =
    data?.status === "ALWAYS_ACTIVE"
      ? `${format(new Date(data?.startAt), "dd MMMM yyyy")} - Onwards`
      : data?.status === "ACTIVE"
      ? `${format(new Date(data?.startAt), "dd MMMM yyyy")} - ${format(
          new Date(data?.endAt),
          "dd MMMM yyyy"
        )}`
      : "";

  const renderModalContent = (data) => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <div style={{ fontWeight: "bold", fontSize: "18px",padding:'0 20px' }}>
              Basic Information
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Type
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.eventInfo?.name ? data?.eventInfo?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Name
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.name ? data?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Description
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.description ? data?.description : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold", fontSize: "18px",padding: "0px 20px", }}>
              Rule Type Details
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity points
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.points ? data?.points : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Minimum Transaction Value
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.minTransactionValue ? data?.minTransactionValue : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity Status
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.status
                    ? data?.status?.includes("_")
                      ? data?.status
                          ?.split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : data?.status?.charAt(0).toUpperCase() +
                        data?.status?.slice(1).toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Start Date - End Date
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {displayDate}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Point Type
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.pointsType
                    ? data?.pointsType?.charAt(0)?.toUpperCase() +
                      data?.pointsType?.slice(1)?.toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Purchase Type
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.purchaseType
                    ? data?.purchaseType
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")
                    : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Created Date
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.createdAt
                    ? format(new Date(data?.createdAt), "d MMMM yyyy")
                    : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold" ,padding: "0px 20px",}}>Store Details</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Stores
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.allStores ? (
                    <p>All stores</p>
                  ) : (
                    data?.storeInfo &&
                    data?.storeInfo?.length > 0 && (
                      <>
                        <p>
                          {data?.storeInfo
                            ?.slice(0, 5)
                            .map((store, index, array) => (
                              <span key={index}>
                                {store?.name}
                                {index < array.length - 1 && ", "}
                              </span>
                            ))}
                          {data?.storeInfo?.length > 5 && <span>...</span>}
                        </p>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div style={{ fontWeight: "bold", fontSize: "18px",padding:'0 20px' }}>
              Basic Information
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Type
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.eventInfo?.name ? data?.eventInfo?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Name
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.name ? data?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Description
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.description ? data?.description : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold", fontSize: "18px",padding: "0px 20px", }}>
              Rule Type Details
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity points
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.points ? data?.points : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Point Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.pointsType
                    ? data?.pointsType?.charAt(0)?.toUpperCase() +
                      data?.pointsType?.slice(1)?.toLowerCase()
                    : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity Status
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.status
                    ? data?.status?.includes("_")
                      ? data?.status
                          ?.split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : data?.status?.charAt(0).toUpperCase() +
                        data?.status?.slice(1).toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Start Date - End Date
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {displayDate}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Created Date
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.createdAt
                    ? format(new Date(data?.createdAt), "d MMMM yyyy")
                    : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold" ,padding: "0px 20px",}}>Store Details</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Stores
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.allStores ? (
                    <p>All stores</p>
                  ) : (
                    data?.storeInfo &&
                    data?.storeInfo?.length > 0 && (
                      <>
                        <p>
                          {data?.storeInfo
                            ?.slice(0, 5)
                            .map((store, index, array) => (
                              <span key={index}>
                                {store?.name}
                                {index < array.length - 1 && ", "}
                              </span>
                            ))}
                          {data?.storeInfo?.length > 5 && <span>...</span>}
                        </p>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div style={{ fontWeight: "bold", fontSize: "18px",padding:'0 20px' }}>
              Basic Information
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.eventInfo?.name ? data?.eventInfo?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Name
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.name ? data?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Description
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.description ? data?.description : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold", fontSize: "18px",padding: "0px 20px", }}>
              Rule Type Details
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity points
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.points ? data?.points : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Minimum Transaction Value
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.minTransactionValue ? data?.minTransactionValue : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity Status
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.status
                    ? data?.status?.includes("_")
                      ? data?.status
                          ?.split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : data?.status?.charAt(0).toUpperCase() +
                        data?.status?.slice(1).toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Start Date - End Date
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {displayDate}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Point Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.pointsType
                    ? data?.pointsType?.charAt(0)?.toUpperCase() +
                      data?.pointsType?.slice(1)?.toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Purchase Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.purchaseType
                    ? data?.purchaseType
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")
                    : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Created Date
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.createdAt
                    ? format(new Date(data?.createdAt), "d MMMM yyyy")
                    : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold",padding: "0px 20px", }}>Store Details</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Stores
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.allStores ? (
                    <p>All stores</p>
                  ) : (
                    data?.storeInfo &&
                    data?.storeInfo?.length > 0 && (
                      <>
                        <p>
                          {data?.storeInfo
                            ?.slice(0, 5)
                            .map((store, index, array) => (
                              <span key={index}>
                                {store?.name}
                                {index < array.length - 1 && ", "}
                              </span>
                            ))}
                          {data?.storeInfo?.length > 5 && <span>...</span>}
                        </p>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div style={{ fontWeight: "bold", fontSize: "18px",padding:'0 20px' }}>
              Basic Information
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.eventInfo?.name ? data?.eventInfo?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Name
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.name ? data?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Description
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.description ? data?.description : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold", fontSize: "18px",padding: "0px 20px", }}>
              Rule Type Details
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity points
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.points ? data?.points : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Distance From Store
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.distanceFromStore ? data?.distanceFromStore : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity Status
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.status
                    ? data?.status?.includes("_")
                      ? data?.status
                          ?.split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : data?.status?.charAt(0).toUpperCase() +
                        data?.status?.slice(1).toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Start Date - End Date
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {displayDate}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Point Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.pointsType
                    ? data?.pointsType?.charAt(0)?.toUpperCase() +
                      data?.pointsType?.slice(1)?.toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Purchase Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.purchaseType
                    ? data?.purchaseType
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")
                    : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Created Date
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.createdAt
                    ? format(new Date(data?.createdAt), "d MMMM yyyy")
                    : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold" ,padding: "0px 20px",}}>Store Details</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Stores
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.allStores ? (
                    <p>All stores</p>
                  ) : (
                    data?.storeInfo &&
                    data?.storeInfo?.length > 0 && (
                      <>
                        <p>
                          {data?.storeInfo
                            ?.slice(0, 5)
                            .map((store, index, array) => (
                              <span key={index}>
                                {store?.name}
                                {index < array.length - 1 && ", "}
                              </span>
                            ))}
                          {data?.storeInfo?.length > 5 && <span>...</span>}
                        </p>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div style={{ fontWeight: "bold",padding:'0 20px' }}>Basic Information</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.eventInfo?.name ? data?.eventInfo?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Name
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.name ? data?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Description
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.description ? data?.description : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold", fontSize: "18px",padding: "0px 20px", }}>
              Rule Type Details
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity points
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.points ? data?.points : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Multiplier
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.multiplier ? data?.multiplier + "x" : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity Status
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.status
                    ? data?.status?.includes("_")
                      ? data?.status
                          ?.split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : data?.status?.charAt(0).toUpperCase() +
                        data?.status?.slice(1).toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Start Date - End Date
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {displayDate}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Point Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.pointsType
                    ? data?.pointsType?.charAt(0)?.toUpperCase() +
                      data?.pointsType?.slice(1)?.toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Purchase Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.purchaseType
                    ? data?.purchaseType
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")
                    : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Created Date
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.createdAt
                    ? format(new Date(data?.createdAt), "d MMMM yyyy")
                    : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold",padding: "0px 20px", }}>Store Details</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Stores
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.allStores ? (
                    <p>All stores</p>
                  ) : (
                    data?.storeInfo &&
                    data?.storeInfo?.length > 0 && (
                      <>
                        <p>
                          {data?.storeInfo
                            ?.slice(0, 5)
                            .map((store, index, array) => (
                              <span key={index}>
                                {store?.name}
                                {index < array.length - 1 && ", "}
                              </span>
                            ))}
                          {data?.storeInfo?.length > 5 && <span>...</span>}
                        </p>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div style={{ fontWeight: "bold",padding:'0 20px' }}>Basic Information</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Type
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.eventInfo?.name ? data?.eventInfo?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Name
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.name ? data?.name : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Rule Description
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.description ? data?.description : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold", fontSize: "18px",padding: "0px 20px", }}>
              Rule Type Details
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity points
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.points ? data?.points : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Product
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.productInfo?.title ? data?.productInfo?.title : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Activity Status
                </div>
                <div
                  style={{
                    color: "black",

                    fontSize: "18px",
                  }}
                >
                  {data?.status
                    ? data?.status?.includes("_")
                      ? data?.status
                          ?.split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : data?.status?.charAt(0).toUpperCase() +
                        data?.status?.slice(1).toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Start Date - End Date
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {displayDate}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Point Type
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.pointsType
                    ? data?.pointsType?.charAt(0)?.toUpperCase() +
                      data?.pointsType?.slice(1)?.toLowerCase()
                    : "-"}
                </div>
              </div>
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Purchase Type
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.purchaseType
                    ? data?.purchaseType
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")
                    : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Created Date
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.createdAt
                    ? format(new Date(data?.createdAt), "d MMMM yyyy")
                    : "-"}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold",padding: "0px 20px", }}>Store Details</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "0px 20px",
              }}
            >
              <div>
                <div
                  style={{ color: "rgba(111, 118, 126, 1)", fontSize: "13px" }}
                >
                  Stores
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {data?.allStores ? (
                    <p>All stores</p>
                  ) : (
                    data?.storeInfo &&
                    data?.storeInfo?.length > 0 && (
                      <>
                        <p>
                          {data?.storeInfo
                            ?.slice(0, 5)
                            .map((store, index, array) => (
                              <span key={index}>
                                {store?.name}
                                {index < array.length - 1 && ", "}
                              </span>
                            ))}
                          {data?.storeInfo?.length > 5 && <span>...</span>}
                        </p>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
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
        <AdditionalNotesBody>{renderModalContent(data)}</AdditionalNotesBody>
      </AdditionalNotesContainer>
    </Modal>
  );
};

export default RuleModal;
