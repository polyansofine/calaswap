import { Box, Divider, Grid, Tooltip, Typography } from "@mui/material";
import { Button } from "@pancakeswap/uikit";
import React, { useEffect, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LiquidityList from "./LiquidityList";
import AddLiquidity from "./AddLiquidity";
import { useDispatch, useSelector } from "react-redux";
import { LP_TOKENS } from "constant/lp_tokens";
import { ethers } from "ethers";
import { minABI } from "constant/CLS_min_abi";
import { TOKENS } from "constant/tokens";
import _ from "lodash";
import * as liquidityActions from "store/actions";
import RemoveLiquidity from "./RemoveLiquidity";

const Liquidity = () => {
  const { address, provider } = useSelector(
    ({ authReducers }) => authReducers.auth.auth
  );
  const { remove, balances } = useSelector(
    ({ tokenReducers }) => tokenReducers.liquidity
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);

  const getBalance = React.useCallback(async () => {
    setLoading(true);
    let tmp = [];
    const signer = provider.getSigner();
    try {
      if (address != null) {
        await Promise.all(
          LP_TOKENS.map(async (item, index) => {
            let contract = new ethers.Contract(item.address, minABI, signer);
            const lp_val0 = await contract.balanceOf(address);
            console.log("lp===", lp_val0);
            const temp_val = lp_val0 / 10 ** 18;
            if (temp_val > 0) {
              tmp.push({
                balance: temp_val,
                token0Title: item.token0_name,
                token1Title: item.token1_name,
                address: item.address,
                token0Address:
                  TOKENS[
                    _.findIndex(TOKENS, (o) => o.title === item.token0_name)
                  ].address,
                token1Address:
                  TOKENS[
                    _.findIndex(TOKENS, (o) => o.title === item.token1_name)
                  ].address,
              });
            }
          })
        );
        dispatch(liquidityActions.getLiquidityBalance(tmp));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [address, dispatch, provider]);
  useEffect(() => {
    const getData = async () => {
      await getBalance();
    };
    if (address && provider) {
      getData();
    }
  }, [address, provider, getBalance]);
  return (
    <div>
      {remove?.balance ? (
        <RemoveLiquidity />
      ) : add ? (
        <>
          <AddLiquidity handleBack={() => setAdd(false)} />
        </>
      ) : (
        <>
          <Typography variant="h6">Liquidity</Typography>
          <Typography sx={{ mb: 2 }}>
            Add liquidity to receive LP tokens
          </Typography>
          <Button onClick={() => setAdd(true)}>Add Liquidity</Button>
          <Divider sx={{ my: 3 }} />
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: 600 }}>Your Liquidity</Typography>
            <Tooltip
              //   sx={{ width: 200 }}
              title="When you add liquidity, you are given pool tokens that represent your share. If you don't see a pool you joined in this list, try importing a pool below."
              placement="left"
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Grid>
          <Box sx={{ my: 3 }}>
            <LiquidityList
              balances={balances}
              handleAdd={() => setAdd(true)}
              loading={loading}
            />
          </Box>
          <Typography>Don't see a pool you joined? Import it.</Typography>
          <Typography>
            Or, if you staked your LP tokens in a farm, unstake them to see them
            here.
          </Typography>
        </>
      )}
    </div>
  );
};

export default Liquidity;
