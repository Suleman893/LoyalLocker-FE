import React, { useState } from "react";
import {
  Stack,
  Grid,
  Button,
  Dialog,
  IconButton,
  Typography,
  InputLabel,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../../../components/Buttons/CustomButton";

function DublicateModal() {
  const [open, setOpen] = useState(false);
  const data = [
    { column1: "Gender_Females", column2: "Total Users: 345" },
    { column1: "Gender_Females", column2: "Total Users: 345" },
    { column1: "Gender_Females", column2: "Total Users: 345" },
    { column1: "Gender_Females", column2: "Total Users: 345" },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {};

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={{
          "& .css-rnmm7m-MuiPaper-root-MuiDialog-paper": {
            borderRadius: "12px",
            width: "727px",
          },
        }}
      >
        <div style={{ borderRadius: "100px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <Stack gap={2} style={{ display: "flex", flexDirection: "row" }}>
              {" "}
              <div
                className="ptl-title-design"
                style={{ marginTop: "0px", marginLeft: "0px" }}
              ></div>
              <Typography
                sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
              >
                Duplicate Email Template
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div style={{ padding: "16px" }}>
            <Grid gap={2} container>
              <Grid item md={5.8}>
                <InputLabel
                  htmlFor="username"
                  sx={{
                    color: "#232323",
                    fontSize: "14px",
                    paddingBottom: "5px",
                  }}
                >
                  Campaign Name *
                </InputLabel>
                <TextField
                  id="username"
                  variant="outlined"
                  placeholder="Copy of Email Template"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid item md={5.8}>
                <InputLabel
                  htmlFor="username"
                  sx={{
                    color: "#232323",
                    fontSize: "14px",
                    paddingBottom: "5px",
                  }}
                >
                  Description
                </InputLabel>
                <TextField
                  id="username"
                  variant="outlined"
                  placeholder="Description  0/256"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <Stack
          gap={2}
          sx={{
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: "20px",
            paddingLeft: "20px",
          }}
        >
          <Button
            sx={{
              color: "#0B7974",
              border: "1px solid #0B7974",
              borderRadius: "10px",
              height: "52px",
              width: "240px",
              marginTop: "15px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <CustomButton
            width="240px"
            text="Save"
            id="getCodeButton"
            className="control-button"
            handleSubmit={onClick}
          />
          <CustomButton
            width="240px"
            text="Save & Edit"
            id="getCodeButton"
            className="control-button"
            handleSubmit={onClick}
          />
        </Stack>
      </Dialog>
    </div>
  );
}

export default DublicateModal;
