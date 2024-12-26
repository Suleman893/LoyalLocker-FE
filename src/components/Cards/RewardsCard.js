import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { availReward } from "../../redux/consumer/consumerThunk";
import { generateCouponCode } from "../../utils/couponCodeGenerator";
import { isAfter, format, differenceInSeconds } from "date-fns";
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
    <div style={{ fontSize: "12px", fontWeight: "700", marginRight: "10px" }}>
      {isExpired ? "Reward ended" : `Ends in ${timeLeft}`}
    </div>
  );
};

const RewardCard = ({ totalPoints, itm, onView }) => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState(
    itm?.couponInfo[0]?.couponCode || null
  );

  const createCouponCode = (totalPoints) => {
    if (itm?.rewardPoints > totalPoints) {
      return toast.error("Insufficient total points to avail this reward", {
        theme: "colored",
      });
    }
    const generatedCoupon = generateCouponCode();
    setCouponCode(generatedCoupon);
    dispatch(availReward({ id: itm.id, couponCode: generatedCoupon }));
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px",
        boxSizing: "border-box",
        height: "100%",
        border: "1px solid grey",
        borderRadius: "15px",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "15px",
        }}
        src={itm?.rewardImg}
        alt=""
      />
      <div
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "black",
          padding: "10px",
          textAlign: "center",
          width: "100%",
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
          width: "100%",
        }}
      >
        {itm.rewardPoints} Points Spend
      </div>
      <ul
        style={{
          color: "grey",
          padding: "0 30px",
          // width: "100%",
          // listStyle: "none",
          flexGrow: 1,
        }}
      >
        <li>
          Expires on:{" "}
          {itm?.expirationDate
            ? format(new Date(itm.expirationDate), "MM/dd/yyyy")
            : "-"}
        </li>
        <li>Merchant: {itm?.merchantInfo?.brandName}</li>
        <li>Product: {itm?.productInfo?.title}</li>
        <li>Description: {itm?.claimInstruction}</li>
      </ul>
      {itm?.expirationDate && (
        <div
          style={{
            width: "100%",
            height: "30px",
            background: "#FFBC0F",
            color: "black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
            boxSizing: "border-box",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          <img
            width="20px"
            height="20px"
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
          <RewardExpiryCounter expirationDate={itm?.expirationDate} />
        </div>
      )}
      <div
        style={{ display: "flex"}}
      >
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
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => createCouponCode(totalPoints)}
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

export default RewardCard;
