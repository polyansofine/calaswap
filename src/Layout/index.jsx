import { Grid } from "@mui/material";
import React from "react";
import SidebarWrapper from "./SidebarWrapper";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <Grid container flexDirection="row">
      <Grid item xs={2} minWidth="250px">
        <SidebarWrapper />
      </Grid>
      <Grid item xs>
        {/* {children} */}
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
