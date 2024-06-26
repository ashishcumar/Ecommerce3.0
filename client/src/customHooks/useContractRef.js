import { ethers } from "ethers";
import { store } from "../redux/store";
const useContractRef = () => {
  const getContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      if (!provider) return null;
      const abi = store.getState().contractSlice.contractAbi;
      const address = store.getState().contractSlice.contractAddress;
      const signer = await provider.getSigner();
      const cnt = new ethers.Contract(address, abi, signer);

      return cnt;
    }
    return null;
  };

  return { getContract };
};

export default useContractRef;
