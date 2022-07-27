import { Button, Grid, styled, Typography } from "@mui/material";
import React from "react";
import PairListItem from "./PairListItem";
import asta from "assets/token_icons/asta.svg";
import holder from "assets/token_icons/holder.svg";
import myce from "assets/token_icons/myce.svg";

const Root = styled("div")(({ theme }) => ({
  background: "#F1F3FF",
  padding: "59px 136px",
  marginTop: "40px",
  marginBottom: "-23px",
}));
const HomeContent = () => {
  return (
    <Root>
      <Grid container columnSpacing={14}>
        <Grid item md={6}>
          <Typography variant="h3">Earn CLS + Fees in Farms</Typography>
          <PairListItem icon={holder} title="Holder Pool" value="62.89%" />
          <PairListItem icon={asta} title="Earn ASTA" value="73.28%" />
          <PairListItem icon={myce} title="Earn MYCE" value="96.32%" />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h3">Pools</Typography>
          <PairListItem icon={holder} title="Holder Pool" value="62.89%" />
          <PairListItem icon={asta} title="Earn ASTA" value="73.28%" />
          <PairListItem icon={myce} title="Earn MYCE" value="96.32%" />
        </Grid>
      </Grid>
    </Root>
  );
};

export default HomeContent;
