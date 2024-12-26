import React, { useEffect, useState } from "react";
import {
  Stack,
  Button,
  Dialog,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { allSegments } from "../../../../redux/company/companyThunks";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Button as SimpleButton } from "@mui/material";

function AllSegmentModal({ open, handleClose, setFieldValue }) {
  const dispatch = useDispatch();
  const [selectedSegment, setSelectedSegment] = useState(null);
  const { segments, isLoading } = useSelector((state) => state.company);
  const [activeCell, setActiveCell] = useState();

  const handleCellClick = (index) => {
    setActiveCell(index);
    console.log(index,activeCell)
  };
  useEffect(() => {
    dispatch(allSegments());
  }, []);

  const handleSegmentSelect = (segment) => {
    setSelectedSegment(segment);

  };

  const handleSegmentSelection = () => {
    setFieldValue("segments", [selectedSegment]);
    setFieldValue("segmentId", selectedSegment?.id);
    if (!selectedSegment) {
      toast.success("Please select segment", { theme: "colored" });
    }
    handleClose();
  };

  return (
    <div>
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
                All Segment
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div style={{ padding: "16px" }}>
            {isLoading ? (
              <CircularProgress style={{ color: "#0B7974" }} />
            ) : segments?.length === 0 ? (
              <Typography>No segments found</Typography>
            ) : (
              <Table>
                <TableBody>
                  {segments?.map((segment, index) => (
                    <TableRow
                      key={segment?.id}
                      style={{
                        backgroundColor: segment?.id % 2 === 0 ? "#F5F7FA" : "white",

                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleSegmentSelect(segment);
                      }}

                    >
                      <TableCell
                        sx={{
                          border: "none",
                          fontSize: "18px",
                          color: "black",

                          backgroundColor: activeCell === index ? '#c0d5d4' : 'none',

                        }}
                        onClick={() => {
                          handleCellClick(index);
                        }}
                      >
                        {segment?.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          fontSize: "14px",
                          color: "#6F767E",
                        }}
                      >
                        {segment?.totalUsers}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: "none",
                          fontSize: "14px",
                          color: "#6F767E",
                        }}
                      >
                        {`Last Updated: ${format(
                          new Date(segment?.updatedAt),
                          "dd MMM yyyy"
                        )}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
        {segments?.length > 0 && (
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
              onClick={() => handleClose()}
            >
              Cancels
            </Button>
            <SimpleButton
              type="button"
              id="my-button-id"
              className="my-button-class"
              onClick={handleSegmentSelection}
              sx={{
                background: "#0B7974",
                color: "white",
                borderRadius: "10px",
                height: "52px",
                width: "240px",
                marginTop: "15px",
                textTransform: "none",
                "&:hover": {
                  cursor: "pointer",
                  background: "#0B7974",
                },
              }}
            >
              Save
            </SimpleButton>
          </Stack>
        )}
      </Dialog>
    </div>
  );
}

export default AllSegmentModal;
