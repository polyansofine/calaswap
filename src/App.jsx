import "./App.css";
import { Provider } from "react-redux";
import store from "store/store";
import { ThemeProvider } from "styled-components";
// import { ModalProvider, dark } from "@pancakeswap/uikit";
import { Web3ReactProvider } from "@web3-react/core";
import Routers from "routers";
import { getLibrary } from "components/WalletConnectButton/utils/web3React";

// const ThemeProviderWrapper = (props) => {
//   return <ThemeProvider theme={dark} {...props} />;
// };

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        {/* <ThemeProviderWrapper>
          <ModalProvider> */}
        <Routers />
        {/* </ModalProvider>
        </ThemeProviderWrapper> */}
      </Provider>
    </Web3ReactProvider>
  );
}

export default App;
