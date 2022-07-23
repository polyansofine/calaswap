import { Grid } from "@mui/material";
import React from "react";
import SidebarWrapper from "./SidebarWrapper";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <Grid container>
      <Grid item>
        <SidebarWrapper />
      </Grid>
      <Grid item>
        {/* {children} */}
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
