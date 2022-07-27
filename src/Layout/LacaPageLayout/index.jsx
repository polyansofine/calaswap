import { ThemeProvider } from "@mui/material";
import React from "react";
import contentTheme from "theme/contentTheme";
const LacaPageLayout = ({ header, content }) => {
  return (
    <div>
      {header}
      <ThemeProvider theme={contentTheme}>{content}</ThemeProvider>
    </div>
  );
};

export default LacaPageLayout;
