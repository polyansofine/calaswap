import { createTheme } from "@mui/material/styles";
const allTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1450,
      xl: 1700,
    },
  },
  palette: {
    primary: {
      main: "#FEAD50",
      contrastText: "#ffffff",
    },
  },
  typography: {
    color: "#ffffff",
    fontFamily: "Kanit, sans-serif",
    h3: {
      color: "#ffffff",
      fontSize: "1.3125rem",
    },
    h2: {
      color: "#ffffff",
      fontSize: "2rem",
      fontWeight: 800,
    },
    h1: {
      fontSize: "3.75rem",
      fontWeight: 800,
      color: "#ffffff",
    },
    h4: {
      fontSize: "1.625rem",
      color: "#ffffff",
    },
    body1: {
      fontSize: "1.25rem",
      color: "#ffffff",
    },
  },
});

export default allTheme;
