import React, { useState } from "react";
import Logo from "../../assets/logo10.png";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComp from "./DrawerComp";

const PAGES = ["About Us", "Contact Information"];

const NavBar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    // Get the section ID corresponding to the selected tab
    const sectionId = PAGES[newValue].replace(/\s+/g, "-").toLowerCase();
    // Find the section element by ID
    const section = document.getElementById(sectionId);
    // If the section exists, scroll to it
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar
      position="fixed" // Fixed position at the top
      sx={{
        backgroundColor: "#E0E9FF",
        height: "80px",
        boxShadow: "0.1",
      }}
    >
      <Toolbar>
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: "225px",
            height: "75px",
            top: "0",
            left: "0",
          }}
        />
        {isMatch ? (
          <DrawerComp />
        ) : (
          <>
            <Tabs
              value={value}
              onChange={(e, value) => {
                setValue(value);
                handleTabChange(e, value);
              }}
              indicatorColor="secondary"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#7f8c8d", // Set the color to your desired shade of grey
                },
                "& .Mui-selected": {
                  background: "linear-gradient(45deg, #2196F3, #9C27B0)", // Apply a gradient background for the selected tab
                  WebkitBackgroundClip: "text", // Clip the text to the background gradient
                  color: "transparent", // Set the text color to transparent
                },
                marginLeft: "auto",
              }}
            >
              {PAGES.map((page, index) => (
                <Tab key={index} label={page} />
              ))}
            </Tabs>
            <Button
              sx={{
                marginLeft: "auto",
                color: "#A3ACFF", // Change text color to your desired shade
                borderColor: "#A3ACFF", // Change border color to your desired shade
              }}
              variant="outlined"
              component={Link}
              to="/login"
            >
              Login
            </Button>

            <Button
              sx={{
                marginLeft: "10px",
                color: "#A3ACFF", // Change text color to your desired shade
                borderColor: "#A3ACFF", // Change border color to your desired shade
              }}
              variant="outlined"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
