import { createTheme } from "@mui/material/styles";
const exchangeTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1450,
      xl: 1700,
    },
  },
  palette: {},
  typography: {
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#000",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#000",
    },
    body1: {
      fontSize: "1.125rem",
      color: "#949494",
    },
    body2: {
      fontSize: "1rem",
      color: "#000",
    },
  },
});
export default exchangeTheme;
