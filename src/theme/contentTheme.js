import { createTheme } from "@mui/material/styles";
const contentTheme = createTheme({
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
    secondary: {
      main: "#3659EA",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#F8F8F8",
      contrastText: "#3659EA",
    },
    info: {
      main: "#E20B46",
      contrastText: "#ffffff",
    },
  },
  typography: {
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 800,
    },
    h1: {
      fontSize: "3.75rem",
      fontWeight: 800,
    },
    h4: {
      fontSize: "1.625rem",
    },
    body1: {
      fontSize: "1.25rem",
    },
    caption: {
      fontSize: "0.875rem",
    },
  },
});
export default contentTheme;
