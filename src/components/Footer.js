import React from "react";
import {
  Stack,
  Grid,
  Box,
  Button as SimpleButton,
} from "@mui/material";

function Footer() {
  return (
    <Stack>
      <Box sx={{ background: "#09D8C4" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            color: "#1F074F",
          }}
        >
          ©2020 Loyalty | All Rights Reserved
        </Box>
      </Box>
      <Box sx={{ height: "270px", background: "#1F074F" }}>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Grid container sx={{ width: "80%", padding: "10px 0px" }}>
            <Grid item xs={3}>
              <Box sx={{ color: "#09D8C4" }}>About Us</Box>
              <Box sx={{ color: "#FFFFFF", fontSize: "16px" }}>
                Loyalty Prime is a leading international provider of innovative
                customer loyalty solutions for enterprise clients. With our
                award-winning SaaS Loyalty Platform, we help companies around
                the world create the leading loyalty programs in their industry.
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <Box sx={{ color: "#09D8C4" }}>Information</Box>
              <Stack gap={2} sx={{ paddingTop: "30px" }}>
                <Box sx={{ color: "#FFFFFF" }}>Platform</Box>
                <Box sx={{ color: "#FFFFFF" }}>Features</Box>
                <Box sx={{ color: "#FFFFFF" }}>Integration APIs</Box>
                <Box sx={{ color: "#FFFFFF" }}>Pricing</Box>
              </Stack>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "center" }}>
              <Box sx={{ color: "#09D8C4" }}>Helpful Links</Box>
              <Stack gap={2} sx={{ paddingTop: "30px" }}>
                <Box sx={{ color: "#FFFFFF" }}>Services</Box>
                <Box sx={{ color: "#FFFFFF" }}>Supports</Box>
                <Box sx={{ color: "#FFFFFF" }}>Terms and Conditions</Box>
                <Box sx={{ color: "#FFFFFF" }}>Privacy Policy</Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}

export default Footer;
