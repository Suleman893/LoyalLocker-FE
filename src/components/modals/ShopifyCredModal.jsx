import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  AdditionalButtonWrapper,
  AdditionalNotesBody,
  AdditionalNotesContainer,
  AdditionalNotesHeader,
  AdditionalNotesContainer2
} from "./Modals.style";
import { useFormik } from "formik";
import {
  editShopify,
  integrateShopify,
} from "../../redux/company/companyThunks";
import { useDispatch, useSelector } from "react-redux";
import { shopifyCredSchema } from "../../schema/integrationSchema";
import { CircularProgress, FormHelperText } from "@mui/material";

const ShopifyCredModal = ({
  isModalOpen,
  closeModal,
  title,
  data,
  cancelButtonText,
  headingTitles,
}) => {
  const dispatch = useDispatch();
  const { isShopifyCreatedLoading } = useSelector((state) => state.company);
  const formik = useFormik({
    initialValues: {
      shopifyShopName: data?.shopifyShopName || "",
      shopifyApiKey: data?.shopifyApiKey || "",
      shopifyPassword: data?.shopifyPassword || "",
    },
    validationSchema: shopifyCredSchema,
    onSubmit: (values) => {
      if (data && data?.shopifyShopName) {
        dispatch(editShopify({ values, closeModal }));
      } else {
        dispatch(integrateShopify({ values, closeModal }));
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (data && data?.shopifyShopName) {
      formik.setFieldValue("shopifyShopName", data?.shopifyShopName || "");
      formik.setFieldValue("shopifyApiKey", data?.shopifyApiKey || "");
      formik.setFieldValue("shopifyPassword", data?.shopifyPassword || "");
    }
  }, []);

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <AdditionalNotesContainer2>
        <AdditionalNotesHeader>
          <div style={{ display: "flex" }}>
            <div className="ptl-title-design"></div>
            <div className="ptl-title">{title}</div>
          </div>
          <CloseIcon
            sx={{ color: "black", cursor: "pointer" }}
            onClick={closeModal}
          />
        </AdditionalNotesHeader>
        <AdditionalNotesBody>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              // marginTop: "20px",
              // marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
              gridGap: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gridGap: "10px",
              }}
            >
              <label htmlFor="shopifyShopName">Shop name *</label>
              <input
                style={{
                  fontSize: "12px",
                  color: "#0B7974",
                  // width: "100%",
                  height: "50px",
                  borderRadius: "15px",
                  outline: "none",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "15px",
                  marginTop: "10px",
                }}
                id="shopifyShopName"
                placeholder="Enter shop name"
                type="text"
                value={formik.values.shopifyShopName}
                name="shopifyShopName"
                onChange={formik.handleChange}
              />
              {formik.touched.shopifyShopName &&
              formik.errors.shopifyShopName ? (
                <FormHelperText error>
                  {formik.errors.shopifyShopName}
                </FormHelperText>
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gridGap: "10px",
              }}
            >
              <label htmlFor="shopifyApiKey">API Key *</label>
              <input
                style={{
                  fontSize: "12px",
                  color: "#0B7974",
                  // width: "100%",
                  height: "50px",
                  borderRadius: "15px",
                  outline: "none",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "15px",
                  marginTop: "10px",
                }}
                id="shopifyApiKey"
                placeholder="Enter API Key"
                type="text"
                value={formik.values.shopifyApiKey}
                name="shopifyApiKey"
                onChange={formik.handleChange}
              />
              {formik.touched.shopifyApiKey || formik.errors.shopifyApiKey ? (
                <FormHelperText error>
                  {formik.errors.shopifyApiKey}
                </FormHelperText>
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gridGap: "10px",
              }}
            >
              <label htmlFor="shopifyPassword">Password *</label>
              <input
                style={{
                  fontSize: "12px",
                  color: "#0B7974",
                  // width: "100%",
                  height: "50px",
                  borderRadius: "15px",
                  outline: "none",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "15px",
                  marginTop: "10px",
                }}
                id="shopifyPassword"
                type="text"
                placeholder="Enter Password"
                value={formik.values.shopifyPassword}
                name="shopifyPassword"
                onChange={formik.handleChange}
              />
              {formik.touched.shopifyPassword &&
              formik.errors.shopifyPassword ? (
                <FormHelperText error>
                  {formik.errors.shopifyPassword}
                </FormHelperText>
              ) : null}
            </div>
            <div style={{ display: "flex", justifyContent: "right" }}>
              
              <button
                type="submit"
                style={{
                  color: "white",
                  background: "#0B7974",
                  border: "none",
                  borderRadius: "10px",
                  width: "200px",
                  height: "56px",
                }}
              >
                {isShopifyCreatedLoading ? (
                  <CircularProgress style={{ color: "#fff" }} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </AdditionalNotesBody>
        <AdditionalButtonWrapper>
          {/* <button
            style={{
              width: "340px",
              height: "52px",
              border: "1px solid #0B7974",
              color: "#0B7974",
              background: "white",
              borderRadius: "10px",
            //   marginTop: "40px",
              marginLeft: "380px",
              marginBottom:'10px',
              marginRight:'20px'
            }}
            onClick={closeModal}
          >
            {cancelButtonText}
          </button> */}
        </AdditionalButtonWrapper>
      </AdditionalNotesContainer2>
    </Modal>
  );
};

export default ShopifyCredModal;
