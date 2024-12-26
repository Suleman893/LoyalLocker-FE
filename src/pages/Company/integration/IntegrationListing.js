import React, { useEffect, useState } from "react";
import "./style.css";
import { CircularProgress, Stack } from "@mui/material";
import SideBar from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import ShopifyCredModal from "../../../components/modals/ShopifyCredModal";
import { checkIntegrationStatus } from "../../../redux/company/companyThunks";
import ShopifyViewModal from "../../../components/modals/ShopifyViewModal";
import image from "../../../assets/image.png";
import Mailchimp from "../../../assets/mailchimp.png";
import edit from "../../../assets/edit.png";
import eye from "../../../assets/Admin images/eye.png";
import MailchimpCredModal from "../../../components/modals/MailchimpCredModal";
import MailchimpViewModal from "../../../components/modals/MailchimpViewModal";

const IntegrationListing = () => {
  const dispatch = useDispatch();

  const { integrationStatus, isIntegrationLoading, isUpdate } = useSelector(
    (state) => state.company
  );
  const [isMailchimpAddModal, setIsMailchimpAddModal] = useState(false);
  const [isMailchimpViewModal, setIsMailchimpViewModal] = useState(false);
  const [isShopifyViewModal, setIsShopifyViewModal] = useState(false);
  const [isShopifyAddModal, setIsShopifyAddModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch(checkIntegrationStatus());
  }, [isUpdate]);

  return (
    <>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar />
        <Stack
          className="company-main-height"
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack sx={{ padding: "0px 30px" }}>
            <div className="sl-main-div-1">
              <div className="sl-header-div-1">
                <div className="sl-title-main-div-1">
                  <div className="sl-title-design-1"></div>
                  <div className="sl-title-1">Integrations</div>
                </div>
              </div>
              {isIntegrationLoading ? (
                <div className="loader-container-1">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <div className="card-container" style={{ gridGap: "20px" }}>
                    <div className="card">
                      <div style={{ display: "flex" }}>
                        <img className="in-card-img" src={image} alt="" />
                        <div>
                          <div className="card-top">Shopify</div>
                          <div className="card-desc">
                            Integrate shopify account to get your products with
                            loyal locker.
                            {/* <p>
                              To enable the webhooks to get notified of the
                              store changes with mailchimp
                            </p>
                            <p>Go to setting in account </p>
                            <p>Go to notifications in account </p>
                            <p>Go to webhooks in account </p>
                            <p>Create webhook </p>
                            <p>
                              For product created: Enter the url as API endpoint
                              as
                              https://api.loyallocker.com/api/v2/merchant/webhook/product-created/1
                            </p>
                            <p>
                              For product updated: Enter the url as API endpoint
                              as
                              https://api.loyallocker.com/api/v2/merchant/webhook/product-updated/1
                            </p>
                            <p>
                              For product deletion: Enter the url as API
                              endpoint as
                              https://api.loyallocker.com/api/v2/merchant/webhook/product-deleted/1
                            </p> */}
                          </div>
                        </div>
                      </div>
                      <div className="card-bottom">
                        {integrationStatus?.shopify ? (
                          <>
                            <button
                              className="btn-style"
                              onClick={() => setIsShopifyAddModal(true)}
                            >
                              <img src={edit} alt="dots" />
                            </button>
                            <button
                              className="btn-style"
                              onClick={() => setIsShopifyViewModal(true)}
                            >
                              <img src={eye} alt="dots" />
                            </button>
                          </>
                        ) : (
                          <button
                            className="add-btn-style"
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsShopifyAddModal(true)}
                          >
                            + Add Shopify
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="card">
                      <div style={{ display: "flex" }}>
                        <img className="in-card-img" src={Mailchimp} alt="" />
                        <div>
                          <div className="card-top">Mailchimp</div>
                          <div className="card-desc">
                            Integrate mailchimp account to send campaigns with
                            loyal locker.
                          </div>
                        </div>
                      </div>
                      <div className="card-bottom">
                        {integrationStatus?.mailchimp === true ? (
                          <>
                            <button
                              className="btn-style"
                              onClick={() => setIsMailchimpAddModal(true)}
                            >
                              <img src={edit} alt="dots" />
                            </button>
                            <button
                              className="btn-style"
                              onClick={() => setIsMailchimpViewModal(true)}
                            >
                              <img src={eye} alt="dots" />
                            </button>
                          </>
                        ) : (
                          <button
                            className="add-btn-style"
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsMailchimpAddModal(true)}
                          >
                            + Add Mailchimp
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <ShopifyCredModal
                    isModalOpen={isShopifyAddModal}
                    closeModal={() => setIsShopifyAddModal(false)}
                    title="Connect to Shopify"
                    headingTitles={["Heading 1"]}
                    cancelButtonText="Cancel"
                    data={integrationStatus}
                  />
                  <ShopifyViewModal
                    isModalOpen={isShopifyViewModal}
                    closeModal={() => setIsShopifyViewModal(false)}
                    title="Shopify Account Details"
                    headingTitles={["Heading 1"]}
                    cancelButtonText="Cancel"
                    data={integrationStatus}
                  />
                  <MailchimpCredModal
                    isModalOpen={isMailchimpAddModal}
                    closeModal={() => setIsMailchimpAddModal(false)}
                    title="Connect to Mailchimp"
                    headingTitles={["Heading 1"]}
                    cancelButtonText="Cancel"
                    data={integrationStatus}
                  />
                  <MailchimpViewModal
                    isModalOpen={isMailchimpViewModal}
                    closeModal={() => setIsMailchimpViewModal(false)}
                    title="Mailchimp Account Details"
                    headingTitles={["Heading 1"]}
                    cancelButtonText="Cancel"
                    data={integrationStatus}
                  />
                </>
              )}
            </div>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default IntegrationListing;
