import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
  Link,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Logo from "../../assets/logo2.png";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#E0E9FF" }}>
      <Toolbar>
        {/* First Row */}
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <img src={Logo} alt="Logo" style={{ width: 200 }} />
          </Grid>
          {/* Middle Row */}
          <Grid item>
            <Button
              color="inherit"
              onClick={() => scrollToSection("about-us")}
              style={{ color: "black" }}
            >
              About Us
            </Button>
            <Button
              color="inherit"
              onClick={() => scrollToSection("contact-information")}
              style={{ color: "black" }}
            >
              Contact Information
            </Button>
          </Grid>
          {/* Last Row */}
          <Grid item>
            <Typography
              variant="body2"
              color="textPrimary"
              style={{ marginRight: 8 }}
            >
              Follow us
            </Typography>
            <IconButton style={{ color: "#3b5998" }}>
              <FontAwesomeIcon icon={faFacebook} />
            </IconButton>
            <IconButton style={{ color: "#00acee" }}>
              <FontAwesomeIcon icon={faTwitter} />
            </IconButton>
            <IconButton style={{ color: "#c32aa3" }}>
              <FontAwesomeIcon icon={faInstagram} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
      {/* Footer Information */}
    </AppBar>
  );
};

export default Footer;
