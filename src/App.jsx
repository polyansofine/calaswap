import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "Layout";
import { ThemeProvider } from "@mui/material";
import allTheme from "theme/allTheme";
import HomePage from "page/main";
import Farm from "page/farm";

function App() {
  return (
    <ThemeProvider theme={allTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="farming" element={<Farm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
