import { Grid } from "@mui/material";
import HeaderLayout from "Layout/HeaderLayout";
import React from "react";
import HomeHeaderContent from "./HomeHeaderContent";
import HomeHeaderTitle from "./HomeHeaderTitle";

const HomeHeader = () => {
  return (
    <HeaderLayout>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item md={5} lg={5}>
          <HomeHeaderTitle />
        </Grid>
        <Grid item md={6} lg={6}>
          <HomeHeaderContent />
        </Grid>
      </Grid>
    </HeaderLayout>
  );
};

export default HomeHeader;
