import React from "react";
import { useWalletModal } from "@pancakeswap/uikit";
// import useAuth from "hooks/useAuth";
// import { useTranslation } from "contexts/Localization";
// import styled from "styled-components";
import useAuth from "./utils/useAuth";
import { Button, useTheme } from "@mui/material";
import useTranslation from "context/Localization/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import * as authActions from "store/actions";
// const Button = styled.button`
//   background-color: #000f26;
//   border-radius: 7px;
//   padding: 8px 30px;
//   border: none;
//   color: white;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   float: right;
//   margin-right: 20px;
//   margin-top: 17px;
// `;

const WalletConnectButton = ({ type }) => {
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  const dispatch = useDispatch();
  const theme = useTheme();
  //   console.log("login==", login);
  const { onPresentConnectModal } = useWalletModal(login, logout, t);
  const { address } = useSelector(({ authReducers }) => authReducers.auth.auth);
  const disconnect = React.useCallback(async () => {
    // await web3Modal.clearCachedProvider();
    logout();
    dispatch(authActions.logout());
    // refreshState();
  }, [dispatch]);
  return (
    <>
      {!address ? (
        <>
          {type ? (
            <Button
              variant="contained"
              fullWidth
              sx={theme.custom.swapButton}
              onClick={onPresentConnectModal}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              variant="contained"
              // sx={theme.custom.swapButton}
              onClick={onPresentConnectModal}
            >
              Connect Wallet
            </Button>
          )}
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            // component={Link}
            href={`https://bscscan.com/address/${address}`}
            target="_blank"
            sx={{ mr: 2, fontWeight: 600 }}
          >
            <AccountBalanceWalletIcon />

            {`0x...${address.substring(38)}`}
          </Button>

          <Button variant="contained" onClick={disconnect}>
            Disconnect
          </Button>
        </>
      )}
    </>
  );
};

export default WalletConnectButton;
