import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { allEmailTemplates } from "../../../../redux/company/companyThunks";
import { v4 as uuidv4 } from "uuid";
import ContentPreviewModal from "../modals/ContentPreviewModal";
import Loader from "../../../../components/Loader/Loader";
import eye from "../../../../assets/eye.png";

const EmailTemplateComponent = ({
  journeySteps,
  handleChange,
  onClose,
  setSelectedTab,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  const dispatch = useDispatch();
  const { emailTemplates, isLoading } = useSelector((state) => state.company);

  const [previewModal, setPreviewModal] = useState(false);

  useEffect(() => {
    dispatch(allEmailTemplates());
  }, []);

  const handleRadioChange = (template) => {
    setSelectedTemplate(template);
  };

  // const handleTemplateSave = () => {
  //   const actionUuid = uuidv4();
  //   if (!selectedTemplate) {
  //     return toast.info("Select template ", { theme: "colored" });
  //   }
  //   handleChange({
  //     target: {
  //       name: "journeySteps",
  //       value: [
  //         ...journeySteps,
  //         {
  //           actionId: actionUuid,
  //           type: "action",
  //           actionType: "email",
  //           emailTemplateId: selectedTemplate?.id,
  //           emailTemplateName: selectedTemplate?.name,
  //         },
  //         {
  //           actionId: actionUuid,
  //           type: "delay",
  //           time: 0,
  //         },
  //       ],
  //     },
  //   });
  //   setSelectedTab("delay");
  // };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !isLoading && emailTemplates.length === 0 ? (
        <Typography
          sx={{
            fontSize: "16px",
            color: "#6F767E",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          No email templates found.
        </Typography>
      ) : (
        <>
          <Table>
            <TableBody>
              {emailTemplates.map((template) => (
                <TableRow
                  key={template?.id}
                  sx={{
                    backgroundColor: template?.id % 2 === 1 ? "" : "#F5F7FA",
                  }}
                >
                  <TableCell
                    sx={{
                      border: "none",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Radio
                      checked={selectedTemplate?.id === template?.id}
                      onChange={() => handleRadioChange(template)}
                      style={{
                        color:
                          selectedTemplate === template.id
                            ? "#0B7974"
                            : "#828282",
                      }}
                    />
                    <Typography
                      sx={{
                        paddingLeft: "10px",
                        fontSize: "14px",
                        color: "#232323",
                      }}
                    >
                      {template?.name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ border: "none", fontSize: "12px", color: "#6F767E" }}
                  >
                    {template?.description}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "none",
                      fontSize: "18px",
                      color: "#FF5833",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      onClick={() => {
                        setPreviewModal(true);
                        handleRadioChange(template);
                      }}
                      src={eye}
                      alt="dots"
                      width="30px"
                      height="30px"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <div
            style={{
              display: "flex",
              gridGap: "10px",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                color: "#0B7974",
                border: "1px solid #0B7974",
                borderRadius: "10px",
                height: "52px",
                width: "240px",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                width: "240px",
                height: "52px",
                borderRadius: "10px",
                background: "#0B7974",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  cursor: "pointer",
                  background: "#0B7974",
                },
              }}
              onClick={() => handleRadioChange()}
            >
              handleRadioChange Save
            </Button>
          </div> */}
          <ContentPreviewModal
            previewModal={previewModal}
            setPreviewModal={setPreviewModal}
            selectedTemplate={selectedTemplate}
          />
        </>
      )}
    </>
  );
};

export default EmailTemplateComponent;
