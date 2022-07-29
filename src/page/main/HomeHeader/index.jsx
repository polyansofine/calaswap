import { Grid } from "@mui/material";
import HeaderLayout from "Layout/HeaderLayout";
import React from "react";
import HomeHeaderContent from "./HomeHeaderContent";
import HomeHeaderTitle from "./HomeHeaderTitle";

const HomeHeader = () => {
  return (
    <HeaderLayout>
      <Grid
        container
        columnSpacing={{ xl: 16, lg: 3, md: 2 }}
        alignItems="center"
      >
        <Grid item md={5} lg={5}>
          <HomeHeaderTitle />
        </Grid>
        <Grid item md={7} lg={7}>
          <HomeHeaderContent />
        </Grid>
      </Grid>
    </HeaderLayout>
  );
};

export default HomeHeader;
