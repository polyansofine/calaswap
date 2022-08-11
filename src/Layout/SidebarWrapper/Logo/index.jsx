import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import logo from "assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      <List sx={{ ml: -4 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(`/`);
            }}
          >
            <ListItemIcon>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: matches ? "20px" : "30px",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ textTransform: "uppercase" }} variant="h2">
                  calaswap
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};
export default Logo;
