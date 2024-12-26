import icon1 from "../../assets/admin-dashboard/icon1.png";
import icon2 from "../../assets/admin-dashboard/icon2.png";
import icon3 from "../../assets/admin-dashboard/icon3.png";
import icon4 from "../../assets/admin-dashboard/icon4.png";
import icon5 from "../../assets/admin-dashboard/icon5.png";
import icon6 from "../../assets/admin-dashboard/icon6.png";
import greenArrow from "../../assets/admin-dashboard/admin-arrow.png";
import redArrow from "../../assets/admin-dashboard/admin-arrow1.png";

export const storeData = [
  {
    background: "rgba(168, 230, 200, 0.25)",
    name: "New",
    name1: "Consumers",
    value: 0,
    icon: icon1,
    arrow: greenArrow,
    percentage: "0% this week",
  },
  {
    background: "rgba(162, 231, 255, 0.25)",
    name: "Points ",
    name1: "Credited",
    value: 0,
    icon: icon2,
    arrow: redArrow,
    percentage: "0% this week",
  },
  {
    background: "rgba(205, 189, 255, 0.25)",
    name: "Points ",
    name1: "Redeem",
    value: 0,
    icon: icon3,
    arrow: greenArrow,
    percentage: "0% this week",
  },
  {
    background: "rgba(0, 123, 117, 0.10)",
    name: "Number of ",
    name1: "Stores",
    value: 0,
    icon: icon4,
    arrow: greenArrow,
    percentage: "0% this week",
  },
  {
    background: "rgba(255, 148, 51, 0.10)",
    name: "Top Performing ",
    name1: "Store",
    value: 0,
    icon: icon5,
    arrow: redArrow,
    percentage: "0% this week",
  },
  {
    background: "rgba(0, 217, 193, 0.10)",
    name: "Number of ",
    name1: "Referrals",
    value: 0,
    icon: icon6,
    arrow: greenArrow,
    percentage: "0% this week",
  },
];

export const engagementTopData = [
  { name: "Email Open Rate", value: 0, text: "0 Unique Email Opens" },
  {
    name: "Email Click-Through Rate",
    value: 0,
    text: "0 Unique Email Clicks",
  },
  { name: "Total Emails Delivered", value: "0" },
];

export const engagementBottomData = [
  { name: "Bounce Rate", value: 0, text: "0 Total Bounces" },
  { name: "Number of Event Launched", value: 0, text: "In last 30 Days" },
  {
    name: "Total SMS Delivered",
    value: "0",
    text: "0 Unique Opens",
  },
];

export const graphData = [
  ["Lagend", "Delievered", "Open"],
  ["Summer Event", 0, 0],
  ["Customer Event", 0, 0],
  ["MVP Event", 0, 0],
  ["Fall Event", 0, 0],
];
