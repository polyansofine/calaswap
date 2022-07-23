import React from "react";
import { styled } from "@mui/material";
const Root = styled("div")(({ theme }) => ({
  padding: "93px 128px",
}));
const HeaderLayout = ({ children }) => {
  return <Root>{children}</Root>;
};

export default HeaderLayout;
