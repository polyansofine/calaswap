import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Slider,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";
import * as liquidityActions from "store/actions";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { extendToBigNumber, getErrorMessage, toFixed } from "utils/cls";
import { ethers } from "ethers";
import { minABI } from "constant/CLS_min_abi";
import { CONTRACT_ADDRESS } from "constant/contract_address";
import { BASE_BSC_SCAN_URLS } from "components/WalletConnectButton/config";
import RouterABI from "contract/abi/CLSRouter.json";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { TOKENS } from "constant/tokens";
import _ from "lodash";
import { StyledInnerPaper } from "../AddLiquidity";

const RemoveLiquidity = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  //   const { t } = useTranslation();
  const [value, setValue] = useState(30);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [allowance_price, setAllowancePrice] = useState();
  const { remove } = useSelector(
    ({ tokenReducers }) => tokenReducers.liquidity
  );
  const { address, provider } = useSelector(
    ({ authReducers }) => authReducers.auth.auth
  );

  const percentButtonStyle = {
    borderRadius: 4,
    background: theme.custom.gradient.tifi,
  };
  const mainButtonStyle = {
    height: "50px",
    background: theme.custom.gradient.tifi,
  };
  //   const dispatch = useDispatch();
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const getAllowance = React.useCallback(
    async (pairAddress) => {
      if (address && pairAddress) {
        const signer = provider.getSigner();
        let contract0 = new ethers.Contract(pairAddress, minABI, signer);
        const allow_price0 = await contract0.allowance(
          address,
          CONTRACT_ADDRESS.ROUTER_ADDRESS
        );
        setAllowancePrice(allow_price0 / 10 ** 18);
      }
    },
    [address, provider]
  );

  const updateBalance = React.useCallback(
    async (pairAddress) => {
      const signer = provider.getSigner();
      if (pairAddress) {
        let contract = new ethers.Contract(pairAddress, minABI, signer);
        const balance = await contract.balanceOf(address);
        dispatch(
          liquidityActions.updateBalance(pairAddress, balance / 10 ** 18)
        );
      }
    },
    [address, provider, dispatch]
  );
  useEffect(() => {
    const getData = async () => {
      await getAllowance(remove.address);
    };
    if (remove.balance) {
      getData();
    }
  }, [remove, getAllowance]);

  const handleEnable = async () => {
    setLoading(true);
    try {
      const signer = provider.getSigner();
      let contract0 = new ethers.Contract(remove.address, minABI, signer);

      let tx = await contract0.approve(
        CONTRACT_ADDRESS.ROUTER_ADDRESS,
        "1000000000000000000000000000000000000"
      );
      await tx.wait();
      await getAllowance(remove.address);
      dispatch(
        liquidityActions.showMessage({
          message: "Approved! Now you can remove liquidity.",
          href: BASE_BSC_SCAN_URLS[tx.chainId] + "/tx/" + tx.hash,
          title: "Check Transaction on BSCScan",
          variant: "success",
        })
      );
      setLoading(false);
    } catch (error) {
      dispatch(
        liquidityActions.showMessage({
          message: error.data ? error.data.message : error.message,
          variant: "error",
        })
      );
      setLoading(false);
    }
  };
  const handleRemove = async () => {
    setRemoveLoading(true);
    const signer = provider.getSigner();
    let contractPrice = new ethers.Contract(
      CONTRACT_ADDRESS.ROUTER_ADDRESS,
      RouterABI.abi,
      signer
    );
    const price = (remove.balance * value) / 100;
    let dateInAWeek = new Date();
    const deadline = Math.floor(dateInAWeek.getTime() / 1000) + 1000000;
    if (address != null) {
      try {
        let _amount;
        if (value === 100) {
          // Remove all balance
          let contract = new ethers.Contract(remove.address, minABI, signer);
          _amount = await contract.balanceOf(address);
        } else {
          _amount = extendToBigNumber(price);
        }
        let tx;
        if (remove.token0Title === "BNB") {
          tx = await contractPrice.removeLiquidityETH(
            remove.token1Address,
            _amount,
            0,
            0,
            address,
            deadline
          );
        } else if (remove.token1Title === "BNB") {
          tx = await contractPrice.removeLiquidityETH(
            remove.token0Address,
            _amount,
            0,
            0,
            address,
            deadline
          );
        } else {
          tx = await contractPrice.removeLiquidity(
            remove.token0Address,
            remove.token1Address,
            _amount,
            0,
            0,
            address,
            deadline
          );
        }
        dispatch(
          liquidityActions.showMessage({
            message: "Transaction Submitted!",
            href: BASE_BSC_SCAN_URLS[tx.chainId] + "/tx/" + tx.hash,
            title: "Check Transaction on BSCScan",
            variant: "info",
          })
        );
        await tx.wait();
        dispatch(
          liquidityActions.showMessage({
            message: "Liquidity Removal Success!",
            href: BASE_BSC_SCAN_URLS[tx.chainId] + "/tx/" + tx.hash,
            title: "Check Transaction on BSCScan",
            variant: "success",
          })
        );
        updateBalance(remove.address);
        setRemoveLoading(false);
      } catch (error) {
        dispatch(
          liquidityActions.showMessage({
            message: getErrorMessage(error),
            variant: "error",
          })
        );
        setRemoveLoading(false);
      }
    }
  };
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <IconButton
            onClick={() => dispatch(liquidityActions.setRemove(null))}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h6">Add Liquidity</Typography>
        </Grid>
        <Grid item>
          <Tooltip
            //   sx={{ width: 200 }}
            title="When you add liquidity, you are given pool tokens that represent your share. If you don't see a pool you joined in this list, try importing a pool below."
            placement="left"
          >
            <HelpOutlineIcon fontSize="small" />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 4 }}
      >
        <Grid item>
          <Typography>{"Amount (LP Tokens to Remove / Total)"}</Typography>
        </Grid>
        <Grid item>
          <Typography>
            {toFixed((value * remove.balance) / 100) +
              " / " +
              toFixed(remove.balance)}
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          //   width: "100%",
          borderRadius: 4,
          border: "1px solid #ffffff",
          py: 4,
          px: 8,
        }}
      >
        <Typography>{value}%</Typography>
        <Slider color="secondary" value={value} onChange={handleChange} />
        <Grid container justifyContent="space-between" alignItems="center">
          <Button
            onClick={() => setValue(25)}
            variant="contained"
            sx={percentButtonStyle}
          >
            25%
          </Button>
          <Button
            onClick={() => setValue(50)}
            variant="contained"
            sx={percentButtonStyle}
          >
            50%
          </Button>
          <Button
            onClick={() => setValue(75)}
            variant="contained"
            sx={percentButtonStyle}
          >
            75%
          </Button>
          <Button
            onClick={() => setValue(100)}
            variant="contained"
            sx={percentButtonStyle}
          >
            {"Max"}
          </Button>
        </Grid>
      </Box>
      <Grid container justifyContent="center">
        <ArrowDownwardIcon color="secondary" sx={{ my: 2 }} />
      </Grid>
      <Typography>{"You will Receive"}</Typography>
      <StyledInnerPaper>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Grid item>
            <Grid container alignItems="center">
              <img
                src={`/images/tokens/${
                  TOKENS[
                    _.findIndex(TOKENS, function (o) {
                      return o.title === remove.token0Title;
                    })
                  ].address
                }.png`}
                alt="coins"
                width="30px"
              />
              <Typography sx={{ ml: 2 }}>
                {"Pooled"} {remove.token0Title}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>
              {(remove.pool0 * remove.balance * value) / (remove.total * 100)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <img
                src={`/images/tokens/${
                  TOKENS[
                    _.findIndex(TOKENS, function (o) {
                      return o.title === remove.token1Title;
                    })
                  ].address
                }.png`}
                alt="coins"
                width="30px"
              />
              <Typography sx={{ ml: 2 }}>
                {"Pooled"} {remove.token1Title}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>
              {" "}
              {(remove.pool1 * remove.balance * value) / (remove.total * 100)}
            </Typography>
          </Grid>
        </Grid>
      </StyledInnerPaper>
      <Grid
        container
        columnSpacing={3}
        sx={{ mt: 3 }}
        justifyContent="space-evenly"
      >
        <Grid item sm={6}>
          <Button
            disabled={allowance_price > (remove.balance * value) / 100}
            variant="contained"
            sx={{ height: "50px" }}
            // sx={mainButtonStyle}
            fullWidth
            onClick={handleEnable}
          >
            {loading ? <CircularProgress /> : "Enable"}
          </Button>
        </Grid>
        <Grid item sm={6}>
          <Button
            disabled={allowance_price <= (remove.balance * value) / 100}
            variant="contained"
            fullWidth
            sx={{ height: "50px" }}
            // sx={mainButtonStyle}
            onClick={handleRemove}
          >
            {removeLoading ? <CircularProgress /> : "Remove"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default RemoveLiquidity;
