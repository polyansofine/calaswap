import { CircularProgress, styled, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import LiquidityItems from "./LiquidityItems";
// import LiquidityItem from "./LiquidityItems/LiquidityItem";
const Root = styled("div")(({ theme }) => ({
  display: "flex",
  height: 100,
  justifyContent: "center",
  alignItems: "center",
}));
const LiquidityList = ({ balances, handleAdd, loading }) => {
  const { address } = useSelector(({ authReducers }) => authReducers.auth.auth);
  return (
    <>
      {balances?.length > 0 ? (
        balances.map((item, index) => (
          <LiquidityItems item={item} key={index} handleAdd={handleAdd} />
        ))
      ) : (
        <Root>
          {address ? (
            loading ? (
              <CircularProgress />
            ) : (
              <Typography>No liquidity found</Typography>
            )
          ) : (
            <Typography>Connect to a wallet to view your liquidity.</Typography>
          )}
        </Root>
      )}
    </>
  );
};

export default LiquidityList;
