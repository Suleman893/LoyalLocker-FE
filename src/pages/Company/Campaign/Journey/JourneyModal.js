import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Stack,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import EmailTemplateComponent from "./EmailTemplateComponent";
import DelayComponent from "./DelayComponent";
import SMSComponent from "./SMSComponent";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const JourneyModal = ({ onOpen, onClose, journeySteps, handleChange }) => {
  const [selectedTab, setSelectedTab] = useState("email");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedDelay, setSelectedDelay] = useState(null);

  const handleTabChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const handleCancel = () => {
    onClose();
    setSelectedTemplate(null);
    setSelectedDelay(null);
  };

  const handleSave = () => {
    const actionUuid = uuidv4();
    if (!selectedTemplate) {
      return toast.info("Select email template ", { theme: "colored" });
    }
    if (selectedDelay === null || selectedDelay === undefined) {
      return toast.info("Select delay ", { theme: "colored" });
    }
    handleChange({
      target: {
        name: "journeySteps",
        value: [
          ...journeySteps,
          {
            actionId: actionUuid,
            type: "action",
            actionType: "email",
            emailTemplateId: selectedTemplate?.id,
            emailTemplateName: selectedTemplate?.name,
          },
          {
            actionId: actionUuid,
            type: "delay",
            time: selectedDelay,
          },
        ],
      },
    });
    onClose();
    setSelectedTab("email");
    setSelectedTemplate(null);
    setSelectedDelay(null);
  };

  return (
    <>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={onOpen}
        onClose={onClose}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "800px",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                value={selectedTab}
                onChange={handleTabChange}
              >
                <FormControlLabel
                  value="email"
                  control={
                    <Radio
                      style={{
                        color: selectedTab === "email" ? "#0B7974" : "#828282",
                      }}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: "14px",
                        color: selectedTab === "email" ? "#0B7974" : "#828282",
                      }}
                    >
                      Email
                    </span>
                  }
                />
                <FormControlLabel
                  value="delay"
                  control={
                    <Radio
                      style={{
                        color: selectedTab === "delay" ? "#0B7974" : "#828282",
                      }}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: "14px",
                        color: selectedTab === "delay" ? "#0B7974" : "#828282",
                      }}
                    >
                      Delay
                    </span>
                  }
                  disabled={selectedTemplate ? false : true}
                />
                <FormControlLabel
                  value="sms"
                  control={
                    <Radio
                      style={{
                        color: selectedTab === "sms" ? "#0B7974" : "#828282",
                      }}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: "14px",
                        color: selectedTab === "sms" ? "#0B7974" : "#828282",
                      }}
                    >
                      SMS
                    </span>
                  }
                  disabled={true}
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          {selectedTab === "email" && (
            <EmailTemplateComponent
              journeySteps={journeySteps}
              handleChange={handleChange}
              onClose={onClose}
              setSelectedTab={setSelectedTab}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          )}
          {selectedTab === "delay" && selectedTemplate && (
            <DelayComponent
              journeySteps={journeySteps}
              handleChange={handleChange}
              onClose={onClose}
              setSelectedTab={setSelectedTab}
              selectedDelay={selectedDelay}
              setSelectedDelay={setSelectedDelay}
            />
          )}
          {selectedTab === "sms" && <SMSComponent />}
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: "flex",
              gridGap: "10px",
              alignItems: "center",
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleCancel}
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
              onClick={handleSave}
            >
              Save step
            </Button>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default JourneyModal;
