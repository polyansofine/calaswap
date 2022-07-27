import { Grid, Paper, styled, Typography } from "@mui/material";
import React from "react";
import holder from "assets/token_icons/holder.svg";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

const Root = styled("div")(({ theme }) => ({
  border: "1px solid #D0D6EE",
  borderRadius: "12px",
  background: "white",
  //   width: "100%",
  padding: "0px 40px",
  marginTop: "40px",
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 34,
  height: 34,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const SmallBox = styled("div")(({ theme }) => ({
  background: "#F1F3FF",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 10px",
}));
const PairListItem = ({ icon, value, title }) => {
  return (
    <Root>
      <Grid
        container
        alignItems="center"
        sx={{ height: "100px" }}
        columnSpacing={2}
      >
        <Grid container item md={6} columnSpacing={1} alignItems="center">
          <Grid item>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<SmallAvatar alt="Remy Sharp" src={holder} />}
            >
              <Avatar
                alt="Travis Howard"
                sx={{ width: 60, height: 60 }}
                src={icon}
              />
            </Badge>
          </Grid>
          <Grid item>
            <Typography>{title}</Typography>
            <Typography variant="caption" sx={{ color: "#6B7AB7" }}>
              Stake CLS-Earn CLS
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <Typography sx={{ color: "#6B7AB7" }}>
            APY <span style={{ color: "#3659EA" }}>{value}</span>{" "}
          </Typography>
        </Grid>
        <Grid item md={3}>
          <SmallBox>
            <Typography sx={{ color: "#3659EA" }}>Stake CLS</Typography>
          </SmallBox>
        </Grid>
      </Grid>
    </Root>
  );
};

export default PairListItem;
