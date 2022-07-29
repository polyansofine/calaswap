import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import logo from "assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Grid
      container
      columnSpacing={{ xl: 2, lg: 2 }}
      alignItems="center"
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer" }}
    >
      <Grid item>
        <img
          src={logo}
          alt="logo"
          style={{
            width: matches ? "20px" : "30px",
          }}
        />
      </Grid>
      <Grid item>
        <Typography sx={{ textTransform: "uppercase" }} variant="h2">
          calaswap
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Logo;
