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
import { allEmailTemplates } from "../../../../redux/company/companyThunks";
import Loader from "../../../../components/Loader/Loader";
import ContentPreviewModal from "../modals/ContentPreviewModal";
import eye from "../../../../assets/eye.png";

function SelectEmailCreative({ setFieldValue, validateForm }) {
  const dispatch = useDispatch();
  const { emailTemplates, isLoading } = useSelector((state) => state.company);
  const [updatedEmailTemplates, setUpdatedEmailTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(allEmailTemplates());
  }, [dispatch]);

  useEffect(() => {
    setUpdatedEmailTemplates(
      emailTemplates.map((template) => ({ ...template, checked: null }))
    );
  }, [emailTemplates]);

  const handleRadioChange = (id) => {
    setFieldValue("emailTemplateId", id);
    setUpdatedEmailTemplates((prevTemplates) =>
      prevTemplates.map((item) => ({
        ...item,
        checked: item.id === id,
      }))
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEmailTemplates = updatedEmailTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          Select an Email Creative
        </Typography>
        <TextField
          id="search"
          placeholder="Search email template"
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
            {filteredEmailTemplates.length === 0 ? (
              <div className="no-records-found">
                <Typography variant="paragraph">
                  No email template found
                </Typography>
              </div>
            ) : (
              <Table>
                <TableBody>
                  {filteredEmailTemplates.map((template) => (
                    <React.Fragment key={template.id}>
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
                          <Grid item md={3}>
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
                                      checked={template.checked || false}
                                      onChange={() =>
                                        handleRadioChange(template.id)
                                      }
                                      style={{
                                        color: template.checked
                                          ? "#0B7974"
                                          : "#828282",
                                      }}
                                    />
                                  }
                                  label=""
                                />
                              </RadioGroup>
                              {template.name}
                            </TableCell>
                          </Grid>
                          <Grid item md={6}>
                            <TableCell sx={{ border: "none" }}>
                              {template.description}
                            </TableCell>
                          </Grid>
                          <Grid item md={3}>
                            <TableCell
                              sx={{
                                border: "none",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "end",
                                fontSize: "18px",
                                color: "#FF5833",
                              }}
                            >
                              <img
                                onClick={() => {
                                  setPreviewModal(true);
                                  setSelectedTemplate(template);
                                }}
                                src={eye}
                                alt="dots"
                                width="30px"
                                height="30px"
                              />
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
            {previewModal && (
              <ContentPreviewModal
                previewModal={previewModal}
                setPreviewModal={setPreviewModal}
                selectedTemplate={selectedTemplate}
              />
            )}
          </>
        )}
      </Stack>
    </>
  );
}

export default SelectEmailCreative;
