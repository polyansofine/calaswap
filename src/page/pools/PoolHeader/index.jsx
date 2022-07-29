import { Grid, Typography } from "@mui/material";
import HeaderLayout from "Layout/HeaderLayout";
import React from "react";

const PoolHeader = () => {
  return (
    <HeaderLayout>
      <Grid container>
        <Grid item md={5}>
          <Typography variant="h2">Pools</Typography>
          <Typography sx={{ mt: 2 }}>
            Jist stake some tokens to earn.
          </Typography>
          <Typography>High APR, Low risk.</Typography>
        </Grid>
      </Grid>
    </HeaderLayout>
  );
};

export default PoolHeader;
