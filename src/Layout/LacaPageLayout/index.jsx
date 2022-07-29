import { responsiveFontSizes, ThemeProvider } from "@mui/material";
import React from "react";
import contentTheme from "theme/contentTheme";
const LacaPageLayout = ({ header, content }) => {
  return (
    <div>
      {header}
      <ThemeProvider
        theme={responsiveFontSizes(contentTheme, {
          breakpoints: ["xs", "sm", "md", "lg", "xl"],
          factor: 5,
        })}
      >
        {content}
      </ThemeProvider>
    </div>
  );
};

export default LacaPageLayout;
