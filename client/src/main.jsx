import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./routes/Routes.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ErrorBoundary } from "react-error-boundary";
import MetaMaskErr from "./Components/MetaMaskErr.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary fallback={<MetaMaskErr />}>
    <ChakraProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.StrictMode>
            <Routes />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </ErrorBoundary>
);

// contract address :- 0x5FbDB2315678afecb367f032d93F642f64180aa3
// contract with list :- 0x59b670e9fa9d0a427751af201d676719a970857b
// contract with updated addtocart and checkout functions :- 0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf
// contract after changing owner :- 0x162A433068F51e18b7d13932F27e66a3f99E6890

// main deployed contract address :- 0xD3D960E7F27F799537AEC6CC699603c7FdB896F8
