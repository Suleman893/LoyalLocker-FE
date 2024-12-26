import React, { useState } from "react";
import {
  Stack,
  Grid,
  Button,
  Dialog,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ContentPreviewModal({
  previewModal,
  setPreviewModal,
  selectedTemplate,
}) {
  const handleClose = () => {
    setPreviewModal(false);
  };
  return (
    <div>
      <Dialog
        open={previewModal}
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
                Content Preview
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div style={{ padding: "16px" }}>
            <Grid container>
              <Grid
                item
                md={6}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Stack>
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: 600, color: "#6F767E" }}
                  >
                    Template name
                  </Typography>
                  <Typography
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#1A1D1F" }}
                  >
                    {selectedTemplate?.name}
                  </Typography>
                </Stack>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: "100%" }}
                />
              </Grid>
              <Grid
                item
                md={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Stack>
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: 600, color: "#6F767E" }}
                  >
                    Template description
                  </Typography>
                  <Typography
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#1A1D1F" }}
                  >
                    {selectedTemplate?.description}
                  </Typography>
                </Stack>
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
          }}
        >
          <div style={{ display: "flex", gridGap: "10px", width: "100%" }}>
            <div dangerouslySetInnerHTML={{ __html: selectedTemplate?.html }} />
          </div>
        </Stack>
        <Stack
          gap={2}
          sx={{
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: "20px",
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
            onClick={() => setPreviewModal(false)}
          >
            Cancel
          </Button>
        </Stack>
      </Dialog>
    </div>
  );
}

export default ContentPreviewModal;
