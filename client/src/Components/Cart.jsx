import React, { useEffect, useState } from "react";
import { Grid, Box, Text, Flex, Button, Divider } from "@chakra-ui/react";
import { shades } from "../helper/shades";
import emptyCart from "../assets/emptyCart.svg";
import { plantJson } from "../helper/plants";
import useContractRef from "../customHooks/useContractRef";
import { useSelector } from "react-redux";
import { parseToObject } from "../customHooks/contractUtilis";
import { ethers } from "ethers";
import useShowToast from "../customHooks/useShowToast";
import { weiToEth } from "../customHooks/conversion";
function Cart() {
  const { getContract } = useContractRef();
  const { showToast } = useShowToast();
  const [contract, setContract] = useState();
  const [hasCartItems, setHasCartItems] = useState(0);
  const { account, contractAddress } = useSelector(
    (state) => state.contractSlice
  );

  const [cartItems, setCartItems] = useState();
  const [cartTotal, setCartTotal] = useState();

  const updateContract = async () => {
    const cnt = await getContract();
    setContract(cnt);
    return cnt;
  };

  const getCartData = async (cnt) => {
    try {
      console.log(cnt);
      const data = await cnt.getCartLength();
      if (Number(data)) {
        setHasCartItems(Number(data));
      }
    } catch (error) {
      setHasCartItems(0);
    }
  };

  const getCartItems = async () => {
    console.log("account ->", account);
    try {
      let cartArr = [];
      console.log("getCartItems called", { hasCartItems, account });
      for (let i = 0; i < hasCartItems; i++) {
        const data = await contract.cartList(account, i);
        const newObj = {};
        newObj["count"] = Number(data[0]);
        newObj["item"] = parseToObject(
          {
            id: "",
            name: "",
            category: "",
            image: "",
            cost: "",
            rating: "",
            stock: "",
          },
          data[1]
        );

        cartArr.push(newObj);
      }
      let totalAmount = 0;
      cartArr.forEach((prod) => {
        totalAmount += prod.count * prod.item.cost;
      });
      setCartTotal(totalAmount);
      console.log("cartArr", cartArr);
      setCartItems(cartArr);
    } catch (error) {
      console.log("getCartItems --> error", error);
    }
  };

  const checkout = async () => {
    if (!hasCartItems) {
      return showToast({
        title: "Error!",
        description: "Cart is empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    try {
      const transaction = await contract.checkout({
        value: ethers.parseEther(cartTotal.toString()),
        gasLimit: 5000000,
      });
      if (transaction) {
        showToast({
          title: "Success!",
          description: "Transaction Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getCartData(contract);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateContract().then((cnt) => getCartData(cnt));
  }, []);

  useEffect(() => {
    if (hasCartItems) {
      getCartItems();
    }
  }, [hasCartItems]);

  console.log({ cartItems, cartTotal, hasCartItems });
  return (
    <Grid sx={{ padding: ["24px", "48px"], background: shades.secondary }}>
      <Text
        sx={{
          fontSize: "28px",
          fontWeight: "600",
          color: shades.text_dark,
          marginBottom: "48px",
        }}
      >
        Shopping Cart
      </Text>
      <Box sx={{ margin: "24px 0", textAlign: "center" }}>
        {!hasCartItems ? (
          <Box>
            <img
              src={emptyCart}
              alt="emptyCart"
              style={{ height: "100px", objectFit: "contain", margin: "auto" }}
            />
            <Text
              sx={{
                fontSize: "28px",
                color: shades.text_dark,
                fontWeight: "600",
              }}
            >
              Your bag is empty!
            </Text>
            <Text
              sx={{
                fontSize: "16px",
                color: shades.text_dark,
                margin: "12px 0 24px 0",
              }}
            >
              Looks like you haven't made your choice yet.
            </Text>
            <Button
              sx={{
                background: shades.primary,
                color: "white",
                borderRadius: "0",
                padding: "24px",
                "&:hover": {
                  background: shades.primary,
                },
              }}
            >
              Continue shopping
            </Button>
          </Box>
        ) : (
          <Grid sx={{ gridTemplateColumns: ["1fr", "7fr 3fr"], gap: "12px" }}>
            <Grid
              sx={{
                background: shades.secondary,
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "5fr 2.5fr 2.5fr",
                  textAlign: "left",
                  fontWeight: "600",
                  padding: "12px 0",
                }}
              >
                <Text> Products</Text>
                <Text> Quantity</Text>
                <Text> Price</Text>
              </Box>
              <Box sx={{ padding: "12px 0", background: "white" }}>
                {cartItems?.map((prod) => {
                  return (
                    <Box
                      key={prod.item.name}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "5fr 2.5fr 2.5fr",
                        textAlign: "left",
                        margin: "12px 0",
                      }}
                    >
                      <Flex
                        sx={{
                          gap: "12px",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={prod.item.image}
                          alt={prod.item.name}
                          style={{ height: "60px", objectFit: "contain" }}
                        />
                        <Text sx={{ fontWeight: "600" }}>{prod.item.name}</Text>
                      </Flex>
                      <Flex
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            height: "40px",
                            width: "40px",
                            display: "grid",
                            placeContent: "center",
                            margin: "0 12px",
                            padding: "8px 24px",
                            borderRadius: "4px",
                          }}
                        >
                          {prod.count}
                        </Box>
                      </Flex>
                      <Flex
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        {prod.item.cost} Eth
                      </Flex>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
            <Box
              sx={{
                background: "white",
                padding: "12px 16px",
                height: "fit-content",
                marginTop: "48px",
              }}
            >
              <Text
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  textAlign: "left",
                }}
              >
                Cart totals
              </Text>
              <Grid sx={{ alignItems: "center" }}>
                <Box>
                  <Flex
                    sx={{
                      margin: "8px 0",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ fontSize: "16px", fontWeight: "600" }}>
                      Subtotal
                    </Text>
                    <Text sx={{ fontSize: "16px", fontWeight: "600" }}>
                      {cartTotal} Eth
                    </Text>
                  </Flex>
                  <Flex
                    sx={{
                      margin: "8px 0",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ fontSize: "16px", fontWeight: "600" }}>
                      Discount
                    </Text>
                    <Text sx={{ fontSize: "16px", fontWeight: "600" }}>
                      0 Eth
                    </Text>
                  </Flex>
                  <Divider
                    border={`0.5px solid ${shades.primary}`}
                    margin={"12px 0"}
                  />
                  <Flex
                    sx={{
                      margin: "8px 0",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ fontSize: "16px", fontWeight: "600" }}>
                      Grand Total
                    </Text>
                    <Text sx={{ fontSize: "16px", fontWeight: "600" }}>
                      {cartTotal} Eth
                    </Text>
                  </Flex>
                </Box>
                <Button
                  sx={{
                    background: shades.primary,
                    color: "white",
                    borderRadius: "0",
                    "&:hover": {
                      background: shades.primary,
                    },
                  }}
                  onClick={checkout}
                >
                  Checkout
                </Button>
              </Grid>
            </Box>
          </Grid>
        )}
      </Box>
    </Grid>
  );
}

export default Cart;
