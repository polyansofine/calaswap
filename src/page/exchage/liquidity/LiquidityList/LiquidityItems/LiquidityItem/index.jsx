import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, useTheme } from "@mui/material";
import { TOKENS } from "constant/tokens";
import { Button } from "@pancakeswap/uikit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { minABI } from "constant/CLS_min_abi";
import { toFixed } from "utils/cls";
import * as liquidityActions from "store/actions";
import _ from "lodash";
const LiquidityItem = ({ item, handleAdd }) => {
  const { provider } = useSelector(
    ({ authReducers }) => authReducers.auth.auth
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [pool0, setPool0] = React.useState();
  const [pool1, setPool1] = React.useState();
  const [total, setTotal] = React.useState();
  const handleClick = (pair) => async (event, isExpanded) => {
    setExpanded(isExpanded ? pair.address : false);

    const signer = provider.getSigner();
    let contract = new ethers.Contract(pair.address, minABI, signer);

    let totalLp = await contract.totalSupply();
    setTotal(totalLp / 10 ** 18);
    let contaract0 = new ethers.Contract(pair.token0Address, minABI, signer);
    let contaract1 = new ethers.Contract(pair.token1Address, minABI, signer);
    let pooledToken0 = await contaract0.balanceOf(pair.address);
    let pooledToken1 = await contaract1.balanceOf(pair.address);
    setPool0(pooledToken0 / 10 ** 18);
    setPool1(pooledToken1 / 10 ** 18);
  };
  return (
    <>
      <Accordion
        // key={index}
        expanded={expanded === item.address}
        onChange={handleClick(item)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <img
                src={`/images/tokens/${item.token0Address}.png`}
                alt={`${item.token0Title}`}
                width="20px"
              />
              <img
                src={`/images/tokens/${item.token1Address}.png`}
                alt={`${item.token1Title}`}
                width="20px"
              />
            </Grid>
            <Grid item>
              <Typography>
                {item.token0Title}/{item.token1Title}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography>Pooled {item.token0Title}:</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {" "}
                {toFixed((pool0 * item.balance) / total)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography>Pooled {item.token1Title}:</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {" "}
                {toFixed((pool1 * item.balance) / total)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography>Your pool tokens :</Typography>
            </Grid>
            <Grid item>
              <Typography>{toFixed(item.balance)} </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography>Your pool share :</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {" "}
                {toFixed((100 * item.balance) / total) + "%"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around" alignItems="center">
            <Button
              onClick={() => {
                dispatch(
                  liquidityActions.setTokens(
                    TOKENS[
                      _.findIndex(TOKENS, (o) => o.title === item.token0Title)
                    ],
                    TOKENS[
                      _.findIndex(TOKENS, (o) => o.title === item.token1Title)
                    ]
                  )
                );
                handleAdd();
              }}
            >
              Add
            </Button>
            <Button
              disabled={!pool0 || !pool1}
              //   fullWidth
              //   variant="contained"
              //   sx={{
              //     background: theme.custom.gradient.pink,
              //     height: "50px",
              //     mt: 3,
              //     borderRadius: 1,
              //   }}
              onClick={() => {
                item.pool0 = (pool0 * item.balance) / total;
                item.pool1 = (pool1 * item.balance) / total;
                item.total = item.balance;
                dispatch(liquidityActions.setRemove(item));
              }}
            >
              Remove
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default LiquidityItem;
