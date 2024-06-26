import React, { useEffect, useState } from "react";
import { Grid, Box, Text, Flex } from "@chakra-ui/react";
import { shades } from "../helper/shades";
import logo from "../assets/logo.webp";
import { BsCart2 } from "react-icons/bs";
import { PiHandWithdraw } from "react-icons/pi";
import { useNavigate } from "react-router";
import { IoWalletOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { weiToEth } from "../customHooks/conversion";
import useContractRef from "../customHooks/useContractRef";

function Navbar() {
  const navigate = useNavigate();
  const { getContract } = useContractRef();
  const [contractBalance, setContractBalance] = useState();
  const [contract, setContract] = useState();
  const [userAccountBalance, setUserAccountBalance] = useState();
  const categoryMapping = {
    "House Plants": "/category/house-plants",
    "Office Plants": "/category/office-plants",
  };
  const { account, contractAddress,contractOwner } = useSelector(
    (state) => state.contractSlice
  );

  const updateContract = async () => {
    
    const cnt = await getContract();
    setContract(cnt);
    return cnt;
  };

  const getContractBalance = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      if (account === contractOwner) {
        const b = await provider.getBalance(contractAddress);
        setContractBalance(Math.floor(weiToEth(b)));
      }
      const c = await provider.getBalance(account);
      setUserAccountBalance(Math.floor(weiToEth(c)));
    } catch (error) {
      console.log("getContractBalance --> error", error);
    }
  };

  const withdraw = async () => {
    try {
      const a = await contract.withdraw();
    } catch (error) {
      console.log("withdraw --> error", error);
    }
  };

  useEffect(() => {
    updateContract();
    if (contractAddress && account) {
      getContractBalance();
    }
  }, []);

  return (
    <Grid>
      <Box
        sx={{
          textAlign: "center",
          color: "white",
          background: shades.primary,
          padding: "8px 0",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        Free shipping to India on all orders above 2Eth.
      </Box>
      <Flex
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: ["12px 24px", "12px 48px"],
          background: shades.secondary,
        }}
      >
        <Flex
          sx={{ alignItems: "end", gap: "12px" }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              height: "40px",
              objectFit: "contain",
            }}
          />
          <Text
            sx={{
              fontSize: "24px",
              fontWeight: "600",
              color: shades.text_dark,
            }}
          >
            Plant Store
          </Text>
        </Flex>
        <Flex sx={{ gap: "24px" }}>
          <Box
            sx={{ position: "relative", cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          >
            <BsCart2 fontSize={"28px"} />
            <Box
              sx={{
                background: shades.primary,
                color: "white",
                position: "absolute",
                fontSize: "12px",
                fontWeight: "500",
                borderRadius: "10px",
                height: "20px",
                width: "20px",
                display: "grid",
                placeContent: "center",
                top: "-10px",
                left: "-10px",
              }}
            >
              0
            </Box>
          </Box>
          <Box sx={{ cursor: "pointer", position: "relative" }}>
            <IoWalletOutline fontSize={"28px"} />
            <Box
              sx={{
                background: shades.primary,
                color: "white",
                position: "absolute",
                fontSize: "12px",
                fontWeight: "500",
                borderRadius: "4px",
                padding: "0px 4px",
                display: "grid",
                placeContent: "center",
                top: "-12px",
                left: "-10px",
              }}
            >
              {userAccountBalance}
            </Box>
          </Box>
          {account === contractOwner ? (
            <Box
              sx={{ cursor: "pointer", position: "relative" }}
              onClick={withdraw}
            >
              <PiHandWithdraw fontSize={"28px"} />
              <Box
                sx={{
                  background: shades.primary,
                  color: "white",
                  position: "absolute",
                  fontSize: "12px",
                  fontWeight: "500",
                  borderRadius: "4px",
                  padding: "0px 4px",
                  display: "grid",
                  placeContent: "center",
                  top: "-12px",
                  left: "-10px",
                }}
              >
                {contractBalance}
              </Box>
            </Box>
          ) : null}
        </Flex>
      </Flex>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "12px",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {["House Plants", "Office Plants"].map((item) => {
          return (
            <Text
              key={item}
              sx={{
                color: shades.text_dark,
                "&:hover": {
                  color: shades.tertiary,
                },
                cursor: "pointer",
              }}
              onClick={() => navigate(`${categoryMapping[item]}`)}
            >
              {item}
            </Text>
          );
        })}
      </Flex>
    </Grid>
  );
}

export default Navbar;
