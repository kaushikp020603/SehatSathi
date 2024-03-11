import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const PAGES = ["About Us", "Contact Information"];

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#E0E9FF",
          },
        }}
      >
        <List>
          {PAGES.map((page, index) => (
            <ListItemButton
              key={index}
              onClick={() => setOpenDrawer(false)}
              component={Link}
              to={`/${page.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <ListItemText>{page}</ListItemText>
            </ListItemButton>
          ))}
          <ListItemButton
            component={Link}
            to="/login"
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemText>Login</ListItemText>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/register"
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemText>Register</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <Button
        variant="outlined"
        sx={{
          marginLeft: "auto",
        }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuOutlinedIcon />
      </Button>
    </React.Fragment>
  );
};

export default DrawerComp;
