import React, { useEffect, useState } from "react";
import { CircularProgress, Stack, Grid } from "@mui/material";
import SideBar2 from "../../../components/Layout/SideBar2";
import Header from "../../../components/Layout/Header";
import "./style.css";
import "../../../components/dashboard/Dashboard.css";
import TabComp from "../../../components/tabs/TabsComp";
import OfferCards from "../../../components/Cards/OfferCards";
import { useDispatch, useSelector } from "react-redux";
import {
  allMerchantRewards,
  allMerchantsOffers,
  totalBalance,
} from "../../../redux/consumer/consumerThunk";
import RewardsCard from "../../../components/Cards/RewardsCard";
import RewardEarnRuleCard from "../../../components/Cards/RewardEarnRuleCard";
import OfferEarnRuleCard from "../../../components/Cards/OfferEarnRuleCard";
import ViewModal from "../../../components/modals/ViewModal";

const OfferSaleListing = () => {
  const dispatch = useDispatch();
  const allOffers = useSelector((state) => state.consumer.allOffer);
  const allRewards = useSelector((state) => state.consumer.allReward);
  const { totalPoints, isRewardLoading, isOfferLoading } = useSelector(
    (state) => state.consumer
  );
  const openSidebar = useSelector((state) => state.consumer.openSidebar);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(totalBalance());
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === 0) {
      dispatch(allMerchantRewards({ page: page, pageSize: 100 }));
    } else {
      dispatch(allMerchantsOffers({ page: page, pageSize: 100 }));
    }
  }, [activeTab, dispatch, page]);

  const handleTabChange = (index) => {
    setPage(1);
    setActiveTab(index);
  };

  const handleOpenModal = (itm) => {
    setIsOfferModalOpen(true);
    setSelectedItem(itm);
  };

  const renderContent = () => {
    if (activeTab === 0) {
      if (isRewardLoading) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <CircularProgress />
          </div>
        );
      }

      if (
        allRewards?.allRewards?.length ||
        allRewards?.allEarningRules?.length
      ) {
        return (
          <Grid
            container
            // spacing={4}
            style={{marginTop:'20px', width: "100%",marginLeft:'0px' }}
          >
            {allRewards?.allRewards?.map((itm, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}  style={{ padding: '16px' }} >
                <RewardsCard
                  totalPoints={totalPoints}
                  itm={itm}
                  onView={() => handleOpenModal(itm)}
                />
              </Grid>
            ))}
            {allRewards?.allEarningRules?.map((itm, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}  style={{ padding: '16px' }}>
                <RewardEarnRuleCard
                  itm={itm}
                  onView={() => handleOpenModal(itm)}
                />
              </Grid>
            ))}
          </Grid>
        );
      } else {
        return <p>No Active Rewards</p>;
      }
    } else {
      if (isOfferLoading) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <CircularProgress />
          </div>
        );
      }

      if (allOffers?.allOffers?.length || allOffers?.allEarningRules?.length) {
        return (
          <Grid
            container
            // spacing={4}
            style={{ marginTop: "20px", width: "100%", marginLeft: "0px" }}
          >
            {allOffers?.allOffers?.map((itm, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index} style={{ padding: '16px' }}>
                <OfferCards
                  key={index}
                  itm={itm}
                  onView={() => handleOpenModal(itm)}
                />
              </Grid>
            ))}
            {allOffers?.allEarningRules?.map((itm, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index} style={{ padding: '16px' }}>
                <OfferEarnRuleCard
                  key={index}
                  itm={itm}
                  onView={() => handleOpenModal(itm)}
                />
              </Grid>
            ))}
          </Grid>
        );
      } else {
        return <p>No Active Offers</p>;
      }
    }
  };

  return (
    <>
      <div style={{ width: "100%", minHeight: "100vh", display: "flex" }}>
        <SideBar2 />
        <Stack Stack className="main-height">
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
            <div className={`${openSidebar ? 'dashboard-main-div-toggle' : 'dashboard-main-div'}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  padding:'10px'
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "32px",
                      background: "#0B7974",
                      borderRadius: "10px",
                    }}
                  ></div>
                  <div
                    className="consumer-rewards-offers-text"
                    style={{
                      fontSize: "23px",
                      fontWeight: "500",
                      color: "black",
                      paddingLeft: "30px",
                    }}
                  >
                    Rewards & Offers
                  </div>
                </div>
                {activeTab === 0 && (
                  <div>
                    <div
                      className="rewards-points-button"
                      style={{
                        height: "40px",
                        color: "white",
                        borderRadius: "10px",
                        border: "1px solid rgba(11, 121, 116, 1)",
                        marginTop: "20px",
                        marginRight: "0px",
                        padding:'10px',
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <span
                        className="total-ponits-value"
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          paddingRight: "10px",
                        }}
                      >
                        {totalPoints || 0}
                      </span>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "rgba(11, 121, 116, 1)" }}>
                          Total
                        </span>
                        <span style={{ color: "rgba(11, 121, 116, 1)" }}>
                          Points
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <TabComp
                tabs={["Get Rewards", "Sales and Offers"]}
                initial={activeTab}
                setActiveTab={handleTabChange}
              />
              {activeTab !== 0 && (
                <div style={{ padding: "20px", fontWeight: "700" }}>
                  Enjoy Flash Deals From Different Brands
                </div>
              )}
              {renderContent()}
            </div>
        </Stack>
      </div>
      <ViewModal
        isModalOpen={isOfferModalOpen}
        closeModal={() => setIsOfferModalOpen(false)}
        title="Detail View"
        data={selectedItem}
      />
    </>
  );
};

export default OfferSaleListing;
