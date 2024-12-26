import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  AdditionalButtonWrapper,
  AdditionalNotesBody,
  AdditionalNotesContainer,
  AdditionalNotesContainer2,

  AdditionalNotesHeader,
} from "./Modals.style";
import { useFormik } from "formik";
import {
  editMailchimp,
  integrateMailchimp,
} from "../../redux/company/companyThunks";
import { useDispatch, useSelector } from "react-redux";
import {
  mailChimpCredSchema,
} from "../../schema/integrationSchema";
import { CircularProgress, FormHelperText } from "@mui/material";

const MailchimpCredModal = ({
  isModalOpen,
  closeModal,
  title,
  data,
  cancelButtonText,
  headingTitles,
}) => {
  const dispatch = useDispatch();
  const { isMailchimpCreatedLoading } = useSelector((state) => state.company);

  const formik = useFormik({
    initialValues: {
      mailchimpApiKey: data?.mailchimpApiKey || "",
      mailchimpServerPrefix: data?.mailchimpServerPrefix || "",
    },
    validationSchema: mailChimpCredSchema,
    onSubmit: (values) => {
      if (data && data?.mailchimpApiKey) {
        dispatch(editMailchimp({ values, closeModal }));
      } else {
        dispatch(integrateMailchimp({ values, closeModal }));
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (data && data?.shopifyShopName) {
      formik.setFieldValue("mailchimpApiKey", data?.mailchimpApiKey || "");
      formik.setFieldValue(
        "mailchimpServerPrefix",
        data?.mailchimpServerPrefix || ""
      );
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
              marginTop: "20px",
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
              gridGap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gridGap: "10px",
              }}
            >
              <label htmlFor="mailchimpApiKey">Mailchimp API Key *</label>
              <input
                style={{
                  fontSize: "12px",
                  color: "#0B7974",
                  // width: "90%",
                  height: "50px",
                  borderRadius: "15px",
                  outline: "none",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "15px",
                  marginTop: "10px",
                }}
                id="mailchimpApiKey"
                placeholder="Enter shop name"
                type="text"
                value={formik.values.mailchimpApiKey}
                name="mailchimpApiKey"
                onChange={formik.handleChange}
              />
              {formik.touched.mailchimpApiKey &&
              formik.errors.mailchimpApiKey ? (
                <FormHelperText error>
                  {formik.errors.mailchimpApiKey}
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
              <label htmlFor="mailchimpServerPrefix">
                Mailchimp Server Prefix *
              </label>
              <input
                style={{
                  fontSize: "12px",
                  color: "#0B7974",
                  // width: "90%",
                  height: "50px",
                  borderRadius: "15px",
                  outline: "none",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "15px",
                  marginTop: "10px",
                }}
                id="mailchimpServerPrefix"
                placeholder="Enter API Key"
                type="text"
                value={formik.values.mailchimpServerPrefix}
                name="mailchimpServerPrefix"
                onChange={formik.handleChange}
              />
              {formik.touched.mailchimpServerPrefix ||
              formik.errors.mailchimpServerPrefix ? (
                <FormHelperText error>
                  {formik.errors.mailchimpServerPrefix}
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
                {isMailchimpCreatedLoading ? (
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

export default MailchimpCredModal;
