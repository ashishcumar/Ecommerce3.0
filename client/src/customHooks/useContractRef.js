import { ethers } from "ethers";
import { store } from "../redux/store";
const useContractRef = () => {
  const getContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const abi = store.getState().contractSlice.contractAbi;
    const address = store.getState().contractSlice.contractAddress;
    const signer = await provider.getSigner();
    const cnt = new ethers.Contract(address, abi, signer);
    console.log(cnt)
    return cnt;
  };

  return { getContract };
};

export default useContractRef;
