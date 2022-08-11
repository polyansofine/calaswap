import { CssBaseline, responsiveFontSizes, ThemeProvider } from "@mui/material";
import Exchange from "page/exchage";
import Farm from "page/farm";
import HomePage from "page/main";
import Pools from "page/pools";
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
            <Route path="exchange" element={<Exchange />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routers;
