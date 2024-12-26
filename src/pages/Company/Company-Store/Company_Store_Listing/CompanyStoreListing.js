import React, { useEffect, useState } from "react";
import "./style.css";
import { CircularProgress, Stack } from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar3";
import Header from "../../../../components/Layout/Header";
import StoreCard from "../../../../components/Cards/StoreCard";
import { useNavigate } from "react-router-dom";
import { allStores } from "../../../../redux/company/companyThunks";
import { useDispatch, useSelector } from "react-redux";

const CompanyStoreListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stores, isUpdate } = useSelector((state) => state.company);
  const { isLoading } = useSelector((state) => state.company);

  const [collapsed, setCollapsed] = useState(false);
  const [activeStatus, setActiveStatus] = useState(null);

  const handleActiveStatus = (e) => {
    setActiveStatus(e.target.value);
  };

  useEffect(() => {
    dispatch(allStores({ activeStatus }));
  }, [activeStatus, isUpdate]);

  return (
    <div>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar />
        <Stack
          className="company-main-height"
        >
          {/* add scroller */}
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack className="company-dashboard-main-div">
            <div className="company-store-main-div">
              <div className="csl-header-div">
                <div className="csl-title-main-div">
                  <div className="csl-title-design"></div>
                  <div className="csl-title">Company Stores</div>
                </div>
                <div>
                  <select
                    className="csl-all-btn"
                    onChange={(e) => handleActiveStatus(e)}
                  >
                    <option value="ALL">All</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">In Active</option>
                  </select>

                  <button
                    className="csl-add-btn"
                    onClick={() => navigate("/company_add_store")}
                    style={{ cursor: "pointer" }}
                  >
                    Add Store
                  </button>
                </div>
              </div>
              <div className="csl-cards-container">
                {isLoading ? (
                  <div className="csl-loader">
                    <CircularProgress />
                  </div>
                ) : stores?.length ? (
                  stores?.map((item, idx) => (
                    <div className="csl-card-wrapper" key={idx}>
                      <StoreCard width="325px" showSwitch={false} item={item} />
                    </div>
                  ))
                ) : (
                  <p>No Record</p>
                )}
              </div>
            </div>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default CompanyStoreListing;
