import { Typography, Button } from "@mui/material";
import React from "react";

const HomeHeaderTitle = () => {
  return (
    <div>
      <Typography variant="h1" sx={{ textTransform: "uppercase" }}>
        c a l a s w a p
      </Typography>
      <Typography variant="h4">Anyone can become a market maker</Typography>
      <Button
        sx={{ my: 6, textTransform: "capitalize", borderRadius: 6 }}
        size="large"
        variant="contained"
      >
        <Typography variant="h3" sx={{ mx: 8, my: 1 }}>
          Trade Now
        </Typography>
      </Button>
      <Typography variant="body1">
        Trade your crypto on the most convenient DEX, Calaswap.Earn rewards and
        interest on your crypto.
      </Typography>
    </div>
  );
};

export default HomeHeaderTitle;
