import React from "react";
import "./style.css";
import gvector from "../../assets/gvector.png";

const DashboardCard2 = ({
  brandName = "",
  totalPoints = 0,
  cardColor,
}) => {
  return (
    <div className="main-cards-small">
      <div className="card4" style={{ backgroundColor: cardColor }}>
        <div>
          <div style={{ display: "flex" }}>
            <img
              style={{
                marginLeft: "20px",
                marginTop: "30px",
                width: "48px",
                height: "48px",
              }}
              src="./images/cardicon.png"
              alt="cardicon"
            />{" "}
            <p
              style={{
                paddingLeft: "20px",
                fontSize: "36px",
                fontWeight: "600",
              }}
            >
              {brandName}
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <div style={{ paddingLeft: "20px" }}>Total Point</div>
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "600",
                  paddingLeft: "20px",
                }}
              >
                {totalPoints}
              </div>
            </div>
            <div>
              <img
                style={{ marginLeft: "230px" }}
                src={gvector}
                alt="gvector"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default DashboardCard2;
