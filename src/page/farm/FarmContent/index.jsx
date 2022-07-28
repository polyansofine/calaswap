import { styled } from "@mui/material";
import React from "react";
import FarmTable from "./FarmTable";
import FilterPanel from "./FilterPanel";

const Root = styled("div")(({ theme }) => ({
  background: "#F1F3FF",
  padding: "35px 102px",
  //   marginTop: "40px",
  marginBottom: "-23px",
}));
const FarmContent = () => {
  return (
    <Root>
      <FilterPanel />
      <FarmTable />
    </Root>
  );
};

export default FarmContent;
