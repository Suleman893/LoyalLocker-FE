import React, { useState } from "react";
import { isAfter, format, differenceInSeconds } from "date-fns";
import { useDispatch } from "react-redux";
import { availEarningRule } from "../../redux/consumer/consumerThunk";
import { generateCouponCode } from "../../utils/couponCodeGenerator";
import eye from "../../assets/eye.png";
import copy from "../../assets/copy.png";
import { toast } from "react-toastify";

const RewardExpiryCounter = ({ expirationDate }) => {
  const currentDate = new Date();
  const expiryDateObj = new Date(expirationDate);
  const isExpired = !isAfter(expiryDateObj, currentDate);

  const formatTimeLeft = (expiryDate) => {
    const totalSeconds = differenceInSeconds(expiryDate, currentDate);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")} h ${minutes
      .toString()
      .padStart(2, "0")} min ${seconds.toString().padStart(2, "0")} sec`;
  };

  const timeLeft = formatTimeLeft(expiryDateObj);
  return (
    <div
      style={{
        fontSize: "12px",
        fontWeight: "700",
        marginTop: "5px",
        marginRight: "10px",
      }}
    >
      {isExpired ? "Reward ended" : `Ends in ${timeLeft}`}
    </div>
  );
};

const cardStyle = {
  width: "100%",
  height: "100%", // Make sure the card fills the height of its container
  border: "1px solid grey",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", // Ensure elements are spaced evenly within the card
  padding: "10px",
  boxSizing: "border-box",
};

const RewardEarnRuleCard = ({ itm, onView }) => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState(
    itm?.couponInfo[0]?.couponCode || null
  );

  const createCouponCode = () => {
    const generatedCoupon = generateCouponCode();
    setCouponCode(generatedCoupon);
    dispatch(availEarningRule({ id: itm.id, couponCode: generatedCoupon }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode).then(
      () => {
        toast.info("Coupon code copied to clipboard!", { theme: "colored" });
      },
      (err) => {
        toast.error("Failed to copy coupon code", { theme: "colored" });
      }
    );
  };

  return (
    <div style={cardStyle}>
      <div
        style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "black",
          padding: "10px",
        }}
      >
        {itm?.name}
      </div>
      <div
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "black",
          padding: "0 10px",
        }}
      >
        {itm.points} Points Get
      </div>
      <div
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "black",
          padding: "0 10px",
        }}
      >
        {itm?.eventId === 1 && (
          <>Minimum Transaction: ${itm?.minTransactionValue}</>
        )}
        {itm?.eventId === 3 && (
          <>Minimum Transaction: ${itm?.minTransactionValue}</>
        )}
        {itm?.eventId === 4 && (
          <>Distance from Store: {itm?.distanceFromStore} Miles</>
        )}
        {itm?.eventId === 5 && <>Multiplier: {itm?.multiplier}x</>}

        {itm?.eventId === 6 && <> Product Name: {itm?.productInfo?.title}</>}
      </div>

      <ul style={{ color: "grey", padding: "0 30px" }}>
        <li>Merchant: {itm?.merchantInfo?.brandName}</li>
        <li>
          Status:
          {itm?.status === "ACTIVE"
            ? ` ${format(new Date(itm?.startAt), "MM/dd/yyyy")} - ${format(
                new Date(itm?.endAt),
                "MM/dd/yyyy"
              )}`
            : " Always Active"}
        </li>
        <li>
          Purchase Type:
          {itm?.purchaseType === "FIRST_PURCHASE"
            ? " First Purchase"
            : " Every Purchase"}
        </li>
        {itm?.eventId === 5 &&
          itm?.productsInfo &&
          itm?.productsInfo?.length > 0 && (
            <li>
              Product:
              {itm?.productsInfo?.slice(0, 5).map((product, index, array) => (
                <span key={index}>
                  {product?.title}
                  {index < array.length - 1 && ", "}
                </span>
              ))}
              {itm?.productsInfo?.length > 5 && <span>...</span>}
            </li>
          )}
        {itm?.allStores ? (
          <li>On all Stores</li>
        ) : (
          itm?.storeInfo &&
          itm?.storeInfo?.length > 0 && (
            <>
              <li>
                Stores:{" "}
                {itm?.storeInfo?.slice(0, 5).map((store, index, array) => (
                  <span key={index}>
                    {store?.name}
                    {index < array.length - 1 && ", "}
                  </span>
                ))}
                {itm?.storeInfo?.length > 5 && <span>...</span>}
              </li>
            </>
          )
        )}
        <li> Description: {itm?.description}</li>
      </ul>
      <div
        style={{
          height: "30px",
          background: "#FFBC0F",
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <img
          width="20px"
          height="20px"
          style={{ marginTop: "5px" }}
          src="./images/flash_on.png"
          alt="Flash Sale"
        />
        <div
          style={{
            fontSize: "12px",
            fontWeight: "700",
            marginTop: "5px",
            marginRight: "10px",
          }}
        >
          Active
        </div>
        {itm?.status === "ACTIVE" && itm?.endAt && (
          <RewardExpiryCounter expirationDate={itm?.endAt} />
        )}
      </div>

      <div style={{ display: "flex" }}>
        {couponCode || itm?.couponInfo[0]?.couponCode ? (
          <div
            style={{
              background: "#e6f7f7",
              borderRadius: "15px",
              width: "300px",
              height: "55px",
              marginTop: "10px",
              // marginLeft: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
              fontWeight: "bold",
              color: "#0b7974",
            }}
          >
            <span style={{ overflowWrap: "anywhere" }}>
              {couponCode || itm?.couponInfo[0]?.couponCode}
            </span>
            <button
              onClick={copyToClipboard}
              style={{
                background: "#84c2bf",
                border: "none",
                borderRadius: "10px",
                height: "44px",
                width: "50px",
                color: "#0b7974",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              <img src={copy} alt="copy" />
            </button>
          </div>
        ) : (
          <button
            style={{
              background: "rgba(11, 121, 116, 1)",
              borderRadius: "15px",
              color: "white",
              width: "300px",
              height: "55px",
              border: "none",
              marginTop: "10px",
              // marginLeft: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            disabled={couponCode || itm?.couponInfo[0]?.couponCode || false}
            onClick={createCouponCode}
          >
            REDEEM
          </button>
        )}
        <button
          style={{
            background: "rgba(11, 121, 116, 1)",
            borderRadius: "15px",
            color: "white",
            width: "70px",
            height: "55px",
            border: "none",
            margin: "10px 10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => onView(itm)}
        >
          <img src={eye} alt="eye" />
        </button>
      </div>
    </div>
  );
};

export default RewardEarnRuleCard;
