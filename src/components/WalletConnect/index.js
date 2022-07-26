/* eslint-disable eqeqeq */
import { Button, useTheme } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOption";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "store/actions";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { toHex } from "./utils";
import { Link } from "react-router-dom";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});
const WalletConnect = ({ type }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const { t } = useTranslation();
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [, setAccount] = useState();
  const [, setSignature] = useState("");
  const [error, setError] = useState("");
  const [, setChainId] = useState();
  const [, setNetwork] = useState();
  const [, setMessage] = useState("");
  const [, setVerified] = useState();
  const { address } = useSelector(({ authReducers }) => authReducers.auth.auth);
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const network = await library.getNetwork();
      if (network.chainId != 56) {
        await switchNetwork(library);
      }
      setLibrary(library);
      const accounts = await library.listAccounts();
      setProvider(provider);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
      dispatch(authActions.login(accounts[0], library));
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };
  const switchNetwork = async (library) => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(97) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: toHex(97),
                chainName: "Binance",
                rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545"],
                blockExplorerUrls: ["https://testnet.bscscan.com/"],
              },
            ],
          });
        } catch (addError) {
          throw addError;
        }
      }
    }
  };
  const disconnect = React.useCallback(async () => {
    await web3Modal.clearCachedProvider();
    dispatch(authActions.logout());
    refreshState();
  }, [dispatch]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts) {
          dispatch(authActions.login(accounts[0], library));
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, disconnect, error]);
  return (
    <div>
      {!address ? (
        <>
          {type ? (
            <Button
              variant="contained"
              fullWidth
              sx={theme.custom.swapButton}
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              variant="contained"
              // sx={theme.custom.swapButton}
              onClick={connectWallet}
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
    </div>
  );
};

export default WalletConnect;
