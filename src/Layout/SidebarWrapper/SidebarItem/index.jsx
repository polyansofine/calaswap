import { ListItem, Grid, Typography } from "@mui/material";
import React from "react";

const SidebarItem = ({ item }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <ListItem>
        <Grid container alignItems="center" columnSpacing={2}>
          <Grid item>
            <img src={item.icon} alt={item.name} />
          </Grid>
          <Grid item>
            <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
              {item.name}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
};

export default SidebarItem;
