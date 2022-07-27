import React from "react";
import HomeHeaderItem from "./HomeHeaderItem/index";
import lowfee from "assets/icons/lowfee.svg";
import referral_program from "assets/icons/referral_program.svg";
import { Grid } from "@mui/material";

const HomeHeaderContent = () => {
  return (
    <div>
      <Grid container columnSpacing={2} direction="row" alignItems="stretch">
        <Grid item md={6}>
          <HomeHeaderItem
            title="Low Fee"
            content="Low exchange fees of 0.15%. More convenient,  lower fees. "
            icon={lowfee}
          />
        </Grid>
        <Grid item md={6}>
          <HomeHeaderItem
            title="Referral Program"
            content="Introduce Calaswap  to your friend via referral link Rewards will be given  from Swap, Farm and Pool "
            icon={referral_program}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeHeaderContent;
