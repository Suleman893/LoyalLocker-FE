import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import SideBar2 from "../../../../components/Layout/SideBar2";
import Header from "../../../../components/Layout/Header";
import "./style.css";

const Level = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar2 />
        <Stack
          sx={{
            width: "100%",
            padding: "0px",
            height: "100vh",
            background: "#FAFAFA",
          }}
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack sx={{ padding: "0px 30px" }}>
            <div className="level-main">
              <div className="level-header">
                <div className="level-title-design"></div>
                <Typography
                  variant="h5"
                  fontWeight="500"
                  color="black"
                  sx={{ pl: "30px" }}
                >
                  Levels
                </Typography>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex" }}>
                  <div className="level-bronze">
                    <div>Bronze</div>
                    <div>+300 p.</div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="level-silver">
                    <div>Silver</div>
                    <div>+500 p.</div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="level-silver">
                    <div>Gold</div>
                    <div>+700 p.</div>
                  </div>
                </div>
              </div>
              <div className="line"></div>
              {[
                { title: "Double points days", images: 3 },
                { title: "Birthday bonus", images: 3 },
                { title: "Flash discounts", images: 2 },
                { title: "Vote on products", images: 2 },
                { title: "Access to limited edition products", images: 1 },
              ].map(({ title, images }, index) => (
                <React.Fragment key={index}>
                  <div className="level-card-header">
                    <div className="level-card-title">{title}</div>
                    <div style={{ marginRight: "30px" }}>
                      {Array.from({ length: images }).map((_, i) => (
                        <img
                          key={i}
                          style={{
                            marginRight: `${
                              i === images - 1 ? "170px" : "110px"
                            }`,
                          }}
                          src="./images/check_circle.png"
                          alt={`check${i}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="line"></div>
                </React.Fragment>
              ))}
            </div>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default Level;
