import React, { useState } from "react";
import { isAfter, format, differenceInSeconds } from "date-fns";
import { useDispatch } from "react-redux";
import { availOffer } from "../../redux/consumer/consumerThunk";
import { generateCouponCode } from "../../utils/couponCodeGenerator";
import eye from "../../assets/eye.png";
import copy from "../../assets/copy.png";
import { toast } from "react-toastify";

const OfferExpiryCounter = ({ expiryDate }) => {
  const currentDate = new Date();
  const expiryDateObj = new Date(expiryDate);
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
      {isExpired ? "Offer ended" : `Ends in ${timeLeft}`}
    </div>
  );
};

const cardStyle = {
  width: "100%",
  height: "100%",
  border: "1px solid grey",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "10px",
  boxSizing: "border-box",
};

const OfferCards = ({ itm, onView }) => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState(
    itm?.couponInfo[0]?.couponCode || null
  );

  const createCouponCode = () => {
    const generatedCoupon = generateCouponCode();
    setCouponCode(generatedCoupon);
    dispatch(availOffer({ id: itm.id, couponCode: generatedCoupon }));
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
          fontSize: "22px",
          fontWeight: "700",
          paddingLeft: "30px",
          paddingTop: "20px",
        }}
      >
        {itm?.productInfo?.title}
      </div>
      <div
        style={{
          fontSize: "28px",
          fontWeight: "600",
          paddingLeft: "30px",
          paddingTop: "10px",
        }}
      >
        {itm?.discountPercentage} % OFF
      </div>
      <div
        style={{
          fontSize: "16px",
          fontWeight: "700",
          paddingLeft: "30px",
          paddingTop: "10px",
        }}
      >
        <span style={{ color: "red", textDecoration: "line-through" }}>
          {itm?.productInfo?.price}
        </span>{" "}
        <span style={{ color: "black" }}>$ {itm?.discountedPrice}</span>
      </div>
      <ul style={{ color: "grey", padding: "0 30px" }}>
        <li>
          Merchant:{" "}
          {itm?.merchantInfo?.brandName ? itm?.merchantInfo?.brandName : "-"}
        </li>
        <li>
          Expires on:{" "}
          {itm?.expiryDate
            ? format(new Date(itm.expiryDate), "MM/dd/yyyy")
            : "-"}
        </li>
        <li>
          {itm?.allStores ? (
            <li>All stores</li>
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
        </li>
        <li>Description: {itm?.claimInstruction}</li>
      </ul>
      {itm?.expiryDate && (
        <div
          style={{
            width: "100%",
            height: "30px",
            background: "#FFBC0F",
            color: "black",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            padding: "0 10px",
            boxSizing: "border-box",
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
          <OfferExpiryCounter expiryDate={itm?.expiryDate} />
        </div>
      )}
      <div style={{ display: "flex"}}>
        {couponCode || itm?.couponInfo[0]?.couponCode ? (
          <div
            style={{
              background: "#e6f7f7",
              borderRadius: "15px",
              width: "300px",
              height: "55px",
              marginTop: "10px",
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
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={createCouponCode}
          >
            AVAIL OFFER
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

export default OfferCards;
