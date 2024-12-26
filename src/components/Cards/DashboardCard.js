import React from "react";
import {Grid} from "@mui/material";
import "./ImageCard.css";
import icon from "../../../src/assets/48 place holder.png";
import gvector from "../../assets/gvector.png";
import bvector from "../../assets/bvector.png";
import pvector from "../../assets/pvector.png";

const DashboardCard = ({ dashboard }) => {
  const cardColors = ["#e7fbf1", "#dfedf3", "#eae7f6"];
  const cards = [
    {
      totalPoints: dashboard?.totalPoints || 0,
      cardColor: cardColors[0],
      title: "Total Points",
      gvector: gvector,
    },
    {
      totalPoints: dashboard?.totalSpendPoints || 0,
      cardColor: cardColors[1],
      title: "Points Spent",
      gvector: bvector,
    },
    {
      totalPoints: dashboard?.totalInActivePoints || 0,
      cardColor: cardColors[2],
      title: "Points Expired",
      gvector: pvector,
    },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => (
        <Grid item xs={12} md={4} key={index}>
          <div
            className="consumer-dashboard-cards"
            style={{ backgroundColor: card.cardColor, padding: "20px" }}
            elevation={3}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  style={{
                    marginLeft: "20px",
                    marginTop: "30px",
                    width: "48px",
                    height: "48px",
                  }}
                  src={icon}
                  alt="cardicon"
                />
              </div>
              <div style={{ display: "flex",flexWrap:'wrap',width:'100%'}}>
                <div>
                  <div style={{ paddingLeft: "20px", marginTop: "30px" }}>
                    {card?.title}
                  </div>
                  <div className="consumer-dashboard-points">
                    {card?.totalPoints}
                  </div>
                </div>
                <div style={{ display: "flex",justifyContent:'flex-end', flexGrow: 1 }}>
                  <img
                    style={{width:'80px',height:'40px'}}
                    src={card?.gvector}
                    alt="gvector"
                  />
                </div>
              </div>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCard;
