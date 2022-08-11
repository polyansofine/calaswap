import { AppBar, Grid, Toolbar } from "@mui/material";
import WalletConnect from "components/WalletConnect";
import React from "react";

const Header = () => {
  return (
    <div>
      <AppBar color="secondary">
        <Toolbar>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <WalletConnect />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
