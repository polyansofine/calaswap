import React from "react";
import spyder from "assets/spyder.svg";
import { Grid, styled, Typography } from "@mui/material";
const Root = styled(`div`)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(12px)",
  padding: "80px 30px 0px 30px",
  backgroundImage: `url(${spyder})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right top",
  height: "100%",
}));
const HomeHeaderItem = ({ title, content, icon }) => {
  return (
    <Root>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item>
          <img src={icon} alt="lowfee" />
        </Grid>
        <Grid item sx={{ my: 3 }}>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {content}
          </Typography>
        </Grid>
      </Grid>
    </Root>
  );
};

export default HomeHeaderItem;
