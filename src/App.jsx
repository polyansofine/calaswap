import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "Layout";
import { ThemeProvider } from "@mui/material";
import allTheme from "theme/allTheme";

function App() {
  return (
    <ThemeProvider theme={allTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
