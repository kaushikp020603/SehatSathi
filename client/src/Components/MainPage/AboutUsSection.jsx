import React from "react";
import { Typography, Grid, Paper, Divider, Box } from "@mui/material";
import { styled } from "@mui/system";
import { LocalHospital, Favorite } from "@mui/icons-material";

const AboutUsSection = () => {
  return (
    <StyledPaper elevation={6} id="about-us">
      <Grid container spacing={4}>
        <Grid item xs={12} textAlign="center">
          <SectionTitle variant="h3" gutterBottom>
            About Us
          </SectionTitle>
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <SectionIcon>
            <LocalHospital fontSize="large" />
          </SectionIcon>
          <Typography variant="h5" gutterBottom>
            Our Story
          </Typography>
          <Divider />
          <Typography variant="body1" marginTop={2}>
            At AarogyaMarg, our mission is to provide compassionate and
            comprehensive healthcare services to every individual. Founded by a
            team of dedicated healthcare professionals, we aim to make quality
            healthcare accessible and affordable to all, regardless of their
            background or income level.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <SectionIcon>
            <Favorite fontSize="large" />
          </SectionIcon>
          <Typography variant="h5" gutterBottom>
            Our Vision
          </Typography>
          <Divider />
          <Typography variant="body1" marginTop={2}>
            Our vision is to create a healthier community by empowering
            individuals to take control of their health and well-being. We
            strive to be the leading healthcare provider, known for our
            commitment to excellence, innovation, and patient-centered care.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <SectionIcon>
            <LocalHospital fontSize="large" />
          </SectionIcon>
          <Typography variant="h5" gutterBottom>
            Services Provided
          </Typography>
          <Divider />
          <Typography variant="body1" marginTop={2}>
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
  padding: theme.spacing(6),
  borderRadius: "15px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  margin: theme.spacing(4, 0),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "#2E7D32",
  fontWeight: 600,
}));

const SectionIcon = styled(Box)(({ theme }) => ({
  color: "#2E7D32",
  marginBottom: theme.spacing(2),
}));
