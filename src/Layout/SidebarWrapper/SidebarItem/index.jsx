import { ListItem, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "30px" }}>
      <ListItem
        onClick={() => {
          navigate(`${item.name}`);
        }}
        sx={{ cursor: "pointer" }}
      >
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
