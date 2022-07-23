import { createTheme } from "@mui/material/styles";
const allTheme = createTheme({
  palette: {
    primary: {
      main: "#FEAD50",
      contrastText: "#ffffff",
    },
  },
  typography: {
    color: "#ffffff",
    h3: {
      color: "#ffffff",
      fontSize: "21px",
    },
    h2: {
      color: "#ffffff",
      fontSize: "32px",
      fontWeight: 800,
    },
    h1: {
      fontSize: "60px",
      fontWeight: 800,
      color: "#ffffff",
    },
    h4: {
      fontSize: "26px",
      color: "#ffffff",
    },
    body1: {
      fontSize: "20px",
      color: "#ffffff",
    },
  },
});
export default allTheme;
