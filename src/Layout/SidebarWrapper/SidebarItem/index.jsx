import {
  ListItem,
  Grid,
  Typography,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "30px" }}>
      <ListItem key={item.name} disablePadding>
        <ListItemButton
          onClick={() => {
            navigate(`${item.name}`);
          }}
        >
          <ListItemIcon>
            <img src={item.icon} alt={item.name} />
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
    </div>
  );
};

export default SidebarItem;
