import React from "react";
import { Grid, Typography } from "@mui/material";
import logo from "assets/icons/logo.svg";

const Logo = () => {
  return (
    <Grid container columnSpacing={2} alignItems="center">
      <Grid item>
        <img src={logo} alt="logo" />
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
