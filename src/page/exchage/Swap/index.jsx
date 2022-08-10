import { Button, Grid, InputBase, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import usdt from "assets/token_icons/usdt.svg";
import arrows from "assets/icons/arrows.svg";
import holder from "assets/token_icons/holder.svg";
import arrows_horizontal from "assets/icons/arrows_horizontal.svg";
import TokenSearchModal from "components/token_modal";
import { useSelector } from "react-redux";

const StyledDiv = styled("div")(({ theme }) => ({
  border: "2px solid #cccccc",
  borderRadius: 12,
  padding: 14,
}));
const StyledInfo = styled("div")(({ theme }) => ({
  background: "#F8F8F8",
  borderRadius: 12,
  padding: 8,
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  color: "#000",
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

const Swap = () => {
  const [open, setOpen] = useState(false);
  const [token_index, setTokenIndex] = useState(0);
  const { token0, token1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.token
  );

  return (
    <div>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Grid item>
          <Typography variant="h6">Exchange</Typography>
        </Grid>
        <Grid item>
          <SettingsIcon />
        </Grid>
      </Grid>
      <Typography sx={{ mt: 1, mb: 3 }}>Trade tokens in an instant</Typography>
      <StyledDiv>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography>From</Typography>
          </Grid>
          <Grid item>
            <Typography> Balance:0</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md>
            <StyledInput fullWidth />
          </Grid>
          <Grid item>
            <Button>MAX</Button>
          </Grid>
          <Grid item>
            <CoinButton
              src={`/images/tokens/${token0.address}.png`}
              onClick={() => {
                setOpen(true);
                setTokenIndex(0);
              }}
            >
              {token0.title}
            </CoinButton>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography>-$326.02</Typography>
          </Grid>
          <Grid item>
            <Typography>BNB</Typography>
          </Grid>
        </Grid>
      </StyledDiv>
      <Grid container justifyContent="center" sx={{ my: 3 }}>
        <img src={arrows} alt="arrows" style={{ cursor: "pointer" }} />
      </Grid>
      <StyledDiv>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography>To(estimated)</Typography>
          </Grid>
          <Grid item>
            <Typography> Balance:0</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md>
            <StyledInput fullWidth />
          </Grid>
          <Grid item>
            <Button>MAX</Button>
          </Grid>
          <Grid item>
            <CoinButton
              src={`/images/tokens/${token1.address}.png`}
              onClick={() => {
                setOpen(true);
                setTokenIndex(1);
              }}
            >
              {token1.title}
            </CoinButton>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography>-$326.02</Typography>
          </Grid>
          <Grid item>
            <Typography>BNB</Typography>
          </Grid>
        </Grid>
      </StyledDiv>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Grid item>
          <Typography>Price</Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Typography>0.00189212 BNB per CLS</Typography>
            <img src={arrows_horizontal} alt="arrows_horizontal" />
          </Grid>
        </Grid>
      </Grid>
      <Button fullWidth variant="contained" sx={{ my: 3 }}>
        Insufficlent BNB balance
      </Button>
      <StyledInfo>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Minimum received</Typography>
          <Typography variant="body2">524.3 CLS</Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ my: 1 }}
        >
          <Typography variant="body2">Minimum received</Typography>
          <Typography variant="body2">524.3 CLS</Typography>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Minimum received</Typography>
          <Typography variant="body2">524.3 CLS</Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ my: 1 }}
        >
          <Typography variant="body2">Minimum received</Typography>
          <Typography variant="body2">524.3 CLS</Typography>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Minimum received</Typography>
          <Typography variant="body2">524.3 CLS</Typography>
        </Grid>
      </StyledInfo>
      <TokenSearchModal
        open={open}
        handleClose={() => setOpen(false)}
        token_index={token_index}
      />
    </div>
  );
};

export default Swap;
