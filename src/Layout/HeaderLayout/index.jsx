import React from "react";
import { styled } from "@mui/material";
const Root = styled("div")(({ theme }) => ({
  padding: "93px 128px",
  [theme.breakpoints.down("lg")]: {
    padding: "46px 64px",
  },
  // [theme.breakpoints.down("md")]: {
  //   padding: "23px 32px",
  // },
}));
const HeaderLayout = ({ children }) => {
  return <Root>{children}</Root>;
};

export default HeaderLayout;
