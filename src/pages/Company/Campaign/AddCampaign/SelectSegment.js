import React, { useState, useEffect } from "react";
import {
  Stack,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { allSegments } from "../../../../redux/company/companyThunks";
import Loader from "../../../../components/Loader/Loader";
import { format } from "date-fns";

function SelectSegment({ validateForm, setFieldValue }) {
  const dispatch = useDispatch();
  const { segments, isLoading } = useSelector((state) => state.company);
  const [updatedSegments, setUpdatedSegments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(allSegments());
  }, [dispatch]);

  useEffect(() => {
    setUpdatedSegments(
      segments.map((segment) => ({ ...segment, checked: null }))
    );
  }, [segments]);

  const handleRadioChange = (segment) => {
    setFieldValue("segmentId", segment.id);
    setFieldValue("mailChimpSegmentId", segment.mailChimpSegmentId);
    setUpdatedSegments((prevSegment) =>
      prevSegment.map((item) => ({
        ...item,
        checked: item.id === segment.id,
      }))
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSegments = updatedSegments.filter((segment) =>
    segment.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Stack
        sx={{
          margin: "30px 0px",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
        >
          Select a Segment
        </Typography>
        <TextField
          id="search"
          placeholder="Search segment"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: "50%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack>
        <Stack></Stack>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {filteredSegments.length === 0 ? (
              <div className="no-records-found">
                <Typography variant="paragraph">No segment found</Typography>
              </div>
            ) : (
              <Table>
                <TableBody>
                  {filteredSegments.map((segment) => (
                    <React.Fragment key={segment.id}>
                      <TableRow
                        sx={{
                          "&:hover": {
                            backgroundColor: "#F5F7FA",
                          },
                        }}
                      >
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Grid item md={4.5}>
                            <TableCell
                              sx={{
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <RadioGroup>
                                <FormControlLabel
                                  control={
                                    <Radio
                                      checked={segment.checked || false}
                                      onChange={() =>
                                        handleRadioChange(segment)
                                      }
                                      style={{
                                        color: segment.checked
                                          ? "#0B7974"
                                          : "#828282",
                                      }}
                                    />
                                  }
                                  label=""
                                />
                              </RadioGroup>
                              <Typography
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: 600,
                                  color: "#232323",
                                }}
                              >
                                {segment.name}
                              </Typography>
                            </TableCell>
                          </Grid>
                          <Grid item md={4.5}>
                            <TableCell sx={{ border: "none" }}>
                              <Typography
                                sx={{ fontSize: "18px", color: "#6F767E" }}
                              >
                                Total Users: {segment.totalUsers}
                              </Typography>
                            </TableCell>
                          </Grid>
                          <Grid item md={3}>
                            <TableCell sx={{ border: "none" }}>
                              <Typography
                                sx={{ fontSize: "18px", color: "#6F767E" }}
                              >
                                {`Last Updated: ${format(
                                  new Date(segment.updatedAt),
                                  "dd MMM yyyy"
                                )}`}
                              </Typography>
                            </TableCell>
                          </Grid>
                        </Grid>
                      </TableRow>
                      <Divider />
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </Stack>
    </>
  );
}

export default SelectSegment;
