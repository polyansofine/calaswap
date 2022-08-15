import { CssBaseline, responsiveFontSizes, ThemeProvider } from "@mui/material";
import FuseMessage from "components/FuseMessage";
import Analytics from "page/analytics";
import Exchange from "page/exchage";
import Farm from "page/farm";
import Launchpad from "page/launchpad";
import LiquidityPage from "page/liquidity";
import Lottery from "page/lottery";
import HomePage from "page/main";
import Pools from "page/pools";
import Presale from "page/presale";
import Referral from "page/referral";
import Voting from "page/voting";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import allTheme from "theme/allTheme";

import Layout from "../Layout";

const Routers = () => {
  return (
    <ThemeProvider
      theme={responsiveFontSizes(allTheme, {
        breakpoints: ["xs", "sm", "md", "lg", "xl"],
        factor: 5,
      })}
    >
      {/* <CssBaseline /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="farming" element={<Farm />} />
            <Route path="pooling" element={<Pools />} />
            <Route path="liquidity" element={<LiquidityPage />} />
            <Route path="presale" element={<Presale />} />
            <Route path="launchpad" element={<Launchpad />} />
            <Route path="lottery" element={<Lottery />} />
            <Route path="voting" element={<Voting />} />
            <Route path="referral" element={<Referral />} />
            <Route path="analytics" element={<Analytics />} />

            <Route path="exchange" element={<Exchange />} />
          </Route>
        </Routes>
        <FuseMessage />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routers;
