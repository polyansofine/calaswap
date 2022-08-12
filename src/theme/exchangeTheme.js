import { createTheme } from "@mui/material/styles";

const colorBlue = "#005bcf";
const colorGray = "#999";
const colorDarkBg = "#012";
const buttonBase = {
  borderRadius: 1,
  color: "#fff",
  border: "1px solid #666",
};

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
  custom: {
    palette: {},
    gradient: {
      pink: `linear-gradient(90deg, rgba(198,20,203,1) 32%, rgba(143,13,94,1) 88%)`,
      grey: `linear-gradient(90deg, #969797 0%, #1E2848 100%)`,
      green: `linear-gradient(90deg, #32CE27 0%, #2A4428 100%)`,
      blue: `linear-gradient(90deg, #1FC7D3 0%, #0A4428 100%)`,
      tifi: `linear-gradient(90deg, #1161b1 0%, #005bcf 100%)`,
    },
    swapButton: {
      ...buttonBase,
      backgroundColor: colorBlue,
      height: "50px",
      my: 2,
    },
    disabledButton: {
      ...buttonBase,
      backgroundColor: colorGray,
      height: "50px",
      my: 2,
    },
  },
});
export default exchangeTheme;
