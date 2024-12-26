import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { tabsClasses } from "@mui/material/Tabs";

const TabComp = ({ tabs, setActiveTab }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (_, tabValue) => {
    setCurrentTab(tabValue);
    setActiveTab(tabValue);
  };

  return (
    <Box
      sx={{
        width: "auto",
        margin: "0px  10px",
        borderBottom: "2px solid rgba(11, 121, 116, 1)",
      }}
    >
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0 },
          },
          "& .css-1q2h7u5.Mui-selected": { color: "white" },
          "& .Mui-selected": {
            backgroundColor: "rgba(11, 121, 116, 1)",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            color: "white",
          },
          "& .MuiTab-root": {
            borderBottom: "none",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "transparent",
          },
          "& .MuiTabs-root": {
            padding: "5px",
          },
          "& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
            color: "white",
          },
        }}
      >
        {tabs.map((value, index) => (
          <Tab
            label={value?.label || value}
            key={index}
            // disabled={tab?.[value?.key]}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabComp;
