import "./App.css";
import { Grid } from "@chakra-ui/react";
import LandingSection from "./Components/LandingSection";
import FreshAndGreen from "./Components/FreshAndGreen";
import ThreePots from "./Components/ThreePots";
import FourPoints from "./Components/FourPoints";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import Ecommerce from "./artifacts/contracts/Ecommerce.sol/Ecommerce.json";
import useShowToast from "./customHooks/useShowToast";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import {
  setAccount,
  setContractAbi,
  setContractAddress,
  setContractOwner,
  setIsWeb3,
  setProducts,
} from "./redux/contractSlice";
import { parseToObject } from "./customHooks/contractUtilis";

function App() {
  const { showToast, closeAllToasts } = useShowToast();
  const dispatch = useDispatch();

  const connectWallet = async (_provider) => {
    console.log("connectWallet");
    if (!window.ethereum) return;
    if (!_provider) return;
    // Requesting to connect
    await _provider.send("eth_requestAccounts", []);

    // Listening to changes
    window?.ethereum?.on("chainChanged", (chainId) => {
      window.location.reload();
    });
    window?.ethereum?.on("accountsChanged", (accounts) => {
      window.location.reload();
    });
    const signer = await _provider.getSigner();
    const address = await signer.getAddress();
    dispatch(setAccount(address));
    const contractAddress = "0xD3D960E7F27F799537AEC6CC699603c7FdB896F8";
    const contrt = new ethers.Contract(contractAddress, Ecommerce.abi, signer);
    const contractOwner = await contrt.owner();
    dispatch(setContractOwner(contractOwner));
    dispatch(setContractAddress(JSON.parse(JSON.stringify(contrt)).target));
    dispatch(setContractAbi(Ecommerce.abi));
    const itemsCount = await contrt.itemCount();
    const prodArr = [];
    for (let i = 1; i <= Number(itemsCount); i++) {
      const prodFromContract = await contrt.items(i);
      const parsedObj = parseToObject(
        {
          id: "",
          name: "",
          category: "",
          image: "",
          cost: "",
          rating: "",
          stock: "",
        },
        prodFromContract
      );

      prodArr.push(parsedObj);
    }
    dispatch(setProducts(prodArr));
  };

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      if (provider) {
        setIsWeb3(true);
        connectWallet(provider);
      }
    } else {
      dispatch(setIsWeb3(false));
      closeAllToasts();
      showToast({
        title: "Error!",
        description: "MetaMask is not installed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  });

  return (
    <Grid>
      <Navbar />
      <LandingSection />
      <FreshAndGreen />
      <ThreePots />
      <FourPoints />
      <Footer />
    </Grid>
  );
}

export default App;
