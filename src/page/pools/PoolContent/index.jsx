import { styled } from "@mui/material";
import FilterPanel from "page/farm/FarmContent/FilterPanel";
import React from "react";
// import FarmTable from "./FarmTable";
import PoolTable from "./PoolTable";
// import FilterPanel from "./FilterPanel";

const Root = styled("div")(({ theme }) => ({
  background: "#F1F3FF",
  padding: "35px 102px",
  [theme.breakpoints.down("lg")]: {
    padding: "29px 40px",
  },
  //   marginTop: "40px",
  marginBottom: "-23px",
}));
const PoolContent = () => {
  return (
    <Root>
      <FilterPanel />
      <PoolTable />
    </Root>
  );
};

export default PoolContent;
