import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "Layout";
import { responsiveFontSizes, ThemeProvider } from "@mui/material";
import allTheme from "theme/allTheme";
import HomePage from "page/main";
import Farm from "page/farm";
import Pools from "page/pools";
import Exchange from "page/exchage";

function App() {
  return (
    <ThemeProvider
      theme={responsiveFontSizes(allTheme, {
        breakpoints: ["xs", "sm", "md", "lg", "xl"],
        factor: 5,
      })}
    >
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
}

export default App;
