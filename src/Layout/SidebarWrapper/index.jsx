import React from "react";
import { styled } from "@mui/material/styles";

import { SIDEBAR } from "constant/sidebar";
import SidebarItem from "./SidebarItem";
import Logo from "./Logo";
const Root = styled(`div`)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  padding: "23px 34px",

  background:
    "linear-gradient(0deg, rgba(38,78,220,1) 0%, rgba(38,181,255,1) 100%)",
}));

const SidebarWrapper = () => {
  return (
    <Root>
      <Logo />
      {SIDEBAR.map((item, index) => (
        <SidebarItem item={item} key={index} />
      ))}
    </Root>
  );
};

export default SidebarWrapper;
