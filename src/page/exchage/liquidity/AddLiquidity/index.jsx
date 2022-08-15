import {
  Button,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  InputBase,
  Paper,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { minABI } from "constant/CLS_min_abi";
import {
  calculatePriceImpact,
  extendToBigNumber,
  getErrorMessage,
  getSwapPath,
  getTokenPath,
  getTokenPriceUsingAmount,
  toFixed,
  tokenMap,
} from "utils/cls";
import { CONTRACT_ADDRESS } from "constant/contract_address";
import getPrice from "contract/abi/GetPrice.json";
import getNodeUrl from "components/WalletConnectButton/utils/getRpcUrl";
import * as fuseActions from "store/actions";
import RouterABI from "contract/abi/CLSRouter.json";
import { BASE_BSC_SCAN_URLS } from "components/WalletConnectButton/config";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import TokenSearchModal, { TYPE_LIQUIDITY } from "components/token_modal";
import WalletConnectButton from "components/WalletConnectButton";

const StyledDiv = styled("div")(({ theme }) => ({
  border: "2px solid #cccccc",
  borderRadius: 12,
  padding: 14,
}));
const StyledInput = styled(InputBase)(({ theme }) => ({
  color: "#000",
  fontWeight: 600,
}));

const CoinButton = React.forwardRef(({ src, children, ...rest }, ref) => {
  return (
    <Button
      ref={ref}
      {...rest}
      startIcon={
        <img
          width="20px"
          height="20px"
          style={{ borderRadius: "50%" }}
          src={src}
          alt="eth"
        />
      }
      endIcon={<KeyboardArrowDownIcon />}
    >
      {children}
    </Button>
  );
});

export const StyledInnerPaper = styled("div")(({ text }) => ({
  //   width: "100%",
  padding: "16px",
  borderRadius: "16px",
  border: "2px solid #cccccc",
  //   background: "#202231",
  //   color: "grey",
}));

const AddLiquidity = ({ handleBack }) => {
  //   const { t } = useTranslation();
  const { reserve0, reserve1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.token
  );
  const { token0, token1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.liquidity
  );
  const { address, provider } = useSelector(
    ({ authReducers }) => authReducers.auth.auth
  );
  const [token_index, setTokenIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [price0, setPrice0] = useState("");
  const [price1, setPrice1] = useState("");
  const theme = useTheme();
  const [balance, setBalance] = useState();
  const [balance1, setBalance1] = useState();
  const [copy, setCopy] = useState(false);
  const [perPrice, setPerPrice] = useState([]);
  const [allow0_price, setAllowPrice0] = useState();
  const [allow1_price, setAllowPrice1] = useState();
  const [allow0, setAllow0] = useState(false);
  const [allow1, setAllow1] = useState(false);
  const [available_balance, setAvailableBalance] = useState(true);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTokenReserves = React.useCallback(
    async (address0, address1) => {
      if (provider) {
        const signer = provider.getSigner();
        let contractPrice = new ethers.Contract(
          CONTRACT_ADDRESS.GET_PRICE_ADDRESS,
          getPrice.abi,
          signer
        );
        if (address1 && address0 && address !== null) {
          try {
            const PriveVal = await contractPrice.getReserves(
              address0,
              address1
            );
            dispatch(
              fuseActions.getReserves(
                PriveVal[0] / 10 ** 18,
                PriveVal[1] / 10 ** 18
              )
            );
          } catch (error) {
            dispatch(
              fuseActions.showMessage({
                message: getErrorMessage(error),
                variant: "error",
              })
            );
          }
        }
      }
    },
    [address, dispatch, provider]
  );

  const handleChange = (e, index) => {
    let tmpval = e.target.value ? e.target.value : 0;
    if (tmpval < 0 || isNaN(tmpval)) {
      tmpval = index === 0 ? price0 : price1;
    } else if (
      !(
        typeof tmpval === "string" &&
        (tmpval.endsWith(".") || tmpval.startsWith("."))
      )
    ) {
      tmpval = Number(e.target.value.toString());
    }

    if (index === 0) {
      if (tmpval > balance) {
        setAvailableBalance(false);
      } else {
        setAvailableBalance(true);
      }
      setPrice0(tmpval);
      setPrice1(toFixed((tmpval * reserve1) / reserve0));
      if (allow0_price > tmpval || token0.title === "BNB") {
        setAllow0(false);
      } else {
        setAllow0(true);
      }
      if (
        allow1_price > (tmpval * reserve1) / reserve0 ||
        token1.title === "BNB"
      ) {
        setAllow1(false);
      } else {
        setAllow1(true);
      }
    } else {
      if (tmpval > balance1) {
        setAvailableBalance(false);
      } else {
        setAvailableBalance(true);
      }
      setPrice1(tmpval);
      setPrice0(toFixed((tmpval * reserve0) / reserve1));
      if (allow1_price > tmpval || token1.title === "BNB") {
        setAllow1(false);
      } else {
        setAllow1(true);
      }
      if (
        allow0_price > (tmpval * reserve0) / reserve1 ||
        token0.title === "BNB"
      ) {
        setAllow0(false);
      } else {
        setAllow0(true);
      }
    }
  };

  const getBalance = React.useCallback(
    async (token, index) => {
      if (Object.keys(token).length === 0) {
        if (index === 0) {
          setBalance(0);
        } else {
          setBalance1(0);
        }
        return 0;
      }
      const signer = provider.getSigner();
      let contract = new ethers.Contract(token.address, minABI, signer);
      try {
        if (address != null) {
          const token0Bal = await contract.balanceOf(address);
          const token0Decimals = await contract.decimals();
          if (token.title === "BNB") {
            const bnbBalbuf = await provider.getBalance(address);
            const balBNB = ethers.utils.formatUnits(bnbBalbuf, "ether");
            if (index === 0) {
              setBalance(Number(balBNB));
            } else {
              setBalance1(Number(balBNB));
            }
            return Number(balBNB);
          } else {
            if (index === 0) {
              setBalance(Number(token0Bal._hex) / Number(10 ** token0Decimals));
            } else {
              setBalance1(
                Number(token0Bal._hex) / Number(10 ** token0Decimals)
              );
            }
            return Number(token0Bal._hex) / Number(10 ** token0Decimals);
          }
        } else {
          return 0;
        }
      } catch (error) {
        return 0;
      }
    },
    [address, provider]
  );
  const handleAddToken = async (index) => {
    try {
      let decimal;
      let contract;
      const signer = provider.getSigner();
      if (index === 0) {
        contract = new ethers.Contract(token0.address, minABI, signer);
      } else {
        contract = new ethers.Contract(token1.address, minABI, signer);
      }
      decimal = await contract.decimals();
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: index === 0 ? token0.address : token1.address, // The address that the token is at.
            symbol: index === 0 ? token0.title : token1.title, // A ticker symbol or shorthand, up to 5 chars.
            decimals: decimal,
          },
        },
      });
      if (wasAdded) {
        dispatch(
          fuseActions.showMessage({
            message: `${
              index === 0 ? token0.title : token1.title
            } ${"successful added"}`,
            variant: "success",
          })
        );
      } else {
        dispatch(
          fuseActions.showMessage({
            message: `${
              index === 0 ? token0.title : token1.title
            } ${"added failed"}`,
            variant: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        fuseActions.showMessage({
          message: getErrorMessage(error),
          variant: "error",
        })
      );
    }
  };

  const getPerPrice = (reserve0, reserve1) => {
    const perPrice0 = getTokenPriceUsingAmount(reserve0, reserve1, 1);
    const perPrice1 = getTokenPriceUsingAmount(reserve1, reserve0, 1);
    setPerPrice([toFixed(perPrice0), toFixed(perPrice1)]);
  };

  const handleCopy = async (index) => {
    navigator.clipboard
      .writeText(index === 0 ? token0.address : token1.address)
      .then(
        function () {
          setCopy(index === 0 ? 0 : 1);
          setTimeout(() => setCopy(false), 1000);
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
          setCopy(false);
        }
      );
  };

  const checkAllowance = React.useCallback(
    async (address0, address1) => {
      if (
        Object.keys(token0).length === 0 ||
        Object.keys(token1).length === 0
      ) {
        setAllow0(false);
        setAllow1(false);
        setAllowPrice0(0);
        setAllowPrice1(1);
        return;
      }
      const signer = provider.getSigner();
      if (token0.title === "BNB") {
        setAllow0(false);
        setAllowPrice0(0);
      } else {
        let contract0 = new ethers.Contract(address0, minABI, signer);
        const allow_price0 = await contract0.allowance(
          address,
          CONTRACT_ADDRESS.ROUTER_ADDRESS
        );
        setAllowPrice0(allow_price0 / 10 ** 18);
      }
      if (token1.title === "BNB") {
        setAllow1(false);
        setAllowPrice1(0);
      } else {
        let contract1 = new ethers.Contract(address1, minABI, signer);

        const allow_price1 = await contract1.allowance(
          address,
          CONTRACT_ADDRESS.ROUTER_ADDRESS
        );
        setAllowPrice1(allow_price1 / 10 ** 18);
      }
    },
    [address, provider, token0, token1]
  );
  useEffect(() => {
    const getData = async () => {
      setPrice0(0);
      setPrice1(0);
      setAllow0(false);
      setAllow1(false);
      await getBalance(token0, 0);
      await getBalance(token1, 1);
      await getTokenReserves(token0.address, token1.address);
      await checkAllowance(token0.address, token1.address);
      getPerPrice(reserve0, reserve1);
    };
    if (address && provider) {
      getData();
    }
  }, [
    address,
    provider,
    token0,
    token1,
    reserve0,
    reserve1,
    checkAllowance,
    getBalance,
    getTokenReserves,
  ]);
  const handleTooltipClose = () => {
    setCopy(false);
  };
  const handleApprove = async (address, index) => {
    setStatus(true);
    try {
      const signer = provider.getSigner();
      let contract0 = new ethers.Contract(address, minABI, signer);

      let tx = await contract0.approve(
        CONTRACT_ADDRESS.ROUTER_ADDRESS,
        "1000000000000000000000000000000000000"
      );
      await tx.wait();
      dispatch(
        fuseActions.showMessage({
          message: "Approved! Now you can add liquidity.",
          href: BASE_BSC_SCAN_URLS[tx.chainId] + "/tx/" + tx.hash,
          title: "Check Transaction on BSCScan",
          variant: "success",
        })
      );
      if (index === 0) {
        setAllow0(false);
      } else {
        setAllow1(false);
      }
    } catch (error) {
      dispatch(
        fuseActions.showMessage({
          message: getErrorMessage(error),
          variant: "error",
        })
      );
    }
    setStatus(false);
  };

  const handleSupply = async () => {
    setStatus(true);
    const signer = provider.getSigner();
    let contractPrice = new ethers.Contract(
      CONTRACT_ADDRESS.ROUTER_ADDRESS,
      RouterABI.abi,
      signer
    );
    let dateInAWeek = new Date();
    const deadline = Math.floor(dateInAWeek.getTime() / 1000) + 1000000;
    if (address != null) {
      try {
        let tx;
        if (token0.title === "BNB") {
          let _amount = extendToBigNumber(price1);
          tx = await contractPrice.addLiquidityETH(
            token1.address,
            _amount,
            0,
            0,
            address,
            deadline,
            {
              value: ethers.utils.parseUnits(Number(price0).toString(), "ether")
                ._hex,
            }
          );
        } else if (token1.title === "BNB") {
          let _amount = extendToBigNumber(price0);
          tx = await contractPrice.addLiquidityETH(
            token0.address,
            _amount,
            0,
            0,
            address,
            deadline,
            {
              value: ethers.utils.parseUnits(Number(price1).toString(), "ether")
                ._hex,
            }
          );
        } else {
          let _amount = extendToBigNumber(price0);
          let _amount1 = extendToBigNumber(price1);
          tx = await contractPrice.addLiquidity(
            token0.address,
            token1.address,
            _amount,
            _amount1,
            0,
            0,
            address,
            deadline
          );
        }
        dispatch(
          fuseActions.showMessage({
            message: "Transaction Submitted!",
            href: BASE_BSC_SCAN_URLS[tx.chainId] + "/tx/" + tx.hash,
            title: "Check Transaction on BSCScan",
            variant: "info",
          })
        );
        await tx.wait();
        setPrice0(0);
        setPrice1(0);
        dispatch(
          fuseActions.showMessage({
            message: "Liquidity Provision Success!",
            href: BASE_BSC_SCAN_URLS[tx.chainId] + "/tx/" + tx.hash,
            title: "Check Transaction on BSCScan",
            variant: "success",
          })
        );
        await getBalance(token0, 0);
        await getBalance(token1, 1);
        await getTokenReserves(token0.address, token1.address);
        getPerPrice(reserve0, reserve1);
        setStatus(false);
      } catch (error) {
        setPrice0(0);
        setPrice1(0);
        dispatch(
          fuseActions.showMessage({
            message: getErrorMessage(error),
            variant: "error",
          })
        );
        setStatus(false);
      }
    }
  };
  let sharePercent = (price0 / (reserve0 + price0)) * 100;
  sharePercent = isNaN(sharePercent) ? 0 : sharePercent;
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <IconButton onClick={handleBack}>
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
      <StyledDiv>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography>input</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              columnSpacing={2}
            >
              <Grid item>
                <Typography>
                  {" "}
                  Balance:
                  <span style={{ fontWeight: 600 }}>
                    {Math.round(balance * 1000000000) / 1000000000 || 0}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md>
            <StyledInput
              placeholder="0.00"
              fullWidth
              // type="number"
              value={isNaN(price0) ? 0 : price0}
              onChange={(e) => handleChange(e, 0)}
            />
          </Grid>
          {/* <Grid item>
            <Button onClick={() => handleMax(0)}>MAX</Button>
          </Grid> */}
          <Grid item>
            {token0.title ? (
              <CoinButton
                src={`/images/tokens/${token0.address}.png`}
                onClick={() => {
                  setOpen(true);
                  setTokenIndex(0);
                }}
              >
                {token0.title}
              </CoinButton>
            ) : (
              <Button
                onClick={() => {
                  setOpen(true);
                  setTokenIndex(0);
                }}
                variant="outlined"
                size="small"
              >
                Select a token
              </Button>
            )}
          </Grid>
        </Grid>
      </StyledDiv>
      <Grid container justifyContent="center">
        <Grid item>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <StyledDiv>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography>input</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              columnSpacing={2}
            >
              <Grid item>
                <Typography>
                  {" "}
                  Balance:
                  <span style={{ fontWeight: 600 }}>
                    {Math.round(balance1 * 1000000000) / 1000000000 || 0}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md>
            <StyledInput
              placeholder="0.00"
              fullWidth
              // type="number"
              value={isNaN(price1) ? 0 : price1}
              onChange={(e) => handleChange(e, 0)}
            />
          </Grid>
          {/* <Grid item>
            <Button onClick={() => handleMax(0)}>MAX</Button>
          </Grid> */}
          <Grid item>
            {token1.title ? (
              <CoinButton
                src={`/images/tokens/${token1.address}.png`}
                onClick={() => {
                  setOpen(true);
                  setTokenIndex(1);
                }}
              >
                {token1.title}
              </CoinButton>
            ) : (
              <Button
                onClick={() => {
                  setOpen(true);
                  setTokenIndex(1);
                }}
                variant="outlined"
                size="small"
              >
                Select a token
              </Button>
            )}
          </Grid>
        </Grid>
      </StyledDiv>
      <Collapse
        in={address && token0.title && token1.title ? true : false}
        sx={{ mt: 3 }}
      >
        <StyledInnerPaper>
          <Typography sx={{ mb: 2 }}>{"Price and pool share"}</Typography>

          <Grid container columnSpacing={2}>
            <Grid item md={4}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography>{perPrice[1]}</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {token0.title} {"per"} {token1.title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography>{perPrice[0]}</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {token1.title} {"per"} {token0.title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography>
                    {sharePercent > 100
                      ? 100
                      : sharePercent < 0.01
                      ? "< 0.01"
                      : toFixed(sharePercent)}
                    %
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>{"Share of pool"}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledInnerPaper>
        {allow0 && available_balance && (
          <Button
            onClick={() => handleApprove(token0.address, 0)}
            fullWidth
            variant="contained"
            sx={{
              background: theme.custom.gradient.grey,
              height: "50px",
              my: 2,
            }}
          >
            {"Enable"} {token0.title}
          </Button>
        )}
        {allow1 && available_balance && (
          <Button
            onClick={() => handleApprove(token1.address, 1)}
            fullWidth
            variant="contained"
            sx={{
              background: theme.custom.gradient.grey,
              height: "50px",
              my: 2,
            }}
          >
            {"Enable"} {token1.title}
          </Button>
        )}
        <Button
          disabled={
            allow0 || allow1 || !available_balance || price0 <= 0 || price1 <= 0
          }
          fullWidth
          onClick={() => handleSupply()}
          variant="contained"
          sx={{
            // background: theme.custom.gradient.tifi,
            height: "50px",
            my: 2,
          }}
        >
          {!available_balance ? (
            "Insufficent balance"
          ) : status ? (
            <CircularProgress />
          ) : (
            "Supply"
          )}
        </Button>
      </Collapse>
      {!address && <WalletConnectButton type />}
      <TokenSearchModal
        open={open}
        handleClose={() => setOpen(false)}
        token_index={token_index}
        type={TYPE_LIQUIDITY}
      />
    </>
  );
};

export default AddLiquidity;
