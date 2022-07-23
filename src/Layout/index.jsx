import { Grid } from "@mui/material";
import React from "react";
import SidebarWrapper from "./SidebarWrapper";

const Layout = ({ children }) => {
  return (
    <Grid container>
      <Grid item width="300px">
        <SidebarWrapper />
      </Grid>
      <Grid item md="auto" xs="auto">
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
