import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { LocalHospital, Favorite } from "@mui/icons-material";

const AboutUsSection = () => {
  return (
    <StyledPaper elevation={3} id="about-us">
      <Grid container spacing={3}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h4" gutterBottom>
            <LocalHospital fontSize="large" /> Our Story
          </Typography>
          <Typography variant="body1">
            At SehatSathi, our mission is to provide compassionate and
            comprehensive healthcare services to every individual. Founded by a
            team of dedicated healthcare professionals, we aim to make quality
            healthcare accessible and affordable to all, regardless of their
            background or income level.
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h4" gutterBottom>
            <Favorite fontSize="large" /> Our Vision
          </Typography>
          <Typography variant="body1">
            Our vision is to create a healthier community by empowering
            individuals to take control of their health and well-being. We
            strive to be the leading healthcare provider, known for our
            commitment to excellence, innovation, and patient-centered care.
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h4" gutterBottom>
            <LocalHospital fontSize="large" /> Services Provided
          </Typography>
          <Typography variant="body1">
            - Primary Care
            <br />
            - Specialist Consultation
            <br />
            - Diagnostic Services
            <br />
            - Emergency Care
            <br />
            - Health Education Programs
            <br />- Preventive Health Screenings
          </Typography>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default AboutUsSection;

// Styles
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "10px",
  backgroundColor: "#f8f8f8",
  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
}));
