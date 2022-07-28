import { createTheme } from "@mui/material/styles";
const contentTheme = createTheme({
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
      fontSize: "28px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "32px",
      fontWeight: 800,
    },
    h1: {
      fontSize: "60px",
      fontWeight: 800,
    },
    h4: {
      fontSize: "26px",
    },
    body1: {
      fontSize: "20px",
    },
    caption: {
      fontSize: "14px",
    },
  },
});
export default contentTheme;
