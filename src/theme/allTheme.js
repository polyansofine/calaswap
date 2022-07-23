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
  },
});
export default allTheme;
