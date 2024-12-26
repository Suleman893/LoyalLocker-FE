import React from "react";
import {
  Stack,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

function CampaignName({
  campaignName,
  handleChange,
  emailSubject,
  senderEmail,
  senderName,
  errors,
  touched,
}) {
  return (
    <>
      <Stack
        sx={{
          marginTop: "50px",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
        >
          Name your Campaign
        </Typography>
      </Stack>
      <Stack>
        <InputLabel
          htmlFor="username"
          sx={{ color: "#232323", fontSize: "14px", paddingBottom: "5px" }}
        >
          Campaign Name *
        </InputLabel>
        <TextField
          id="username"
          variant="outlined"
          placeholder="Campaign name here"
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          name="campaignName"
          value={campaignName}
          onChange={handleChange}
        />
        {errors.campaignName || touched.campaignName ? (
          <p style={{ fontSize: "12px", color: "red" }}>
            {errors.campaignName}
          </p>
        ) : null}
      </Stack>

      <Grid gap={2} container sx={{ marginTop: "30px" }}>
        <Grid item md={5.8}>
          <InputLabel
            htmlFor="username"
            sx={{ color: "#232323", fontSize: "14px", paddingBottom: "5px" }}
          >
            Campaign Sender Email *
          </InputLabel>
          <TextField
            id="username"
            variant="outlined"
            placeholder="Enter Campaign Sender Email"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            name="senderEmail"
            value={senderEmail}
            onChange={handleChange}
          />
          {errors.senderEmail || touched.senderEmail ? (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errors.senderEmail}
            </p>
          ) : null}
        </Grid>
        <Grid item md={5.8}>
          <InputLabel
            htmlFor="username"
            sx={{ color: "#232323", fontSize: "14px", paddingBottom: "5px" }}
          >
            Campaign Sender Name *
          </InputLabel>
          <TextField
            id="username"
            variant="outlined"
            placeholder="Enter Campaign Sender Name"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            name="senderName"
            value={senderName}
            onChange={handleChange}
          />

          {errors.senderName || touched.senderName ? (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errors.senderName}
            </p>
          ) : null}
        </Grid>
      </Grid>
      <Grid gap={2} container sx={{ marginTop: "30px" }}>
        <Grid item md={5.8}>
          <InputLabel
            htmlFor="username"
            sx={{ color: "#232323", fontSize: "14px", paddingBottom: "5px" }}
          >
            Campaign Email Subject *
          </InputLabel>
          <TextField
            id="username"
            variant="outlined"
            placeholder="Enter Campaign Email Subject"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            name="emailSubject"
            value={emailSubject}
            onChange={handleChange}
          />
          {errors.emailSubject || touched.emailSubject ? (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errors.emailSubject}
            </p>
          ) : null}
        </Grid>
      </Grid>
      <Stack
        gap={2}
        sx={{ marginTop: "20px", flexDirection: "row", alignItems: "center" }}
      >
        <InputLabel sx={{ fontSize: "14px", color: "#232323" }}>
          Communication Channel
        </InputLabel>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
            <FormControlLabel
              value="email"
              checked={true}
              control={
                <Radio
                  style={{
                    color: "#0B7974",
                  }}
                />
              }
              label={
                <span
                  style={{
                    fontSize: "14px",
                    color: "#0B7974",
                  }}
                >
                  Email
                </span>
              }
            />
            <FormControlLabel
              disabled={true}
              value="sms"
              control={
                <Radio
                  style={{
                    color: "#828282",
                  }}
                  disabled={true}
                />
              }
              label={
                <span
                  style={{
                    fontSize: "14px",
                    color: "#828282",
                  }}
                >
                  SMS
                </span>
              }
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      {/* <Stack gap={2} sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
          sx={{
            color: "#0B7974",
            border: '1px solid #0B7974',
            borderRadius: "10px",
            height: "52px",
            width: '240px',
            marginTop: "15px",
            textTransform: 'none'
            // "&:hover": {
            //     cursor: "pointer",
            //     background: "#0B7974",
            // },
          }}
        >
          Cancel
        </Button>
        <CustomButton width='240px' text='Next' />
      </Stack> */}
    </>
  );
}

export default CampaignName;
