import { Grid, Typography } from "@mui/material";
import HeaderLayout from "Layout/HeaderLayout";
import React from "react";

const FarmHeader = () => {
  return (
    <HeaderLayout>
      <Grid container>
        <Grid item md={5}>
          <Typography variant="h2">Farms</Typography>
          <Typography sx={{ mt: 2 }}>
            Trade, earn, and win crypto on the most popular and win crypto on
            the most popular Trade, decentralized platform in the galaxy.
          </Typography>
        </Grid>
      </Grid>
    </HeaderLayout>
  );
};

export default FarmHeader;
