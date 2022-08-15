import {
  Grid,
  Paper,
  responsiveFontSizes,
  styled,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import ExchangeTabs from "./ExchangeTabs";
import exchangeTheme from "theme/exchangeTheme";
const Root = styled(Paper)(({ theme }) => ({
  width: "500px",
  minHeight: "400px",
  borderRadius: 16,
  padding: "30px 8px",
}));
const Exchange = () => {
  return (
    <ThemeProvider
      theme={responsiveFontSizes(exchangeTheme, {
        breakpoints: ["xs", "sm", "md", "lg", "xl"],
        factor: 5,
      })}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Root>
          <ExchangeTabs />
        </Root>
      </Grid>
    </ThemeProvider>
  );
};

export default Exchange;
